// Sends each family's daily reminder at the time they chose, in their own time zone.
// Runs every 15 minutes. Reminders are saved at users/{uid}/reminder/main by the app.
const {onSchedule}=require("firebase-functions/v2/scheduler");
const admin=require("firebase-admin");admin.initializeApp();
exports.familyReminders=onSchedule({schedule:"every 15 minutes",timeZone:"UTC"},async()=>{
  const now=new Date(),snap=await admin.firestore().collectionGroup("reminder").get(),jobs=[];
  snap.forEach(doc=>{const r=doc.data();if(!r.on||!r.token||!r.time||!r.tz)return;
    let local,today;try{local=new Intl.DateTimeFormat("en-US",{timeZone:r.tz,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(now);today=new Intl.DateTimeFormat("en-CA",{timeZone:r.tz}).format(now);}catch(e){return;}
    const [h,m]=local.split(":").map(Number),[th,tm]=r.time.split(":").map(Number),diff=(h*60+m)-(th*60+tm);
    if(diff<0||diff>=15||r.last===today)return;
    jobs.push(admin.messaging().send({token:r.token,
      notification:{title:"Family Come, Follow Me",body:"Today's reading and question are ready. Tap to open."},
      webpush:{notification:{icon:"https://joined-3adda.web.app/icon-192.png"},fcmOptions:{link:"https://joined-3adda.web.app/#family"}}})
      .then(()=>doc.ref.update({last:today}))
      .catch(err=>{const c=String(err&&err.code||"");if(c.includes("registration-token-not-registered")||c.includes("invalid-argument"))return doc.ref.update({on:false});}));});
  await Promise.all(jobs);});

// Reads a lesson page from the Church's website for the "Bring in a lesson from a link" feature.
// Only churchofjesuschrist.org manual pages are allowed.
const {onRequest}=require("firebase-functions/v2/https");
exports.lessonPage=onRequest({cors:true,region:"us-central1",memory:"256MiB",timeoutSeconds:30},async(req,res)=>{
  let u;try{u=new URL(String(req.query.url||""));}catch(e){res.status(400).json({error:"bad url"});return;}
  if(!/(^|\.)churchofjesuschrist\.org$/.test(u.hostname)||!/^\/study\/manual\//.test(u.pathname)){res.status(400).json({error:"only Church manual pages"});return;}
  const uri=u.pathname.replace(/^\/study/,""),lang=(u.searchParams.get("lang")||"eng").replace(/[^a-z]/g,"");
  try{const r=await fetch(`https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=${lang}&uri=${encodeURIComponent(uri)}`,{headers:{"User-Agent":"Mozilla/5.0 (Joined lesson reader)","Accept":"application/json"}});
    if(!r.ok){res.status(502).json({error:"church site "+r.status});return;}
    const j=await r.json();res.set("Cache-Control","public, max-age=3600");
    res.json({title:(j.meta&&j.meta.title)||"",body:(j.content&&j.content.body)||""});}
  catch(e){res.status(502).json({error:"could not reach the Church site"});}});

// "Ask" search: a signed-in person describes what they're looking for in their own words.
// Claude suggests scripture references and picks from that person's own highlights and the app's talk list.
// The app always shows the real verse text itself; Claude never writes quotes.
// Limits: FREE_SEEKS free searches per person (total, not per day), then paid credits (users/{uid} field seekCredits, added when payments exist).
// MONTHLY_TOTAL caps the whole app per month as a safety net.
// One-time setup: firebase functions:secrets:set ANTHROPIC_API_KEY
const {defineSecret}=require("firebase-functions/params");
const Anthropic=require("@anthropic-ai/sdk");
const ANTHROPIC_API_KEY=defineSecret("ANTHROPIC_API_KEY");
const FREE_SEEKS=20,MONTHLY_TOTAL=10000;
// Accounts with unlimited Seek (owner). Stored as SHA-256 of the lowercase email so the address isn't public.
const UNLIMITED=new Set(["1d569d08c75bde40719a229539f0d55434786f67e0cb93c87f2bd1d7882bc6c6"]);
const sha=x=>require("crypto").createHash("sha256").update(String(x||"").trim().toLowerCase()).digest("hex");
const ASK_SCHEMA={type:"object",additionalProperties:false,required:["verses","highlights","talks","note"],properties:{
  verses:{type:"array",items:{type:"object",additionalProperties:false,required:["book","chapter","verse","why"],properties:{
    book:{type:"string"},chapter:{type:"integer"},verse:{type:"integer"},why:{type:"string"}}}},
  highlights:{type:"array",items:{type:"object",additionalProperties:false,required:["i","why"],properties:{i:{type:"integer"},why:{type:"string"}}}},
  talks:{type:"array",items:{type:"object",additionalProperties:false,required:["i","why"],properties:{i:{type:"integer"},why:{type:"string"}}}},
  note:{type:"string"}}};
const ASK_SYSTEM=`You help members of The Church of Jesus Christ of Latter-day Saints find scriptures, talks, and their own highlighted verses by meaning.
The person describes an idea, story, or feeling in their own words. Return:
- verses: up to 6 of the most fitting verses from the KJV Bible, Book of Mormon, Doctrine and Covenants, or Pearl of Great Price. Use standard book names (e.g. "1 Nephi", "Matthew", "Doctrine and Covenants", "Daniel"). Only give references you are sure of. Never invent a reference.
- highlights: indexes (i) from THEIR HIGHLIGHTS list that match. If they say they highlighted or saw something, look here first. Use [] if none fit.
- talks: indexes (i) from the TALKS list that fit. Use [] if none fit.
- why: one short plain sentence each, in your own words. Do not quote scripture text; the app shows the real text.
- note: one short sentence, or "" if nothing to add.
Be accurate and doctrinally careful. If the request is not about scripture, faith, or gospel study, return empty lists and a polite note.`;
exports.askSearch=onRequest({cors:true,region:"us-central1",memory:"256MiB",timeoutSeconds:60,secrets:[ANTHROPIC_API_KEY]},async(req,res)=>{
  if(req.method!=="POST"){res.status(405).json({error:"POST only"});return;}
  let uid,unlimited=false;try{const tok=await admin.auth().verifyIdToken(String(req.get("Authorization")||"").replace(/^Bearer /,""));uid=tok.uid;unlimited=UNLIMITED.has(sha(tok.email));}
  catch(e){res.status(401).json({error:"signin"});return;}
  const b=req.body||{},q=String(b.q||"").trim().slice(0,500);
  if(q.length<3){res.status(400).json({error:"empty"});return;}
  const hl=(Array.isArray(b.hl)?b.hl:[]).slice(0,200).map(x=>String(x).slice(0,220));
  const talks=(Array.isArray(b.talks)?b.talks:[]).slice(0,400).map(x=>String(x).slice(0,160));
  const db=admin.firestore(),now=new Date(),day=now.toISOString().slice(0,10),month=day.slice(0,7);
  const uRef=db.doc("aiUsage/u_"+uid),mRef=db.doc("aiUsage/m_"+month);let left=0;
  try{await db.runTransaction(async t=>{const [u,m]=await Promise.all([t.get(uRef),t.get(mRef)]);
    const ud=u.exists?u.data():{},used=ud.used||0,credits=ud.seekCredits||0,mn=m.exists?m.data().n:0;
    if(mn>=MONTHLY_TOTAL)throw new Error("monthly");
    if(unlimited){t.set(uRef,{used:used+1},{merge:true});left=-1;}
    else if(used<FREE_SEEKS){t.set(uRef,{used:used+1},{merge:true});left=FREE_SEEKS-used-1+credits;}
    else if(credits>0){t.set(uRef,{seekCredits:credits-1},{merge:true});left=credits-1;}
    else throw new Error("free_used");
    t.set(mRef,{n:mn+1},{merge:true});});}
  catch(e){const m=e.message;res.status(429).json({error:m==="free_used"||m==="monthly"?m:"busy"});return;}
  const user=`THEIR HIGHLIGHTS:\n${hl.map((x,i)=>i+". "+x).join("\n")||"(none)"}\n\nTALKS:\n${talks.map((x,i)=>i+". "+x).join("\n")||"(none)"}\n\nWHAT THEY'RE LOOKING FOR:\n${q}`;
  try{const client=new Anthropic({apiKey:ANTHROPIC_API_KEY.value()});
    const r=await client.messages.create({model:"claude-haiku-5-5",max_tokens:4000,system:ASK_SYSTEM,
      output_config:{effort:"low",format:{type:"json_schema",schema:ASK_SCHEMA}},messages:[{role:"user",content:user}]});
    const txt=(r.content.find(c=>c.type==="text")||{}).text;
    if(r.stop_reason==="refusal"||!txt){res.json({verses:[],highlights:[],talks:[],note:"Sorry, I couldn't help with that one."});return;}
    res.json(Object.assign(JSON.parse(txt),{left}));}
  catch(e){console.error("askSearch",e&&e.message);res.status(502).json({error:"ai"});}});

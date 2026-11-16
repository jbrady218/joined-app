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

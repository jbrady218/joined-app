const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const KEY="dsc-v1";
let S={hl:{},notes:[],seeded:false};
try{const r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r));}catch(e){}
function save(){S._t=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}if(typeof cloudSave==="function")cloudSave();}
if(!S.seeded){
  S.hl["dan.1:8"]="gold";
  S.notes.push({id:"ex1",target:{type:"verse",ref:"dan.1:8"},text:"Daniel decided before the pressure came (\"purposed in his heart\"). Then he asked politely and offered a test instead of just refusing.",tags:["integrity","example"],links:[],ts:Date.now(),example:true});
  S.notes.push({id:"ex2",target:{type:"verse",ref:"dan.3:18"},text:"\"But if not\" — faith in God, not faith in a particular outcome.",tags:["faith","example"],links:[
    {title:"“But If Not” — Elder Dennis E. Simmons, April 2004",url:GL+encodeURIComponent('"But If Not" Simmons')},
    {title:"Mosiah 17 — Abinadi before King Noah",url:"https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/17?lang=eng"}],ts:Date.now(),example:true});
  S.seeded=true;save();
}
let CAN_SAVE=true;try{localStorage.setItem(KEY+"-t","1");localStorage.removeItem(KEY+"-t");}catch(e){CAN_SAVE=false;}
let bk="dan",ch=1,mode="kjv",panelView={type:"guide"};
// Refs look like "dan.3:18". Older saved data used "3:18" (Daniel only), so upgrade it.
const PR=ref=>{const m=String(ref).match(/^([\w]+)\.(\d+):(\d+)$/);return m?{b:m[1],c:+m[2],v:+m[3]}:null;};
const MR=(b,c,v)=>`${b}.${c}:${v}`;
const CK=(b,c)=>`${b}.${c}`;
const bname=b=>BOOKS[b].short||BOOKS[b].name;
const refLabel=ref=>{const p=PR(ref);return p?`${bname(p.b)} ${p.c}:${p.v}`:ref;};
const chapLabel=(b,c)=>`${bname(b)} ${c}`;
const unit=b=>BOOKS[b].unit||"Chapter";
const isBible=b=>!!BOOKS[b].bible;
const verOf=b=>isBible(b)?(mode==="both"?"kjv":mode):"std";
const TEXT_SRC="https://raw.githubusercontent.com/jbrady218/joined-app/main/texts/",TEXT_LOAD={};
function ensureText(b){if(TEXTS[b])return Promise.resolve(true);if(TEXT_LOAD[b])return TEXT_LOAD[b];
  const key="/__text_"+b+"_v1",net=()=>fetch(TEXT_SRC+b+".json",{cache:"no-store"}).then(r=>r.ok?r.json():null).catch(()=>null);
  return TEXT_LOAD[b]=(async()=>{let j=null;try{const r=await (await caches.open("joined")).match(key);if(r)j=await r.json();}catch(e){}
    const save=x=>{try{caches.open("joined").then(c=>c.put(key,new Response(JSON.stringify(x))));}catch(e){}};
    if(j)net().then(x=>{if(x&&(x.kjv||x.std)){save(x);TEXTS[b]=x;}});else{j=await net();if(j&&(j.kjv||j.std))save(j);else j=null;}
    if(j){TEXTS[b]=j;return true;}TEXT_LOAD[b]=null;return false;})();}
const vtext=(ref,ver)=>{const p=PR(ref);if(!TEXTS[p.b])return "";const V=TEXTS[p.b][ver]?ver:Object.keys(TEXTS[p.b])[0];return TEXTS[p.b][V][p.c][p.v-1];};
const vcount=(b,c)=>!TEXTS[b]?0:TEXTS[b][Object.keys(TEXTS[b])[0]][c].length;
const vid=ref=>"v-"+ref.replace(/[.:]/g,"-");
const hashFor=(b,c)=>`#${b}-${c}`;
(function migrate(){const up=r=>/^\d+:\d+$/.test(r)?"dan."+r:r;let changed=false;
  Object.keys(S.hl).forEach(k=>{if(/^\d+:\d+$/.test(k)){S.hl[up(k)]=S.hl[k];delete S.hl[k];changed=true;}});
  if(S.hlt)Object.keys(S.hlt).forEach(k=>{if(/^\d+:\d+$/.test(k)){S.hlt[up(k)]=S.hlt[k];delete S.hlt[k];changed=true;}});
  S.notes.forEach(n=>{if(n.target.type==="verse"&&/^\d+:\d+$/.test(n.target.ref)){n.target.ref=up(n.target.ref);changed=true;}});
  (S.marks||[]).forEach(m=>{if(/^\d+:\d+$/.test(m.ref)){m.ref=up(m.ref);changed=true;}});
  (S.library||[]).forEach(L=>L.refs.forEach(r=>{if(!r.b){r.b="dan";changed=true;}}));
  try{const l=localStorage.getItem(KEY+"-last");if(l&&/^\d+$/.test(l))localStorage.setItem(KEY+"-last","dan."+l);}catch(e){}
  if(changed)save();})();
try{const m=localStorage.getItem(KEY+"-mode");if(m)mode=m;}catch(e){}

// term regex
const FORMS={},TREB={};
BOOK_ORDER.forEach(b=>{const fm={};Object.entries(TERMS).forEach(([k,t])=>{if(t.books.includes(b))t.forms.forEach(f=>fm[f.toLowerCase()]=k);});FORMS[b]=fm;
  const fs=Object.keys(fm).sort((x,y)=>y.length-x.length).map(f=>f.replace(/[.*+?^${}()|[\]\\-]/g,"\\$&"));
  TREB[b]=new RegExp(fs.length?"\\b("+fs.join("|")+")\\b":"(?!x)x","gi");});
const termsIn=(b,txt)=>[...new Set((txt.match(TREB[b])||[]).map(m=>FORMS[b][m.toLowerCase()]))];
const termsAt=(b,c,v,txt)=>termsIn(b,txt).map(k=>resolveTerm(b,c,v,k)).filter(Boolean);
const termsInCh=(b,c)=>!TEXTS[b]?[]:[...new Set(TEXTS[b][Object.keys(TEXTS[b])[0]][c].flatMap((t,i)=>termsAt(b,c,i+1,t)))];
const LET="abcdefghijklmnopqrstuvwxyz";
let SEEN=new Set();
// The blue mark after a word: original language for the Bible, Webster's 1828 for Restoration scripture
function markFor(b,c,v,t){
  if(b==="dan")return t.heb?((c===1||(c===2&&v<=4)||c>=8)?["H","Hebrew word"]:["A","Aramaic word"]):null;
  if(BOOKS[b]&&BOOKS[b].bible)return t.heb?(BOOKS[b].lang==="grk"?["G","Greek word"]:["H","Hebrew word"]):null;
  return t.w1828?["W","Webster's 1828 dictionary"]:null;}
const HLC=[["gold","Yellow"],["orange","Orange"],["red","Red"],["rose","Pink"],["purple","Purple"],["blue","Blue"],["teal","Teal"],["green","Green"],["brown","Brown"],["gray","Gray"]];
function linkTerms(txt,fn,b,c,v,ver){const ref=MR(b,c,v);const col=new Array(txt.length).fill("");
  (S.marks||[]).forEach(m=>{if(m.ref===ref&&m.ver===ver)for(let i=m.s;i<m.e&&i<txt.length;i++)col[i]=m.color;});
  const seg=(a,b)=>{let o="",i=a;while(i<b){let j=i+1;while(j<b&&col[j]===col[i])j++;const t=esc(txt.slice(i,j));
    o+=col[i]?`<mark class="mk mk-${col[i]}" data-o="${i}">${t}</mark>`:`<span data-o="${i}">${t}</span>`;i=j;}return o;};
  let out="",pos=0,li=0,m;const re=new RegExp(TREB[b].source,"gi");
  while((m=re.exec(txt))){const k=resolveTerm(b,c,v,FORMS[b][m[0].toLowerCase()]);if(!k)continue;out+=seg(pos,m.index);let sup="",ol="";
    if(fn&&!SEEN.has(k)){SEEN.add(k);const l=LET[li++]||"";fn.push({l,k});sup=`<sup class="fl">${l}</sup>`;const mk=markFor(b,c,v,TERMS[k]);if(mk)ol=`<sup class="ol" title="${mk[1]}">${mk[0]}</sup>`;}
    const dif=TERMS[k].diff&&markFor(b,c,v,TERMS[k]);out+=`<button class="t${dif?" diff":""}" data-term="${k}">${sup}${seg(m.index,m.index+m[0].length)}${ol}</button>`;pos=m.index+m[0].length;}
  return `<span class="vt" data-ver="${ver}" data-ref="${ref}">${out+seg(pos,txt.length)}</span>`;}
function addMark(r,color){S.marks=S.marks||[];const keep=[];
  S.marks.forEach(m=>{if(m.ref!==r.ref||m.ver!==r.ver||m.e<=r.s||m.s>=r.e){keep.push(m);return;}
    if(m.s<r.s)keep.push({...m,e:r.s});if(m.e>r.e)keep.push({...m,s:r.e});});
  if(color)keep.push({ref:r.ref,ver:r.ver,s:r.s,e:r.e,color,ts:Date.now()});S.marks=keep;}
function libRefs(ref){const p=PR(ref);const out=[];(S.library||[]).forEach(b=>b.refs.forEach(r=>{if((r.b||"dan")===p.b&&r.c===p.c&&p.v>=r.v&&p.v<=(r.v2||r.v))out.push({b,r});}));return out;}

const glUrl=(b,c,v)=>`https://www.churchofjesuschrist.org/study/scriptures/${BOOKS[b].gl}/${c}?lang=eng`+(v?`&id=p${v}#p${v}`:"");
const SCROLL=`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h11a2 2 0 0 1 2 2v1h-3V6a2 2 0 0 0-2-2M6 4a2 2 0 0 0-2 2v1h3v11a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1H10v1a2 2 0 0 1-2 2"/><path d="M10 9h6M10 12h6M10 15h4"/></svg>`;
const SCROLL_SM=`<span style="display:inline-block;width:16px;vertical-align:-3px">${SCROLL}</span>`;
let view="home",volId="ot",LAST="";
const CFM=[{start:"2026-11-09",end:"2026-11-15",title:"“There Is No Other God That Can Deliver”",block:"Daniel 1–7",ch:1,u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/46?lang=eng"}];
const CFM_HOME="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026?lang=eng";
function cfmNow(){const d=new Date();const iso=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;return CFM.find(w=>iso>=w.start&&iso<=w.end);}
function fmtWeek(w){const m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];const a=w.start.split("-").map(Number),b=w.end.split("-").map(Number);return `${m[a[1]-1]} ${a[2]}–${a[1]===b[1]?"":m[b[1]-1]+" "}${b[2]}`;}
function recentItems(lim){const it=[];
  S.notes.forEach(n=>it.push({ts:n.ts||0,kind:"note",n}));
  (S.marks||[]).forEach(m=>{if(!PR(m.ref))return;it.push({ts:m.ts||0,kind:"mark",m,txt:vtext(m.ref,m.ver).slice(m.s,m.e)});});
  Object.entries(S.hl).forEach(([ref,col])=>it.push({ts:(S.hlt||{})[ref]||0,kind:"hl",ref,col}));
  return it.sort((a,b)=>b.ts-a.ts).slice(0,lim||5);}
function recentHTML(lim){const it=recentItems(lim);if(!it.length)return `<p class="muted">Highlights and notes you make will show up here.</p>`;
  return it.map(x=>{if(x.kind==="note"){const n=x.n,ref=n.target.type==="verse"?refLabel(n.target.ref):TERMS[n.target.key].name;
      return `<button class="ritem" data-goto='${esc(JSON.stringify(n.target))}'><span class="rk">Note · ${esc(ref)}</span><span class="rt">${esc((n.text||n.links.map(l=>l.title).join(", ")).slice(0,140))}</span></button>`;}
    if(x.kind==="mark")return `<button class="ritem" data-goto='{"type":"verse","ref":"${x.m.ref}"}'><span class="rk">Highlight · ${refLabel(x.m.ref)}</span><span class="rt"><mark class="mk mk-${x.m.color}">${esc(x.txt)}</mark></span></button>`;
    const vt=vtext(x.ref,"kjv");return `<button class="ritem" data-goto='{"type":"verse","ref":"${x.ref}"}'><span class="rk">Highlight · ${refLabel(x.ref)}</span><span class="rt"><mark class="mk mk-${x.col}">${esc(vt.slice(0,120))}${vt.length>120?"…":""}</mark></span></button>`;}).join("");}
const BOOK_ALIASES_BASE={dan:["daniel","dan","dn"],hos:["hosea","hos","ho"],joel:["joel","jl"],mat:["matthew","matt","mat","mt"],"1ne":["1 nephi","1 ne","1ne","1nephi","1 nep"],dc:["d&c","doctrine and covenants","dc","d & c"],abr:["abraham","abr"]};
const BOOK_ALIASES=Object.assign({},BOOK_ALIASES_BASE,typeof MORE_ALIASES!=="undefined"?MORE_ALIASES:{});
function parseRef(q){q=q.trim().toLowerCase().replace(/\.(?=\s|\d|$)/g,"");let b=null,rest=q;
  for(const [k,al] of Object.entries(BOOK_ALIASES))for(const a of al){if(q.startsWith(a+" ")||q===a||(q.startsWith(a)&&/\d/.test(q[a.length]||""))){if(!b||a.length>rest.len){b=k;rest=Object.assign(new String(q.slice(a.length).trim()),{len:a.length});}}}
  const m=String(rest).match(/^(\d{1,3})(?:\s*:\s*(\d{1,3}))?$/);if(!m)return null;return {b,c:+m[1],v:m[2]?+m[2]:0};}
function doSearch(q){q=q.trim();const out=[];if(!q)return "";
  const pr=parseRef(q);
  if(pr){(pr.b?[pr.b]:BOOK_ORDER).forEach(b=>{const B=BOOKS[b];if(!B.chs.includes(pr.c))return;
      if(pr.v&&!TEXTS[b]){out.push(`<a class="sres" href="${hashFor(b,pr.c)}"><span class="rk">Go to</span><strong>${chapLabel(b,pr.c)}</strong><span class="rt">Opens the chapter</span></a>`);}
      else if(pr.v&&pr.v<=vcount(b,pr.c)){const ref=MR(b,pr.c,pr.v);out.push(`<button class="sres" data-goto='{"type":"verse","ref":"${ref}"}'><span class="rk">Go to</span><strong>${refLabel(ref)}</strong><span class="rt">${esc(vtext(ref,"kjv"))}</span></button>`);}
      else if(!pr.v)out.push(`<a class="sres" href="${hashFor(b,pr.c)}"><span class="rk">Go to</span><strong>${chapLabel(b,pr.c)}</strong><span class="rt">${esc(CHAPTERS[CK(b,pr.c)].title)}</span></a>`);});
    if(pr.b&&!BOOKS[pr.b].chs.includes(pr.c))out.push(`<div class="sres"><span class="rk">Coming soon</span><strong>${chapLabel(pr.b,pr.c)}</strong></div>`);}
  const ql=q.toLowerCase();if(ql.length<2)return out.join("");
  Object.entries(TERMS).filter(([k,t])=>t.name.toLowerCase().includes(ql)||t.forms.some(f=>f.toLowerCase().includes(ql))||(t.tr||"").toLowerCase().includes(ql)).slice(0,6)
    .forEach(([k,t])=>out.push(`<button class="sres" data-term="${k}"><span class="rk">Word or name · ${bname(t.books[0])}</span><strong>${esc(t.name)}</strong><span class="rt">${esc(t.plain.split(/(?<=\.)\s/)[0])}</span></button>`));
  if(ql.length>=3){let n=0;BOOK_ORDER.forEach(b=>BOOKS[b].chs.forEach(c=>{for(let v=1;v<=vcount(b,c);v++){if(n>=30)return;const ref=MR(b,c,v);
      const cands=Object.keys(TEXTS[b]).map(ver=>vtext(ref,ver));const hit=cands.find(t=>t.toLowerCase().includes(ql));
      if(hit){n++;const i=hit.toLowerCase().indexOf(ql),a=Math.max(0,i-50),z=Math.min(hit.length,i+ql.length+70);
        out.push(`<button class="sres" data-goto='{"type":"verse","ref":"${ref}"}'><span class="rk">${refLabel(ref)}</span><span class="rt">${a?"…":""}${esc(hit.slice(a,i))}<b>${esc(hit.slice(i,i+ql.length))}</b>${esc(hit.slice(i+ql.length,z))}${z<hit.length?"…":""}</span></button>`);}}}));
    S.notes.filter(x=>(x.text||"").toLowerCase().includes(ql)).slice(0,5).forEach(x=>out.push(`<button class="sres" data-goto='${esc(JSON.stringify(x.target))}'><span class="rk">Your note</span><span class="rt">${esc(x.text.slice(0,140))}</span></button>`));}
  return out.length?out.join(""):`<p class="muted" style="padding:8px 2px">Nothing found for “${esc(q)}”.</p>`;}
// "Ask" search (AI). The server function suggests references and picks from your highlights and the talk list;
// the app shows the real verse text from its own copy. Signed-in only, with daily and monthly limits on the server.
const ASK_EX=["A verse about trusting God even when He doesn't take the trial away","The verse I highlighted where Nephi went into Jerusalem not knowing what to do","A talk about feeling alone"];
const SK_ICON=`<svg class="skico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/></svg>`;
const askIntro=()=>`<div class="seekcard"><div class="sk-top"><span class="sk-badge">${SK_ICON}</span><div><h3 class="sk-title">Seek</h3><span class="sk-sub">Find it by meaning, with AI</span></div></div>
<p class="sk-verse">“Seek, and ye shall find.”<span>Matthew 7:7</span></p>
<p class="sk-p">Can't remember the exact words? Describe a verse, a story, or something you highlighted, the way you'd tell a friend, then tap <b>Seek</b>.</p>
<ul class="sk-list"><li><b>Verses</b> that match the idea</li><li><b>Your highlights</b> you're trying to find again</li><li><b>Conference talks</b> on the topic</li></ul>
<p class="sk-try">Try one</p>${ASK_EX.map(x=>`<button class="sk-chip" data-askex="${esc(x)}">“${esc(x)}”</button>`).join("")}
<p class="sk-fine">Seek uses AI and shows the real scripture text. Always read the verse in context.</p></div>`;
const ASK_URL="https://us-central1-joined-3adda.cloudfunctions.net/askSearch";
const skCard=(kind,ref,text,why,attrs,tag)=>`<${tag||"button"} class="skr" ${attrs||""}><span class="skm"><span class="skk skk-${kind[0]}">${kind[1]}</span><span class="skref">${ref}</span></span>${text?`<span class="skt">${text}</span>`:""}${why?`<span class="skw">${esc(why)}</span>`:""}</${tag||"button"}>`;
const skPlain=h=>/Nothing found for/.test(h)?"":h;
const skHead=q=>`<div class="skhead"><span class="sk-badge sm">${SK_ICON}</span><span><b>Seek</b> <i>${q}</i></span></div>`;
async function askAI(q){const el=$("#hres");q=q.trim();if(q.length<3)return;el.hidden=false;
  const u=typeof fbAuth!=="undefined"&&fbAuth&&fbAuth.currentUser;
  const plain=doSearch(q);
  if(!u){el.innerHTML=skPlain(plain)+`<p class="sknote">Sign in to use <b>Seek</b>, which finds verses, your highlights and talks by meaning.</p>`;return;}
  el.innerHTML=`<div class="skload"><span class="sk-badge sm">${SK_ICON}</span><b>Seeking</b><span class="skd"></span><span class="skd"></span><span class="skd"></span></div>`;
  const hrefs=[...new Set([...Object.keys(S.hl).sort((a,b)=>((S.hlt||{})[b]||0)-((S.hlt||{})[a]||0)),...(S.marks||[]).map(m=>m.ref)])].filter(r=>BOOKS[PR(r).b]).slice(0,200);
  await Promise.all([...new Set(hrefs.map(r=>PR(r).b))].map(ensureText));
  const hl=hrefs.map(r=>refLabel(r)+": "+(vtext(r,verOf(PR(r).b))||"").slice(0,180));
  const talks=TALKS.map(t=>`${t.t} (${t.sp}, ${t.d})`);
  let j;try{const r=await fetch(ASK_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+await u.getIdToken()},body:JSON.stringify({q,hl,talks})});
    j=await r.json();if(!r.ok){const e=j&&j.error;
      const why=e==="free_used"?"You've used your 20 free Seek searches. More will be available to buy soon.":e==="monthly"?"Seek is paused until next month.":e==="signin"?"Please sign in again to use Seek.":"Seek isn't available right now.";
      el.innerHTML=skPlain(plain)+`<p class="sknote">${why}</p>`;return;}}
  catch(e){el.innerHTML=skPlain(plain)||`<p class="sknote">Seek needs an internet connection.</p>`;return;}
  const out=[];
  (j.highlights||[]).forEach(h=>{const r=hrefs[h.i];if(!r)return;out.push(skCard(["h","Your highlight"],refLabel(r),esc(vtext(r,verOf(PR(r).b))||""),h.why,`data-goto='{"type":"verse","ref":"${r}"}'`));});
  for(const v of (j.verses||[])){const lab=`${v.book} ${v.chapter}:${v.verse}`,p=parseRef(lab);
    if(p&&p.b&&BOOKS[p.b]&&BOOKS[p.b].chs.includes(p.c)&&await ensureText(p.b)&&p.v&&p.v<=vcount(p.b,p.c)){const r=MR(p.b,p.c,p.v);
      if(hrefs.includes(r)&&(j.highlights||[]).some(h=>hrefs[h.i]===r))continue;
      out.push(skCard(["v","Verse"],refLabel(r),esc(vtext(r,verOf(p.b))),v.why,`data-goto='{"type":"verse","ref":"${r}"}'`));}
    else out.push(skCard(["n","Not in Joined yet"],esc(lab),"",v.why,"","div"));}
  (j.talks||[]).forEach(t=>{const T=TALKS[t.i];if(!T)return;out.push(skCard(["t","Talk"],`${esc(T.sp)} · ${esc(T.d)}`,esc(T.t),t.why,`href="${T.u}" target="_blank" rel="noopener"`,"a"));});
  if(typeof j.left==="number"&&j.left>=0&&j.left<=10)out.push(`<p class="skleft">${j.left===0?"That was your last free Seek search.":j.left+" free Seek search"+(j.left===1?"":"es")+" left"}</p>`);
  if(j.note)out.push(`<p class="sknote">${esc(j.note)}</p>`);
  const words=/Nothing found for/.test(plain)?"":plain;
  el.innerHTML=out.length||words?(out.length?skHead("for “"+esc(q)+"”"):"")+out.join("")+words:`<p class="sknote">Nothing found for that. Try describing it another way.</p>`;}
const TOPICS=[["Faith in Jesus Christ","Trusting Him enough to act"],["Repentance","Turning back to God"],["The Atonement of Jesus Christ","His power to save and heal"],["Hope","An anchor to the soul"],["Prayer","Talking with Heavenly Father"],["Charity","The pure love of Christ"],["Forgiveness","Receiving it and giving it"],["Grace","Help beyond our own strength"],["Covenants","Promises that bind us to God"],["The Holy Ghost","Comfort, warning and witness"],["Personal Revelation","Hearing Him for yourself"],["Obedience","Choosing His way"],["Trials and Adversity","When the furnace is hot"],["Peace","Peace in a troubled world"],["Gratitude","Seeing His hand"],["Service","Ministering as He did"],["Temples","His holy house"],["Families","Eternal relationships"],["Scripture Study","Feasting on the word"],["Testimony","Knowing for yourself"]];
const VOLUMES=[
 {id:"ot",n:"Old Testament",s:"Old Testament",books:"Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi"},
 {id:"nt",n:"New Testament",s:"New Testament",books:"Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation"},
 {id:"bofm",n:"Book of Mormon",s:"Book of Mormon",books:"1 Nephi|2 Nephi|Jacob|Enos|Jarom|Omni|Words of Mormon|Mosiah|Alma|Helaman|3 Nephi|4 Nephi|Mormon|Ether|Moroni"},
 {id:"dc",n:"Doctrine and Covenants",s:"D&C",books:"Doctrine and Covenants|Official Declarations"},
 {id:"pgp",n:"Pearl of Great Price",s:"Pearl of Great Price",books:"Moses|Abraham|Joseph Smith—Matthew|Joseph Smith—History|Articles of Faith"}];
// Which listed book is readable here, and how many chapters it has in all
const READY_BASE={"Daniel":["dan",12],"Hosea":["hos",14],"Joel":["joel",3],"Matthew":["mat",28],"1 Nephi":["1ne",22],"Doctrine and Covenants":["dc",138],"Abraham":["abr",5]};
const READY=Object.assign({},READY_BASE,typeof MORE_READY!=="undefined"?MORE_READY:{});
const ICO={topics:`<svg viewBox="0 0 24 24"><path d="M4 6h7v7H4zM13 6h7v4h-7zM13 12h7v7h-7zM4 15h7v4H4z"/></svg>`,teach:`<svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`,lesson:`<svg viewBox="0 0 24 24"><path d="M4 5h16v11H4z"/><path d="M8 20h8M12 16v4M7 9h6M7 12h9"/></svg>`,book:`<svg viewBox="0 0 24 24"><path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/></svg>`};
function homeFoot(){return `<footer class="h-foot"><div class="foot-row"><p><strong>Free for everyone.</strong> If this site helps your study, a small gift keeps it running.</p><button class="btn donate-btn" disabled title="Connect a Ko-fi, Buy Me a Coffee or PayPal link here">Donate</button></div>
    <button class="linkbtn" data-tour style="align-self:flex-start">How to use Joined</button>
    <details><summary>Add this site to your Home Screen</summary><p><strong>iPhone or iPad (Safari):</strong> tap Share, then <i>Add to Home Screen</i>. <strong>Android (Chrome):</strong> tap ⋮, then <i>Add to Home screen</i>. <strong>Computer:</strong> click the install icon in the address bar.</p></details>
    <p class="muted">Not an official publication of The Church of Jesus Christ of Latter-day Saints.</p></footer>`;}
const studyLinks=()=>`<section class="hsect"><h2 class="h4-h">Study and prepare</h2><div class="links3">
    <a class="link3" href="#topics"><span class="vol-ico">${ICO.topics}</span><div><strong>Study by topic</strong><span>Faith, repentance, hope and more: key scriptures, quotes and talks</span></div><span class="arr">→</span></a>
    <a class="link3" href="#prepare"><span class="vol-ico">${ICO.teach}</span><div><strong>Prepare to teach or speak</strong><span>Help building a talk or a lesson</span></div><span class="arr">→</span></a>
    <a class="link3" href="#books"><span class="vol-ico">${ICO.lesson}</span><div><strong>Your books</strong><span>Add books you own, and each verse shows where they talk about it</span></div><span class="arr">→</span></a></div></section>`;
function renderHome(){
  let last=LAST;try{last=localStorage.getItem(KEY+"-last")||LAST;}catch(e){}
  if(!CHAPTERS[last])last="";const [lb,lcs]=(last||"dan.1").split("."),lc=+lcs;
  const w=cfmNow(),rec=recentItems();
  const IC={read:`<svg viewBox="0 0 24 24"><path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z"/><path d="M12 6v13.5"/></svg>`,cal:`<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>`};
  $("#reader").innerHTML=`<div class="home4">${famButton()}
  <section class="hero4"><img class="h4-mark" src="${LOGO_MARK}" alt="Joined logo: a bundle of sticks bound together over an open book">
    <h1 class="h4-word">Joined</h1><span class="h4-orn" aria-hidden="true"></span><p class="h4-tag">“They shall become one in thine hand.”</p>
    <div class="h4-acts"><button class="btn h4-tour" data-tour>How to use Joined</button></div></section>

  <section class="today4">
    <a class="t4row" href="${hashFor(lb,lc)}"><span class="t4-ico" aria-hidden="true">${IC.read}</span><div class="t4-txt"><span class="t4-eye">Resume</span><strong>${chapLabel(lb,lc)}</strong><span>${esc(CHAPTERS[CK(lb,lc)].title)}</span></div><span class="arr" aria-hidden="true">→</span></a>
    ${w?`<div class="t4row"><span class="t4-ico" aria-hidden="true">${IC.cal}</span><div class="t4-txt"><span class="t4-eye">Come, Follow Me · ${fmtWeek(w)}</span><strong>${esc(w.block)}</strong><span>${esc(w.title)}</span></div><div class="t4-acts"><a class="btn primary" href="#dan-${w.ch}">Read</a><a class="btn" href="${w.u}" target="_blank" rel="noopener">Lesson ↗</a></div></div>`
      :`<a class="t4row" href="${CFM_HOME}" target="_blank" rel="noopener"><span class="t4-ico" aria-hidden="true">${IC.cal}</span><div class="t4-txt"><span class="t4-eye">Come, Follow Me</span><strong>This week's lesson</strong><span>Open the 2026 Old Testament manual</span></div><span class="arr">↗</span></a>`}
  </section>

  <section class="hsect"><div class="h-head"><h2 class="h4-h">Library</h2><span class="muted" style="font-size:13px">More books coming soon</span></div>
    <div class="shelf">${VOLUMES.map(v=>`<a class="cover" href="#vol-${v.id}"><span class="cv-in"><span class="cv-top"><span class="cv-rule" aria-hidden="true"></span><strong class="cv-title">${v.n}</strong><span class="cv-rule" aria-hidden="true"></span></span><img class="cv-emb" src="${LOGO_MARK}" alt=""></span></a>`).join("")}</div></section>

  ${studyLinks()}

  ${rec.length?`<section class="hsect"><div class="h-head"><h2 class="h4-h">Your recent study</h2><a class="linkbtn" href="${hashFor(lb,lc)}" data-open="notes">All notes →</a></div><div class="recent">${recentHTML()}</div></section>`:""}
  ${homeFoot()}</div>`;
  ensureFor(recentRefs(5),()=>{if(view==="home")renderHome();});
}
function renderStudy(){const all=recentItems(200);
  $("#reader").innerHTML=`<div class="home4"><h1 class="h4-h study-h">Study</h1>${famButton()}${studyLinks()}
  <section class="hsect"><div class="h-head"><h2 class="h4-h">Your highlights and notes</h2><span class="muted" style="font-size:13px">${all.length?all.length+" saved":""}</span></div><div class="recent">${recentHTML(200)}</div></section></div>`;
  ensureFor(recentRefs(200),()=>{if(view==="study")renderStudy();});}
let PENDING=null;
function tryIt(k){const T={term:["dan",1,{type:"term",key:"babylon"},null],orig:["mat",5,{type:"term",key:"teleios"},["term","Original"]],history:["dan",3,{type:"history"},["history","History"]],verse:["dan",1,{type:"verse",ref:"dan.1:8"},["verse","Talks"]]}[k];
  if(!T)return;if(T[3])TAB[T[3][0]]=T[3][1];else TAB.term="Definition";PENDING=T[2];const h=hashFor(T[0],T[1]);if(location.hash===h)route();else location.hash=h;}
function hqFit(){const t=$("#hq");if(!t)return;t.style.height="auto";const cs=getComputedStyle(t),lh=parseFloat(cs.lineHeight)||24,pad=parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom),max=lh*4+pad;t.style.height=Math.min(t.scrollHeight,max)+"px";t.style.overflowY=t.scrollHeight>max?"auto":"hidden";}
window.addEventListener("resize",()=>{if(!$("#hsearch").hidden)hqFit();});
function toggleSearch(force){const el=$("#hsearch");const show=force!==undefined?force:el.hidden;el.hidden=!show;document.body.classList.toggle("sheet-open",show);if(show){const q=$("#hq");q.value="";hqFit();$("#hres").innerHTML=askIntro();$("#hres").hidden=false;q.focus();}}
document.addEventListener("input",e=>{if(e.target.id==="hq"){hqFit();const h=e.target.value.trim()?doSearch(e.target.value):askIntro();$("#hres").innerHTML=h;$("#hres").hidden=!h;}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#hsearch").hidden)toggleSearch(false);if(e.key==="Enter"&&e.target.id==="hq"&&!e.shiftKey){e.preventDefault();e.target.blur();if(!parseRef(e.target.value)&&e.target.value.trim().split(/\s+/).length>=3)askAI(e.target.value);}});
document.addEventListener("click",e=>{const b=e.target.closest("[data-try],[data-search]");
  if(e.target.closest("[data-seek]")){const v=$("#hq").value;if(v.trim().length>=3)askAI(v);else{$("#hq").placeholder="Describe what you're looking for";$("#hq").focus();}return;}
  const ax=e.target.closest("[data-askex]");if(ax){$("#hq").value=ax.dataset.askex;hqFit();askAI(ax.dataset.askex);return;}
  if(e.target.closest("#hres .sres, #hres button.skr"))setTimeout(()=>toggleSearch(false),0);
  if(!b)return;const d=b.dataset;
  if(d.try)tryIt(d.try);
  else if("search" in d)toggleSearch();
});
function volumeBooks(V){const list=V.books.split("|");
  const ready=list.filter(b=>READY[b]),later=list.filter(b=>!READY[b]);
  return `<section class="hsect"><h2 class="h4-h">Ready to study</h2>${ready.map(name=>{const [b,total]=READY[name],B=BOOKS[b];
    if(total===1&&B.chs.includes(1))return `<a class="vbook vb-one" href="${hashFor(b,1)}"><div class="vb-head"><strong>${name}</strong><em>${esc(B.blurb)}</em></div><span class="vb-chev" aria-hidden="true">›</span></a>`;
    return `<details class="vbook"><summary class="vb-head"><strong>${name}</strong><em>${esc(B.blurb)}</em><span class="vb-count">${total} ${unit(b).toLowerCase()}s</span><span class="vb-chev" aria-hidden="true">›</span></summary>
      <div class="vb-grid">${Array.from({length:total},(_,i)=>i+1).map(c=>B.chs.includes(c)?`<a href="${hashFor(b,c)}" aria-label="${esc(chapLabel(b,c))}">${c}</a>`:`<span aria-label="${esc(chapLabel(b,c))}, coming soon">${c}</span>`).join("")}</div>
      <p class="vb-note">${B.chs.length>=total?`All ${total} ${unit(b).toLowerCase()}s are ready.`:`${unit(b)}s ${B.chs[0]}–${B.chs[B.chs.length-1]} are ready. The rest are coming soon.`}</p></details>`;}).join("")}</section>
  ${later.length?`<section class="hsect"><h2 class="h4-h">Coming soon</h2><div class="vb-later">${later.map(n=>`<span>${esc(n)}</span>`).join("")}</div></section>`:""}`;}
function renderVolume(id){const V=VOLUMES.find(x=>x.id===id)||VOLUMES[0];
  $("#reader").innerHTML=`<div class="home4"><a class="back" href="#scriptures">← Scriptures</a>
  <section class="volhead"><span class="cv-rule" aria-hidden="true"></span><h1>${V.n}</h1><span class="cv-rule" aria-hidden="true"></span></section>
  ${volumeBooks(V)}
  ${homeFoot()}</div>`;}
// Scriptures: all five volumes on one screen, reached from the bottom bar
let SCR_VOL=null;
function renderScriptures(){let id=SCR_VOL;if(!id){try{id=localStorage.getItem(KEY+"-scrvol");}catch(e){}}
  if(!VOLUMES.some(v=>v.id===id)){const lb=(LAST||"dan.1").split(".")[0],v=BOOKS[lb]&&VOLUMES.find(x=>x.n===BOOKS[lb].vol);id=v?v.id:"ot";}
  const V=VOLUMES.find(x=>x.id===id);
  $("#reader").innerHTML=`<div class="home4 scr"><h1 class="h4-h study-h">Scriptures</h1>
  <div class="scr-tabs" role="tablist" aria-label="Volumes">${VOLUMES.map(v=>`<button role="tab" class="scr-tab" data-scrvol="${v.id}" aria-selected="${v.id===V.id}">${esc(v.s)}</button>`).join("")}</div>
  <p class="scr-sub">${V.n}</p>${volumeBooks(V)}</div>`;}
// Books load on demand, so make sure the text of saved highlights is there before showing it
function ensureFor(refs,again){const bs=[...new Set(refs.map(r=>{const p=PR(r);return p&&p.b;}).filter(b=>b&&BOOKS[b]&&!TEXTS[b]))];if(!bs.length)return;Promise.all(bs.map(ensureText)).then(()=>{if(again)again();});}
const recentRefs=lim=>recentItems(lim).map(x=>x.kind==="note"?(x.n.target.type==="verse"?x.n.target.ref:null):x.kind==="mark"?x.m.ref:x.ref).filter(Boolean);
function renderTopics(){
  $("#reader").innerHTML=`<div class="home3"><a class="back" href="#home">← Home</a>
  <section class="hsect"><div class="h-head"><h1 class="pg-title">Study by topic</h1><span class="soon">Coming soon</span></div>
    <p class="hlede">Need a talk or lesson quickly? Pick a topic, or type a few words like <i>faith, trials, hope</i>. You'll get the key scriptures, short quotes from Church leaders, and a summary of each talk with a link to read it in full.</p>
    <div class="search dim"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input type="text" disabled placeholder="Type a few words: faith, trials, hope" aria-label="Topic search (coming soon)"></div>
    <div class="topics">${TOPICS.map(([t,d],i)=>`<div class="topic" style="--h:${(i*37)%360}"><strong>${esc(t)}</strong><span>${esc(d)}</span></div>`).join("")}</div></section>${homeFoot()}</div>`;}
function renderPrepare(){
  $("#reader").innerHTML=`<div class="home3"><a class="back" href="#home">← Home</a>
  <section class="hsect"><div class="h-head"><h1 class="pg-title">Prepare to teach or speak</h1></div>
    <div class="tools">
      <div class="tool"><span class="tool-ico" aria-hidden="true">${ICO.teach}</span><div><strong>Talk builder</strong> <span class="soon">Coming soon</span><p>Paste the talk you were assigned. Add a story from your life and a favorite verse, choose 5, 10, 15 or 20 minutes, and get an outline you can make your own.</p></div></div>
      <a class="tool tool-go" href="#build"><span class="tool-ico" aria-hidden="true">${ICO.lesson}</span><div><strong>Lesson builder</strong><p>Open a chapter with the Come, Follow Me and seminary sections placed right next to the verses they cover. Add your own questions, quotes and activities, then make slides or a printout.</p><span class="tool-cta">Start a lesson →</span></div></a>
    </div></section>${homeFoot()}</div>`;}
function route(){let h=location.hash;if(/^#import=/.test(h)){takeSharedLink();return;}const old=h.match(/^#daniel-(\d+)$/);if(old)h="#dan-"+old[1];
  const m=h.match(/^#([a-z0-9]+)-(\d+)$/);
  if(m&&BOOKS[m[1]]&&BOOKS[m[1]].chs.includes(+m[2])){view="read";const nb=m[1],n=+m[2];
    if(nb!==bk||n!==ch){const keep=panelView.type==="notes"||panelView.type==="library"||(panelView.type==="verse"&&PR(panelView.ref)&&PR(panelView.ref).b===nb&&PR(panelView.ref).c===n);bk=nb;ch=n;if(!keep)panelView={type:"guide"};}
    LAST=CK(bk,ch);try{localStorage.setItem(KEY+"-last",LAST);}catch(e){}}
  else{const vm=h.match(/^#vol-(\w+)$/),bm=h.match(/^#build-([a-z0-9]+)-(\d+)(?:~(\w+))?$/),gm=h.match(/^#build~([\w-]+)$/);view=vm?"volume":bm&&BOOKS[bm[1]]&&BOOKS[bm[1]].chs.includes(+bm[2])?"build":h==="#build"?"buildpick":gm?"buildgroup":h==="#family"?"family":h==="#study"?"study":h==="#scriptures"?"scriptures":h==="#books"?"books":h==="#topics"?"topics":h==="#prepare"?"prepare":"home";if(vm)volId=vm[1];if(view==="build"){buildKey=CK(bm[1],+bm[2]);buildLesson=bm[3]||null;}if(gm)buildGroup=gm[1];else LB=null;}
  if(PENDING&&view==="read"){panelView=PENDING;PENDING=null;}
  document.body.classList.toggle("on-home",view!=="read");renderTop();
  if(view!=="read"){({home:renderHome,scriptures:renderScriptures,study:renderStudy,family:()=>{FAM_OFF=0;renderFamily();},books:renderBooks,topics:renderTopics,prepare:renderPrepare,volume:()=>renderVolume(volId),buildpick:renderBuildPick,buildgroup:()=>renderBuildGroup(buildGroup),build:()=>{LADD=null;LEDIT=null;renderBuild(buildKey,buildLesson);}})[view]();$("#panel").classList.remove("open");}
  else if(!TEXTS[bk]){$("#panel").classList.remove("open");$("#reader").innerHTML=`<div class="page"><p class="muted" style="padding:48px 0;text-align:center">Loading ${esc(bname(bk))}…</p></div>`;
    const want=bk;ensureText(bk).then(ok=>{if(view!=="read"||bk!==want)return;if(ok)route();else $("#reader").innerHTML=`<div class="page"><p class="muted" style="padding:48px 0;text-align:center">Couldn’t load ${esc(bname(bk))}. Check your connection and try again.</p></div>`;});}
  else{renderReader();renderPanel();}
  if(typeof SWIPE_DIR!=="undefined"&&SWIPE_DIR&&view==="read"){const r=$("#reader");r.classList.remove("sw-l","sw-r");void r.offsetWidth;r.classList.add(SWIPE_DIR>0?"sw-r":"sw-l");SWIPE_DIR=0;}
  renderLBar();const vEl=view==="read"&&panelView.type==="verse"&&document.getElementById(vid(panelView.ref));if(vEl)vEl.scrollIntoView({block:"center"});else window.scrollTo(0,0);}
window.addEventListener("hashchange",route);
document.addEventListener("click",e=>{const a=e.target.closest("a[data-open]");if(a){setTimeout(()=>open({type:a.dataset.open}),0);}
  const hb=e.target.closest("[data-home]");if(hb){location.hash="#home";}
  const sv=e.target.closest("[data-scrvol]");if(sv){SCR_VOL=sv.dataset.scrvol;try{localStorage.setItem(KEY+"-scrvol",SCR_VOL);}catch(x){}renderScriptures();return;}
  const cb=e.target.closest("[data-cont]");if(cb){let l=LAST;try{l=localStorage.getItem(KEY+"-last")||LAST;}catch(x){}const [b,c]=(CHAPTERS[l]?l:"dan.1").split(".");location.hash=hashFor(b,+c);}});
const GC="https://www.churchofjesuschrist.org/study/general-conference/";
// 1996 to today; First Presidency, Quorum of the Twelve and Relief Society General Presidency only. Each checked against the talk's footnotes.
const TALKS=[
 {t:"The Laborers in the Vineyard",sp:"Elder Jeffrey R. Holland",role:"Quorum of the Twelve",d:"April 2012",u:GC+"2012/04/the-laborers-in-the-vineyard?lang=eng",refs:["mat.20:1-15"]},
 {t:"None Were with Him",sp:"Elder Jeffrey R. Holland",role:"Quorum of the Twelve",d:"April 2009",u:GC+"2009/04/none-were-with-him?lang=eng",refs:["mat.26:24", "mat.26:38", "mat.26:40", "mat.26:45", "mat.26:56", "mat.26:65-66", "mat.27:21", "mat.27:26", "mat.27:46"]},
 {t:"Preparation for the Second Coming",sp:"Elder Dallin H. Oaks",role:"Quorum of the Twelve",d:"April 2004",u:GC+"2004/04/preparation-for-the-second-coming?lang=eng",refs:["mat.24:5-15", "mat.24:32-33", "mat.24:42-43", "mat.24:44", "mat.24:45-46", "mat.25:12", "mat.25:13", "1ne.14:14", "1ne.22:17"]},
 {t:"The Second Great Commandment",sp:"President Russell M. Nelson",role:"President of the Church",d:"October 2019",u:GC+"2019/10/46nelson?lang=eng",refs:["mat.22:37-39", "mat.25:35-36", "mat.25:40"]},
 {t:"Bear Up Their Burdens with Ease",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"April 2014",u:GC+"2014/04/bear-up-their-burdens-with-ease?lang=eng",refs:["mat.11:28-30"]},
 {t:"But We Heeded Them Not",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"April 2022",u:GC+"2022/04/14bednar?lang=eng",refs:["mat.11:28-30", "1ne.8:24", "1ne.8:30", "1ne.8:33", "1ne.15:23-24"]},
 {t:"Come and See",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"October 2014",u:GC+"2014/10/come-and-see?lang=eng",refs:["mat.28:19-20", "1ne.11:22-23", "1ne.8:11-12", "1ne.8:15"]},
 {t:"Fruit",sp:"Elder Neil L. Andersen",role:"Quorum of the Twelve",d:"October 2019",u:GC+"2019/10/56andersen?lang=eng",refs:["mat.7:16", "mat.7:17", "1ne.8:4-12", "1ne.8:28", "1ne.8:33", "1ne.11:23", "1ne.11:25", "1ne.15:36"]},
 {t:"The Creation",sp:"Elder Russell M. Nelson",role:"Quorum of the Twelve",d:"April 2000",u:GC+"2000/04/the-creation?lang=eng",refs:["abr.4:1-5", "abr.4:6-8", "abr.4:9-13", "abr.4:14-19", "abr.4:20-21", "abr.4:22-23", "abr.4:24-31", "abr.4:26-27", "abr.4:28", "abr.5:1-3"]},
 {t:"Trust in God, Then Go and Do",sp:"President Henry B. Eyring",role:"First Presidency",d:"October 2010",u:GC+"2010/10/trust-in-god-then-go-and-do?lang=eng",refs:["mat.14:25-31", "1ne.3:7", "abr.3:27-28"]},
 {t:"Converted unto the Lord",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"October 2012",u:GC+"2012/10/converted-unto-the-lord?lang=eng",refs:["mat.7:7", "mat.16:15-17", "mat.25:4-9"]},
 {t:"Of Seeds and Soils",sp:"President James E. Faust",role:"First Presidency",d:"October 1999",u:GC+"1999/10/of-seeds-and-soils?lang=eng",refs:["mat.13:4-8", "mat.13:19-23", "mat.13:22", "mat.19:20-22"]},
 {t:"\u201cIf Ye Had Known Me\u201d",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"October 2016",u:GC+"2016/10/if-ye-had-known-me?lang=eng",refs:["mat.7:21-23", "mat.25:10-12", "mat.4:18-20", "mat.16:24"]},
 {t:"Wanted: Hands and Hearts to Hasten the Work",sp:"Sister Linda K. Burton",role:"Relief Society General President",d:"April 2014",u:GC+"2014/04/wanted-hands-and-hearts-to-hasten-the-work?lang=eng",refs:["mat.19:16-22"]},
 {t:"Arise and Shine Forth",sp:"Sister Ann M. Dibb",role:"Young Women General Presidency",d:"April 2012",u:GC+"2012/04/arise-and-shine-forth?lang=eng",refs:["dan.6:3", "dan.6:10"]},
 {t:"In the Strength of the Lord",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"October 2004",u:GC+"2004/10/in-the-strength-of-the-lord?lang=eng",refs:["1ne.19:23"]},
 {t:"He Is Risen",sp:"Elder Ronald A. Rasband",role:"Quorum of the Twelve",d:"April 2026",u:GC+"2026/04/45rasband?lang=eng",refs:["mat.14:31"]},
 {t:"That We May Always Have His Spirit to Be with Us",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"April 2006",u:GC+"2006/04/that-we-may-always-have-his-spirit-to-be-with-us?lang=eng",refs:["1ne.16:10", "1ne.16:28", "1ne.16:29", "1ne.18:12", "1ne.18:21"]},
 {t:"To Grow Up unto the Lord",sp:"Sister Anne C. Pingree",role:"Relief Society General Presidency",d:"April 2006",u:GC+"2006/04/to-grow-up-unto-the-lord?lang=eng",refs:["1ne.17:8-9", "1ne.17:3", "1ne.18:3"]},
 {t:"Your Celestial Guide",sp:"Sister Sharon G. Larsen",role:"Young Women General Presidency",d:"April 2001",u:GC+"2001/04/your-celestial-guide?lang=eng",refs:["1ne.17:45", "1ne.18:1", "1ne.18:2", "1ne.18:3"]},
 {t:"Focus and Priorities",sp:"Elder Dallin H. Oaks",role:"Quorum of the Twelve",d:"April 2001",u:GC+"2001/04/focus-and-priorities?lang=eng",refs:["mat.25:14-30", "mat.6:19", "mat.6:33", "mat.5:6", "dan.12:4", "1ne.19:23"]},
 {t:"Keys, Covenants, and Easter",sp:"Elder Quentin L. Cook",role:"Quorum of the Twelve",d:"April 2026",u:GC+"2026/04/56cook?lang=eng",refs:["mat.16:19"]},
 {t:"Healing the Sick",sp:"Elder Dallin H. Oaks",role:"Quorum of the Twelve",d:"April 2010",u:GC+"2010/04/healing-the-sick?lang=eng",refs:["mat.9:18", "mat.9:22", "1ne.7:12"]},
 {t:"Sustaining the Prophets",sp:"Elder David B. Haight",role:"Quorum of the Twelve",d:"October 1998",u:GC+"1998/10/sustaining-the-prophets?lang=eng",refs:["mat.10:39"]},
 {t:"The Divine Gift of Gratitude",sp:"President Thomas S. Monson",role:"President of the Church",d:"October 2010",u:GC+"2010/10/the-divine-gift-of-gratitude?lang=eng",refs:["mat.15:32-38", "mat.4:19"]},
 {t:"The Book of Mormon: Another Testament of Jesus Christ\u2014Plain and Precious Things",sp:"President Boyd K. Packer",role:"Quorum of the Twelve",d:"April 2005",u:GC+"2005/04/the-book-of-mormon-another-testament-of-jesus-christ-plain-and-precious-things?lang=eng",refs:["1ne.4:6", "1ne.8:12", "1ne.13:20-42", "1ne.13:28", "1ne.14:23", "1ne.17:45", "1ne.19:23-24"]},
 {t:"Desire",sp:"Elder Dallin H. Oaks",role:"Quorum of the Twelve",d:"April 2011",u:GC+"2011/04/desire?lang=eng",refs:["1ne.10:19"]},
 {t:"Hosanna to the Most High God",sp:"Elder Ronald A. Rasband",role:"Quorum of the Twelve",d:"April 2023",u:GC+"2023/04/53rasband?lang=eng",refs:["mat.21:9", "mat.21:10-11", "mat.21:15", "mat.20:18-19", "mat.26:17", "mat.26:26-29", "mat.25:1", "mat.25:1-12", "mat.25:6", "mat.25:12", "mat.7:22-23", "mat.21:17-21", "mat.21:28-32", "mat.21:33-46", "mat.24:32-33", "1ne.11:25", "abr.3:27"]},
 {t:"Gaining a Testimony of God the Father; His Son, Jesus Christ; and the Holy Ghost",sp:"Elder Robert D. Hales",role:"Quorum of the Twelve",d:"April 2008",u:GC+"2008/04/gaining-a-testimony-of-god-the-father-his-son-jesus-christ-and-the-holy-ghost?lang=eng",refs:["mat.3:16-17", "mat.26:39"]},
 {t:"The Times of Restitution of All Things",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"April 2025",u:GC+"2025/04/41bednar?lang=eng",refs:["dan.2:28", "dan.2:35", "dan.2:44", "1ne.11:18-21", "1ne.13:40", "abr.2:9-11"]},
 {t:"Scriptural Witnesses",sp:"Elder Russell M. Nelson",role:"Quorum of the Twelve",d:"October 2007",u:GC+"2007/10/scriptural-witnesses?lang=eng",refs:["mat.18:16", "1ne.11:13-20", "1ne.13:28-29", "1ne.13:40"]},
 {t:"Charity Never Faileth",sp:"President Thomas S. Monson",role:"President of the Church",d:"October 2010",u:GC+"2010/10/charity-never-faileth?lang=eng",refs:["mat.7:1","mat.7:3"]},
 {t:"\u201cLord, Is It I?\u201d",sp:"President Dieter F. Uchtdorf",role:"First Presidency",d:"October 2014",u:GC+"2014/10/lord-is-it-i?lang=eng",refs:["mat.7:3","mat.7:5"]},
 {t:"Teachings of Jesus",sp:"Elder Dallin H. Oaks",role:"Quorum of the Twelve",d:"October 2011",u:GC+"2011/10/teachings-of-jesus?lang=eng",refs:["mat.7:7","mat.7:21","mat.7:22-23"]},
 {t:"Ask, Seek, Knock",sp:"Elder Russell M. Nelson",role:"Quorum of the Twelve",d:"October 2009",u:GC+"2009/10/ask-seek-knock?lang=eng",refs:["mat.7:7"]},
 {t:"Seeking Answers to Spiritual Questions",sp:"Sister Tracy Y. Browning",role:"Primary General Presidency",d:"October 2024",u:GC+"2024/10/42browning?lang=eng",refs:["mat.7:7","mat.7:11"]},
 {t:"The Voice of Warning",sp:"Elder D. Todd Christofferson",role:"Quorum of the Twelve",d:"April 2017",u:GC+"2017/04/the-voice-of-warning?lang=eng",refs:["mat.7:13-14"]},
 {t:"Why the Covenant Path",sp:"Elder D. Todd Christofferson",role:"Quorum of the Twelve",d:"April 2021",u:GC+"2021/04/54christofferson?lang=eng",refs:["mat.7:14"]},
 {t:"How Firm Our Foundation",sp:"Elder Russell M. Nelson",role:"Quorum of the Twelve",d:"April 2002",u:GC+"2002/04/how-firm-our-foundation?lang=eng",refs:["mat.7:24-27"]},
 {t:"The Stone Cut Out of the Mountain",sp:"President Gordon B. Hinckley",role:"President of the Church",d:"October 2007",u:GC+"2007/10/the-stone-cut-out-of-the-mountain?lang=eng",refs:["dan.2:31-45"]},
 {t:"Why the Church",sp:"Elder D. Todd Christofferson",role:"Quorum of the Twelve",d:"October 2015",u:GC+"2015/10/why-the-church?lang=eng",refs:["dan.2:28","dan.2:35","dan.2:44","dan.2:45"]},
 {t:"Be Not Afraid, Only Believe",sp:"President Dieter F. Uchtdorf",role:"First Presidency",d:"October 2015",u:GC+"2015/10/be-not-afraid-only-believe?lang=eng",refs:["dan.2:19","dan.2","dan.3"]},
 {t:"A Witness of God",sp:"Elder Neil L. Andersen",role:"Quorum of the Twelve",d:"October 2016",u:GC+"2016/10/a-witness-of-god?lang=eng",refs:["dan.2:10","dan.2:18","dan.2:26-28","dan.2:34-35","dan.2:44-45","dan.2:47"]},
 {t:"Fulfillment of Prophecy",sp:"Elder Ronald A. Rasband",role:"Quorum of the Twelve",d:"April 2020",u:GC+"2020/04/41rasband?lang=eng",refs:["dan.2:44","dan.2:45"]},
 {t:"Worship",sp:"Elder D. Todd Christofferson",role:"Quorum of the Twelve",d:"April 2025",u:GC+"2025/04/35christofferson?lang=eng",refs:["dan.3:15","dan.3:17-18","dan.3:28"]},
 {t:"A Sin-Resistant Generation",sp:"Sister Joy D. Jones",role:"Primary General President",d:"April 2017",u:GC+"2017/04/a-sin-resistant-generation?lang=eng",refs:["dan.3","dan.3:17-18"]},
 {t:"Be Ye Therefore Perfect—Eventually",sp:"Elder Jeffrey R. Holland",role:"Quorum of the Twelve",d:"October 2017",u:GC+"2017/10/be-ye-therefore-perfect-eventually?lang=eng",refs:["mat.5:48","mat.5"]},
 {t:"Blessed Are the Peacemakers",sp:"Elder Gary E. Stevenson",role:"Quorum of the Twelve",d:"October 2025",u:GC+"2025/10/12stevenson?lang=eng",refs:["mat.5:9","mat.5:10-12","mat.5:16","mat.5:39","mat.5:44"]},
 {t:"Decisions for Eternity",sp:"Elder Russell M. Nelson",role:"Quorum of the Twelve",d:"October 2013",u:GC+"2013/10/decisions-for-eternity?lang=eng",refs:["mat.5:27-28","abr.3:23","abr.3:25"]},
 {t:"Our Heartfelt All",sp:"Elder Dieter F. Uchtdorf",role:"Quorum of the Twelve",d:"April 2022",u:GC+"2022/04/57uchtdorf?lang=eng",refs:["mat.6:32-33"]},
 {t:"The Opportunity to Testify",sp:"Elder Dieter F. Uchtdorf",role:"Quorum of the Twelve",d:"October 2004",u:GC+"2004/10/the-opportunity-to-testify?lang=eng",refs:["1ne.3:7"]},
 {t:"A Lesson from the Book of Mormon",sp:"Sister Vicki F. Matsumori",role:"Primary General Presidency",d:"April 2007",u:GC+"2007/04/a-lesson-from-the-book-of-mormon?lang=eng",refs:["1ne.1:1"]},
 {t:"Strengthen Home and Family",sp:"Sister Mary N. Cook",role:"Young Women General Presidency",d:"October 2007",u:GC+"2007/10/strengthen-home-and-family?lang=eng",refs:["1ne.1:1"]},
 {t:"To Acquire Spiritual Guidance",sp:"Elder Richard G. Scott",role:"Quorum of the Twelve",d:"October 2009",u:GC+"2009/10/to-acquire-spiritual-guidance?lang=eng",refs:["1ne.3:7"]},
 {t:"Mothers Teaching Children in the Home",sp:"Elder L. Tom Perry",role:"Quorum of the Twelve",d:"April 2010",u:GC+"2010/04/mothers-teaching-children-in-the-home?lang=eng",refs:["1ne.1:1"]},
 {t:"Obedience Brings Blessings",sp:"President Thomas S. Monson",role:"President of the Church",d:"April 2013",u:GC+"2013/04/obedience-brings-blessings?lang=eng",refs:["1ne.3:7"]},
 {t:"“That I Might Draw All Men unto Me”",sp:"Elder Dale G. Renlund",role:"Quorum of the Twelve",d:"April 2016",u:GC+"2016/04/that-i-might-draw-all-men-unto-me?lang=eng",refs:["1ne.1:20","1ne.2:11","1ne.2:12","1ne.2:16"]},
 {t:"By Divine Design",sp:"Elder Ronald A. Rasband",role:"Quorum of the Twelve",d:"October 2017",u:GC+"2017/10/by-divine-design?lang=eng",refs:["1ne.4:6"]},
 {t:"Prepared to Obtain Every Needful Thing",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"April 2019",u:GC+"2019/04/54bednar?lang=eng",refs:["1ne.1:1"]},
 {t:"Our Constant Companion",sp:"President Henry B. Eyring",role:"First Presidency",d:"October 2023",u:GC+"2023/10/47eyring?lang=eng",refs:["1ne.3:7","1ne.4:5","1ne.4:6"]},
 {t:"The Family Proclamation—Words from God",sp:"Elder Ronald A. Rasband",role:"Quorum of the Twelve",d:"October 2025",u:GC+"2025/10/21rasband?lang=eng",refs:["1ne.1:1"]},
 {t:"The Tender Mercies of the Lord",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"April 2005",u:GC+"2005/04/the-tender-mercies-of-the-lord?lang=eng",refs:["1ne.1:20"]},
 {t:"I'll Go Where You Want Me to Go",sp:"Elder Dallin H. Oaks",role:"Quorum of the Twelve",d:"October 2002",u:GC+"2002/10/i-ll-go-where-you-want-me-to-go?lang=eng",refs:["1ne.3:7","1ne.2","1ne.3","1ne.4"]},
 {t:"The Power of a Personal Testimony",sp:"Elder Dieter F. Uchtdorf",role:"Quorum of the Twelve",d:"October 2006",u:GC+"2006/10/the-power-of-a-personal-testimony?lang=eng",refs:["1ne.3:7"]},
 {t:"Continue in Patience",sp:"President Dieter F. Uchtdorf",role:"First Presidency",d:"April 2010",u:GC+"2010/04/continue-in-patience?lang=eng",refs:["1ne.2:10","dc.121:2","dc.121:41","dc.121"]},
 {t:"Personal Peace in Challenging Times",sp:"Elder Quentin L. Cook",role:"Quorum of the Twelve",d:"October 2021",u:GC+"2021/10/46cook?lang=eng",refs:["dc.121:1","dc.121:3","dc.121:7-8"]},
 {t:"Proved and Strengthened in Christ",sp:"Elder Henry B. Eyring",role:"Quorum of the Twelve",d:"October 2025",u:GC+"2025/10/47eyring?lang=eng",refs:["dc.121:1-2","dc.121:7-8"]},
 {t:"Come What May, and Love It",sp:"Elder Joseph B. Wirthlin",role:"Quorum of the Twelve",d:"October 2008",u:GC+"2008/10/come-what-may-and-love-it?lang=eng",refs:["dc.121:7-8"]},
 {t:"Our Relationship with God",sp:"Elder D. Todd Christofferson",role:"Quorum of the Twelve",d:"April 2022",u:GC+"2022/04/41christofferson?lang=eng",refs:["dc.121:1-2","dc.121:7-8","dc.121:10"]},
 {t:"The Powers of the Priesthood",sp:"President Dallin H. Oaks",role:"First Presidency",d:"April 2018",u:GC+"2018/04/the-powers-of-the-priesthood?lang=eng",refs:["dc.121:41"]},
 {t:"Give Thanks in All Things",sp:"Elder Dallin H. Oaks",role:"Quorum of the Twelve",d:"April 2003",u:GC+"2003/04/give-thanks-in-all-things?lang=eng",refs:["dc.122:7"]},
 {t:"Tested, Proved, and Polished",sp:"President Henry B. Eyring",role:"First Presidency",d:"October 2020",u:GC+"2020/10/51eyring?lang=eng",refs:["dc.122:7","abr.3:25-26"]},
 {t:"We Will Prove Them Herewith",sp:"Elder David A. Bednar",role:"Quorum of the Twelve",d:"October 2020",u:GC+"2020/10/12bednar?lang=eng",refs:["abr.3:25"]}];
// A talk is tied to a verse only when it cites that verse or a short passage (4 verses or fewer). Whole-chapter citations show on the chapter list only.
const TR=r=>{const m=r.match(/^(\w+)\.(\d+)(?::(\d+)(?:-(\d+))?)?$/);return m?{b:m[1],c:+m[2],a:m[3]?+m[3]:0,z:m[4]?+m[4]:(m[3]?+m[3]:0)}:null;};
const talksForVerse=ref=>{const p=PR(ref);return TALKS.filter(x=>x.refs.some(r=>{const t=TR(r);return t&&t.a&&t.b===p.b&&t.c===p.c&&p.v>=t.a&&p.v<=t.z&&t.z-t.a<=3;}));};
const talksForChapter=(b,c)=>TALKS.filter(x=>x.refs.some(r=>{const t=TR(r);return t&&t.b===b&&t.c===c;}));
const fmtTR=r=>{const t=TR(r);return `${bname(t.b)} ${t.c}${t.a?":"+t.a+(t.z!==t.a?"–"+t.z:""):""}`;};
const talkCard=(x,showRefs)=>`<a class="talk" href="${x.u}" target="_blank" rel="noopener"><strong>${esc(x.t)}</strong><span>${esc(x.sp)}, ${esc(x.role)} · ${esc(x.d)}</span>${showRefs?`<span class="trefs">Cites ${x.refs.map(fmtTR).join(", ")}</span>`:""}</a>`;
const talkLinks=label=>`<div class="links" style="margin-top:12px"><a href="https://scriptures.byu.edu/" target="_blank" rel="noopener">More talks: BYU Scripture Citation Index ↗</a><a href="${GL+encodeURIComponent('"'+label+'"')}" target="_blank" rel="noopener">Search Church content for “${esc(label)}” ↗</a></div><p class="muted" style="font-size:12px;margin-top:8px">Talks from 1996 to today by the First Presidency, the Twelve, and the Relief Society, Young Women and Primary General Presidencies, checked by hand. They open on the Church's website or in Gospel Library.</p>`;
// Videos from the Church's own YouTube channels, tied to the verses each one shows. Checked by channel name.
const YT="https://www.youtube.com/watch?v=";
const VIDEOS=[
 {id:"QxKsmnhSMB0",t:"The Prophet Lehi Warns the People of Jerusalem",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.1:7-20"},
 {id:"-2n_ERqcSw0",t:"Lehi Counsels with His Family to Leave Jerusalem",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.2:1-3"},
 {id:"9e2-E13NHdw",t:"Lehi's Family Departs into the Wilderness",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.2:4-7"},
 {id:"Fwb2tkCGbn8",t:"Laman Attempts to Obtain the Sacred Records",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.3:9-13"},
 {id:"Q99VAD326C0",t:"An Angel Appears to Lehi's Sons",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.3:28-31"},
 {id:"s3pR8BaXS0g",t:"The Spirit Directs Nephi to Slay Laban",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.4:1-19"},
 {id:"Lya-YaQ5AVM",t:"Nephi Obtains the Sacred Records",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.4:20-38"},
 {id:"AVzRaLuzJ2I",t:"Nephi Is Led by the Spirit to Obtain the Plates of Brass (1 Nephi 3–5)",ch:"Book of Mormon: Another Testament of Jesus Christ",r:"1ne.3",whole:1},
 {id:"BTO7-Jarl-E",t:"Sermon on the Mount: The Beatitudes",ch:"The Church of Jesus Christ of Latter-day Saints",r:"mat.5:1-12"},
 {id:"Ik0aS368Kv0",t:"Sermon on the Mount: The Higher Law",ch:"The Church of Jesus Christ of Latter-day Saints",r:"mat.5",whole:1},
 {id:"YzmbLWIqUBk",t:"Sermon on the Mount: The Lord's Prayer",ch:"The Church of Jesus Christ of Latter-day Saints",r:"mat.6:9-13"},
 {id:"-3nN9-C1yKU",t:"Sermon on the Mount: Treasures in Heaven",ch:"The Church of Jesus Christ of Latter-day Saints",r:"mat.6:19-21"}];
const videosForVerse=ref=>{const p=PR(ref);return VIDEOS.filter(x=>{const t=TR(x.r);return t&&t.a&&t.b===p.b&&t.c===p.c&&p.v>=t.a&&p.v<=t.z;});};
const videosForChapter=(b,c)=>VIDEOS.filter(x=>{const t=TR(x.r);return t&&t.b===b&&t.c===c;});
const videoStart=ref=>{const p=PR(ref);return VIDEOS.some(x=>{const t=TR(x.r);return t&&t.a&&t.b===p.b&&t.c===p.c&&t.a===p.v;});};
const videoCard=x=>`<a class="vcard" href="${YT}${x.id}" target="_blank" rel="noopener"><span class="vplay" aria-hidden="true">▶</span><span><strong>${esc(x.t)}</strong><span>${esc(x.ch)} on YouTube${TR(x.r).a?` · ${esc(fmtTR(x.r))}`:""}</span></span></a>`;
let TAB={};let buildKey=null,buildLesson=null,buildGroup=null;
function tabs(kind,list){let cur=TAB[kind];if(!list.some(x=>x[0]===cur))cur=list[0][0];TAB[kind]=cur;
  return `<div class="tabs" role="tablist" data-kind="${kind}">${list.map(([id,label])=>`<button role="tab" class="tab" data-tab="${id}" aria-selected="${id===cur}">${label}</button>`).join("")}</div>
  <div class="tabbody" data-kind="${kind}" data-tabs="${list.map(x=>x[0]).join(",")}">${list.find(x=>x[0]===cur)[2]}</div>`;}
function setTab(kind,id){TAB[kind]=id;renderPanel();const tb=document.querySelector(`.tabs [data-tab="${id}"]`);tb&&tb.scrollIntoView({block:"nearest",inline:"nearest"});}
document.addEventListener("click",e=>{const t=e.target.closest(".tabs [data-tab]");if(t)setTab(t.closest(".tabs").dataset.kind,t.dataset.tab);});
document.addEventListener("keydown",e=>{const t=e.target.closest&&e.target.closest(".tabs [data-tab]");if(!t||!/Arrow(Left|Right)/.test(e.key))return;
  const all=[...t.parentNode.children],i=all.indexOf(t)+(e.key==="ArrowRight"?1:-1);if(all[i]){setTab(t.parentNode.dataset.kind,all[i].dataset.tab);const n=document.querySelector(`.tabs [data-tab="${all[i].dataset.tab}"]`);n&&n.focus();}});
let swX=null,swY=null;
document.addEventListener("touchstart",e=>{const b=e.target.closest(".tabbody");if(!b||e.target.closest(".map-open,input,textarea")){swX=null;return;}swX=e.touches[0].clientX;swY=e.touches[0].clientY;},{passive:true});
document.addEventListener("touchend",e=>{if(swX===null)return;const b=e.target.closest(".tabbody");const dx=e.changedTouches[0].clientX-swX,dy=e.changedTouches[0].clientY-swY;swX=null;
  if(!b||Math.abs(dx)<60||Math.abs(dx)<Math.abs(dy)*1.5)return;const ids=b.dataset.tabs.split(","),i=ids.indexOf(TAB[b.dataset.kind])+(dx<0?1:-1);if(ids[i])setTab(b.dataset.kind,ids[i]);},{passive:true});
const notesFor=t=>S.notes.filter(n=>n.target.type===t.type&&(t.type==="verse"?n.target.ref===t.ref:n.target.key===t.key));

function renderTop(){
  const cs=$("#chapseg");if(cs){const L=BOOKS[bk].chs,i=L.indexOf(ch),pv=L[i-1],nx=L[i+1];
    cs.innerHTML=`<button class="seg-arrow" ${pv?`data-ch="${pv}"`:"disabled"} aria-label="Previous ${unit(bk).toLowerCase()}">‹</button><button class="seg-book" data-chpick aria-expanded="false" aria-label="Choose a ${unit(bk).toLowerCase()}">${esc(bname(bk))} <b>${ch}</b><span class="caret">▾</span></button><button class="seg-arrow" ${nx?`data-ch="${nx}"`:"disabled"} aria-label="Next ${unit(bk).toLowerCase()}">›</button>
    <div class="chpop" hidden><div class="chpop-h">${esc(bname(bk))}</div><div class="chpop-g">${L.map(c=>`<button data-ch="${c}" aria-pressed="${c===ch}">${c}</button>`).join("")}</div></div>`;}
  document.body.classList.toggle("not-bible",!isBible(bk));
  document.querySelectorAll("[data-mode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===mode)));
  const nc=$("#ncount");if(nc)nc.textContent=S.notes.length;
  const tab=({home:"",read:"cont",family:"study",study:"study",books:"study",topics:"study",prepare:"study",scriptures:"scr",volume:"scr"})[view]||"";document.querySelectorAll(".nv[data-tab]").forEach(b=>b.classList.toggle("on",b.dataset.tab===tab));
  setBars(true);
}
// Bars slide away while you read downward and return when you scroll up; a double-tap on empty space toggles them.
function setBars(show){document.body.classList.toggle("bars-off",!show);}
let BAR_Y=0;window.addEventListener("scroll",()=>{if(view!=="read"||document.body.classList.contains("sheet-open"))return;const y=window.scrollY,d=y-BAR_Y;if(Math.abs(d)<10)return;BAR_Y=y;if(d>0&&y>160)setBars(false);else if(d<0)setBars(true);},{passive:true});
let TAP={t:0,x:0,y:0};const NO_TAP="button,a,input,textarea,select,.verse,#panel,.selbar,#hsearch,#acct,#tourwrap,.bnav,.chpop,header.top,.lbar,#lbar";
document.addEventListener("touchend",e=>{if(view!=="read"||e.target.closest(NO_TAP)||!e.changedTouches[0])return;const t=e.changedTouches[0],now=Date.now();
  if(now-TAP.t<320&&Math.abs(t.clientX-TAP.x)<30&&Math.abs(t.clientY-TAP.y)<30){setBars(document.body.classList.contains("bars-off"));TAP.t=0;TAP.last=now;}else TAP={last:TAP.last,t:now,x:t.clientX,y:t.clientY};},{passive:true});
document.addEventListener("dblclick",e=>{if(view!=="read"||e.target.closest(NO_TAP)||Date.now()-(TAP.last||0)<700)return;setBars(document.body.classList.contains("bars-off"));});
function renderReader(){
  const C=CHAPTERS[CK(bk,ch)],B=BOOKS[bk],bib=isBible(bk),md=bib?mode:"std",ver=verOf(bk);const fns=[];SEEN=new Set();
  const verLabel=bib?(mode==="kjv"?"KING JAMES VERSION":mode==="web"?"WORLD ENGLISH BIBLE":"KJV · WEB"):"";
  const hint=bk!=="dan"&&B.bible?(B.lang==="grk"?`or a blue <sup class="ol">G</sup> for the original Greek`:`or a blue <sup class="ol">H</sup> for the original Hebrew`):bk==="dan"?`or a blue <sup class="ol">H</sup> for the original Hebrew or Aramaic`:(bk==="hos"||bk==="joel")?`or a blue <sup class="ol">H</sup> for the original Hebrew`:bk==="mat"?`or a blue <sup class="ol">G</sup> for the original Greek`:`or a blue <sup class="ol">W</sup> to see what a word meant in Joseph Smith's day (Webster's 1828 dictionary)`;
  let h=`<div class="page"><div class="runhead"><span>${esc(bname(bk).toUpperCase())} ${ch}</span><span>${verLabel}</span></div>
  ${ch===B.chs[0]?`<h1 class="book">${B.title}</h1>`:""}<div class="chap-row"><h2 class="chap">${unit(bk).toUpperCase()} ${ch}</h2><button class="hist" data-history aria-label="History and background for ${esc(chapLabel(bk,ch))}" title="History and background">${SCROLL}</button></div>${C.sum?`<p class="summary">${esc(C.sum)}</p>`:""}${CAN_SAVE?"":`<p class="warn">This browser view is blocking saved data, so highlights and notes will disappear when you leave. Open the page in Safari or Chrome to keep them.</p>`}<p class="hint">Tap any verse to highlight it, write a note or link a talk. Tap a footnoted word for its meaning, ${hint}. Words in blue meant something different than they do today. Swipe left or right to change chapters.</p>
  <div class="cols${md==="both"?"":" two"}">`;
  for(let v=1;v<=vcount(bk,ch);v++){
    const ref=MR(bk,ch,v),hl=S.hl[ref],n=notesFor({type:"verse",ref}).length,lb=libRefs(ref).length;
    if(typeof INLINE_AT!=="undefined"&&INLINE_AT[ref])h+=INLINE_AT[ref]();
    if(ref===ARAMAIC_AT) h+=`<span class="lang-flag">From the middle of this verse to 7:28, Daniel is written in <strong>Aramaic</strong> instead of Hebrew. Tap “Syriack” to learn why.</span>`;
    const num=`<button class="vn" data-v="${ref}" aria-label="Verse ${v} options">${v}</button>`;
    const mk=(n?`<span class="mark" title="${n} note${n>1?"s":""}">✎${n>1?n:""}</span>`:"")+(lb?`<span class="lib-mark" title="Quoted in your books">BOOK</span>`:"")+"";
    const f=[];let body;
    if(md==="both") body=`<div class="both"><div><span class="ver">KJV</span>${num}${linkTerms(vtext(ref,"kjv"),f,bk,ch,v,"kjv")}${mk}</div><div><span class="ver">WEB</span>${linkTerms(vtext(ref,"web"),null,bk,ch,v,"web")}</div></div>`;
    else body=num+linkTerms(vtext(ref,ver),f,bk,ch,v,ver)+mk;
    f.forEach(x=>fns.push({v,...x}));
    h+=`<div class="verse${hl?" hl-"+hl:""}${panelView.type==="verse"&&panelView.ref===ref?" sel":""}" id="${vid(ref)}">${body}</div>`;
  }
  h+=`</div><div class="fns" aria-label="Footnotes">${fns.map(x=>{const t=TERMS[x.k];return `<button data-term="${x.k}"><b>${x.v}</b><i>${x.l}</i>${esc(t.name)}: ${esc(t.plain.split(/(?<=\.)\s/)[0])}</button>`;}).join("")}</div></div>`;
  h+=`<p class="foot">Chapter headings and footnotes written for Joined. Notes and books are saved in this browser only.</p>`;
  $("#reader").innerHTML=h;
}
function noteHTML(n,showRef){
  const ref=n.target.type==="verse"?refLabel(n.target.ref):TERMS[n.target.key].name;
  return `<div class="note"><div class="meta">${showRef?`<button class="chip" data-goto='${esc(JSON.stringify(n.target))}'>${esc(ref)}</button>`:""}${n.example?'<span class="chip ex">Example</span>':""}${n.tags.filter(t=>t!=="example").map(t=>`<button class="chip" data-tag="${esc(t)}">#${esc(t)}</button>`).join("")}</div>
  ${n.text?`<p>${esc(n.text)}</p>`:""}${n.links.map(l=>`<a class="linkcard" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title||l.url)}<span>${esc(new URL(l.url).hostname.replace("www.",""))}</span></a>`).join("")}
  <div class="acts"><button data-copy="${n.id}">Copy for Gospel Library</button><button data-del="${n.id}">Delete</button></div></div>`;
}
function noteForm(){return `<div class="form"><textarea id="nt" placeholder="Write a note, impression or question…"></textarea>
  <input id="ntags" placeholder="Tags, separated by commas (faith, covenants)">
  <div class="two"><input id="nlt" placeholder="Link title (a talk, lesson, video)"><input id="nlu" placeholder="https://…" inputmode="url"></div>
  <div class="row"><button class="btn primary" data-save>Save note</button><span class="muted" style="font-size:12px">Paste a General Conference talk link to attach it here.</span></div></div>`;}
function renderBooks(){$("#reader").innerHTML=`<div class="home3"><a class="back" href="#home">← Home</a><section class="hsect"><h1 class="pg-title">Your books</h1><div class="books-pg">${libraryHTML()}</div></section>${homeFoot()}</div>`;}
function libraryHTML(){const L=S.library||[];
  return `    <div class="sec"><p>Keep track of where books you own talk about these chapters. Each verse then shows something like <i>“Chapter 14, page 135.”</i> No book text is copied or stored.</p></div>
    <div class="sec"><h3>Add a reference by hand</h3>${manualForm("")}</div>
    <div class="sec"><h3>Or scan a book you own</h3>
    <label class="drop" id="drop" for="bookfile">Choose a PDF, EPUB or text file<br><span style="font-size:12px">The file is read on this device and never uploaded. The app keeps only the chapter and page of each scripture reference.</span></label>
    <input type="file" id="bookfile" accept=".pdf,.epub,.txt,.md,.html,.htm" hidden>
    <div class="row" style="margin-top:8px"><button class="btn" data-sample>Try a sample book</button><span id="libstatus" class="muted" style="font-size:12px"></span></div>
    <p class="muted" style="font-size:12px;margin-top:8px">Scanning needs a DRM-free file. For Kindle, Apple Books or Deseret Bookshelf titles, add references by hand.</p></div>
    <div class="sec"><h3>Your books (${L.length})</h3>${L.length?L.map(b=>`<div class="book-row"><div><strong>${esc(b.title)}</strong><span class="muted">${b.refs.length} reference${b.refs.length===1?"":"s"}${b.sample?" · example":""}</span>
      <div class="row" style="margin-top:4px">${b.refs.filter(r=>BOOKS[r.b||"dan"]&&BOOKS[r.b||"dan"].chs.includes(r.c)).slice(0,14).map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${MR(r.b||"dan",r.c,r.v)}"}' title="${esc(r.chap)} ${r.page?"p. "+esc(r.page):""}">${bname(r.b||"dan")} ${r.c}:${r.v}${r.v2?"–"+r.v2:""}${r.page?" · p. "+esc(r.page):""}</button>`).join("")}</div></div>
      <button class="btn" data-rmbook="${b.id}">Remove</button></div>`).join(""):`<p class="muted">No books yet.</p>`}</div>`;}
function renderPanel(){if(view==="books"){renderBooks();return;}
  let h="";const P=panelView;
  if(P.type==="guide"){
    const names=termsInCh(bk,ch);
    h=`<div class="p-head"><h2 class="p-title">Study tools</h2><button class="btn p-close" data-close>Close</button></div>
    <div class="sec"><p>Tap a footnoted word or name to hear it said, see what it means and get the background.</p><p>A small blue letter after a word opens more: <sup class="ol">H</sup> Hebrew, <sup class="ol">A</sup> Aramaic, <sup class="ol">G</sup> Greek, or <sup class="ol">W</sup> what the word meant in Joseph Smith's day.</p><p>Tap the scroll ${SCROLL_SM} by the chapter title for the history behind the chapter.</p><p>Tap any <strong>verse</strong> to highlight it, compare translations, add notes and link talks, or open it in Gospel Library.</p></div>
    <div class="sec"><h3>Names and terms in ${esc(chapLabel(bk,ch))}</h3><div class="row">${names.map(k=>`<button class="chip" data-term="${k}">${esc(TERMS[k].name)}</button>`).join("")}</div></div>
    <div class="sec"><a class="gl" href="${glUrl(bk,ch)}" target="_blank" rel="noopener">Open ${esc(chapLabel(bk,ch))} in Gospel Library ↗</a></div>`;
  } else if(P.type==="history"){
    const C=CHAPTERS[CK(bk,ch)];const names=termsInCh(bk,ch);const T=talksForChapter(bk,ch);
    h=`<div class="p-head"><h2 class="p-title">${SCROLL} ${esc(chapLabel(bk,ch))}</h2><button class="btn p-close" data-close>Close</button></div>`+tabs("history",[
      ["History","History",C.pending?`<div class="sec"><p class="muted">The history and background for this chapter are coming soon.</p></div>`:`<div class="sec"><span class="chip ex">${esc(C.year)}</span></div><div class="sec">${C.bg.map(p=>`<p>${esc(p)}</p>`).join("")}</div>`+`
        <div class="sec"><div class="links"><a href="${glUrl(bk,ch)}" target="_blank" rel="noopener">Read ${esc(chapLabel(bk,ch))} in Gospel Library ↗</a></div></div>`],
      ...(CH_MAPS[CK(bk,ch)]?[["Map","Map",`<div class="sec">${mapSVG(CH_MAPS[CK(bk,ch)])}</div>`]]:[]),
      ["People","People",`<div class="sec"><p class="muted" style="font-size:13px">People, places and words in this chapter.</p><div class="row">${names.map(k=>`<button class="chip" data-term="${k}">${esc(TERMS[k].name)}</button>`).join("")}</div></div>`],
      ["Talks",`Talks <span class="tc">${T.length}</span>`,`<div class="sec">${T.map(x=>talkCard(x,true)).join("")||`<p class="muted">No talks listed yet.</p>`}${talkLinks(chapLabel(bk,ch))}</div>`]]);
  } else if(P.type==="term"){
    const t=TERMS[P.key];const occ=[];t.books.forEach(b=>TEXTS[b]&&BOOKS[b].chs.forEach(c=>{const vs=TEXTS[b][Object.keys(TEXTS[b])[0]][c];vs.forEach((v,vi)=>{if(termsAt(b,c,vi+1,v).includes(P.key))occ.push(MR(b,c,vi+1));});}));
    const nN=notesFor({type:"term",key:P.key}).length;
    h=`<div class="p-head"><h2 class="p-title">${esc(t.name)}</h2><button class="btn p-close" data-close>Close</button></div>
    ${t.say?`<div class="pron"><button class="play" data-say="${P.key}" aria-label="Say it out loud"><svg viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z"/></svg></button><div class="resp">${esc(t.resp)}<em>${t.respLabel||"Tap to hear it"}</em></div></div>`:""}`+tabs("term",[
      ...(t.chart?[["Chart","Chart",t.chart()]]:[]),
      ["Definition","Definition",`<div class="sec"><p>${esc(t.plain)}</p></div>${t.bg?`<div class="sec"><h3>Background</h3><p>${esc(t.bg)}</p></div>`:""}`],
      ...(t.deep?[[t.deep.tab,t.deep.tab,deepHTML(t.deep)]]:[]),
      ...(t.tabX?[[t.tabX.name,t.tabX.name,t.tabX.html()]]:[]),
      ...(t.heb?[["Original","Original",`<div class="orig"><span class="heb" ${t.script==="grk"?'dir="ltr" lang="el"':'dir="rtl" lang="he"'}>${t.heb}</span><span><i>${esc(t.tr)}</i> · ${esc(t.lang)}</span>${t.strong?`<span class="chip">Strong's ${t.strong}</span>`:""}</div>${DEFS[P.key]?`<p class="def"><strong>Definition:</strong> ${esc(DEFS[P.key])}</p>`:""}`]]:[]),
      ...(t.w1828?[["1828","1828",`<div class="sec"><p class="w1828">“${esc(t.w1828)}”</p><p class="muted" style="font-size:12.5px">Noah Webster, <i>An American Dictionary of the English Language</i> (1828). This is how the word was used in Joseph Smith's day.</p></div>`]]:[]),
      ...(TERM_MAPS[P.key]?[["Map","Map",`<div class="sec">${mapSVG(TERM_MAPS[P.key])}</div>`]]:[]),
      ["Verses","Verses",`<div class="sec"><h3>Where it appears</h3><div class="row">${occ.slice(0,40).map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}${occ.length>40?`<span class="muted">+${occ.length-40} more</span>`:""}</div></div>
        <div class="sec"><h3>Go deeper</h3><div class="links">${t.more.map(([a,u])=>`<a href="${u}" target="_blank" rel="noopener">${esc(a)} ↗</a>`).join("")}<a href="${GL+encodeURIComponent(t.name)}" target="_blank" rel="noopener">Search Gospel Library for “${esc(t.name)}” ↗</a></div></div>`],
      ["Notes",`Notes${nN?` <span class="tc">${nN}</span>`:""}`,`<div class="sec">${notesFor({type:"term",key:P.key}).map(n=>noteHTML(n)).join("")}${noteForm()}</div>`]]);
  } else if(P.type==="verse"){
    const p=PR(P.ref),c=p.c,v=p.v,B=BOOKS[p.b];const cur=S.hl[P.ref]||"";const q=encodeURIComponent(refLabel(P.ref));
    const T=talksForVerse(P.ref),TC=talksForChapter(p.b,c),L=libRefs(P.ref),nN=notesFor({type:"verse",ref:P.ref}).length;
    h=`<div class="p-head"><h2 class="p-title">${esc(refLabel(P.ref))}</h2><button class="btn p-close" data-close>Close</button></div>
    <div class="row" style="margin:4px 0 2px"><a class="gl" href="${glUrl(p.b,c,v)}" target="_blank" rel="noopener">Open in Gospel Library ↗</a></div>`+tabs("verse",[
      ["Notes",`Notes${nN?` <span class="tc">${nN}</span>`:""}`,`<div class="sec"><h3>Highlight the whole verse</h3><div class="row">${HLC.map(([k,n])=>`<button class="sw ${k}" data-hl="${k}" aria-pressed="${cur===k}" aria-label="${n}" title="${n}"></button>`).join("")}<button class="sw none" data-hl="">Clear</button></div><p class="muted" style="font-size:12px;margin:6px 0 0">To highlight just a few words, select them in the text.</p></div>
        <div class="sec"><h3>My notes and links</h3>${notesFor({type:"verse",ref:P.ref}).map(n=>noteHTML(n)).join("")}${noteForm()}</div>`],
      ["Talks",`Talks${T.length?` <span class="tc">${T.length}</span>`:""}`,`<div class="sec">${T.length?`<h3>Talks that cite this verse</h3>${T.map(x=>talkCard(x,true)).join("")}`:`<p class="muted" style="font-size:13px">No talks in this list cite ${esc(refLabel(P.ref))} directly.</p>`}
        ${TC.length?`<button class="btn" data-history-talks style="margin-top:8px">All talks on ${esc(chapLabel(p.b,c))} (${TC.length})</button>`:""}${talkLinks(refLabel(P.ref))}</div>`],
      ...(B.bible?[["Compare","Compare",`<div class="sec"><div class="cmp"><b>KJV</b>${esc(vtext(P.ref,"kjv"))}</div><div class="cmp"><b>WEB · modern English</b>${esc(vtext(P.ref,"web"))}</div>
        ${B.nephi&&B.nephi[c]?`<a class="talk" href="https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/${B.nephi[c]}?lang=eng" target="_blank" rel="noopener"><strong>Compare with 3 Nephi ${B.nephi[c]}</strong><span>The risen Savior taught this sermon again at the temple in Bountiful, with some meaningful differences.</span></a>`:""}
        <div class="links"><a href="https://www.biblegateway.com/passage/?search=${q}&version=NIV;ESV;NLT" target="_blank" rel="noopener">NIV, ESV and NLT side by side (Bible Gateway) ↗</a>
        <a href="https://biblehub.com/${B.bh}/${c}-${v}.htm" target="_blank" rel="noopener">Every translation of this verse (Bible Hub) ↗</a>
        <a href="https://biblehub.com/interlinear/${B.bh}/${c}-${v}.htm" target="_blank" rel="noopener">Word-by-word ${BOOKS[p.b].lang==="grk"?"Greek":p.b==="dan"?"Hebrew/Aramaic":"Hebrew"} interlinear ↗</a></div></div>`]]:[]),
      ["Books",`Books${L.length?` <span class="tc">${L.length}</span>`:""}`,`<div class="sec">${L.length?L.slice(0,8).map(({b,r})=>`<div class="lib-snip"><b>${esc(b.title)}${b.sample?" · example":""}</b>${refLine(b,r)}${r.v2?` <span class="muted">(${bname(r.b||"dan")} ${r.c}:${r.v}–${r.v2})</span>`:""}</div>`).join(""):`<p class="muted" style="font-size:13px">None yet. Note where a book you own talks about this verse.</p>`}</div>
        <div class="sec"><h3>Add a book reference</h3>${manualForm(P.ref)}<p style="margin-top:10px"><a href="#books" class="m-link">Scan a book you own, or see all your books →</a></p></div>`]]);
  } else if(P.type==="library"){
    h=`<div class="p-head"><h2 class="p-title">Your books</h2><button class="btn p-close" data-close>Close</button></div>`+libraryHTML();
  } else if(P.type==="support"){
    h=`<div class="p-head"><h2 class="p-title">Support this site</h2><button class="btn p-close" data-close>Close</button></div>
    <div class="sec"><p>This site is free, with no ads and no subscriptions. If it helps your study, a small donation keeps it running.</p>
    <button class="btn primary" disabled title="Connect a Ko-fi, Buy Me a Coffee or PayPal link here">Donate (link coming soon)</button>
    <p class="muted" style="font-size:12px;margin-top:6px">Prototype: this button will open your donation page once you set one up.</p></div>
    <div class="sec"><h3>Add to your Home Screen</h3>
    <p><strong>iPhone or iPad (Safari):</strong> tap the Share button, then <i>Add to Home Screen</i>.</p>
    <p><strong>Android (Chrome):</strong> tap the ⋮ menu, then <i>Add to Home screen</i> or <i>Install app</i>.</p>
    <p><strong>Computer (Chrome or Edge):</strong> click the install icon in the address bar.</p></div>`;
  } else if(P.type==="notes"){
    const tags=[...new Set(S.notes.flatMap(n=>n.tags))].sort();const list=S.notes.filter(n=>!P.tag||n.tags.includes(P.tag)).sort((a,b)=>b.ts-a.ts);
    h=`<div class="p-head"><h2 class="p-title">My notes</h2><button class="btn p-close" data-close>Close</button></div>
    <div class="sec"><div class="row"><button class="chip${!P.tag?" ex":""}" data-tag="">All (${S.notes.length})</button>${tags.map(t=>`<button class="chip${P.tag===t?" ex":""}" data-tag="${esc(t)}">#${esc(t)}</button>`).join("")}</div></div>
    <div class="sec">${list.length?list.map(n=>noteHTML(n,true)).join(""):`<p class="muted">No notes yet. Tap a verse number or an underlined word to add one.</p>`}</div>
    <div class="sec row"><button class="btn" data-copyall>Copy all notes</button>${S.notes.some(n=>n.example)?`<button class="btn" data-clearex>Remove example notes</button>`:""}</div>`;
  }
  $("#panelIn").innerHTML=h;$("#panelIn").scrollTop=0;
}
let LASTV=null;document.addEventListener("pointerdown",e=>{const x=e.target.closest&&e.target.closest("[id^='v-']");LASTV=x?x.id:LASTV;},true);
function keepVisible(id){if(innerWidth>900||!id)return;requestAnimationFrame(()=>requestAnimationFrame(()=>{const el=document.getElementById(id),pn=$("#panel .panel-in");if(!el||!pn)return;
  const hd=document.querySelector("header.top"),hs=hd&&/sticky|fixed/.test(getComputedStyle(hd).position),head=hs?Math.max(0,hd.getBoundingClientRect().bottom)+6:10;
  let top=pn.getBoundingClientRect().top;const ph=pn.offsetHeight;if(!(top>head+60&&top<=innerHeight))top=innerHeight-ph; // if the sheet isn't where it should be yet, use its height
  const r=el.getBoundingClientRect();if(r.bottom<=top-12&&r.top>=head)return;
  const room=top-head,want=r.height<room?head+(room-r.height)/2:head+8;let d=r.top-want;
  if(Math.abs(d)>innerHeight*1.5)return; // never jump far away from what was tapped
  window.scrollTo(0,Math.max(0,scrollY+d));}));}
function open(v){if(view!=="read"){panelView=v;location.hash=hashFor(bk,ch);return;}panelView=v;renderPanel();renderReader();$("#panel").classList.add("open");
  keepVisible(v.type==="verse"?vid(v.ref):(v.type==="term"?LASTV:null));}
function goto(t){if(t.type==="verse"){const p=PR(t.ref);if(!p)return;if(view!=="read"||p.b!==bk||p.c!==ch){panelView={type:"verse",ref:t.ref};location.hash=hashFor(p.b,p.c);return;}
  open({type:"verse",ref:t.ref});const el=document.getElementById(vid(t.ref));el&&el.scrollIntoView({behavior:"smooth",block:"center"});}else open({type:"term",key:t.key});}
function toast(m){const d=document.createElement("div");d.className="toast";d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),1800);}
function copy(text){const ok=()=>toast("Copied. Paste it into a Gospel Library note.");
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(ok,()=>fallback(text));else fallback(text);
  function fallback(t){const ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok();}catch(e){toast("Select the text to copy it.");}ta.remove();}}
function noteText(n){const ref=n.target.type==="verse"?refLabel(n.target.ref):`${TERMS[n.target.key].name} (${bname(TERMS[n.target.key].books[0])})`;
  return [ref,n.text,...n.links.map(l=>`${l.title||"Link"}: ${l.url}`),n.tags.filter(t=>t!=="example").map(t=>"#"+t).join(" ")].filter(Boolean).join("\n");}
function speak(k){const t=TERMS[k];if(!("speechSynthesis" in window)){toast(`Say it: ${t.resp}`);return;}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.say);u.rate=.8;u.lang="en-US";speechSynthesis.speak(u);}

document.addEventListener("click",e=>{
  if(!e.target.closest("#chapseg")){const pop=$("#chapseg .chpop");if(pop&&!pop.hidden){pop.hidden=true;}}
  const b=e.target.closest("button");if(!b)return;const d=b.dataset;
  if("chpick" in d){const pop=$("#chapseg .chpop");const o=pop.hidden;pop.hidden=!o;b.setAttribute("aria-expanded",o);return;}
  if(d.ch){const pop=$("#chapseg .chpop");if(pop)pop.hidden=true;if(panelView.type==="verse"||panelView.type==="history")panelView={type:"guide"};location.hash=hashFor(bk,+d.ch);}
  else if("history" in d)open({type:"history"});
  else if("historyTalks" in d){TAB.history="Talks";open({type:"history"});}
  else if(d.mode){mode=d.mode;try{localStorage.setItem(KEY+"-mode",mode);}catch(e){}renderTop();renderReader();}
  else if(d.term)open({type:"term",key:d.term});
  else if(d.v)open({type:"verse",ref:d.v});
  else if(d.say)speak(d.say);
  else if("close" in d)$("#panel").classList.remove("open");
  else if(d.notes!==undefined)open({type:"notes"});
  else if(d.hl!==undefined){if(d.hl){S.hl[panelView.ref]=d.hl;S.hlt=S.hlt||{};S.hlt[panelView.ref]=Date.now();}else{delete S.hl[panelView.ref];S.marks=(S.marks||[]).filter(m=>m.ref!==panelView.ref);}save();renderReader();renderPanel();}
  else if(d.goto)goto(JSON.parse(d.goto));
  else if(d.tag!==undefined){open({type:"notes",tag:d.tag||null});}
  else if(d.del){S.notes=S.notes.filter(n=>n.id!==d.del);save();renderTop();renderReader();renderPanel();toast("Note deleted");}
  else if(d.copy){copy(noteText(S.notes.find(n=>n.id===d.copy)));}
  else if("copyall" in d){copy(S.notes.map(noteText).join("\n\n"));}
  else if("clearex" in d){S.notes=S.notes.filter(n=>!n.example);save();renderTop();renderReader();renderPanel();}
  else if("save" in d){
    const text=$("#nt").value.trim(),tags=$("#ntags").value.split(",").map(s=>s.trim().replace(/^#/,"").toLowerCase()).filter(Boolean);
    let lt=$("#nlt").value.trim(),lu=$("#nlu").value.trim();const links=[];
    if(lu){if(!/^https?:\/\//i.test(lu))lu="https://"+lu;try{new URL(lu);links.push({title:lt,url:lu});}catch(e){toast("That link doesn't look like a web address. Check it and try again.");return;}}
    if(!text&&!links.length){toast("Write a note or add a link first.");return;}
    const target=panelView.type==="verse"?{type:"verse",ref:panelView.ref}:{type:"term",key:panelView.key};
    S.notes.push({id:"n"+Date.now(),target,text,tags,links,ts:Date.now()});save();renderTop();renderReader();renderPanel();toast("Note saved");
  }
});
// ---- My books: references only. The file is read on this device, the verse locations are kept, and the text is thrown away. ----
const REF=/(?:\b(Daniel|Dan\.?|Dn\.?|Matthew|Matt\.?|Mt\.?|1\s?Nephi|1\s?Ne\.?|Abraham|Abr\.?)|(D&C|D\.\s?&\s?C\.|Doctrine and Covenants))\s+(\d{1,3})\s*:\s*(\d{1,3})(?:\s*[–—-]\s*(\d{1,3}))?/g;
const refBook=s=>{const q=s.toLowerCase().replace(/\./g,"").trim();for(const [k,al] of Object.entries(BOOK_ALIASES))if(al.includes(q))return k;s=s.toLowerCase().replace(/[.\s]/g,"");return s.startsWith("d")&&(s.includes("&")||s.startsWith("doc"))?"dc":s.startsWith("dan")||s==="dn"?"dan":s.startsWith("ho")?"hos":s.startsWith("joe")||s==="jl"?"joel":s.startsWith("m")?"mat":s.startsWith("1n")?"1ne":s.startsWith("ab")?"abr":null;};
function findRefs(sections){const out=[];sections.forEach(s=>{const txt=s.text.replace(/\s+/g," ");let m;REF.lastIndex=0;
  while((m=REF.exec(txt))&&out.length<800){const b=refBook(m[1]||m[2]);const c=+m[3],v=+m[4],v2=m[5]?+m[5]:0;if(!b||v<1)continue;
    if(out.some(r=>r.b===b&&r.c===c&&r.v===v&&r.page===s.page&&r.chap===s.chap))continue;
    out.push({b,c,v,v2:v2>v?v2:0,page:s.page||"",chap:s.chap||""});}});return out;}
function loadScript(src){return new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=()=>no(new Error("load"));document.head.appendChild(s);});}
async function readPdf(buf){
  if(!window.pdfjsLib){await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js");await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");}
  const pdf=await pdfjsLib.getDocument({data:buf,isEvalSupported:false}).promise;
  let labels=null;try{labels=await pdf.getPageLabels();}catch(e){}
  const starts=[];try{const ol=await pdf.getOutline()||[];for(const it of ol){let dest=it.dest;if(typeof dest==="string")dest=await pdf.getDestination(dest);
    if(Array.isArray(dest)&&dest[0]){const idx=typeof dest[0]==="number"?dest[0]:await pdf.getPageIndex(dest[0]);starts.push({idx,title:it.title});}}}catch(e){}
  starts.sort((a,b)=>a.idx-b.idx);let title="";try{title=(await pdf.getMetadata()).info.Title||"";}catch(e){}
  const secs=[];for(let i=1;i<=pdf.numPages;i++){const tc=await (await pdf.getPage(i)).getTextContent();
    const st=starts.filter(s=>s.idx<=i-1).pop();secs.push({text:tc.items.map(x=>x.str).join(" "),page:(labels&&labels[i-1])||String(i),chap:st?st.title:""});
    status(`Reading page ${i} of ${pdf.numPages}…`);}
  return {secs,title};}
async function readEpub(buf){
  if(!window.JSZip)await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
  const z=await JSZip.loadAsync(buf);const enc=z.file("META-INF/encryption.xml");
  if(enc){const e=await enc.async("string");if(/EncryptedData/.test(e)&&!/obfuscation/i.test(e))throw new Error("drm");}
  const cont=await z.file("META-INF/container.xml").async("string");const opfPath=cont.match(/full-path="([^"]+)"/)[1];const base=opfPath.includes("/")?opfPath.replace(/[^/]+$/,""):"";
  const opf=new DOMParser().parseFromString(await z.file(opfPath).async("string"),"application/xml");
  const items={};opf.querySelectorAll("manifest > item").forEach(i=>items[i.getAttribute("id")]=i.getAttribute("href"));
  const title=(opf.querySelector("title")||{}).textContent;const secs=[];let n=0;
  for(const r of opf.querySelectorAll("spine > itemref")){const f=z.file(base+decodeURIComponent(items[r.getAttribute("idref")]||""));if(!f)continue;
    const d=new DOMParser().parseFromString(await f.async("string"),"text/html");if(!d.body)continue;n++;
    const h=d.querySelector("h1,h2,h3");let page="";const pb=d.querySelectorAll('[epub\\:type="pagebreak"],[role="doc-pagebreak"]');
    if(pb.length){/* EPUBs with print page markers: split on them */ let cur=d.body.textContent;secs.push({text:cur,page:"",chap:h?h.textContent.trim():"Section "+n});}
    else secs.push({text:d.body.textContent,page:"",chap:h?h.textContent.trim().slice(0,80):"Section "+n});}
  return {secs,title};}
function status(m){const e=$("#libstatus");if(e)e.textContent=m;}
function bookByTitle(t){S.library=S.library||[];let b=S.library.find(x=>x.title.toLowerCase()===t.toLowerCase());if(!b){b={id:"b"+Date.now(),title:t,refs:[]};S.library.push(b);}return b;}
async function addBook(file){
  status("Reading…");const name=file.name.replace(/\.[^.]+$/,"");let secs,title=name;
  try{const buf=await file.arrayBuffer();const ext=file.name.split(".").pop().toLowerCase();
    if(ext==="pdf"){const r=await readPdf(buf);secs=r.secs;title=r.title||name;}
    else if(ext==="epub"){const r=await readEpub(buf);secs=r.secs;title=r.title||name;}
    else{let t=new TextDecoder().decode(buf);if(/html?$/.test(ext))t=new DOMParser().parseFromString(t,"text/html").body.textContent;secs=[{text:t}];}
  }catch(e){status(e.message==="drm"?"This book is copy-protected (DRM), so it can't be scanned. You can still add references by hand below.":e.message==="load"?"Couldn't load the PDF/EPUB reader. Check your connection and try again.":/password/i.test(e.message)?"This PDF is password-protected.":"Couldn't read that file. Try a PDF, EPUB or text file.");return;}
  const refs=findRefs(secs);secs=null;const b=bookByTitle(title);b.refs.push(...refs);save();renderTop();renderReader();renderPanel();
  status(refs.length?`Found ${refs.length} scripture reference${refs.length>1?"s":""}. Only the locations were saved.`:"No references to these books found.");}
function addManual(){const t=$("#mb").value.trim(),raw=$("#mr").value.trim(),chap=$("#mc").value.trim(),page=$("#mp").value.trim();
  const rm=raw.match(/^(.*?)\s*(\d{1,3})\s*:\s*(\d{1,3})(?:\s*[–-]\s*(\d{1,3}))?$/);const b=rm?(rm[1]?refBook(rm[1]):(panelView.ref&&PR(panelView.ref)?PR(panelView.ref).b:bk)):null;
  if(!t){toast("Add the book's title.");return;}if(!rm||!b){toast("Write the verse like Daniel 3:18 or 1 Nephi 3:7.");return;}if(!chap&&!page){toast("Add a chapter or page so you can find it again.");return;}
  const r=[null,rm[2],rm[3],rm[4]];
  bookByTitle(t).refs.push({b,c:+r[1],v:+r[2],v2:r[3]&&+r[3]>+r[2]?+r[3]:0,chap,page,manual:true});save();renderTop();renderReader();renderPanel();toast("Reference saved");}
function refLine(b,r){return `${r.chap?esc(/^\d+$/.test(r.chap)?"Chapter "+r.chap:r.chap):""}${r.chap&&r.page?", ":""}${r.page?"page "+esc(r.page):""}`;}
function manualForm(ref){const titles=[...new Set((S.library||[]).map(b=>b.title))];return `<div class="form"><input id="mb" list="mbl" placeholder="Book title"><datalist id="mbl">${titles.map(t=>`<option value="${esc(t)}">`).join("")}</datalist>
  <div class="two"><input id="mr" placeholder="Verse (Daniel 3:18)" value="${ref?esc(refLabel(ref)):""}"><input id="mc" placeholder="Chapter (14)"></div><input id="mp" placeholder="Page (135)" inputmode="numeric">
  <div class="row"><button class="btn primary" data-addref>Save reference</button></div></div>`;}
const SAMPLE_REFS=[{b:"dan",c:1,v:8,v2:0,chap:"Chapter 3: Deciding Ahead of Time",page:"41"},{b:"dan",c:2,v:34,v2:35,chap:"Chapter 9: The Stone and the Mountain",page:"98"},{b:"dan",c:2,v:44,v2:45,chap:"Chapter 9: The Stone and the Mountain",page:"101"},{b:"dan",c:3,v:17,v2:18,chap:"Chapter 14: But If Not",page:"135"},{b:"dan",c:3,v:25,v2:0,chap:"Chapter 14: But If Not",page:"139"}];
document.addEventListener("change",e=>{if(e.target.id==="bookfile"&&e.target.files[0])addBook(e.target.files[0]);});
document.addEventListener("dragover",e=>{const d=e.target.closest&&e.target.closest("#drop");if(d){e.preventDefault();d.classList.add("over");}});
document.addEventListener("dragleave",e=>{const d=e.target.closest&&e.target.closest("#drop");if(d)d.classList.remove("over");});
document.addEventListener("drop",e=>{const d=e.target.closest&&e.target.closest("#drop");if(d){e.preventDefault();d.classList.remove("over");if(e.dataTransfer.files[0])addBook(e.dataTransfer.files[0]);}});
document.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const d=b.dataset;
  if("library" in d)open({type:"library"});
  else if("support" in d)open({type:"support"});
  else if("addref" in d)addManual();
  else if("sample" in d){S.library=(S.library||[]).filter(x=>!x.sample);S.library.push({id:"sample",title:"Sample Book on Faith (example)",sample:true,refs:SAMPLE_REFS});save();renderTop();renderReader();renderPanel();status("Sample added. Look for BOOK next to verses.");}
  else if(d.rmbook){S.library=S.library.filter(x=>x.id!==d.rmbook);save();renderReader();renderPanel();}
});
// Drop any saved text excerpts from the earlier version
(S.library||[]).forEach(b=>b.refs.forEach(r=>{delete r.snip;}));save();
// ---- Tap a verse, or select its text, to open the tools ----
let selBar=null;
function pt(vt,node,off,isEnd,len){const el=node.nodeType===3?node.parentElement:null;
  if(el&&el.dataset&&el.dataset.o!==undefined&&vt.contains(el))return +el.dataset.o+off;
  const pr=document.createRange();pr.setStart(node,off);pr.collapse(true);const sp=[...vt.querySelectorAll("[data-o]")];
  if(!isEnd){const f=sp.find(x=>pr.comparePoint(x,0)>=0);return f?+f.dataset.o:len;}
  const l=sp.filter(x=>pr.comparePoint(x,x.childNodes.length)<=0).pop();return l?+l.dataset.o+l.textContent.length:0;}
function selRanges(){const s=window.getSelection();if(!s||s.isCollapsed||!s.rangeCount)return [];const r=s.getRangeAt(0);
  if(!$("#reader").contains(r.commonAncestorContainer))return [];
  return [...document.querySelectorAll("#reader .vt")].filter(vt=>r.intersectsNode(vt)).map(vt=>{const ref=vt.dataset.ref,ver=vt.dataset.ver;
    const txt=vtext(ref,ver);let a=vt.contains(r.startContainer)?pt(vt,r.startContainer,r.startOffset,false,txt.length):0,b=vt.contains(r.endContainer)?pt(vt,r.endContainer,r.endOffset,true,txt.length):txt.length;
    while(a<b&&/\s/.test(txt[a]))a++;while(b>a&&/\s/.test(txt[b-1]))b--;return {ref,ver,s:a,e:b};}).filter(x=>x.e>x.s);}
function hideSelBar(){if(selBar){selBar.remove();selBar=null;}}
function showSelBar(){const rs=selRanges();hideSelBar();if(!rs.length)return;
  const rect=window.getSelection().getRangeAt(0).getBoundingClientRect();
  selBar=document.createElement("div");selBar.className="selbar";selBar._ranges=rs;selBar._quote=window.getSelection().toString().trim();
  selBar.innerHTML=HLC.map(([k,n])=>`<button class="sw ${k}" data-selhl="${k}" aria-label="${n}" title="${n}"></button>`).join("")+`<button class="btn" data-selhl="">Clear</button><button class="btn primary" data-selnote>Note</button>`;
  selBar.addEventListener("mousedown",e=>e.preventDefault());
  document.body.appendChild(selBar);const w=selBar.offsetWidth;
  selBar.style.left=Math.max(8,Math.min(window.innerWidth-w-8,rect.left+rect.width/2-w/2))+"px";
  selBar.style.top=(rect.bottom+window.scrollY+14)+"px";}
let selT;document.addEventListener("selectionchange",()=>{clearTimeout(selT);selT=setTimeout(()=>{const s=window.getSelection();if(s&&!s.isCollapsed)showSelBar();},250);});
document.addEventListener("mousedown",e=>{if(selBar&&!selBar.contains(e.target))hideSelBar();});
document.addEventListener("click",e=>{
  const sb=e.target.closest("[data-selhl],[data-selnote]");
  if(sb&&selBar){const rs=selBar._ranges,quote=selBar._quote;
    if("selnote" in sb.dataset){hideSelBar();window.getSelection().removeAllRanges();open({type:"verse",ref:rs[0].ref});const t=$("#nt");if(t){t.value=quote?`“${quote}”\n`:"";t.focus();}return;}
    rs.forEach(r=>addMark(r,sb.dataset.selhl));save();hideSelBar();window.getSelection().removeAllRanges();renderReader();if(panelView.type==="verse")renderPanel();toast(sb.dataset.selhl?"Highlighted":"Highlight cleared");return;}
  const v=e.target.closest("#reader .verse");
  if(v&&!e.target.closest("button,a")){const s=window.getSelection();if(s&&!s.isCollapsed)return;open({type:"verse",ref:v.querySelector(".vt").dataset.ref});}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#panel").classList.remove("open");});

// ---- Guided tour: a full-screen, step-by-step walkthrough ----
const MOCK_MAP=()=>`<div class="mk-map" style="background-image:url('${BASES.ne.img}')"><span class="mk-pin" style="left:62%;top:44%"></span><span class="mk-pinlbl" style="left:65%;top:36%">Babylon</span></div>`;
const TOUR=[
 {t:"Welcome to Joined",p:["Joined helps you understand what the scriptures say and why.","Read any chapter like printed scriptures. When something is hard to understand, tap it. Help opens beside the text (or at the bottom of your phone), and the scripture stays in front of you."],
  m:`<div class="mk-welcome"><img src="${LOGO_MARK}" alt=""><div><b>Understand the words</b><b>Understand the history</b><b>See what prophets taught</b></div></div>`},
 {t:"Tap a word with a small letter",p:["Small gray letters, like the ᵃ before <i>Ashpenaz</i>, mark words with a footnote.","Tap the word to hear how it's said, read what it means in plain English, see the background, and find it on a map."],
  m:`<div class="mk-page"><p><b>3</b> And the king spake unto <span class="mk-hit"><sup>a</sup>Ashpenaz</span> the master of his eunuchs…</p></div>
     <div class="mk-card"><div class="mk-title">Ashpenaz</div><div class="mk-pron"><span class="mk-play">▶</span><b>ASH-puh-naz</b> <span>Tap to hear it</span></div><div class="mk-tabs"><span class="on">Definition</span><span>Original</span><span>Verses</span><span>Notes</span></div><p>The chief of the king's court officials, in charge of training the captive young men.</p></div>`},
 {t:"Blue words mean something different",p:["A word shown in blue, with a small blue letter after it, meant something different in the original language or in Joseph Smith's day than it does to us now. Tap it to see the difference.",`<b>H</b> Hebrew · <b>A</b> Aramaic · <b>G</b> Greek: see the original word and what it really means.<br><b>W</b> Webster's 1828 dictionary: what the word meant in Joseph Smith's day.`],
  m:`<div class="mk-page"><p><b>48</b> Be ye therefore <span class="mk-hit mk-blue">perfect<sup class="mk-ol">G</sup></span>, even as your Father which is in heaven is perfect.</p></div>
     <div class="mk-card"><div class="mk-title">perfect</div><div class="mk-tabs"><span>Definition</span><span class="on">Original</span><span>Verses</span></div><p class="mk-greek">τέλειος <i>teleios</i> · Greek</p><p><b>Definition:</b> Complete, finished, mature. Not \"without any mistakes.\"</p></div>`},
 {t:"Tap the scroll for the history",p:["Every chapter has a scroll button next to its title.","It opens the story behind the chapter: when it happened, what life was like, a map of where it took place, and the people involved."],
  m:`<div class="mk-page mk-center"><div class="mk-chap">CHAPTER 3 <span class="mk-scroll mk-hit">${SCROLL}</span></div></div>
     <div class="mk-card"><div class="mk-title">Daniel 3</div><div class="mk-tabs"><span>History</span><span class="on">Map</span><span>People</span><span>Talks</span></div>${MOCK_MAP()}</div>`},
 {t:"Tap any verse",p:["Tap a verse to open its tools: highlight it in one of ten colors, write a note, and compare translations.","The <b>Talks</b> tab shows conference talks by prophets and apostles that quote that exact verse, so you can see how they apply it.","To highlight just a few words, press and drag over them, then pick a color."],
  m:`<div class="mk-page"><p class="mk-sel"><b>18</b> But if not, be it known unto thee, O king, that <span class="mk-hl">we will not serve thy gods</span>…</p></div>
     <div class="mk-card"><div class="mk-title">Daniel 3:18</div><div class="mk-sw">${HLC.slice(0,6).map(([k])=>`<span class="sw ${k}"></span>`).join("")}</div><div class="mk-tabs"><span>Notes</span><span class="on mk-hitab">Talks 1</span><span>Compare</span><span>Books</span></div><div class="mk-talk mk-hitbox"><b>Worship</b><span>Elder D. Todd Christofferson · April 2025</span></div></div>`},
 {t:"Names have meanings",p:["Many names in the scriptures mean something. <b>Noah</b> means “rest,” <b>Solomon</b> means “peace,” and <b>Levi</b> means “joined.”","Tap a name to see what it means, with the verse that explains it. Genesis through Deuteronomy have this for the people and places in them."],
  m:`<div class="mk-page"><p><b>8</b> But <span class="mk-hit">Noah</span> found grace in the eyes of the LORD.</p></div>
     <div class="mk-card"><div class="mk-title">Noah</div><div class="mk-tabs"><span class="on">Definition</span><span>Verses</span><span>Notes</span></div><p>The prophet who built the ark. The name means “rest” or “comfort.” Its Hebrew letters, reversed, spell “grace.”</p></div>`},
 {t:"The Book of Mormon beside the Bible",p:["Many Book of Mormon chapters quote or retell the Bible: the Sermon on the Mount in 3 Nephi 12–14, Malachi in 3 Nephi 24–25, and Isaiah in 1 and 2 Nephi, Mosiah and 3 Nephi.","At the top of those chapters, choose <b>Modern</b> to see the Bible verse under each verse, or <b>Compare</b> to see exactly which words differ. A Bible chapter also links to the Book of Mormon chapter that quotes it."],
  m:`<div class="mk-page"><p class="mk-sel"><b>3</b> Blessed are the poor in spirit who come unto me…</p></div>
     <div class="mk-card"><div class="mk-tabs"><span>Book of Mormon</span><span>Modern</span><span class="on">Compare</span></div><p><b>MATTHEW 5:3</b> Blessed are the poor in spirit<ins> who come unto me</ins>: for theirs is the kingdom of heaven.</p></div>`},
 {t:"Seek: find it by meaning",p:["Tap the gold <b>Joined</b> button in the middle of the bottom bar.","Describe what you're looking for the way you'd tell a friend, like “the verse I highlighted where Nephi went into Jerusalem not knowing what to do.” Seek finds matching verses, your own highlights and Conference talks, and always shows the real scripture text.","You get 20 free Seek searches. Typing a verse (1 Nephi 3:7), a name or a word works for free, always."],
  m:`<div class="mk-seekq">“the verse I highlighted where Nephi went into Jerusalem…”</div>
     <div class="mk-card"><div class="mk-skmeta"><span class="mk-skk">YOUR HIGHLIGHT</span><b>1 Nephi 4:6</b></div><p>And I was led by the Spirit, not knowing beforehand the things which I should do.</p><p class="mk-skwhy">Why it fits: Nephi went in not knowing what to do.</p></div>`},
 {t:"Find your way around",p:["<b>Scriptures:</b> all five volumes on one screen. Pick a volume, then a book, then a chapter.","<b>Continue:</b> jump back to where you left off.","<b>Seek:</b> the big middle button.","<b>Study:</b> your highlights and notes, study by topic, your books, help preparing a lesson or talk, and today's Come, Follow Me lesson.","<b>Account:</b> sign in to keep your notes, highlights and name on every device.","Tap the Joined logo at the top for the home page. While you read, the bars slide away as you scroll down and return when you scroll up. Double-tap empty space to hide or show them. Swipe left or right to change chapters."],
  m:`<div class="mk-bar">${["Scriptures","Continue","","Study","Sign in"].map(n=>n?`<span>${n}</span>`:`<span class="mk-orb"><img src="${LOGO_MARK}" alt=""></span>`).join("")}</div>`}];
let tourI=0;
function tourHTML(){const s=TOUR[tourI],last=tourI===TOUR.length-1;
  return `<div class="tour" role="dialog" aria-modal="true" aria-labelledby="tour-t"><div class="tour-in">
    <button class="tour-x" data-tourclose aria-label="Close tour">✕</button>
    <div class="tour-mock">${s.m}</div>
    <div class="tour-txt"><span class="tour-step">Step ${tourI+1} of ${TOUR.length}</span><h2 id="tour-t">${s.t}</h2>${s.p.map(x=>`<p>${x}</p>`).join("")}
      <div class="tour-nav"><div class="tour-dots">${TOUR.map((_,i)=>`<span class="${i===tourI?"on":""}"></span>`).join("")}</div>
      <div class="tour-btns">${tourI?`<button class="btn" data-tourgo="-1">Back</button>`:""}${last?`<button class="btn primary" data-tourclose>Start reading</button>`:`<button class="btn primary" data-tourgo="1">Next</button>`}</div></div></div></div></div>`;}
function openTour(i){tourI=i||0;let o=$("#tourwrap");if(!o){o=document.createElement("div");o.id="tourwrap";document.body.appendChild(o);}o.innerHTML=tourHTML();document.body.classList.add("touring");const nb=o.querySelector(".tour-btns .primary");nb&&nb.focus();}
function closeTour(){const o=$("#tourwrap");if(o)o.remove();document.body.classList.remove("touring");try{localStorage.setItem(KEY+"-toured","1");}catch(e){}}
document.addEventListener("click",e=>{const t=e.target.closest("[data-tourgo],[data-tourclose],[data-tour]");if(!t){if(e.target.classList.contains("tour"))closeTour();return;}
  if("tour" in t.dataset)openTour(0);else if("tourclose" in t.dataset)closeTour();else{tourI=Math.max(0,Math.min(TOUR.length-1,tourI+ +t.dataset.tourgo));$("#tourwrap").innerHTML=tourHTML();const nb=$("#tourwrap .tour-btns .primary");nb&&nb.focus();}});
document.addEventListener("keydown",e=>{if(!$("#tourwrap"))return;if(e.key==="Escape")closeTour();else if(e.key==="ArrowRight"&&tourI<TOUR.length-1){tourI++;$("#tourwrap").innerHTML=tourHTML();}else if(e.key==="ArrowLeft"&&tourI>0){tourI--;$("#tourwrap").innerHTML=tourHTML();}});
let tX=null;document.addEventListener("touchstart",e=>{if(e.target.closest(".tour-in"))tX=e.touches[0].clientX;},{passive:true});
document.addEventListener("touchend",e=>{if(tX===null)return;const dx=e.changedTouches[0].clientX-tX;tX=null;if(Math.abs(dx)<60)return;const n=tourI+(dx<0?1:-1);if(n>=0&&n<TOUR.length){tourI=n;$("#tourwrap").innerHTML=tourHTML();}},{passive:true});


// Swipe left or right on the text to change chapters
(function(){let sx=null,sy=0,st=0;
  const skip=t=>t.closest("#panel,#tourwrap,.chpop,svg,.map,input,textarea,select,[contenteditable],.scroll-x,#acct,.lbar");
  document.addEventListener("touchstart",e=>{if(view!=="read"||e.touches.length!==1||skip(e.target)){sx=null;return;}sx=e.touches[0].clientX;sy=e.touches[0].clientY;st=Date.now();},{passive:true});
  document.addEventListener("touchend",e=>{if(sx===null)return;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=null;
    if(Date.now()-st>700||Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.8)return;
    const sel=window.getSelection&&String(window.getSelection());if(sel&&sel.length>0)return;
    goChapter(dx<0?1:-1);},{passive:true});
  document.addEventListener("keydown",e=>{if(view!=="read"||e.altKey||e.ctrlKey||e.metaKey||e.target.closest("input,textarea,select,[contenteditable]"))return;
    if(e.key==="ArrowRight")goChapter(1);else if(e.key==="ArrowLeft")goChapter(-1);});
})();
function goChapter(dir){const L=BOOKS[bk].chs,n=L[L.indexOf(ch)+dir];
  if(n===undefined){toast(dir>0?`That's the last ${unit(bk).toLowerCase()} of ${bname(bk)}.`:`That's the first ${unit(bk).toLowerCase()} of ${bname(bk)}.`);return;}
  if(panelView.type==="verse"||panelView.type==="history")panelView={type:"guide"};$("#panel").classList.remove("open");
  SWIPE_DIR=dir;location.hash=hashFor(bk,n);}
var SWIPE_DIR=0;

registerImports();
if(!takeSharedLink())0;
route();

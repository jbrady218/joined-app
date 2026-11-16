// ---- Bring in a lesson from a link ----
// Paste (or share) a link to a lesson on the Church's website. Joined reads the page, splits it into its sections,
// and places each section in the scripture chapter at the verses it teaches. The lesson then opens in the lesson builder.
const IMPORT_API="https://joined-3adda.web.app/api/lesson";
const SCR_SLUG={dan:"dan",hosea:"hos",joel:"joel",matt:"mat","1-ne":"1ne",dc:"dc",abr:"abr"};
const IMP_GROUPS=["Possible Learning Activities","Additional Resources","Supplemental Learning Activities","Ideas for Learning at Home and at Church","Ideas for Teaching Children"];
const impHash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h*33)^s.charCodeAt(i))>>>0;return h.toString(36);};
const cleanUrl=u=>{try{const x=new URL(u.trim());x.hash="";x.searchParams.delete("id");return x.toString();}catch(e){return null;}};
const isChurchLesson=u=>{try{const x=new URL(u);return /(^|\.)churchofjesuschrist\.org$/.test(x.hostname)&&/^\/study\/manual\//.test(x.pathname);}catch(e){return false;}};

async function fetchLessonPage(url){const x=new URL(url),uri=x.pathname.replace(/^\/study/,""),lang=x.searchParams.get("lang")||"eng";
  const tries=[async()=>{const r=await fetch(`https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=${lang}&uri=${encodeURIComponent(uri)}`,{credentials:"omit"});
      if(!r.ok)throw 0;const j=await r.json();return {title:(j.meta&&j.meta.title)||"",body:(j.content&&j.content.body)||""};},
    async()=>{const r=await fetch(`${IMPORT_API}?url=${encodeURIComponent(url)}`);if(!r.ok)throw 0;return r.json();}];
  for(const t of tries){try{const p=await t();if(p&&p.body&&p.body.length>200)return p;}catch(e){}}
  throw new Error("fetch");}

// A scripture link on the Church's site: /study/scriptures/ot/hosea/2?id=p5-p8 → {b:"hos",c:2,v:[5,8]}
function refFromHref(href){const m=(href||"").match(/\/scriptures\/[a-z-]+\/([a-z0-9-]+)\/(\d+)(?:\?[^#]*?\bid=p(\d+)(?:-p(\d+))?)?/);if(!m)return null;
  const b=SCR_SLUG[m[1]];if(!b||!BOOKS[b]||!BOOKS[b].chs.includes(+m[2]))return null;const c=+m[2],n=vcount(b,c);
  const v0=m[3]?Math.min(+m[3],n):null,v1=m[4]?Math.min(+m[4],n):v0;return {b,c,vs:v0?[v0,Math.max(v0,v1)]:null};}
// Scripture references written out in plain text (for pasted pages): "Hosea 2:5", "Hosea 1:2–8"
function refsFromText(t){const out=[];const names=BOOK_ORDER.map(b=>[b,bname(b)]).concat([["dc","D&C"],["dc","Doctrine and Covenants"]]);
  names.forEach(([b,nm])=>{const re=new RegExp(nm.replace(/[.*+?^${}()|[\]\\&]/g,"\\$&")+"\\s+(\\d+)(?::(\\d+)(?:\\s?[–-]\\s?(\\d+))?)?","g");let m;
    while((m=re.exec(t))){const c=+m[1];if(!BOOKS[b].chs.includes(c))continue;const n=vcount(b,c),v0=m[2]?Math.min(+m[2],n):null;out.push({b,c,vs:v0?[v0,Math.max(v0,Math.min(+(m[3]||m[2]),n))]:null,at:m.index});}});
  return out.sort((a,b)=>a.at-b.at);}
const txt=e=>e.textContent.replace(/\s+/g," ").trim();

// Split the page into sections, each with its heading, text and scripture references.
function parseLessonHTML(html,title){const doc=new DOMParser().parseFromString(html,"text/html");
  const num=doc.querySelector(".title-number"),h1=doc.querySelector("h1"),sub=doc.querySelector(".subtitle");
  const meta={num:num?txt(num):"",title:title||[h1&&txt(h1),sub&&txt(sub)].filter(Boolean).join(": ")};
  const secs=[];let cur={h:"Introduction",group:"",body:[],refs:[],intro:1};secs.push(cur);let group="";
  const isHead=e=>/^H[2-4]$/.test(e.tagName)||(e.tagName==="P"&&e.classList.contains("title")&&e.closest("header"));
  const skip=e=>e.closest(".handout,video,figure.image,.image-cropper,nav")||e.closest("header")&&!isHead(e);
  doc.querySelectorAll("h2,h3,h4,p,li,blockquote").forEach(e=>{
    if(e.closest("header")&&e.closest("header").querySelector("h1"))return; // the page title block
    if(isHead(e)){const h=txt(e);if(!h)return;if(IMP_GROUPS.some(g=>g.toLowerCase()===h.toLowerCase())){group=h;return;}
      cur={h,group,body:[],refs:[]};secs.push(cur);e.querySelectorAll("a.scripture-ref,a[href*='/scriptures/']").forEach(a=>{const r=refFromHref(a.getAttribute("href"));if(r)cur.refs.push({...r,head:1});});
      if(!cur.refs.length)refsFromText(h).forEach(r=>cur.refs.push({...r,head:1}));return;}
    if(skip(e))return;if(e.tagName==="P"&&e.closest("li,blockquote"))return; // the li or blockquote carries its own text
    if(e.tagName==="P"&&(e.classList.contains("reference")||e.classList.contains("short-reference")))return;
    let t=txt(e);if(!t)return;if(e.tagName==="LI")t="• "+t;
    if(e.tagName==="BLOCKQUOTE"){const ps=[...e.querySelectorAll("p")].map(txt).filter(Boolean);let cite="";if(ps.length>1&&/^\(.*\)$/.test(ps[ps.length-1]))cite=ps.pop();
      const q=(ps.length?ps.join(" "):t).replace(/^[“"]+|[”"]+$/g,"");t=`“${q}”${cite?" "+cite:""}`;}
    if(e.closest("figure.for-teacher"))t="For the teacher: "+t.replace(/^For the teacher:\s*/i,"");
    cur.body.push(t);e.querySelectorAll("a.scripture-ref,a[href*='/scriptures/']").forEach(a=>{const r=refFromHref(a.getAttribute("href"));if(r)cur.refs.push(r);});});
  return {meta,secs:secs.filter(s=>s.body.length||s.refs.length)};}
// Same thing for text copied from the page (when the link can't be read)
function parseLessonText(text){const lines=text.split(/\r?\n+/).map(x=>x.trim()).filter(Boolean);const secs=[];let cur={h:"Introduction",group:"",body:[],refs:[],intro:1};secs.push(cur);let group="";
  const looksHead=(t,i)=>t.length<110&&!/[.?!”"]$/.test(t)&&!/^[•\-–]/.test(t)&&i>0&&(lines[i+1]||"").length>t.length;
  lines.forEach((t,i)=>{if(IMP_GROUPS.some(g=>g.toLowerCase()===t.toLowerCase())){group=t;return;}
    if(looksHead(t,i)){cur={h:t,group,body:[],refs:refsFromText(t).map(r=>({...r,head:1}))};secs.push(cur);return;}
    cur.body.push(t);refsFromText(t).forEach(r=>cur.refs.push(r));});
  return {meta:{num:"",title:lines[0]||"Imported lesson"},secs:secs.filter(s=>s.body.length)};}

// Decide which chapter and verses each section belongs to.
function placeSections(parsed){const out=[];let last=null;const first=parsed.secs.map(s=>s.refs.find(r=>r.vs)||s.refs[0]).find(Boolean);
  if(!first)return out;
  parsed.secs.forEach(s=>{const r=s.refs.find(x=>x.head&&x.vs)||s.refs.find(x=>x.vs)||s.refs[0];const sup=s.group&&!/possible learning|ideas for learning/i.test(s.group)?1:0;
    if(r){const k=CK(r.b,r.c);out.push({k,h:s.h,vs:r.vs||undefined,pos:r.vs?undefined:"start",sup,body:s.body});last=k;}
    else out.push({k:last||CK(first.b,first.c),h:s.h,pos:last?"end":"start",sup,body:s.body});});
  return out;}

// Turn saved imports into lesson-builder lessons (runs at start and after syncing).
function registerImports(){const L=S.imports||{};
  Object.keys(MS).forEach(k=>{MS[k]=MS[k].filter(x=>!/imp_/.test(x.s));});
  let g=MG.find(x=>x.id==="imported");if(!g){g={id:"imported",n:"From a link",d:"Lessons you brought in",t:"From a link",y:"",ls:[]};MG.push(g);}g.ls=[];
  Object.entries(L).forEach(([id,I])=>{MAN[id]={t:I.t,n:I.n,d:I.d,u:I.u};g.ls.push(id);const sec={};
    I.secs.forEach(x=>{MS[x.k]=MS[x.k]||[];MS[x.k].push({s:id,h:x.h,vs:x.vs,pos:x.pos,sup:x.sup});sec[x.k+"|m"+(MS[x.k].length-1)]=x.body;});
    S.mtext=S.mtext||{};S.mtext[id]={sec,found:I.secs.length,total:I.secs.length,miss:[],when:I.when,auto:1};});}

let IMP_BUSY=false;
async function importLesson(raw,pasted){const url=cleanUrl(raw||"");
  if(!pasted&&(!url||!isChurchLesson(url))){toast("Paste a link to a lesson on churchofjesuschrist.org.");return;}
  IMP_BUSY=true;impStatus("Reading the lesson…");
  try{let parsed;
    if(pasted)parsed=parseLessonText(pasted);
    else{const p=await fetchLessonPage(url);parsed=parseLessonHTML(p.body,p.title);}
    const secs=placeSections(parsed);
    if(!secs.length){impStatus(`This lesson doesn't point to any chapter that's in Joined yet.`,true);IMP_BUSY=false;return;}
    const sem=/seminary/i.test(url||""),cfm=/come-follow-me/i.test(url||"");const id=(sem?"semimp_":cfm?"cfmimp_":"ownimp_")+impHash(url||parsed.meta.title);
    const chs=[...new Set(secs.map(x=>x.k))];
    S.imports=S.imports||{};S.imports[id]={u:url||"",t:parsed.meta.title||"Imported lesson",n:sem?"Seminary":cfm?"Come, Follow Me":"Lesson",
      d:(()=>{const m=parsed.meta.num.match(/^(.*?):\s*(Lesson \d+)$/);return m?`${m[2]} · ${m[1]}`:parsed.meta.num||chs.map(k=>{const p=PCK(k);return chapLabel(p.b,p.c);}).join(", ");})(),secs,when:Date.now()};
    chs.forEach(k=>{S.lb=S.lb||{};const key=id+"|"+k;S.lb[key]=S.lb[key]||{inc:{},own:[],title:"",verses:true,show:{cfm:true,sem:true,kids:false,sup:true}};});
    registerImports();save();IMP_BUSY=false;const f=PCK(chs[0]);
    toast(`Added “${S.imports[id].t}”: ${secs.length} sections in ${chs.map(k=>{const p=PCK(k);return chapLabel(p.b,p.c);}).join(", ")}`);
    location.hash=`#build-${f.b}-${f.c}~${id}`;}
  catch(e){IMP_BUSY=false;impStatus("Couldn't read that page from here. Open it, copy the whole page, and paste it in the box below.",true,true);}}
function impStatus(m,err,showPaste){const s=$("#impstat");if(s){s.textContent=m;s.className="impstat"+(err?" err":"");}const p=$("#imppaste");if(p&&showPaste)p.hidden=false;}
function importBox(){return `<form class="impform" id="impform"><label for="impurl"><strong>Bring in a lesson from a link</strong><span>Paste the link to a seminary or Come, Follow Me lesson. Joined reads it and puts each part of the lesson next to the verses it teaches.</span></label>
  <div class="improw"><input id="impurl" type="url" inputmode="url" placeholder="https://www.churchofjesuschrist.org/study/manual/…" autocomplete="off"><button class="btn primary" type="submit">Bring it in</button></div>
  <p id="impstat" class="impstat" aria-live="polite"></p>
  <div id="imppaste" hidden><textarea id="imptext" rows="3" placeholder="Paste the whole lesson page here"></textarea><button class="btn" type="button" data-imppaste>Use pasted text</button></div></form>`;}
function importedList(){const L=Object.entries(S.imports||{});if(!L.length)return "";
  return `<section class="hsect"><h2 class="h3-label">From a link</h2><div class="bp-lessons">${L.sort((a,b)=>b[1].when-a[1].when).map(([id,I])=>{const chs=[...new Set(I.secs.map(x=>x.k))];
    return `<div class="bp-lesson"><div class="eyebrow">${esc(I.n)} · ${esc(I.d)}</div><h3>${esc(I.t)}</h3><div class="bp-chs">${chs.map(k=>{const {b,c}=PCK(k),n=I.secs.filter(x=>x.k===k).length;return `<a class="bp-ch" href="#build-${b}-${c}~${id}"><strong>${esc(chapLabel(b,c))}</strong><span>${n} section${n>1?"s":""}</span></a>`;}).join("")}</div>
     <div class="row">${I.u?`<a class="m-link" href="${I.u}" target="_blank" rel="noopener">Open in the manual ↗</a>`:""}<button class="lnk" data-impdel="${id}">Remove</button></div></div>`;}).join("")}</div></section>`;}
document.addEventListener("submit",e=>{if(e.target.id!=="impform")return;e.preventDefault();if(!IMP_BUSY)importLesson($("#impurl").value);});
document.addEventListener("click",e=>{const p=e.target.closest("[data-imppaste]");if(p){const t=$("#imptext").value;if(t.length<200){toast("Copy the whole lesson page, then paste it.");return;}importLesson($("#impurl").value,t);return;}
  const d=e.target.closest("[data-impdel]");if(d){const id=d.dataset.impdel;delete S.imports[id];if(S.mtext)delete S.mtext[id];delete MAN[id];registerImports();save();route();toast("Removed.");}});
// A link shared into Joined: #import=<url>, or ?url= / ?text= from the phone's share menu (Android)
function takeSharedLink(){const q=new URLSearchParams(location.search),h=location.hash.match(/^#import=(.+)$/);
  let u=h?decodeURIComponent(h[1]):(q.get("url")||(q.get("text")||"").match(/https?:\/\/\S+/)?.[0]||"");
  if(!u)return false;if(q.get("url")||q.get("text"))history.replaceState(null,"",location.pathname);
  location.hash="#prepare";setTimeout(()=>{const i=$("#impurl");if(i)i.value=u;importLesson(u);},50);return true;}

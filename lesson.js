// ---- Lesson builder (Prepare → Lesson builder) ----
// The scripture chapter is the page. The Church's manual sections are placed inside it, at the verses they cover.
// Section headings and verse ranges come from the manuals; each links to the full section on the Church's website.
const MAN={
 cfm26_46:{t:"“There Is No Other God That Can Deliver”",n:"Come, Follow Me",d:"Nov 9–15, 2026 · Daniel 1–7",u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/46?lang=eng"},
 cfm26_08:{t:"“To Be a Greater Follower of Righteousness”",n:"Come, Follow Me",d:"Feb 16–22, 2026 · Genesis 12–17; Abraham 1–2",u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/08?lang=eng"},
 cfm26_02:{t:"“This Is My Work and My Glory”",n:"Come, Follow Me",d:"Jan 5–11, 2026 · Moses 1; Abraham 3",u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/02?lang=eng"},
 cfm24_02:{t:"“I Will Go and Do”",n:"Come, Follow Me",d:"Jan 8–14, 2024 · 1 Nephi 1–5",u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/02?lang=eng"},
 cfm25_43:{t:"“O God, Where Art Thou?”",n:"Come, Follow Me",d:"Oct 20–26, 2025 · D&C 121–123",u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-doctrine-and-covenants-2025/43-doctrine-and-covenants-121-123?lang=eng"},
 cfm23_08:{t:"“Blessed Are Ye”",n:"Come, Follow Me",d:"Feb 13–19, 2023 · Matthew 5; Luke 6",u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-individuals-and-families-new-testament-2023/08?lang=eng"},
 cfm23_09:{t:"“He Taught Them as One Having Authority”",n:"Come, Follow Me",d:"Feb 20–26, 2023 · Matthew 6–7",u:"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-individuals-and-families-new-testament-2023/09?lang=eng"},
 sem_d1:{t:"“Daniel … Would Not Defile Himself”",n:"Seminary",d:"Lesson 142 · Daniel 1",u:"https://www.churchofjesuschrist.org/study/manual/old-testament-seminary-manual-2026/45-daniel/451-daniel-1?lang=eng"},
 sem_d2:{t:"“A Kingdom Which Shall Never Be Destroyed”",n:"Seminary",d:"Lesson 143 · Daniel 2",u:"https://www.churchofjesuschrist.org/study/manual/old-testament-seminary-manual-2026/45-daniel/452-daniel-2?lang=eng"},
 sem_d3:{t:"“Our God … Is Able to Deliver Us. … But If Not”",n:"Seminary",d:"Lesson 144 · Daniel 3",u:"https://www.churchofjesuschrist.org/study/manual/old-testament-seminary-manual-2026/45-daniel/453-daniel-3?lang=eng"}};
const MG=[{id:"cfm-ot26",n:"Come, Follow Me",d:"Old Testament 2026",t:"Old Testament",y:"2026",ls:["cfm26_02","cfm26_08","cfm26_46"]},
 {id:"sem-ot26",n:"Seminary",d:"Old Testament 2026",t:"Old Testament",y:"2026",ls:["sem_d1","sem_d2","sem_d3"]},
 {id:"cfm-dc25",n:"Come, Follow Me",d:"Doctrine and Covenants 2025",t:"Doctrine and Covenants",y:"2025",ls:["cfm25_43"]},
 {id:"cfm-bom24",n:"Come, Follow Me",d:"Book of Mormon 2024",t:"Book of Mormon",y:"2024",ls:["cfm24_02"]},
 {id:"cfm-nt23",n:"Come, Follow Me",d:"New Testament 2023",t:"New Testament",y:"2023",ls:["cfm23_08","cfm23_09"]}];
// Other headings in each lesson page. They mark where a pasted section ends.
const STOP_ALL=["Ideas for Learning at Home and at Church","Ideas for Teaching Children","Scripture Helps","Possible Learning Activities","Additional Resources","Supplemental Learning Activities","Memorize","Ideas for Personal Scripture Study","Ideas for Family Scripture Study and Home Evening","Improving Our Teaching","Improving Personal Study","Teaching Tip","More Ideas for Teaching Children","Overview","Student preparation"];
const STOPS={cfm26_46:["Jesus Christ is the Son of the Eternal Father.","Heavenly Father wants me to pray often."],sem_d1:["Physical and spiritual blessings"],
 sem_d2:["What does it mean that the stone was cut out of the mountain without hands?","What does it mean that the stone will fill the whole earth?","Why is the Restoration of The Church of Jesus Christ of Latter-day Saints important?","What other kingdoms could be represented by the image King Nebuchadnezzar saw?","Old Testament Restoration scriptures","The gospel of Jesus Christ fills the earth"],
 sem_d3:["Why do I sometimes experience negative results after exercising faith?","What does it mean to exercise faith in Jesus Christ when I face trials?"],
 cfm26_08:["Melchizedek was a man of faith.","Abraham paid tithing.","God hears me.","I can be a peacemaker."],
 cfm26_02:["As a child of God, I have a divine destiny.","With the Lord's help, I can resist Satan.","I am a child of God.","Heavenly Father has a work for me to do.","I can resist Satan's temptations."]};
const lessonChs=l=>BOOK_ORDER.flatMap(b=>BOOKS[b].chs.map(c=>CK(b,c))).filter(k=>(MS[k]||[]).some(x=>x.s===l));
const groupOf=l=>MG.find(g=>g.ls.includes(l));
const NRM=t=>t.toLowerCase().replace(/[“”"]/g,'"').replace(/[‘’']/g,"'").replace(/…/g,"...").replace(/\s+/g," ").replace(/[.:]+$/,"").trim();
function lessonHeads(l){return Object.entries(MS).flatMap(([k,a])=>a.map((x,i)=>({...x,k,id:"m"+i}))).filter(x=>x.s===l);}
// Split a pasted copy of the lesson page into its sections, using the headings we know.
function splitManual(l,text){const lines=text.split(/\r?\n+/).map(x=>x.trim()).filter(Boolean);
  const heads=lessonHeads(l),known=new Set([...heads.map(x=>NRM(x.h)),...STOP_ALL.map(NRM),...(STOPS[l]||[]).map(NRM)]);
  const occ=[];lines.forEach((t,i)=>{if(t.length<200&&known.has(NRM(t)))occ.push({i,n:NRM(t)});});
  const kidsAt=(occ.find(o=>o.n===NRM("Ideas for Teaching Children"))||{i:1e9}).i;const sec={};let found=0;const miss=[];
  heads.forEach(x=>{const n=NRM(x.h),c=occ.filter(o=>o.n===n),m=(x.kids?c.find(o=>o.i>kidsAt):c.find(o=>o.i<kidsAt))||c[0];
    if(!m){miss.push(x.h);return;}const next=occ.find(o=>o.i>m.i),body=lines.slice(m.i+1,next?next.i:lines.length).filter(t=>!/^(image|video|photo)\b/i.test(t));
    if(body.length){sec[x.k+"|"+x.id]=body;found++;}else miss.push(x.h);});
  return {sec,found,total:heads.length,miss,when:Date.now()};}
const MTXT=l=>(S.mtext||{})[l];
let LBL=null; // the manual lesson the builder was opened from (null = any chapter, all manuals)
// s: manual key, h: section heading as written in the manual, vs: verses it covers (none = opening or closing section), kids: teaching-children idea, sup: supplemental activity
const MS={
 "dan.1":[{s:"sem_d1",h:"What would you do?",pos:"start"},{s:"sem_d1",h:"Daniel obeyed the Lord",vs:[1,14]},{s:"sem_d1",h:"Daniel 1:8. “Daniel purposed in his heart”",vs:[8,8],sup:1},
  {s:"cfm26_46",h:"I can trust in the Lord when my faith is tried.",vs:[10,13]},{s:"sem_d1",h:"Blessings of obeying the Lord",vs:[15,20]},{s:"cfm26_46",h:"Heavenly Father wants me to take care of my body.",vs:[15,17],kids:1},
  {s:"cfm26_46",h:"Receiving revelation requires spiritual preparation.",vs:[17,17]},{s:"sem_d1",h:"Commit now to obey the Lord",pos:"end"}],
 "dan.2":[{s:"sem_d2",h:"Testimony of the Restoration",pos:"start"},{s:"sem_d2",h:"King Nebuchadnezzar's dream",vs:[1,45]},{s:"cfm26_46",h:"Receiving revelation requires spiritual preparation.",vs:[1,30]},
  {s:"sem_d2",h:"Receiving God's help",vs:[17,23],sup:1},{s:"sem_d2",h:"Alternative beginning",vs:[28,28],sup:1},{s:"cfm26_46",h:"The Church of Jesus Christ of Latter-day Saints is the kingdom of God on earth.",vs:[34,45]},
  {s:"cfm26_46",h:"The Church of Jesus Christ of Latter-day Saints is the kingdom of God on earth.",vs:[31,45],kids:1},{s:"sem_d2",h:"Memorize",vs:[44,45]},{s:"sem_d2",h:"The stone rolls forth",vs:[45,45]}],
 "dan.3":[{s:"sem_d3",h:"Exercising faith in Jesus Christ",pos:"start"},{s:"sem_d3",h:"Alternative beginning",pos:"start",sup:1},{s:"cfm26_46",h:"Jesus will help me do what is right even when it's hard.",pos:"start",kids:1},
  {s:"sem_d3",h:"A difficult decision",vs:[1,18]},{s:"cfm26_46",h:"I can trust in the Lord when my faith is tried.",vs:[15,18]},{s:"sem_d3",h:"Daniel 3:18. What can I learn about faith from the phrase “but if not”?",vs:[18,18],sup:1},
  {s:"sem_d3",h:"The outcome of our faith",vs:[19,28]},{s:"sem_d3",h:"Depending on Christ",pos:"end"},{s:"sem_d3",h:"A modern-day example",pos:"end",sup:1},{s:"sem_d3",h:"“Do What Is Right”",pos:"end",sup:1},{s:"sem_d3",h:"Standing firm in our faith of Jesus Christ",pos:"end",sup:1}],
 "mat.5":[{s:"cfm23_08",h:"Lasting happiness comes from living the way Jesus Christ taught.",vs:[1,12]},{s:"cfm23_08",h:"Ye are the salt of the earth.",vs:[13,13]},
  {s:"cfm23_08",h:"The law of Christ supersedes the law of Moses.",vs:[17,48]},{s:"cfm23_08",h:"Does Heavenly Father really expect me to be perfect?",vs:[48,48]}],
 "mat.6":[{s:"cfm23_09",h:"Living the Savior's teachings can help me become like Him.",pos:"start"},{s:"cfm23_09",h:"What does it mean to use “vain repetitions” in prayer?",vs:[7,7]}],
 "mat.7":[{s:"cfm23_09",h:"I can judge righteously.",vs:[1,5]},{s:"cfm23_09",h:"I come to know Jesus Christ by doing His will.",vs:[21,23]},{s:"cfm23_09",h:"Obeying the Savior's teachings creates a firm foundation for my life.",vs:[24,27]}],
 "1ne.1":[{s:"cfm24_02",h:"The word of God is “of great worth” to me.",vs:[11,15]}],
 "1ne.2":[{s:"cfm24_02",h:"I can gain and strengthen my testimony as I turn to the Lord.",pos:"start"},{s:"cfm24_02",h:"I can have my own testimony.",vs:[16,19],kids:1}],
 "1ne.3":[{s:"cfm24_02",h:"God will help me keep His commandments.",vs:[2,7],kids:1},{s:"cfm24_02",h:"God will prepare a way for me to do His will.",vs:[5,7]},{s:"cfm24_02",h:"God will prepare a way for me to do His will.",vs:[15,16]},
  {s:"cfm24_02",h:"The word of God is “of great worth” to me.",vs:[19,20]},{s:"cfm24_02",h:"The scriptures are a great treasure.",vs:[19,21],kids:1}],
 "1ne.4":[{s:"cfm24_02",h:"Remembering the works of God can give me the faith to obey His commandments.",vs:[1,3]},{s:"cfm24_02",h:"“I was led by the Spirit.”",vs:[5,18]},
  {s:"cfm24_02",h:"The Holy Ghost will lead me as I seek to do the Lord's will.",vs:[6,6],kids:1}],
 "dc.121":[{s:"cfm25_43",h:"With God, adversity can “be for [my] good.”",vs:[1,10]},{s:"cfm25_43",h:"With God, my trials can be for my good.",vs:[1,9],kids:1},{s:"cfm25_43",h:"With God, adversity can “be for [my] good.”",vs:[23,33]},
  {s:"cfm25_43",h:"True power and influence are based on “the principles of righteousness.”",vs:[34,46]},{s:"cfm25_43",h:"Righteousness brings the “powers of heaven.”",vs:[34,46],kids:1}],
 "dc.122":[{s:"cfm25_43",h:"With God, adversity can “be for [my] good.”",pos:"start"},{s:"cfm25_43",h:"Jesus Christ knows what I am going through.",vs:[7,9],kids:1},{s:"cfm25_43",h:"Jesus Christ has descended below all things so that He can lift me up.",vs:[8,8]}],
 "dc.123":[{s:"cfm25_43",h:"“Let us cheerfully do all things that lie in our power.”",pos:"start"},{s:"cfm25_43",h:"Even small things can make a big difference in God's service.",vs:[15,17],kids:1}],
 "abr.1":[{s:"cfm26_08",h:"God will bless me for my faith and righteous desires.",vs:[1,19]},{s:"cfm26_08",h:"God hears me.",vs:[12,17],kids:1},{s:"cfm26_08",h:"Jesus Christ will lead me by the hand.",vs:[18,18],kids:1}],
 "abr.2":[{s:"cfm26_08",h:"Jesus Christ will lead me by the hand.",vs:[8,8],kids:1},{s:"cfm26_08",h:"God wants me to make covenants with Him.",vs:[9,11],kids:1},{s:"cfm26_08",h:"God wants me to make and keep covenants with Him.",vs:[10,11]}],
 "abr.3":[{s:"cfm26_02",h:"I lived as a spirit before I was born on earth.",vs:[22,28]},{s:"cfm26_02",h:"I lived as a spirit before I was born on earth.",vs:[22,28],kids:1},{s:"cfm26_02",h:"God's work and glory is to help me gain eternal life.",vs:[24,26]}]};
const LK={q_understand:"Question · Understand",q_feel:"Question · Ponder",q_invite:"Question · Invite",point:"Truth",quote:"Quote",act:"Activity",note:"Note"};
let LB=null,LADD=null,LEDIT=null; // LB: the chapter open in the builder
function LST(k){S.lb=S.lb||{};k=(LBL?LBL+"|":"")+k;return S.lb[k]=S.lb[k]||{inc:{},own:[],title:"",verses:true,show:{cfm:true,sem:true,kids:false,sup:false}};}
const PCK=k=>{const m=k.match(/^(\w+)\.(\d+)$/);return {b:m[1],c:+m[2]};};
function mItems(k){const st=LST(k);return (MS[k]||[]).map((x,i)=>({...x,id:"m"+i,kind:"man"})).filter(x=>{const isSem=x.s.startsWith("sem");if(LBL)return x.s===LBL&&(!x.kids||st.show.kids)&&(!x.sup||st.show.sup);
  return (isSem?st.show.sem:st.show.cfm)&&(!x.kids||st.show.kids)&&(!x.sup||st.show.sup);});}
function lbItems(k){const st=LST(k),{b,c}=PCK(k),n=vcount(b,c);
  const at=x=>x.kind==="man"?(x.vs?x.vs[0]-1:(x.pos==="end"?n:0)):x.at;
  const mps=[];mItems(k).forEach(x=>{const P=paraInfo(k,x);if(P)P.items.forEach(it=>mps.push({...it,x,kind:"mp",_at:it.at}));});
  const all=[...mItems(k),...st.own.map(o=>({...o,kind:"own"}))].map((x,i)=>({...x,_at:at(x),_i:i,on:x.id in st.inc?st.inc[x.id]:x.kind==="own"||(!x.kids&&!x.sup)})).concat(mps.map((x,i)=>({...x,_i:1000+i})));
  // At each spot: things placed after the verse come first, then each section heading followed by its own opening paragraphs.
  const hi={};mItems(k).forEach((x,i)=>hi[x.id]=i);
  const pre=x=>x._at>0&&(x.kind==="own"||(x.kind==="mp"&&!x.intro))?0:1;
  const g=x=>x.kind==="man"?hi[x.id]*2:x.kind==="mp"&&x.intro?hi[x.x.id]*2+1:x.kind==="mp"?1e6:2e6;
  return all.sort((a,b)=>a._at-b._at||pre(a)-pre(b)||g(a)-g(b)||a._i-b._i);}
const vrange=vs=>vs?(vs[0]===vs[1]?`Verse ${vs[0]}`:`Verses ${vs[0]}–${vs[1]}`):"";
function manHTML(x){const M=MAN[x.s];
  return `<div class="mcard${x.on?"":" off"}${x.s.startsWith("sem")?" sem":""}"><label class="lc-inc" title="Include in my lesson"><input type="checkbox" data-linc="${x.id}" ${x.on?"checked":""} aria-label="Include in my lesson"></label>
   <div class="lc-body"><div class="lc-top"><span class="m-src">${M.n}${x.kids?" · Children":""}${x.sup?" · Extra":""}</span><span class="lc-from">${x.vs?vrange(x.vs):x.pos==="end"?"To close":"To open"}</span></div>
   <p class="m-h">${esc(x.h)}</p>${secBody(x)}<a class="m-link" href="${M.u}" target="_blank" rel="noopener">Open in the manual ↗</a></div></div>`;}
// ---- Fit the manual's paragraphs into the chapter ----
// A paragraph that names specific verses (Abraham 1:12–17, verses 5–7) is placed right after those verses.
// Questions that follow it go with it. Reference lists and video titles are set aside. The teacher can move anything.
const BK_ALIAS={dc:["Doctrine and Covenants","D&C"]};
const REFTXT=/(?:\d\s)?[A-Z][A-Za-z&’']*(?:\s(?:and\s|of\s)?[A-Z][a-z]+)*\s\d+(?::\d+(?:\s?[–-]\s?\d+)?(?:,\s?\d+(?:\s?[–-]\s?\d+)?)*)?/g;
const isRefsOnly=p=>p.replace(REFTXT,"").replace(/\b(see|also|and)\b/gi,"").replace(/[^A-Za-z]/g,"").length<4;
const isResource=p=>/^see also\b/i.test(p)||/\((video|music|image|art|song)\)/i.test(p)||(p.length<70&&!/[.?!:]["”]?$/.test(p));
function placeOf(p,b,c,n){const names=[bname(b),...(BK_ALIAS[b]||[])].map(x=>x.replace(/[.*+?^${}()|[\]\\&]/g,"\\$&"));const rs=[];let m;
  const re1=new RegExp(`(?:${names.join("|")})\\s+${c}:(\\d+)(?:\\s?[–-]\\s?(\\d+))?`,"g");while((m=re1.exec(p)))rs.push([+m[1],+(m[2]||m[1])]);
  const re2=/\bverses?\s+(\d+)(?:\s?[–-]\s?(\d+))?/gi;while((m=re2.exec(p)))rs.push([+m[1],+(m[2]||m[1])]);
  const ok=rs.filter(r=>r[0]>=1&&r[1]<=n&&r[1]>=r[0]&&r[1]-r[0]<=6).sort((x,y)=>(x[1]-x[0])-(y[1]-y[0]));return ok.length?ok[0][1]:null;}
// Find the verse a paragraph is most about, by the words they share (rarer words count more) and any phrase it quotes.
const STOPW=new Set("the and that with have from they their them this what your how does these verses verse might help consider about when into were there will would could more like unto thee thou thy thine shall hath came pass also said which upon then were been being what when where who whom why can may did does doing done each other some such than then very just even ever only own same so too our ours you yours his her him she he it its was are for not but all any out one two read look think ask invite share discuss students children family class".split(" "));
const stem=w=>w.length>=5?w.slice(0,5):w;
const words=t=>(t.toLowerCase().match(/[a-z’']{3,}/g)||[]).map(w=>w.replace(/[’']s?$/,"")).filter(w=>!STOPW.has(w)).map(stem);
function bestVerse(p,b,c,range){const ver=verOf(b),n=vcount(b,c),V=[];for(let v=1;v<=n;v++)V.push(new Set(words(vtext(MR(b,c,v),ver))));
  const df={};V.forEach(s=>s.forEach(w=>df[w]=(df[w]||0)+1));const pw=new Set(words(p));
  const quotes=(p.match(/[“"]([^”"]{6,80})[”"]/g)||[]).map(q=>q.slice(1,-1).toLowerCase().replace(/[^a-z ]/g,"").trim()).filter(q=>q.split(" ").length>=2);
  let best=null,bs=0;for(let v=range[0];v<=range[1];v++){let sc=0;pw.forEach(w=>{if(V[v-1].has(w))sc+=Math.log((n+1)/df[w]);});
    const vt=vtext(MR(b,c,v),ver).toLowerCase().replace(/[^a-z ]/g,"");quotes.forEach(q=>{if(vt.includes(q))sc+=6;});if(sc>bs){bs=sc;best=v;}}
  return bs>=2.2?best:null;}
function paraInfo(k,x){const T=MTXT(x.s),ps=T&&T.sec[k+"|"+x.id];if(!ps)return null;const {b,c}=PCK(k),st=LST(k),n=vcount(b,c),items=[],res=[];let prev=null;
  const home=x.vs?x.vs[0]-1:(x.pos==="end"?n:0); // the section heading's own spot
  ps.forEach((p,i)=>{const id=`p|${x.id}|${i}`;if(isRefsOnly(p))return;if(isResource(p)){res.push(p);return;}
    const q=/\?/.test(p);let at=placeOf(p,b,c,n);
    if(at!==null&&x.vs&&(at<x.vs[0]||at>x.vs[1]))at=null; // a reference outside this section's verses stays with the section
    if(at===null&&x.vs)at=bestVerse(p,b,c,x.vs);
    if(at===null&&q&&prev!==null)at=prev;
    if(at!==null)prev=at;
    if(st.mv&&id in st.mv)at=st.mv[id]?st.mv[id]:null;
    items.push({id,i,p,q,at:at===null?home:at,intro:at===null,on:!!st.inc[id]});});
  return {items,res,home};}
function placeSel(it){const n=vcount(PCK(LB).b,PCK(LB).c);let o=`<option value="0" ${it.intro?"selected":""}>With the section heading</option>`;for(let v=1;v<=n;v++)o+=`<option value="${v}" ${!it.intro&&it.at===v?"selected":""}>After verse ${v}</option>`;
  return `<select class="mvsel" data-lmv="${it.id}" aria-label="Move this to another verse">${o}</select>`;}
function paraRow(it){return `<div class="mp${it.q?" q":""}${it.on?" on":""}"><input type="checkbox" data-linc="${it.id}" ${it.on?"checked":""} aria-label="Use in my lesson"><span>${esc(it.p)}</span>${placeSel(it)}</div>`;}
function secBody(x){const P=paraInfo(LB,x);if(!P)return "";return P.res.length?`<p class="mres">Also in this section: ${P.res.map(esc).join(" · ")}</p>`:"";}
function mpCard(it){const M=MAN[it.x.s];return `<div class="mpcard${it.intro?" intro":""}${it.on?"":" off"}${it.x.s.startsWith("sem")?" sem":""}"><div class="mpc-top"><span class="m-src">${M.n}</span><span class="lc-from">From “${esc(it.x.h.length>48?it.x.h.slice(0,46)+"…":it.x.h)}”</span></div>${paraRow(it)}</div>`;}
const CLOSED=new Set();
function ownHTML(x){return `<div class="lcard k-${x.k.split("_")[0]}${x.on?"":" off"}"><label class="lc-inc"><input type="checkbox" data-linc="${esc(x.id)}" ${x.on?"checked":""} aria-label="Include in my lesson"></label>
   <div class="lc-body"><div class="lc-top"><span class="lc-kind">${LK[x.k]}</span><span class="lc-from">Yours</span></div>
   <p class="lc-t">${x.k==="quote"?"“"+esc(x.t)+"”":esc(x.t)}</p>${x.k==="quote"&&(x.sp||x.src)?`<p class="lc-src">— ${esc(x.sp||"")}${x.src?", "+esc(x.src):""}</p>`:""}
   <div class="lc-own"><button class="lnk" data-ledit="${esc(x.id)}">Edit</button><button class="lnk" data-ldel="${esc(x.id)}">Remove</button></div></div></div>`;}
function addForm(v,c){c=c||{k:"q_understand",t:"",sp:"",src:""};
  return `<div class="lform" data-lat="${v}" ${c.id?`data-lid="${esc(c.id)}"`:""}><select id="lk" aria-label="Kind">${Object.entries(LK).map(([k,l])=>`<option value="${k}" ${k===c.k?"selected":""}>${l}</option>`).join("")}</select>
   <textarea id="lt" placeholder="Write a question, truth, quote, activity or note…">${esc(c.t)}</textarea>
   <div class="lq" ${c.k==="quote"?"":"hidden"}><input id="lsp" placeholder="Who said it" value="${esc(c.sp||"")}"><input id="lsrc" placeholder="Where it's from (talk, date)" value="${esc(c.src||"")}"></div>
   <div class="row"><button class="btn primary" data-lsave>${c.id?"Save":"Add"}</button><button class="btn" data-lcancel>Cancel</button></div></div>`;}
const addBtn=v=>LADD===v?addForm(v,LEDIT):`<div class="ladd-row"><button class="ladd2" data-ladd="${v}" aria-label="Add a question, quote or activity ${v?"after verse "+v:"at the start"}">+ Add</button></div>`;
function pickShell(back,backL,title,intro,inner){$("#reader").innerHTML=`<div class="home3"><a class="back" href="${back}">← ${backL}</a>
   <section class="hsect"><h1 class="pg-title">${title}</h1>${intro?`<p class="muted" style="max-width:640px;margin:0">${intro}</p>`:""}${inner}</section>${homeFoot()}</div>`;renderLBar();}
const MG_ON={"cfm-ot26": "Daniel 1–3 · Abraham 1–3", "sem-ot26": "Daniel 1, 2 and 3", "cfm-dc25": "D&C 121–123", "cfm-bom24": "1 Nephi 1–4", "cfm-nt23": "Matthew 5–7"};
function manCover(g){const sem=g.id.startsWith("sem");return `<a class="mbk ${sem?"sem":"cfm"}" href="#build~${g.id}"><span class="mbk-band">${sem?"Seminary":"Come, Follow Me"}</span>
  <span class="mbk-face"><strong>${esc(g.t)}</strong><span class="mbk-rule"></span><b>${g.y}</b></span><span class="mbk-foot">${esc(MG_ON[g.id]||"")}<em>${g.ls.length} lesson${g.ls.length>1?"s":""} →</em></span></a>`;}
function renderBuildPick(){LB=null;LBL=null;const w=cfmNow();
  $("#reader").innerHTML=`<div class="home3"><a class="back" href="#prepare">← Prepare</a>
   <section class="lbhero"><img src="${LOGO_MARK}" alt="" class="lbh-mark"><div><h1>Lesson builder</h1><p>Choose your manual and lesson. The chapter opens with the manual's sections placed right beside the verses they teach.</p></div></section>
   ${w?`<a class="lbweek" href="#build-dan-1~cfm26_46"><span class="lbw-l"><span class="eyebrow">This week</span><strong>${esc(w.block)}</strong><em>${esc(w.title)}</em></span><span class="btn primary">Start this lesson →</span></a>`:""}
   ${importedList()}
   <section class="hsect"><h2 class="h3-label">Come, Follow Me</h2><div class="mbks">${MG.filter(g=>!g.id.startsWith("sem")&&g.id!=="imported").map(manCover).join("")}</div></section>
   <section class="hsect"><h2 class="h3-label">Seminary</h2><div class="mbks">${MG.filter(g=>g.id.startsWith("sem")).map(manCover).join("")}</div></section>
   <p class="lbany">Teaching something else? <a href="#build~any">Start from any chapter →</a></p>${homeFoot()}</div>`;renderLBar();}
function renderBuildGroup(id){LB=null;LBL=null;
  if(id==="any"){const rows=BOOK_ORDER.map(b=>`<div class="bp-book"><h3>${esc(bname(b))}</h3><div class="bp-chs">${BOOKS[b].chs.map(c=>`<a class="bp-ch" href="#build-${b}-${c}"><strong>${esc(chapLabel(b,c))}</strong></a>`).join("")}</div></div>`).join("");
    return pickShell("#build","Manuals","Any chapter","Pick a chapter. You'll see every manual section that covers it, and you can add your own questions, quotes and activities.",rows);}
  const g=MG.find(x=>x.id===id);if(!g)return renderBuildPick();
  pickShell("#build","Manuals",`${g.n}: ${esc(g.d)}`,"Pick the lesson, then the chapter you want to start with.",
   `<div class="bp-lessons">${g.ls.map(l=>{const M=MAN[l],chs=lessonChs(l);return `<div class="bp-lesson"><div class="eyebrow">${esc(M.d)}</div><h3>${esc(M.t)}</h3>
     <div class="bp-chs">${chs.map(k=>{const {b,c}=PCK(k),n=MS[k].filter(x=>x.s===l).length;return `<a class="bp-ch" href="#build-${b}-${c}~${l}"><strong>${esc(chapLabel(b,c))}</strong><span>${n} section${n>1?"s":""}</span></a>`;}).join("")}</div>
     <a class="m-link" href="${M.u}" target="_blank" rel="noopener">Open this lesson in the manual ↗</a></div>`;}).join("")}</div>
   <p class="muted" style="font-size:13px">Joined only has some chapters so far, so a lesson may cover more chapters than you see here.</p>`);}
function renderBuild(k,l){if(l!==undefined)LBL=l&&MAN[l]?l:null;LB=k;const {b,c}=PCK(k),st=LST(k),n=vcount(b,c),ver=verOf(b),items=lbItems(k);
  const srcs=LBL?[LBL]:[...new Set((MS[k]||[]).map(x=>x.s))];const g=LBL&&groupOf(LBL),chs=LBL?lessonChs(LBL):[];
  const byAt={};items.forEach(x=>{(byAt[x._at]=byAt[x._at]||[]).push(x);});
  const cover=new Set();items.filter(x=>x.kind==="man"&&x.on&&x.vs).forEach(x=>{for(let v=x.vs[0];v<=x.vs[1];v++)cover.add(v);});
  const man=v=>(byAt[v]||[]).filter(x=>x.kind==="man").map(manHTML).join(""),own=v=>(byAt[v]||[]).filter(x=>x.kind==="own").map(ownHTML).join(""),mp=(v,intro)=>(byAt[v]||[]).filter(x=>x.kind==="mp"&&!!x.intro===intro).map(mpCard).join("");
  // order: the verse, your cards for that verse, the add button, then manual sections that begin with the next verse
  const at=(v,first)=>(byAt[v]||[]).filter(x=>(first?pre(x)===0:pre(x)===1)).map(x=>x.kind==="man"?manHTML(x):x.kind==="mp"?mpCard(x):ownHTML(x)).join("");
  const pre=x=>x._at>0&&(x.kind==="own"||(x.kind==="mp"&&!x.intro))?0:1;
  let body=at(0,false)+addBtn(0);
  for(let v=1;v<=n;v++)body+=`<div class="bv${cover.has(v)?" cov":""}"><span class="bvn">${v}</span>${esc(vtext(MR(b,c,v),ver))}</div>`+at(v,true)+addBtn(v)+at(v,false);
  const has=f=>(MS[k]||[]).filter(x=>!LBL||x.s===LBL).some(f);
  const chips=(id,l)=>`<label class="fchip"><input type="checkbox" data-lshow="${id}" ${st.show[id]?"checked":""}> ${l}</label>`;
  $("#reader").innerHTML=`<div class="build"><a class="back" href="${g?"#build~"+g.id:"#build~any"}">← ${g?esc(g.n+": "+g.d):"All chapters"}</a>
   <div class="bhead"><div class="eyebrow">${LBL?`${esc(MAN[LBL].n)} · ${esc(MAN[LBL].d)}`:"Lesson builder"}</div>${LBL?`<p class="blesson">${esc(MAN[LBL].t)}</p>`:""}
    ${chs.length>1?`<div class="bchs">${chs.map(x=>{const p=PCK(x);return `<a href="#build-${p.b}-${p.c}~${LBL}" ${x===k?'aria-current="page"':""}>${esc(chapLabel(p.b,p.c))}</a>`;}).join("")}</div>`:`<div class="bchs"><a aria-current="page">${esc(chapLabel(b,c))}</a></div>`}
    <input class="btitle" id="lbt" placeholder="Name your lesson" value="${esc(st.title)}" aria-label="Lesson title">
    ${srcs.length?`<p class="muted bsrc">From: ${srcs.map(s=>`<a href="${MAN[s].u}" target="_blank" rel="noopener">${MAN[s].n}, ${esc(MAN[s].d)} ↗</a>`).join(" · ")}</p>`
      :`<p class="muted bsrc">No manual sections are set up for this chapter yet. You can still build a lesson with your own questions, quotes and activities.</p>`}
    <div class="fchips">${!LBL&&has(x=>!x.s.startsWith("sem"))?chips("cfm","Come, Follow Me"):""}${!LBL&&has(x=>x.s.startsWith("sem"))?chips("sem","Seminary"):""}${has(x=>x.kids)?chips("kids","Children's ideas"):""}${has(x=>x.sup)?chips("sup","Extra activities"):""}</div>
    ${LBL?importPanel():""}<p class="bnote">A gold bar marks the verses a checked manual section covers. Tap <b>+</b> under any verse to add your own.</p></div>
   <div class="bpage">${body}</div></div>`;
  renderLBar();}
function importPanel(){const T=MTXT(LBL),M=MAN[LBL];
  if(/imp_/.test(LBL))return `<div class="impbar ok"><span class="impbar-t"><b>✓ Brought in from your link</b><span>${T?T.found:0} sections placed beside the verses they teach</span></span>${M.u?`<a class="lnk" href="${M.u}" target="_blank" rel="noopener">Open in the manual ↗</a>`:""}</div>`;
  if(T)return `<div class="impbar ok"><span class="impbar-t"><b>✓ Manual text added</b><span>${T.found} of ${T.total} sections placed by their verses${T.miss.length?` · not found: ${T.miss.map(esc).join("; ")}`:""}</span></span><button class="lnk" data-limp="again">Replace</button><button class="lnk" data-limp="clear">Remove</button></div>`;
  if(!AUTO[LBL]||AUTO[LBL]==="trying"){setTimeout(()=>autoManual(LBL),0);}
  const waiting=AUTO[LBL]!=="blocked";
  return `${waiting?`<div class="impbar" id="impwait"><span class="spin" aria-hidden="true"></span>Loading the manual text…</div>`:""}<div class="impbar" id="imphide" ${waiting?"hidden":""}>
   <span class="impbar-t"><b>Add the manual's full text</b><span>Open the lesson, copy the page, then paste anywhere here.</span></span>
   <a class="btn" href="${M.u}" target="_blank" rel="noopener">Open lesson ↗</a><textarea id="impbox" class="impbox" placeholder="Paste" aria-label="Paste the lesson text" rows="1"></textarea></div>`;}
// Try to load the lesson straight from the Church's site in the reader's own browser. If the browser blocks it, the paste box stays.
const AUTO={};
async function autoManual(l){if(AUTO[l])return;AUTO[l]="trying";
  try{const uri=new URL(MAN[l].u).pathname.replace(/^\/study/,"");
    const r=await fetch(`https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=eng&uri=${encodeURIComponent(uri)}`,{credentials:"omit"});
    if(!r.ok)throw 0;const j=await r.json(),html=(j.content&&j.content.body)||"";if(!html)throw 0;
    const doc=new DOMParser().parseFromString(html,"text/html"),lines=[];
    doc.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,figcaption").forEach(e=>{if(e.closest("li")&&e.tagName!=="LI")return;const t=e.textContent.replace(/\s+/g," ").trim();if(t)lines.push(t);});
    const res=splitManual(l,lines.join("\n"));if(!res.found)throw 0;res.auto=1;S.mtext=S.mtext||{};S.mtext[l]=res;save();AUTO[l]="ok";
    if(LBL===l&&view==="build"){const y=window.scrollY;renderBuild(LB);window.scrollTo(0,y);}}
  catch(e){AUTO[l]="blocked";if(LBL===l&&view==="build"){const p=$("#impwait");if(p)p.remove();const h=$("#imphide");if(h)h.hidden=false;}}}
function doImport(text){if(!LBL||!text||text.length<200){toast("That doesn't look like the whole lesson. Copy the full page and try again.");return;}
  const r=splitManual(LBL,text);if(!r.found){toast("Couldn't find this lesson's sections in what you pasted. Make sure it's the right lesson.");return;}
  S.mtext=S.mtext||{};S.mtext[LBL]=r;save();const y=window.scrollY;renderBuild(LB);window.scrollTo(0,y);toast(`Added the manual text: ${r.found} of ${r.total} sections`);}
document.addEventListener("paste",e=>{if(view!=="build"||!LBL)return;const t=e.target;if(t.id!=="impbox"&&t.closest&&t.closest("input,textarea,select"))return;
  const text=(e.clipboardData||window.clipboardData).getData("text");if(text&&text.length>=200){e.preventDefault();doImport(text);}});
document.addEventListener("toggle",e=>{const d=e.target;if(d.classList&&d.classList.contains("mtext")){if(d.open)CLOSED.delete(d.dataset.mid);else CLOSED.add(d.dataset.mid);}},true);
document.addEventListener("click",e=>{const b=e.target.closest("[data-limp]");if(!b||!LBL)return;
  if(b.dataset.limp==="clear"){delete S.mtext[LBL];save();renderBuild(LB);}else{const keep=S.mtext[LBL];delete S.mtext[LBL];renderBuild(LB);S.mtext[LBL]=keep;const t=$("#impbox");t&&t.focus();}});
function renderLBar(){let bar=$("#lbar");const show=view==="build"&&LB;
  if(!show){if(bar)bar.remove();document.body.classList.remove("has-lbar");return;}
  if(!bar){bar=document.createElement("div");bar.id="lbar";document.body.appendChild(bar);}document.body.classList.add("has-lbar");
  const n=lbItems(LB).filter(x=>x.on).length+pickedParas(LB).length,msg=($("#lbmsg")||{}).textContent||"";
  bar.innerHTML=`<div class="lbar-in"><span><b>${n}</b> item${n===1?"":"s"} in your lesson</span><div class="lbar-b"><button class="btn primary" data-lout="pptx" ${n?"":"disabled"}>PowerPoint</button><button class="btn" data-lout="gslides" ${n?"":"disabled"}>Google Slides</button><button class="btn" data-lout="print" ${n?"":"disabled"}>Print</button></div></div><p class="lb-msg" id="lbmsg" role="status">${esc(msg)}</p>`;}
// ---- Making files ----
function lessonTitle(k){const st=LST(k),{b,c}=PCK(k);return st.title||`Lesson: ${chapLabel(b,c)}`;}
function loadAny(srcs){return srcs.reduce((p,s)=>p.catch(()=>loadScript(s)),Promise.reject());}
async function saveFile(name,blob){
  try{if(window.claude&&window.claude.use){const d=await window.claude.use("downloads");if(d){await d.save({filename:name,data:blob});return "saved";}}}
  catch(e){if(e&&e.code==="declined")return "declined";}
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);return "saved";}
function pickedParas(k){return [];}
function plan(k){const st=LST(k),out=[],shown=new Set();
  lbItems(k).filter(x=>x.on).forEach(x=>{const vs=x.kind==="mp"?null:x.kind==="man"?(x.vs&&x.vs[1]-x.vs[0]<=5?x.vs:null):(x.at>0?[x.at,x.at]:null);
    if(x.kind==="man"){out.push({type:"man",x});pickedParas(k).filter(q=>q.x.id===x.id).forEach(q=>out.push({type:"para",x,p:q.p}));}
    if(vs&&st.verses){const need=[];for(let v=vs[0];v<=vs[1];v++)if(!shown.has(v)){need.push(v);shown.add(v);}if(need.length)out.push({type:"verses",vs:need});}
    if(x.kind==="own")out.push({type:"own",x});
    if(x.kind==="mp"){if(st.verses&&!x.intro&&x.at>0&&!shown.has(x.at)){shown.add(x.at);out.push({type:"verses",vs:[x.at]});}out.push({type:"para",x:x.x,p:x.p});}});return out;}
async function makePptx(k){const {b,c}=PCK(k),ver=verOf(b),T=lessonTitle(k);
  if(!window.PptxGenJS)await loadAny(["https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js","https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"]);
  const P=new PptxGenJS();P.layout="LAYOUT_WIDE";P.title=T;
  const NAVY="14305A",GOLD="C9972B",CREAM="FBF7EE",INK="16202F",SER="Georgia",SANS="Arial",W=13.333;
  const fs=(t,big,small)=>t.length<90?big:t.length<180?Math.round(big*.8):t.length<300?Math.round(big*.66):small;
  const label=(s,t,dark)=>s.addText(t.toUpperCase(),{x:0.8,y:0.55,w:W-1.6,h:0.4,fontFace:SANS,fontSize:14,bold:true,color:dark?GOLD:"9C7212",charSpacing:3});
  const foot=(s,dark)=>s.addText(`${chapLabel(b,c)}  ·  ${T}`,{x:0.8,y:6.85,w:W-1.6,h:0.3,fontFace:SANS,fontSize:10,color:dark?"8FA3C4":"8A8F99"});
  let s=P.addSlide();s.background={color:NAVY};
  s.addShape(P.ShapeType.rect,{x:W/2-0.6,y:2.05,w:1.2,h:0.05,fill:{color:GOLD},line:{color:GOLD}});
  s.addText(T,{x:0.8,y:2.3,w:W-1.6,h:1.6,fontFace:SER,fontSize:44,color:"FFFFFF",align:"center",valign:"middle"});
  s.addText(chapLabel(b,c).toUpperCase(),{x:0.8,y:4.0,w:W-1.6,h:0.5,fontFace:SANS,fontSize:16,color:GOLD,align:"center",charSpacing:4,bold:true});
  for(const p of plan(k)){
    if(p.type==="verses"){const chunks=[];let cur=[],len=0;
      p.vs.forEach(v=>{const L=vtext(MR(b,c,v),ver).length;if(cur.length&&(len+L>700||cur.length>=3)){chunks.push(cur);cur=[];len=0;}cur.push(v);len+=L;});if(cur.length)chunks.push(cur);
      for(const vs of chunks){s=P.addSlide();s.background={color:CREAM};label(s,`${chapLabel(b,c)}:${vs[0]}${vs.length>1?"–"+vs[vs.length-1]:""}`);
        const tot=vs.reduce((a,v)=>a+vtext(MR(b,c,v),ver).length,0),size=tot<250?30:tot<450?26:tot<650?23:20,runs=[];
        vs.forEach((v,i)=>{const ref=MR(b,c,v),txt=vtext(ref,ver),on=new Array(txt.length).fill(false);
          (S.marks||[]).forEach(m=>{if(m.ref===ref&&m.ver===ver)for(let j=m.s;j<m.e&&j<txt.length;j++)on[j]=true;});
          runs.push({text:`${v} `,options:{bold:true,color:"9C7212",fontSize:Math.round(size*.7)}});
          let j=0;while(j<txt.length){let e=j+1;while(e<txt.length&&on[e]===on[j])e++;runs.push({text:txt.slice(j,e),options:on[j]?{bold:true,color:INK,highlight:"F3D98B"}:{color:INK}});j=e;}
          if(i<vs.length-1)runs.push({text:"",options:{breakLine:true}},{text:" ",options:{breakLine:true,fontSize:8}});});
        s.addText(runs,{x:0.8,y:1.15,w:W-1.6,h:5.5,fontFace:SER,fontSize:size,valign:"top"});foot(s);}
      continue;}
    if(p.type==="para"){const q=/\?\s*$/.test(p.p);s=P.addSlide();s.background={color:q?NAVY:CREAM};label(s,q?"Question":"From the manual",q);
      s.addText(p.p,{x:1.0,y:1.4,w:W-2.0,h:4.6,fontFace:SER,fontSize:fs(p.p,q?38:32,20),color:q?"FFFFFF":INK,valign:"middle"});foot(s,q);continue;}
    if(p.type==="man"){const x=p.x,M=MAN[x.s];s=P.addSlide();s.background={color:NAVY};
      label(s,`${M.n}${x.vs?" · "+chapLabel(b,c)+":"+x.vs[0]+(x.vs[1]!==x.vs[0]?"–"+x.vs[1]:""):""}`,true);
      s.addShape(P.ShapeType.rect,{x:1.0,y:1.5,w:0.08,h:4.2,fill:{color:GOLD},line:{color:GOLD}});
      s.addText(x.h,{x:1.4,y:1.4,w:W-2.6,h:4.6,fontFace:SER,fontSize:fs(x.h,40,26),color:"FFFFFF",valign:"middle"});foot(s,true);continue;}
    const x=p.x,isQ=x.k.startsWith("q_");s=P.addSlide();
    if(isQ){s.background={color:NAVY};label(s,LK[x.k].replace("Question · ","Question: "),true);
      s.addText(x.t,{x:1.0,y:1.4,w:W-2.0,h:4.6,fontFace:SER,fontSize:fs(x.t,40,26),color:"FFFFFF",valign:"middle"});foot(s,true);}
    else if(x.k==="quote"){s.background={color:CREAM};label(s,"Quote");s.addText("“",{x:0.6,y:1.0,w:1.2,h:1.4,fontFace:SER,fontSize:96,color:GOLD});
      s.addText(x.t,{x:1.4,y:1.5,w:W-2.6,h:3.8,fontFace:SER,fontSize:fs(x.t,34,22),italic:true,color:INK,valign:"middle"});
      s.addText(`${x.sp||""}${x.src?", "+x.src:""}`,{x:1.4,y:5.4,w:W-2.6,h:0.6,fontFace:SANS,fontSize:16,color:"5F6675"});foot(s);}
    else{s.background={color:CREAM};label(s,LK[x.k]);s.addText(x.t,{x:1.4,y:1.4,w:W-2.6,h:4.6,fontFace:SER,fontSize:fs(x.t,36,24),color:INK,valign:"middle"});foot(s);}}
  return await P.write({outputType:"blob"});}
function printHTML(k){const {b,c}=PCK(k),ver=verOf(b),T=lessonTitle(k);
  const rows=plan(k).map(p=>{if(p.type==="verses")return `<div class="pv">${p.vs.map(v=>`<p><b>${v}</b> ${esc(vtext(MR(b,c,v),ver))}</p>`).join("")}</div>`;
    if(p.type==="para")return `<div class="pi"><div class="pk">${/\?\s*$/.test(p.p)?"Question":"From the manual"}</div><p>${esc(p.p)}</p></div>`;
    const x=p.x;if(p.type==="man")return `<div class="pi man"><div class="pk">${MAN[x.s].n}${x.vs?" · "+esc(vrange(x.vs)):""}</div><p class="ph">${esc(x.h)}</p><p class="pu">${MAN[x.s].u}</p></div>`;
    return `<div class="pi"><div class="pk">${LK[x.k]}</div><p>${x.k==="quote"?"“"+esc(x.t)+"”<br><i>— "+esc(x.sp||"")+(x.src?", "+esc(x.src):"")+"</i>":esc(x.t)}</p></div>`;}).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(T)}</title><style>body{font-family:Georgia,serif;color:#16202f;max-width:720px;margin:32px auto;padding:0 24px}
h1{font-size:28px;margin:0}.sub{font-family:Arial,sans-serif;color:#9c7212;letter-spacing:.12em;text-transform:uppercase;font-size:12px;font-weight:700;margin:6px 0 20px}
.pi{border-top:1px solid #ddd6c8;padding:10px 0;break-inside:avoid}.pk{font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#14305a}
.pi p{font-size:16px;line-height:1.5;margin:6px 0}.man .ph{font-weight:bold}.pu{font-family:Arial,sans-serif;font-size:10px!important;color:#888}.pv{background:#f7f3ea;padding:6px 12px;border-radius:6px;margin:6px 0}.pv p{margin:6px 0;font-size:15px}
.ft{font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:24px}</style></head><body><h1>${esc(T)}</h1><div class="sub">${esc(chapLabel(b,c))}</div>${rows}
<p class="ft">Made with Joined. Not an official publication of The Church of Jesus Christ of Latter-day Saints.</p></body></html>`;}
const fileBase=k=>lessonTitle(k).replace(/[\\/:*?"<>|]/g,"").slice(0,90);
async function doOut(kind){const k=LB;const say=t=>{const m=$("#lbmsg");if(m)m.textContent=t;};
  try{if(kind==="print"){const r=await saveFile(fileBase(k)+".html",new Blob([printHTML(k)],{type:"text/html"}));
      return say(r==="declined"?"Canceled.":"Downloaded. Open the file and print it, or choose Save as PDF when you print.");}
    say("Making your slides…");const blob=await makePptx(k);const r=await saveFile(fileBase(k)+".pptx",blob);
    if(r==="declined")return say("Canceled.");
    say(kind==="gslides"?"Downloaded. In Google Drive choose New → File upload, pick this file, then open it with Google Slides.":"Downloaded. Open it in PowerPoint or Keynote.");}
  catch(e){say("Couldn't make the file. Check your internet connection and try again.");}}
document.addEventListener("input",e=>{if(e.target.id==="lbt"&&LB){LST(LB).title=e.target.value;save();}});
document.addEventListener("change",e=>{const t=e.target;if(!LB||!t.dataset)return;const st=LST(LB),y=window.scrollY;
  if(t.dataset.linc){st.inc[t.dataset.linc]=t.checked;save();renderBuild(LB);window.scrollTo(0,y);}
  else if(t.dataset.lshow){st.show[t.dataset.lshow]=t.checked;save();renderBuild(LB);window.scrollTo(0,y);}
  else if(t.dataset.lmv){st.mv=st.mv||{};st.mv[t.dataset.lmv]=+t.value;save();renderBuild(LB);window.scrollTo(0,y);toast(+t.value?`Moved to after verse ${t.value}`:"Moved to the top of the section");}
  else if(t.id==="lk"){t.closest(".lform").querySelector(".lq").hidden=t.value!=="quote";}});
document.addEventListener("click",e=>{const b=e.target.closest("[data-ladd],[data-lsave],[data-lcancel],[data-ldel],[data-ledit],[data-lout]");if(!b||!LB)return;
  const d=b.dataset,st=LST(LB),y=window.scrollY;
  if(d.ladd!==undefined){LADD=+d.ladd;LEDIT=null;renderBuild(LB);window.scrollTo(0,y);const t=$("#lt");t&&t.focus({preventScroll:true});}
  else if("lcancel" in d){LADD=null;LEDIT=null;renderBuild(LB);window.scrollTo(0,y);}
  else if("lsave" in d){const f=b.closest(".lform"),t=$("#lt").value.trim();if(!t){$("#lt").focus();return;}
    const c={id:f.dataset.lid||"o"+Date.now(),at:+f.dataset.lat,k:$("#lk").value,t};if(c.k==="quote"){c.sp=$("#lsp").value.trim();c.src=$("#lsrc").value.trim();}
    const i=st.own.findIndex(x=>x.id===c.id);if(i>=0)st.own[i]=c;else st.own.push(c);st.inc[c.id]=true;save();LADD=null;LEDIT=null;renderBuild(LB);window.scrollTo(0,y);}
  else if(d.ldel){st.own=st.own.filter(x=>x.id!==d.ldel);delete st.inc[d.ldel];save();renderBuild(LB);window.scrollTo(0,y);}
  else if(d.ledit){const c=st.own.find(x=>x.id===d.ledit);if(c){LEDIT=c;LADD=c.at;renderBuild(LB);window.scrollTo(0,y);}}
  else if(d.lout)doOut(d.lout);});

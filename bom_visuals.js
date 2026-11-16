// Book of Mormon visual guides. Each opens from a tappable word or a button in the chapter.
// ---------- The allegory of the olive tree (Jacob 5) ----------
const OL_STEPS=[
 {t:"The tree begins to decay",r:"5:3–14",refs:["5:3","5:7","5:14"],
  what:"The master's tame olive tree grows old and begins to decay. He prunes and nourishes it, cuts off the dying main branches, grafts in branches from a wild olive tree, and hides young natural branches in the far corners of the vineyard.",
  means:"Zenos says the tree is the house of Israel (5:3). Israel falls into apostasy and is scattered among the nations, while people who were not of Israel, the Gentiles, are brought in.",
  main:{n:2,w:3,dead:2,fruit:""},small:["n","n","n","n"],sfruit:["","","",""],servants:1},
 {t:"First visit: good fruit",r:"5:15–28",refs:["5:17","5:20","5:25"],
  what:"After a long time, the grafted tree bears good fruit like the natural fruit. The hidden branches bear good fruit too, even in poor ground. The last one, planted in a good spot, is half good and half wild.",
  means:"Often understood as the time of Christ and His Apostles, when the gospel bore fruit among Gentiles and scattered Israel. The last branch in a choice land is commonly read as Lehi's family in the Americas, the Nephites and Lamanites.",
  main:{n:0,w:5,dead:0,fruit:"g"},small:["n","n","n","h"],sfruit:["g","g","g","h"],servants:1},
 {t:"Second visit: all corrupt",r:"5:29–49",refs:["5:32","5:39","5:41"],
  what:"Now every tree bears bad fruit. The wild branches have overrun the roots, and the good part of the last tree has withered away. The master weeps: “What could I have done more for my vineyard?”",
  means:"Often understood as the great apostasy after the early Church, and the destruction of the Nephites (Mormon 6).",
  main:{n:0,w:5,dead:0,fruit:"b"},small:["n","n","n","x"],sfruit:["b","b","b","b"],servants:1},
 {t:"The last labor",r:"5:50–76",refs:["5:52","5:61","5:70","5:73"],
  what:"The servant asks him to spare it a little longer. They graft the natural branches back into the mother tree, and the mother's branches into the scattered trees. The master calls a few more servants, and they labor with their might one last time. The bad is cleared away as the good grows, until the trees become “like unto one body” with natural fruit.",
  means:"The Restoration and the gathering of Israel in the last days. Jacob teaches that the Lord will “set his hand again the second time to recover his people” (Jacob 6:2). Nephi also taught that the natural branches would be grafted back in (1 Nephi 15:12–16).",
  main:{n:5,w:0,dead:0,fruit:"g"},small:["n","n","n","n"],sfruit:["g","g","g","g"],servants:4},
 {t:"The end",r:"5:77",refs:["5:77"],
  what:"For a long time the good fruit is laid up. When evil fruit comes again, the good and bad are gathered: the good preserved and the bad cast away. Then the vineyard is burned with fire.",
  means:"Often understood as the Millennium, the last gathering and judgment, and the end of the earth as it is now (Jacob 6:3).",
  main:{n:5,w:0,dead:0,fruit:"g"},small:["n","n","n","n"],sfruit:["g","g","g","g"],servants:4,fire:true}];
const OL_SYMS=[
 ["Tame olive tree","The house of Israel, the Lord's covenant people (5:3)."],
 ["Roots","The covenants and promises given to Israel's fathers, which keep the tree alive. The Lord keeps preserving them “for mine own purpose.”"],
 ["Natural branches","People of Israel. Some are hidden in other parts of the vineyard: scattered Israel."],
 ["Wild olive branches","Gentiles, people not born into Israel, grafted in to give the tree new life (see also Romans 11:17–24)."],
 ["Nethermost parts","Far corners of the vineyard: the places Israel was scattered."],
 ["The good spot of ground","A choice land where the last branch was planted. Commonly read as the Americas and Lehi's family."],
 ["Fruit","What people become and do. Good fruit is “the natural fruit,” “most precious above all other fruit” (5:61)."],
 ["Lord of the vineyard","The Lord, Jesus Christ. He works beside His servants and grieves to lose any tree."],
 ["Servants","Prophets and those called to labor with Him. In the last labor “they were few” (5:70)."],
 ["Pruning, digging, dunging","The Lord's care: correction, help and nourishment through prophets, scripture and trials."],
 ["Grafting","Joining a branch to a root. Gentiles joined to Israel, and scattered Israel gathered back to the covenant."],
 ["Fire","Judgment and the end of the wicked (5:77; Jacob 6:3)."]];
let OL_I=0;
function olTree(cx,base,s,st,small){
 const G="#5b7f35",W="#8f8576",D="#cbbfae",FG="#3f5f1d",FB="#9b3b2c",O=[];
 O.push(`<path d="M${cx} ${base} L${cx} ${base-60*s}" stroke="#6b4f33" stroke-width="${7*s}" stroke-linecap="round"/>`);
 O.push(`<path d="M${cx-18*s} ${base+2} Q${cx} ${base-8*s} ${cx+18*s} ${base+2}" stroke="#6b4f33" stroke-width="${3*s}" fill="none"/>`);
 let kinds=[];
 if(small){const k=st;kinds=k==="h"?["n","n","w"]:k==="x"?["dead","w","w"]:["n","n","n"];}
 else{for(let i=0;i<st.n;i++)kinds.push("n");for(let i=0;i<st.w;i++)kinds.push("w");kinds=kinds.slice(0,5);while(kinds.length<5)kinds.push("dead");if(st.dead){kinds[0]="dead";kinds[4]="dead";}}
 const nb=kinds.length,spread=small?70:80;
 kinds.forEach((k,i)=>{const a=(-spread/2+spread*(nb===1?0.5:i/(nb-1)))*Math.PI/180;const len=(small?38:52)*s;
  const x1=cx,y1=base-50*s-(i%2)*6*s,x2=cx+Math.sin(a)*len,y2=y1-Math.cos(a)*len;
  O.push(`<path d="M${x1} ${y1} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${k==="n"?G:k==="w"?W:D}" stroke-width="${(k==="dead"?3:5)*s}" stroke-linecap="round"${k==="dead"?' stroke-dasharray="4 4"':""}/>`);
  O.push(`<ellipse cx="${(x1*0.25+x2*0.75).toFixed(1)}" cy="${(y1*0.25+y2*0.75).toFixed(1)}" rx="${7*s}" ry="${3.5*s}" fill="${k==="n"?G:k==="w"?W:D}" opacity=".55" transform="rotate(${(a*180/Math.PI).toFixed(0)} ${(x1*0.25+x2*0.75).toFixed(1)} ${(y1*0.25+y2*0.75).toFixed(1)})"/>`);
  const fr=small?(st==="h"?(k==="n"?"g":"b"):null):st.fruit;const f2=small?arguments[5]:null;
  const fc=(small?f2:st.fruit);let col=null;
  if(k!=="dead"){if(fc==="g")col=FG;else if(fc==="b")col=FB;else if(fc==="h")col=k==="n"?FG:FB;}
  if(col)[0.55,0.85].forEach(t=>O.push(`<circle cx="${(x1+(x2-x1)*t).toFixed(1)}" cy="${(y1+(y2-y1)*t).toFixed(1)}" r="${3.6*s}" fill="${col}"/>`));});
 return O.join("");}
function olSVG(st){
 const w=340,h=230,O=[`<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:420px;display:block;margin:0 auto" role="img" aria-label="The vineyard at this stage">`];
 O.push(`<rect x="0" y="0" width="${w}" height="${h}" rx="12" fill="${st.fire?"#f6e0cf":"#eef0e3"}"/>`);
 O.push(`<rect x="0" y="182" width="${w}" height="48" rx="0" fill="#d9cfb4"/>`);
 O.push(olTree(170,182,1.15,st.main,false));
 [[40,198],[95,206],[245,206],[300,198]].forEach(([x,y],i)=>O.push(olTree(x,y,0.62,st.small[i],true,st.sfruit[i])));
 O.push(`<text x="170" y="222" text-anchor="middle" font-size="10" fill="#5a4e3a" font-family="sans-serif">mother tree</text>`);
 O.push(`<text x="40" y="226" text-anchor="middle" font-size="9" fill="#5a4e3a" font-family="sans-serif">1st</text><text x="95" y="226" text-anchor="middle" font-size="9" fill="#5a4e3a" font-family="sans-serif">2nd</text><text x="245" y="226" text-anchor="middle" font-size="9" fill="#5a4e3a" font-family="sans-serif">3rd</text><text x="300" y="226" text-anchor="middle" font-size="9" fill="#5a4e3a" font-family="sans-serif">last</text>`);
 for(let i=0;i<st.servants;i++){const x=250+i*18,y=40;O.push(`<circle cx="${x}" cy="${y}" r="5" fill="#0f2a47"/><path d="M${x-6} ${y+16} Q${x} ${y+2} ${x+6} ${y+16}" fill="#0f2a47"/>`);}
 O.push(`<circle cx="232" cy="38" r="6" fill="#b08a2e"/><path d="M225 56 Q232 40 239 56" fill="#b08a2e"/>`);
 if(st.fire)O.push(`<text x="20" y="34" font-size="22">🔥</text><text x="300" y="34" font-size="22">🔥</text>`);
 O.push(`</svg>`);return O.join("");}
const OL_KEY=`<div style="display:flex;flex-wrap:wrap;gap:10px 14px;font-size:12.5px;margin:8px 0 2px;color:var(--muted)">
 <span><span style="display:inline-block;width:14px;height:4px;background:#5b7f35;vertical-align:middle;border-radius:2px"></span> natural branch</span>
 <span><span style="display:inline-block;width:14px;height:4px;background:#8f8576;vertical-align:middle;border-radius:2px"></span> wild branch</span>
 <span><span style="display:inline-block;width:9px;height:9px;background:#3f5f1d;border-radius:50%;vertical-align:middle"></span> good fruit</span>
 <span><span style="display:inline-block;width:9px;height:9px;background:#9b3b2c;border-radius:50%;vertical-align:middle"></span> bad fruit</span>
 <span><span style="display:inline-block;width:9px;height:9px;background:#b08a2e;border-radius:50%;vertical-align:middle"></span> Lord of the vineyard</span>
 <span><span style="display:inline-block;width:9px;height:9px;background:#0f2a47;border-radius:50%;vertical-align:middle"></span> servants</span></div>`;
function olStage(){const s=OL_STEPS[OL_I];
 return `<div class="sec"><div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:4px">${OL_STEPS.map((x,i)=>`<button class="chip" data-olstep="${i}" aria-pressed="${i===OL_I}" style="${i===OL_I?"background:var(--navy,#0f2a47);color:#fff;border-color:transparent":""}">${i+1}</button>`).join("")}</div></div>
  <div class="sec">${olSVG(s)}${OL_KEY}</div>
  <div class="sec"><h3>${OL_I+1}. ${esc(s.t)} · Jacob ${s.r}</h3><p>${esc(s.what)}</p></div>
  <div class="sec"><h3>What it means</h3><p>${esc(s.means)}</p>
  <div class="row" style="margin-top:6px">${s.refs.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"jacob.${r}"}'>Jacob ${r}</button>`).join("")}</div>
  <div style="display:flex;justify-content:space-between;margin-top:12px"><button class="btn" data-olstep="${Math.max(0,OL_I-1)}" ${OL_I===0?"disabled":""}>‹ Back</button><button class="btn" data-olstep="${Math.min(OL_STEPS.length-1,OL_I+1)}" ${OL_I===OL_STEPS.length-1?"disabled":""}>Next ›</button></div></div>`;}
function olChart(){
 return `<div class="sec"><p>Jacob quotes the prophet Zenos, who compared the house of Israel to an olive tree in a vineyard. Step through what happens, then tap a symbol to see what it stands for.</p></div>
 <div id="olstage">${olStage()}</div>
 <div class="sec"><h3>The symbols</h3><div class="row">${OL_SYMS.map((x,i)=>`<button class="chip" data-olsym="${i}">${esc(x[0])}</button>`).join("")}</div><p id="olsym" class="lang-flag" style="display:none"></p>
 <p class="muted" style="font-size:12.5px;margin-top:10px">Zenos names the tree as Israel (5:3), and Jacob 6 explains the gathering and the end. The other meanings are the common interpretations taught in Church materials.</p></div>`;}
document.addEventListener("click",e=>{
 const st=e.target.closest("[data-olstep]");if(st){OL_I=+st.dataset.olstep;const el=document.getElementById("olstage");if(el)el.innerHTML=olStage();return;}
 const sy=e.target.closest("[data-olsym]");if(sy){const x=OL_SYMS[+sy.dataset.olsym],el=document.getElementById("olsym");if(el){el.style.display="block";el.innerHTML=`<b>${esc(x[0])}.</b> ${esc(x[1])}`;}
  document.querySelectorAll("[data-olsym]").forEach(b=>b.setAttribute("aria-pressed",String(b===sy)));return;}});
Object.assign(TERMS,{olivetree_j5:{name:"The allegory of the olive tree",forms:["tame olive tree","wild olive tree","olive tree","Lord of the vineyard"],books:["jacob"],only:["jacob.5","jacob.6"],more:[],resp:"",say:"",
 plain:"Zenos's allegory of the house of Israel as an olive tree that the Lord tends, scatters, grafts and gathers (Jacob 5).",bg:"Jacob quotes it to show that the Lord “remembereth the house of Israel, both roots and branches” (Jacob 6:4).",chart:olChart}});
Object.assign(INLINE_AT,{"jacob.5:3":()=>`<button class="lang-flag" data-term="olivetree_j5" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">🫒 <b>See the allegory step by step.</b> Tap to watch the vineyard change and see what each symbol means.</button>`});
// ---------- Lehi's family (1 Nephi 7, 16, 18; 2 Nephi 1–5; Jacob 1:13) ----------
const LF={
 lehi:{n:"Lehi",side:"p",term:"lehi",d:"A prophet in Jerusalem about 600 BC, descended from Joseph of Egypt through Manasseh (Alma 10:3). He led his family into the wilderness and, before he died, blessed each of his children and grandchildren (2 Nephi 1–4).",r:["1ne.1:5","2ne.4:12"]},
 sariah:{n:"Sariah",side:"p",term:"sariah",d:"Lehi's wife. When her sons came back safely with the plates she said, “Now I know of a surety that the Lord hath commanded my husband” (1 Nephi 5:8). She bore Jacob and Joseph in the wilderness.",r:["1ne.5:8","1ne.18:7"]},
 laman:{n:"Laman",side:"l",term:"laman",d:"Lehi's oldest son. He married a daughter of Ishmael and often rebelled. His descendants were the Lamanites. Lehi promised that if his grandchildren were cursed, the cursing would be answered upon their parents' heads (2 Nephi 4:6).",r:["1ne.2:5","2ne.4:6"]},
 lemuel:{n:"Lemuel",side:"l",term:"lemuel",d:"Lehi's second son. Lehi pleaded with him to be “like unto this valley, firm and steadfast” (1 Nephi 2:10). He married a daughter of Ishmael and followed Laman. His descendants were the Lemuelites.",r:["1ne.2:10","2ne.4:8"]},
 sam:{n:"Sam",side:"n",term:"sam",d:"Lehi's third son. He believed Nephi (1 Nephi 2:17) and married a daughter of Ishmael. Lehi blessed him: “thy seed shall be numbered with his seed” (2 Nephi 4:11), so there were no “Samites.”",r:["1ne.2:17","2ne.4:11"]},
 nephi:{n:"Nephi",side:"n",term:"nephi",d:"Lehi's fourth son, the record keeper and leader of those who believed. He married a daughter of Ishmael. His followers were called Nephites.",r:["1ne.1:1","1ne.16:7"]},
 jacob:{n:"Jacob",side:"n",d:"Born in the wilderness, Lehi's “first-born in the days of my tribulation” (2 Nephi 2:1). He was consecrated a priest and teacher and kept the small plates after Nephi. His descendants were the Jacobites.",r:["1ne.18:7","2ne.2:1"]},
 joseph:{n:"Joseph",side:"n",d:"Lehi's “last-born,” also born in the wilderness (2 Nephi 3:1). Lehi blessed him with the prophecies of Joseph of Egypt. His descendants were the Josephites.",r:["2ne.3:1","2ne.5:26"]},
 sisters:{n:"Daughters",side:"n",d:"Lehi also had daughters. Nephi says “my sisters” went with him when the family divided (2 Nephi 5:6). Their names and number are not given.",r:["2ne.5:6"]},
 ishmael:{n:"Ishmael",side:"p",term:"ishmael",d:"A man of Jerusalem whose whole family came into the wilderness with Lehi's (1 Nephi 7:2–5). He died and was buried at Nahom (1 Nephi 16:34).",r:["1ne.7:5","1ne.16:34"]},
 iwife:{n:"Ishmael's wife",side:"p",d:"Her name is not given. When Laman and Lemuel tied Nephi up to leave him in the wilderness, she was one of those who pleaded for his life (1 Nephi 7:19).",r:["1ne.7:19"]},
 isons:{n:"Two sons",side:"l",d:"Ishmael's two sons came with their own families. They joined Laman and Lemuel in rebelling (1 Nephi 7:6). Their descendants were the Ishmaelites.",r:["1ne.7:6"]},
 idau:{n:"Five daughters",side:"m",d:"Ishmael had five daughters: two joined Laman and Lemuel's rebellion and three stayed with Nephi (1 Nephi 7:6). They became the wives of Laman, Lemuel, Sam and Nephi, and the eldest married Zoram (1 Nephi 16:7).",r:["1ne.7:6","1ne.16:7"]},
 zoram:{n:"Zoram",side:"n",term:"zoram",d:"Laban's servant, who came with Nephi after Nephi swore to him that he would be free (1 Nephi 4:31–37). He married Ishmael's eldest daughter. Lehi called him “a true friend unto my son, Nephi, forever” (2 Nephi 1:30). His descendants were the Zoramites.",r:["1ne.4:35","2ne.1:30"]}};
const LF_PEOPLES=[["Nephites","n","nephi"],["Jacobites","n","jacob"],["Josephites","n","joseph"],["Zoramites","n","zoram"],["Lamanites","l","laman"],["Lemuelites","l","lemuel"],["Ishmaelites","l","isons"]];
function lfChip(k){const p=LF[k],c=p.side==="n"?"#2f5d8a":p.side==="l"?"#a4502f":p.side==="m"?"#7a5c8f":"#6b5a3a";
 return `<button data-lf="${k}" style="flex:1 1 auto;min-width:72px;padding:8px 10px;border-radius:10px;border:1.5px solid ${c};background:var(--paper);color:var(--ink);font:600 14px var(--sans);cursor:pointer;text-align:center">${esc(p.n)}</button>`;}
function lfGroup(title,ks,note){return `<div class="sec" data-lfgroup><h3>${title}</h3>${note?`<p class="muted" style="font-size:12.5px;margin:-2px 0 6px">${note}</p>`:""}<div style="display:flex;flex-wrap:wrap;gap:8px">${ks.map(lfChip).join("")}</div></div>`;}
function lfChart(){
 return `<div class="sec"><p>Who came with Lehi, who married whom, and which peoples came from them. Tap anyone.</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px 16px;font-size:12.5px;color:var(--muted)"><span><span style="display:inline-block;width:10px;height:10px;border:2px solid #2f5d8a;border-radius:3px"></span> went with Nephi</span><span><span style="display:inline-block;width:10px;height:10px;border:2px solid #a4502f;border-radius:3px"></span> went with Laman</span><span><span style="display:inline-block;width:10px;height:10px;border:2px solid #7a5c8f;border-radius:3px"></span> some each way</span></div></div>`+
  lfGroup("Lehi and Sariah",["lehi","sariah"])+
  lfGroup("Their children",["laman","lemuel","sam","nephi","jacob","joseph","sisters"],"Oldest to youngest. Jacob and Joseph were born in the wilderness.")+
  lfGroup("Ishmael's family",["ishmael","iwife","isons","idau"])+
  lfGroup("Laban's servant",["zoram"])+
  `<div class="sec"><h3>Who married whom</h3><div style="display:grid;grid-template-columns:auto 1fr;gap:6px 10px;font-size:14px">
   ${[["Laman","a daughter of Ishmael"],["Lemuel","a daughter of Ishmael"],["Sam","a daughter of Ishmael"],["Nephi","a daughter of Ishmael"],["Zoram","the eldest daughter of Ishmael"]].map(([a,b])=>`<b>${a}</b><span>⚭ ${b}</span>`).join("")}</div>
   <p class="muted" style="font-size:12.5px;margin-top:6px">1 Nephi 16:7. A later account (Erastus Snow, 1882) says Ishmael's sons had married Lehi's daughters; scripture does not say.</p></div>`+
  `<div class="sec"><h3>The seven peoples</h3><p class="muted" style="font-size:12.5px;margin:-2px 0 6px">Jacob 1:13; Mormon 1:8. Sam's children were counted with Nephi's.</p>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
   <div>${LF_PEOPLES.filter(x=>x[1]==="n").map(x=>`<button data-lf="${x[2]}" style="display:block;width:100%;margin-bottom:6px;padding:7px;border-radius:8px;border:0;background:#2f5d8a;color:#fff;font:600 13.5px var(--sans);cursor:pointer">${x[0]}</button>`).join("")}<p style="font-size:12.5px;text-align:center;margin:2px 0 0">“Nephites”</p></div>
   <div>${LF_PEOPLES.filter(x=>x[1]==="l").map(x=>`<button data-lf="${x[2]}" style="display:block;width:100%;margin-bottom:6px;padding:7px;border-radius:8px;border:0;background:#a4502f;color:#fff;font:600 13.5px var(--sans);cursor:pointer">${x[0]}</button>`).join("")}<p style="font-size:12.5px;text-align:center;margin:2px 0 0">“Lamanites”</p></div></div>
   <p style="font-size:13px;margin-top:8px">Over time the names became about belief more than birth: those friendly to Nephi were Nephites, and those who sought to destroy them were Lamanites (Jacob 1:14).</p></div>`;}
document.addEventListener("click",e=>{const b=e.target.closest("[data-lf]");if(!b)return;const p=LF[b.dataset.lf];if(!p)return;
 document.querySelectorAll(".lf-info").forEach(x=>x.remove());const g=b.closest("[data-lfgroup]")||b.closest(".sec");const el=document.createElement("div");el.className="lang-flag lf-info";el.style.margin="10px 0 0";
 el.innerHTML=`<b>${esc(p.n)}.</b> ${esc(p.d)}<div class="row" style="margin-top:6px">${p.r.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}${p.term&&TERMS[p.term]?`<button class="chip" data-term="${p.term}">More about ${esc(p.n)}</button>`:""}</div>`;
 g.appendChild(el);});
const LF_TAB={name:"Family",html:lfChart};
Object.assign(TERMS,{lehifamily:{name:"Lehi’s family",forms:[],books:["1ne"],more:[],resp:"",say:"",plain:"The families of Lehi, Ishmael and Zoram, and the peoples that came from them.",bg:"",chart:lfChart}});
["lehi","sariah","laman","lemuel","sam","nephi","zoram","ishmael"].forEach(k=>{if(TERMS[k])TERMS[k].tabX=LF_TAB;});
const LF_BAR=()=>`<button class="lang-flag" data-term="lehifamily" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">🌳 <b>Lehi’s family tree.</b> Tap to see who married whom and which peoples came from them.</button>`;
Object.assign(INLINE_AT,{"1ne.7:6":LF_BAR,"1ne.16:7":LF_BAR,"1ne.18:7":LF_BAR,"2ne.5:6":LF_BAR,"jacob.1:13":LF_BAR});

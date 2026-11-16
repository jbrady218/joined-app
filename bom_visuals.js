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
// ---------- How the plates fit together (1 Nephi 9; Words of Mormon; Mormon 6; Ether 1) ----------
const PL_REC={
 brass:{n:"Plates of brass",c:"#9a6a2a",d:"Laban's record, brought from Jerusalem: the five books of Moses, a history of the Jews down to Zedekiah, prophecies including Jeremiah's, and Lehi's genealogy (1 Nephi 5:10–16). It also held prophets not in our Bible, like Zenos (Jacob 5). It was not abridged as a book, but it is quoted throughout, especially Isaiah in 1 and 2 Nephi.",r:["1ne.5:11","mosiah.1:3"],books:["1ne","2ne","jacob"]},
 small:{n:"Small plates of Nephi",c:"#c08a1e",d:"Made about thirty years after leaving Jerusalem for “the ministry and the prophecies, the more plain and precious parts” (1 Nephi 19:3; 2 Nephi 5:30–31). Nephi passed them to Jacob, and they went from father to son until Amaleki, with no children, gave them to King Benjamin (Omni 1:25). Mormon included them whole, without abridging, “for a wise purpose” (Words of Mormon 1:6–7).",r:["1ne.9:3","2ne.5:30","omni.1:25","wom.1:7"],books:["1ne","2ne","jacob","enos","jarom","omni"]},
 large:{n:"Large plates of Nephi",c:"#2f5d8a",d:"The full history of the people: the reigns of kings, wars and contentions (1 Nephi 9:2–4; 19:1–4). Kings and then record keepers added to them for almost a thousand years. Mormon abridged them into the books of Mosiah through 4 Nephi.",r:["1ne.9:4","jacob.1:3"],books:["mosiah","alma","hel","3ne","4ne"]},
 mormon:{n:"Plates of Mormon",c:"#14365c",d:"The gold plates Mormon made for his abridgment, about AD 385, adding his own account of the Nephites' last wars (Mormon 1–7) and a note explaining the small plates (Words of Mormon). Before the last battle he hid the other records in the hill Cumorah and gave these to his son Moroni (Mormon 6:6).",r:["wom.1:3"],books:["wom","mosiah","alma","hel","3ne","4ne","mormon"]},
 ether:{n:"Plates of Ether",c:"#6c4f8f",d:"Twenty-four gold plates found by King Limhi's people among the ruins of the Jaredites (Mosiah 8:8–9). King Mosiah translated them (Mosiah 28:11–19), and Moroni later abridged them as the book of Ether.",r:["mosiah.8:9","mosiah.28:11"],books:["ether"]},
 moroni:{n:"Moroni's writing",c:"#3e7a52",d:"Moroni finished his father's record (Mormon 8–9), abridged the Jaredite record (Ether), wrote his own book (Moroni) and, by Joseph Smith's account, the title page. His last words were written about AD 421 (Moroni 10:1).",r:[],books:["mormon","ether","moroni"]}};
const PL_BOOKS=[
 ["1ne","1 Nephi",["small"],"Nephi's small plates, about 600–570 BC. Includes Isaiah 48–49 from the plates of brass."],
 ["2ne","2 Nephi",["small"],"Nephi's small plates. Includes Isaiah 2–14 and 29 from the plates of brass."],
 ["jacob","Jacob",["small"],"Jacob, Nephi's brother, on the small plates. Includes Zenos's allegory from the plates of brass."],
 ["enos","Enos",["small"],"Jacob's son, on the small plates."],
 ["jarom","Jarom",["small"],"Enos's son, on the small plates."],
 ["omni","Omni",["small"],"Five keepers in one short book, ending with Amaleki giving the plates to King Benjamin, about 130 BC."],
 ["wom","Words of Mormon",["mormon"],"Mormon's own note, about AD 385, explaining why he added the small plates. It bridges Omni and Mosiah."],
 ["mosiah","Mosiah",["large"],"Mormon's abridgment of the large plates, from King Benjamin on."],
 ["alma","Alma",["large"],"Mormon's abridgment of the large plates."],
 ["hel","Helaman",["large"],"Mormon's abridgment of the large plates."],
 ["3ne","3 Nephi",["large"],"Mormon's abridgment of the large plates, including Christ's visit."],
 ["4ne","4 Nephi",["large"],"Mormon's abridgment of nearly three hundred years of the large plates."],
 ["mormon","Mormon",["mormon","moroni"],"Chapters 1–7 are Mormon's own account. Chapters 8–9 were written by his son Moroni."],
 ["ether","Ether",["ether"],"Moroni's abridgment of the twenty-four Jaredite plates."],
 ["moroni","Moroni",["moroni"],"Moroni's own book, written while he wandered alone."]];
let PL_SEL=null;
function plRender(){
 const sel=PL_SEL&&PL_SEL.t==="rec"?PL_REC[PL_SEL.k]:null;
 const recBtn=k=>{const r=PL_REC[k],on=PL_SEL&&PL_SEL.t==="rec"&&PL_SEL.k===k;return `<button data-plrec="${k}" style="padding:8px 10px;border-radius:10px;border:2px solid ${r.c};background:${on?r.c:"var(--paper)"};color:${on?"#fff":"var(--ink)"};font:600 13.5px var(--sans);cursor:pointer;text-align:left">${esc(r.n)}</button>`;};
 const bookRow=([k,n,src,d])=>{const hi=!PL_SEL||(PL_SEL.t==="rec"&&PL_REC[PL_SEL.k].books.includes(k))||(PL_SEL.t==="book"&&PL_SEL.k===k);
  const bar=src.map(s=>`<span style="flex:1;background:${PL_REC[s].c}"></span>`).join("");
  const open=PL_SEL&&PL_SEL.t==="book"&&PL_SEL.k===k;
  return `<button data-plbook="${k}" style="display:flex;align-items:center;gap:10px;width:100%;padding:7px 0;border:0;background:none;cursor:pointer;color:var(--ink);opacity:${hi?1:.3};text-align:left"><span style="display:flex;width:8px;height:26px;border-radius:4px;overflow:hidden;flex-direction:column">${bar}</span><span style="font:600 15px var(--serif,Georgia)">${esc(n)}</span></button>`+
   (open?`<div class="lang-flag" style="margin:2px 0 8px"><b>${esc(n)}.</b> ${esc(d)}${BOOKS[k]?`<div class="row" style="margin-top:6px"><a class="chip" href="#${k}-1">Read ${esc(n)}</a></div>`:""}</div>`:"");};
 let info="";
 if(sel)info=`<div class="lang-flag" style="margin:10px 0 0"><b>${esc(sel.n)}.</b> ${esc(sel.d)}${sel.r.length?`<div class="row" style="margin-top:6px">${sel.r.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}</div>`:""}</div>`;
 
 return `<div class="sec"><h3>The records</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${Object.keys(PL_REC).map(recBtn).join("")}</div>${info}</div>
 <div class="sec"><h3>The books we have</h3><p class="muted" style="font-size:12.5px;margin:-2px 0 4px">The color shows which record each book comes from.${PL_SEL?` <button class="linkbtn" data-plclear style="font-size:12.5px">Show all</button>`:""}</p>${PL_BOOKS.map(bookRow).join("")}</div>`;}
function plChart(){
 return `<div class="sec"><p>The Book of Mormon was put together from several sets of plates. Tap a record to see which books came from it, or tap a book to see where it came from.</p></div>
 <div id="plwrap">${plRender()}</div>
 <div class="sec"><h3>What we don't have</h3>
  <p><b>The book of Lehi.</b> Mormon's abridgment of the large plates from Lehi to King Benjamin. Joseph Smith translated it first, but the 116 manuscript pages were lost in 1828. The Lord had Joseph translate the small plates instead, which cover the same period (D&C 10:38–45).</p>
  <p><b>The sealed portion.</b> Part of the plates was sealed and not translated. It holds the brother of Jared's great vision (Ether 4:4–7; 2 Nephi 27:7–11).</p>
  <p><b>The rest of the large plates</b> and the other records Mormon hid in the hill Cumorah (Mormon 6:6).</p></div>
 <div class="sec"><button class="lang-flag" data-term="keeperschart" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">🔗 <b>Who kept the records.</b> Follow the plates from Nephi to Moroni.</button></div>
 <div class="sec"><h3>To Joseph Smith</h3><p>Moroni buried the plates of Mormon. On September 22, 1827, he delivered them to Joseph Smith, who translated them by the gift and power of God. The Book of Mormon was published in March 1830.</p></div>`;}
document.addEventListener("click",e=>{
 const r=e.target.closest("[data-plrec]"),b=e.target.closest("[data-plbook]"),c=e.target.closest("[data-plclear]");
 if(!r&&!b&&!c)return;const k=r?r.dataset.plrec:b?b.dataset.plbook:null;
 PL_SEL=c?null:(r?(PL_SEL&&PL_SEL.t==="rec"&&PL_SEL.k===k?null:{t:"rec",k}):(PL_SEL&&PL_SEL.t==="book"&&PL_SEL.k===k?null:{t:"book",k}));
 const w=document.getElementById("plwrap");if(w)w.innerHTML=plRender();});
Object.assign(TERMS,{plateschart:{name:"How the plates fit together",forms:[],books:["1ne"],more:[],resp:"",say:"",plain:"The sets of plates behind the Book of Mormon, and which books come from each.",bg:"",chart:plChart}});
const PL_TAB={name:"The plates",html:()=>{PL_SEL=null;return plChart();}};
["brassplates","plates"].forEach(k=>{if(TERMS[k])TERMS[k].tabX=PL_TAB;});
const PL_BAR=()=>`<button class="lang-flag" data-term="plateschart" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">📜 <b>How the plates fit together.</b> Tap to see each record and which books came from it.</button>`;
Object.assign(INLINE_AT,{"1ne.9:2":PL_BAR,"1ne.19:1":PL_BAR,"2ne.5:30":PL_BAR,"jacob.1:1":PL_BAR,"omni.1:25":PL_BAR,"wom.1:3":PL_BAR,"mosiah.1:3":PL_BAR,"mosiah.28:11":PL_BAR});
// ---------- Who kept the records (Nephi to Moroni) ----------
const RK={
 nephi:{n:"Nephi",rel:"",term:"nephi",d:"Made both the large and small plates. About 55 years after Lehi left Jerusalem he gave the small plates to his brother Jacob, and the large plates went to the kings who followed him.",r:["1ne.9:2","jacob.1:1"]},
 jacob:{n:"Jacob",rel:"Nephi's brother",d:"Wrote the ministry he was called to and Zenos's allegory, then gave the plates to his son Enos (Jacob 7:27).",r:["jacob.1:2","jacob.7:27"]},
 enos:{n:"Enos",rel:"son",d:"Wrote of praying all day and into the night until his sins were forgiven (Enos 1:4–8).",r:["enos.1:4"]},
 jarom:{n:"Jarom",rel:"son",d:"Wrote a short record “that our genealogy may be kept,” then delivered the plates to his son Omni (Jarom 1:1, 15).",r:["jarom.1:1","jarom.1:15"]},
 omni:{n:"Omni",rel:"son",d:"A soldier who admitted, “I of myself am a wicked man” (Omni 1:2). After about 282 years from Lehi, he gave the plates to his son Amaron.",r:["omni.1:2","omni.1:3"]},
 amaron:{n:"Amaron",rel:"son",d:"Recorded the destruction of the more wicked Nephites, then gave the plates to his brother Chemish (Omni 1:4–8).",r:["omni.1:5","omni.1:8"]},
 chemish:{n:"Chemish",rel:"brother",d:"Wrote a single verse, in the same book as his brother (Omni 1:9).",r:["omni.1:9"]},
 abinadom:{n:"Abinadom",rel:"son",d:"Saw much war. He said, “I know of no revelation save that which has been written” (Omni 1:10–11).",r:["omni.1:11"]},
 amaleki:{n:"Amaleki",rel:"son",d:"Told how the first Mosiah led the righteous to Zarahemla. Having no children, he gave the small plates to King Benjamin (Omni 1:12–25).",r:["omni.1:12","omni.1:25"]},
 kings:{n:"Nephite kings",rel:"",d:"The large plates were kept by the kings, generation after generation (Jarom 1:14; Omni 1:11). Their names are mostly not given until the first Mosiah, who led his people to Zarahemla.",r:["omni.1:11"]},
 benjamin:{n:"King Benjamin",rel:"",d:"Now held both sets of plates, with the plates of brass. He gave them all to his son Mosiah, with the sword of Laban and the Liahona (Mosiah 1:16).",r:["mosiah.1:16"]},
 mosiah:{n:"King Mosiah",rel:"son",term:"mosiah_k",d:"Translated the Jaredite plates. Before he died he gave all the records and the interpreters to Alma the Younger (Mosiah 28:11–20).",r:["mosiah.28:20"]},
 alma:{n:"Alma the Younger",rel:"(not related)",term:"alma2",d:"Kept the records as high priest, then entrusted them to his son Helaman (Alma 37:1).",r:["alma.37:1"]},
 helaman:{n:"Helaman",rel:"son",term:"helaman",d:"Kept the records through the war years. When he died, his brother Shiblon took them (Alma 63:1).",r:["alma.63:1"]},
 shiblon:{n:"Shiblon",rel:"brother",term:"shiblon",d:"Kept the records a few years and gave them to Helaman's son, also named Helaman (Alma 63:11).",r:["alma.63:11"]},
 helaman2:{n:"Helaman",rel:"nephew",term:"helaman_son",d:"Helaman's son, chief judge. The book of Helaman is named for him. His eldest son Nephi followed him (Helaman 3:37).",r:["alma.63:13"]},
 nephi2:{n:"Nephi",rel:"son",d:"Son of Helaman, who gave up the judgment-seat to preach and was given the sealing power (Helaman 5; 10). Before he departed he gave the records to his eldest son, Nephi (3 Nephi 1:2).",r:[]},
 nephi3:{n:"Nephi",rel:"son",d:"Saw the sign of Christ's birth and was one of the twelve disciples the risen Christ chose (3 Nephi 1; 11:18–22; 19:4). The book of 3 Nephi is his record.",r:[]},
 nephi4:{n:"Nephi",rel:"son",d:"Kept the record during the years of peace after Christ's visit. The book of 4 Nephi is named for him (4 Nephi 1:19).",r:[]},
 amos:{n:"Amos",rel:"son",d:"Kept the record 84 years (4 Nephi 1:19–20).",r:[]},
 amos2:{n:"Amos",rel:"son",d:"Kept the record as wickedness returned (4 Nephi 1:21–47).",r:[]},
 ammaron:{n:"Ammaron",rel:"brother",d:"About AD 320, moved by the Holy Ghost, he hid all the sacred records. He told ten-year-old Mormon where to find them when he was about 24 (4 Nephi 1:48–49; Mormon 1:2–4).",r:[]},
 mormon:{n:"Mormon",rel:"(chosen by Ammaron)",d:"Prophet and general. He made his abridgment on the plates of Mormon, hid the other records in the hill Cumorah, and gave his plates to his son Moroni (Mormon 6:6).",r:[]},
 moroni:{n:"Moroni",rel:"son",d:"Finished his father's record, abridged Ether, wrote his own book and buried the plates, about AD 421 (Mormon 8:1; Moroni 10:1).",r:[]},
 joseph:{n:"Joseph Smith",rel:"",d:"On September 22, 1827, the resurrected Moroni delivered the plates to Joseph Smith, who translated them by the gift and power of God.",r:[]}};
const rkCol={small:"#c08a1e",large:"#2f5d8a",both:"#14365c",end:"#3e7a52"};
function rkNode(k,col){const p=RK[k];return `${p.rel?`<div style="text-align:center;font-size:11.5px;color:var(--muted);line-height:1.2;margin:1px 0">↓ ${esc(p.rel)}</div>`:""}<button data-rk="${k}" style="display:block;width:100%;padding:7px 8px;border-radius:9px;border:2px solid ${col};background:var(--paper);color:var(--ink);font:600 13.5px var(--sans);cursor:pointer">${esc(p.n)}</button>`;}
function rkChart(){
 const small=["jacob","enos","jarom","omni","amaron","chemish","abinadom","amaleki"],after=["mosiah","alma","helaman","shiblon","helaman2","nephi2","nephi3","nephi4","amos","amos2","ammaron","mormon","moroni"];
 return `<div class="sec"><p>The plates passed from hand to hand for about a thousand years. Tap anyone to see what they did.</p>
 <div style="display:flex;flex-wrap:wrap;gap:8px 14px;font-size:12.5px;color:var(--muted)"><span><span style="display:inline-block;width:10px;height:10px;border:2px solid ${rkCol.small};border-radius:3px"></span> small plates</span><span><span style="display:inline-block;width:10px;height:10px;border:2px solid ${rkCol.large};border-radius:3px"></span> large plates</span><span><span style="display:inline-block;width:10px;height:10px;border:2px solid ${rkCol.both};border-radius:3px"></span> all the records</span></div></div>
 <div class="sec" id="rkwrap">
  <div style="max-width:240px;margin:0 auto">${rkNode("nephi",rkCol.both)}</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px">
   <div>${small.map(k=>rkNode(k,rkCol.small)).join("")}</div>
   <div><div style="text-align:center;font-size:11.5px;color:var(--muted);margin:1px 0">↓</div>${rkNode("kings",rkCol.large)}<div style="font-size:12px;color:var(--muted);text-align:center;padding:10px 4px">Kept by the kings for about 470 years</div></div></div>
  <div style="text-align:center;font-size:11.5px;color:var(--muted);margin:4px 0">↓ both sets join</div>
  <div style="max-width:240px;margin:0 auto">${rkNode("benjamin",rkCol.both)}${after.map(k=>rkNode(k,rkCol.both)).join("")}<div style="text-align:center;font-size:11.5px;color:var(--muted);margin:1px 0">↓ about 1,400 years later</div>${rkNode("joseph",rkCol.end)}</div></div>`;}
document.addEventListener("click",e=>{const b=e.target.closest("[data-rk]");if(!b)return;const p=RK[b.dataset.rk];
 const was=b.nextElementSibling&&b.nextElementSibling.classList.contains("rk-info");document.querySelectorAll(".rk-info").forEach(x=>x.remove());if(was)return;
 const el=document.createElement("div");el.className="lang-flag rk-info";el.style.margin="4px 0 6px";el.style.textAlign="left";
 el.innerHTML=`${esc(p.d)}${p.r.length||(p.term&&TERMS[p.term])?`<div class="row" style="margin-top:6px">${p.r.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}${p.term&&TERMS[p.term]?`<button class="chip" data-term="${p.term}">More about ${esc(p.n)}</button>`:""}</div>`:""}`;
 b.after(el);});
Object.assign(TERMS,{keeperschart:{name:"Who kept the records",forms:[],books:["omni"],more:[],resp:"",say:"",plain:"The chain of record keepers from Nephi to Moroni.",bg:"",chart:rkChart}});
const RK_BAR=()=>`<button class="lang-flag" data-term="keeperschart" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">🔗 <b>Who kept the records.</b> Tap to follow the plates from Nephi to Moroni.</button>`;
Object.assign(INLINE_AT,{"jacob.7:27":RK_BAR,"enos.1:1":RK_BAR,"jarom.1:1":RK_BAR,"omni.1:1":RK_BAR,"wom.1:1":RK_BAR,"mosiah.28:20":RK_BAR,"alma.37:1":RK_BAR,"alma.63:1":RK_BAR});
// ---------- The Mosiah flashbacks (Mosiah 7–25) ----------
const MF_LANES={z:["Zarahemla","#2f5d8a"],n:["Zeniff, Noah and Limhi","#a4502f"],a:["Alma's people","#3e7a52"]};
const MF=[
 {k:"benjamin",ch:"1–6",bo:1,yr:124,date:"about 124 BC",lane:"z",t:"King Benjamin's address",d:"In Zarahemla, King Benjamin gives his great sermon and makes his son Mosiah king.",r:["mosiah.2:17","mosiah.6:3"]},
 {k:"ammon",ch:"7–8",bo:2,yr:121,date:"about 121 BC",lane:"z",t:"Ammon finds King Limhi",d:"After three years of peace, King Mosiah lets sixteen strong men, led by a man named Ammon, search for the group that went back to the land of Nephi long before. They find King Limhi and his people in bondage. Limhi tells their story and shows the 24 gold plates his searchers found.",r:["mosiah.7:1","mosiah.7:2","mosiah.8:9"]},
 {k:"zeniff",jump:"about 80 years",ch:"9–10",bo:3,yr:200,date:"about 200 BC",lane:"n",t:"Zeniff goes back",d:"Here the book jumps back about 80 years, to the record of Zeniff. Over-zealous to inherit the land of their fathers, Zeniff leads a group from Zarahemla back to the land of Nephi. The Lamanite king lets them settle, planning to bring them into bondage.",r:["mosiah.9:1","mosiah.9:3"]},
 {k:"noah",ch:"11–17",bo:4,yr:160,date:"about 160–148 BC",lane:"n",t:"King Noah and Abinadi",d:"Zeniff's son Noah rules in wickedness, supported by heavy taxes and corrupt priests. The prophet Abinadi calls them to repent and is burned to death. One priest, Alma, believes him.",r:["mosiah.11:2","mosiah.17:2"]},
 {k:"mormon",ch:"18",bo:5,yr:147,date:"about 147 BC",lane:"a",t:"The waters of Mormon",d:"Alma teaches in secret and baptizes about 204 people at the waters of Mormon, then about 450 flee from Noah's army into the wilderness.",r:["mosiah.18:16","mosiah.18:35"]},
 {k:"fall",ch:"19–20",bo:6,yr:145.5,date:"about 145 BC",lane:"n",t:"Noah falls, Limhi rules",d:"The Lamanites attack. Noah flees, and his own men put him to death by fire. His son Limhi becomes king under Lamanite rule. Noah's priests hide in the wilderness and kidnap 24 Lamanite daughters, starting a war.",r:["mosiah.19:20","mosiah.20:5"]},
 {k:"limhi",ch:"21–22",bo:7,yr:144.8,date:"about 145–121 BC",lane:"n",t:"Limhi's bondage and escape",d:"Limhi's people suffer heavy bondage. Searchers sent to find Zarahemla find a land covered with bones instead. Then Ammon arrives, which is where Mosiah 7 left off. Following Gideon's plan, they pay the guards a last tribute of wine and slip away while they sleep, and reach Zarahemla.",r:["mosiah.21:25","mosiah.22:7","mosiah.22:13"]},
 {k:"helam",jump:"about 25 years, to Alma’s people",ch:"23–24",bo:8,yr:145,date:"about 145–120 BC",lane:"a",t:"Alma's people in Helam",d:"The book jumps back again, to Alma's people. They build the city of Helam, but Lamanites and Amulon, one of Noah's old priests, put them in bondage. The Lord makes their burdens light, then leads them away while their guards sleep, to Zarahemla.",r:["mosiah.23:19","mosiah.24:15","mosiah.24:21"]},
 {k:"reunion",ch:"25",bo:9,yr:120,date:"about 120 BC",lane:"z",t:"Everyone together",d:"All three groups are now in Zarahemla. King Mosiah reads the records of Zeniff and of Alma to the people, which is how chapters 9–24 came to be in his record. Alma baptizes Limhi and his people and organizes the Church.",r:["mosiah.25:5","mosiah.25:6","mosiah.25:18"]},
 {k:"after",ch:"26–29",bo:10,yr:119,date:"about 120–91 BC",lane:"z",t:"A new generation",d:"Alma's son and the sons of Mosiah fight the Church until an angel stops them. The sons of Mosiah leave to preach to the Lamanites, and the people choose judges instead of kings.",r:["mosiah.27:11","mosiah.29:44"]}];
let MF_MODE="book";
function mfList(){
 const list=MF.slice().sort(MF_MODE==="book"?(a,b)=>a.bo-b.bo:(a,b)=>a.yr<b.yr?1:a.yr>b.yr?-1:a.bo-b.bo);
 let out="",prev=null;
 list.forEach(e=>{const L=MF_LANES[e.lane];
  if(MF_MODE==="book"&&e.jump)out+=`<div style="margin:2px 0 6px 18px;font:600 12px var(--sans);color:#a4502f">↩ The book jumps back ${e.jump}</div>`;
  out+=`<button data-mf="${e.k}" style="display:flex;gap:10px;align-items:stretch;width:100%;padding:0;margin:0 0 6px;border:0;background:none;cursor:pointer;text-align:left;color:var(--ink)">
   <span style="width:6px;border-radius:3px;background:${L[1]}"></span>
   <span style="flex:1;padding:6px 0"><span style="display:block;font:600 12px var(--sans);color:var(--muted)">Mosiah ${e.ch} · ${e.date}</span><span style="display:block;font:600 15.5px var(--serif,Georgia)">${esc(e.t)}</span></span></button>`;
  prev=e;});
 return out;}
function mfChart(){
 return `<div class="sec"><p>Mosiah tells three groups' stories, and it doesn't tell them in order. Chapters 9–24 are older records that Limhi and Alma brought to Zarahemla. Switch between the order in the book and the order things happened, and tap any event.</p>
  <div style="display:flex;flex-wrap:wrap;gap:8px 14px;font-size:12.5px;color:var(--muted);margin-top:6px">${Object.values(MF_LANES).map(([n,c])=>`<span><span style="display:inline-block;width:10px;height:10px;background:${c};border-radius:3px"></span> ${n}</span>`).join("")}</div></div>
  <div class="sec"><div class="seg" role="group" style="display:inline-flex"><button data-mfmode="book" aria-pressed="${MF_MODE==="book"}">Order in the book</button><button data-mfmode="time" aria-pressed="${MF_MODE==="time"}">Order it happened</button></div>
  <div id="mflist" style="margin-top:12px">${mfList()}</div>
  <p class="muted" style="font-size:12.5px">Dates are approximate, following the dates in the Church's edition of the Book of Mormon.</p></div>`;}
document.addEventListener("click",e=>{
 const m=e.target.closest("[data-mfmode]");if(m){MF_MODE=m.dataset.mfmode;document.querySelectorAll("[data-mfmode]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mfmode===MF_MODE)));const l=document.getElementById("mflist");if(l)l.innerHTML=mfList();return;}
 const b=e.target.closest("[data-mf]");if(!b)return;const ev=MF.find(x=>x.k===b.dataset.mf);
 const was=b.nextElementSibling&&b.nextElementSibling.classList.contains("mf-info");document.querySelectorAll(".mf-info").forEach(x=>x.remove());if(was)return;
 const el=document.createElement("div");el.className="lang-flag mf-info";el.style.margin="0 0 10px 16px";
 el.innerHTML=`${esc(ev.d)}<div class="row" style="margin-top:6px">${ev.r.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}</div>`;b.after(el);});
Object.assign(TERMS,{mosiahflash:{name:"The Mosiah timeline",forms:[],books:["mosiah"],more:[],resp:"",say:"",plain:"How the stories in Mosiah 7–25 fit together in time.",bg:"",chart:mfChart}});
const MF_BAR=()=>`<button class="lang-flag" data-term="mosiahflash" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">🕰️ <b>The Mosiah timeline.</b> Mosiah jumps back in time. Tap to see the stories in order.</button>`;
Object.assign(INLINE_AT,{"mosiah.7:1":MF_BAR,"mosiah.9:1":MF_BAR,"mosiah.18:1":MF_BAR,"mosiah.21:1":MF_BAR,"mosiah.23:1":MF_BAR,"mosiah.25:1":MF_BAR});
// ---------- Kings and judges ----------
const KJ=[
 {s:"Kings",items:[
  {k:"nephi",n:"Nephi",y:"about 588–545 BC",end:"",term:"nephi",d:"The people wanted Nephi as their king. He did not want them to have a king, but he “did for them according to that which was in my power” (2 Nephi 5:18). He was a king in all but name to them.",r:["2ne.5:18"]},
  {k:"nephis",n:"“Second Nephi, third Nephi…”",y:"about 545–200 BC",end:"",d:"Before he died, Nephi anointed a king. To honor him, the people called each king after him: second Nephi, third Nephi, and so on. Their own names are not given (Jacob 1:9–11).",r:["jacob.1:9","jacob.1:11"]},
  {k:"mosiah1",n:"Mosiah",y:"date not given",end:"",d:"Warned by the Lord, he led the righteous out of the land of Nephi to Zarahemla. The people there joined his, and he became king over both (Omni 1:12–19).",r:["omni.1:12","omni.1:19"]},
  {k:"benjamin",n:"Benjamin",y:"until about 124 BC",end:"",d:"Mosiah's son. A holy man who fought off the Lamanites, worked with his own hands and established peace, then gave his great address before passing the kingdom to his son (Words of Mormon 1:13–18; Mosiah 2–6).",r:["wom.1:13","mosiah.2:14","mosiah.6:3"]},
  {k:"mosiah2",n:"Mosiah",y:"124–91 BC",end:"",term:"mosiah_k",d:"Benjamin's son, the last king. When his sons refused the kingdom, he warned of what a wicked king could do and had the people choose judges by their own voice. He died in the 33rd year of his reign, 509 years after Lehi left Jerusalem (Mosiah 29).",r:["mosiah.29:16","mosiah.29:25","mosiah.29:46"]}]},
 {s:"Chief judges",note:"The reign of the judges began in 91 BC. Book of Mormon years after this are counted from it.",items:[
  {k:"alma",n:"Alma the Younger",y:"91–83 BC",end:"resigned",term:"alma2",d:"The first chief judge, and also high priest. In the ninth year he gave up the judgment-seat to preach full-time (Mosiah 29:42; Alma 4:20).",r:["mosiah.29:42","alma.4:20"]},
  {k:"nephihah",n:"Nephihah",y:"83–68 BC",end:"died",term:"nephihah_j",d:"Chosen by Alma and the voice of the people. He “filled the judgment-seat with perfect uprightness before God” (Alma 50:37).",r:["alma.4:17","alma.50:37"]},
  {k:"pahoran",n:"Pahoran",y:"68–52 BC",end:"died",term:"pahoran",d:"Nephihah's son. He held to the law against the king-men and answered Moroni's angry letter with meekness (Alma 51; 61).",r:["alma.50:39","alma.61:9"]},
  {k:"pahoran2",n:"Pahoran",y:"52 BC",end:"murdered",d:"Pahoran's son, chosen over his brothers Paanchi and Pacumeni. Kishkumen murdered him on the judgment-seat. Kishkumen’s secret band was soon led by a man named Gadianton (Helaman 1:1–12; 2:4).",r:[]},
  {k:"pacumeni",n:"Pacumeni",y:"52–51 BC",end:"killed",d:"Pahoran's brother. He was killed when the Lamanite commander Coriantumr captured Zarahemla (Helaman 1:13–21).",r:[]},
  {k:"helaman",n:"Helaman",y:"50–39 BC",end:"died",term:"helaman_son",d:"Son of Helaman, keeper of the records. A plot to kill him was stopped by his servant, and Gadianton's band fled (Helaman 2).",r:["alma.63:11"]},
  {k:"nephi",n:"Nephi",y:"39–30 BC",end:"resigned",d:"Helaman's son. Like Alma, he gave up the judgment-seat to preach, with his brother Lehi (Helaman 5:1–4).",r:[]},
  {k:"cezoram",n:"Cezoram",y:"30–26 BC",end:"murdered",d:"Murdered “by an unknown hand” on the judgment-seat (Helaman 6:15).",r:[]},
  {k:"cezoram2",n:"Cezoram's son",y:"26 BC",end:"murdered",d:"Appointed in his father's place and murdered the same year (Helaman 6:15).",r:[]},
  {k:"seezoram",n:"Seezoram",y:"about 23 BC",end:"murdered",d:"Stabbed by his brother Seantum. Nephi revealed the murder and the murderer by the spirit of prophecy (Helaman 8:27; 9).",r:[]},
  {k:"lachoneus",n:"Lachoneus",y:"about 1 BC–AD 26",end:"",d:"Chief judge and governor when the sign of Christ's birth was given. He gathered the people into one place to withstand the Gadianton robbers (3 Nephi 1:1; 3).",r:[]},
  {k:"lachoneus2",n:"Lachoneus",y:"about AD 26–30",end:"murdered",d:"His son. In the thirtieth year after the sign, the chief judge was murdered (3 Nephi 6:19; 7:1).",r:[]}]},
 {s:"The government falls",items:[
  {k:"tribes",n:"Tribes",y:"AD 30",end:"",d:"After the chief judge was murdered, the people split into tribes by family and friends, and the government was destroyed. A secret combination made a man named Jacob their king (3 Nephi 7:1–12). The great destruction came about four years later, and then Christ appeared (3 Nephi 8–11).",r:[]}]}];
const KJ_END={died:["#6b5a3a","died in office"],resigned:["#3e7a52","gave up the seat to preach"],murdered:["#a4302f","murdered"],killed:["#a4302f","killed in war"]};
function kjChart(){
 const all=[].concat(...KJ.map(g=>g.items));
 return `<div class="sec"><p>The Nephites were ruled first by kings, then by judges chosen by the voice of the people. Tap anyone.</p>
 <div style="display:flex;flex-wrap:wrap;gap:8px 14px;font-size:12.5px;color:var(--muted)">${Object.values(KJ_END).filter((x,i,a)=>a.findIndex(y=>y[1]===x[1])===i).map(([c,t])=>`<span><span style="display:inline-block;width:10px;height:10px;background:${c};border-radius:50%"></span> ${t}</span>`).join("")}</div></div>`+
 KJ.map(g=>`<div class="sec"><h3>${g.s}</h3>${g.note?`<p class="muted" style="font-size:12.5px;margin:-2px 0 6px">${g.note}</p>`:""}
  <div style="border-left:3px solid var(--line);margin-left:6px;padding-left:12px">${g.items.map(x=>{const E=KJ_END[x.end];return `<button data-kj="${g.s}|${x.k}" style="position:relative;display:block;width:100%;padding:6px 0;border:0;background:none;cursor:pointer;text-align:left;color:var(--ink)">
   <span style="position:absolute;left:-19px;top:13px;width:11px;height:11px;border-radius:50%;background:${E?E[0]:"var(--gold,#b08a2e)"};border:2px solid var(--paper)"></span>
   <span style="display:block;font:600 12px var(--sans);color:var(--muted)">${esc(x.y)}${E?` · ${E[1]}`:""}</span><span style="display:block;font:600 15.5px var(--serif,Georgia)">${esc(x.n)}</span></button>`;}).join("")}</div></div>`).join("")+
 `<div class="sec"><p class="muted" style="font-size:12.5px">In the land of Nephi, Zeniff's colony had its own kings: Zeniff, Noah and Limhi (Mosiah 9–22). Dates are approximate, following the Church's edition.</p></div>`;}
document.addEventListener("click",e=>{const b=e.target.closest("[data-kj]");if(!b)return;const [s,k]=b.dataset.kj.split("|");const x=KJ.find(g=>g.s===s).items.find(i=>i.k===k);
 const was=b.nextElementSibling&&b.nextElementSibling.classList.contains("kj-info");document.querySelectorAll(".kj-info").forEach(z=>z.remove());if(was)return;
 const el=document.createElement("div");el.className="lang-flag kj-info";el.style.margin="0 0 8px";
 el.innerHTML=`${esc(x.d)}${x.r.length||(x.term&&TERMS[x.term])?`<div class="row" style="margin-top:6px">${x.r.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}${x.term&&TERMS[x.term]?`<button class="chip" data-term="${x.term}">More about ${esc(x.n)}</button>`:""}</div>`:""}`;b.after(el);});
Object.assign(TERMS,{kingsjudges:{name:"Kings and judges",forms:[],books:["mosiah"],more:[],resp:"",say:"",plain:"The Nephite rulers, from Nephi to the fall of the government in AD 30.",bg:"",chart:kjChart}});
const KJ_BAR=()=>`<button class="lang-flag" data-term="kingsjudges" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">👑 <b>Kings and judges.</b> Tap to see every Nephite ruler in order.</button>`;
Object.assign(INLINE_AT,{"2ne.5:18":KJ_BAR,"jacob.1:9":KJ_BAR,"omni.1:19":KJ_BAR,"mosiah.29:1":KJ_BAR,"mosiah.29:44":KJ_BAR,"alma.4:16":KJ_BAR,"alma.50:39":KJ_BAR});
// ---------- Lehi's dream (1 Nephi 8; 11–12; 15) ----------
const LD={
 waste:{n:"Dark and dreary waste",saw:"Lehi followed a man in a white robe into a dark and dreary waste, and traveled many hours in darkness until he prayed for mercy (8:5–8).",means:"Not explained in the text. It shows life without God's light, and that Lehi found the way after he prayed.",r:["1ne.8:7","1ne.8:8"]},
 guide:{n:"Man in a white robe",saw:"He came, stood before Lehi and told him to follow (8:5–6).",means:"Not explained in the text.",r:["1ne.8:5"]},
 field:{n:"Large and spacious field",saw:"After praying, Lehi saw a large and spacious field, “as if it had been a world” (8:9, 20).",means:"Lehi himself compares it to a world.",r:["1ne.8:9","1ne.8:20"]},
 tree:{n:"Tree of life",saw:"A tree whose fruit was “desirable to make one happy,” white and “most sweet, above all that I ever before tasted.” It filled Lehi with joy, and he wanted his family to taste it (8:10–12).",means:"“The love of God, which sheddeth itself abroad in the hearts of the children of men” (11:22). Its fruit is “the greatest of all the gifts of God” (15:36). Nephi saw the tree just before he saw Mary and the Lamb of God (11:8–21).",r:["1ne.8:10","1ne.11:22","1ne.11:25","1ne.15:36"],term:"treeoflife"},
 rod:{n:"Rod of iron",saw:"A rod of iron along the bank of the river, leading to the tree (8:19).",means:"“The word of God.” Whoever holds fast to it will never perish, and temptations cannot blind them (11:25; 15:24).",r:["1ne.8:19","1ne.11:25","1ne.15:24"],term:"rodofiron"},
 path:{n:"Strait and narrow path",saw:"A narrow path running beside the rod of iron to the tree (8:20).",means:"Not explained in 1 Nephi. Nephi later teaches that the gate to the strait and narrow path is repentance and baptism (2 Nephi 31:17–19).",r:["1ne.8:20","2ne.31:18"],term:"strait"},
 mists:{n:"Mists of darkness",saw:"An exceedingly great mist arose, and people who had started on the path lost their way (8:23).",means:"“The temptations of the devil, which blindeth the eyes, and hardeneth the hearts” and lead people into broad roads (12:17).",r:["1ne.8:23","1ne.12:17"],term:"mist"},
 river:{n:"River of filthy water",saw:"A river ran near the tree. Lehi was so focused on the tree that he did not notice how filthy it was. Many drowned in its depths (8:13, 32; 15:27).",means:"“The depths of hell” (12:16), and “an awful gulf” separating the wicked from the tree of life and from the Saints (15:28).",r:["1ne.8:13","1ne.12:16","1ne.15:28"],term:"filthywater"},
 fountain:{n:"Fountain of living waters",saw:"The head of the river, where Lehi saw Sariah, Sam and Nephi standing as if they did not know where to go (8:14).",means:"Nephi saw that the rod of iron led “to the fountain of living waters, or to the tree of life,” and that these waters, like the tree, represent the love of God (11:25).",r:["1ne.8:14","1ne.11:25"],term:"livingwaters"},
 building:{n:"Great and spacious building",saw:"On the other side of the river, a building standing “as it were in the air, high above the earth,” full of finely dressed people mocking and pointing at those eating the fruit (8:26–27).",means:"“The pride of the world,” “vain imaginations and the pride of the children of men.” Nephi saw it fall, “and the fall thereof was exceedingly great” (11:36; 12:18).",r:["1ne.8:26","1ne.11:36","1ne.12:18"],term:"spacious"},
 g1:{n:"1. Lost in the mists",saw:"Many started on the path, but when the mist arose they wandered off and were lost (8:21–23).",means:"People who begin well but do not hold to the word of God when temptation comes.",r:["1ne.8:22","1ne.8:23"]},
 g2:{n:"2. Ate, then ashamed",saw:"Others caught hold of the rod and pressed through the mist to the tree. But after tasting the fruit they looked around as if ashamed, and when the people in the building mocked them, they fell away into forbidden paths (8:24–28).",means:"Even those who have tasted God's love can fall away if they care more about the world's scorn.",r:["1ne.8:24","1ne.8:28"]},
 g3:{n:"3. Holding fast",saw:"Others caught hold of the rod and pressed forward, “continually holding fast to the rod of iron,” until they came, fell down and partook of the fruit (8:30). Lehi and his family “heeded them not” when the building mocked (8:33).",means:"Those who keep holding to the word of God all the way. Lehi says, “as many as heeded them, had fallen away” (8:34).",r:["1ne.8:30","1ne.8:33","1ne.8:34"]},
 g4:{n:"4. Toward the building",saw:"Other multitudes felt their way toward the great and spacious building. Many drowned in the depths of the fountain, many wandered in strange roads, and a great multitude entered the building (8:31–33).",means:"Those who never seek the path, choosing the pride and approval of the world.",r:["1ne.8:31","1ne.8:32","1ne.8:33"]},
 family:{n:"Lehi's family",saw:"Sariah, Sam and Nephi came when Lehi called and ate the fruit. Laman and Lemuel would not come (8:14–18).",means:"Lehi told this dream because he feared for Laman and Lemuel (8:4, 36–37).",r:["1ne.8:16","1ne.8:18"],term:"lehifamily"}};
let LD_SEL=null;
function ldSVG(){
 const hs=(k,inner)=>`<g data-ld="${k}" style="cursor:pointer">${inner}</g>`,on=k=>LD_SEL===k?' stroke="#e2b453" stroke-width="3"':"";
 return `<svg viewBox="0 0 360 260" width="100%" style="display:block;max-width:460px;margin:0 auto;border-radius:12px" role="img" aria-label="Lehi's dream">
 <defs><linearGradient id="ldsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4ead2"/><stop offset="1" stop-color="#e6dcc0"/></linearGradient></defs>
 <rect width="360" height="260" fill="url(#ldsky)"/>
 ${hs("waste",`<path d="M0 0 H120 Q90 40 40 60 Q15 70 0 66 Z" fill="#3a3a44"${on("waste")}/>`)}
 ${hs("guide",`<circle cx="26" cy="24" r="5" fill="#fff"${on("guide")}/><path d="M19 46 Q26 26 33 46 Z" fill="#fff"/>`)}
 ${hs("field",`<path d="M0 150 Q80 130 170 160 L190 260 H0 Z" fill="#b9c99a"${on("field")}/>`)}
 ${hs("river",`<path d="M238 58 C228 110 252 150 236 190 C224 220 240 245 236 260 L262 260 C266 240 252 220 262 190 C276 150 250 110 256 58 Z" fill="#7d7a5c"${on("river")}/>`)}
 ${hs("fountain",`<ellipse cx="247" cy="56" rx="16" ry="7" fill="#6aa8c9"${on("fountain")}/>`)}
 ${hs("path",`<path d="M22 248 C70 210 120 170 192 104" stroke="#d9c79c" stroke-width="9" fill="none" stroke-linecap="round"${LD_SEL==="path"?' style="stroke:#e2b453"':""}/>`)}
 ${hs("rod",`<path d="M30 252 C78 212 128 172 198 108" stroke="#4a4f57" stroke-width="3.5" fill="none" stroke-linecap="round"${LD_SEL==="rod"?' style="stroke:#e2b453"':""}/>`)}
 ${hs("mists",`<g opacity=".8"><ellipse cx="100" cy="182" rx="44" ry="15" fill="#8d8f98"/><ellipse cx="132" cy="166" rx="34" ry="12" fill="#9a9ca5"/><ellipse cx="78" cy="196" rx="28" ry="10" fill="#a2a4ad"/></g>${LD_SEL==="mists"?'<ellipse cx="105" cy="180" rx="60" ry="30" fill="none" stroke="#e2b453" stroke-width="3"/>':""}`)}
 ${hs("tree",`<rect x="201" y="78" width="7" height="34" fill="#6b4f33"/><circle cx="205" cy="70" r="24" fill="#5b7f35"${on("tree")}/><g fill="#fff">${[[193,62],[205,56],[216,66],[198,76],[212,78],[205,68]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.2"/>`).join("")}</g>`)}
 ${hs("building",`<g transform="translate(286 20)"><rect width="60" height="62" rx="2" fill="#c9b9a1"${on("building")}/><path d="M-4 0 L30 -14 L64 0 Z" fill="#a8977e"/>${[0,1,2].map(r=>[0,1,2,3].map(c=>`<rect x="${6+c*13}" y="${8+r*17}" width="8" height="10" fill="#7a6a54"/>`).join("")).join("")}<path d="M10 70 q20 8 40 0" stroke="#a8977e" stroke-dasharray="3 4" fill="none"/></g>`)}
 ${hs("g1",`<circle cx="120" cy="150" r="9" fill="#0f2a47"/><text x="120" y="154" fill="#fff" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">1</text>`)}
 ${hs("g2",`<circle cx="176" cy="64" r="9" fill="#0f2a47"/><text x="176" y="68" fill="#fff" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">2</text>`)}
 ${hs("g3",`<circle cx="226" cy="96" r="9" fill="#0f2a47"/><text x="226" y="100" fill="#fff" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">3</text>`)}
 ${hs("g4",`<circle cx="300" cy="150" r="9" fill="#0f2a47"/><text x="300" y="154" fill="#fff" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">4</text>`)}
 ${hs("family",`<circle cx="276" cy="58" r="9" fill="#b08a2e"/><text x="276" y="62" fill="#fff" font-size="10" font-weight="700" text-anchor="middle" font-family="sans-serif">L</text>`)}
 </svg>`;}
function ldInfo(){if(!LD_SEL)return `<p class="muted" style="font-size:13px;margin:8px 0 0">Tap any part of the picture, or a name below.</p>`;const x=LD[LD_SEL];
 return `<div class="lang-flag" style="margin:10px 0 0"><b>${esc(x.n)}</b><p style="margin:6px 0 0"><i>What Lehi saw:</i> ${esc(x.saw)}</p><p style="margin:6px 0 0"><i>What it means:</i> ${esc(x.means)}</p>
 <div class="row" style="margin-top:6px">${x.r.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}</div></div>`;}
function ldChips(keys){return `<div style="display:flex;flex-wrap:wrap;gap:6px">${keys.map(k=>`<button class="chip" data-ld="${k}" aria-pressed="${LD_SEL===k}">${esc(LD[k].n)}</button>`).join("")}</div>`;}
function ldRender(){return `<div class="sec">${ldSVG()}${ldInfo()}</div>
 <div class="sec"><h3>The symbols</h3>${ldChips(["tree","rod","path","river","fountain","mists","building","field","waste","guide"])}</div>
 <div class="sec"><h3>The people</h3>${ldChips(["g1","g2","g3","g4","family"])}</div>`;}
function ldChart(){LD_SEL=null;return `<div class="sec"><p>Lehi's dream, with the meanings the angel showed Nephi (1 Nephi 11–12) and Nephi explained to his brothers (1 Nephi 15).</p></div><div id="ldwrap">${ldRender()}</div><div class="sec"><button class="lang-flag" data-term="nephivision" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">✨ <b>Nephi’s vision.</b> See what Nephi saw when he asked to see his father’s dream.</button></div>`;}
document.addEventListener("click",e=>{const g=e.target.closest("[data-ld]");if(!g)return;LD_SEL=LD_SEL===g.dataset.ld?null:g.dataset.ld;const w=document.getElementById("ldwrap");if(w){w.innerHTML=ldRender();const i=w.querySelector(".lang-flag");if(i&&g.tagName==="BUTTON"){const sv=w.querySelector("svg"),pn=document.getElementById("panelIn");sv.scrollIntoView({block:"start"});if(pn)pn.scrollTop=Math.max(0,pn.scrollTop-70);}}});
Object.assign(TERMS,{lehisdream:{name:"Lehi’s dream",forms:[],books:["1ne"],more:[],resp:"",say:"",plain:"Lehi's vision of the tree of life, and what each part means.",bg:"",chart:ldChart}});
const LD_TAB={name:"The dream",html:ldChart};
["treeoflife","rodofiron","mist","spacious","livingwaters","filthywater"].forEach(k=>{if(TERMS[k])TERMS[k].tabX=LD_TAB;});
const LD_BAR=()=>`<button class="lang-flag" data-term="lehisdream" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">🌳 <b>Lehi’s dream, pictured.</b> Tap to explore each part and what it means.</button>`;
Object.assign(INLINE_AT,{"1ne.8:2":LD_BAR,"1ne.11:8":LD_BAR,"1ne.12:16":LD_BAR,"1ne.15:21":LD_BAR});
// ---------- Nephi's vision (1 Nephi 11–14) ----------
const NV_ICON={
 mountain:`<path d="M10 70 L45 22 L60 40 L72 28 L110 70 Z"/><path d="M45 22 L52 32 L40 34 Z" fill="#f4dfa0" stroke="none"/>`,
 tree:`<path d="M60 70 V44"/><circle cx="60" cy="32" r="20"/>${[[52,26],[64,22],[70,34],[54,38],[61,32]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" stroke="none"/>`).join("")}`,
 mother:`<circle cx="60" cy="22" r="8"/><path d="M42 72 Q44 36 60 32 Q76 36 78 72 Z"/><circle cx="62" cy="48" r="7" fill="#f4dfa0" stroke="none"/><path d="M84 12 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z" fill="#f4dfa0" stroke="none"/>`,
 rod:`<path d="M14 66 L94 26" stroke-width="4"/><path d="M96 24 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" /><path d="M20 70 q10 -6 20 0 t20 0 t20 0" stroke="#6aa8c9"/>`,
 dove:`<path d="M22 54 Q44 30 62 44 Q74 28 98 24 Q86 40 72 48 Q64 60 46 58 Z"/><path d="M60 8 V20 M48 12 l4 8 M72 12 l-4 8" />`,
 cross:`<path d="M60 10 V72 M40 28 H80"/><path d="M30 72 H90"/>`,
 fall:`<path d="M30 14 h40 v34 h-40 z" transform="rotate(14 50 31)"/><path d="M78 40 h22 v22 h-22 z" transform="rotate(-20 89 51)"/><path d="M20 72 H100"/>`,
 descend:`<circle cx="60" cy="40" r="9"/><path d="M48 72 Q50 52 60 50 Q70 52 72 72 Z"/><path d="M60 4 V24 M40 10 l10 14 M80 10 l-10 14 M30 26 h14 M76 26 h14"/>`,
 gens:`${[30,60,90].map(x=>`<circle cx="${x}" cy="30" r="7"/><path d="M${x-10} 66 Q${x-9} 42 ${x} 40 Q${x+9} 42 ${x+10} 66 Z"/>`).join("")}`,
 church:`<path d="M30 70 V36 L60 16 L90 36 V70 Z"/><path d="M52 70 V52 h16 V70"/><path d="M14 30 l8 6 M106 30 l-8 6"/>`,
 ship:`<path d="M24 52 H96 L86 66 H34 Z"/><path d="M60 52 V14 L82 44 H60"/><path d="M10 74 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0" stroke="#6aa8c9"/>`,
 book:`<path d="M20 22 Q40 16 60 24 Q80 16 100 22 V68 Q80 62 60 70 Q40 62 20 68 Z"/><path d="M60 24 V70"/><path d="M32 36 h18 M32 44 h14 M70 36 h18 M74 44 h14" stroke-dasharray="3 3"/>`,
 books:`<path d="M14 26 Q30 20 46 26 V66 Q30 60 14 66 Z"/><path d="M46 26 Q62 20 78 26 V66 Q62 60 46 66 Z"/><path d="M84 20 h22 v48 h-22 z" fill="#f4dfa0" stroke="none"/><path d="M90 30 h10 M90 38 h10"/>`,
 two:`<path d="M60 74 V50 L28 14 M60 50 L92 14"/><circle cx="28" cy="14" r="5" fill="#f4dfa0" stroke="none"/><circle cx="92" cy="14" r="5"/>`,
 scroll:`<path d="M30 18 h56 a6 6 0 0 1 0 12 h-4 v34 a6 6 0 0 1 -6 6 h-50 a6 6 0 0 1 0 -12 h4 V24 a6 6 0 0 1 6 -6"/><path d="M42 36 h30 M42 44 h30 M42 52 h22"/><circle cx="88" cy="62" r="7"/>`};
const NV=[
 {era:"The vision begins",t:"Caught away to a mountain",ic:"mountain",r:"11:1–7",refs:["1ne.11:1","1ne.11:6"],d:"Nephi wanted to see what his father saw. As he sat pondering, he was caught away by the Spirit to an exceedingly high mountain. The Spirit asked, “Believest thou that thy father saw the tree?” When Nephi said yes, the Spirit cried, “Hosanna to the Lord, the most high God.”",lehi:null},
 {era:"The vision begins",t:"The same tree",ic:"tree",r:"11:8–11",refs:["1ne.11:8"],d:"Nephi saw the tree his father saw. Its beauty was beyond all beauty, and it was whiter than the driven snow. He asked to know what it meant.",lehi:"tree"},
 {era:"The life of Christ",t:"Mary and the Lamb of God",ic:"mother",r:"11:13–23",refs:["1ne.11:13","1ne.11:18","1ne.11:21","1ne.11:22"],d:"Instead of a direct answer, an angel showed him a virgin in Nazareth, “the mother of the Son of God,” and then the same virgin holding a child: “Behold the Lamb of God.” Then Nephi understood the tree: “it is the love of God… the most desirable above all things.”",lehi:"tree"},
 {era:"The life of Christ",t:"The rod and the fountain",ic:"rod",r:"11:25",refs:["1ne.11:25"],d:"Nephi saw that the rod of iron was the word of God, leading to the fountain of living waters, or the tree of life, and that the waters, like the tree, represent the love of God.",lehi:"rod"},
 {era:"The life of Christ",t:"His ministry",ic:"dove",r:"11:24–31",refs:["1ne.11:27","1ne.11:28","1ne.11:31"],d:"He saw the Son of God among the people. A prophet baptized Him, and the Holy Ghost came down like a dove. He ministered in power, chose twelve to follow Him, and healed the sick and cast out devils.",lehi:null},
 {era:"The life of Christ",t:"The cross",ic:"cross",r:"11:32–33",refs:["1ne.11:32","1ne.11:33"],d:"He saw the Lamb of God taken and judged by the world, then “lifted up upon the cross and slain for the sins of the world.”",lehi:null},
 {era:"The life of Christ",t:"The building falls",ic:"fall",r:"11:34–36",refs:["1ne.11:34","1ne.11:36"],d:"The multitudes of the earth gathered in a great and spacious building to fight the Apostles. Nephi learned the building was “the pride of the world,” and saw it fall, “and the fall thereof was exceedingly great.”",lehi:"building"},
 {era:"Nephi's people",t:"Christ comes to them",ic:"descend",r:"12:1–10",refs:["1ne.12:1","1ne.12:4","1ne.12:6","1ne.12:8"],d:"He saw his own descendants and his brothers' in the land of promise, many wars, then a mist of darkness, earthquakes and destruction. Then the Lamb of God descended from heaven and showed Himself to them, and chose twelve disciples to minister to them.",lehi:null},
 {era:"Nephi's people",t:"The generations after",ic:"gens",r:"12:11–23",refs:["1ne.12:11","1ne.12:16","1ne.12:17","1ne.12:18"],d:"Three generations, and many of the fourth, lived in righteousness. Then pride and temptation brought his people down, and his brothers' descendants overcame them. Here the angel explained more of the dream: the river is the depths of hell, the mists are the devil's temptations, and the building is vain imaginations and pride.",lehi:"mists"},
 {era:"The latter days",t:"A great and abominable church",ic:"church",r:"13:1–9",refs:["1ne.13:4","1ne.13:6"],d:"Among the nations of the Gentiles he saw a church that persecuted the Saints and sought wealth and the praise of the world. The devil was its founder.",lehi:null},
 {era:"The latter days",t:"Across many waters",ic:"ship",r:"13:10–19",refs:["1ne.13:12","1ne.13:13","1ne.13:19"],d:"The Spirit of God wrought upon a man among the Gentiles, and he crossed the many waters to the land of promise. Others followed, “out of captivity,” and were delivered by God from their mother Gentiles. These are commonly understood as Columbus, the colonists and the American Revolution.",lehi:null},
 {era:"The latter days",t:"The book",ic:"book",r:"13:20–29",refs:["1ne.13:23","1ne.13:24","1ne.13:28"],d:"He saw a book, a record of the Jews with the Lord's covenants, which went forth with the fulness of the gospel. But many plain and precious things were taken from it before it reached the Gentiles. This is understood as the Bible.",lehi:null},
 {era:"The latter days",t:"Other books",ic:"books",r:"13:32–41",refs:["1ne.13:35","1ne.13:39","1ne.13:40"],d:"The Lamb promised that Nephi's people would write plain and precious things that would come forth to the Gentiles. Other books would then establish the truth of the first and restore what was lost. This is understood as the Book of Mormon and other latter-day scripture.",lehi:null},
 {era:"The latter days",t:"Two churches",ic:"two",r:"14:1–17",refs:["1ne.14:10","1ne.14:12","1ne.14:14"],d:"There are “save two churches only”: the church of the Lamb of God and the church of the devil. The Lamb's church was few in number, but Nephi saw the power of the Lamb descend upon the Saints, “armed with righteousness and with the power of God in great glory.”",lehi:null},
 {era:"The latter days",t:"John will write the rest",ic:"scroll",r:"14:18–30",refs:["1ne.14:20","1ne.14:27","1ne.14:28"],d:"Nephi saw a man in a white robe: John, one of the Twelve Apostles, who would write the rest, including the end of the world. Nephi was forbidden to write more and said he had written “but a small part” of what he saw.",lehi:null}];
let NV_I=0;
function nvIcon(k){return `<svg viewBox="0 0 120 80" width="100%" style="max-width:300px;display:block;margin:0 auto;border-radius:12px;background:#0f2a47"><g fill="none" stroke="#e2b453" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${NV_ICON[k]}</g></svg>`;}
function nvStage(){const s=NV[NV_I];const eras=[...new Set(NV.map(x=>x.era))];
 return `<div class="sec"><div style="display:flex;gap:4px;margin-bottom:8px">${eras.map(e=>`<span style="flex:1;text-align:center;font:600 10.5px var(--sans);padding:4px 2px;border-radius:6px;${e===s.era?"background:#0f2a47;color:#f4dfa0":"background:var(--line);color:var(--muted)"}">${e}</span>`).join("")}</div>
  <div style="display:flex;gap:5px;overflow-x:auto;padding-bottom:4px">${NV.map((x,i)=>`<button class="chip" data-nv="${i}" style="min-width:34px;${i===NV_I?"background:#0f2a47;color:#fff;border-color:transparent":""}">${i+1}</button>`).join("")}</div></div>
 <div class="sec">${nvIcon(s.ic)}</div>
 <div class="sec"><h3>${NV_I+1}. ${esc(s.t)} · 1 Nephi ${s.r}</h3><p>${esc(s.d)}</p>
  <div class="row" style="margin-top:6px">${s.refs.map(r=>`<button class="chip" data-goto='{"type":"verse","ref":"${r}"}'>${refLabel(r)}</button>`).join("")}${s.lehi?`<button class="chip" data-nvlehi="${s.lehi}">In Lehi’s dream</button>`:""}</div>
  <div style="display:flex;justify-content:space-between;margin-top:12px"><button class="btn" data-nv="${Math.max(0,NV_I-1)}" ${NV_I===0?"disabled":""}>‹ Back</button><button class="btn" data-nv="${Math.min(NV.length-1,NV_I+1)}" ${NV_I===NV.length-1?"disabled":""}>Next ›</button></div></div>`;}
function nvChart(){return `<div class="sec"><p>Nephi asked to see what his father saw, and saw far more: the life of Christ, the future of his own people and the latter days. Step through it in order.</p></div><div id="nvstage">${nvStage()}</div>`;}
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-nv]");if(b){NV_I=+b.dataset.nv;const el=document.getElementById("nvstage");if(el){el.innerHTML=nvStage();const pn=document.getElementById("panelIn"),h=el.querySelector("h3");}return;}
 const l=e.target.closest("[data-nvlehi]");if(l){const k=l.dataset.nvlehi;TAB.term="Chart";goto({type:"term",key:"lehisdream"});setTimeout(()=>{LD_SEL=k;const w=document.getElementById("ldwrap");if(w)w.innerHTML=ldRender();},60);}});
Object.assign(TERMS,{nephivision:{name:"Nephi’s vision",forms:[],books:["1ne"],more:[],resp:"",say:"",plain:"Nephi's vision of the tree of life, the life of Christ, his people's future and the latter days (1 Nephi 11–14).",bg:"",chart:nvChart}});
const NV_BAR=()=>`<button class="lang-flag" data-term="nephivision" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">✨ <b>Nephi’s vision, step by step.</b> Tap to follow what he saw, from Christ’s birth to the latter days.</button>`;
Object.assign(INLINE_AT,{"1ne.11:1":NV_BAR,"1ne.12:1":NV_BAR,"1ne.13:1":NV_BAR,"1ne.14:18":NV_BAR});

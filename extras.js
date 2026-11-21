// ---------- Choose any book from the chapter menu ----------
const VOL_ORDER=["Old Testament","New Testament","Book of Mormon","Doctrine and Covenants","Pearl of Great Price"];
function bpBooks(){const by={};BOOK_ORDER.forEach(b=>{const v=BOOKS[b].vol||"";(by[v]=by[v]||[]).push(b);});
 const vols=Object.keys(by).sort((a,b)=>(VOL_ORDER.indexOf(a)+99)%99-(VOL_ORDER.indexOf(b)+99)%99);
 return `<div class="chpop-h">All books</div><div class="bp-list">${vols.map(v=>`<div class="bp-vol">${esc(v)}</div><div class="bp-g">${by[v].map(b=>`<button data-bpbook="${b}" aria-pressed="${b===bk}">${esc(bname(b))}</button>`).join("")}</div>`).join("")}</div>`;}
function bpChapters(b){const L=BOOKS[b].chs;
 return `<div class="chpop-h"><button class="bp-back" data-bpall>‹ Books</button> ${esc(bname(b))}</div><div class="chpop-g">${L.map(c=>`<button data-bpgo="${b}|${c}" aria-pressed="${b===bk&&c===ch}">${c}</button>`).join("")}</div>`;}
document.addEventListener("click",e=>{
 const all=e.target.closest("[data-bpall]"),pick=e.target.closest("[data-bpbook]"),go=e.target.closest("[data-bpgo]");
 if(!all&&!pick&&!go)return;
 e.preventDefault();e.stopPropagation();
 const pop=document.querySelector("#chapseg .chpop");if(!pop)return;
 if(all){pop.innerHTML=bpBooks();const on=pop.querySelector('[aria-pressed="true"]');on&&on.scrollIntoView({block:"center"});return;}
 if(pick){pop.innerHTML=bpChapters(pick.dataset.bpbook);return;}
 const [b,c]=go.dataset.bpgo.split("|");pop.hidden=true;
 if(panelView.type==="verse"||panelView.type==="history")panelView={type:"guide"};location.hash=hashFor(b,+c);},true);
(function(){const st=document.createElement("style");st.textContent=`
.chpop .bp-back{border:0;background:none;color:var(--accent);font:600 14px var(--sans);padding:0 8px 0 0;cursor:pointer}
.chpop .bp-list{max-height:min(60vh,460px);overflow-y:auto;margin:0 -4px;padding:0 4px}
.chpop .bp-vol{font:600 11px var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:10px 2px 6px}
.chpop .bp-g{display:grid;grid-template-columns:1fr 1fr;gap:6px}
#chapseg .chpop .bp-g button{border:1px solid var(--line);border-radius:8px;padding:9px 8px;font-size:14px;color:var(--fg);text-align:left;background:var(--surface)}
#chapseg .chpop .bp-g button[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.par-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:4px 0 14px;font:13px var(--sans);color:var(--muted)}
.par-bar .seg button{font-size:13px}
.par-note{font:13.5px/1.5 var(--sans);margin:0 0 14px}
.verse .par{margin:6px 0 2px;padding-left:10px;border-left:2px solid var(--line);font-size:.9em;line-height:1.55}
.verse .par .ver{display:block;font:600 10.5px var(--sans);letter-spacing:.08em;color:var(--muted);margin-bottom:2px}
.verse .par ins{text-decoration:none;background:rgba(214,167,44,.28);border-radius:3px;padding:0 1px}
.verse .par del{color:var(--muted);text-decoration:line-through}
`;document.head.appendChild(st);})();
// Rebuild the chapter menu header so it always offers the full book list.
renderTop=(o=>function(){o.apply(this,arguments);const h=document.querySelector("#chapseg .chpop .chpop-h");if(h&&!h.querySelector("[data-bpall]"))h.innerHTML=`<button class="bp-back" data-bpall>‹ Books</button> ${esc(bname(bk))}`;})(renderTop);

// ---------- Book of Mormon side by side with the Bible (Isaiah, the Sermon on the Mount, Malachi and more) ----------
// Data: texts/bibpar.json (built by tools/align_parallels.py). PAR_KEYS / PAR_REV are rewritten by that script.
const PAR_KEYS=["1ne.20", "1ne.21", "2ne.12", "2ne.13", "2ne.14", "2ne.15", "2ne.16", "2ne.17", "2ne.18", "2ne.19", "2ne.20", "2ne.21", "2ne.22", "2ne.23", "2ne.24", "2ne.27", "2ne.30", "2ne.6", "2ne.7", "2ne.8", "2ne.9", "3ne.12", "3ne.13", "3ne.14", "3ne.16", "3ne.20", "3ne.21", "3ne.22", "3ne.24", "3ne.25", "morm.9", "moro.10", "moro.7", "mosiah.12", "mosiah.13", "mosiah.14"];const PAR_REV={"isa.48": ["1ne.20"], "isa.49": ["1ne.21", "2ne.6"], "isa.50": ["2ne.7"], "isa.51": ["2ne.8"], "isa.52": ["2ne.8", "3ne.16", "3ne.20", "3ne.21", "mosiah.12"], "isa.53": ["mosiah.14"], "isa.2": ["2ne.12"], "isa.3": ["2ne.13"], "isa.4": ["2ne.14"], "isa.5": ["2ne.15"], "isa.6": ["2ne.16"], "isa.7": ["2ne.17"], "isa.8": ["2ne.18"], "isa.9": ["2ne.19"], "isa.10": ["2ne.20"], "isa.11": ["2ne.21", "2ne.30"], "isa.12": ["2ne.22"], "isa.13": ["2ne.23"], "isa.14": ["2ne.24"], "mat.5": ["3ne.12"], "mat.6": ["3ne.13"], "mat.7": ["3ne.14"], "mic.5": ["3ne.20", "3ne.21"], "isa.54": ["3ne.22"], "mal.3": ["3ne.24"], "mal.4": ["3ne.25"], "exo.20": ["mosiah.13"], "isa.55": ["2ne.9"], "isa.29": ["2ne.27"], "1cor.13": ["moro.7"], "1cor.12": ["moro.10"], "mark.16": ["morm.9"]};/*PARKEYS*/
let BIBPAR=null,PAR_MODE="bom";try{PAR_MODE=localStorage.getItem(KEY+"-par")||"bom";}catch(e){}
function loadBibPar(){if(BIBPAR)return Promise.resolve(BIBPAR);const key="/__bibpar_v1";
 return (async()=>{try{const r=await (await caches.open("joined")).match(key);if(r){BIBPAR=await r.json();}}catch(e){}
  try{const r=await fetch(TEXT_SRC+"bibpar.json",{cache:"no-store"});if(r.ok){const j=await r.json();BIBPAR=j;try{(await caches.open("joined")).put(key,new Response(JSON.stringify(j)));}catch(e){}}}catch(e){}
  return BIBPAR;})();}
function wdiff(a,b){const A=a.split(/\s+/).filter(Boolean),B=b.split(/\s+/).filter(Boolean),n=A.length,m=B.length;
 const norm=w=>w.toLowerCase().replace(/[^a-z0-9]/g,"");const L=[];for(let i=0;i<=n;i++)L.push(new Array(m+1).fill(0));
 for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)L[i][j]=norm(A[i])===norm(B[j])?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
 const out=[];let i=0,j=0;while(i<n&&j<m){if(norm(A[i])===norm(B[j])){out.push(["=",A[i]]);i++;j++;}else if(L[i+1][j]>=L[i][j+1]){out.push(["-",A[i]]);i++;}else{out.push(["+",B[j]]);j++;}}
 while(i<n)out.push(["-",A[i++]]);while(j<m)out.push(["+",B[j++]]);return out;}
function parHTML(kjv,bom){const d=wdiff(kjv,bom);if(!d.some(x=>x[0]!=="="))return null;
 const g=[];d.forEach(([t,w])=>{const l=g[g.length-1];if(l&&l[0]===t)l[1].push(w);else g.push([t,[w]]);});
 return g.map(([t,ws])=>{const x=esc(ws.join(" "));return t==="="?x:t==="+"?`<ins>${x}</ins>`:`<del>${x}</del>`;}).join(" ");}
renderReader=(o=>function(){o.apply(this,arguments);parAfter();})(renderReader);
function parAfter(){const k=bk+"."+ch;
 // On a Bible chapter: link to the Book of Mormon chapters that quote it.
 if(PAR_REV[k]&&isBible(bk)){const f=document.querySelector("#reader .verse");if(f&&!document.querySelector("#reader .par-bar.rev")){const d=document.createElement("div");
  d.innerHTML=`<div class="par-bar rev"><span>The Book of Mormon quotes or retells this chapter: ${PAR_REV[k].map(x=>{const [b,c]=x.split(".");return `<a href="${hashFor(b,+c)}"><b>${esc(chapLabel(b,+c))}</b></a>`;}).join(", ")}. Open it to read them side by side.</span></div>`;f.parentNode.insertBefore(d,f);}return;}
 if(!PAR_KEYS.includes(k))return;
 if(!BIBPAR){loadBibPar().then(p=>{if(p&&view==="read"&&bk+"."+ch===k)renderReader();});return;}
 const P=BIBPAR[k];if(!P)return;
 const first=document.querySelector("#reader .verse");if(!first)return;
 let diffCount=0,matched=0;P.kjv.forEach((t,i)=>{if(!P.labels[i])return;matched++;const b=vtext(MR(bk,ch,i+1),"std");if(b&&parHTML(t,b))diffCount++;});
 const isIsa=/^Isaiah/.test(P.title);
 const bar=document.createElement("div");bar.innerHTML=`<div class="par-bar"><span>${P.partial?"Part of this chapter quotes":"This chapter quotes"} <b>${esc(P.title)}</b>.</span><div class="seg" role="group">${[["bom","Book of Mormon"],["modern","Modern"],["compare","Compare"]].map(([m,l])=>`<button data-par="${m}" aria-pressed="${PAR_MODE===m}">${l}</button>`).join("")}</div></div>`+
  (PAR_MODE==="compare"?`<p class="par-note">${diffCount} of ${matched} matched verses here read differently from the King James Version. Under each verse, <ins style="text-decoration:none;background:rgba(214,167,44,.28);border-radius:3px;padding:0 2px">highlighted</ins> words are in the Book of Mormon but not the KJV, and <del>crossed-out</del> words are in the KJV but not the Book of Mormon. ${isIsa?"Some differences match ancient copies of Isaiah, such as 2 Nephi 12:16, which shares a phrase with the ancient Greek translation; others clarify the meaning. Scholars still discuss how best to explain them. Isaiah wrote in Hebrew poetry, built on parallel lines that repeat an idea in new words, which is one reason his writing feels different from the rest of scripture.":"Some changes clarify the meaning and some add to it. In the Sermon on the Mount, for example, the Savior speaks to the Nephites after His resurrection. Scholars and members explain the differences in different ways."}</p>`:"");
 first.parentNode.insertBefore(bar,first);
 if(PAR_MODE==="bom")return;
 P.kjv.forEach((t,i)=>{if(!P.labels[i])return;const ref=MR(bk,ch,i+1),el=document.getElementById(vid(ref));if(!el)return;const b=vtext(ref,"std");let h="";const L=esc(P.labels[i]).toUpperCase();
  if(PAR_MODE==="compare"){const d=parHTML(t,b);h+=`<div class="par"><span class="ver">${L} · KJV</span>${d||esc(t)+' <span style="color:var(--muted);font-size:.85em">(same)</span>'}</div>`;}
  if(P.web[i])h+=`<div class="par"><span class="ver">${L} · MODERN (WEB)</span>${esc(P.web[i])}</div>`;
  el.insertAdjacentHTML("beforeend",h);});}
document.addEventListener("click",e=>{const b=e.target.closest("[data-par]");if(!b)return;e.stopPropagation();PAR_MODE=b.dataset.par;try{localStorage.setItem(KEY+"-par",PAR_MODE);}catch(x){}renderReader();},true);
if(typeof view!=="undefined"&&view==="read"){renderTop();renderReader();}
if(typeof view!=="undefined"&&(view==="scriptures"||view==="volume"))route();

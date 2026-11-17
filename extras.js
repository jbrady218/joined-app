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

// ---------- Isaiah side by side in the Book of Mormon ----------
let ISAPAR=null,PAR_MODE="bom";try{PAR_MODE=localStorage.getItem(KEY+"-par")||"bom";}catch(e){}
function loadIsaPar(){if(ISAPAR)return Promise.resolve(ISAPAR);const key="/__isapar_v1";
 return (async()=>{try{const r=await (await caches.open("joined")).match(key);if(r){ISAPAR=await r.json();}}catch(e){}
  try{const r=await fetch(TEXT_SRC+"isapar.json",{cache:"no-store"});if(r.ok){const j=await r.json();ISAPAR=j;try{(await caches.open("joined")).put(key,new Response(JSON.stringify(j)));}catch(e){}}}catch(e){}
  return ISAPAR;})();}
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
 const ISA_SET=["1ne.20","1ne.21","2ne.7","2ne.8","mosiah.14"].concat(Array.from({length:13},(_,i)=>"2ne."+(i+12)));
 if(!ISA_SET.includes(k))return;
 if(!ISAPAR){loadIsaPar().then(p=>{if(p&&view==="read"&&bk+"."+ch===k)renderReader();});return;}
 const P=ISAPAR[k];if(!P)return;
 const first=document.querySelector("#reader .verse");if(!first)return;
 const isaLabel=r=>"Isaiah "+r;
 const span=P.refs[0].split(":")[0]===P.refs[P.refs.length-1].split(":")[0]?`Isaiah ${P.refs[0].split(":")[0]}`:`Isaiah ${P.refs[0]}–${P.refs[P.refs.length-1]}`;
 let diffCount=0;P.kjv.forEach((t,i)=>{const b=vtext(MR(bk,ch,i+1),"std");if(b&&parHTML(t,b))diffCount++;});
 const bar=document.createElement("div");bar.innerHTML=`<div class="par-bar"><span>This chapter quotes <b>${span}</b>.</span><div class="seg" role="group">${[["bom","Book of Mormon"],["modern","Modern"],["compare","Compare"]].map(([m,l])=>`<button data-par="${m}" aria-pressed="${PAR_MODE===m}">${l}</button>`).join("")}</div></div>`+
  (PAR_MODE==="compare"?`<p class="par-note">${diffCount} of ${P.kjv.length} verses here read differently from the King James Version of Isaiah. Under each verse, <ins style="text-decoration:none;background:rgba(214,167,44,.28);border-radius:3px;padding:0 2px">highlighted</ins> words are in the Book of Mormon but not the KJV, and <del>crossed-out</del> words are in the KJV but not the Book of Mormon. Some differences match ancient copies of Isaiah, such as 2 Nephi 12:16, which shares a phrase with the ancient Greek translation; others clarify the meaning. Scholars still discuss how best to explain them. Isaiah wrote in Hebrew poetry, built on parallel lines that repeat an idea in new words, which is one reason his writing feels different from the rest of scripture.</p>`:"");
 first.parentNode.insertBefore(bar,first);
 if(PAR_MODE==="bom")return;
 P.kjv.forEach((t,i)=>{const ref=MR(bk,ch,i+1),el=document.getElementById(vid(ref));if(!el)return;const b=vtext(ref,"std");let h="";
  if(PAR_MODE==="compare"){const d=parHTML(t,b);h+=`<div class="par"><span class="ver">ISAIAH ${P.refs[i]} · KJV</span>${d||esc(t)+' <span style="color:var(--muted);font-size:.85em">(same)</span>'}</div>`;}
  if(P.web[i])h+=`<div class="par"><span class="ver">ISAIAH ${P.refs[i]} · MODERN (WEB)</span>${esc(P.web[i])}</div>`;
  el.insertAdjacentHTML("beforeend",h);});}
document.addEventListener("click",e=>{const b=e.target.closest("[data-par]");if(!b)return;e.stopPropagation();PAR_MODE=b.dataset.par;try{localStorage.setItem(KEY+"-par",PAR_MODE);}catch(x){}renderReader();},true);
if(typeof view!=="undefined"&&view==="read"){renderTop();renderReader();}

const BASES={ne:{...__NE__,img:"data:image/jpeg;base64,__NEIMG__"},us:{...__US__,img:"data:image/jpeg;base64,__USIMG__"},holy:{...__HOLY__,img:"data:image/jpeg;base64,__HOLYIMG__"},sinai:{...__SINAI__,img:"data:image/jpeg;base64,__SINAIIMG__"},arabia:{...__ARABIA__,img:"data:image/jpeg;base64,__ARABIAIMG__"},east:{...__EAST__,img:"data:image/jpeg;base64,__EASTIMG__"}};
const PL={harmony:["Harmony, PA",-75.70,41.94],palmyra:["Palmyra",-77.23,43.07],fayette:["Fayette",-76.83,42.83],hiram:["Hiram",-81.14,41.31],adam:["Adam-ondi-Ahman",-93.97,39.97],winterq:["Winter Quarters",-95.95,41.32],jerusalem:["Jerusalem",35.235,31.778],babylon:["Babylon",44.421,32.536],carchemish:["Carchemish",38.017,36.829],damascus:["Damascus",36.29,33.51],
 nineveh:["Nineveh",43.15,36.36],ur:["Ur",46.10,30.96],susa:["Susa",48.26,32.19],hamath:["Hamath",36.75,35.13],haran:["Haran",39.03,36.86],shechem:["Shechem",35.28,32.21],
 bethel:["Bethel",35.22,31.93],egypt:["Egypt",31.25,30.05],capernaum:["Capernaum",35.575,32.881],aqaba:["Gulf of Aqaba",35.0,29.53],lemuel:["Valley of Lemuel?",34.80,28.62],
 liberty:["Liberty Jail",-94.419,39.246],farwest:["Far West",-94.08,39.76],quincy:["Quincy",-91.41,39.94],commerce:["Commerce (Nauvoo)",-91.385,40.55],
 beatitudes:["Mount of Beatitudes",35.556,32.881],nazareth:["Nazareth",35.30,32.70],bethlehem:["Bethlehem",35.20,31.705],jericho:["Jericho",35.444,31.871],
 kirtland:["Kirtland",-81.361,41.629],stlouis:["St. Louis",-90.19,38.63],independence:["Independence",-94.415,39.091],
 bethabara:["Bethabara (traditional site)",35.553,31.837],kursi:["Gergesa (Kursi)",35.650,32.826],tyre:["Tyre",35.195,33.271],sidon:["Sidon",35.371,33.563],
 caesareaphilippi:["Caesarea Philippi",35.694,33.248],tabor:["Mount Tabor",35.390,32.687],bethany:["Bethany",35.262,31.771],
 samaria:["Samaria",35.19,32.28],gilgal:["Gilgal",35.49,31.85],nahom:["Nahom",44.60,15.85],bountiful:["Bountiful?",53.47,16.73]};
const CONTEXT={arabia:["jerusalem"],sinai:["jerusalem"],holy:["jerusalem","nazareth","bethlehem","jericho","capernaum"],ne:["jerusalem","damascus","babylon","nineveh"],us:["stlouis","commerce","independence"],east:[]};
const RG={judah:["Judah",[[34.8,31.95],[35.42,31.95],[35.36,31.15],[34.85,31.25]]],
 babylonia:["Babylonia (Shinar)",[[43.8,33.45],[44.9,33.5],[46.3,32.3],[47.6,31.2],[47.9,30.3],[46.6,30.4],[45.6,30.9],[44.6,31.6],[43.9,32.4]]],
 chaldea:["Chaldea",[[45.0,31.95],[46.4,31.95],[47.7,31.05],[47.9,30.2],[46.4,30.3],[45.3,30.9]]],
 aram:["Aram (the Arameans)",[[35.9,33.2],[37.2,33.2],[38.6,34.8],[40.5,35.6],[40.8,36.9],[37.5,37.0],[36.2,36.2],[35.8,34.6]]],
 galilee:["Galilee",[[35.1,33.1],[35.65,33.1],[35.68,32.6],[35.1,32.55]]],
 samaria:["Samaria",[[34.95,32.5],[35.55,32.5],[35.55,32.0],[34.95,32.0]]],
 judea:["Judea",[[34.85,32.0],[35.5,32.0],[35.45,31.2],[34.85,31.25]]]};
const AREAS={dura:["Plain of Dura (general area)",44.55,32.38,0.45]};
const ROUTES={exile:[[35.235,31.778],[36.29,33.51],[36.75,35.13],[37.16,36.2],[38.13,36.03],[39.0,35.9],[40.1,35.3],[40.89,34.55],[41.9,34.4],[42.83,33.64],[43.8,33.2],[44.421,32.536]],
 lehi:[[35.235,31.778],[35.42,31.25],[35.3,30.5],[35.0,29.53],[34.80,28.62]],
 abraham:[[46.10,30.96],[45.3,31.6],[44.42,32.54],[43.8,33.2],[42.83,33.64],[41.9,34.4],[40.89,34.55],[40.1,35.3],[39.03,36.86],[37.16,36.2],[36.75,35.13],[36.29,33.51],[35.28,32.21],[35.22,31.93],[34.9,31.0],[34.2,30.9],[32.6,30.85],[31.25,30.05]],
 arabia:[[35.235,31.778],[35.42,31.25],[35.3,30.5],[35.0,29.53],[34.80,28.62],[35.9,27.4],[37.3,25.4],[38.6,23.4],[39.6,21.5],[41.0,19.5],[42.7,17.6],[44.60,15.85]],
 arabia2:[[44.60,15.85],[46.5,16.3],[48.6,16.9],[50.8,17.1],[53.47,16.73]],
 exodus1839:[[-94.08,39.76],[-93.5,39.6],[-92.5,39.75],[-91.9,39.85],[-91.41,39.94]]};
const RIVERS={arabia:[],sinai:[["Jordan",[[35.6,32.5],[35.55,32.1],[35.55,31.75]],null]],holy:[["Jordan",[[35.62,33.25],[35.63,32.95],[35.6,32.88],[35.57,32.71],[35.57,32.4],[35.53,32.1],[35.55,31.76]],[[35.62,32.25]]]],ne:[["Euphrates",[[39.5,39.0],[38.8,38.8],[38.4,37.6],[38.02,36.83],[38.1,36.0],[39.0,35.9],[40.1,35.3],[40.89,34.55],[41.9,34.4],[42.83,33.64],[43.8,33.2],[44.42,32.54],[45.0,31.9],[45.6,31.3],[46.1,30.96],[46.9,31.0],[47.43,31.0],[48.0,30.5],[48.6,29.95]],[[41.6,34.75]]],
 ["Tigris",[[39.4,38.5],[40.24,37.91],[41.5,37.5],[42.4,37.1],[43.15,36.36],[43.26,35.46],[43.87,34.2],[44.37,33.31],[45.0,33.0],[45.8,32.5],[46.6,32.1],[47.14,31.84],[47.43,31.0]],[[44.3,34.6]]],
 ["Nile",[[31.25,27.5],[31.25,30.05],[30.95,30.8],[30.75,31.4]],null],["Jordan",[[35.62,33.2],[35.58,32.7],[35.55,32.1],[35.55,31.75]],null]],
 us:[["Mississippi",[[-91.2,43.3],[-91.15,42.3],[-90.6,41.6],[-91.0,40.9],[-91.385,40.55],[-91.4,39.94],[-91.0,39.4],[-90.2,38.8],[-90.19,38.63],[-89.5,37.4],[-89.2,37.0],[-89.5,36.0]],[[-90.95,41.2]]],
 ["Missouri",[[-96.2,41.7],[-96.0,41.4],[-95.9,41.25],[-95.6,40.4],[-94.85,39.77],[-94.6,39.12],[-93.9,39.2],[-92.9,39.05],[-92.2,38.6],[-91.4,38.7],[-90.2,38.8]],[[-93.1,39.25]]],
 ["Ohio",[[-80.0,40.45],[-80.9,39.7],[-81.6,39.3],[-82.6,38.6],[-83.6,38.65],[-84.5,39.1],[-85.8,38.25],[-86.6,37.9],[-87.6,37.95],[-88.4,37.4],[-89.2,37.0]],[[-85.6,37.9]]]]};
const LABELS={east:[["LAKE MICHIGAN",-87.0,43.9],["LAKE ERIE",-81.0,42.0],["LAKE ONTARIO",-77.6,43.75],["MISSOURI",-92.6,38.4],["ILLINOIS",-89.6,39.6],["IOWA",-93.4,42.0],["INDIANA",-86.3,39.9],["OHIO",-82.8,40.0],["PENNSYLVANIA",-77.6,40.7],["NEW YORK",-75.3,42.9],["Mississippi R.",-90.7,41.9],["Missouri R.",-94.0,39.0],["Ohio R.",-84.6,38.7]],arabia:[["Red Sea",38.2,21.0],["ARABIA",45.5,24.0],["Arabian Sea",56.5,14.5],["Persian Gulf",51.2,27.4],["EGYPT",30.8,27.0]],sinai:[["Mediterranean Sea",33.4,32.1],["Dead Sea",35.95,31.35],["SINAI",33.8,29.6],["Red Sea",34.3,27.75],["ARABIA",36.9,28.9],["EGYPT",32.9,30.8]],holy:[["Mediterranean Sea",34.45,32.3],["Sea of Galilee",35.62,32.655],["Dead Sea",35.86,31.5],["DECAPOLIS",36.15,32.5],["PEREA (beyond Jordan)",35.95,31.95]],ne:[["Mediterranean Sea",32.0,33.0],["Persian Gulf",49.3,28.3],["Arabian Desert",40.2,30.4],["EGYPT",30.6,28.4],["ASSYRIA",43.6,37.6],["MEDIA",47.8,35.9]],
 us:[["MISSOURI",-92.4,38.0],["ILLINOIS",-89.4,40.4],["IOWA",-93.6,41.2],["KANSAS",-95.6,38.2]]};
RIVERS.east=RIVERS.us;
const BASE_OF=k=>PL[k][1]<0?"us":"ne";
function prjB(B,lon,lat){const x=(lon+180)/360*B.N,y=(1-Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))/Math.PI)/2*B.N;return [((x-B.x0)*B.s).toFixed(1),((y-B.y0)*B.s).toFixed(1)];}
// Fit a map to the places it is about. Uses the closer Holy Land base when everything fits on it.
const LL=k=>[PL[k][1],PL[k][2]];
function inBase(B,lon,lat){const c=prjB(B,lon,lat).map(Number);return c[0]>=20&&c[1]>=20&&c[0]<=B.W-20&&c[1]<=B.H-20;}
function fitPts(m){let a=(m.hi||[]).map(LL);if(m.route)a=a.concat(ROUTES[m.route]);if(m.route2)a=a.concat(ROUTES[m.route2]);(m.regions||[]).forEach(k=>a=a.concat(RG[k][1]));
  if(m.area){const r=AREAS[m.area];a.push([r[1]-r[3],r[2]-r[3]],[r[1]+r[3],r[2]+r[3]]);}return a;}
function mapFig(svg,m){return `<figure class="mapfig"><button class="map-open" data-mapzoom aria-label="Enlarge map">${svg}<span class="map-hint">Tap to enlarge</span></button>${m.cap?`<figcaption>${esc(m.cap)}</figcaption>`:""}</figure>`;}
function mapSVG(m){if(m.plan)return mapFig(PLANS[m.plan](m),m);
  const fp=fitPts(m);let bk=m.base;if(!bk){const fits=k=>fp.length&&fp.every(p=>p[0]>0&&inBase(BASES[k],p[0],p[1]));bk=fits("holy")?"holy":fits("sinai")?"sinai":(fp.some(p=>p[0]<0)?"us":"ne");}
  const B=BASES[bk],P=(lon,lat)=>prjB(B,lon,lat),pts=a=>a.map(p=>P(p[0],p[1]).join(" ")).join(" L");
  let vx=0,vy=0,vw=B.W,vh=B.H,z=1;
  if(fp.length){const c=fp.map(p=>P(p[0],p[1]).map(Number));let x0=Math.min(...c.map(p=>p[0])),x1=Math.max(...c.map(p=>p[0])),y0=Math.min(...c.map(p=>p[1])),y1=Math.max(...c.map(p=>p[1]));
    const minZ=bk==="holy"?0.42:bk==="sinai"?0.5:bk==="us"?0.45:bk==="east"?0.3:0.3;const pad=1.5;
    z=Math.max(minZ,Math.min(1,Math.max((x1-x0)*pad/B.W,(y1-y0)*pad/B.H,(x1-x0+B.W*0.12)/B.W,(y1-y0+B.H*0.12)/B.H)));
    if(m.zoom)z=m.zoom;vw=B.W*z;vh=B.H*z;const cx=(x0+x1)/2,cy=(y0+y1)/2;vx=Math.max(0,Math.min(B.W-vw,cx-vw/2));vy=Math.max(0,Math.min(B.H-vh,cy-vh/2));}
  const zt=z*(bk==="holy"?0.72:bk==="sinai"?0.62:bk==="arabia"?0.62:1);
  const Z=n=>+(n*zt).toFixed(1),dash=(a,b)=>`stroke-dasharray="${Z(a)} ${Z(b)}"`;
  let s=`<svg class="map" viewBox="${vx.toFixed(1)} ${vy.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}" style="--z:${zt.toFixed(3)}" role="img" aria-label="${esc(m.cap||"Map")}"><image href="${B.img}" width="${B.W}" height="${B.H}"/>`;
  RIVERS[bk].forEach(([n,p])=>{s+=`<path d="M${pts(p)}" class="m-river"/>`;});
  (m.regions||[]).forEach(k=>{s+=`<path d="M${pts(RG[k][1])}Z" class="m-region" ${dash(16,10)}/>`;});
  if(m.area){const a=AREAS[m.area],c=P(a[1],a[2]);s+=`<circle cx="${c[0]}" cy="${c[1]}" r="${a[3]*B.s*B.N/360}" class="m-area" ${dash(16,10)}/>`;}
  if(m.route){s+=`<path d="M${pts(ROUTES[m.route])}" class="m-route" ${dash(22,14)}/>`;}if(m.route2){s+=`<path d="M${pts(ROUTES[m.route2])}" class="m-route" ${dash(22,14)}/>`;}
  RIVERS[bk].forEach(([n,p,ls])=>{const l=(ls||[])[0];if(l){const c=P(l[0],l[1]);s+=`<text x="${c[0]}" y="${c[1]}" class="m-rl">${n}</text>`;}});
  LABELS[bk].forEach(([n,lon,lat])=>{const c=P(lon,lat);s+=`<text x="${c[0]}" y="${c[1]}" class="m-lbl" text-anchor="middle">${n}</text>`;});
  (m.regions||[]).forEach(k=>{const p=RG[k][1];const cx=p.reduce((a,b)=>a+b[0],0)/p.length,cy=p.reduce((a,b)=>a+b[1],0)/p.length;const c=P(cx,cy);
    const dy=Z({judah:90,chaldea:110,babylonia:-70,galilee:bk==="holy"?70:-60,judea:40,samaria:0}[k]||0);s+=`<text x="${c[0]}" y="${+c[1]+dy}" class="m-rgl" text-anchor="middle">${RG[k][0]}</text>`;});
  if(m.area){const a=AREAS[m.area],c=P(a[1],a[2]);s+=`<text x="${+c[0]+Z(20)}" y="${+c[1]+Z(90)}" class="m-rgl area" text-anchor="middle">${a[0]}</text>`;}
  const hi=new Set(m.hi||[]);const LEFT=new Set(bk==="holy"?["nazareth","bethlehem","jerusalem","beatitudes"]:bk==="arabia"?["bountiful"]:["jerusalem","damascus","commerce","shechem","capernaum","independence"]);const DY=bk==="holy"?{capernaum:30,jericho:10,jerusalem:-6,bethlehem:30,beatitudes:-30}:{lemuel:40,farwest:-14,independence:30,liberty:40};
  CONTEXT[bk].concat(m.hi||[]).filter((k,i,a)=>a.indexOf(k)===i).forEach(k=>{const [n,lon,lat]=PL[k],c=P(lon,lat),H=hi.has(k);
    const left=LEFT.has(k);const dx=Z(left?-16:16),anc=left?"end":"start";
    s+=H?`<circle cx="${c[0]}" cy="${c[1]}" r="${Z(34)}" class="m-ring"/><circle cx="${c[0]}" cy="${c[1]}" r="${Z(15)}" class="m-pin"/><text x="${+c[0]+dx*2.8}" y="${+c[1]+Z(-22+(DY[k]||0))}" class="m-pl hi" text-anchor="${anc}">${n}</text>`
       :`<circle cx="${c[0]}" cy="${c[1]}" r="${Z(8)}" class="m-dot"/><text x="${+c[0]+dx*1.3}" y="${+c[1]+Z(12+(DY[k]||0))}" class="m-pl" text-anchor="${anc}">${n}</text>`;});
  s+=`</svg>`;return mapFig(s,m);}

// A plan of Jerusalem about 600 BC (Lehi's day). Terrain is modeled from the known hills and valleys; walls follow the usual archaeological reconstruction. All approximate.
const PLANS={jerusalem(m){const X=lon=>+((lon-35.2245)*37840).toFixed(1),Y=lat=>+((31.7840-lat)*44360).toFixed(1),
  pp=a=>a.map(p=>X(p[0])+" "+Y(p[1])).join(" L"),
  T=(lon,lat,t,c,a)=>`<text x="${X(lon)}" y="${Y(lat)}" class="${c}" text-anchor="${a||"middle"}">${t}</text>`;
  const today=[[35.2263,31.7793],[35.2275,31.7802],[35.2302,31.7815],[35.2338,31.7823],[35.2375,31.7816],[35.2373,31.7795],[35.2369,31.7757],[35.2335,31.7745],[35.2297,31.7738],[35.2276,31.7748],[35.2272,31.7767]];
  const wall=[[35.2368,31.7798],[35.2343,31.7799],[35.2327,31.7776],[35.2312,31.7764],[35.2290,31.7763],[35.2281,31.7745],[35.2284,31.7722],[35.2303,31.7704],[35.2338,31.7697],[35.2357,31.7704],[35.2365,31.7724],[35.2367,31.7750],[35.2370,31.7772]];
  const tunnel=[[35.2365,31.7734],[35.2360,31.7727],[35.2353,31.7720],[35.2351,31.7712],[35.2347,31.7707]];
  const towers=wall.map(p=>`<rect x="${X(p[0])-5}" y="${Y(p[1])-5}" width="10" height="10" class="p-tower"/>`).join("");
  const court=[[35.2343,31.7797],[35.2367,31.7797],[35.2367,31.7768],[35.2343,31.7768]];
  return `<svg class="map plan" viewBox="0 0 680 800" role="img" aria-label="${esc(m.cap||"Plan of Jerusalem")}">
  <image href="${JER_BG}" width="680" height="800" preserveAspectRatio="none"/>
  <path d="M${pp(today)}Z" class="p-today"/>
  <path d="M${pp(wall)}Z" class="p-city"/>
  <path d="M${pp(court)}Z" class="p-court"/>
  <rect x="${X(35.23545)-12}" y="${Y(31.77825)-5}" width="24" height="10" class="p-temple"/><rect x="${X(35.2359)-3}" y="${Y(31.7782)-3}" width="6" height="6" class="p-altar"/>
  <path d="M${pp(wall)}Z" class="p-wall"/><path d="M${pp(wall)}Z" class="p-wall2"/>${towers}
  <path d="M${X(35.2309)} ${Y(31.7761)} L${X(35.2323)} ${Y(31.7768)}" class="p-broad"/>
  <path d="M${pp(tunnel)}" class="p-tunnel"/>
  <circle cx="${X(35.2365)}" cy="${Y(31.7734)}" r="6" class="p-spring"/><circle cx="${X(35.2346)}" cy="${Y(31.7705)}" r="7" class="p-spring"/>
  ${T(35.2355,31.7801,"THE TEMPLE","p-lb cap")}
  ${T(35.2357,31.7760,"Ophel","p-lb it")}
  ${T(35.2374,31.7742,"CITY OF DAVID","p-lb cap","start")}
  ${T(35.2302,31.7744,"SECOND QUARTER","p-lb cap")}${T(35.2302,31.7738,"the western hill (2 Kings 22:14)","p-lb sm")}
  ${T(35.2320,31.7756,"Broad Wall","p-lb sm")}
  ${T(35.2373,31.7731,"Gihon Spring","p-lb sm","start")}${T(35.2364,31.7716,"Hezekiah's tunnel","p-lb sm it2","start")}
  ${T(35.2341,31.7699,"Pool of Siloam","p-lb sm","end")}
  <text transform="translate(${X(35.2393)} ${Y(31.7790)}) rotate(84)" class="p-vl" text-anchor="middle">Kidron Valley</text>
  <text transform="translate(${X(35.2254)} ${Y(31.7790)}) rotate(-74)" class="p-vl" text-anchor="middle">Hinnom Valley</text>
  <text transform="translate(${X(35.2317)} ${Y(31.7808)}) rotate(-62)" class="p-vl" text-anchor="middle">Central Valley</text>
  ${T(35.2412,31.7818,"MOUNT OF","p-lb cap")}${T(35.2412,31.7811,"OLIVES →","p-lb cap")}
  <g transform="translate(640 34)"><circle r="17" fill="rgba(250,244,228,.85)" stroke="#6b5434" stroke-width="1"/><path d="M0 -13 L5 4 L0 1 L-5 4Z" fill="#3b2f1e"/><text y="13" class="p-lb sm" text-anchor="middle" style="font-weight:700">N</text></g>
  <g transform="translate(22 664)" class="p-key"><rect x="0" y="0" width="246" height="120" rx="8"/>
   <path d="M14 22 H44" class="p-wall"/><path d="M14 22 H44" class="p-wall2"/><text x="54" y="26">City wall, about 600 BC</text>
   <path d="M14 44 H44" class="p-today"/><text x="54" y="48">Old City wall today</text>
   <path d="M14 66 H44" class="p-tunnel"/><text x="54" y="70">Water tunnel cut by King Hezekiah</text>
   <text x="14" y="92" class="it">Laban's house: location unknown</text>
   <path d="M14 108 H54" stroke="#3b2f1e" stroke-width="2"/><path d="M14 104 V112 M54 104 V112" stroke="#3b2f1e" stroke-width="1.5"/><text x="62" y="112" class="sm">100 m</text></g>
  </svg>`;}};
document.addEventListener("click",e=>{const b=e.target.closest("[data-mapzoom]");if(b){const f=b.closest(".mapfig");const o=document.createElement("div");o.className="map-overlay";
  o.innerHTML=`<div class="mo-in">${b.querySelector("svg").outerHTML}${f.querySelector("figcaption")?`<p>${f.querySelector("figcaption").innerHTML}</p>`:""}<button class="btn primary" data-mapclose>Close map</button></div>`;document.body.appendChild(o);return;}
  if(e.target.closest("[data-mapclose]")||e.target.classList.contains("map-overlay"))document.querySelectorAll(".map-overlay").forEach(x=>x.remove());});
const EXILE_CAP="Daniel was taken about 900 miles (1,400 km) from Jerusalem to Babylon. Travelers went north around the Arabian Desert, then down the Euphrates. Ezra's trip on the same road took about four months (Ezra 7:9).";
const FRIENDS_MAP={route:"exile",hi:["jerusalem","babylon"],cap:"Taken with Daniel from Judah to Babylon, about 900 miles. The dashed line shows the usual road around the desert."};
const LEHI_MAP={route:"lehi",hi:["jerusalem","aqaba","lemuel"],cap:"Lehi's family traveled south toward the Red Sea, then three more days to the valley they named Lemuel. The route and the valley's location are proposals; the exact places are not known."};
const MO_MAP={base:"us",route:"exodus1839",hi:["liberty","farwest","quincy"],cap:"Joseph Smith was held in the jail at Liberty, Missouri, from December 1838 to April 1839, while the Saints left Far West and crossed the state to Quincy, Illinois."};
const ABR_MAP={route:"abraham",hi:["ur","haran","shechem","egypt"],cap:"Abraham's journey: from Ur to Haran, into Canaan through Shechem and Bethel, and on to Egypt. Ur is shown at its traditional site in southern Iraq; some scholars place it farther north."};
const TERM_MAPS={__OLD__,
 zedekiah:{hi:["jerusalem","babylon"],regions:["judah"],cap:"Zedekiah ruled Judah from Jerusalem under Babylon until the city fell in 586 BC."},
 lehi:LEHI_MAP,redsea:LEHI_MAP,lamanriver:LEHI_MAP,chaldeans_abr:{hi:["ur"],regions:["chaldea"],cap:"Chaldea was the southern part of Mesopotamia, near the Persian Gulf. Ur is shown at its traditional site."},lemuelvalley:LEHI_MAP,laman:LEHI_MAP,lemuel:LEHI_MAP,
 gehenna:{base:"holy",hi:["jerusalem"],cap:"The Valley of Hinnom runs along the south and west sides of the old city of Jerusalem."},
 missouri:MO_MAP,
 ur:{hi:["ur","haran"],regions:["chaldea"],cap:"The traditional site of Ur is in southern Iraq, near the Euphrates. Some scholars argue for a northern Ur nearer Haran."},
 haran:{hi:["haran","ur"],route:"abraham",cap:"Haran lay in northern Mesopotamia, on the main road between Ur and Canaan."},
 egypt:ABR_MAP,pharaoh:{hi:["egypt"],cap:"Egypt, centered on the Nile Delta and the river valley to the south."},sarai:ABR_MAP,
 terah:{hi:["ur","haran"],route:"abraham",cap:"Terah went with Abraham from Ur as far as Haran."}};
const CH_MAPS={"dan.1":{route:"exile",hi:["jerusalem","babylon","carchemish"],regions:["judah","babylonia"],cap:"605 BC: Nebuchadnezzar beat Egypt at Carchemish, took control of Judah, and carried Daniel and other young nobles about 900 miles to Babylon."},
 "dan.2":{hi:["babylon"],regions:["babylonia"],cap:"Daniel 2 takes place at the royal court in Babylon, capital of the empire."},
 "dan.3":{hi:["babylon"],area:"dura",cap:"The golden image stood on the plain of Dura in the province of Babylon. The exact site is unknown; the circle shows the general area."},
 "mat.5":{base:"holy",hi:["beatitudes"],regions:["galilee","samaria","judea"],cap:"The traditional site of the Sermon on the Mount is a hillside above the north shore of the Sea of Galilee, near Capernaum and about 75 miles (120 km) north of Jerusalem. The exact spot is unknown. The crowds came from Galilee, the Decapolis, Jerusalem, Judea and beyond the Jordan (Matthew 4:25)."},
 "1ne.1":{plan:"jerusalem",cap:"Jerusalem about 600 BC. One wall held the temple, the old City of David, and a newer quarter on the western hill. Lehi lived here, but where his house stood is not known. The dashed gray line shows today's Old City walls for comparison; the older lines are approximate."},
 "1ne.2":LEHI_MAP,"1ne.3":{...LEHI_MAP,cap:"Nephi and his brothers traveled back from the valley of Lemuel to Jerusalem for the plates of brass, a journey of well over 200 miles each way."},
 "dc.121":MO_MAP,"abr.1":{hi:["ur"],regions:["chaldea"],cap:"Abraham grew up in Ur of the Chaldees, shown at its traditional site in southern Iraq. Some scholars argue for a northern Ur, and the plain of Olishem has not been located with certainty."},
 "abr.2":ABR_MAP,"abr.3":{...ABR_MAP,cap:"Abraham received the vision of the stars before he went down into Egypt (Abraham 3:15)."}};
CH_MAPS["mat.6"]=CH_MAPS["mat.7"]=CH_MAPS["mat.5"];CH_MAPS["1ne.4"]={plan:"jerusalem",cap:"1 Nephi 4 happens in one night inside Jerusalem. Nephi went in toward Laban's house while his brothers hid outside the walls (1 Nephi 4:5). Laban's house and treasury have not been found. The city is shown as it stood about 600 BC; lines are approximate."};CH_MAPS["dc.122"]=CH_MAPS["dc.123"]=MO_MAP;

const GAL_MAP={base:"holy",hi:["capernaum","nazareth"],regions:["galilee"],cap:"Most of Jesus' ministry took place in Galilee, around the Sea of Galilee. Capernaum, on its north shore, was His home base (Matthew 4:13; 9:1)."};
const NTJ_MAP={base:"holy",hi:["jerusalem","bethany"],regions:["judea"],cap:"Jesus' last week was spent in Jerusalem. Each night He went out to Bethany, about two miles east over the Mount of Olives (Matthew 21:17)."};
const ARABIA_MAP={base:"arabia",route:"arabia",hi:["jerusalem","lemuel","nahom"],cap:"After the valley of Lemuel the family traveled south-southeast near the Red Sea to Shazer and on to Nahom, where Ishmael was buried (1 Nephi 16:13–34). Ancient altars from Yemen name a tribe NHM in this region. The dashed line is a likely route, not a known one."};
const BOUNTIFUL_MAP={base:"arabia",route:"arabia",route2:"arabia2",hi:["jerusalem","nahom","bountiful"],cap:"From Nahom the family turned “nearly eastward” (1 Nephi 17:1) and after eight years in the wilderness reached Bountiful by the sea. Researchers point to the Dhofar coast of southern Oman, but the exact place is not known."};
const HOS_MAP={base:"holy",hi:["samaria","bethel","gilgal","jerusalem"],cap:"Hosea preached in the northern kingdom of Israel, whose capital was Samaria. Golden calves stood at Bethel, and Gilgal had become a center of false worship. Assyria destroyed the kingdom in 722 BC."};
const JOEL_MAP={base:"holy",hi:["jerusalem"],regions:["judea"],cap:"Joel calls the people to gather at the temple in Jerusalem (Zion) to fast and pray (Joel 2:15–17)."};
Object.assign(CH_MAPS,{"hos.1":HOS_MAP,"hos.2":HOS_MAP,"hos.4":HOS_MAP,"hos.5":HOS_MAP,"hos.8":HOS_MAP,"hos.9":HOS_MAP,"hos.10":HOS_MAP,"hos.12":HOS_MAP,"hos.13":HOS_MAP,"joel.1":JOEL_MAP,"joel.2":JOEL_MAP});
Object.assign(CH_MAPS,{
 "dan.4":{hi:["babylon"],regions:["babylonia"],cap:"Nebuchadnezzar rebuilt Babylon on a grand scale, with huge walls, palaces and the Ishtar Gate (Daniel 4:30)."},
 "dan.5":{hi:["babylon","susa"],regions:["babylonia"],cap:"Babylon fell to the Persian army of Cyrus in October 539 BC. Persia's heartland lay to the east, beyond Susa."},
 "dan.6":{hi:["babylon","jerusalem"],regions:["babylonia"],cap:"Daniel prayed with his windows open toward Jerusalem, about 500 miles away in a straight line across the desert (Daniel 6:10)."},
 "dan.8":{hi:["susa","babylon"],cap:"In vision Daniel saw himself at Shushan (Susa), a Persian royal city about 220 miles east of Babylon, by the river Ulai (Daniel 8:2)."},
 "dan.9":{hi:["babylon","jerusalem"],cap:"Daniel prayed in Babylon for the city of Jerusalem and the ruined temple (Daniel 9:16–19)."},
 "dan.10":{hi:["babylon"],cap:"Daniel received this vision beside the Hiddekel, the Tigris River (Daniel 10:4)."},
 "mat.2":{hi:["bethlehem","jerusalem","nazareth","egypt"],cap:"The wise men came to Jerusalem and then to Bethlehem. Joseph took Mary and Jesus to Egypt, and later the family settled in Nazareth in Galilee (Matthew 2:13–23)."},
 "mat.3":{base:"holy",hi:["jerusalem","bethabara"],regions:["judea"],cap:"John preached in the wilderness of Judea and baptized in the Jordan. The traditional site of Jesus' baptism is on the Jordan near Jericho; 1 Nephi 10:9 calls it Bethabara."},
 "mat.4":{base:"holy",hi:["nazareth","capernaum"],regions:["galilee"],cap:"Jesus left Nazareth and made Capernaum on the Sea of Galilee His home (Matthew 4:13). He called His first disciples from their fishing boats there."},
 "mat.8":{base:"holy",hi:["capernaum","kursi"],regions:["galilee"],cap:"Jesus healed in Capernaum, crossed the Sea of Galilee in a storm, and landed on the eastern shore in the country of the Gergesenes (Matthew 8:28). Kursi is a traditional site."},
 "mat.9":GAL_MAP,"mat.11":GAL_MAP,"mat.13":GAL_MAP,"mat.14":GAL_MAP,
 "mat.15":{base:"holy",hi:["tyre","capernaum"],regions:["galilee"],cap:"The woman of Canaan came from the coasts of Tyre and Sidon, Gentile cities on the Mediterranean north of Galilee (Matthew 15:21–22). Sidon lies about 25 miles beyond Tyre."},
 "mat.16":{base:"holy",hi:["caesareaphilippi","capernaum"],regions:["galilee"],cap:"Peter testified that Jesus is the Christ near Caesarea Philippi, at the foot of Mount Hermon by one of the springs of the Jordan (Matthew 16:13)."},
 "mat.17":{base:"holy",hi:["tabor","caesareaphilippi"],regions:["galilee"],cap:"The “high mountain” of the Transfiguration is not named. Tradition points to Mount Tabor; others suggest Mount Hermon, near Caesarea Philippi."},
 "mat.19":{base:"holy",hi:["jericho","jerusalem"],regions:["galilee","judea"],cap:"Jesus left Galilee for the last time and traveled toward Judea by way of the region beyond the Jordan (Matthew 19:1)."},
 "mat.20":{base:"holy",hi:["jericho","jerusalem"],regions:["judea"],cap:"From Jericho the road climbs about 3,500 feet in 15 miles to Jerusalem. Jesus healed two blind men as He left Jericho (Matthew 20:29–34)."},
 "mat.21":NTJ_MAP,"mat.22":NTJ_MAP,"mat.23":NTJ_MAP,"mat.24":NTJ_MAP,"mat.25":NTJ_MAP,"mat.26":NTJ_MAP,"mat.27":NTJ_MAP,
 "mat.28":{base:"holy",hi:["jerusalem","capernaum"],regions:["galilee","judea"],cap:"The women found the empty tomb in Jerusalem. The risen Lord then met the eleven on a mountain in Galilee (Matthew 28:16)."},
 "1ne.5":LEHI_MAP,"1ne.7":{...LEHI_MAP,cap:"Lehi's sons made a second trip back to Jerusalem, this time to bring Ishmael's family into the wilderness."},
 "1ne.8":{...LEHI_MAP,cap:"Lehi received his dream of the tree of life while the family was camped in the valley of Lemuel."},
 "1ne.16":ARABIA_MAP,"1ne.17":BOUNTIFUL_MAP,"1ne.18":{...BOUNTIFUL_MAP,cap:"The family sailed from Bountiful. Nephi does not describe the route across the ocean to the promised land."}});

// ---- Family Come, Follow Me: a short reading and question for each day, sized for your children's ages ----
const FAM_AGES=[["Ages 3–7","little"],["Ages 8–11","kids"],["Ages 12–17","teens"],["Adults","adults"]];
const GL_SLUG={Daniel:"ot/dan",Hosea:"ot/hosea",Joel:"ot/joel",Amos:"ot/amos",Obadiah:"ot/obad",Jonah:"ot/jonah",Micah:"ot/micah",Nahum:"ot/nahum",Habakkuk:"ot/hab",Zephaniah:"ot/zeph",Haggai:"ot/hag",Zechariah:"ot/zech",Malachi:"ot/mal",Isaiah:"ot/isa",Luke:"nt/luke"};
// Videos from the Church's own media library, matched to a day's reading. Checked against each video's page.
// Videos from the Church's own YouTube channels only. Each one checked against the channel that posted it.
// kids:1 = made for children, so it is not shown to the Adults group.
const FAM_VID={"2026-11-15":["Daniel and the Lions\u2019 Den","t_DpVR6kkHo","Gospel For Kids",1],
 "2026-11-27":["Jonah the Prophet","vV_yB8_RiFA","Gospel For Kids",1]};
let FAM_OFF=0,FAM_ALL=false;
const isoDay=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
function famDay(){const t=new Date();t.setDate(t.getDate()+FAM_OFF);const iso=isoDay(t);return {iso,date:t,day:FAM.find(x=>x.d===iso)};}
function famHTML(){if(typeof FAM==="undefined")return "";const {iso,date,day}=famDay();const ai=S.famAge??1,first=FAM[0].d,last=FAM[FAM.length-1].d;
  const when=FAM_OFF===0?"Today":FAM_OFF===-1?"Yesterday":FAM_OFF===1?"Tomorrow":date.toLocaleDateString(undefined,{weekday:"long"});
  const dl=date.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  const chips=`<div class="fam-ages" role="radiogroup" aria-label="Children's ages">${FAM_AGES.map(([l],i)=>`<button role="radio" aria-checked="${i===ai}" data-famage="${i}">${l}</button>`).join("")}</div>`;
  const nav=`<div class="fam-nav"><button class="lnk" data-famnav="-1" ${iso<=first?"disabled":""}>‹ Previous day</button>${FAM_OFF?`<button class="lnk" data-famnav="0">Back to today</button>`:""}<button class="lnk" data-famnav="1" ${iso>=last?"disabled":""}>Next day ›</button></div>`;
  if(!day)return `<section class="fam"><div class="fam-head"><div><span class="eyebrow">Family Come, Follow Me</span><h2>${esc(dl)}</h2></div></div><p class="muted">Readings for this day aren't ready yet. Open this week's <a href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026?lang=eng" target="_blank" rel="noopener">Come, Follow Me lesson ↗</a>.</p>${nav}</section>`;
  const W=FAM_WEEKS[day.w],a=day.a[ai],book=a.r.replace(/\s[\d:–,;\s]+$/,""),c=a.v[0][0];
  const inJoined=Object.entries(BOOKS).find(([k,B])=>B.name===book||bname(k)===book),jk=inJoined&&inJoined[1].chs.includes(c)?inJoined[0]:null;
  const read=jk?`<a class="btn" href="#${jk}-${c}">Read ${esc(book)} ${c} in Joined</a>`:`<a class="btn" href="https://www.churchofjesuschrist.org/study/scriptures/${GL_SLUG[book]||""}/${c}?lang=eng" target="_blank" rel="noopener">Read ${esc(book)} ${c} ↗</a>`;
  const vs=FAM_ALL||a.v.length<=4?a.v:a.v.slice(0,3);let lastC=null;
  const verses=vs.map(([cc,v,t])=>{const lab=(lastC!==null&&cc!==lastC)||(lastC===null&&a.v.some(x=>x[0]!==cc))?`${cc}:${v}`:v;lastC=cc;return `<p><b>${lab}</b> ${esc(t)}</p>`;}).join("");
  return `<section class="fam" aria-label="Family Come, Follow Me">
   <div class="fam-head"><div><span class="eyebrow">Family Come, Follow Me</span><p class="fam-date">${FAM_OFF===0||Math.abs(FAM_OFF)===1?`<b>${esc(when)}</b> · `:""}${esc(dl)}</p><h2>${esc(day.t)}</h2>
    <p class="fam-wk">This week: ${esc(W.b)} · <a href="${W.u}" target="_blank" rel="noopener">${esc(W.t)} ↗</a></p></div></div>
   ${chips}
   <div class="fam-ctx"><div class="fam-lbl">Before you read</div><p>${esc(ai<2?day.ck:day.cf)}</p>${day.wd?`<p class="fam-word"><span class="fw-k">Word to know</span> <b>${esc(day.wd[0])}</b> · <span class="fw-h" lang="${day.wd[3]==="Aramaic"?"arc":"he"}" dir="rtl">${day.wd[1]}</span> <i>${esc(day.wd[2])}</i> (${esc(day.wd[3])}): ${esc(day.wd[4])}</p>`:""}</div>
   <div class="fam-body"><div class="fam-read"><div class="fam-lbl">Read together · ${esc(a.r)}</div><div class="fam-vs">${verses}</div>
     ${a.v.length>4?`<button class="lnk" data-famall>${FAM_ALL?"Show less":`Show all ${a.v.length} verses`}</button>`:""}</div>
    <div class="fam-talk"><div class="fam-lbl">Talk about it</div><p class="fam-q">${esc(a.q)}</p>${a.act?`<div class="fam-lbl">Try this</div><p class="fam-act">${esc(a.act)}</p>`:""}${FAM_VID[day.d]&&!(FAM_VID[day.d][3]&&ai===FAM_AGES.length-1)?ytCard(FAM_VID[day.d]):""}${read}</div></div>
   ${nav}</section>`;}
function renderFam(){const el=$(".fam");if(el)el.outerHTML=famHTML();const rb=$(".fam-extra");if(rb)rb.innerHTML=readBox();}
document.addEventListener("click",e=>{const b=e.target.closest("[data-famage],[data-famnav],[data-famall]");if(!b)return;const d=b.dataset;
  if(d.famage!==undefined){S.famAge=+d.famage;FAM_ALL=false;save();}
  else if(d.famnav!==undefined){FAM_OFF=+d.famnav===0?0:FAM_OFF+(+d.famnav);FAM_ALL=false;}
  else if("famall" in d)FAM_ALL=!FAM_ALL;
  renderFam();});

// Home page: one tap to today's family lesson. The full lesson has its own page.
function famButton(){if(typeof FAM==="undefined")return "";const t=new Date(),iso=isoDay(t),day=FAM.find(x=>x.d===iso),ai=S.famAge??1;
  const dl=t.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});
  return `<a class="fambtn" href="#family"><span class="fb-l"><span class="eyebrow">Family Come, Follow Me</span><strong>${day?esc(day.t):"Today's family lesson"}</strong>
   <span class="fb-s">Today · ${esc(dl)}${day?` · ${esc(FAM_AGES[ai][0])} · ${esc(day.a[ai].r)}`:""}</span><span class="fb-w">${weekDots(t)}</span></span><span class="btn primary">Open today's lesson →</span></a>`;}
function renderFamily(){FAM_ALL=false;$("#reader").innerHTML=`<div class="home3"><a class="back" href="#home">← Home</a>${famHTML()}<div class="fam-extra">${readBox()}</div>${homeFoot()}</div>`;}

// ---- Days read this week (Monday to Sunday) ----
const SITE_URL="https://joined-3adda.web.app/";
function weekDays(ref){const d=new Date(ref);const dow=(d.getDay()+6)%7;d.setDate(d.getDate()-dow);return [...Array(7)].map((_,i)=>{const x=new Date(d);x.setDate(d.getDate()+i);return x;});}
const famDone=iso=>!!(S.famRead&&S.famRead[iso]);
function weekDots(ref,big){const days=weekDays(ref),today=isoDay(new Date()),n=days.filter(x=>famDone(isoDay(x))).length;
  return `<span class="wdots${big?" big":""}" aria-label="${n} of 7 days read this week">${days.map(x=>{const iso=isoDay(x);return `<span class="wd${famDone(iso)?" wd-on":""}${iso===today?" wd-now":""}" title="${x.toLocaleDateString(undefined,{weekday:"long"})}">${"MTWTFSS"[(x.getDay()+6)%7]}</span>`;}).join("")}</span><span class="wcount">${n} of 7 days this week</span>`;}
function readBox(){const {iso,date}=famDay(),done=famDone(iso),future=iso>isoDay(new Date());
  return `<div class="famread"><div class="fr-dots">${weekDots(date,true)}</div>${future?"":`<button class="btn${done?"":" primary"}" data-famread="${iso}">${done?"✓ Read together":"We read today"}</button>`}</div>
   <div class="famrem" id="famrem">${remHTML()}</div>`;}
document.addEventListener("click",async e=>{const r=e.target.closest("[data-famread]");
  if(r){S.famRead=S.famRead||{};const iso=r.dataset.famread;if(S.famRead[iso])delete S.famRead[iso];else{S.famRead[iso]=Date.now();toast("Nice work. Marked as read.");}save();renderFam();}
});

// ---- Daily reminder notifications (Firebase Cloud Messaging) ----
const VAPID="BC8khuQwDiUI_kEpGEqcq6XHaBSyYgFCTCnPFp3YGzWBPXE6i_o51htVAb43prIunAvdUx9_LxbCJ7ZtQdxU15k"; // Web Push key from Firebase: Project settings > Cloud Messaging > Web Push certificates
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const isStandalone=()=>window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const fmtTime=t=>{const [h,m]=t.split(":").map(Number);return new Date(2000,0,1,h,m).toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});};
function remHTML(){const t=S.famTime||"19:30";
  if(isIOS&&!isStandalone())return `<span><b>Daily reminders:</b> on iPhone, first add Joined to your Home Screen (tap Share, then <i>Add to Home Screen</i>), then open it from there.</span>`;
  if(!("Notification" in window)||!("serviceWorker" in navigator))return `<span>This browser can't show reminders. Try Chrome, or Safari on an iPhone with Joined on your Home Screen.</span>`;
  if(typeof PUBLIC_SITE!=="undefined"&&!PUBLIC_SITE)return `<span>Daily reminders work on the public Joined site.</span>`;
  if(!ACC.user)return `<span>Get a reminder every day to read together.</span><button class="btn" data-acct>Sign in to turn on</button>`;
  if(S.famRemOn)return `<span>🔔 Daily reminder on at <b>${esc(fmtTime(t))}</b></span><input type="time" id="famtime" value="${esc(t)}" aria-label="Reminder time"><button class="lnk" data-remoff>Turn off</button>`;
  return `<span>Remind me every day at</span><input type="time" id="famtime" value="${esc(t)}" aria-label="Reminder time"><button class="btn primary" data-remon>Turn on reminders</button>`;}
const renderRem=()=>{const el=$("#famrem");if(el)el.innerHTML=remHTML();};
async function remRef(){if(!await fbLoad()||!ACC.user)throw new Error("signin");return fbDb.doc(`users/${ACC.user.uid}/reminder/main`);}
async function remOn(){const t=($("#famtime")||{}).value||"19:30";
  try{if(!VAPID)throw new Error("nokey");const perm=await Notification.requestPermission();if(perm!=="granted"){toast("Notifications are turned off for this site. You can allow them in your settings.");return;}
    await fbLoad();await loadAny(FB_CDN("firebase-messaging-compat.js"));
    const reg=await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    const token=await firebase.messaging().getToken({vapidKey:VAPID,serviceWorkerRegistration:reg});
    await (await remRef()).set({token,time:t,tz:Intl.DateTimeFormat().resolvedOptions().timeZone,on:true,last:""},{merge:true});
    S.famRemOn=true;S.famTime=t;save();renderRem();toast(`Reminder set for ${fmtTime(t)} every day`);}
  catch(e){toast(e&&e.message==="nokey"?"Reminders are almost ready. They'll turn on after the next update.":"Couldn't turn on reminders. Check your connection and try again.");}}
document.addEventListener("click",async e=>{if(e.target.closest("[data-remon]"))remOn();
  if(e.target.closest("[data-remoff]")){try{await (await remRef()).set({on:false},{merge:true});}catch(x){}S.famRemOn=false;save();renderRem();toast("Reminders turned off");}});
document.addEventListener("change",async e=>{if(e.target.id!=="famtime"||!S.famRemOn)return;const t=e.target.value;S.famTime=t;save();
  try{await (await remRef()).set({time:t,tz:Intl.DateTimeFormat().resolvedOptions().timeZone},{merge:true});toast(`Reminder moved to ${fmtTime(t)}`);renderRem();}catch(x){toast("Couldn't save the new time. Try again.");}});

// A YouTube video that plays right in the page. Shows the thumbnail until it is tapped.
function ytCard([t,id,ch]){return `<div class="fam-yt"><div class="fam-lbl">Watch together</div><button class="yt-thumb" data-yt="${id}" aria-label="Play ${esc(t)}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()"><span class="yt-play" aria-hidden="true"><svg viewBox="0 0 68 48"><path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.3.3 34 .3 34 .3s-21.3 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00"/><path d="M45 24 27 14v20z" fill="#fff"/></svg></span></button>
  <p class="yt-cap"><b>${esc(t)}</b> · ${esc(ch)} on YouTube · <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Open in YouTube ↗</a></p></div>`;}
document.addEventListener("click",e=>{const b=e.target.closest("[data-yt]");if(!b)return;const id=b.dataset.yt;
  b.outerHTML=`<div class="yt-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;});

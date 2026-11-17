// ---- Sign in and sync (Firebase) ----
// Each person's notes, highlights, books and lessons are saved to users/{uid}/data/main. Firestore rules allow only that person.
// Manual text pasted from the Church's site stays in this browser only and is never uploaded.
const FB_CONFIG={apiKey:"AIzaSyCGDINpgQLFSART1qmikrGBm_1nYh2ixug",authDomain:"joined-3adda.firebaseapp.com",projectId:"joined-3adda",
 storageBucket:"joined-3adda.firebasestorage.app",messagingSenderId:"946780758467",appId:"1:946780758467:web:43c76646d126d83bd25d76"};
const FBV="10.12.2",FB_CDN=n=>[`https://cdn.jsdelivr.net/npm/firebase@${FBV}/${n}`,`https://unpkg.com/firebase@${FBV}/${n}`];
const ACC_KEY="dsc-v1"; // app.js loads after this file, so its KEY is not ready yet here
let ACC={user:null,ready:false,err:"",busy:false},fbAuth=null,fbDb=null,pushT=null;
async function fbLoad(){if(fbAuth)return true;
  try{for(const n of ["firebase-app-compat.js","firebase-auth-compat.js","firebase-firestore-compat.js"])await loadAny(FB_CDN(n));
    if(!firebase.apps.length)firebase.initializeApp(FB_CONFIG);fbAuth=firebase.auth();fbDb=firebase.firestore();
    fbAuth.onAuthStateChanged(u=>{ACC.user=u;ACC.ready=true;try{u?localStorage.setItem(ACC_KEY+"-signedin","1"):localStorage.removeItem(ACC_KEY+"-signedin");}catch(e){}
      if(u&&ACC.welcome)closeAcct(); // already signed in from before: go straight to the app
      renderAcct();if(u)pullAndMerge();});
    try{const r=await fbAuth.getRedirectResult();if(r&&r.user)closeAcct();}catch(e){}
    return true;}catch(e){ACC.err="Sign-in couldn't load here. Check your internet connection.";return false;}}
const SYNC_KEYS=["hl","hlt","notes","marks","library","lb","lessons","famAge","famRead","famTime","famRemOn","imports"];
function syncable(){const o={};SYNC_KEYS.forEach(k=>{if(S[k]!==undefined)o[k]=S[k];});return o;}
function mergeInto(remote){ // keep everything from both sides; on a clash the newer copy wins
  const lt=S._t||0,rt=remote._t||0,newer=rt>lt?remote:S,older=rt>lt?S:remote,out={};
  out.hl={...(older.hl||{}),...(newer.hl||{})};out.hlt={...(older.hlt||{}),...(newer.hlt||{})};
  const byId=(a,b)=>{const m=new Map();(a||[]).forEach(x=>m.set(x.id||JSON.stringify(x),x));(b||[]).forEach(x=>m.set(x.id||JSON.stringify(x),x));return [...m.values()];};
  out.notes=byId(older.notes,newer.notes);out.library=byId(older.library,newer.library);
  const mk=new Map();[...(older.marks||[]),...(newer.marks||[])].forEach(x=>mk.set(`${x.ref}|${x.ver}|${x.s}|${x.e}`,x));out.marks=[...mk.values()];
  out.lb={...(older.lb||{}),...(newer.lb||{})};out.imports={...(older.imports||{}),...(newer.imports||{})};out.famRead={...(older.famRead||{}),...(newer.famRead||{})};if(newer.famTime||older.famTime)out.famTime=newer.famTime||older.famTime;if(newer.famAge!==undefined||older.famAge!==undefined)out.famAge=newer.famAge??older.famAge;out.lessons={...(older.lessons||{}),...(newer.lessons||{})};
  return out;}
async function pullAndMerge(){if(!ACC.user)return;ACC.busy=true;renderAcct();
  try{const ref=fbDb.doc(`users/${ACC.user.uid}/data/main`),snap=await ref.get();
    if(snap.exists){const d=snap.data(),remote=JSON.parse(d.s||"{}");remote._t=d.t||0;Object.assign(S,mergeInto(remote));}
    S._t=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}
    await ref.set({s:JSON.stringify(syncable()),t:S._t});ACC.err="";
    if(typeof registerImports==="function")registerImports();if(typeof route==="function")route();}
  catch(e){ACC.err="Couldn't reach your saved data. Your changes are still kept on this device."+(e&&e.code?` (${e.code})`:"");}
  ACC.busy=false;renderAcct();}
function cloudSave(){if(!ACC.user||!fbDb)return;clearTimeout(pushT);pushT=setTimeout(async()=>{
  try{await fbDb.doc(`users/${ACC.user.uid}/data/main`).set({s:JSON.stringify(syncable()),t:S._t||Date.now()});ACC.err="";}catch(e){ACC.err="Not saved to your account yet. It will try again on your next change.";}renderAcct();},1200);}
function acctLabel(){const u=ACC.user;if(!u)return "Sign in";const n=(u.displayName||u.email||"").trim();return n.split(/[ @]/)[0]||"Account";}
function renderAcct(){if(typeof renderRem==="function")renderRem();const b=$("#acctbtn"),l=$("#acctlbl");if(b){if(l)l.textContent=acctLabel();b.setAttribute("aria-label",ACC.user?"Your account":"Sign in");b.classList.toggle("on",!!ACC.user);}const o=$("#acct");if(o)o.innerHTML=acctHTML();}
const GICON=`<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1C42.7 36.7 45 31.1 45 24.5z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.5 46 24 46z"/><path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.5C3 17.1 2 20.4 2 24s1 6.9 2.5 9.9l7.3-5.7z"/><path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"/></svg>`;
// The welcome screen: shown first on the public site to anyone who isn't signed in.
function welcomeHTML(){const up=ACC.tab!=="in",ai=S.famAge??1;
  return `<div class="wl-in" role="dialog" aria-label="Welcome to Joined"><img src="${LOGO_MARK}" alt="" class="wl-mark"><h1>Joined</h1><p class="wl-tag">“They shall become one in thine hand.”</p>
   <div class="wl-card"><div class="wl-tabs" role="tablist"><button role="tab" aria-selected="${up}" data-actab="up">Create a profile</button><button role="tab" aria-selected="${!up}" data-actab="in">Sign in</button></div>
    <button class="btn ac-g" data-acgoogle>${GICON}Continue with Google</button><div class="ac-or"><span>or use email</span></div>
    <form class="ac-form" data-acform>${up?`<input id="acn" type="text" placeholder="Your name" autocomplete="name">`:""}<input id="ace" type="email" placeholder="Email" autocomplete="email" required><input id="acp" type="password" placeholder="Password (6 or more characters)" autocomplete="${up?"new-password":"current-password"}" minlength="6" required>
     ${up?`<div class="wl-ages"><span>Who reads with you?</span><div>${FAM_AGES.map(([l],i)=>`<button type="button" data-acage="${i}" aria-pressed="${i===ai}">${l}</button>`).join("")}</div></div>`:""}
     <button class="btn primary" type="submit" data-acmode="${up?"up":"in"}">${up?"Create my profile":"Sign in"}</button>${up?"":`<button type="button" class="lnk" data-acforgot>Forgot password?</button>`}</form>
    ${ACC.err?`<p class="ac-err">${esc(ACC.err)}</p>`:""}</div>
   <button class="lnk wl-skip" data-acguest>Continue without an account</button><p class="wl-fine">Free for everyone. Your profile keeps your notes, highlights, lessons and family reading days on every device.</p></div>`;}
function acctHTML(){const u=ACC.user;if(!u&&ACC.welcome)return welcomeHTML();
  if(u)return `<div class="ac-in" role="dialog" aria-label="Your account"><div class="eyebrow">Signed in</div><h2>${esc(u.displayName||u.email||"Your account")}</h2>${u.displayName&&u.email?`<p class="muted">${esc(u.email)}</p>`:""}
    <p>${ACC.busy?"Syncing…":"Your notes, highlights, books and lessons are saved to your account and show up on any device where you sign in."}</p>${ACC.err?`<p class="ac-err">${esc(ACC.err)}</p>`:""}
    <div class="row"><button class="btn" data-acsignout>Sign out</button><button class="btn primary" data-acclose>Done</button></div></div>`;
  return `<div class="ac-in" role="dialog" aria-label="Sign in"><button class="ac-x" data-acclose aria-label="Close">×</button><div class="eyebrow">Joined</div><h2>Sign in to save everywhere</h2>
    <p class="muted">Keep your notes, highlights and lessons on your phone and computer. Anything you've already saved on this device comes with you.</p>
    <button class="btn ac-g" data-acgoogle><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1C42.7 36.7 45 31.1 45 24.5z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.5 46 24 46z"/><path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.5C3 17.1 2 20.4 2 24s1 6.9 2.5 9.9l7.3-5.7z"/><path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"/></svg>Continue with Google</button>
    <div class="ac-or"><span>or use email</span></div>
    <form class="ac-form" data-acform><input id="ace" type="email" placeholder="Email" autocomplete="email" required><input id="acp" type="password" placeholder="Password (6 or more characters)" autocomplete="current-password" minlength="6" required>
    <div class="row"><button class="btn primary" type="submit" data-acmode="in">Sign in</button><button class="btn" type="submit" data-acmode="up">Create account</button></div>
    <button type="button" class="lnk" data-acforgot>Forgot password?</button></form>${ACC.err?`<p class="ac-err">${esc(ACC.err)}</p>`:""}</div>`;}
async function openAcct(welcome){let o=$("#acct");if(!o){o=document.createElement("div");o.id="acct";document.body.appendChild(o);}ACC.welcome=!!welcome;o.className=welcome?"welcome":"map-overlay";ACC.err="";o.innerHTML=acctHTML();
  if(!await fbLoad()){o.innerHTML=acctHTML();}}
function closeAcct(){const o=$("#acct");if(o)o.remove();ACC.welcome=false;document.body.classList.remove("welcoming");}
const AC_ERR={"auth/unauthorized-domain":"Sign-in isn't turned on for this web address yet. It will work on the public Joined site.","auth/operation-not-supported-in-this-environment":"Sign-in doesn't work inside this preview. It will work on the public Joined site.",
 "auth/popup-blocked":"Your browser blocked the sign-in window. Allow pop-ups for this site and try again.","auth/popup-closed-by-user":"","auth/cancelled-popup-request":"",
 "auth/invalid-credential":"That email and password don't match. Try again or reset your password.","auth/wrong-password":"That password isn't right.","auth/user-not-found":"There's no account with that email. Tap Create account.",
 "auth/email-already-in-use":"There's already an account with that email. Tap Sign in instead.","auth/weak-password":"Use at least 6 characters.","auth/invalid-email":"Check the email address.","auth/network-request-failed":"Couldn't connect. Check your internet connection.","auth/operation-not-allowed":"This way of signing in isn't turned on yet. Try another option, or continue without an account for now.","auth/too-many-requests":"Too many tries. Wait a minute and try again.","auth/missing-password":"Type a password.","auth/missing-email":"Type your email.","auth/internal-error":"Sign-in hit a snag. Please try again."};
function acFail(e){const c=(e&&e.code)||"";ACC.err=AC_ERR[c]!==undefined?AC_ERR[c]:`Something went wrong signing in. Please try again.${c?` (${c})`:""}`;renderAcct();}
document.addEventListener("click",async e=>{const b=e.target.closest("[data-acct],[data-acclose],[data-acgoogle],[data-acsignout],[data-acforgot],[data-actab],[data-acage],[data-acguest]");if(!b){if(e.target.id==="acct"&&!ACC.welcome)closeAcct();return;}
  const d=b.dataset;
  if("acct" in d)openAcct();
  else if(d.actab){ACC.tab=d.actab;ACC.err="";renderAcct();}
  else if(d.acage!==undefined){S.famAge=+d.acage;save();renderAcct();}
  else if("acguest" in d){try{localStorage.setItem(ACC_KEY+"-guest","1");}catch(x){}closeAcct();}
  else if("acclose" in d)closeAcct();
  else if("acsignout" in d){try{await fbAuth.signOut();}catch(x){}closeAcct();toast("Signed out. Your data stays saved in your account.");}
  else if("acgoogle" in d){if(!await fbLoad())return renderAcct();const p=new firebase.auth.GoogleAuthProvider();
    try{await fbAuth.signInWithPopup(p);closeAcct();toast("Signed in");}catch(x){if(x&&x.code==="auth/popup-blocked"){try{await fbAuth.signInWithRedirect(p);}catch(y){acFail(y);}}else acFail(x);}}
  else if("acforgot" in d){const em=($("#ace")||{}).value;if(!em){ACC.err="Type your email above, then tap Forgot password.";return renderAcct();}
    try{await fbLoad();await fbAuth.sendPasswordResetEmail(em);ACC.err="";toast("Check your email for a reset link.");}catch(x){acFail(x);}}});
document.addEventListener("submit",async e=>{const f=e.target.closest("[data-acform]");if(!f)return;e.preventDefault();
  const mode=(e.submitter&&e.submitter.dataset.acmode)||"in",em=$("#ace").value.trim(),pw=$("#acp").value;if(!await fbLoad())return renderAcct();
  try{if(mode==="up"){const r=await fbAuth.createUserWithEmailAndPassword(em,pw),nm=(($("#acn")||{}).value||"").trim();if(nm&&r.user){await r.user.updateProfile({displayName:nm});ACC.user=fbAuth.currentUser;renderAcct();}}else await fbAuth.signInWithEmailAndPassword(em,pw);closeAcct();toast(mode==="up"?"Account created":"Signed in");}catch(x){acFail(x);}});
// Already signed in from a past visit? Load quietly so syncing picks up where it left off.
let HAS_AUTH=false;try{HAS_AUTH=localStorage.getItem(ACC_KEY+"-signedin")==="1"||Object.keys(localStorage).some(k=>k.startsWith("firebase:authUser:"));if(HAS_AUTH)setTimeout(fbLoad,0);}catch(e){}
// First visit on the public site: show the welcome screen before anything else.
const PUBLIC_SITE=/(^|\.)joined-3adda\.(web\.app|firebaseapp\.com)$/.test(location.hostname);
let GUEST=false;try{GUEST=localStorage.getItem(ACC_KEY+"-guest")==="1";}catch(e){}
if(PUBLIC_SITE&&!HAS_AUTH&&!GUEST)setTimeout(()=>{document.body.classList.add("welcoming");openAcct(true);},0);

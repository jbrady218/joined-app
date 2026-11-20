import base64
head=open('head.html').read()
b64=lambda p:base64.b64encode(open(p,'rb').read()).decode()
body='''
<header class="top"><div class="top-in">
  <button class="brand" data-home aria-label="Joined home"><img class="brand-ico" src="__ICON__" alt=""><span class="bn">Joined</span><small>Prototype</small></button>
  <div class="seg read-only" id="chapseg" role="group" aria-label="Chapter"></div>
  <div class="seg read-only bible-only" role="group" aria-label="Translation"><button data-mode="kjv">KJV</button><button data-mode="web">Modern</button><button data-mode="both">Both</button></div>
</div>
</header>
<div id="hsearch" class="hsearch" hidden role="dialog" aria-label="Seek"><div class="hs-in">
  <div class="hs-top"><span class="sk-badge sm"><svg class="skico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/></svg></span><b>Seek</b><button class="btn" data-search>Close</button></div>
  <div class="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="hq" type="search" placeholder="Describe it, or type a verse or word" enterkeyhint="search" autocomplete="off" aria-label="Search or Seek"><button class="btn seekbtn" data-seek aria-label="Seek: find by meaning"><img class="sk-mini" src="__ICON__" alt=""><span>Seek</span></button></div>
  <div id="hres" class="sresults" hidden></div></div></div>
<nav class="bnav" id="bnav" aria-label="Main"><div class="bnav-in">
  <button class="nv" data-tab="home" data-home><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/></svg><span>Home</span></button>
  <button class="nv" data-tab="cont" data-cont><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z"/><path d="M12 6v13.5"/></svg><span>Continue</span></button>
  <button class="nv nv-seek" data-search aria-label="Seek: find verses, talks and your highlights by meaning"><span class="orb"><img src="__MARK__" alt=""></span><span>Seek</span></button>
  <a class="nv" data-tab="fam" href="#family"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg><span>Come, Follow Me</span></a>
  <button class="nv acct-btn" id="acctbtn" data-acct aria-label="Sign in"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg><span id="acctlbl">Sign in</span></button>
</div></nav>
<div class="wrap"><article id="reader"></article><aside id="panel" aria-label="Study panel"><div class="panel-in" id="panelIn"></div></aside></div>
<script>const TEXTS=__TEXTS__;const LOGO_MARK="__MARK__";</script>
<script>__GLOSS__</script>
<script>__GLOSS2__
__GLOSS3__
__GLOSS4__
__GLOSS5__
__HISTORY__
__NTP__
__RECHK__
__ALMA__
__BOMV__</script>
<script>__BOOKS__
__CH2__
__BMORE__
__CH3__
__CH4__
__CH5__
__CH6__
__CH7__
__CH8__
__CH9__
__CH10__
__CH11__</script>
<script>__MAPS__</script>
<script>__FAMDATA__</script>
<script>__FAMILY__</script>
<script>__LESSON__
__IMPORTER__</script>
<script>__ACCOUNT__</script>
<script>__APP__
__EXTRAS__</script>
'''
for k,f in [('__TEXTS__','texts.json'),('__GLOSS__','gloss.js'),('__GLOSS2__','gloss2.js'),('__GLOSS3__','gloss3.js'),('__GLOSS4__','gloss4.js'),('__GLOSS5__','gloss5.js'),('__HISTORY__','history.js'),('__NTP__','nt_people.js'),('__RECHK__','recheck.js'),('__ALMA__','alma.js'),('__BOMV__','bom_visuals.js'),('__BOOKS__','books.js'),('__CH2__','chapters2.js'),('__BMORE__','books_more.js'),('__CH3__','chapters3.js'),('__CH4__','chapters4.js'),('__CH5__','chapters5.js'),('__CH6__','chapters6.js'),('__CH7__','chapters7.js'),('__CH8__','chapters8.js'),('__CH9__','chapters9.js'),('__CH10__','chapters10.js'),('__CH11__','chapters11.js'),('__MAPS__','maps.js'),('__FAMDATA__','family_data.js'),('__FAMILY__','family.js'),('__LESSON__','lesson.js'),('__IMPORTER__','importer.js'),('__ACCOUNT__','account.js'),('__APP__','app.js'),('__EXTRAS__','extras.js')]:
    body=body.replace(k,open(f).read(),1)
body=body.replace('__ICON__','data:image/png;base64,'+b64('logo/icon128sq.png')).replace('__MARK__','data:image/png;base64,'+b64('logo/mark.png'))
open('daniel-study.html','w').write(head+body)

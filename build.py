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
  <div class="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><textarea id="hq" rows="1" placeholder="Describe it, or type a verse or word" enterkeyhint="search" autocomplete="off" autocapitalize="sentences" aria-label="Search or Seek"></textarea><button class="btn seekbtn" data-seek aria-label="Seek: find by meaning"><img class="sk-mini" src="__ICON__" alt=""><span>Seek</span></button></div>
  <div id="hres" class="sresults" hidden></div></div></div>
<nav class="bnav" id="bnav" aria-label="Main"><div class="bnav-in">
  <a class="nv" data-tab="scr" href="#scriptures"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4" width="4.5" height="16" rx="1"/><rect x="9.5" y="4" width="4.5" height="16" rx="1"/><path d="M16 5.2l4.2 1-3.6 14-4.2-1z"/></svg><span>Scriptures</span></a>
  <button class="nv" data-tab="cont" data-cont><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z"/><path d="M12 6v13.5"/><path d="M16 3v6l-2-1.5L12 9V3.6"/></svg><span>Continue</span></button>
  <button class="nv nv-seek" data-search aria-label="Seek: find verses, talks and your highlights by meaning"><span class="orb"><img src="__MARK__" alt=""></span><span>Seek</span></button>
  <a class="nv" data-tab="study" href="#study"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h11a1 1 0 011 1v16a1 1 0 01-1 1H6z"/><path d="M6 3v18M10 8h5M10 12h5"/></svg><span>Study</span></a>
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
__BOMV__
__GLOSS6__
__GLOSS7__
__GLOSS8__
__GLOSS9__
__GLOSS10__</script>
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
__CH11__
__CH12__
__CH13__
__CH14__</script>
<script>__MAPS__</script>
<script>__FAMDATA__</script>
<script>__FAMILY__</script>
<script>__LESSON__
__IMPORTER__</script>
<script>__ACCOUNT__</script>
<script>__APP__
__EXTRAS__</script>
'''
for k,f in [('__TEXTS__','texts.json'),('__GLOSS__','gloss.js'),('__GLOSS2__','gloss2.js'),('__GLOSS3__','gloss3.js'),('__GLOSS4__','gloss4.js'),('__GLOSS5__','gloss5.js'),('__GLOSS6__','gloss6.js'),('__GLOSS7__','gloss7.js'),('__GLOSS8__','gloss8.js'),('__GLOSS9__','gloss9.js'),('__GLOSS10__','gloss10.js'),('__HISTORY__','history.js'),('__NTP__','nt_people.js'),('__RECHK__','recheck.js'),('__ALMA__','alma.js'),('__BOMV__','bom_visuals.js'),('__BOOKS__','books.js'),('__CH2__','chapters2.js'),('__BMORE__','books_more.js'),('__CH3__','chapters3.js'),('__CH4__','chapters4.js'),('__CH5__','chapters5.js'),('__CH6__','chapters6.js'),('__CH7__','chapters7.js'),('__CH8__','chapters8.js'),('__CH9__','chapters9.js'),('__CH10__','chapters10.js'),('__CH11__','chapters11.js'),('__CH12__','chapters12.js'),('__CH13__','chapters13.js'),('__CH14__','chapters14.js'),('__MAPS__','maps.js'),('__FAMDATA__','family_data.js'),('__FAMILY__','family.js'),('__LESSON__','lesson.js'),('__IMPORTER__','importer.js'),('__ACCOUNT__','account.js'),('__APP__','app.js'),('__EXTRAS__','extras.js')]:
    body=body.replace(k,open(f).read(),1)
body=body.replace('__ICON__','data:image/png;base64,'+b64('logo/icon128sq.png')).replace('__MARK__','data:image/png;base64,'+b64('logo/mark.png'))
open('daniel-study.html','w').write(head+body)

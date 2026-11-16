import base64
head=open('head.html').read()
b64=lambda p:base64.b64encode(open(p,'rb').read()).decode()
body='''
<header class="top"><div class="top-in">
  <button class="brand" data-home aria-label="Joined home"><img class="brand-ico" src="__ICON__" alt=""><span class="bn">Joined</span><small>Prototype</small></button>
  <div class="seg read-only" id="chapseg" role="group" aria-label="Chapter"></div>
  <div class="seg read-only bible-only" role="group" aria-label="Translation"><button data-mode="kjv">KJV</button><button data-mode="web">Modern</button><button data-mode="both">Both</button></div>
  <button class="notes-btn icon-btn" data-search aria-label="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><span>Search</span></button>
  <button class="notes-btn icon-btn acct-btn" id="acctbtn" data-acct aria-label="Sign in"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg><span id="acctlbl">Sign in</span></button>
</div>
<div id="hsearch" class="hsearch" hidden><div class="hs-in"><div class="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="hq" type="search" placeholder="Search a verse, name or word (1 Nephi 3:7, Babylon)" autocomplete="off" aria-label="Search"><button class="btn" data-search>Close</button></div><div id="hres" class="sresults" hidden></div></div></div></header>
<div class="wrap"><article id="reader"></article><aside id="panel" aria-label="Study panel"><div class="panel-in" id="panelIn"></div></aside></div>
<script>const TEXTS=__TEXTS__;const LOGO_MARK="__MARK__";</script>
<script>__GLOSS__</script>
<script>__GLOSS2__
__GLOSS3__
__HISTORY__</script>
<script>__BOOKS__
__CH2__
__BMORE__</script>
<script>__MAPS__</script>
<script>__FAMDATA__</script>
<script>__FAMILY__</script>
<script>__LESSON__
__IMPORTER__</script>
<script>__ACCOUNT__</script>
<script>__APP__</script>
'''
for k,f in [('__TEXTS__','texts.json'),('__GLOSS__','gloss.js'),('__GLOSS2__','gloss2.js'),('__GLOSS3__','gloss3.js'),('__HISTORY__','history.js'),('__BOOKS__','books.js'),('__CH2__','chapters2.js'),('__BMORE__','books_more.js'),('__MAPS__','maps.js'),('__FAMDATA__','family_data.js'),('__FAMILY__','family.js'),('__LESSON__','lesson.js'),('__IMPORTER__','importer.js'),('__ACCOUNT__','account.js'),('__APP__','app.js')]:
    body=body.replace(k,open(f).read(),1)
body=body.replace('__ICON__','data:image/png;base64,'+b64('logo/icon128sq.png')).replace('__MARK__','data:image/png;base64,'+b64('logo/mark.png'))
open('daniel-study.html','w').write(head+body)

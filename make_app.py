# Builds app.html (the full live app page) and the Firebase fallback copy.
import subprocess,shutil
subprocess.run(['python3','build.py'],check=True)
html=open('site_head.html').read()+open('daniel-study.html').read()+'</body></html>\n'
open('app.html','w').write(html)
shutil.copy('app.html','deploy/joined-site/public/app.html')
print('app.html',len(html))

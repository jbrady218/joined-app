import json,base64,re
s=open('maps_src.js').read()
for k,f in [('NE','basemap'),('US','basemap_us'),('HOLY','basemap_holy'),('SINAI','basemap_sinai'),('ARABIA','basemap_arabia')]:
    s=s.replace(f'__{k}__',open(f+'.json').read()).replace(f'__{k}IMG__',base64.b64encode(open(f+'.jpg','rb').read()).decode())
old=open('term_maps_old.js').read()
body=old[old.index('{')+1:old.rindex('}')].strip().rstrip(',').rstrip(';')
s=s.replace('__OLD__',body)
s=open('jer_plan.js').read().split('\n')[0]+'\n'+s
open('maps.js','w').write(s)

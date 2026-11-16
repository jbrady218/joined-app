import re,json,html
def clean(t):
    t=re.sub(r'<note\b.*?</note>','',t,flags=re.S)
    t=re.sub(r'<title\b.*?</title>','',t,flags=re.S)
    t=re.sub(r'<[^>]+>','',t);t=html.unescape(t)
    return re.sub(r'\s+',' ',t).strip()
def kjv():
    s=open('/tmp/eng-kjv.osis.xml').read();out={}
    for m in re.finditer(r'<verse osisID="([^"]+)" sID="([^"]+)"[^>]*/>(.*?)<verse eID="\2"\s*/>',s,flags=re.S):
        b,c,v=m.group(1).split('.');out.setdefault(b,{}).setdefault(c,{})[int(v)]=clean(m.group(3))
    return out
def web():
    s=open('/tmp/eng-web.usfx.xml').read();out={}
    for bm in re.finditer(r'<book id="([A-Z0-9]+)">(.*?)</book>',s,flags=re.S):
        b,body=bm.groups()
        body=re.sub(r'<f\b.*?</f>|<x\b.*?</x>|<s\b.*?</s>|<toc\b.*?</toc>|<h>.*?</h>|<id\b.*?</id>|<p sfm="mt[^"]*"[^>]*>.*?</p>','',body,flags=re.S)
        ch=None
        for tok in re.finditer(r'<c id="(\d+)"\s*/>|<v id="(\d+)"\s*/>(.*?)(?=<ve\s*/>|<v id=|<c id=)',body,flags=re.S):
            if tok.group(1):ch=tok.group(1);continue
            out.setdefault(b,{}).setdefault(ch,{})[int(tok.group(2))]=clean(tok.group(3))
    return out

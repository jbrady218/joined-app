import json,re,difflib,sys
sys.path.insert(0,'/home/claude/src')
from parse_bible import kjv
P=json.load(open('/tmp/KJVPCE.json'))['books']
E=kjv()
OS=['Gen','Exod','Lev','Num','Deut','Josh','Judg','Ruth','1Sam','2Sam','1Kgs','2Kgs','1Chr','2Chr','Ezra','Neh','Esth','Job','Ps','Prov','Eccl','Song','Isa','Jer','Lam','Ezek','Dan','Hos','Joel','Amos','Obad','Jonah','Mic','Nah','Hab','Zeph','Hag','Zech','Mal','Matt','Mark','Luke','John','Acts','Rom','1Cor','2Cor','Gal','Eph','Phil','Col','1Thess','2Thess','1Tim','2Tim','Titus','Phlm','Heb','Jas','1Pet','2Pet','1John','2John','3John','Jude','Rev']
tok=lambda s:re.findall(r"\S+",s)
def caps(p,e):
    if not e:return ' '.join((x[1:][0]+x[2:].lower()) if x.startswith('\x01') else x for x in p.split(' '))
    a=tok(p);b=tok(e);na=[re.sub(r"\W","",x).lower() for x in a];nb=[re.sub(r"\W","",x).lower() for x in b]
    sm=difflib.SequenceMatcher(None,na,nb,autojunk=False)
    for tag,i1,i2,j1,j2 in sm.get_opcodes():
        if tag=='equal':
            for k in range(i2-i1):
                x,y=a[i1+k],b[j1+k];core=re.sub(r"[^A-Za-z]","",y.split("’")[0].split("'")[0])
                if len(core)>1 and core.isupper() and core in('LORD','GOD','JEHOVAH','JAH') :
                    a[i1+k]=re.sub(core,core,re.sub(re.escape(core.capitalize()),core,x,count=1),count=1)
    for k,x in enumerate(a):
        if x.startswith('\x01'):
            x=x[1:];m=[y for y in b[:5] if re.sub(r"\W","",y).lower()==re.sub(r"\W","",x).lower()]
            a[k]=m[0] if m else (x[0]+x[1:].lower() if k==0 else x.lower())
    return ' '.join(a)
def fix(t,first):
    t=t.replace('¶','').replace("'","’")
    t=re.sub(r'\s*THE END\.?$','',t)
    t=re.sub(r'\[|\]','',t)
    if first:
        w=t.strip().split(' ')
        for j in range(min(3,len(w))):
            core=re.sub(r'[^A-Za-z]','',w[j])
            if len(core)>1 and core.isupper() and core not in('LORD','GOD'):w[j]='\x01'+w[j]
        t=' '.join(w)
    return re.sub(r'\s+',' ',t).strip()
def book(i):
    pb=P[i];o=OS[i];out={}
    for ch in pb['chapters']:
        c=str(ch['chapter']);vs=[]
        for v in ch['verses']:
            t=v['text'];t=fix(t,True)  # chapter-initial caps appear at verse 1 only, but harmless
            t=caps(t,E[o].get(c,{}).get(v['verse']))
            vs.append(t)
        out[c]=vs
    return out

# Builds texts/<id>.json (KJV + WEB) and books_more.js for books loaded on demand.
# Sources (public domain): KJV Pure Cambridge Edition (scrollmapper/bible_databases KJVPCE.json),
# LORD/GOD small caps restored from eBible KJV (seven1m/open-bibles eng-kjv.osis.xml),
# WEB from seven1m/open-bibles eng-web.usfx.xml. Run fetch_sources.sh first.
import json,sys
sys.path.insert(0,'tools')
from kjv_build import book,OS
from parse_bible import web
W=web()
L=[# id, name, osis, usfx, gl, bh, title, blurb, aliases
("gen","Genesis","Gen","GEN","gen","genesis","THE FIRST BOOK OF MOSES CALLED GENESIS","The Creation, the Fall, the Flood and the covenant families of Abraham, Isaac, Jacob and Joseph",["genesis","gen","gn","ge"]),
("exo","Exodus","Exod","EXO","ex","exodus","THE SECOND BOOK OF MOSES CALLED EXODUS","Moses, the plagues, the Passover, the Red Sea and the law at Sinai",["exodus","exod","exo","ex"]),
("lev","Leviticus","Lev","LEV","lev","leviticus","THE THIRD BOOK OF MOSES CALLED LEVITICUS","Sacrifices, priests, holiness and the Day of Atonement",["leviticus","lev","lv"]),
("num","Numbers","Num","NUM","num","numbers","THE FOURTH BOOK OF MOSES CALLED NUMBERS","Forty years in the wilderness, from Sinai to the edge of the promised land",["numbers","num","nm","nu"]),
("deu","Deuteronomy","Deut","DEU","deut","deuteronomy","THE FIFTH BOOK OF MOSES CALLED DEUTERONOMY","Moses' last sermons: remember the Lord, love Him and keep His covenant",["deuteronomy","deut","deu","dt"]),
("amos","Amos","Amos","AMO","amos","amos","AMOS","A shepherd prophet calls Israel to justice",["amos","am"]),
("obad","Obadiah","Obad","OBA","obad","obadiah","OBADIAH","Judgment on Edom and saviours on mount Zion",["obadiah","obad","ob"]),
("jonah","Jonah","Jonah","JON","jonah","jonah","JONAH","A runaway prophet, a great fish and a city that repents",["jonah","jon","jnh"]),
("mic","Micah","Mic","MIC","micah","micah","MICAH","Do justly, love mercy, walk humbly with thy God",["micah","mic"]),
("nahum","Nahum","Nah","NAM","nahum","nahum","NAHUM","The fall of Nineveh",["nahum","nah"]),
("hab","Habakkuk","Hab","HAB","hab","habakkuk","HABAKKUK","A prophet's questions and the just shall live by faith",["habakkuk","hab"]),
("zeph","Zephaniah","Zeph","ZEP","zeph","zephaniah","ZEPHANIAH","The day of the Lord and a pure language",["zephaniah","zeph","zep"]),
("hag","Haggai","Hag","HAG","hag","haggai","HAGGAI","Rebuild the house of the Lord",["haggai","hag"]),
("zech","Zechariah","Zech","ZEC","zech","zechariah","ZECHARIAH","Visions of the temple and the coming King",["zechariah","zech","zec"]),
("mal","Malachi","Mal","MAL","mal","malachi","MALACHI","Tithing and the coming of Elijah",["malachi","mal"]),
("mark","Mark","Mark","MRK","mark","mark","THE GOSPEL ACCORDING TO ST MARK","The fast-moving Gospel of Jesus's works and power",["mark","mk","mrk"]),
("luke","Luke","Luke","LUK","luke","luke","THE GOSPEL ACCORDING TO ST LUKE","Jesus's birth, parables and care for the outcast",["luke","lk","luk"]),
("john","John","John","JHN","john","john","THE GOSPEL ACCORDING TO ST JOHN","The Word made flesh, the Good Shepherd and the Bread of Life",["john","jn","jhn"]),
("acts","Acts","Acts","ACT","acts","acts","THE ACTS OF THE APOSTLES","The Apostles carry the gospel from Jerusalem to Rome",["acts","ac"]),
("rom","Romans","Rom","ROM","rom","romans","THE EPISTLE OF PAUL THE APOSTLE TO THE ROMANS","Faith, grace and the gospel's power to save",["romans","rom","ro"]),
("1cor","1 Corinthians","1Cor","1CO","1-cor","1_corinthians","THE FIRST EPISTLE OF PAUL THE APOSTLE TO THE CORINTHIANS","Unity, charity and the Resurrection",["1 corinthians","1 cor","1cor","1 co"]),
("2cor","2 Corinthians","2Cor","2CO","2-cor","2_corinthians","THE SECOND EPISTLE OF PAUL THE APOSTLE TO THE CORINTHIANS","Godly sorrow and strength in weakness",["2 corinthians","2 cor","2cor","2 co"]),
("gal","Galatians","Gal","GAL","gal","galatians","THE EPISTLE OF PAUL THE APOSTLE TO THE GALATIANS","Freedom in Christ and the fruit of the Spirit",["galatians","gal"]),
("eph","Ephesians","Eph","EPH","eph","ephesians","THE EPISTLE OF PAUL THE APOSTLE TO THE EPHESIANS","Apostles and prophets and the whole armour of God",["ephesians","eph"]),
("phil","Philippians","Phil","PHP","philip","philippians","THE EPISTLE OF PAUL THE APOSTLE TO THE PHILIPPIANS","Joy in Christ, written from prison",["philippians","phil","php"]),
("col","Colossians","Col","COL","col","colossians","THE EPISTLE OF PAUL THE APOSTLE TO THE COLOSSIANS","Christ above all, rooted and built up in Him",["colossians","col"]),
("1thes","1 Thessalonians","1Thess","1TH","1-thes","1_thessalonians","THE FIRST EPISTLE OF PAUL THE APOSTLE TO THE THESSALONIANS","The Second Coming and comfort for the grieving",["1 thessalonians","1 thes","1 thess","1thes","1 th"]),
("2thes","2 Thessalonians","2Thess","2TH","2-thes","2_thessalonians","THE SECOND EPISTLE OF PAUL THE APOSTLE TO THE THESSALONIANS","A falling away must come first",["2 thessalonians","2 thes","2 thess","2thes","2 th"]),
("1tim","1 Timothy","1Tim","1TI","1-tim","1_timothy","THE FIRST EPISTLE OF PAUL THE APOSTLE TO TIMOTHY","Counsel to a young Church leader",["1 timothy","1 tim","1tim","1 ti"]),
("2tim","2 Timothy","2Tim","2TI","2-tim","2_timothy","THE SECOND EPISTLE OF PAUL THE APOSTLE TO TIMOTHY","Paul's last letter: I have fought a good fight",["2 timothy","2 tim","2tim","2 ti"]),
("titus","Titus","Titus","TIT","titus","titus","THE EPISTLE OF PAUL TO TITUS","Setting the Church in order on Crete",["titus","tit"]),
("phlm","Philemon","Phlm","PHM","philem","philemon","THE EPISTLE OF PAUL TO PHILEMON","Receive him as a brother",["philemon","philem","phlm","phm"]),
("heb","Hebrews","Heb","HEB","heb","hebrews","THE EPISTLE OF PAUL THE APOSTLE TO THE HEBREWS","Christ the great High Priest, and faith",["hebrews","heb"]),
("jas","James","Jas","JAS","james","james","THE GENERAL EPISTLE OF JAMES","Ask of God, and faith with works",["james","jas","jms"]),
("1pet","1 Peter","1Pet","1PE","1-pet","1_peter","THE FIRST EPISTLE GENERAL OF PETER","A chosen generation, and the gospel preached to the dead",["1 peter","1 pet","1pet","1 pe"]),
("2pet","2 Peter","2Pet","2PE","2-pet","2_peter","THE SECOND EPISTLE GENERAL OF PETER","Partakers of the divine nature",["2 peter","2 pet","2pet","2 pe"]),
("1jn","1 John","1John","1JN","1-jn","1_john","THE FIRST EPISTLE GENERAL OF JOHN","God is love",["1 john","1 jn","1jn","1john"]),
("2jn","2 John","2John","2JN","2-jn","2_john","THE SECOND EPISTLE OF JOHN","Walk in truth and love",["2 john","2 jn","2jn","2john"]),
("3jn","3 John","3John","3JN","3-jn","3_john","THE THIRD EPISTLE OF JOHN","No greater joy",["3 john","3 jn","3jn","3john"]),
("jude","Jude","Jude","JUD","jude","jude","THE GENERAL EPISTLE OF JUDE","Contend for the faith",["jude","jud"]),
("rev","Revelation","Rev","REV","rev","revelation","THE REVELATION OF ST JOHN THE DIVINE","John's vision of the last days and Christ's triumph",["revelation","rev","re","apocalypse"])]
NT={"mark","luke","john","acts","rom","1cor","2cor","gal","eph","phil","col","1thes","2thes","1tim","2tim","titus","phlm","heb","jas","1pet","2pet","1jn","2jn","3jn","jude","rev"}
from parse_bible import kjv as ekjv
E=ekjv()
books={};aliases={};ready={};issues=[]
for (i,n,o,u,gl,bh,title,blurb,al) in L:
    K=book(OS.index(o))
    Wb=W[u]
    k={c:vs for c,vs in K.items()}
    # fill any empty KJV verse from eBible
    for c,vs in k.items():
        for j,v in enumerate(vs):
            if not v.strip():vs[j]=E[o][c][j+1];issues.append(f'filled {i} {c}:{j+1}')
    w={}
    if i=='rom' and len(Wb.get('14',{}))>23:
        Wb=dict(Wb);Wb['16']=dict(Wb['16']);Wb['14']=dict(Wb['14'])
        for a,b in [(24,25),(25,26),(26,27)]:Wb['16'][b]=Wb['14'].pop(a)
    for c in k:
        n_k=len(k[c]);wc=Wb.get(c,{})
        w[c]=[wc.get(v,'') for v in range(1,n_k+1)]
        extra=[v for v in wc if v>n_k]
        if extra:  # versification differs: append extra WEB verses to the last verse
            w[c][-1]=(w[c][-1]+' '+' '.join(wc[v] for v in sorted(extra))).strip();issues.append(f'{i} {c}: WEB has {len(wc)} vs KJV {n_k}')
        miss=[v+1 for v in range(n_k) if not w[c][v]]
        for v in miss:w[c][v-1]='[This verse is not in the Greek manuscripts the World English Bible follows.]'
        if miss:issues.append(f'{i} {c}: WEB missing {miss}')
    chs=sorted(int(c) for c in k)
    json.dump({"kjv":{c:k[c] for c in map(str,chs)},"web":{c:w[c] for c in map(str,chs)}},open(f'texts/{i}.json','w'),ensure_ascii=False,separators=(',',':'))
    books[i]={"name":n,"vol":"New Testament" if i in NT else "Old Testament","bible":True,"lang":"grk" if i in NT else "heb","title":title,"gl":("nt/" if i in NT else "ot/")+gl,"bh":bh,"chs":chs,"blurb":blurb,"lazy":True}
    aliases[i]=al;ready[n]=[i,len(chs)]
# ---- Book of Mormon (same source and edition as the 1 Nephi already in Joined: bcbooks/scriptures-json) ----
BOMD={b['book']:b for b in json.load(open('/tmp/bom.json'))['books']}
BOM=[("2ne","2 Nephi","2-ne","Lehi's last blessings, Nephi's psalm and the doctrine of Christ",["2 nephi","2 ne","2ne","2nephi","2 nep"]),
("jacob","Jacob","jacob","Pride, chastity and the allegory of the olive trees",["jacob","jac"]),
("enos","Enos","enos","A wrestle before God in mighty prayer",["enos"]),
("jarom","Jarom","jarom","A short record of prophets, peace and war",["jarom"]),
("omni","Omni","omni","Five record keepers and the people of Zarahemla",["omni"]),
("wom","Words of Mormon","w-of-m","Mormon joins the small plates to his record",["words of mormon","w of m","wofm","wom"]),
("mosiah","Mosiah","mosiah","King Benjamin, Abinadi and the people of Alma",["mosiah","mos"]),
("alma","Alma","alma","Alma and Amulek, the sons of Mosiah, Captain Moroni and a father's counsel",["alma","al"])]
for (i,n,gl,blurb,al) in BOM:
    bb=BOMD[n];std={str(c['chapter']):[v['text'] for v in c['verses']] for c in bb['chapters']}
    json.dump({"std":std},open(f'texts/{i}.json','w'),ensure_ascii=False,separators=(',',':'))
    books[i]={"name":n,"vol":"Book of Mormon","title":bb['full_title'].upper(),"gl":"bofm/"+gl,"chs":sorted(int(c) for c in std),"blurb":blurb,"lazy":True}
    aliases[i]=al;ready[n]=[i,len(std)]
EARLY=["gen","exo","lev","num","deu"];OT_ORDER=EARLY+["dan","hos","joel"]+[b[0] for b in L if b[0] not in NT and b[0] not in EARLY];NT_ORDER=["mat"]+[b[0] for b in L if b[0] in NT]
js="// Generated by gen_books.py. Text for these books loads on demand from texts/<id>.json.\n"
js+="Object.assign(BOOKS,"+json.dumps(books,ensure_ascii=False)+");\n"
js+="BOOK_ORDER.splice(0,BOOK_ORDER.length,..."+json.dumps(OT_ORDER+NT_ORDER+["1ne"]+[b[0] for b in BOM]+["dc","abr"])+");\n"
js+="const MORE_ALIASES=("+json.dumps(aliases)+");const MORE_READY=("+json.dumps(ready)+");\n"
js+='BOOK_ORDER.forEach(b=>BOOKS[b].chs.forEach(c=>{const k=b+"."+c;if(!CHAPTERS[k])CHAPTERS[k]={title:"",year:"",sum:"",bg:[],pending:true};}));\n'
open('books_more.js','w').write(js)
print('\n'.join(issues) or 'no issues')

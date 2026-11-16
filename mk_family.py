import json,re
d=json.load(open('dl/kjv.json'));B={b['name']:b for b in d}
def clean(t):
    t=re.sub(r', and vowed vows$','',t)
    t=re.sub(r'\s*…?:\s*or,.*$','',t)
    t=re.sub(r'\s+([,.;:?!’])',r'\1',t)
    return t.strip()
def V(spec):
    # "Daniel 6:10,22" or "Jonah 2:1-2;3:1-5"
    book,rest=spec.rsplit(' ',1) if spec.count(' ')==1 else (spec[:spec.rfind(' ')],spec[spec.rfind(' ')+1:])
    out=[];c=None
    for part in rest.split(';'):
        cc,vv=part.split(':');c=int(cc)
        for seg in vv.split(','):
            a,z=(seg.split('-')+[seg])[:2];a,z=int(a),int(z)
            for i in range(a,z+1):out.append([c,i,clean(B[book]['chapters'][c-1][i-1])])
    return book,out
def lab(spec):return spec.replace('-','–').replace(',',', ').replace(';','; ')
W={46:{"t":"“There Is No Other God That Can Deliver”","b":"Daniel 1–7","u":"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/46?lang=eng"},
   47:{"t":"“I Will Love Them Freely”","b":"Hosea 1–6; 10–14; Joel","u":"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/47?lang=eng"},
   48:{"t":"“Seek the Lord, and Ye Shall Live”","b":"Amos; Obadiah; Jonah","u":"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/48?lang=eng"}}
# date, week, title, then per age: passage, question; little also gets an activity
P=[
("2026-11-15",46,"Daniel keeps praying",
 ("Daniel 6:10,22","Daniel prayed three times a day, even when the king made a rule against it. When are times you can pray?","Take turns kneeling the way Daniel did, then have a child say the family prayer."),
 ("Daniel 6:10,16,19-22","Daniel knew about the new law and still prayed with his windows open. Why do you think he didn't hide?"),
 ("Daniel 6:4-10,16-23","His enemies said the only way to catch Daniel was through “the law of his God” (verse 5). What does that tell you about how he lived?"),
 ("Daniel 6:1-23","Daniel prayed “as he did aforetime” (verse 10). The habit was already there before the crisis came. Which habits keep your family steady when pressure comes?")),
("2026-11-16",47,"God loves us freely",
 ("Hosea 14:4","God says, “I will love them freely.” What does it feel like when someone loves you even after you make a mistake?","Go around the room and give each person a hug and say, “I love you, no matter what.”"),
 ("Hosea 14:1-2,4","God asks Israel to “return” to Him. What does it mean to come back to God after we do something wrong?"),
 ("Hosea 14:1-4","Verse 2 says to “take with you words” when you turn back to the Lord. What words would you say to Him?"),
 ("Hosea 14:1-9","Hosea 14 promises healing, not just forgiveness (verses 4–7). What pictures does God use, and what do they say about how He helps us change?")),
("2026-11-17",47,"Keeping our promises with God",
 ("Hosea 2:20","God promises to be faithful to us. Being faithful means keeping your promises. What is one promise you can keep this week?","Pinky-promise one kind thing you will do for someone in the family before bedtime."),
 ("Hosea 2:19-20","God compares His promises with us to a marriage. Which words in these verses tell how He treats us?"),
 ("Hosea 2:19-20","“Betroth” means to promise to marry. Why might God describe His covenant with us like a marriage instead of a contract?"),
 ("Hosea 2:14-20","God promises to “speak comfortably” and turn a valley of trouble into “a door of hope” (verses 14–15). Where have you seen Him do that?")),
("2026-11-18",47,"Goodness that lasts",
 ("Hosea 6:6","God says He wants “mercy,” which means being kind and forgiving. How can you be kind to someone today?","Pick one person to secretly do something kind for today."),
 ("Hosea 6:4,6","Verse 4 says the people's goodness disappeared like morning dew. What would it look like for our goodness to last all day?"),
 ("Hosea 6:1-6","In verse 6 God wants mercy and knowing Him more than offerings. What's the difference between doing religious things and actually knowing God?"),
 ("Hosea 6:1-6","Their goodness was “as a morning cloud” (verse 4). What helps devotion last past Sunday in our home?")),
("2026-11-19",47,"Time to seek the Lord",
 ("Hosea 10:12","Hosea talks about planting seeds. What good things can we plant in our family, like kindness or prayer?","Draw a seed growing into a plant, and write on it one good thing you want to grow."),
 ("Hosea 10:12","“Break up your fallow ground” means getting hard, unused dirt ready to plant. What helps soften our hearts so good things can grow?"),
 ("Hosea 10:12-13","Hosea says “it is time to seek the LORD.” Why might now be the time, instead of later?"),
 ("Hosea 10:12-13","Verse 13 says Israel trusted “in thy way” and reaped what they planted. What are we planting as a family right now, and what will it grow?")),
("2026-11-20",47,"Jesus is our Savior",
 ("Hosea 13:4","God says, “There is no saviour beside me.” Jesus is our Savior. What has Jesus done for you?","Look at a picture of Jesus and have each person name one thing they love about Him."),
 ("Hosea 13:4,14","In verse 14 God promises to “redeem them from death.” How did Jesus make that possible?"),
 ("Hosea 13:4,9,14","Verse 9 says, “in me is thine help.” Where do people look for help instead of God, and why does Hosea say only He can save?"),
 ("Hosea 13:4-6,9,14","Israel forgot God once they were full and comfortable (verse 6). Why is it easier to forget God when life is going well?")),
("2026-11-21",47,"Turning with all our heart",
 ("Joel 2:13","God is “slow to anger, and of great kindness.” Who do you know who is slow to get angry? How can we be like that?","Practice taking three slow breaths together, something to do when you start to feel angry."),
 ("Joel 2:12-13","People used to tear their clothes to show they were sorry. Why does God ask us to “rend your heart, and not your garments”?"),
 ("Joel 2:12-13","What's the difference between looking sorry and actually turning back to God “with all your heart”?"),
 ("Joel 2:12-13","Joel describes God as “gracious and merciful, slow to anger.” How does knowing that change the way we repent?")),
("2026-11-22",47,"The Spirit for everyone",
 ("Joel 2:28","God promised to pour out His Spirit, the Holy Ghost, on everyone, even sons and daughters. How does the Holy Ghost help you?","Slowly pour water into a cup while you talk about how the Holy Ghost can fill us with peace."),
 ("Joel 2:28-29","Joel says young and old, sons and daughters, will all receive the Spirit. What does that tell you about who God speaks to?"),
 ("Joel 2:28-32","Peter quoted this prophecy on the day of Pentecost (Acts 2:16–18). When have you seen the Spirit come to ordinary people?"),
 ("Joel 2:28-32","“Whosoever shall call on the name of the LORD shall be delivered” (verse 32). What does calling on His name look like in daily life?")),
("2026-11-23",48,"Prophets share God's messages",
 ("Amos 3:7","God tells His plans to prophets. Who is the prophet today, and what has he taught us?","Play a quick game of telephone, then talk about why we listen to the prophet instead of what people pass around."),
 ("Amos 3:7-8","Amos asks, “The Lord GOD hath spoken, who can but prophesy?” Why would a prophet feel he has to share God's message?"),
 ("Amos 3:3-8","Amos lists cause-and-effect questions, like a lion roaring because it has caught something. What point is he making about why prophets speak?"),
 ("Amos 3:3-8","“Can two walk together, except they be agreed?” (verse 3). What does walking with God ask of us?")),
("2026-11-24",48,"Seek the Lord and live",
 ("Amos 5:4","God says, “Seek ye me, and ye shall live.” Seek means look for. Where can we look for God?","Hide a picture of Jesus and let the children find it. Then talk about ways we can look for Him."),
 ("Amos 5:4,14","“Seek good, and not evil.” What is one good thing our family could seek this week?"),
 ("Amos 5:4-8,14-15","In verse 8, Amos points to the God who made the stars. How does remembering how great God is help us seek Him?"),
 ("Amos 5:4-15","Amos ties seeking God to treating the poor fairly (verses 11–12, 15). Why are worship and how we treat others connected?")),
("2026-11-25",48,"Hungry for God's word",
 ("Amos 8:11","Amos talks about being hungry, not for food but for God's words. What words of God do you love to hear?","Share a favorite snack, and let each person share a favorite scripture or song while you eat."),
 ("Amos 8:11-12","What would it be like if no one could find the scriptures or a prophet? How are we blessed to have them?"),
 ("Amos 8:11-12","People “run to and fro” looking for God's word and can't find it. How did the Restoration end that kind of famine?"),
 ("Amos 8:11-12","Where do you see spiritual hunger in the people around you, and how can our family share what fills it?")),
("2026-11-26",48,"Helping our ancestors",
 ("Obadiah 1:21","Prophets have taught that when we do temple work for people who have died, we help them like Jesus helps us. Who in our family history would you like to learn about?","Look at a photo of a grandparent or ancestor and share one story about them."),
 ("Obadiah 1:21","“Saviours shall come up on mount Zion.” How is doing temple work for someone who died like what Jesus does for us?"),
 ("Obadiah 1:21","How can family history or doing baptisms for the dead let you help save someone?"),
 ("Obadiah 1:21","On Thanksgiving: which ancestors are you grateful for today, and what do you know about their lives?")),
("2026-11-27",48,"Jonah runs away",
 ("Jonah 1:3,17","God asked Jonah to go to Nineveh, but Jonah went the other way. What happened next?","Act out the story: one person is the ship, one the storm, and one the big fish."),
 ("Jonah 1:1-4,15-17","Why do you think Jonah didn't want to go? Have you ever not wanted to do something God asked?"),
 ("Jonah 1:1-17","The sailors prayed while Jonah slept (verses 5–6). What do you notice about how the sailors act compared with Jonah?"),
 ("Jonah 1:1-17","Jonah “rose up to flee… from the presence of the LORD” (verse 3). Why do we sometimes try to run from what God asks?")),
("2026-11-28",48,"A second chance",
 ("Jonah 2:1;3:5","Jonah prayed inside the fish, and God heard him. Can God hear our prayers anywhere?","Whisper a short prayer together, then talk about how God hears even quiet prayers."),
 ("Jonah 2:1-2,10;3:1-5","God gave Jonah a second chance (3:1). How did the people of Nineveh use their second chance?"),
 ("Jonah 2:1-10;3:1-5,10","“The word of the LORD came unto Jonah the second time” (3:1). What does this story teach about second chances?"),
 ("Jonah 2:1-10;3:1-10","Jonah remembered the Lord “when my soul fainted within me” (2:7). What does his prayer teach about turning to God when we're at our lowest?")),
("2026-11-29",48,"God's mercy for everyone",
 ("Jonah 4:2","Jonah said God is “gracious… and merciful… and of great kindness.” How has God been kind to our family?","Make a list together of ways God has been kind to your family this week."),
 ("Jonah 4:1-4","Jonah was angry that God forgave Nineveh. Why can it be hard to be happy when someone else is forgiven?"),
 ("Jonah 4:1-11","God used a plant to teach Jonah (verses 6–11). What was the lesson?"),
 ("Jonah 4:1-11","The book ends with God's question (verse 11). How would you answer it, and who might be our Nineveh?")),
]
out=[]
for date,wk,title,*ages in P:
    day={"d":date,"w":wk,"t":title,"a":[]}
    for i,a in enumerate(ages):
        spec,q=a[0],a[1];book,vs=V(spec)
        e={"r":lab(spec),"v":vs,"q":q}
        if len(a)>2:e["act"]=a[2]
        day["a"].append(e)
    out.append(day)
open('family_data.js','w').write('const FAM_WEEKS='+json.dumps(W,ensure_ascii=False)+';\nconst FAM='+json.dumps(out,ensure_ascii=False)+';\n')
for d_ in out:
    print(d_["d"],d_["t"]);[print("  ",a["r"],len(a["v"]),"|",a["v"][0][2][:70]) for a in d_["a"]]

# Background before reading: (for children, for teens and adults, word to know: (English, original, transliteration, language, meaning))
CTX={
"2026-11-15":("Daniel is an old man now, and a new king named Darius rules. Some jealous leaders trick the king into making a law against praying to anyone but him.",
 "Babylon has fallen to the Medes and Persians (539 BC), and Daniel, now in his 80s, serves King Darius. Jealous officials can't find any fault in his work, so they target his faith with a law that, once signed, can't be changed.",
 ("den","גֹּב","gob","Aramaic","a pit. Lions were kept in a pit in the ground, and a stone was rolled over the opening (verse 17).")),
"2026-11-16":("Hosea lived in Israel long ago. His people kept turning away from God, but God kept inviting them to come back.",
 "Hosea preached in the northern kingdom of Israel around 750–725 BC, shortly before Assyria conquered it in 722 BC. God had him marry Gomer, who left him; Hosea took her back. His marriage became a picture of how God keeps reaching for His people.",
 ("return","שׁוּב","shuv","Hebrew","to turn around and come back. It's the Old Testament's main word for repenting.")),
"2026-11-17":("God told Hosea to love his wife even when she left. That showed how God keeps loving His people.",
 "Hosea's own marriage, broken and then restored, is the backdrop here. God speaks of Israel as a bride He will win back, not with force but with faithfulness.",
 ("lovingkindness","חֶסֶד","chesed","Hebrew","loyal, covenant love: love that keeps its promises even when the other person doesn't.")),
"2026-11-18":("In Hosea's day, people still made offerings at the temple, but they weren't really being kind or loving God.",
 "Israel kept up sacrifices and festivals while being dishonest and unkind. Dew and morning clouds in that land burn off fast in the sun, and Hosea says their goodness disappears just as quickly.",
 ("knowledge","דַּעַת","da'at","Hebrew","knowing someone personally, from experience, not just knowing facts about them.")),
"2026-11-19":("Farmers in Israel had to plow hard, dry ground before the rain came, or nothing would grow.",
 "After the long dry summer, farmers broke up hardened ground so the autumn rains could soak in. Hosea uses farming to describe a heart that's ready for God.",
 ("rain","יֹרֶה","yoreh","Hebrew","the early rain, but the same word can also mean “to teach.” So God will “rain” and “teach” righteousness.")),
"2026-11-20":("Long ago God saved Israel from slavery in Egypt. Hosea reminds them that God is the one who saves.",
 "Hosea points back to the Exodus: the God who led Israel out of Egypt is their only Savior. Paul later quotes Hosea 13:14 when he writes about the Resurrection: “O death, where is thy sting?” (1 Corinthians 15:55).",
 ("redeem","גָּאַל","ga'al","Hebrew","to buy back. A redeemer was a close relative who paid to free a family member or win back lost land.")),
"2026-11-21":("A huge swarm of locusts, like giant grasshoppers, ate all the crops. The prophet Joel told the people to turn back to God.",
 "Joel 1 describes a locust plague that stripped the land bare. Joel uses it as a wake-up call. In that culture, people tore their clothes to show grief, but God asks for more than an outward show.",
 ("rend","קָרַע","qara","Hebrew","to tear. People tore their clothes in sorrow; God asks them to tear open their hearts instead.")),
"2026-11-22":("After the locusts, God promised good things would come back, and that His Spirit would come to everyone.",
 "After promising to restore what the locusts ate (2:25), Joel looks further ahead. Peter quoted this prophecy on the day of Pentecost (Acts 2:16–21), and the angel Moroni quoted it to Joseph Smith, saying it was about to be fulfilled (Joseph Smith—History 1:41).",
 ("pour out","שָׁפַךְ","shaphak","Hebrew","to pour out generously, the way you'd empty a full pitcher, not a few drops.")),
"2026-11-23":("Amos was a shepherd who also took care of fig trees. God called him to be a prophet.",
 "Amos came from Tekoa in Judah and worked as a herdsman and fig farmer (Amos 1:1; 7:14). Around 760 BC God sent him north to Israel during a time of wealth and comfort, when few wanted to hear a warning.",
 ("secret","סוֹד","sod","Hebrew","a council, or the private plans shared in it. Prophets are invited into God's council.")),
"2026-11-24":("People in Israel were going to special places to worship idols. Amos told them to look for God instead.",
 "Bethel, Gilgal and Beersheba were famous shrines, and at Bethel Israel worshiped a golden calf. Amos says going to the right place means nothing if you aren't seeking the Lord and treating people justly.",
 ("seek","דָּרַשׁ","darash","Hebrew","to search carefully, to ask and keep asking, the way you'd look for something you really need.")),
"2026-11-25":("Israel was rich and had plenty of food, but they weren't listening to God's prophets.",
 "Amos spoke during good economic times. He warns that a day would come when people would want God's word and not be able to find it, a famine worse than running out of bread.",
 ("famine","רָעָב","ra'av","Hebrew","hunger or starvation. The same word is used for real famines of food, which makes Amos's picture hit hard.")),
"2026-11-26":("Obadiah is the shortest book in the Old Testament. It's only one chapter long!",
 "Obadiah's 21 verses are about Edom, the descendants of Esau, who cheered when Jerusalem was attacked. The book ends with hope: saviors on Mount Zion and the kingdom belonging to the Lord.",
 ("saviours","מוֹשִׁעִים","moshi'im","Hebrew","“those who save,” from yasha, “to save.” The names Joshua and Jesus come from the same root.")),
"2026-11-27":("Nineveh was a big city full of people who were enemies of Israel. God asked Jonah to go warn them.",
 "Nineveh was the capital of Assyria, Israel's feared and violent enemy. Instead of heading east, Jonah went to the port of Joppa and sailed for Tarshish, probably in Spain, about as far the other way as he could go.",
 ("great fish","דָּג גָּדוֹל","dag gadol","Hebrew","simply “a great fish.” The Hebrew doesn't say what kind; “whale” comes from later translations.")),
"2026-11-28":("Jonah was inside the fish for three days. Then he finally went to Nineveh, and the whole city said sorry to God.",
 "Jesus called this “the sign of the prophet Jonas”: three days and nights in the fish pointed to His own death and Resurrection (Matthew 12:39–41). Nineveh's repentance is total, from the king down to the animals.",
 ("sackcloth","שַׂק","saq","Hebrew","rough cloth made of goat hair, worn to show sorrow and humility.")),
"2026-11-29":("Jonah was upset that God forgave Nineveh. God used a plant to teach him a lesson.",
 "The book ends with a question, not an answer. God points to 120,000 people who “cannot discern between their right hand and their left,” likely meaning children or people who didn't know better.",
 ("gourd","קִיקָיוֹן","qiqayon","Hebrew","probably a castor-oil plant, a fast-growing plant with big leaves that gives quick shade.")),
}
for d_ in out:
    c=CTX[d_["d"]];d_["ck"],d_["cf"],d_["wd"]=c[0],c[1],list(c[2])
open('family_data.js','w').write('const FAM_WEEKS='+json.dumps(W,ensure_ascii=False)+';\nconst FAM='+json.dumps(out,ensure_ascii=False)+';\n')
print("ctx added",len(out))

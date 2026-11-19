// The book of Alma: people, places and words. Names that mean more than one person or place
// are sorted verse by verse with ALT. Every new word/verse pairing is checked with audit.js.
const AL=(o)=>Object.assign({books:["alma"],more:[],resp:"",say:""},o);
Object.assign(TERMS,{
nolink:AL({name:"",forms:[],only:["none"],plain:""}),
// ---------- People ----------
alma2:AL({name:"Alma the Younger",forms:["Alma"],resp:"AL-muh",say:"al muh",
 plain:"Son of Alma, the first chief judge of the Nephites and high priest over the Church. The book is named for him.",bg:""}),
alma1:AL({name:"Alma (the father)",forms:[],plain:"Alma the elder, a priest of King Noah who believed Abinadi, fled, and founded the Church at the waters of Mormon (Mosiah 18). He was the father of Alma the Younger.",bg:""}),
almaboth:AL({name:"Alma and his father",forms:[],plain:"This verse names both Almas: Alma the Younger and his father, Alma the elder, who founded the Church at the waters of Mormon (Mosiah 18).",bg:""}),
amulek:AL({name:"Amulek",forms:["Amulek"],resp:"AM-yoo-lek",say:"am yoo lek",plain:"A wealthy man of Ammonihah who took Alma into his home and became his missionary companion.",bg:""}),
zeezrom:AL({name:"Zeezrom",forms:["Zeezrom"],resp:"zee-EZ-rum",say:"zee ez rum",plain:"A clever lawyer in Ammonihah who tried to trap Alma and Amulek, then repented and became a missionary.",bg:""}),
korihor:AL({name:"Korihor",forms:["Korihor"],resp:"KOR-ih-hor",say:"kor ih hor",plain:"An anti-Christ who taught that there would be no Christ and no consequences for sin (Alma 30).",bg:""}),
nehor:AL({name:"Nehor",forms:["Nehor","Nehors"],resp:"NEE-hor",say:"nee hor",plain:"A popular preacher who taught that everyone would be saved and that priests should be paid. His followers were called the order of the Nehors.",bg:""}),
ammon:AL({name:"Ammon",forms:["Ammon"],resp:"AM-un",say:"am un",plain:"A son of King Mosiah who gave up the throne to preach to the Lamanites.",bg:""}),
aaron_m:AL({name:"Aaron",forms:["Aaron"],resp:"AIR-un",say:"air un",plain:"A son of King Mosiah and brother of Ammon, a missionary to the Lamanites.",bg:""}),
aaron_city:AL({name:"Aaron (city)",forms:[],plain:"A Nephite city near Ammonihah and, later, near the city of Moroni.",bg:""}),
omner_himni:AL({name:"Omner, Himni",forms:["Omner","Himni"],plain:"Two more sons of King Mosiah who went with Ammon and Aaron on their mission to the Lamanites.",bg:""}),
mosiah_k:AL({name:"Mosiah",forms:["Mosiah"],resp:"mo-SYE-uh",say:"mo sye uh",plain:"King Mosiah, son of King Benjamin, the last Nephite king. He replaced kings with judges chosen by the voice of the people (Mosiah 29).",bg:""}),
abinadi:AL({name:"Abinadi",forms:["Abinadi"],resp:"uh-BIN-uh-dye",say:"uh bin uh dye",plain:"The prophet King Noah put to death by fire. His words converted Alma's father (Mosiah 11–17).",bg:""}),
lamoni:AL({name:"Lamoni",forms:["Lamoni"],resp:"luh-MO-nye",say:"luh mo nye",plain:"A Lamanite king over the land of Ishmael, converted by Ammon.",bg:""}),
abish:AL({name:"Abish",forms:["Abish"],resp:"AY-bish",say:"ay bish",plain:"A Lamanite servant to the queen, secretly converted for many years, who gathered the people when the king and queen were overcome by the Spirit.",bg:""}),
moroni_c:AL({name:"Moroni (Captain)",forms:["Moroni"],resp:"mo-RO-nye",say:"mo ro nye",plain:"The chief captain of the Nephite armies, appointed at age 25. Not the later prophet Moroni who buried the plates.",bg:""}),
moroni_city:AL({name:"Moroni (city)",forms:[],plain:"A city on the east sea, built by Captain Moroni's people and named for him (50:13).",bg:""}),
moronihah:AL({name:"Moronihah",forms:["Moronihah"],resp:"mo-ro-NYE-hah",say:"mo ro nye hah",plain:"Captain Moroni's son, who took command of the armies after him.",bg:""}),
helaman:AL({name:"Helaman",forms:["Helaman"],resp:"HEE-luh-mun",say:"hee luh mun",plain:"Alma's oldest son, keeper of the records and leader of the two thousand young warriors.",bg:""}),
helaman_son:AL({name:"Helaman (son of Helaman)",forms:[],plain:"Helaman’s son, also named Helaman, who received the sacred records from Shiblon. The book of Helaman begins with him.",bg:""}),
helaman_both:AL({name:"Helaman and his son",forms:[],plain:"This verse names Helaman, Alma’s son, and Helaman’s son of the same name, who received the records from Shiblon.",bg:""}),
shiblon:AL({name:"Shiblon",forms:["Shiblon"],resp:"SHIB-lun",say:"shib lun",plain:"A faithful son of Alma who later kept the sacred records.",bg:""}),
corianton:AL({name:"Corianton",forms:["Corianton"],resp:"kor-ee-AN-tun",say:"kor ee an tun",plain:"Alma's youngest son, whom Alma counseled after a serious sin on his mission (Alma 39–42).",bg:""}),
teancum:AL({name:"Teancum",forms:["Teancum"],resp:"TEE-an-kum",say:"tee an kum",plain:"A bold Nephite commander who killed both Amalickiah and his brother Ammoron.",bg:""}),
lehi_c:AL({name:"Lehi (captain)",forms:["Lehi"],resp:"LEE-hye",say:"lee hye",plain:"A Nephite commander who fought beside Moroni and Teancum. Not Lehi the prophet.",bg:"Mormon notes that Moroni and Lehi were alike in spirit and loved each other (53:2)."}),
lehi_city:AL({name:"Lehi (city)",forms:[],plain:"A Nephite city and land in the north by the borders of the seashore, named for Lehi (50:15).",bg:""}),
amalickiah:AL({name:"Amalickiah",forms:["Amalickiah","Amalickiahites"],resp:"am-uh-LIK-ee-uh",say:"am uh lik ee uh",plain:"A Nephite dissenter who schemed his way onto the Lamanite throne and led wars against the Nephites.",bg:""}),
ammoron:AL({name:"Ammoron",forms:["Ammoron"],resp:"AM-or-un",say:"am or un",plain:"Amalickiah's brother, who became Lamanite king after him.",bg:""}),
lehonti:AL({name:"Lehonti",forms:["Lehonti"],resp:"leh-HON-tye",say:"leh hon tye",plain:"A Lamanite leader who refused to go to war against the Nephites. Amalickiah had him poisoned by degrees (47:18).",bg:""}),
zerahemnah:AL({name:"Zerahemnah",forms:["Zerahemnah"],resp:"zair-uh-HEM-nuh",say:"zair uh hem nuh",plain:"A Lamanite commander defeated by Moroni at the river Sidon (Alma 43–44).",bg:""}),
pahoran:AL({name:"Pahoran",forms:["Pahoran"],resp:"puh-HOR-un",say:"puh hor un",plain:"The chief judge during Moroni's wars, who answered Moroni's angry letter with meekness.",bg:""}),
antipus:AL({name:"Antipus",forms:["Antipus"],resp:"AN-tih-pus",say:"an tih pus",plain:"A Nephite commander at Judea, joined by Helaman's young warriors. He died in battle (56:51).",bg:""}),
morianton:AL({name:"Morianton",forms:["Morianton"],plain:"A man, and the land named for him. Morianton led a rebellion and was killed by Teancum (50:25–35).",bg:""}),
gideon_p:AL({name:"Gideon",forms:[],plain:"A faithful old soldier who had served King Limhi. Nehor killed him with a sword for standing up for the Church (1:7–9).",bg:"See Mosiah 19–22. A valley and city were later named for him."}),
gideon:AL({name:"Gideon (place)",forms:["Gideon"],plain:"A valley and city east of the river Sidon, named for the faithful Gideon (2:20; 6:7).",bg:""}),
nephihah_j:AL({name:"Nephihah",forms:[],plain:"The man who succeeded Alma as chief judge (4:17). He was Pahoran's father.",bg:""}),
nephihah:AL({name:"Nephihah (city)",forms:["Nephihah"],plain:"A Nephite city between the cities of Moroni and Aaron (50:14).",bg:""}),
isabel:AL({name:"Isabel",forms:["Isabel"],plain:"A harlot in the land of Siron who “did steal away the hearts of many” (39:3–4).",bg:""}),
hagoth:AL({name:"Hagoth",forms:["Hagoth"],resp:"HAY-goth",say:"hay goth",plain:"An “exceedingly curious man” who built large ships and carried many people northward by sea (63:5–8).",bg:""}),
giddonah:AL({name:"Giddonah",forms:["Giddonah"],plain:"In 10:2, Amulek's father. In 30:21–23, a different man: the high priest in the land of Gideon who questioned Korihor.",bg:""}),
// ---------- Peoples ----------
lamanites:AL({name:"Lamanites",forms:["Lamanites","Lamanite"],resp:"LAY-muh-nites",say:"lay muh nites",
 plain:"Originally the descendants of Laman, Lemuel and some of Ishmael's family. Later the name was used for anyone who opposed the Nephites, including Nephite dissenters.",
 bg:"Jacob explains that the names came to mean those who were friendly to Nephi and those who sought to destroy them (Jacob 1:13–14). In Alma many Lamanites, like Lamoni and his people, became more faithful than the Nephites."}),
nephites:AL({name:"Nephites",forms:["Nephites","Nephite"],resp:"NEE-fites",say:"nee fites",
 plain:"The people who followed Nephi and his successors, including the people of Zarahemla who joined them.",bg:"See Jacob 1:13–14 and Omni 1:14–19."}),
zoramites:AL({name:"Zoramites",forms:["Zoramites","Zoramite"],resp:"ZOR-uh-mites",say:"zor uh mites",
 plain:"Nephites who broke away under a man named Zoram and settled in Antionum, near the Lamanites.",bg:"They prayed one fixed prayer from the Rameumptom, then did not speak of God again until the next week (31:12–23). They cast out their poor, whom Alma taught about faith (Alma 32)."}),
amlicites:AL({name:"Amlicites",forms:["Amlicites","Amlici"],resp:"AM-lih-sites",say:"am lih sites",
 plain:"Followers of Amlici, who tried to make himself king, then joined the Lamanites (Alma 2).",bg:"They marked their foreheads with red so they could be told apart (3:4)."}),
amalekites:AL({name:"Amalekites",forms:["Amalekites","Amalekite"],resp:"uh-MAL-uh-kites",say:"uh mal uh kites",
 plain:"Nephite dissenters living among the Lamanites, many “after the order of the Nehors” (21:4).",bg:"Not the Old Testament Amalekites. Some scholars think they were the same group as the Amlicites, with the name spelled differently."}),
amulonites:AL({name:"Amulonites",forms:["Amulonites","Amulon"],resp:"AM-yoo-lun-ites",say:"am yoo lun ites",
 plain:"Descendants of Amulon and the other wicked priests of King Noah (Mosiah 23–24).",bg:""}),
antinephilehies:AL({name:"Anti-Nephi-Lehies",forms:["Anti-Nephi-Lehies","Anti-Nephi-Lehi"],resp:"AN-tye-NEE-fye-LEE-hyes",say:"an tye nee fye lee hyes",
 plain:"The name taken by the Lamanites converted by the sons of Mosiah. Later they were called the people of Ammon.",
 bg:"They buried their swords rather than risk sinning again, and many let themselves be killed rather than break that covenant (Alma 24). The Nephites gave them the land of Jershon (27:22). Their sons became Helaman's young warriors."}),
christians:AL({name:"Christians",forms:["Christians"],plain:"What believers in Christ were called among the Nephites (46:13–16).",
 bg:"In the Old World, disciples were first called Christians at Antioch (Acts 11:26)."}),
antichrist:AL({name:"Anti-Christ",forms:["Anti-Christ"],plain:"Someone who teaches against Christ. Korihor is the example in Alma 30.",bg:""}),
// ---------- Places ----------
zarahemla:AL({name:"Zarahemla",forms:["Zarahemla"],resp:"zair-uh-HEM-luh",say:"zair uh hem luh",plain:"The chief Nephite land and city, on the west side of the river Sidon.",
 bg:"It was named for Zarahemla, leader of the people of Mulek, whom the first Mosiah found there (Omni 1:13–19)."}),
sidon:AL({name:"Sidon",forms:["Sidon"],resp:"SYE-dun",say:"sye dun",plain:"The main river in Nephite lands, flowing past Zarahemla. People were baptized in its waters (4:4).",bg:""}),
rabbanah:AL({name:"Rabbanah",forms:["Rabbanah"],resp:"ruh-BAN-uh",say:"ruh ban uh",plain:"A title one of King Lamoni's servants used when speaking to Ammon. The verse says it means “powerful or great king,” because the Lamanites considered their kings to be powerful (18:13).",bg:""}),
jershon:AL({name:"Jershon",forms:["Jershon"],resp:"JER-shun",say:"jer shun",plain:"The land the Nephites gave to the people of Ammon for their protection (27:22).",bg:"Scholars have suggested the name comes from the Hebrew yarash, “to inherit.” If so, it fits the verse: the land was given to them “for an inheritance.” This is a proposal, not certain."}),
ammonihah:AL({name:"Ammonihah",forms:["Ammonihah","Ammonihahites"],resp:"am-uh-NYE-hah",say:"am uh nye hah",
 plain:"A wicked Nephite city that rejected Alma and Amulek and burned the believers. The Lamanites destroyed it in a single day (16:9–10).",
 bg:"Lands and cities were named for the man who first settled them (8:7). Afterward it was called the Desolation of Nehors (16:11)."}),
manti:AL({name:"Manti",forms:["Manti"],plain:"A hill near Zarahemla, where Nehor was executed (1:15), and a Nephite city and land near the head of the river Sidon.",bg:""}),
melek:AL({name:"Melek",forms:["Melek"],plain:"A Nephite land west of the river Sidon, where many came to be baptized by Alma (8:3–5).",bg:""}),
middoni:AL({name:"Middoni",forms:["Middoni"],plain:"A Lamanite land where Aaron and his brethren were imprisoned until Ammon and Lamoni freed them (20:2–30).",bg:""}),
antionum:AL({name:"Antionum",forms:["Antionum"],plain:"The land of the Zoramites, east of the river Sidon near the Lamanite borders (31:3).",bg:""}),
sebus:AL({name:"waters of Sebus",forms:["waters of Sebus","Sebus"],plain:"A watering place where Lamanite robbers scattered the king's flocks, and where Ammon defended them (17:26–39).",bg:""}),
bountiful_alma:AL({name:"Bountiful",forms:["Bountiful"],plain:"A Nephite land north of Zarahemla, bordering the land Desolation. Not the place where Nephi built his ship.",bg:"Mormon describes it in 22:29–33. Jesus later appeared at the temple in Bountiful (3 Nephi 11)."}),
desolation:AL({name:"Desolation",forms:["Desolation"],plain:"The land north of Bountiful, called Desolation because of the destroyed Jaredite people whose bones were found there (22:30).",bg:""}),
// ---------- Words ----------
priestcraft:AL({name:"priestcraft",forms:["priestcraft","priestcrafts"],plain:"Preaching to get money and praise instead of to serve God.",
 bg:"Nephi defined it: “men preach and set themselves up for a light unto the world, that they may get gain and praise of the world” (2 Nephi 26:29). Nehor brought it among the Nephites (1:12)."}),
nephitemoney:AL({name:"Nephite money",forms:["senine","senines","senum","senums","seon","shum","limnah","amnor","ezrom","onti","onties","antion","shiblum","leah"],only:["alma.11","alma.30"],
 plain:"Measures of gold and silver. One senine of gold or one senum of silver equaled a measure of grain, and a judge's pay for a day (11:3, 7).",
 bg:"Gold: senine (1), seon (2), shum (4), limnah (7). Silver: senum (1), amnor (2), ezrom (4), onti (7). Smaller: shiblon (½), shiblum (¼), leah (⅛), and the gold antion (3 shiblons). Zeezrom offered six onties, 42 days' wages, if Amulek would deny God (11:22)."}),
shiblon_money:AL({name:"shiblon (money)",forms:[],plain:"A Nephite measure of silver worth half a senum (11:15).",bg:""}),
melchizedek:AL({name:"Melchizedek",forms:["Melchizedek"],resp:"mel-KIZ-uh-dek",say:"mel kiz uh dek",
 plain:"King of Salem and a great high priest. Abraham paid tithes to him (13:15).",
 bg:"His people had “waxed strong in iniquity,” but he preached repentance and they repented, and he “did establish peace in the land” (13:17–18). The higher priesthood bears his name (D&C 107:2–4)."}),
salem:AL({name:"Salem",forms:["Salem"],plain:"The city Melchizedek ruled. Psalm 76:2 links Salem with Zion and Jerusalem.",bg:""}),
holyorder:AL({name:"holy order",forms:["holy order"],plain:"The high priesthood: “the holy order of God,” after the order of His Son (13:1–9).",bg:""}),
probation:AL({name:"probation",forms:["probationary","probation"],plain:"A time of testing and preparing. This life is “a probationary state; a time to prepare to meet God” (12:24).",bg:""}),
planofhappiness:AL({name:"plan of happiness",forms:["plan of happiness","plan of redemption","plan of salvation","plan of mercy"],
 plain:"Heavenly Father's plan for His children to become like Him, made possible by Jesus Christ. Alma calls it by several names.",bg:"See Alma 12:25–33 and 42:5–16."}),
restoration:AL({name:"restoration",forms:["restoration","restored"],only:["alma.40","alma.41"],plain:"In Alma 40–41, the restoring of body and spirit at the Resurrection, and of good for good and evil for evil at the judgment.",
 bg:"Alma's key line is “wickedness never was happiness” (41:10)."}),
carnal:AL({name:"carnal, sensual, and devilish",forms:["carnal, sensual, and devilish"],plain:"Fleshly, driven by the appetites, and under the devil's influence: the fallen state of mankind without Christ (42:10).",bg:""}),
liahona:AL({name:"Liahona",forms:["Liahona"],resp:"lee-uh-HO-nuh",say:"lee uh ho nuh",plain:"The brass ball that guided Lehi's family. Alma says the name means “a compass” (37:38).",
 bg:"It worked “according to their faith in God,” and when they were slothful it stopped (37:40–41). Alma compares it to the words of Christ, which point the way to eternal life (37:44)."}),
gazelem:AL({name:"Gazelem",forms:["Gazelem"],plain:"The name of a servant, or a stone, that the Lord would prepare to bring hidden things to light (37:23).",bg:""}),
rameumptom:AL({name:"Rameumptom",forms:["Rameumptom"],resp:"ram-ee-UMP-tum",say:"ram ee ump tum",plain:"The tall prayer stand of the Zoramites. The name means “the holy stand” (31:21).",bg:""}),
stripling:AL({name:"stripling",forms:["stripling"],plain:"A young man, a youth.",bg:"Helaman's two thousand were sons of the people of Ammon, too young to have made their fathers' covenant (53:16–22)."}),
cimeters:AL({name:"cimeters",forms:["cimeters"],plain:"Scimitars, swords with curved blades.",bg:""}),
titleofliberty:AL({name:"title of liberty",forms:["title of liberty"],plain:"The banner Moroni made from his torn coat.",
 bg:"He wrote on it: “In memory of our God, our religion, and freedom, and our peace, our wives, and our children” (46:12), and called the people to covenant to defend their rights."}),
succor:AL({name:"succor",forms:["succor"],w1828:"To help or relieve when in difficulty, want or distress",diff:true,
 plain:"To run to help; to relieve.",bg:"Christ took upon Him our pains and infirmities “that he may know according to the flesh how to succor his people” (7:12)."}),
exquisite:AL({name:"exquisite",forms:["exquisite"],diff:true,plain:"Intense, keenly felt. Not “beautiful.”",bg:"In older English, exquisite meant sought out with great care, so pain or joy that was exquisite was felt to the fullest. Alma uses it for both his pain and his joy (36:21)."}),
experiment:AL({name:"experiment",forms:["experiment"],diff:true,plain:"A trial or test: trying something to see what happens.",bg:"Alma invites the Zoramites to test the word by planting it and watching whether it grows (32:27–36)."}),
particle:AL({name:"particle",forms:["particle"],plain:"A tiny bit or portion.",bg:"Alma asks only for “a particle of faith,” even just a desire to believe (32:27)."}),
dormant:AL({name:"dormant",forms:["dormant"],plain:"Asleep, resting, no longer active.",bg:"Once a thing is known, faith about that thing is dormant: it has done its work (32:34)."}),
swell:AL({name:"swell",forms:["swell"],only:["alma.32","alma.33"],plain:"To grow and expand from within, as a seed does when it begins to sprout.",bg:"The swelling is the first sign the seed is good (32:28)."}),
atonement:AL({name:"atonement",forms:["atonement"],plain:"The way Jesus Christ makes it possible for us to be reconciled to God: through His suffering, death and Resurrection He paid for sins and overcame death.",bg:"Amulek calls it “a great and last sacrifice,” “infinite and eternal” (34:10). It is how “mercy can satisfy the demands of justice” (34:16)."}),
wrest:AL({name:"wrest",forms:["wrest"],diff:true,plain:"To twist or distort, as when someone twists the meaning of scripture.",bg:""}),
bowels:AL({name:"bowels",forms:["bowels"],diff:true,plain:"The inner self, the seat of tender feelings, the way we say “heart.”",
 bg:"“that his bowels may be filled with mercy” (7:12) means that Christ's heart would be full of mercy from experiencing what we feel."})
});
// Verse-by-verse sorting
Object.assign(ALT,{
 "alma.4:4":{alma2:"almaboth"},"alma.5:3":{alma2:"almaboth"},"alma.5:11":{alma2:"alma1"},
 "alma.8:13":{aaron_m:"aaron_city"},"alma.50:14":{aaron_m:"aaron_city",moroni_c:"moroni_city"},
 "alma.50:13":{moroni_c:"moroni_city"},"alma.51:22":{moroni_c:"moroni_city"},"alma.51:23":{moroni_c:"moroni_city"},"alma.51:24":{moroni_c:"moroni_city",lehi_c:"lehi_city"},
 "alma.59:5":{moroni_c:"moroni_city",lehi_c:"lehi_city"},"alma.62:25":{moroni_c:"moroni_city"},"alma.62:32":{moroni_c:"moroni_city"},"alma.62:33":{moroni_c:"moroni_city"},
 "alma.1:8":{gideon:"gideon_p"},"alma.1:9":{gideon:"gideon_p"},"alma.2:1":{gideon:"gideon_p"},"alma.14:16":{gideon:"gideon_p"},
 "alma.4:17":{nephihah:"nephihah_j"},"alma.4:18":{nephihah:"nephihah_j"},"alma.4:20":{nephihah:"nephihah_j"},"alma.8:12":{nephihah:"nephihah_j"},"alma.50:37":{nephihah:"nephihah_j"},"alma.50:39":{nephihah:"nephihah_j"},
 "alma.11:15":{shiblon:"shiblon_money"},"alma.11:16":{shiblon:"shiblon_money"},
 "alma.16:5":{lehi_c:"nolink"},"alma.16:11":{desolation:"nolink"},"alma.63:11":{helaman:"helaman_both"},"alma.63:13":{helaman:"helaman_son"}
});
["9:9","9:13","10:3","18:36","18:38","28:2","36:22","49:8","50:19","56:3"].forEach(r=>{ALT["alma."+r]=Object.assign(ALT["alma."+r]||{},{lehi_c:"lehi"});});
["50:15","50:25","50:26","50:27","50:28","50:36","51:1","51:26","62:30"].forEach(r=>{ALT["alma."+r]=Object.assign(ALT["alma."+r]||{},{lehi_c:"lehi_city"});});
// ---------- Bios ----------
const DEEP_ALMA={
alma2:{tab:"Bio",secs:[
 ["A rebel turned around",["Alma grew up as the son of the high priest, yet he and the sons of King Mosiah set out to destroy the Church. An angel stopped them, and Alma fell and could not speak or move. For three days and nights he was “racked with eternal torment,” until he remembered his father's teaching about Jesus Christ and cried out for mercy (Mosiah 27; Alma 36:6–20)."]],
 ["Judge and high priest",["When the people chose judges instead of kings, Alma became the first chief judge, and he was also high priest over the Church (Mosiah 29:42). As pride spread in the Church, he gave up the judgment-seat to Nephihah so he could preach full-time (4:15–20)."]],
 ["His missions",["He preached in Zarahemla (Alma 5), Gideon (Alma 7) and Melek, then in Ammonihah with Amulek, where they were imprisoned until the walls fell (Alma 8–16). Among the Zoramites he taught faith as a seed (Alma 32)."]],
 ["A father's counsel",["Before he left, he counseled each of his sons: Helaman (Alma 36–37), Shiblon (Alma 38) and Corianton (Alma 39–42)."]],
 ["His end",["Alma left as if to go to Melek and “was never heard of more.” Word spread in the Church that he was taken up by the Spirit, or buried by the hand of the Lord, as Moses was (45:18–19)."]]],src:[]},
amulek:{tab:"Bio",secs:[
 ["A man of standing",["Amulek was a wealthy, well-known man of Ammonihah, a descendant of Lehi through Joseph of Egypt. He admitted he had been “called many times” and would not hear (10:2–6)."]],
 ["The angel and the stranger",["An angel told him to receive a prophet into his house. That prophet was Alma, hungry after being cast out of the city (8:19–27; 10:7–10)."]],
 ["Witness in Ammonihah",["He stood with Alma before the people and testified. He was forced to watch the believing women and children burned, and was imprisoned with Alma until the prison walls fell (14:8–29)."]],
 ["The cost",["He gave up his gold, silver and precious things, and was rejected by his friends, his father and his kindred (15:16). Alma took him home to Zarahemla. He later taught the Zoramites about the Atonement and said, “this life is the time for men to prepare to meet God” (34:32)."]]],src:[]},
zeezrom:{tab:"Bio",secs:[
 ["The lawyer",["Zeezrom was one of the most skilled lawyers in Ammonihah, where lawyers were paid by the case and stirred up trouble to make money (10:32; 11:20–21). He offered Amulek six onties of silver, a large sum, to deny that God exists (11:22)."]],
 ["Caught by his own words",["Amulek and Alma revealed what he was thinking, and Zeezrom began to tremble. He asked sincere questions and admitted his guilt (12:1–8; 14:6)."]],
 ["Healed",["The people cast him out. Sick with a burning fever caused by his sins, he asked for Alma and Amulek. Alma asked whether he believed in the power of Christ to save, and he was healed and baptized (15:3–12). He later served as a missionary to the Zoramites (31:6)."]]],src:[]},
korihor:{tab:"Bio",secs:[
 ["His message",["Korihor taught that no one can know the future, so there would be no Christ, that the forgiveness of sins was a “foolish” idea, and that “every man fared in this life according to the management of the creature” (30:13–17). Many followed him into sin."]],
 ["Before Alma",["The people of Ammon and of Gideon would not listen to him and sent him to Alma. He demanded a sign. Alma pointed to the earth and the planets as signs, and when Korihor kept insisting, he was struck dumb (30:40–50)."]],
 ["His confession",["He wrote that he had always known there was a God, and that the devil had appeared to him as an angel and taught him what to say (30:52–53). He went begging from house to house and was trampled to death among the Zoramites (30:56–59)."]]],src:[]},
nehor:{tab:"Bio",secs:[
 ["A popular message",["Nehor taught that priests should be paid by the people and that all mankind would be saved in the end, so no one need fear (1:3–4). Many believed him and paid him, and he began to wear costly clothes (1:5–6)."]],
 ["A killing",["When the aged Gideon, a teacher in the Church, withstood him, Nehor killed him with his sword (1:7–9)."]],
 ["Judged",["Alma, as chief judge, condemned him for both priestcraft and murder. Nehor was executed on the hill Manti and admitted that what he had taught was contrary to the word of God (1:10–15). His ideas lived on as “the order of the Nehors.”"]]],src:[]},
ammon:{tab:"Bio",secs:[
 ["A prince who chose a mission",["Ammon was the son of King Mosiah. After his conversion with Alma, he refused the kingdom and went with his brothers to preach to the Lamanites (Mosiah 28; Alma 17:6)."]],
 ["Servant to a king",["In the land of Ishmael he offered to be King Lamoni's servant. When robbers scattered the king's flocks at the waters of Sebus, he defended them alone (17:25–39). His service opened Lamoni's heart, and he taught the king the plan of redemption (Alma 18)."]],
 ["His joy",["Ammon helped free his brothers from prison and led the converted people to safety in Jershon (Alma 20; 27). He said, “I do not boast in my own strength, nor in my own wisdom; but behold, my joy is full, yea, my heart is brim with joy” (26:11)."]]],src:[]},
lamoni:{tab:"Bio",secs:[
 ["The king",["Lamoni was a descendant of Ishmael and king over the land of Ishmael under his father, the great Lamanite king (17:21)."]],
 ["A changed heart",["When he heard what Ammon did at the waters of Sebus, he thought Ammon must be the Great Spirit. Ammon taught him from the Creation to the coming of Christ. Lamoni cried to the Lord for mercy and fell to the earth as if dead (18:2–42)."]],
 ["A changed people",["After two days and nights he arose and testified that he had seen his Redeemer (19:12–13). He and his people were converted, and he later defended Ammon before his own father (Alma 19–20)."]]],src:[]},
abish:{tab:"Bio",secs:[
 ["A quiet believer",["Abish was a Lamanite woman who served the queen. She had been converted many years earlier “on account of a remarkable vision of her father,” but had kept it to herself (19:16)."]],
 ["Her moment",["When she saw the king, queen and servants all overcome by the Spirit, she knew it was the power of God. She ran from house to house to gather the people (19:17)."]],
 ["Raising the queen",["When the people began to argue, she took the queen by the hand to raise her, and the queen arose and praised Jesus (19:28–29)."]]],src:[]},
aaron_m:{tab:"Bio",secs:[
 ["Mission to the Lamanites",["Aaron, a son of King Mosiah, preached in a Lamanite city called Jerusalem, among Amalekites and Amulonites who rejected him (21:1–11)."]],
 ["Prison in Middoni",["He and some of his brethren were imprisoned in Middoni, bound and starved, until Ammon and Lamoni freed them (20:28–30; 21:13–14)."]],
 ["Teaching a king",["He taught Lamoni's father, the great king, who prayed, “I will give away all my sins to know thee” (22:18). The king and many of his people were converted."]]],src:[]},
moroni_c:{tab:"Bio",secs:[
 ["A young commander",["Moroni was only 25 years old when he was appointed chief captain of the Nephite armies (43:16–17)."]],
 ["New armor and new defenses",["He gave his soldiers breastplates, arm-shields and thick clothing, which the Lamanites had never seen (43:19–21). He built walls of earth, pickets, towers and ditches around Nephite cities (48:8–9; 50:1–6)."]],
 ["The title of liberty",["When Amalickiah tried to make himself king, Moroni tore his coat and wrote on it a call to defend God, freedom and families (46:12–13)."]],
 ["His character",["Mormon wrote, “if all men had been, and were, and ever would be, like unto Moroni, behold, the very powers of hell would have been shaken forever” (48:17). Mormon later named his own son Moroni."]],
 ["His end",["He gave command to his son Moronihah and retired to his home (62:43). He died a few years later (63:3)."]]],src:[]},
helaman:{tab:"Bio",secs:[
 ["Keeper of the records",["Alma gave his oldest son the sacred records, the plates of brass, the Jaredite plates and the Liahona, and charged him to keep them (Alma 37)."]],
 ["The two thousand",["When the people of Ammon wanted to break their covenant to help defend the Nephites, Helaman persuaded them not to. Their sons, who had not made that covenant, chose Helaman as their leader (53:13–22)."]],
 ["Not one was lost",["The young men said their mothers had taught them that God would deliver them (56:47–48). In battle after battle, though all were wounded, not one of them died (57:25–26)."]],
 ["His death",["After the war he returned to preaching and died in the thirty and fifth year of the reign of the judges (62:44–52)."]]],src:[]},
shiblon:{tab:"Bio",secs:[
 ["Faithful in hard places",["Alma's second son was put in bonds and stoned among the Zoramites, and bore it patiently (38:3–4)."]],
 ["A father's counsel",["Alma praised him and counseled, “see that ye bridle all your passions, that ye may be filled with love” (38:12)."]],
 ["Record keeper",["After Helaman died, Shiblon kept the sacred records, then gave them to Helaman's son, also named Helaman (63:1, 11)."]]],src:[]},
corianton:{tab:"Bio",secs:[
 ["A mission gone wrong",["Corianton left his mission among the Zoramites and went after the harlot Isabel. Alma told him his example led others to reject the gospel (39:3–11)."]],
 ["Counsel and questions",["Alma answered his worries about the Resurrection, the restoration, and justice and mercy, and taught him that “wickedness never was happiness” (Alma 40–42)."]],
 ["A second chance",["Alma called him back to preach (42:31), and he served again (49:30). Later he went to the land northward in a ship (63:10)."]]],src:[]},
teancum:{tab:"Bio",secs:[
 ["A fierce defender",["Teancum stopped Morianton's rebels from fleeing northward and killed Morianton (50:33–35)."]],
 ["Into the king's tent",["On a New Year's night he crept into Amalickiah's camp and killed the king in his tent with a javelin (51:33–34)."]],
 ["His last act",["Angry at the long war, he slipped into Ammoron's camp and killed him too, but was caught and killed. Moroni, Lehi and the army mourned him (62:35–37)."]]],src:[]},
amalickiah:{tab:"Bio",secs:[
 ["Seeking power",["Amalickiah was a large, strong, flattering Nephite who wanted to be king. When Moroni raised the title of liberty, he fled to the Lamanites (46:3–7, 29–33)."]],
 ["Climbing to the throne",["He tricked the Lamanite commander Lehonti, had him poisoned by degrees, had the Lamanite king killed, and married the queen (47:1–35)."]],
 ["War and death",["He stirred up the Lamanites to war and swore to drink Moroni's blood (49:27). Teancum killed him in his tent (51:34)."]]],src:[]},
pahoran:{tab:"Bio",secs:[
 ["Chief judge in hard times",["Pahoran became chief judge after his father Nephihah died (50:39–40). He refused to change the law to allow a king (51:2–7)."]],
 ["An angry letter, a meek reply",["When Moroni's armies were not supplied, Moroni wrote him a harsh letter (Alma 60). Pahoran had in fact been driven out by rebels. He answered, “I am not angry, but do rejoice in the greatness of your heart” (61:9)."]],
 ["United",["Together they defeated the rebels and restored the government (62:1–11)."]]],src:[]},
hagoth:{tab:"Bio",secs:[
 ["Shipbuilder",["Hagoth was “an exceedingly curious man.” He built a very large ship on the borders of Bountiful, by the narrow neck of land, and launched it into the west sea (63:5)."]],
 ["The voyages",["Many Nephites sailed north with their families and supplies. One ship was never heard of again, and Mormon notes that others too went forth and their fate was unknown (63:6–8)."]]],src:[]}
};
Object.keys(DEEP_ALMA).forEach(k=>{TERMS[k].deep=DEEP_ALMA[k];});
// ---------- Nephite money chart (Alma 11) ----------
const COINS=[
 {k:"senine",n:"Senine",m:"gold",v:1},{k:"seon",n:"Seon",m:"gold",v:2},{k:"shum",n:"Shum",m:"gold",v:4},{k:"limnah",n:"Limnah",m:"gold",v:7,note:"Worth all the other gold pieces together (1 + 2 + 4)."},
 {k:"senum",n:"Senum",m:"silver",v:1},{k:"amnor",n:"Amnor",m:"silver",v:2},{k:"ezrom",n:"Ezrom",m:"silver",v:4},{k:"onti",n:"Onti",m:"silver",v:7,note:"Worth all the other silver pieces together. Zeezrom offered Amulek six of these: 42 days’ pay (11:22)."},
 {k:"antion",n:"Antion",m:"gold",v:1.5,note:"Worth three shiblons (11:19)."},
 {k:"shiblon",n:"Shiblon",m:"silver",v:0.5},{k:"shiblum",n:"Shiblum",m:"silver",v:0.25},{k:"leah",n:"Leah",m:"silver",v:0.125}];
const fmtV=v=>v===0.5?"½":v===0.25?"¼":v===0.125?"⅛":v===1.5?"1½":String(v);
function coinChart(){
 const row=c=>`<button class="coin" data-coin="${c.k}" style="display:flex;align-items:center;gap:10px;width:100%;padding:6px 0;background:none;border:0;cursor:pointer;text-align:left;color:var(--ink)">
  <span style="width:74px;font-weight:600">${c.n}</span>
  <span style="flex:1;height:14px;border-radius:7px;background:var(--line);overflow:hidden"><span style="display:block;height:100%;width:${Math.max(4,c.v/7*100)}%;background:${c.m==="gold"?"#d4a72c":"#a9b3bf"}"></span></span>
  <span style="width:34px;text-align:right;font-variant-numeric:tabular-nums">${fmtV(c.v)}</span></button>`;
 const grp=(t,list)=>`<div class="sec"><h3>${t}</h3>${list.map(row).join("")}</div>`;
 return `<div class="sec"><p>One senine of gold or one senum of silver bought a measure of barley or other grain, and was a judge’s pay for one day (11:3, 7). Numbers show days’ pay. Tap a coin.</p>
</div>`+
  grp("Gold",COINS.filter(c=>c.m==="gold"&&c.v>=1&&c.k!=="antion"))+grp("Silver",COINS.filter(c=>c.m==="silver"&&c.v>=1))+
  grp("Smaller pieces",COINS.filter(c=>c.v<1||c.k==="antion"));}
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-coin]");
 if(b){const c=COINS.find(x=>x.k===b.dataset.coin);document.querySelectorAll(".coin-info").forEach(x=>x.remove());const el=document.createElement("p");el.className="lang-flag coin-info";el.style.margin="4px 0 10px";b.after(el);if(c){const same=COINS.find(x=>x!==c&&x.v===c.v&&x.v>=1);
  el.innerHTML=`<b>${c.n}</b> (${c.m}) = ${fmtV(c.v)} ${c.v===1?"day’s":"days’"} pay, or ${fmtV(c.v)} ${c.v===1?"measure":"measures"} of grain.${same?` Same value as one ${same.n.toLowerCase()} of ${same.m}.`:""}${c.note?" "+c.note:""}`;
  document.querySelectorAll("[data-coin]").forEach(x=>x.style.opacity=x===b?"1":".55");}return;}
 const t=e.target.closest("[data-term]");if(t&&TERMS[t.dataset.term]&&TERMS[t.dataset.term].chart)TAB.term="Chart";},true);
TERMS.nephitemoney.chart=coinChart;TERMS.shiblon_money.chart=coinChart;
const INLINE_AT={"alma.11:3":()=>`<button class="lang-flag" data-term="nephitemoney" style="width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit;font-family:var(--sans)">🪙 <b>Nephite money chart.</b> Tap to see what each gold and silver piece was worth.</button>`};

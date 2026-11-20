// Names and words for Helaman through Moroni, with meanings and double meanings. Checked with audit.js.
// Names and words for Helaman, 3 Nephi, 4 Nephi, Mormon, Ether and Moroni, with name meanings where the text or well-known scholarship gives them.
// Loads after alma.js (extends some Alma cards to these books). Names that mean more than one person or place are sorted verse by verse with ALT.
// Where no meaning is given, the card says so. Check new word/verse pairings with audit.js.
const BM=(o)=>Object.assign({books:["hel"],more:[],resp:"",say:""},o);
const BMALT=(refs,map)=>refs.forEach(r=>{ALT[r]=Object.assign(ALT[r]||{},map);});

// ---- Alma and Book of Mormon cards that carry over with the same meaning ----
TERMS.lamanites.books.push("hel","3ne","4ne","morm","ether","moro");
TERMS.nephites.books.push("hel","3ne","4ne","morm","ether","moro");
TERMS.zarahemla.books.push("hel","3ne","4ne","morm","ether");
TERMS.moronihah.books.push("hel");
TERMS.bountiful_alma.books.push("hel","3ne");
TERMS.sidon.books.push("morm");
TERMS.ammon.books.push("hel","ether");
TERMS.amulek.books.push("hel","ether");
TERMS.zeezrom.books.push("hel");
TERMS.mosiah_k.books.push("hel","3ne","ether");
TERMS.ammoron.books.push("hel");
TERMS.zedekiah.books.push("hel");
TERMS.jerusalem.books.push("hel","3ne","4ne","morm","ether","moro");
TERMS.isaiah.books.push("hel","3ne","morm");
TERMS.zenos.books.push("hel","3ne");
TERMS.zenock.books.push("hel","3ne");

Object.assign(TERMS,{
// =====================================================================
// HELAMAN
// =====================================================================
hel_helaman:BM({name:"Helaman",forms:["Helaman"],books:["hel","3ne"],resp:"HEE-luh-mun",say:"hee luh mun",
 plain:"Helaman, son of Helaman and grandson of Alma: chief judge, record keeper and father of Nephi and Lehi, who taught them to remember their first parents (Helaman 5:5–13). In Helaman 2:2 the name appears twice in one phrase: the judge, “the son of Helaman.” His father was the Helaman who led the two thousand young warriors. The book is named for him.",
 bg:"The Book of Mormon does not say what the name means. He died in the fifty-third year of the judges (3:37), and his son Nephi took his place."}),
hel_helaman_alma:BM({name:"Helaman (son of Alma)",forms:[],resp:"HEE-luh-mun",say:"hee luh mun",
 plain:"Alma’s son Helaman, who was given charge of the sacred records. Mormon says the secret oaths of the Gadianton band did not come from the records delivered to him, but were put into Gadianton’s heart by Satan (6:25–26).",
 bg:"Alma warned this Helaman about the secret works of darkness in Alma 37."}),
hel_nephi:BM({name:"Nephi (son of Helaman)",forms:["Nephi"],resp:"NEE-fye",say:"nee fye",
 plain:"The older son of Helaman, named for Nephi the son of Lehi. He was chief judge, then gave up the seat to preach (3:37; 5:1–4), prayed from his garden tower (ch. 7) and told the people the chief judge had been murdered (ch. 8–9). The Lord promised him that all things would be done “according to thy word” (10:4–5).",
 bg:"Helaman says he named his sons after “our first parents” so that remembering the names would help them remember good works (5:6). Some Latter-day Saint scholars have proposed an Egyptian origin for the name Nephi, from nfr, “good”; the text does not give a meaning. In Helaman the name is used four ways: the man, the people, the land, and the book."}),
hel_nephi_first:BM({name:"Nephi (son of Lehi)",forms:[],resp:"NEE-fye",say:"nee fye",
 plain:"The first Nephi, who led his family out of Jerusalem and founded the Nephite people. Nephi son of Helaman speaks of him as “my father Nephi” (7:7) and says he also testified of the coming Christ (8:22).",
 bg:"Jacob 1:10–11 says later Nephite kings were also called Nephi, so the name worked as a title as well as a name."}),
hel_nephi_land:BM({name:"Nephi (the land)",forms:[],resp:"NEE-fye",say:"nee fye",
 plain:"The land of Nephi, the old Nephite land of first inheritance, now held by the Lamanites. Dissenters from the Nephites went over to it (4:12), and Nephi and Lehi were sent to preach there (5:20).",
 bg:"The land took its name from the first Nephi (2 Nephi 5)."}),
hel_nephi_both_land:BM({name:"Nephi (the man and the land)",forms:[],resp:"NEE-fye",say:"nee fye",
 plain:"This verse uses the name twice: Nephi the son of Helaman and his brother Lehi “proceed” to the land of Nephi, the old Nephite land then held by the Lamanites. The land carried the name of the first Nephi (2 Nephi 5).",
 bg:"Helaman 5:21 says they were put in prison there."}),
hel_nephi_both_people:BM({name:"Nephi (the man and the people)",forms:[],resp:"NEE-fye",say:"nee fye",
 plain:"This verse uses the name two ways: the famine came “according to the words of Nephi” the prophet, and it fell on “all the people of Nephi,” the Nephites. The people took their name from the first Nephi.",
 bg:"The famine was a trial the prophet Nephi asked for in place of the sword (11:3–5)."}),
ne3_nephi_people:BM({name:"Nephi (the people)",forms:[],books:["hel","3ne","4ne","morm","ether"],resp:"NEE-fye",say:"nee fye",
 plain:"Here “Nephi” means the people who took his name: “the people of Nephi,” the Nephites. They were named for the first Nephi, son of Lehi.",
 bg:"Jacob 1:11 says later kings were called “Nephi” too, “let them be of whatsoever name they would,” so the name came to stand for the whole people."}),
ne3_nephi_plates:BM({name:"Nephi (the plates)",forms:[],books:["hel","3ne","4ne","morm"],resp:"NEE-fye",say:"nee fye",
 plain:"Here “Nephi” means the record named for him: the plates of Nephi, also called the book of Nephi. Successive keepers added to it, and Mormon drew his abridgment from it (Helaman 2:14; 3 Nephi 5:10; 4 Nephi 1:21; Mormon 1:4).",
 bg:"Mormon says the Book of Helaman was taken from “the book of Nephi” (Helaman 2:14), and 4 Nephi says the record is “written in the book of Nephi, which is this book” (4 Nephi 1:21)."}),
hel_lehi:BM({name:"Lehi (son of Helaman)",forms:["Lehi"],resp:"LEE-hye",say:"lee hye",
 plain:"The younger son of Helaman, named for Lehi who left Jerusalem (3:21). He and his brother Nephi preached to the Lamanites until they were “encircled about as if by fire” and their faces shone (5:23–36).",
 bg:"Hebrew lehi means “jawbone” or “cheek”; it is the name of a place in Judges 15:9–19. The Book of Mormon gives no meaning for the name."}),
hel_lehi_first:BM({name:"Lehi (father of Nephi)",forms:[],resp:"LEE-hye",say:"lee hye",
 plain:"The prophet Lehi, “driven out of Jerusalem because he testified of these things” (8:22). Nephi son of Helaman names him as the first of those who testified of Christ.",
 bg:"Hebrew lehi means “jawbone” or “cheek” (Judges 15:9–19 names a place Lehi)."}),
hel_lehi_cmdr:BM({name:"Lehi (commander)",forms:[],resp:"LEE-hye",say:"lee hye",
 plain:"A Nephite commander whom Moronihah sent with an army to head off the Lamanites in their march (1:28). The text does not say who he was; the same name belonged to a Captain Lehi in the book of Alma.",bg:""}),
hel_lehi_land:BM({name:"Lehi (the land and the man)",forms:[],resp:"LEE-hye",say:"lee hye",
 plain:"The name is used twice in this verse: “the land south was called Lehi,” and “the Lord did bring … Lehi into the land south.” The land was named for the man, Lehi the father of Nephi.",
 bg:"Mormon names the land north in the same way: Mulek, “after the son of Zedekiah.”"}),
hel_mulek:BM({name:"Mulek",forms:["Mulek"],resp:"MYOO-lek",say:"myoo lek",
 plain:"The son of Zedekiah, king of Judah, who escaped Jerusalem’s fall and whose descendants were found at Zarahemla. Nephi son of Helaman reminds the people of him as proof that Jerusalem’s fall was real (8:21).",
 bg:"Some scholars note that the name Mulek looks like Hebrew melek, “king,” which would suit a king’s son. The Book of Mormon does not explain it."}),
hel_mulek_place:BM({name:"Mulek (city)",forms:[],resp:"MYOO-lek",say:"myoo lek",
 plain:"A Nephite city named in the list of places where Nephi and Lehi preached: from Bountiful to Gid to Mulek (5:15). It shares the name of the land north and of the man (6:10).",bg:""}),
hel_mulek_land:BM({name:"Mulek (the land and the man)",forms:[],resp:"MYOO-lek",say:"myoo lek",
 plain:"The name is used twice in this verse: “the land north was called Mulek, which was after the son of Zedekiah,” and “the Lord did bring Mulek into the land north.” The land carried the man’s name.",
 bg:"Mormon names the land south in the same way, for Lehi."}),
hel_zarahemla_man:BM({name:"Zarahemla (the man)",forms:[],resp:"zair-uh-HEM-luh",say:"zair uh hem luh",
 plain:"Here Coriantumr is “a descendant of Zarahemla”: the leader of the people of Mulek whom the first Mosiah found (Omni 1:13–19). The city and land carry the same name.",bg:""}),
hel_kishkumen:BM({name:"Kishkumen",forms:["Kishkumen"],resp:"KISH-kyoo-men",say:"kish kyoo men",
 plain:"The man who murdered the chief judge Pahoran and then led a secret band of murderers (1:9–12). He tried to murder Helaman as well, but Helaman’s servant struck him dead first (2:3–9).",
 bg:"After his death Gadianton became the leader of his band (2:4). A city named Kishkumen is among those the Lord destroyed in 3 Nephi 9:10. The Book of Mormon gives no meaning for the name."}),
hel_gadianton:BM({name:"Gadianton",forms:["Gadianton"],books:["hel","3ne","4ne","morm"],resp:"GAD-ee-an-tun",say:"gad ee an tun",
 plain:"The leader who took over Kishkumen’s band, “exceedingly expert in many words” and in the craft of murder and robbery (Helaman 2:4). His followers, “Gadianton’s robbers,” kept secret oaths and covenants to protect each other in their crimes (6:18, 21).",
 bg:"Mormon says these oaths did not come from the records but from Satan, “that same being who did entice our first parents to partake of the forbidden fruit” (Helaman 6:26). The Gadianton robbers return in 3 Nephi 1–7, 4 Nephi and Mormon."}),
hel_pahoran:BM({name:"Pahoran",forms:["Pahoran"],resp:"puh-HOR-un",say:"puh hor un",
 plain:"Two men with this name appear in Helaman 1. One is the chief judge whose death started a dispute among his sons (1:2). The other is his son Pahoran, chosen by the people and then murdered on the judgment-seat by Kishkumen (1:5–9).",
 bg:"The father is probably the Pahoran of the wars of Captain Moroni. The text gives no meaning for the name."}),
hel_pahoran_sons:BM({name:"Paanchi, Pacumeni",forms:["Paanchi","Pacumeni"],resp:"pay-AN-kye, pack-yoo-MEE-nye",say:"pay an kye, pack yoo mee nye",
 plain:"Two of Pahoran’s many sons who fought over the judgment-seat. Paanchi stirred up rebellion and was condemned to death (1:7–8). Pacumeni became chief judge (1:13) and was killed by Coriantumr when Zarahemla fell (1:21).",
 bg:"Scholars have noted that Paanchi resembles the Egyptian name Pa-ankhy; the Book of Mormon gives no meaning for either name."}),
hel_coriantumr:BM({name:"Coriantumr (the Nephite dissenter)",forms:["Coriantumr"],resp:"kor-ee-AN-tum-er",say:"kor ee an tum er",
 plain:"A Nephite dissenter, “a descendant of Zarahemla,” whom the Lamanite king Tubaloth made leader of his army. He took the city of Zarahemla and killed the chief judge Pacumeni, then was killed himself (1:15–30).",
 bg:"It is the same name as the last Jaredite king (Omni 1:21; Ether 12:1). The text does not connect the two men."}),
hel_tubaloth:BM({name:"Tubaloth",forms:["Tubaloth"],resp:"TOO-buh-loth",say:"too buh loth",
 plain:"King of the Lamanites and son of Ammoron. He sent Coriantumr against Zarahemla (1:16).",
 bg:"Ammoron was Amalickiah’s brother and the Lamanite king after him (Alma 48–52). The text gives no meaning for the name."}),
hel_cezoram:BM({name:"Cezoram",forms:["Cezoram"],resp:"seh-ZOR-um",say:"seh zor um",
 plain:"The chief judge to whom Nephi gave the judgment-seat (5:1). Cezoram and his son were both murdered on the seat in the same year by the Gadianton band (6:15–19).",bg:""}),
hel_seezoram:BM({name:"Seezoram, Seantum",forms:["Seezoram","Seantum"],resp:"see-ZOR-um, see-AN-tum",say:"see zor um, see an tum",
 plain:"Seezoram was the chief judge murdered in Zarahemla, and Seantum was his brother (9:23–27). Nephi named Seantum as the murderer; Seantum first denied it and then confessed, as Nephi had said he would (9:26–37).",
 bg:"The name Seezoram sounds like Cezoram, the earlier chief judge, but the text does not say they are related."}),
hel_aminadab:BM({name:"Aminadab",forms:["Aminadab"],resp:"uh-MIN-uh-dab",say:"uh min uh dab",
 plain:"A Nephite dissenter among the Lamanites who told the crowd that Nephi and Lehi “do converse with the angels of God” (5:39). He told them to repent and pray until they had faith in Christ (5:41).",
 bg:"Aminadab is also an Old Testament name (Amminadab, Exodus 6:23), often explained as “my kinsman is noble.”"}),
hel_samuel:BM({name:"Samuel the Lamanite",forms:["Samuel"],books:["hel","3ne","morm"],resp:"SAM-yoo-ul",say:"sam yoo ul",
 plain:"A Lamanite prophet who preached repentance in Zarahemla. The people cast him out, but the Lord sent him back to prophesy from the city wall (Helaman 13:2–4). He foretold the signs of Christ’s birth and death and was untouched by their stones and arrows (Helaman 14–16).",
 bg:"Samuel’s sign of a new star (Helaman 14:5) matches Matthew 2:2. Years later Jesus asked that Samuel’s words be added to the record (3 Nephi 23:9–13). The Hebrew name Shemuel is often explained as “name of God” or “heard by God”; Hannah says “asked of the LORD” (1 Samuel 1:20)."}),
hel_ezias:BM({name:"Ezias",forms:["Ezias"],resp:"ee-ZYE-us",say:"ee zye us",
 plain:"A prophet named only in Helaman 8:20, with Zenock, Isaiah and Jeremiah, as one who testified of Christ.",
 bg:"He is not named in the Bible; the Book of Mormon names him only here. The meaning of the name is not known."}),
hel_jeremiah:BM({name:"Jeremiah",forms:["Jeremiah"],resp:"jair-uh-MY-uh",say:"jair uh mye uh",
 plain:"The prophet in Jerusalem “who testified of the destruction of Jerusalem” (8:20). Nephi says the city’s fall proves such prophets spoke truly.",
 bg:"The Hebrew name Yirmeyahu is often explained as “the LORD exalts.” Lehi’s time is the time of Jeremiah (1 Nephi 5:13)."}),
hel_benjamin:BM({name:"Benjamin",forms:["Benjamin"],resp:"BEN-juh-min",say:"ben juh min",
 plain:"King Benjamin, the Nephite king whose sermon Helaman asks his sons to remember: “there is no other way nor means whereby man can be saved” except through Christ’s atoning blood (5:9).",
 bg:"The sermon is Mosiah 2–5 (the same teaching is in Mosiah 3:17). In the Bible the name means “son of the right hand” (Genesis 35:18)."}),
hel_limhi:BM({name:"Limhi",forms:["Limhi"],books:["hel","ether"],resp:"LIM-hye",say:"lim hye",
 plain:"A king of the people in the land of Nephi, son of King Noah. His servants put Ammon and his brethren in prison (Helaman 5:21), and his people found the twenty-four Jaredite plates (Ether 1:2; 15:33).",
 bg:"The story is in Mosiah 7–22. The text does not give a meaning for the name."}),
hel_gideon:BM({name:"Gideon (city)",forms:["Gideon"],resp:"GID-ee-un",say:"gid ee un",
 plain:"A Nephite city east of the river Sidon, named for the faithful Gideon (Alma 2:20; 6:7). Samuel says woe will come to it for its wickedness (13:15).",
 bg:"The Hebrew name Gideon is often explained as “cutter” or “hewer” (Judges 6)."}),
hel_ammonpeople:BM({name:"Ammon (people of Ammon)",forms:[],books:["hel"],resp:"AM-un",say:"am un",
 plain:"The people of Ammon were Lamanites converted by Ammon and his brothers, who took the name Ammonites after him (Alma 27:26). Helaman 3:12 says many of them, “Lamanites by birth,” also went north.",bg:""}),

// =====================================================================
// 3 NEPHI
// =====================================================================
ne3_nephi:BM({name:"Nephi (son of Nephi)",forms:["Nephi"],books:["3ne","4ne"],resp:"NEE-fye",say:"nee fye",
 plain:"The son of Nephi the son of Helaman, and the chief disciple whom Jesus called by name (3 Nephi 11:18). He raised his brother Timothy from the dead (7:19; 19:4), baptized the disciples and kept the record (4 Nephi 1:19).",
 bg:"Nephi’s father, also named Nephi, left Zarahemla and was not heard of again (3 Nephi 1:2–3). Some Latter-day Saint scholars have proposed Egyptian nfr, “good,” for the name; the text gives no meaning."}),
ne3_nephi_two:BM({name:"Nephi and his father Nephi",forms:[],books:["3ne"],resp:"NEE-fye",say:"nee fye",
 plain:"This verse names two men called Nephi: Nephi the son of Helaman, who left Zarahemla, and his son Nephi, who kept the records after him.",bg:""}),
ne3_lehi:BM({name:"Lehi",forms:["Lehi"],books:["3ne","morm","ether"],resp:"LEE-hye",say:"lee hye",
 plain:"The prophet who left Jerusalem about 600 BC and led his family to the promised land. The Nephites counted their years from that departure (3 Nephi 1:1) and called themselves his children (3 Nephi 5:22; Mormon 4:12).",
 bg:"Hebrew lehi means “jawbone” or “cheek” (Judges 15:9–19 names a place Lehi). The Book of Mormon gives no meaning for the name."}),
ne3_lachoneus:BM({name:"Lachoneus",forms:["Lachoneus"],books:["3ne"],resp:"luh-KO-nee-us",say:"luh ko nee us",
 plain:"The Nephite chief judge and governor when Christ was born (1:1), who gathered all the people to one place to resist the robbers (3:12–25). His son of the same name later held the judgment-seat (6:19).",
 bg:"The text does not give a meaning for the name."}),
ne3_giddianhi:BM({name:"Giddianhi",forms:["Giddianhi"],books:["3ne"],resp:"gid-ee-AN-hye",say:"gid ee an hye",
 plain:"The “governor” of the Gadianton robbers, who wrote Lachoneus a letter demanding that the Nephites give up their lands (3:2–10). He was killed in battle (4:14).",bg:""}),
ne3_gidgiddoni:BM({name:"Gidgiddoni",forms:["Gidgiddoni"],books:["3ne"],resp:"gid-GID-uh-nye",say:"gid gid uh nye",
 plain:"The chief captain of the Nephite armies, a prophet with “the spirit of revelation” (3:18–19). He refused to attack the robbers on their mountains and led the defense instead (3:20–21; 4:24–26).",
 bg:"In Mormon 6:13 a man named Gidgiddonah is one of the leaders at Cumorah; the names are close but not the same."}),
ne3_zemnarihah:BM({name:"Zemnarihah",forms:["Zemnarihah"],books:["3ne"],resp:"zem-nuh-RYE-hah",say:"zem nuh rye hah",
 plain:"The robbers’ leader after Giddianhi, who laid siege to the Nephites (4:17). When the siege failed he was hanged on a tree, and the Nephites cut it down (4:28).",bg:""}),
ne3_mormon:BM({name:"Mormon",forms:["Mormon"],books:["3ne","4ne"],resp:"MOR-mun",say:"mor mun",
 plain:"The Nephite prophet and general who wrote this abridgment. He calls himself “a pure descendant of Lehi” (3 Nephi 5:20).",
 bg:"The Book of Mormon does not say what the name means. “More good” is an old Latter-day Saint explanation, but it works in English only and is not an established translation."}),
ne3_mormon_both:BM({name:"Mormon (the man and the land)",forms:[],books:["3ne"],resp:"MOR-mun",say:"mor mun",
 plain:"This verse uses the name twice: “I am called Mormon, being called after the land of Mormon.” The writer was named for the place where Alma founded the first church (Mosiah 18).",
 bg:"Mormon’s father was also named Mormon (Mormon 1:5)."}),
ne3_moroni_city:BM({name:"Moroni (city)",forms:["Moroni"],books:["3ne"],resp:"mo-RO-nye",say:"mo ro nye",
 plain:"The great city on the east sea, built by Captain Moroni’s people (Alma 50:13). It sank into the sea in the storm that followed Christ’s death (3 Nephi 8:9; 9:4).",
 bg:"It shares its name with the later prophet Moroni, son of Mormon."}),
ne3_moronihah_city:BM({name:"Moronihah (city)",forms:["Moronihah"],books:["3ne"],resp:"mo-ro-NYE-hah",say:"mo ro nye hah",
 plain:"A great city covered by a mountain of earth during the storm (8:10; 9:5). Its name matches Captain Moroni’s son Moronihah.",bg:""}),
ne3_destroyed:BM({name:"Cities destroyed (3 Nephi 9)",forms:["Gadiandi","Gadiomnah","Gimgimno","Jacobugath","Onihah","Mocum","Josh","Gad","Laman","Kishkumen","Gilgal"],books:["3ne"],resp:"",say:"",
 plain:"One of the cities the Lord names as destroyed at His death: some burned, some sunk, some covered with earth or water (3 Nephi 9:3–10). Several names echo earlier robbers and dissenters, such as Kishkumen.",
 bg:"Jacobugath was “inhabited by the people of king Jacob,” and burned for its “secret murders and combinations” (9:9). The text gives no meanings for these names."}),
ne3_jacob:BM({name:"Jacob",forms:["Jacob"],books:["hel","3ne","4ne","morm"],resp:"JAY-kub",say:"jay kub",
 plain:"The patriarch Jacob, also named Israel, father of the twelve tribes. “The God of Abraham, Isaac, and Jacob” and “the house of Jacob” are phrases for covenant Israel.",
 bg:"Genesis ties the name to the Hebrew word for “heel”: Jacob was born holding Esau’s heel (Genesis 25:26), and Esau says the name fits because he “supplanted” him (Genesis 27:36)."}),
ne3_jacob_leader:BM({name:"Jacob (the king of the secret combination)",forms:[],books:["3ne"],resp:"JAY-kub",say:"jay kub",
 plain:"A man the secret combination made its head and called king after the Nephite government fell apart (7:9–12). His people fled north and held the city Jacobugath (9:9).",
 bg:"He is not the patriarch Jacob."}),
ne3_jerusalem_city:BM({name:"Jerusalem (the Nephite-land city)",forms:[],books:["3ne"],resp:"juh-ROO-suh-lum",say:"juh roo suh lum",
 plain:"A city in the land of the Nephites and Lamanites, named after the old Jerusalem. Water covered it in the storm (9:7).",
 bg:"Alma 21:1–2 mentions a Lamanite city called Jerusalem. The old Jerusalem was in the Old World."}),
ne3_newjerusalem:BM({name:"New Jerusalem",forms:["New Jerusalem"],books:["3ne","ether"],resp:"",say:"",
 plain:"A holy city to be built in the Americas for the remnant of Joseph and others who believe. The Savior and Ether both speak of it (3 Nephi 20:22; 21:23–24; Ether 13:3–10).",
 bg:"Ether 13:3 says it “should come down out of heaven,” like the new Jerusalem of Revelation 21:2, and that “the Jerusalem of old” would also be built (Ether 13:5, 11)."}),
ne3_disciples:BM({name:"The twelve disciples",forms:["Timothy","Jonas","Mathoni","Mathonihah","Kumen","Kumenonhi","Shemnon"],books:["3ne"],resp:"",say:"",
 plain:"One of the twelve disciples Jesus chose, named in 3 Nephi 19:4: Nephi; his brother Timothy, whom he raised from the dead; Timothy’s son Jonas; Mathoni and his brother Mathonihah; Kumen; Kumenonhi; Jeremiah; Shemnon; a second Jonas; Zedekiah; Isaiah.",
 bg:"Timothy is Greek for “honoring God.” Jonas is the Greek form of Jonah (Hebrew yonah, “dove”), the form the King James New Testament uses (Matthew 12:39–41). The other names are not explained in the text."}),
ne3_disciple_bible:BM({name:"Names from the Old Testament",forms:["Jeremiah","Zedekiah"],books:["3ne"],resp:"",say:"",
 plain:"Jeremiah, Zedekiah and Isaiah are names of Old Testament prophets and a king, but here they are disciples of Jesus in 3 Nephi 19:4. They may be different men with the same names.",
 bg:"Isaiah means “the LORD saves,” Zedekiah means “the LORD is my righteousness,” and Jeremiah is often explained as “the LORD exalts.”"}),
ne3_samuel_ot:BM({name:"Samuel (the prophet of old)",forms:[],books:["3ne"],resp:"SAM-yoo-ul",say:"sam yoo ul",
 plain:"Jesus says “all the prophets from Samuel and those that follow after” testified of Him (20:24). This is the Old Testament Samuel, not Samuel the Lamanite.",
 bg:"The same words are in Acts 3:24."}),
ne3_hosanna:BM({name:"Hosanna",forms:["Hosanna"],books:["3ne"],resp:"ho-ZAN-uh",say:"ho zan uh",
 plain:"A shout of praise and joy. It comes from Hebrew words meaning “save, we pray,” as in Psalm 118:25. The people cry it after the robbers are defeated (4:32).",
 bg:"The crowd shouted it when Jesus entered Jerusalem (Matthew 21:9), and the Nephites shout it when He appears at Bountiful (3 Nephi 11:17)."}),
ne3_alpha:BM({name:"Alpha and Omega",forms:["Alpha and Omega"],books:["3ne"],resp:"AL-fuh and o-MAY-guh",say:"al fuh and oh may guh",
 plain:"The first and last letters of the Greek alphabet. Jesus uses them to say that He is “the beginning and the end” (9:18).",
 bg:"Revelation 1:8 and 22:13 use the same title."}),
ne3_malachi:BM({name:"Malachi",forms:["Malachi"],books:["3ne"],resp:"MAL-uh-kye",say:"mal uh kye",
 plain:"The Old Testament prophet whose words Jesus had the Nephites write down (24:1). The name means “my messenger.”",
 bg:"The same Hebrew word appears in the first words Jesus gives: “I will send my messenger” (3 Nephi 24:1; Malachi 3:1)."}),
ne3_raca:BM({name:"Raca",forms:["Raca"],books:["3ne"],resp:"RAH-kuh",say:"rah kuh",
 plain:"An Aramaic word of contempt, probably “empty one.” Jesus warns that calling a brother Raca puts one in danger of the council (12:22).",
 bg:"It is the same teaching as Matthew 5:22 in the Sermon on the Mount."}),
ne3_mammon:BM({name:"Mammon",forms:["Mammon"],books:["3ne"],resp:"MAM-un",say:"mam un",
 plain:"An Aramaic word for wealth or riches. Jesus says one cannot serve God and Mammon (13:24).",
 bg:"The same saying is in Matthew 6:24."}),
ne3_gentiles:BM({name:"Gentiles",forms:["Gentiles","Gentile"],books:["3ne","morm","ether"],resp:"",say:"",
 plain:"In the Bible, people who are not of the house of Israel. In the Book of Mormon the Gentiles are especially the nations who would come to the Americas and possess the land, and who may repent and be numbered with Israel (see 3 Nephi 16 and 21).",
 bg:"Mormon and Moroni address the Gentiles directly (Mormon 3:17; Ether 12:38)."}),

// =====================================================================
// 4 NEPHI
// =====================================================================
ne4_amos:BM({name:"Amos",forms:["Amos"],books:["4ne"],resp:"AY-mus",say:"ay mus",
 plain:"Nephi’s son Amos kept the record after him (1:19). His son, also named Amos, kept it after that (1:21), and Amos’s brother Ammaron kept it after him (1:47).",
 bg:"The name Amos is often explained as “carried” or “burden-bearer,” as in the Old Testament prophet Amos."}),
ne4_ammaron:BM({name:"Ammaron",forms:["Ammaron"],books:["4ne","morm"],resp:"AM-uh-ron",say:"am uh ron",
 plain:"The last Nephite keeper of the record before Mormon. He was told by the Holy Ghost to hide up the sacred records, and he charged Mormon, then ten, to take up the plates of Nephi when he was twenty-four (4 Nephi 1:48; Mormon 1:2–4).",
 bg:"The text gives no meaning for the name."}),
ne4_tribes:BM({name:"The “-ites” of 4 Nephi",forms:["Jacobites","Josephites","Zoramites","Lemuelites","Ishmaelites"],books:["3ne","4ne","morm"],resp:"",say:"",
 plain:"Family-line groups named for Lehi’s family and Zoram: Jacobites, Josephites and Zoramites on the Nephite side, and Lemuelites and Ishmaelites with the Lamanites (4 Nephi 1:36–38; Mormon 1:8). They are named for Jacob and Joseph (Nephi’s brothers), Zoram, Lemuel and Ishmael.",
 bg:"Jacob 1:13 lists the same groups. In 4 Nephi the old labels fade, and people are sorted by belief instead: those who accepted the gospel “were called Nephites,” and those who rejected it were called Lamanites (1:37–38)."}),

// =====================================================================
// MORMON
// =====================================================================
morm_mormon:BM({name:"Mormon",forms:["Mormon"],books:["morm","ether","moro"],resp:"MOR-mun",say:"mor mun",
 plain:"The prophet and general who wrote the abridgment of the Nephite records, and the father of Moroni. Mormon 1:5 gives two Mormons: “I, Mormon … and my father’s name was Mormon.”",
 bg:"Mormon says he was named after the land of Mormon, where Alma founded the church (3 Nephi 5:12). The text does not say what the name means. “More good” is an old Latter-day Saint explanation but works in English only, and other proposals exist."}),
morm_bookofmormon:BM({name:"Book of Mormon",forms:["Book of Mormon"],books:["morm"],resp:"",say:"",
 plain:"Mormon’s own name for his record: “the things which I have both seen and heard, and call it the Book of Mormon” (1:1).",bg:"Moroni finished the record (Mormon 8:1)."}),
morm_moroni:BM({name:"Moroni (son of Mormon)",forms:["Moroni"],books:["morm","ether","moro"],resp:"mo-RO-nye",say:"mo ro nye",
 plain:"Mormon’s son, who survived the last battle at Cumorah, finished his father’s record and abridged the Jaredite record as the Book of Ether (Mormon 8:1; Ether 1:1). He wrote the book of Moroni.",
 bg:"He shares his name with Captain Moroni of the book of Alma; the text does not say the son was named after the captain."}),
morm_nephi:BM({name:"Nephi (first Nephi)",forms:["Nephi"],books:["morm"],resp:"NEE-fye",say:"nee fye",
 plain:"Nephi son of Lehi, the first Nephi. Mormon calls himself “a descendant of Nephi” (1:5; 8:13).",
 bg:"The record that Mormon took was called “the plates of Nephi” (1:4)."}),
morm_cumorah:BM({name:"Cumorah",forms:["Cumorah"],books:["morm"],resp:"kyoo-MOR-uh",say:"kyoo mor uh",
 plain:"A hill and a land “of many waters, rivers, and fountains” where the Nephites gathered for their last battle (6:2–4). Mormon hid the sacred records in the hill (6:6) and gave a few plates to Moroni.",
 bg:"The same hill is called Ramah in Ether 15:11. The text gives no meaning for the name."}),
morm_leaders:BM({name:"The leaders at Cumorah",forms:["Gidgiddonah","Lamah","Gilgal","Limhah","Jeneum","Cumenihah","Moronihah","Antionum","Shiblom","Josh"],books:["morm"],resp:"",say:"",
 plain:"One of the twelve leaders who fell with ten thousand men each at Cumorah: Gidgiddonah, Lamah, Gilgal, Limhah, Jeneum, Cumenihah, Moronihah, Antionum, Shiblom, Shem and Josh (6:13–14).",
 bg:"Several of these names are also places or other people elsewhere: Gilgal (3 Nephi 9:6; Ether 13:27), Shem (Mormon 2:20), Antionum (Alma 31:3) and Moronihah (Alma 48–62). The text gives no meanings."}),
morm_shem:BM({name:"Shem (land)",forms:["Shem"],books:["morm"],resp:"SHEM",say:"shem",
 plain:"A land and city to the north where Mormon’s people fled and fortified (2:20–21).",
 bg:"In 6:14 Shem is also a man who fell at Cumorah. Shem is the name of Noah’s son in Genesis 5:32."}),
morm_antum:BM({name:"Antum",forms:["Antum"],books:["morm"],resp:"AN-tum",say:"an tum",
 plain:"The land where Ammaron hid the records, “unto a hill which shall be called Shim” (1:3).",bg:""}),
morm_shim:BM({name:"Shim",forms:["Shim"],books:["morm"],resp:"SHIM",say:"shim",
 plain:"The hill in the land Antum where Ammaron hid the sacred records (1:3). Mormon took up all the records there (4:23).",bg:""}),
morm_jashon:BM({name:"Jashon",forms:["Jashon"],books:["morm"],resp:"JAY-shun",say:"jay shun",
 plain:"A land and city near where Ammaron had hidden the records. The Nephites fled there before the Lamanites (2:16–17).",bg:""}),
morm_teancum_city:BM({name:"Teancum (city)",forms:["Teancum"],books:["morm"],resp:"TEE-an-kum",say:"tee an kum",
 plain:"A city by the seashore near Desolation where Nephites fled (4:3).",
 bg:"The name is the same as Teancum the commander in the book of Alma. The text does not say the city was named for him."}),
morm_desolation:BM({name:"Desolation",forms:["Desolation"],books:["3ne","morm"],resp:"",say:"",
 plain:"The land north of Bountiful, called Desolation because Jaredite bones were found there (Alma 22:30). In Mormon’s day a city of the same name stood near its borders (Mormon 3:5–7; 4:1–2).",
 bg:"Jaredites were destroyed in this north country (Ether 1:1)."}),
morm_angola:BM({name:"Angola",forms:["Angola"],books:["morm"],resp:"ang-GO-luh",say:"ang go luh",
 plain:"A city the Nephites took and fortified, then lost to the Lamanites (2:4).",
 bg:""}),
morm_joshua:BM({name:"Joshua (land)",forms:["Joshua"],books:["morm"],resp:"JOSH-oo-uh",say:"josh oo uh",
 plain:"A land “in the borders west by the seashore” where Mormon’s people marched (2:6).",
 bg:"It is also the name of Moses’ successor, Hebrew Yehoshua, “the LORD saves.”"}),
morm_boaz:BM({name:"Boaz",forms:["Boaz"],books:["morm"],resp:"BO-az",say:"bo az",
 plain:"A city where the Nephites made a stand with “exceeding boldness” before losing to the Lamanites (4:20).",
 bg:"Boaz is also the name of Ruth’s husband in the Bible."}),

// =====================================================================
// ETHER
// =====================================================================
ether_ether:BM({name:"Ether",forms:["Ether"],books:["ether"],resp:"EE-thur",say:"ee thur",
 plain:"The last Jaredite prophet and record keeper, a descendant of Coriantor (1:6). He hid his record, which was found by the people of Limhi (15:33). Moroni abridged it as the Book of Ether (1:2).",
 bg:"The text gives no meaning for the name."}),
ether_jared:BM({name:"Jared",forms:["Jared"],books:["ether","moro"],resp:"JAIR-ud",say:"jair ud",
 plain:"The leader who came with his brother and their families from the great tower and crossed the sea to the promised land. The Jaredites are named for him. Ether gives his brother’s name nowhere, only “the brother of Jared.”",
 bg:"A Latter-day Saint tradition that goes back to the late 1800s says the brother’s name was Mahonri Moriancumer; the book itself names only a place called Moriancumer (2:13). The Bible has a patriarch Jared (Genesis 5:15), whose Hebrew name is often explained as “descent.”"}),
ether_jared_omer:BM({name:"Jared (son of Omer)",forms:[],books:["ether"],resp:"JAIR-ud",say:"jair ud",
 plain:"The son of King Omer. He rebelled against his father and took half the kingdom (8:1–4), and his daughter’s dance before Akish brought about the secret oaths (8:8–17). Akish later killed him (9:5–6).",
 bg:"He is a different man from Jared who came across the sea."}),
ether_moriancumer:BM({name:"Moriancumer",forms:["Moriancumer"],books:["ether"],resp:"mor-ee-AN-kyoo-mur",say:"mor ee an kyoo mur",
 plain:"The place by the sea where the Jaredites pitched their tents and waited four years (2:13). They gave it this name.",
 bg:"The text does not give a meaning. Latter-day Saint tradition from the late 1800s uses Mahonri Moriancumer as the brother of Jared’s name, but that name is not in the book."}),
ether_nimrod:BM({name:"Nimrod (valley)",forms:["Nimrod"],books:["ether"],resp:"NIM-rod",say:"nim rod",
 plain:"The valley northward where Jared’s company went. The text says it was “called after the mighty hunter” (2:1), the Nimrod of Genesis 10:8–9.",
 bg:"A different Nimrod, a son of Cohor, appears in 7:22."}),
ether_nimrod_son:BM({name:"Nimrod (son of Cohor)",forms:[],books:["ether"],resp:"NIM-rod",say:"nim rod",
 plain:"The son of Cohor, who gave up the kingdom of Cohor to Shule and gained his favor (7:22).",
 bg:"The name matches the valley Nimrod (2:1) and the mighty hunter of Genesis 10:8–9."}),
ether_tower:BM({name:"great tower",forms:["great tower","tower"],books:["ether"],resp:"",say:"",
 plain:"The tower of Babel. Jared and his brother came “from the great tower, at the time the Lord confounded the language of the people” (1:33).",
 bg:"Genesis 11:9 says the city was called Babel “because the LORD did there confound the language of all the earth.” Ether keeps that explanation: the Lord confounded the people and scattered them."}),
ether_shelem:BM({name:"Shelem",forms:["Shelem"],books:["ether"],resp:"SHEE-lem",say:"shee lem",
 plain:"The mount where the brother of Jared made sixteen stones. The text says they named it Shelem “because of its exceeding height” (3:1).",bg:"Compare Moriancumer, another place the Jaredites named (2:13)."}),
ether_zerin:BM({name:"Zerin",forms:["Zerin"],books:["ether"],resp:"ZEER-in",say:"zeer in",
 plain:"A mountain that the brother of Jared told to “Remove” and it was removed. Moroni uses this as a lesson in faith (12:30).",bg:"Compare Matthew 17:20 on faith like a mustard seed."}),
ether_orihah:BM({name:"Orihah",forms:["Orihah"],books:["ether"],resp:"or-EYE-hah",say:"or eye hah",
 plain:"A son of Jared, anointed king when his brothers would not accept the throne (6:27). He walked humbly and kept the kingdom righteously (6:30; 7:1).",bg:""}),
ether_kib:BM({name:"Kib",forms:["Kib"],books:["ether"],resp:"KIB",say:"kib",
 plain:"The son of Orihah. His son Corihor rebelled and held him captive for many years (7:3–7), but his other son Shule freed him and restored his kingdom (7:9).",bg:""}),
ether_corihor:BM({name:"Corihor",forms:["Corihor"],books:["ether"],resp:"KOR-ih-hor",say:"kor ih hor",
 plain:"The son of Kib. At thirty-two he rebelled, settled in the land of Nehor, then took his father captive (7:3–7); his brother Shule defeated him (7:9). The name returns for “the land of Corihor” and a valley in 14:27–28.",
 bg:"His son Noah rebelled against Shule and Corihor (7:15). Corihor himself later repented (7:13)."}),
ether_nehor:BM({name:"Nehor (land)",forms:["Nehor"],books:["ether"],resp:"NEE-hor",say:"nee hor",
 plain:"A land and city where Corihor settled when he rebelled against Kib (7:4, 9). Shule fought him there.",
 bg:"In the book of Alma, Nehor is a man whose teachings gave his name to the order of the Nehors."}),
ether_shule:BM({name:"Shule",forms:["Shule"],books:["ether"],resp:"SHOOL",say:"shool",
 plain:"The younger son of Kib. He beat his brother Corihor and restored his father to the kingdom (7:7–9). He later fought Noah and Cohor, and protected prophets (7:23–26).",
 bg:"The text gives no meaning for the name."}),
ether_cohor:BM({name:"Cohor and Noah",forms:["Cohor","Noah"],books:["ether"],resp:"KO-hor, NO-uh",say:"ko hor, no uh",
 plain:"Noah, a son of Corihor, rebelled against his father and Shule and carried Shule captive; Shule’s sons killed him (7:14–18). Two men are called Cohor: Noah’s brother, whom he drew away (7:15), and Noah’s son, who kept the rebel kingdom until Shule’s army killed him (7:20–21).",
 bg:"This Noah is not Noah of the ark, who is named in Ether 6:7. Cohor’s son Nimrod (7:22) shares a name with the mighty hunter."}),
ether_omer:BM({name:"Omer",forms:["Omer"],books:["ether"],resp:"OH-mur",say:"oh mur",
 plain:"The son of Shule, a righteous king. He lost his kingdom to his son Jared, then was warned by the Lord in a dream to leave, and fled east (8:1–9:3). He was later restored (9:13).",
 bg:"Hebrew omer is a measure of grain (Exodus 16:16), but the Book of Mormon does not say the name is Hebrew."}),
ether_akish:BM({name:"Akish",forms:["Akish"],books:["ether"],resp:"AY-kish",say:"ay kish",
 plain:"A friend of Omer who made the secret oaths “handed down even from Cain” (8:15). He married Jared’s daughter, had her father killed, and became king (9:4–6).",
 bg:"The wilderness of Akish is named in 14:3–14. The text gives no meaning for the name."}),
ether_secret:BM({name:"secret combinations",forms:["secret combination","secret combinations"],books:["hel","3ne","4ne","morm","ether","moro"],resp:"",say:"",
 plain:"Secret groups bound by oaths to help each other murder and rob. The Book of Mormon traces the oaths to Satan (Helaman 6:26) and says Akish administered the ancient oaths “handed down even from Cain” (Ether 8:15).",
 bg:"Moroni warns that any nation that upholds such combinations “shall be destroyed” (Ether 8:18–23)."}),
ether_riplakish:BM({name:"Riplakish",forms:["Riplakish"],books:["ether"],resp:"RIP-luh-kish",say:"rip luh kish",
 plain:"A wicked king with many wives and concubines who taxed the people heavily and imprisoned those who would not pay (10:5–8).",
 bg:"His descendants include Morianton (1:23; 10:9). The text gives no meaning for the name."}),
ether_morianton:BM({name:"Morianton (Jaredite)",forms:["Morianton"],books:["ether"],resp:"mor-ee-AN-tun",say:"mor ee an tun",
 plain:"A descendant of Riplakish who gathered an army of outcasts and made himself king over all the land (10:9). He built many cities.",
 bg:"A city and a man named Morianton appear in Alma; they are different."}),
ether_lib:BM({name:"Lib",forms:["Lib"],books:["ether"],resp:"LIB",say:"lib",
 plain:"A Jaredite king in whose days poisonous serpents were destroyed (10:19). Another Lib, brother of Shiz, fought Coriantumr and was killed (14:10–16).",
 bg:"The text gives no meaning for the name."}),
ether_heth:BM({name:"Heth",forms:["Heth"],books:["ether"],resp:"HETH",say:"heth",
 plain:"A Jaredite king who embraced the secret plans, killed his father Com with his sword and drove out the prophets (9:26–29). A land of Heth is also named (8:2).",
 bg:"Another Heth appears in the royal line (1:16, 25; 10:31)."}),
ether_com:BM({name:"Com",forms:["Com"],books:["ether"],resp:"KOM",say:"kom",
 plain:"Several Jaredite men are named Com. One drew away half the kingdom and fought robbers (10:32–34); in his days prophets warned the people (11:1–3).",
 bg:"A Com appears twice in Ether’s genealogy (1:13, 26)."}),
ether_shiblom:BM({name:"Shiblom",forms:["Shiblom","Shiblon"],books:["ether"],resp:"SHIB-lum",say:"shib lum",
 plain:"A Jaredite king, son of Com. His brother rebelled, killed the prophets, and Shiblom was slain (11:4–9). The name is also spelled Shiblon (1:11–12).",
 bg:"The text gives no meaning for the name."}),
ether_moron:BM({name:"Moron",forms:["Moron"],books:["ether"],resp:"MOR-on",say:"mor on",
 plain:"A land where Jaredite kings lived (7:5) and a Jaredite king who did evil and lost the kingdom (11:14–18). Coriantumr later fought in the land of Moron (14:6, 11).",
 bg:"The land is near “the land which is called Desolation” by the Nephites (7:6). The name is close to Moroni but the text gives no connection."}),
ether_coriantumr:BM({name:"Coriantumr",forms:["Coriantumr"],books:["ether"],resp:"kor-ee-AN-tum-er",say:"kor ee an tum er",
 plain:"The last Jaredite king, who fought a long war with Shiz until nearly all the people had died (Ether 13–15). Ether prophesied that he would see his people destroyed and that another people would receive the land (13:20–21).",
 bg:"The same name belonged to a Nephite dissenter in Helaman 1. The text gives no meaning for the name."}),
ether_coriantum:BM({name:"Coriantum, Coriantor",forms:["Coriantum","Coriantor"],books:["ether"],resp:"kor-ee-AN-tum, kor-ee-AN-tor",say:"kor ee an tum, kor ee an tor",
 plain:"Names in the Jaredite royal line, close to Coriantumr. Several kings are called Coriantum (1:13–14, 27–28; 9:21–24). Coriantor was an ancestor of Ether (1:6–7).",bg:""}),
ether_shez:BM({name:"Shez",forms:["Shez"],books:["ether"],resp:"SHEZ",say:"shez",
 plain:"Two men: the descendant of Heth who rebuilt the people after the famine (10:1–4), and his eldest son Shez, who rebelled against him and was struck down by a robber (10:3).",
 bg:"Shez is not the same man as Shiz, the last king’s enemy."}),
ether_shared:BM({name:"Shared",forms:["Shared"],books:["ether"],resp:"SHAIR-ed",say:"shair ed",
 plain:"A man who rose up against Coriantumr and held him in captivity, then was killed by Coriantumr in the valley of Gilgal (13:23–31).",bg:""}),
ether_gilgal:BM({name:"Gilgal (valley)",forms:["Gilgal"],books:["ether"],resp:"GIL-gal",say:"gil gal",
 plain:"A valley where Coriantumr and Shared fought and where Coriantumr killed Shared (13:27–30).",
 bg:"The Hebrew Gilgal, a place in Joshua 4:19–5:9, means something like “rolling” or “circle,” and Joshua 5:9 plays on it."}),
ether_shiz:BM({name:"Shiz",forms:["Shiz"],books:["ether"],resp:"SHIZ",say:"shiz",
 plain:"The brother of the second Lib. He swore to avenge his brother’s death and chased Coriantumr across the land (14:17–24). Their armies fought until both nations were nearly gone, and Coriantumr killed him (15:29–31).",
 bg:"The text gives no meaning for the name."}),
ether_ripliancum:BM({name:"Ripliancum",forms:["Ripliancum"],books:["ether"],resp:"rip-lee-AN-kum",say:"rip lee an kum",
 plain:"The waters where Shiz and Coriantumr camped before the last battle. The text translates the name: “by interpretation, is large, or to exceed all” (15:8).",
 bg:"The sentence is one of the few places Moroni translates a Jaredite name."}),
ether_ramah:BM({name:"Ramah",forms:["Ramah"],books:["ether"],resp:"RAY-muh",say:"ray muh",
 plain:"The hill where Coriantumr’s army camped for the last battle. Moroni says it is “that same hill where my father Mormon did hide up the records” (15:11), the hill the Nephites called Cumorah.",
 bg:"The Hebrew word ramah means “height,” and it is a common place name in the Bible (Joshua 18:25)."}),
ether_cureloms:BM({name:"cureloms and cumoms",forms:["cureloms","cumoms"],books:["ether"],resp:"KYOOR-uh-lomz, KYOO-momz",say:"kyoor uh lomz, kyoo momz",
 plain:"Two kinds of animals named only in Ether 9:19. The text says only that they, with the elephants, were “useful unto man.”",bg:""}),
ether_nephi:BM({name:"Nephi (son of Helaman)",forms:["Nephi"],books:["ether"],resp:"NEE-fye",say:"nee fye",
 plain:"Moroni says it was “the faith of Nephi and Lehi,” Helaman’s sons, that changed the Lamanites so that they were “baptized with fire and with the Holy Ghost” (12:14). See Helaman 5.",bg:"The same name stands for the people in 8:21."}),
ether_lehi_hel:BM({name:"Lehi (son of Helaman)",forms:[],books:["ether"],resp:"LEE-hye",say:"lee hye",
 plain:"Nephi’s brother Lehi, whose faith with Nephi changed the Lamanites (12:14; Helaman 5).",bg:"In Ether 13:5 the name means Lehi the father of Nephi."}),
ether_limhi_plates:BM({name:"twenty-four plates",forms:["twenty and four plates"],books:["ether"],resp:"",say:"",
 plain:"The Jaredite record on twenty-four gold plates found by Limhi’s people (1:2). Moroni abridged it into the Book of Ether.",bg:"Mosiah 8:9 tells how they were found."}),

// =====================================================================
// MORONI
// =====================================================================
moro_sherrizah:BM({name:"Sherrizah",forms:["Sherrizah"],books:["moro"],resp:"shuh-RYE-zuh",say:"shuh rye zuh",
 plain:"A Nephite place with a tower. The Lamanites took many prisoners there (9:7), and widows and daughters stayed there afterward (9:16).",bg:""}),
moro_moriantum:BM({name:"Moriantum",forms:["Moriantum"],books:["moro"],resp:"mor-ee-AN-tum",say:"mor ee an tum",
 plain:"A city where Nephites did terrible things to Lamanite women, which Mormon says matched Lamanite cruelty (9:9).",bg:"The name is close to Moroni, but no connection is stated."}),
moro_commanders:BM({name:"Nephite names in Mormon’s letter",forms:["Archeantus","Luram","Emron","Amoron","Zenephi","Aaron"],books:["moro"],resp:"",say:"",
 plain:"Names of men in Mormon’s letter to Moroni about the war: Archeantus, Luram and Emron fell in battle (9:2). Amoron brought word of prisoners (9:7), Zenephi’s army carried off the food (9:16), and Aaron led an army (9:17).",
 bg:"The text gives no meanings. Aaron is also an Old Testament name."}),
moro_jaredites:BM({name:"Jaredites",forms:["Jaredites"],books:["moro"],resp:"JAIR-ud-ites",say:"jair ud ites",
 plain:"The people of Jared, whose record Moroni abridged as Ether. Mormon warns the Nephites will perish “like unto the Jaredites” if they will not repent (9:23).",bg:""}),
moro_jehovah:BM({name:"Jehovah",forms:["Jehovah"],books:["moro"],resp:"jeh-HO-vuh",say:"jeh ho vuh",
 plain:"A name of God from the Old Testament, usually printed LORD in capital letters in the King James Bible. Moroni ends his book, “before the pleasing bar of the great Jehovah, the Eternal Judge of both quick and dead” (10:34).",
 bg:"Latter-day Saints teach that Jehovah is Jesus Christ."})
});

// ---- Verse-by-verse sorting ----
// Helaman: Nephi
BMALT(["hel.1:1","hel.1:5","hel.1:12","hel.2:12","hel.2:13","hel.3:1","hel.3:17","hel.3:22","hel.5:14","hel.5:16","hel.6:32","hel.6:41","hel.10:19","hel.11:1","hel.11:20","hel.11:24","hel.11:27","hel.11:29","hel.15:3","hel.16:9","hel.16:24"],{hel_nephi:"ne3_nephi_people"});
BMALT(["hel.4:12"],{hel_nephi:"hel_nephi_land"});
BMALT(["hel.5:20"],{hel_nephi:"hel_nephi_both_land"});
BMALT(["hel.11:5"],{hel_nephi:"hel_nephi_both_people"});
BMALT(["hel.7:7","hel.8:22"],{hel_nephi:"hel_nephi_first"});
BMALT(["hel.2:14"],{hel_nephi:"ne3_nephi_plates",hel_helaman:"nolink"});
BMALT(["hel.16:25"],{hel_helaman:"nolink"});
BMALT(["hel.6:26"],{hel_helaman:"hel_helaman_alma"});
// Helaman: Lehi, Mulek, Zarahemla, Ammon
BMALT(["hel.1:28"],{hel_lehi:"hel_lehi_cmdr"});
BMALT(["hel.6:10"],{hel_lehi:"hel_lehi_land",hel_mulek:"hel_mulek_land"});
BMALT(["hel.8:22"],{hel_lehi:"hel_lehi_first"});
BMALT(["hel.5:15"],{hel_mulek:"hel_mulek_place"});
BMALT(["hel.1:15"],{zarahemla:"hel_zarahemla_man"});
BMALT(["hel.3:12"],{ammon:"hel_ammonpeople"});
// 3 Nephi
BMALT(["3ne.1:2","3ne.2:9"],{ne3_nephi:"ne3_nephi_two"});
BMALT(["3ne.2:17","3ne.2:18","3ne.4:16","3ne.7:13","3ne.10:18","3ne.11:1","3ne.28:23"],{ne3_nephi:"ne3_nephi_people"});
BMALT(["3ne.5:9","3ne.5:10","3ne.26:7","3ne.26:11"],{ne3_nephi:"ne3_nephi_plates"});
BMALT(["3ne.7:9","3ne.7:12","3ne.9:9"],{ne3_jacob:"ne3_jacob_leader"});
BMALT(["3ne.9:8"],{ne3_jacob:"ne3_destroyed"});
BMALT(["3ne.9:7"],{jerusalem:"ne3_jerusalem_city"});
BMALT(["3ne.19:4"],{isaiah:"ne3_disciple_bible"});
BMALT(["3ne.20:24"],{hel_samuel:"ne3_samuel_ot"});
BMALT(["3ne.5:12"],{ne3_mormon:"ne3_mormon_both"});
// 4 Nephi
BMALT(["4ne.1:10","4ne.1:39","4ne.1:43","4ne.1:45"],{ne3_nephi:"ne3_nephi_people"});
BMALT(["4ne.1:21"],{ne3_nephi:"ne3_nephi_plates"});
// Mormon
BMALT(["morm.2:1","morm.2:11","morm.2:20"],{morm_nephi:"ne3_nephi_people"});
BMALT(["morm.1:4","morm.2:17","morm.2:18","morm.6:6"],{morm_nephi:"ne3_nephi_plates"});
BMALT(["morm.6:14"],{morm_shem:"morm_leaders"});
// Ether
BMALT(["ether.8:1","ether.8:2","ether.8:5","ether.8:7","ether.8:8","ether.8:9","ether.8:11","ether.8:12","ether.8:13","ether.8:17","ether.9:3","ether.9:4","ether.9:6"],{ether_jared:"ether_jared_omer"});
BMALT(["ether.7:22"],{ether_nimrod:"ether_nimrod_son"});
BMALT(["ether.8:21"],{ether_nephi:"ne3_nephi_people"});
BMALT(["ether.12:14"],{ne3_lehi:"ether_lehi_hel"});

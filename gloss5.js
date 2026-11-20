// Names and words for Leviticus, Numbers and Deuteronomy, with meanings; also extends Genesis/Exodus cards to these books. Checked with audit.js.
// Hebrew names and words for Leviticus, Numbers and Deuteronomy, with name meanings. Loads after gloss4.js (uses GN). Check new word/verse pairings with audit.js.
// ---- Genesis/Exodus cards that carry over with the same meaning ----
TERMS.exo_moses.books.push("lev","num","deu");
TERMS.exo_aaron.books.push("lev","num","deu");
TERMS.exo_miriam.books.push("num","deu");
TERMS.exo_sinai.books.push("lev","num","deu");
TERMS.exo_horeb.books.push("deu");
TERMS.exo_passover.books.push("lev","num","deu");
TERMS.exo_manna.books.push("num","deu");
TERMS.gen_israel.books.push("lev","num","deu");
TERMS.gen_jacob.books.push("lev","num","deu");
TERMS.gen_abraham.books.push("lev","num","deu");
TERMS.gen_isaac.books.push("lev","num","deu");
TERMS.gen_pharaoh.books.push("deu");
TERMS.gen_edom.books.push("num");
TERMS.gen_esau.books.push("deu");
TERMS.gen_hebrew.books.push("deu");
TERMS.gen_levi.books.push("num","deu");
TERMS.gen_judah.books.push("num","deu");
TERMS.gen_dan.books.push("lev","num","deu");
TERMS.gen_naphtali.books.push("num","deu");
TERMS.gen_gad.books.push("num","deu");
TERMS.gen_asher.books.push("num","deu");
TERMS.gen_issachar.books.push("num","deu");
TERMS.gen_zebulun.books.push("num","deu");
// ---- New cards ----
Object.assign(TERMS,{
// ---- People ----
num_joshua:GN({name:"Joshua / Oshea",forms:["Joshua","Oshea","Hoshea","Jehoshua"],resp:"JOSH-oo-uh / o-SHEE-uh",say:"josh oo uh, oh shee uh",heb:"יְהוֹשֻׁעַ / הוֹשֵׁעַ",tr:"Yehoshuaʿ / Hosheaʿ",strong:"H3091 / H1954",books:["num","deu"],
 plain:"Moses’ young servant (Exodus 33:11; Numbers 11:28). He led Israel against Amalek (Exodus 17:9), was one of the twelve spies, and became the leader who took Israel into the promised land. His first name, Oshea (Hoshea), means “salvation”; Moses renamed him Jehoshua, Joshua (13:16), “the LORD saves” or “the LORD is salvation.”",
 bg:"Jesus is the same name, Yeshua, in its later Hebrew and Greek form, and the KJV New Testament twice writes Joshua as “Jesus” (Acts 7:45; Hebrews 4:8)."}),
num_caleb:GN({name:"Caleb",forms:["Caleb"],resp:"KAY-leb",say:"kay lebb",heb:"כָּלֵב",tr:"Kalev",strong:"H3612",books:["num","deu"],
 plain:"The spy from the tribe of Judah who, with Joshua, urged Israel to trust God and take the land; the LORD said he “hath followed me fully” (Numbers 14:24). The name is usually linked to kelev, “dog,” though some suggest other meanings.",
 bg:"At eighty-five he asked for the hill country he had spied out, and received Hebron (Joshua 14:10–14)."}),
lev_eleazar:GN({name:"Eleazar",forms:["Eleazar"],resp:"el-ee-AY-zer",say:"ell ee ay zer",heb:"אֶלְעָזָר",tr:"Elʿazar",strong:"H499",books:["lev","num","deu"],
 plain:"Aaron’s son, who became high priest when Moses put Aaron’s garments on him at Mount Hor (Numbers 20:25–28). The name means “God has helped.”",
 bg:"He served beside Moses and then Joshua in numbering the people and dividing the land (Numbers 26:1–3; 34:17)."}),
num_phinehas:GN({name:"Phinehas",forms:["Phinehas"],resp:"FIN-ee-us",say:"finn ee us",heb:"פִּינְחָס",tr:"Pinchas",strong:"H6372",books:["num"],
 plain:"Son of Eleazar and grandson of Aaron, who stopped the plague at Peor by his zeal and was given “the covenant of an everlasting priesthood” (Numbers 25:7–13). The name is widely thought to be Egyptian, meaning “the Nubian” or “the dark-skinned one.”",
 bg:"A psalm remembers him: “Then stood up Phinehas, and executed judgment: and so the plague was stayed” (Psalm 106:30)."}),
lev_nadab:GN({name:"Nadab",forms:["Nadab"],resp:"NAY-dab",say:"nay dabb",heb:"נָדָב",tr:"Nadav",strong:"H5070",books:["lev","num"],
 plain:"Aaron’s eldest son, who with his brother Abihu offered “strange fire before the LORD” and was consumed (Leviticus 10:1–2). The name means “generous” or “willing.”",
 bg:"Earlier the two brothers had gone up the mount with Moses and seventy elders and “saw the God of Israel” (Exodus 24:9–10)."}),
lev_abihu:GN({name:"Abihu",forms:["Abihu"],resp:"uh-BYE-hyoo",say:"uh bye hyoo",heb:"אֲבִיהוּא",tr:"Avihu",strong:"H30",books:["lev","num"],
 plain:"Aaron’s second son, who died with his brother Nadab for offering “strange fire” (Leviticus 10:1–2; Numbers 3:4). The name means “he is my father,” that is, God is my father.",
 bg:"Earlier the two brothers had gone up the mount with Moses and seventy elders and “saw the God of Israel” (Exodus 24:9–10)."}),
num_korah:GN({name:"Korah",forms:["Korah"],resp:"KOR-uh",say:"kor uh",heb:"קֹרַח",tr:"Qorach",strong:"H7141",books:["num"],
 plain:"A Levite, grandson of Kohath (Numbers 16:1), who led a rebellion against Moses and Aaron, claiming the priesthood for himself; the earth swallowed the rebels (16:31–33). The name is usually understood to mean “bald.”",
 bg:"“The children of Korah died not” (26:11), and several psalms, such as Psalm 42 and 84, are titled “for the sons of Korah.”"}),
num_dathan:GN({name:"Dathan",forms:["Dathan"],resp:"DAY-thun",say:"day thun",heb:"דָּתָן",tr:"Datan",strong:"H1885",books:["num","deu"],
 plain:"A man of the tribe of Reuben who joined Korah’s rebellion with his brother Abiram (Numbers 16:1, 12–14). The meaning of the name is uncertain.",
 bg:"Moses reminded Israel how “the earth opened her mouth, and swallowed them up” (Deuteronomy 11:6)."}),
num_abiram:GN({name:"Abiram",forms:["Abiram"],resp:"uh-BYE-rum",say:"uh bye rum",heb:"אֲבִירָם",tr:"Aviram",strong:"H48",books:["num","deu"],
 plain:"Dathan’s brother, of the tribe of Reuben, who rebelled with Korah and refused Moses’ summons: “We will not come up” (Numbers 16:12). The name means “my father is exalted,” much like Abram.",
 bg:"Moses reminded Israel how “the earth opened her mouth, and swallowed them up” (Deuteronomy 11:6)."}),
num_balaam:GN({name:"Balaam",forms:["Balaam"],resp:"BAY-lum",say:"bay lum",heb:"בִּלְעָם",tr:"Bilʿam",strong:"H1109",books:["num","deu"],
 plain:"A seer from Pethor whom Balak hired to curse Israel, but who could only bless them (Numbers 22–24); his donkey saw the angel before he did (22:23–28). The meaning of the name is uncertain.",
 bg:"His counsel later led Israel into sin at Peor (31:16), and the New Testament says he “loved the wages of unrighteousness” (2 Peter 2:15)."}),
num_balak:GN({name:"Balak",forms:["Balak"],resp:"BAY-lak",say:"bay lack",heb:"בָּלָק",tr:"Balaq",strong:"H1111",books:["num"],
 plain:"The king of Moab, son of Zippor, who feared Israel and hired Balaam to curse them (Numbers 22:2–6). The name is usually explained as “one who lays waste” or “devastator.”",
 bg:"Micah asked Israel to “remember now what Balak king of Moab consulted, and what Balaam the son of Beor answered him” (Micah 6:5)."}),
// ---- Peoples ----
num_moab:GN({name:"Moab",forms:["Moab","Moabites","Moabite"],resp:"MO-ab",say:"mo abb",heb:"מוֹאָב",tr:"Moʾav",strong:"H4124",books:["num","deu"],
 plain:"The land and people east of the Dead Sea, descended from the son of Lot’s elder daughter (Genesis 19:36–37). The name is often explained as “from father” (me-av), recalling that origin, but this is uncertain.",
 bg:"Israel camped in “the plains of Moab” before entering the land, and Moses died there (Deuteronomy 34:5). Ruth, David’s great-grandmother, was from Moab (Ruth 1:4)."}),
num_midian:GN({name:"Midian",forms:["Midian","Midianites","Midianite","Midianitish"],resp:"MID-ee-un",say:"midd ee un",heb:"מִדְיָן",tr:"Midyan",strong:"H4080",books:["num"],
 plain:"A desert people descended from Midian, a son of Abraham and Keturah (Genesis 25:1–2). The name is often explained as “strife,” though this is uncertain.",
 bg:"Moses’ father-in-law Jethro was “the priest of Midian” (Exodus 3:1), but in Numbers the elders of Midian join Moab against Israel (22:4–7)."}),
num_amalek:GN({name:"Amalek",forms:["Amalek","Amalekites"],resp:"AM-uh-lek",say:"am uh leck",heb:"עֲמָלֵק",tr:"ʿAmaleq",strong:"H6002",books:["num","deu"],
 plain:"A desert people descended from Amalek, a grandson of Esau (Genesis 36:12), who attacked Israel on the way from Egypt. The meaning of the name is uncertain.",
 bg:"Moses told Israel, “Remember what Amalek did unto thee by the way” (Deuteronomy 25:17), recalling the battle in Exodus 17:8–16."}),
num_og:GN({name:"Og",forms:["Og"],resp:"OG",say:"ogg",heb:"עוֹג",tr:"ʿOg",strong:"H5747",books:["num","deu"],
 plain:"King of Bashan, east of the Jordan, defeated by Israel at Edrei (Numbers 21:33–35). The meaning of the name is uncertain.",
 bg:"He was the last “of the remnant of giants,” and his iron bedstead was nine cubits long (Deuteronomy 3:11)."}),
num_sihon:GN({name:"Sihon",forms:["Sihon"],resp:"SY-hon",say:"sy hon",heb:"סִיחוֹן",tr:"Sichon",strong:"H5511",books:["num","deu"],
 plain:"King of the Amorites at Heshbon, who refused to let Israel pass through his land and was defeated (Numbers 21:21–26). The meaning of the name is uncertain.",
 bg:"Israel’s victories over Sihon and Og are remembered as signs of the LORD’s power (Deuteronomy 31:4; Psalm 136:19–20)."}),
num_anak:GN({name:"Anak / Anakims",forms:["Anak","Anakims"],resp:"AY-nak",say:"ay nack",heb:"עֲנָק",tr:"ʿAnaq",strong:"H6061",books:["num","deu"],
 plain:"A clan of very tall people near Hebron; the spies said, “we were in our own sight as grasshoppers” (Numbers 13:33). The word anaq means “neck,” so the name may mean “long-necked,” that is, tall, but this is uncertain.",
 bg:"Deuteronomy calls them “Anakims” (an English -s added to the Hebrew plural -im) and compares other giant peoples to them (Deuteronomy 2:10–11)."}),
deu_ammon:GN({name:"Ammon",forms:["Ammon","Ammonites","Ammonite"],resp:"AM-un",say:"am un",heb:"עַמּוֹן",tr:"ʿAmmon",strong:"H5983",books:["num","deu"],
 plain:"A people east of the Jordan descended from Ben-ammi, son of Lot’s younger daughter (Genesis 19:38). Ben-ammi means “son of my people,” and Ammon probably comes from the same word, ʿam, “people” or “kin.”",
 bg:"God gave their land “unto the children of Lot” and told Israel not to fight them (Deuteronomy 2:19). They are not connected with Ammon in the Book of Mormon (Mosiah 7:3)."}),
lev_canaan:GN({name:"Canaan",forms:["Canaan","Canaanites","Canaanite"],resp:"KAY-nun",say:"kay nun",heb:"כְּנַעַן",tr:"Kenaʿan",strong:"H3667",books:["lev","num","deu"],
 plain:"The land west of the Jordan that God promised to Abraham’s descendants, named after Canaan, the son of Ham (Genesis 10:6, 15–19). The meaning of the name is debated; it may be linked to an old word for purple dye, or mean “lowland.”",
 bg:"The Canaanites were one of several peoples living there when Israel arrived (Deuteronomy 7:1)."}),
lev_levites:GN({name:"Levites",forms:["Levites","Levite"],resp:"LEE-vites",say:"lee vites",heb:"לְוִיִּם",tr:"Leviyyim",strong:"H3881",books:["lev","num","deu"],
 plain:"The tribe of Levi, set apart to care for the tabernacle in place of Israel’s firstborn (Numbers 3:12). Levi means “joined,” and the LORD plays on it: “that they may be joined unto thee, and minister unto thee” (18:2, 4).",
 bg:"They received no land, “the LORD is his inheritance” (Deuteronomy 10:9). John the Baptist promised the Aaronic Priesthood would remain “until the sons of Levi do offer again an offering unto the Lord in righteousness” (D&C 13:1)."}),
// ---- Places ----
num_jordan:GN({name:"Jordan",forms:["Jordan"],resp:"JOR-dun",say:"jor dun",heb:"יַרְדֵּן",tr:"Yarden",strong:"H3383",books:["num","deu"],
 plain:"The river that runs from the north down to the Dead Sea, the eastern border of the promised land, which Israel had to “pass over.” The name is usually explained as “the descender,” from yarad, “to go down,” fitting a river that falls steeply.",
 bg:"Jesus was baptized by John in the Jordan (Matthew 3:13). Lehi foresaw John baptizing “in Bethabara, beyond Jordan” (1 Nephi 10:9)."}),
num_jericho:GN({name:"Jericho",forms:["Jericho"],resp:"JAIR-ih-ko",say:"jair ih ko",heb:"יְרִיחוֹ",tr:"Yericho",strong:"H3405",books:["num","deu"],
 plain:"A walled city west of the Jordan, across from Israel’s last camp “in the plains of Moab by Jordan near Jericho” (Numbers 26:3). The name may come from yareach, “moon,” or from a word for “fragrance”; it is uncertain.",
 bg:"Deuteronomy calls it “the city of palm trees” (34:3). Its walls fell when Israel shouted (Joshua 6:20)."}),
num_kadesh:GN({name:"Kadesh / Kadesh-barnea",forms:["Kadesh-barnea","Kadesh"],resp:"KAY-desh BAR-nee-uh",say:"kay desh bar nee uh",heb:"קָדֵשׁ בַּרְנֵעַ",tr:"Qadesh Barneaʿ",strong:"H6946 / H6947",books:["num","deu"],
 plain:"An oasis on the southern edge of the land where Israel stayed “many days” (Deuteronomy 1:46); the spies returned there and Miriam died there (Numbers 13:26; 20:1). Kadesh means “holy”; the meaning of Barnea is uncertain.",
 bg:"It lay in the wilderness of Zin, and the water of Meribah was there (Numbers 20:1, 13; 27:14)."}),
num_paran:GN({name:"Paran",forms:["Paran"],resp:"PAY-run",say:"pay run",heb:"פָּארָן",tr:"Paran",strong:"H6290",books:["num","deu"],
 plain:"The wilderness south of Canaan, between Sinai and the land, from which Moses sent the twelve spies (Numbers 10:12; 13:3). The meaning of the name is uncertain.",
 bg:"Moses sang that the LORD “shined forth from mount Paran” (Deuteronomy 33:2), and Habakkuk says “the Holy One from mount Paran” (Habakkuk 3:3)."}),
num_zin:GN({name:"Zin",forms:["Zin"],resp:"ZIN",say:"zinn",heb:"צִן",tr:"Tsin",strong:"H6790",books:["num","deu"],
 plain:"The wilderness on the southern border of Canaan, where Kadesh lay (Numbers 20:1; 34:3). The meaning of the name is uncertain.",
 bg:"It is a different place, spelled differently in Hebrew, from the wilderness of Sin near Egypt (Exodus 16:1)."}),
num_hor:GN({name:"Mount Hor",forms:["Hor"],resp:"HOR",say:"hor",heb:"הֹר הָהָר",tr:"Hor ha-Har",strong:"H2023",books:["num","deu"],
 plain:"The mountain “by the coast of the land of Edom” where Aaron died and Eleazar became high priest (Numbers 20:23–28). In Hebrew it is “Hor the mountain”; hor is probably an old form of har, “mountain.”",
 bg:"Aaron died there in the fortieth year after leaving Egypt, aged 123 (33:38–39; Deuteronomy 32:50)."}),
num_hor_north:GN({name:"Mount Hor (northern border)",forms:[],resp:"HOR",say:"hor",heb:"הֹר הָהָר",tr:"Hor ha-Har",strong:"H2023",books:["num"],
 plain:"A mountain marking the northern border of the promised land (Numbers 34:7–8), a different mountain from the Mount Hor where Aaron died. Its name, “Hor the mountain,” probably just means “the mountain.”",
 bg:"Where it was is unknown; it was probably a peak in the Lebanon range."}),
num_horhagidgad:GN({name:"Hor-hagidgad",forms:["Hor-hagidgad"],resp:"hor-huh-GID-gad",say:"hor huh gidd gadd",heb:"חֹר הַגִּדְגָּד",tr:"Chor ha-Gidgad",strong:"",books:["num"],
 plain:"One of Israel’s camps in the wilderness (Numbers 33:32–33). Hor here is a different Hebrew word from Mount Hor and probably means “hole” or “hollow”; the meaning of Gidgad is uncertain.",
 bg:"It is probably the same place as Gudgodah (Deuteronomy 10:7)."}),
num_dibon:GN({name:"Dibon / Dibon-gad",forms:["Dibon-gad","Dibon"],resp:"DY-bon",say:"dy bon",heb:"דִּיבֹן",tr:"Divon",strong:"H1769",books:["num"],
 plain:"A town east of the Dead Sea, taken from Sihon and rebuilt by the tribe of Gad (Numbers 21:30; 32:34); so Israel’s camp there is called Dibon-gad, “Dibon of Gad” (33:45). The meaning of Dibon is uncertain.",bg:""}),
num_nebo:GN({name:"Nebo",forms:["Nebo"],resp:"NEE-bo",say:"nee bo",heb:"נְבוֹ",tr:"Nevo",strong:"H5015",books:["num","deu"],
 plain:"A mountain in Moab from which the LORD showed Moses the promised land before he died (Deuteronomy 34:1–5), and a nearby town given to Reuben (Numbers 32:38). The meaning is uncertain; it is often linked to Nabu, a Babylonian god.",
 bg:"Isaiah names that god: “Bel boweth down, Nebo stoopeth” (Isaiah 46:1)."}),
num_pisgah:GN({name:"Pisgah",forms:["Pisgah"],resp:"PIZ-guh",say:"pizz guh",heb:"פִּסְגָּה",tr:"Pisgah",strong:"H6449",books:["num","deu"],
 plain:"A ridge or summit in the mountains of Moab, where Balak took Balaam (Numbers 23:14) and Moses viewed the land “to the top of Pisgah” (Deuteronomy 34:1). The word probably means “peak” or “ridge,” and is usually written “the Pisgah” in Hebrew.",
 bg:"Ashdoth-pisgah (Deuteronomy 3:17) means “the slopes” or “springs of Pisgah,” as the KJV puts it in 4:49."}),
num_abarim:GN({name:"Abarim",forms:["Abarim","Ije-abarim"],resp:"AB-uh-rim",say:"abb uh rimm",heb:"הָעֲבָרִים",tr:"ha-ʿAvarim",strong:"H5682",books:["num","deu"],
 plain:"The mountains of Moab east of the Jordan and the Dead Sea, including Nebo (Deuteronomy 32:49). The name means “the regions beyond” or “the parts across,” and Ije-abarim (Numbers 21:11) means “ruins” or “heaps of Abarim.”",
 bg:"From there the LORD told Moses, “Get thee up into this mount Abarim, and see the land” (Numbers 27:12)."}),
num_peor:GN({name:"Peor / Baal-peor / Beth-peor",forms:["Baal-peor","Beth-peor","Peor"],resp:"PEE-or",say:"pee or",heb:"פְּעוֹר",tr:"Peʿor",strong:"H6465",books:["num","deu"],
 plain:"A mountain in Moab (Numbers 23:28), where Israel worshipped Baal-peor, “the lord (baal) of Peor,” and a plague followed (25:1–9); Beth-peor, “house of Peor,” was a town nearby, near which Moses was buried (Deuteronomy 34:6). The meaning of Peor is uncertain; it may mean “opening.”",
 bg:"Hosea recalls it: “they went to Baal-peor, and separated themselves unto that shame” (Hosea 9:10)."}),
num_meribah:GN({name:"Meribah",forms:["Meribah"],resp:"MAIR-ih-buh",say:"mair ih buh",heb:"מְרִיבָה",tr:"Merivah",strong:"H4809",books:["num","deu"],
 plain:"The place at Kadesh where Moses struck the rock for water: “This is the water of Meribah; because the children of Israel strove with the LORD” (Numbers 20:13). The name means “strife” or “quarreling.”",
 bg:"Because Moses and Aaron did not sanctify the LORD there, they were not allowed to enter the land (20:12; Deuteronomy 32:51). An earlier place near Horeb had the same name (Exodus 17:7)."}),
deu_massah:GN({name:"Massah",forms:["Massah"],resp:"MASS-uh",say:"mass uh",heb:"מַסָּה",tr:"Massah",strong:"H4532",books:["deu"],
 plain:"The place near Horeb where Israel demanded water and “tempted the LORD, saying, Is the LORD among us, or not?” (Exodus 17:7). The name means “testing” or “proving.”",
 bg:"Jesus answered Satan with Moses’ words, “Ye shall not tempt the LORD your God, as ye tempted him in Massah” (Deuteronomy 6:16; Matthew 4:7)."}),
num_hormah:GN({name:"Hormah",forms:["Hormah"],resp:"HOR-muh",say:"hor muh",heb:"חׇרְמָה",tr:"Chormah",strong:"H2767",books:["num","deu"],
 plain:"A place in the south of Canaan. Israel “utterly destroyed” the Canaanites there, “and he called the name of the place Hormah” (Numbers 21:3), “destruction,” from cherem, a thing devoted to destruction.",
 bg:"Earlier Israel had been beaten back to Hormah when they went up against the LORD’s word (Numbers 14:45; Deuteronomy 1:44)."}),
num_kibroth:GN({name:"Kibroth-hattaavah",forms:["Kibroth-hattaavah"],resp:"KIB-roth-huh-TAY-uh-vuh",say:"kibb roth huh tay uh vuh",heb:"קִבְרוֹת הַתַּאֲוָה",tr:"Qivrot ha-Taʾavah",strong:"H6914",books:["num","deu"],
 plain:"A camp where Israel craved meat and many died after eating the quails. The name means “graves of craving” (or “of lust”), “because there they buried the people that lusted” (Numbers 11:34).",bg:""}),
num_taberah:GN({name:"Taberah",forms:["Taberah"],resp:"TAB-eh-ruh",say:"tabb eh ruh",heb:"תַּבְעֵרָה",tr:"Tavʿerah",strong:"H8404",books:["num","deu"],
 plain:"A place where the people complained and fire from the LORD burned in the camp. The name means “burning,” “because the fire of the LORD burnt among them” (Numbers 11:3).",bg:""}),
deu_seir:GN({name:"Seir",forms:["Seir"],resp:"SEE-er",say:"see er",heb:"שֵׂעִיר",tr:"Seʿir",strong:"H8165",books:["num","deu"],
 plain:"The mountain country of Edom, south of the Dead Sea: “I have given mount Seir unto Esau for a possession” (Deuteronomy 2:5). The name means “hairy,” perhaps for its rough brush, and recalls Esau, born “like an hairy garment” (Genesis 25:25).",
 bg:"Moses sang that the LORD “rose up from Seir” (Deuteronomy 33:2)."}),
deu_gerizim:GN({name:"Gerizim",forms:["Gerizim"],resp:"GAIR-ih-zim",say:"gair ih zimm",heb:"גְּרִזִּים",tr:"Gerizzim",strong:"H1630",books:["deu"],
 plain:"The mountain where half the tribes were to stand and speak the blessings of the covenant, facing Mount Ebal (Deuteronomy 11:29; 27:12). The meaning of the name is uncertain.",
 bg:"Joshua carried out the ceremony (Joshua 8:33). The Samaritans later worshipped there, as the woman at the well said, “Our fathers worshipped in this mountain” (John 4:20)."}),
deu_ebal:GN({name:"Ebal",forms:["Ebal"],resp:"EE-bul",say:"ee bull",heb:"עֵיבָל",tr:"ʿEival",strong:"H5858",books:["deu"],
 plain:"The mountain facing Gerizim where the curses of the covenant were to be spoken, and where Israel was to build an altar and write the law on plastered stones (Deuteronomy 27:4–8, 13). The meaning of the name is uncertain.",
 bg:"Joshua built the altar there (Joshua 8:30–32)."}),
// ---- Words ----
lev_urim:GN({name:"Urim and Thummim",forms:["Urim","Thummim"],resp:"YOO-rim, THUM-im",say:"yoo rim, thumm im",heb:"הָאוּרִים וְהַתֻּמִּים",tr:"ha-Urim ve-ha-Tummim",strong:"H224 / H8550",books:["lev","num","deu"],
 plain:"Sacred objects in the high priest’s breastplate, used to learn the will of the LORD (Leviticus 8:8; Numbers 27:21). The words are usually translated “lights and perfections,” though their exact meaning is uncertain.",
 bg:"They were first placed in the breastplate in Exodus 28:30. Joseph Smith received “two stones in silver bows” called the Urim and Thummim with the plates (Joseph Smith—History 1:35; D&C 17:1)."}),
lev_jubile:GN({name:"jubile",forms:["jubile"],resp:"yo-VELL",say:"yo vell",heb:"יוֹבֵל",tr:"yovel",strong:"H3104",books:["lev","num"],
 plain:"Every fiftieth year, when Israel was to “proclaim liberty throughout all the land,” free slaves and return land to its family (Leviticus 25:10). The Hebrew yovel means “ram’s horn,” the trumpet that announced the year (25:9).",
 bg:"The KJV spells it “jubile.” Jesus read “to preach the acceptable year of the Lord” from Isaiah, words that echo the jubile (Luke 4:18–19)."}),
lev_atonement:GN({name:"atonement",forms:["atonement"],resp:"kip-poo-REEM",say:"kip poo reem",heb:"כִּפֻּרִים",tr:"kippurim",strong:"",books:["lev","num"],
 plain:"The KJV word for what the priest did with a sacrifice so that sin was forgiven and the person made clean (Leviticus 4:20; 17:11). The Hebrew root kpr is often explained as “cover,” but “wipe away” and “ransom” are also proposed, and scholars debate it.",
 bg:"The day of atonement, yom kippurim, is described in Leviticus 16 and 23:27–28; the English word means “at-one-ment.” The Book of Mormon teaches that the law was “every whit pointing to that great and last sacrifice,” the Son of God (Alma 34:14)."}),
lev_scapegoat:GN({name:"scapegoat (Azazel)",forms:["scapegoat"],resp:"uh-zuh-ZAYL",say:"ah zah zale",heb:"עֲזָאזֵל",tr:"ʿazazel",strong:"H5799",books:["lev"],
 plain:"On the day of atonement one goat was chosen “for the scapegoat,” Hebrew la-azazel, “for Azazel,” and sent alive into the wilderness carrying Israel’s sins (Leviticus 16:8–10, 21–22). What azazel means is debated: the KJV took it as “the goat that goes away,” while others read it as “complete removal,” a rugged place, or the name of a wilderness spirit.",
 bg:"William Tyndale coined the English word “scapegoat” (an escape goat) in his 1530 translation."})
});
Object.assign(ALT,{
 "deu.34:1":{gen_dan:"gen_dan_city"},
 "num.34:7":{num_hor:"num_hor_north"},
 "num.34:8":{num_hor:"num_hor_north"}
});

TERMS.num_joshua.books.push("exo");
["gen_reuben","gen_simeon","gen_benjamin","gen_joseph","gen_manasseh","gen_ephraim"].forEach(k=>TERMS[k].books.push("num","deu"));
Object.assign(TERMS,{num_joseph_igal:GN({name:"Joseph (father of Igal)",forms:[],resp:"JOH-sef",say:"joh sef",heb:"יוֹסֵף",tr:"Yosef",strong:"H3130",books:["num"],
 plain:"The father of Igal, the spy chosen from the tribe of Issachar (13:7). He is a different man from Jacob’s son Joseph. The name means “may he add.”",bg:""})});
ALT["num.13:7"]=Object.assign(ALT["num.13:7"]||{},{gen_joseph:"num_joseph_igal"});

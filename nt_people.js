// New Testament people: names across the New Testament, each with a Bio tab.
// Only names that always mean the same person in the New Testament are linked automatically.
// Every new word/verse pairing is listed by audit.js and checked before it is approved.
const NTB=(...b)=>b;
TERMS.peter.books=NTB("mat","mark","luke","john","acts","gal","1pet","2pet");
TERMS.pilate.books=NTB("mat","mark","luke","john","acts","1tim");
TERMS.caiaphas.books=NTB("mat","luke","john","acts");
Object.assign(TERMS,{
paul:G({name:"Paul",forms:["Paul"],resp:"PAWL",say:"pawl",heb:"Παῦλος",tr:"Paulos",strong:"G3972",books:NTB("acts","rom","1cor","2cor","gal","eph","phil","col","1thes","2thes","1tim","2tim","titus","phlm","2pet"),
 plain:"The Apostle Paul, first known by his Hebrew name Saul. Once a persecutor of Christians, he became the Church’s great missionary to the Gentiles and wrote most of the New Testament’s letters.",bg:""}),
nicodemus:G({name:"Nicodemus",forms:["Nicodemus"],resp:"nick-oh-DEE-mus",say:"nick oh dee mus",heb:"Νικόδημος",tr:"Nikodēmos",strong:"G3530",books:NTB("john"),
 plain:"A Pharisee and “a ruler of the Jews” who came to Jesus by night and was taught that a man must be born again (John 3).",bg:""}),
zacchaeus:G({name:"Zacchaeus",forms:["Zacchaeus"],resp:"zak-KEE-us",say:"zak kee us",heb:"Ζακχαῖος",tr:"Zakchaios",strong:"G2195",books:NTB("luke"),
 plain:"A rich chief tax collector in Jericho who climbed a sycamore tree to see Jesus (Luke 19:1–10).",bg:""}),
barnabas:G({name:"Barnabas",forms:["Barnabas"],resp:"BAR-nuh-bus",say:"bar nuh bus",heb:"Βαρναβᾶς",tr:"Barnabas",strong:"G921",books:NTB("acts","1cor","gal","col"),
 plain:"A generous early disciple from Cyprus and Paul’s first missionary companion. The Apostles gave him the name, which means “son of consolation” (Acts 4:36).",bg:""}),
stephen:G({name:"Stephen",forms:["Stephen"],resp:"STEE-ven",say:"stee ven",heb:"Στέφανος",tr:"Stephanos",strong:"G4736",books:NTB("acts"),
 plain:"One of seven men chosen to help the Apostles, and the first Christian martyr (Acts 6–7).",bg:""}),
cornelius:G({name:"Cornelius",forms:["Cornelius"],resp:"kor-NEEL-yus",say:"kor neel yus",heb:"Κορνήλιος",tr:"Kornēlios",strong:"G2883",books:NTB("acts"),
 plain:"A Roman centurion in Caesarea, the first Gentile convert, baptized after Peter’s vision (Acts 10).",bg:""}),
martha:G({name:"Martha",forms:["Martha"],resp:"MAR-thuh",say:"mar thuh",heb:"Μάρθα",tr:"Martha",strong:"G3136",books:NTB("luke","john"),
 plain:"Sister of Mary and Lazarus in Bethany, and a close friend of Jesus.",bg:""}),
thomas:G({name:"Thomas",forms:["Thomas"],resp:"TOM-us",say:"tom us",heb:"Θωμᾶς",tr:"Thōmas",strong:"G2381",books:NTB("mat","mark","luke","john","acts"),
 plain:"One of the Twelve Apostles, also called Didymus, which means “twin.”",bg:""}),
magdalene:G({name:"Mary Magdalene",forms:["Mary Magdalene"],resp:"MAG-duh-leen",say:"mag duh leen",heb:"Μαγδαληνή",tr:"Magdalēnē",strong:"G3094",books:NTB("mat","mark","luke","john"),
 plain:"A disciple from the town of Magdala who followed Jesus, stood by the cross and was the first to see Him risen.",bg:""})
});
const DEEP_NT={
peter:{tab:"Bio",secs:[
 ["A fisherman named Simon",["Peter’s given name was Simon, son of Jona (Matthew 16:17). He came from Bethsaida (John 1:44) and fished with his brother Andrew on the Sea of Galilee, living in Capernaum (Mark 1:21, 29). He was married; Jesus healed his wife’s mother (Mark 1:30–31).","Andrew brought him to Jesus, who gave him a new name: Cephas in Aramaic, Petros in Greek, both meaning “stone” (John 1:40–42)."]],
 ["With Jesus",["Peter walked on the water and began to sink (Matthew 14:28–31). When Jesus asked who He was, Peter answered, “Thou art the Christ, the Son of the living God,” and Jesus promised him the keys of the kingdom (Matthew 16:16–19). With James and John he saw the Transfiguration (Matthew 17:1–9).","On the night of the arrest he denied knowing Jesus three times, then went out and wept bitterly (Luke 22:54–62). After the Resurrection, Jesus asked him three times, “Lovest thou me?” and told him, “Feed my sheep” (John 21:15–17)."]],
 ["Leading the Church",["On the day of Pentecost Peter preached, and about three thousand were baptized (Acts 2:41). He healed a man lame from birth at the temple gate (Acts 3), and after a vision he baptized Cornelius, opening the gospel to the Gentiles (Acts 10). Two letters in the New Testament carry his name."]],
 ["In the Restoration",["Peter, James and John came to Joseph Smith and Oliver Cowdery and gave them the Melchizedek Priesthood (D&C 27:12; 128:20)."]],
 ["His death",["Jesus told Peter he would be bound and taken where he did not want to go, “signifying by what death he should glorify God” (John 21:18–19). Early Christian writers say he was martyred in Rome under the emperor Nero, in the AD 60s. A later tradition says he was crucified upside down."]]],
 src:[["1 Clement 5","A letter from Rome, about AD 96, that speaks of Peter’s martyrdom."],["Eusebius, Church History","Fourth-century history preserving earlier traditions about Peter’s death in Rome."]]},
paul:{tab:"Bio",secs:[
 ["Saul of Tarsus",["Paul was born in Tarsus, a major city in what is now southern Turkey (Acts 21:39), and was a Roman citizen from birth (Acts 22:28). He was “of the tribe of Benjamin” and a Pharisee (Philippians 3:5), trained in Jerusalem by the respected teacher Gamaliel (Acts 22:3). He supported himself as a tentmaker (Acts 18:3)."]],
 ["From persecutor to Apostle",["He stood by and consented when Stephen was stoned (Acts 7:58; 8:1), then hunted Christians. On the road to Damascus a light from heaven struck him, and Jesus asked, “Saul, Saul, why persecutest thou me?” Blinded, he was healed and baptized by a disciple named Ananias (Acts 9:1–18)."]],
 ["Missions and letters",["Acts describes three long missionary journeys through Cyprus, Asia Minor and Greece, where he founded churches in cities like Philippi, Thessalonica, Corinth and Ephesus (Acts 13–21). He wrote to these Saints to teach and correct them. The KJV lists fourteen letters as his, Romans through Hebrews; many scholars think Hebrews was written by someone else."]],
 ["Dated by a stone",["At Corinth, Paul was brought before the Roman governor Gallio (Acts 18:12). An inscription found at Delphi in Greece names Gallio as governor and dates his term to about AD 51–52. It is one of the firmest dates in Paul’s life."]],
 ["Prison, shipwreck and Rome",["Arrested in Jerusalem, he spent two years in prison at Caesarea, appealed to Caesar, survived a shipwreck on Malta, and lived two years under guard in Rome, still teaching (Acts 21–28). Near the end he wrote, “I have fought a good fight, I have finished my course, I have kept the faith” (2 Timothy 4:7). Early Christian writers say he was executed in Rome under Nero."]]],
 src:[["Gallio Inscription","Letter of the emperor Claudius naming Gallio. Found at Delphi, Greece."],["1 Clement 5","Early letter describing Paul’s labors and martyrdom."],["Eusebius, Church History","Records the tradition of Paul’s death in Rome."]]},
pilate:{tab:"Bio",secs:[
 ["Governor of Judea",["Pontius Pilate governed Judea for Rome from about AD 26 to 36. He lived at Caesarea on the coast and came to Jerusalem for the feasts, when crowds and unrest were greatest."]],
 ["His name in stone",["In 1961 archaeologists at Caesarea found a stone inscribed with Pilate’s name and his title, prefect of Judea. It is now in the Israel Museum in Jerusalem."]],
 ["A hard ruler",["The Jewish writers Josephus and Philo describe him as harsh. He brought military standards with the emperor’s image into Jerusalem and used temple money to build an aqueduct, setting off protests. Luke 13:1 mentions Galileans “whose blood Pilate had mingled with their sacrifices.”"]],
 ["The trial of Jesus",["Pilate found no fault in Jesus and tried to release Him, but gave in to the crowd. He asked, “What is truth?” (John 18:38), washed his hands before the people (Matthew 27:24), and wrote the title placed on the cross (John 19:19). The Roman historian Tacitus also records that Christ was executed under Pontius Pilate."]],
 ["His end",["Josephus says Pilate was removed in AD 36 after his soldiers attacked a crowd of Samaritans, and he was sent to Rome to answer for it. What happened to him after that is unknown."]]],
 src:[["Pilate Stone","Names Pontius Pilate, prefect of Judea. Israel Museum, Jerusalem."],["Josephus, Antiquities of the Jews, Book 18","Describes Pilate’s rule and removal."],["Philo, On the Embassy to Gaius","Another first-century account of Pilate."],["Tacitus, Annals 15.44","Roman history naming Pilate as the governor who executed Christ."]]},
caiaphas:{tab:"Bio",secs:[
 ["High priest",["Joseph Caiaphas was high priest from about AD 18 to 36, an unusually long time. He was the son-in-law of Annas, an earlier high priest who still had great influence (John 18:13)."]],
 ["An unknowing prophecy",["After Jesus raised Lazarus, Caiaphas told the council it was better that one man die than the whole nation perish. John notes that he spoke as high priest and prophesied, without meaning to, that Jesus would die for the nation (John 11:49–52)."]],
 ["Against Jesus and the Apostles",["He led the council that condemned Jesus (Matthew 26:57–66) and later questioned Peter and John (Acts 4:6). The Roman official Vitellius removed him from office around AD 36 or 37."]],
 ["A family tomb?",["In 1990 workers in Jerusalem uncovered a burial cave with a finely carved bone box inscribed “Joseph son of Caiaphas.” Many scholars think it held his bones, though not all agree. It is now in the Israel Museum."]]],
 src:[["Caiaphas ossuary","Bone box inscribed with the name. Israel Museum, Jerusalem."],["Josephus, Antiquities of the Jews, Book 18","Records Caiaphas’s appointment and removal."]]},
nicodemus:{tab:"Bio",secs:[
 ["By night",["Nicodemus was a Pharisee and a member of the Jewish ruling council. He came to Jesus by night, perhaps to avoid being seen, and Jesus taught him, “Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God” (John 3:5)."]],
 ["Growing courage",["Later, when the council wanted to arrest Jesus, Nicodemus asked whether the law judged a man before hearing him (John 7:50–51). After the Crucifixion he came openly with Joseph of Arimathea, bringing about a hundred pounds of myrrh and aloes to bury Jesus (John 19:39)."]],
 ["What we know",["Everything known about him comes from the Gospel of John. His Greek name means “victory of the people.”"]]],
 src:[]},
zacchaeus:{tab:"Bio",secs:[
 ["A rich tax collector",["Zacchaeus was chief among the publicans, the tax collectors, in Jericho. Jericho sat on a busy trade route and was known for its valuable balsam groves, so there was money to be made. Tax collectors worked for Rome and often took more than was owed, so their own people despised them."]],
 ["Up a tree",["Being short, he ran ahead and climbed a sycamore tree to see Jesus. Jesus stopped, called him by name, and said He would stay at his house, while the crowd murmured that He was the guest of a sinner (Luke 19:1–7)."]],
 ["A changed man",["Zacchaeus promised to give half his goods to the poor and to repay fourfold anyone he had cheated. The law of Moses required fourfold repayment only in certain cases of theft (Exodus 22:1), so he was going well beyond it. Jesus answered, “This day is salvation come to this house” (Luke 19:8–9)."]],
 ["His name",["His name comes from the Hebrew Zakkai, meaning “pure” or “innocent.”"]]],
 src:[]},
barnabas:{tab:"Bio",secs:[
 ["Son of consolation",["His name was Joseph, a Levite from the island of Cyprus. He sold his land and gave the money to the Apostles, who called him Barnabas, “son of consolation” (Acts 4:36–37)."]],
 ["Friend to Paul",["When the disciples in Jerusalem were afraid of the newly converted Saul, Barnabas brought him to the Apostles and vouched for him (Acts 9:26–27). Later he went to find Saul in Tarsus and brought him to teach in Antioch (Acts 11:25–26)."]],
 ["Missionary",["Barnabas and Paul served the first mission together, through Cyprus and Asia Minor, and Luke calls both of them apostles (Acts 13–14). They later parted over whether to take John Mark, Barnabas’s cousin (the KJV says “sister’s son”) (Acts 15:36–40; Colossians 4:10). Barnabas took Mark and sailed to Cyprus."]]],
 src:[]},
stephen:{tab:"Bio",secs:[
 ["Chosen to serve",["When Greek-speaking widows were being overlooked in the daily care, the Apostles had seven men chosen to look after them. Stephen, “a man full of faith and of the Holy Ghost,” was the first named (Acts 6:1–6). He also did great wonders among the people."]],
 ["His testimony",["Accused before the council, Stephen retold Israel’s history and showed how the people had often rejected God’s messengers. As he finished he saw the heavens open and “the Son of man standing on the right hand of God” (Acts 7:55–56)."]],
 ["The first martyr",["The crowd stoned him outside the city. Like Jesus, he prayed for his killers: “Lord, lay not this sin to their charge” (Acts 7:60). A young man named Saul watched and approved. The persecution that followed scattered the believers, and they carried the gospel with them (Acts 8:1–4)."]],
 ["His name",["Stephanos is Greek for a crown, the wreath given to a victor."]]],
 src:[]},
cornelius:{tab:"Bio",secs:[
 ["A Roman officer",["Cornelius was a centurion, an officer over roughly eighty soldiers, in the Italian band stationed at Caesarea, the Roman capital of Judea on the coast (Acts 10:1). He was not Jewish, but he feared God, prayed always and gave generously."]],
 ["Two visions",["An angel told Cornelius to send for Peter. The next day Peter saw a sheet full of unclean animals and heard, “What God hath cleansed, that call not thou common” (Acts 10:15). He understood the message when Cornelius’s men arrived: the gospel was for every nation."]],
 ["A turning point",["As Peter taught, the Holy Ghost fell on Cornelius and his household, and Peter had them baptized (Acts 10:44–48). Peter later used this experience to defend teaching the Gentiles (Acts 11; 15:7–9)."]]],
 src:[]},
martha:{tab:"Bio",secs:[
 ["Bethany",["Martha lived in Bethany, about two miles from Jerusalem, with her sister Mary and brother Lazarus (John 11:1, 18). John says simply that Jesus loved all three (John 11:5)."]],
 ["Careful and troubled",["When Jesus visited, Martha was busy serving while Mary sat listening at His feet. Jesus told her gently, “Martha, Martha, thou art careful and troubled about many things: But one thing is needful” (Luke 10:38–42)."]],
 ["Her testimony",["When Lazarus died, Martha went out to meet Jesus. He told her, “I am the resurrection, and the life,” and she answered, “Yea, Lord: I believe that thou art the Christ, the Son of God” (John 11:25–27). Then Jesus raised her brother from the dead."]]],
 src:[]},
thomas:{tab:"Bio",secs:[
 ["The twin",["Thomas was one of the Twelve. John calls him Didymus, Greek for “twin” (John 11:16)."]],
 ["Loyal and honest",["When Jesus decided to return to Judea, where His enemies were, Thomas said, “Let us also go, that we may die with him” (John 11:16). At the Last Supper he asked, “How can we know the way?” and Jesus answered, “I am the way, the truth, and the life” (John 14:5–6)."]],
 ["“My Lord and my God”",["Thomas was not there when the risen Jesus first appeared to the Apostles, and he said he would not believe without seeing and touching His wounds. Eight days later Jesus came again, and Thomas declared, “My Lord and my God.” Jesus said, “Blessed are they that have not seen, and yet have believed” (John 20:24–29)."]],
 ["Later tradition",["Stories from the third century say Thomas preached in India. Christians in southern India still trace their churches to him, but this cannot be confirmed from early records."]]],
 src:[["Acts of Thomas","Third-century writing that tells of his mission to India."]]},
magdalene:{tab:"Bio",secs:[
 ["From Magdala",["Mary Magdalene came from Magdala, a fishing town on the west shore of the Sea of Galilee. Jesus had cast seven devils out of her (Luke 8:2; Mark 16:9), and she was one of several women who followed Him and supported Him from their own means (Luke 8:1–3)."]],
 ["At the cross and the tomb",["She stood near the cross when Jesus died (John 19:25) and watched where He was buried. Early on the first day of the week she came to the tomb and found it empty."]],
 ["First witness",["Weeping in the garden, she turned and saw Jesus but thought He was the gardener until He said her name. He sent her to tell the disciples, making her the first witness of the Resurrection (John 20:11–18)."]],
 ["A mistaken idea",["Many people have pictured her as a reformed sinful woman, but the Bible never says that. The idea grew from a sermon in AD 591 by Pope Gregory I, who combined her with other women in the Gospels."]]],
 src:[]}
};
Object.keys(DEEP_NT).forEach(k=>{if(TERMS[k])TERMS[k].deep=DEEP_NT[k];});

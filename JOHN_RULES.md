# Standing rules from John (check before every reply)

1. No redeploys for him. Updates must go live without him downloading zips or running Terminal. Path: the Firebase shell loads the app from the GitHub repo `jbrady218/joined-app`. Set this up first in the new chat.
2. Only make a zip when he asks.
3. Keep checking word meanings in context (audit.js after every build; approve only after review).
4. Church videos go in the Family section only, nowhere in the scripture reader.
5. Don't build things he didn't ask for. Don't guess at Firebase or other screens he hasn't shown; work from his screenshots.
6. Talks (updated Nov 16): any General Conference talk, 1996 to today, any speaker (Seventies included). Skip talks centered on retired programs or policies (home/visiting teaching, etc.). Two labels: "Quotes this chapter" (verified against the talk's footnotes) and "On this topic" (same ideas, no direct citation).
7. Zips are numbered (joined-site-6, -7, ...) and unzip into their own matching folder. Always give the Terminal code: cd ~/Downloads/joined-site-N && firebase deploy --only hosting
8. Study tools panel stays closed until he opens it. The family age choice is remembered.
9. Keep chat replies short. No notes or summaries in chat; deliver and say in a line or two what changed.
10. Seminary prefs (from his summaries): KJV default; he cares about original words; navy + gold theme; deck = student slides with teacher notes in the speaker notes; never a lesson-plan doc; full quotes, no ellipses; no answers on activity slides; YouTube is blocked at church.
11. Lesson builder and link import are PAUSED (Nov 15). Do not work on them unless he brings them back up.
12. Don't keep bringing up GitHub or other pending setup steps unprompted.
13. He wants videos from the Church's YouTube channels only, and kids' videos hidden for Adults.
14. Whole-verse highlights must look the same as word highlights.
15. Full histories and bios: only well-documented facts, with sources; say plainly where scholars disagree. Data in history.js.
16. Shipping: python3 make_app.py, node audit.js, push to main. No zips or Terminal unless a Firebase-side file changes, and tell John first.
17. PLANNED (John, Nov 16): when the rest of the Book of Mormon is added, show 3 Nephi side by side with the Bible chapters it parallels (Matthew 5–7, Isaiah 54, Malachi 3–4, etc.), and do the same for the Isaiah chapters in 1–2 Nephi. Keep the helps that make Isaiah easier to understand. Explain where the Book of Mormon wording differs and what scholars say about its Hebrew-like features, accurately and with sources.
18. On hold to save usage: talks on every chapter. D&C/PGP helps only if usage allows.
19. Family Come, Follow Me readings run through Dec 27, 2026. The 2027 New Testament readings need adding before then.
20. John asked (Nov 16): no major Joined work until his weekly usage resets Thursday, Nov 19 at 11 pm. Small fixes only; remind him if he asks for something big before then.
21. PLANNED (John, Nov 19): Old Testament name meanings (Noah = rest, reversed = grace; Solomon = peace, etc.). Starter data in ot_names.js, not wired in yet. Add to the Genesis/early OT reader when those books are added. NT + Book of Mormon names added too (51 total).
22. PLANNED (John, Nov 19): "Ask" search by meaning, not just keywords. Example: "a talk or scripture about going through hard times, when Jesus saves and when He doesn't." Should return scriptures, talks and quotes. He finds Gospel Library search weak. Not started; decide AI vs free approach first.

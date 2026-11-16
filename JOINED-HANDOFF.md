# Joined: Complete Handoff for a New Claude Chat

*Written Nov 16, 2026, at the end of the long "Bible versions app idea" chat. Paste or attach this at the start of the new chat. The full project source is in **joined-project.zip**: attach it too, and read `README-FOR-CLAUDE.md` and `JOHN_RULES.md` inside it.*

---

## 1. Who I'm working with

- **John Brady.** Teaches early-morning **Old Testament seminary** (Church of Jesus Christ of Latter-day Saints). He is building a free scripture-study app called **Joined**.
- **Goal of Joined:** help people, especially youth and families, understand the scriptures and Come, Follow Me: word meanings, Hebrew and Greek, history, maps and talks. Also help teachers and families prepare lessons.
- **Not a coder.** He works from a Mac (Terminal for Firebase) and an iPhone, where he uses Joined as a Home Screen app. He's a "big picture guy."
- **He gets frustrated quickly by:**
  - forgotten instructions
  - unrequested work
  - long chat replies
  - repeated questions
  - guessing at screens he hasn't shown
  - claims that something works when it doesn't

  He has said so bluntly. Be accurate, brief, and do exactly what he asks.

---

## 2. Standing rules (follow these every time)

1. **No more manual redeploys.** He doesn't want to download zips or run Terminal for every update. The fix is GitHub auto-update (section 9). That is the main job of the new chat.
2. **Only make a zip when he asks.** When you do, **number it** (`joined-site-6.zip`, `-7`, …) and have it unzip into a folder with the same numbered name. Then he doesn't need to delete old folders. Give him the Terminal code every time:
   ```
   cd ~/Downloads/joined-site-N
   firebase deploy --only hosting
   ```
3. **Keep chat replies short.** No long notes or summaries in chat. Deliver the result and say in a line or two what changed.
4. **Don't build things he didn't ask for.** Don't guess at Firebase, GitHub or other screens he hasn't shown; work from his screenshots.
5. **Word meanings must be right for each verse.** He said: "you need to constantly be checking those because that could be a huge mess that I don't want to clean up." Run `node audit.js` after every build and review every NEW word/verse pairing before approving (`node audit.js --approve`). Use per-verse overrides (`ALT`) when the same English word translates a different original word.
6. **Talks:** only 1996 to today, only by the **First Presidency, the Quorum of the Twelve, or the Relief Society, Young Women or Primary general presidencies.** **No Seventy.** Each one must be verified against the talk's own footnotes (WebFetch the talk page) before it's attached to a verse.
7. **Videos only in the Family Come, Follow Me section,** never in the scripture reader. Only from the **Church's own YouTube channels**, each one verified with YouTube oEmbed `author_name` (for example "Gospel For Kids"). He disliked the old 2011 Church media videos ("looks like 1994"). Kids' channel videos are **hidden for the Adults** age group.
8. **The study tools panel must not open automatically.** Remember the family age choice.
9. **Don't keep bringing up GitHub** or other pending setup steps. Answer when he asks.
10. **Lesson builder and "bring in a lesson from a link" are PAUSED.** Don't work on them unless he brings them back up. The import box is hidden in the UI.
11. **Seminary preferences** (from his class summaries, for any slide or lesson work):
    - KJV is the default; he cares about the original words.
    - Navy + gold theme, Georgia headings, Calibri body.
    - "Write it up" means student-facing slides with teacher notes in the speaker notes. Never a lesson-plan document.
    - Use full quotes, never ellipses.
    - No answers on activity slides.
    - YouTube is blocked on the church Wi-Fi.
    - He gives feedback as numbered slide-by-slide lists.

---

## 3. Where things live

| What | Where |
|---|---|
| Live website | **https://joined-3adda.web.app** (Firebase Hosting, project **joined-3adda**, Blaze plan) |
| Claude preview version | claude.ai artifact `M57VDLzjPYKyf2pEaD4ucs`, shared with his org only |
| GitHub repo (for auto-updates) | **jbrady218/joined-app**: public, currently empty. Claude GitHub App installed on account jbrady218. |
| Full source | **joined-project.zip**: everything needed to rebuild exactly. It was verified to rebuild byte-identical. |
| His email / account | johnnybbrady@me.com (signs into Joined with it) |

**Firebase setup (done by John):**
- **Authentication:** Email/Password and Google are enabled. Apple was enabled, then he disabled it.
- **Firestore rules (published Nov 15, 8:05 PM):**
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{uid}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }
  }
  ```
- **Cloud Messaging:** web push with VAPID key `BC8khuQwDiUI_kEpGEqcq6XHaBSyYgFCTCnPFp3YGzWBPXE6i_o51htVAb43prIunAvdUx9_LxbCJ7ZtQdxU15k`.
- **Functions** (Node 22): `familyReminders` is a scheduled function that runs every 15 minutes and sends daily family reminders. A paused `lessonPage` function also exists in the source; leave it out of deploys, along with its `/api/lesson` hosting rewrite.
- **Hosting:** `firebase.json` has no-cache headers for HTML, JSON and the service worker.
- **Deploy history:**
  - zips up to **joined-site-5** have been deployed
  - joined-site-5 = matching highlights + error codes on sync failures
  - **Not deployed yet:** the tour box removal and the "signed-in users skip the welcome screen" fix (both are in joined-project.zip)

---

## 4. What the app does now (features)

**Reader**
- Books are complete with KJV text (plus the **Modern** World English Bible for Bible books, and a **Both** view):
  - **Daniel** 1–12
  - **Hosea** 1–14
  - **Joel** 1–3
  - **Matthew** 1–28
  - **1 Nephi** 1–22
  - **Abraham** 1–5
  - **D&C** 121–123
- He said **no more D&C for now.**
- Each chapter has a title, a date chip, a summary written for Joined (not the Church's chapter headings) and two background paragraphs.
- **Word meanings** (footnoted, tappable): about 85+ newer terms plus the originals, with pronunciation (tap to hear), the Original tab (Hebrew/Aramaic/Greek with Strong's numbers), Webster 1828 where useful, background, and a list of verses.
  - Blue words = meaning differs from today ("diff").
  - Superscripts: H = Hebrew, A = Aramaic (Daniel 2:4b–7:28), G = Greek, W = Webster 1828.
  - Per-verse overrides (`ALT`) handle cases like these:
    - "blessed" = eulogeō vs makarios in Matthew
    - Judas "repented" = metamelomai
    - Red Sea (Exodus vs the coast)
    - Herod Antipas in Matthew 14
    - Hosea's mercy = hesed vs racham, and goodness = hesed vs tuv
    - the "backsliding" heifer
    - the Lehi "visionary" verses
  - "Judge" in Matthew 7 is krinō, with the Webster 1828 sense "to censure rashly" and the JST note.
  - `only:[...]` limits a term to certain chapters.
- **Talks:** about 79 verified talks. Matthew 7 now has many. Hosea and Joel have none (eligible leaders almost never cite them). Several Daniel and 1 Nephi chapters have none either.
- **Maps** for most chapters: Near East, Holy Land, Sinai, US and **Arabia** bases. Lehi's route to Nahom and Bountiful is labeled as a likely route. There's a drawn **Jerusalem plan** for about 600 BC (houses removed at his request; Hezekiah's tunnel labeled) and a Hosea map (Samaria, Bethel, Gilgal).
- **Chapter navigation:** ‹ › arrows, plus a picker with a grid of every chapter (tap the book name). **Swipe left or right on the text** changes chapters; arrow keys work on desktop.
- **Phone fixes:**
  - The Close button stays pinned.
  - Inputs are 16px so the iPhone doesn't zoom.
  - A tapped verse scrolls above the bottom panel. That's now an instant, bounded scroll after he reported a far jump on iPhone; watch for whether it's fixed.
- **Highlights:**
  - Whole verse or selected words, in 10 colors.
  - Whole-verse highlights look the same as word highlights: color on the text, not a box. **He asked that they match.**
  - Notes, tags and links per verse; "Your books" library.

**Home page**
- A Family Come, Follow Me button near the top.
- A blue hero with the logo, the tagline “They shall become one in thine hand.”, and **How to use Joined** (opens the tour) and Search buttons.
- **He had the separate "New to Joined? Take the tour" box removed;** the blue box covers it.
- Resume, this week's lesson, volumes, and Study and prepare.

**Family Come, Follow Me (#family)**
- A daily reading for **four age groups** (3–7, 8–11, 12–17, Adults), with the age choice remembered:
  - verses (more and deeper for older groups)
  - a question
  - a "Try this" activity
  - background (simple for kids, fuller for others)
  - a Hebrew or Greek "word to know"
  - the actual date shown
  - previous/next day
  - a "Read in Joined" link
- Weekly tracker dots and a "read today" check.
- Daily **push notification reminders** (not calendar files) at a time he chooses. On iPhone this requires the Home Screen app.
- **Data runs Nov 15 to Nov 29, 2026:**
  - week 46: Daniel
  - week 47 (Nov 16–22): Hosea and Joel, ready
  - week 48 (Nov 23–29): Amos, Obadiah, Jonah

  ⚠ **December weeks must be added before Nov 29** (generated in `family_data.js` by `mk_family.py`). It shows the right day automatically from the phone's date.
- **Videos (YouTube, play inside the app):**
  - Nov 15: "Daniel and the Lions' Den" (Gospel For Kids, `t_DpVR6kkHo`)
  - Nov 27: "Jonah the Prophet" (Gospel For Kids, `vV_yB8_RiFA`)
  - Hosea, Joel and Amos days have no video; no official Church YouTube video was found. **He was asked which Church channels he has in mind and hasn't answered.**

**Accounts**
- A welcome screen on the public site (Create a profile / Sign in / Google / Continue without an account).
- Sync to Firestore at `users/{uid}/data/main`, with `SYNC_KEYS` = `hl, hlt, notes, marks, library, lb, lessons, famAge, famRead, famTime, famRemOn, imports`.
- Reminders are stored at `users/{uid}/reminder/main`.
- **Latest fix (not deployed):** signed-in users go straight to the home screen. On iPhone the app wrongly showed the welcome screen and then the "Signed in" card every time it opened. A `dsc-v1-signedin` flag is now kept in localStorage, and the welcome screen auto-closes when the account loads.

**Look**
- Navy + gold.
- **New icons** use the darker navy he chose ("the middle one"), with the logo larger: `icon-192`, `icon-512`, `apple-touch-icon`, a maskable icon, and the header icon. Theme color is `#0a2a47`.

---

## 5. Paused / not wanted right now

- **Lesson builder** (Prepare → Lesson builder; manual → lesson → chapter, PowerPoint/Google Slides/Print) and **"Bring in a lesson from a link."** Paused by John ("I am not sure it's going to work"). The code exists (`lesson.js`, `importer.js`); the import box is hidden.
- Context: he wanted to try seminary **Lesson 146 (Hosea: The Love and Mercy of the Lord; Hosea 1–6, 10–14, Joel)**. That's why Hosea and Joel were added.
- **Talk builder:** marked "Coming soon." Not started.
- **D&C:** no more sections for now.

---

## 6. Church permission (in progress)

- He is submitting a request at **https://permissions.churchofjesuschrist.org/** (Church Account needed; email option: permissions@ChurchofJesusChrist.org; replies usually take about 45 days).
- **Asking for:** manual section headings and short excerpts beside verses, each linked to Gospel Library, and short conference talk quotations with links.
- **Not asking for:**
  - **Scripture text.** The KJV and the 1830–1918 texts of the Book of Mormon, D&C and Pearl of Great Price are public domain; the Church's edition extras (headings, footnotes) are not used.
  - **YouTube embeds.** Already allowed.
- **Done so far:**
  - The form's "describe your product" answer was written (an app-only description).
  - A one-page mockup image, **Joined-permission-mockup.png**, was made for the Attachments field. It shows three phone screens (manual section beside Daniel 1:8; talks on Daniel 3:18; a family reading marked "Written for Joined"), with gray bars where excerpts would go.
- The Church's Terms of Use forbid automated scraping. That's one more reason the link-import feature is paused.
- Claude is not a lawyer; this was background only.

---

## 7. Other things he mentioned

- **The JST as the main text?** Advised: keep KJV as the main text. A JST option could be added later from the public-domain 1867 Inspired Version text. The Church canonizes only the Book of Moses and JS–Matthew from the JST. Not started.
- **His seminary class:** he has summaries of past planning chats (Isaiah, Jeremiah, Ezekiel, Daniel weeks). The Daniel 2 deck uses map click-throughs; he likes those.
- **Family videos:** he wants the Church's YouTube channels specifically.

---

## 8. Build notes (for Claude)

- `python3 build.py` → `daniel-study.html`, the whole app in one file. Script order: TEXTS, gloss + gloss2 + gloss3, books + chapters2, maps, family_data, family, lesson + importer, account, app.
- `python3 gen_maps.py` → `maps.js` (from `maps_src.js` and the `basemap_*` images).
- **Public build:** `deploy/joined-site/public/index.html` = the existing head block (everything before `<title>Joined</title>`: doctype, manifest, icons, theme color) + `daniel-study.html` + `</body></html>`.
- **Packaging a numbered zip:**
  1. Copy `deploy/joined-site` to `pkg/joined-site-N`.
  2. Remove the `/api/lesson` rewrite and the `lessonPage` function from the copy.
  3. Zip it.
- **Testing:** Playwright with an iPhone 13 emulation. There's no WebKit here, so iPhone-only bugs can't be reproduced exactly; say so honestly.
- **Network from the sandbox:** GitHub works. Firebase, Wikimedia and the Church site don't (use WebFetch for the Church site and YouTube oEmbed).

---

## 9. FIRST JOB in the new chat: updates without redeploying

1. Unzip **joined-project.zip** and confirm it builds.
2. Push the source to **jbrady218/joined-app**: the app files, plus the built `app.html` (the full app page).
3. Change Firebase's `public/index.html` into a small **shell**:
   - it fetches `https://raw.githubusercontent.com/jbrady218/joined-app/main/app.html` with `cache:'no-store'` and writes it into the page
   - it keeps a built-in copy as a fallback if GitHub can't be reached
   - it keeps the manifest, icons, theme color and service worker exactly as now
4. Give John **one last numbered zip** (`joined-site-6`) and the Terminal code to deploy it.
5. After that, every fix is a push to GitHub and goes live on its own within about 5 minutes. **Confirm on the live site** after the first push.
6. Then: add the **December family weeks** before Nov 29.

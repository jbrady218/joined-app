# Joined: project handoff

Joined is John Brady's free scripture-study web app. It's live at https://joined-3adda.web.app (Firebase project `joined-3adda`). This folder is the complete source, carried over from an earlier Claude session.

**Read JOHN_RULES.md first and follow it.** It holds his standing preferences. The most important ones:
- Keep chat replies short.
- Don't build things he didn't ask for.
- Only make a zip when he asks.
- Don't keep asking about GitHub.

## Build
- `python3 build.py` writes `daniel-study.html` (the whole app in one file).
  - Script order: TEXTS, gloss, gloss2+gloss3, books+chapters2, maps, family data, family, lesson+importer, account, app.
- `python3 gen_maps.py` rebuilds `maps.js` from `maps_src.js` and the base map images. Run it before `build.py` when maps change.
- `node audit.js` lists every new word/verse pairing so it can be checked by hand before approving. Run it after every build. `node audit.js --approve` saves the approvals to `reviewed.json`.
  - `audit.js` and the tests use Playwright (`require('playwright')`).
- Public site:
  - `deploy/joined-site/public/index.html` is the built HTML. Take the head block of that file (everything before `<title>Joined</title>`), append the full contents of `daniel-study.html` after it, and then add `</body></html>`.
  - Other files: `manifest.json`, `firebase-messaging-sw.js`, the icons, and `functions/` (the `familyReminders` scheduled push).
  - `functions/index.js` also contains `lessonPage`, which is paused. Leave it and the `/api/lesson` rewrite out of deploys.

## Goal of this session: updates without redeploying
John deploys with `firebase deploy --only hosting` from his Mac and does NOT want to keep doing that. The plan:
1. Push the app to the GitHub repo `jbrady218/joined-app`.
2. Change Firebase's `public/index.html` into a small shell that loads the app HTML from `https://raw.githubusercontent.com/jbrady218/joined-app/main/...`, with `cache:'no-store'`, and falls back to a built-in copy if the fetch fails.
3. John deploys that shell one last time.
4. After that, every update is a push to GitHub and goes live within about 5 minutes.

## State as of Nov 15, 2026
- **Books:** Daniel, Hosea, Joel, Matthew, 1 Nephi, Abraham (all complete), plus D&C 121–123.
- **Family Come, Follow Me:** daily readings run through Nov 29 (`family_data.js`, made by `mk_family.py`). The December weeks still need to be added.
- **Videos:** Church YouTube only, each one verified by its oEmbed `author_name`. Kids' videos are hidden for the Adults group.
- **Paused:** the lesson builder and the link import. Don't work on them unless he brings them up.

## Live updates (set up Nov 16, 2026)
- Firebase `public/index.html` is now a small shell. It loads `app.html` from this repo (raw.githubusercontent.com, main branch), falling back to `/app.html` on Firebase.
- To ship a change: edit source → `python3 make_app.py` (runs build.py, writes `app.html`) → `node audit.js` → commit and push to `main`. Live within about 5 minutes. No Firebase deploy needed.
- `site_head.html` holds the head block (manifest, icons, theme color). `shell_body.html` is the shell's body.
- John pastes a GitHub token at the start of each chat; never commit it.

# WhatNext? Project Context (handoff file)

Purpose of this file: give a fresh Claude chat everything it needs to continue the WhatNext? project without re-asking. It summarises decisions, current state, and next steps as of the end of the Claude Code session. Treat the repo as the source of truth for code; treat this file as the source of truth for decisions and status.

---

## 1. The product

**WhatNext?** is a mobile-first web app for gym-goers who get bored or finish their routine early. The user picks the equipment they have and a muscle group, and gets 5 to 8 exercise suggestions with sets, reps, form cues and a form video link.

- Tagline: "Bored mid-workout? Get your next set in 10 seconds."
- Audience and pricing context: India (INR pricing). Free tier plus a paid "NextSet" unlock.
- Owner's constraints: simple, clean, easy to extend over about 8 weeks. No backend or database for now. No user accounts or login. Must deploy cleanly on Vercel.

## 2. Core flow (all built)

1. **Home:** tagline and a Start button.
2. **Equipment picker:** multi-select chips (Dumbbells, Barbell, Kettlebell, Cables, Machines, Resistance Bands, Bodyweight). The last selection is remembered in localStorage.
3. **Muscle picker:** single select (Chest, Back, Shoulders, Arms, Legs, Glutes, Core, Full Body). One tap goes to results. Each tile shows how many exercises match.
4. **Results:** 5 to 8 random exercises matching both filters. Shuffle button for a new set. Each card shows name, target muscle, difficulty badge, sets x reps, 2 to 3 form cues, and a "Watch form" button.
5. **Thumbs up / down** on each card, saved in localStorage. Liked exercises appear more often (weight 3x), disliked less often (weight 0.25x).

**Monetisation (stub only, no real payments):** 3 free shuffles per day (localStorage, resets at local midnight). After that, an "Unlock NextSet" screen offers Rs 199 one-time or Rs 299/month with a placeholder button.

**Safety:** one-time disclaimer on first use, also in the footer: "Not medical advice. Use a weight you can control and consult a trainer if unsure."

## 3. Tech stack and repo

- **Stack:** Next.js 16.3.6 (App Router), React 19, TypeScript, Tailwind CSS v4. Fully static routes. No env vars needed.
- **Important:** the repo's `AGENTS.md` warns that this Next.js version has breaking changes; read `node_modules/next/dist/docs/` before writing Next-specific code.
- **GitHub repo:** `stanleespiderman/AIProject` (public).
- **Branches:**
  - `claude/gallant-cray-9o8fzx`: the working branch with everything (app plus all docs). This was the repo's default branch on GitHub.
  - `main`: created from the first app commit. It has the app but NOT the later `docs/` files. The owner was asked to set `main` as the default branch in GitHub settings (not confirmed done).
- **Key paths:**
  - `src/app/` routes: `/`, `/equipment`, `/muscle`, `/results`, `/unlock`
  - `src/data/exercises.ts`: the exercise library (168 exercises)
  - `src/lib/recommend.ts`: filtering and weighted random picks (pure functions)
  - `src/lib/payments/`: ALL payment code (`index.ts` plans, `startCheckout()` stub, Pro flag; `usage.ts` daily shuffle quota)
  - `src/lib/constants.ts`: equipment and muscle lists, labels, localStorage keys, disclaimer text
  - `README.md`: how to run locally, how to add exercises, where the payment stub lives
- **localStorage keys:** `whatnext:equipment`, `whatnext:votes`, `whatnext:disclaimer-ack`, `whatnext:shuffles`, `whatnext:pro`.
- **Design (app UI):** dark theme, near-black `#09090C`, lime accent `#D4FF3A`, Barlow Condensed (display) plus Inter (body).

## 4. Exercise data model

`Exercise`: `id`, `name`, `primaryMuscle`, `secondaryMuscles[]`, `equipment[]` (any ONE is enough), `difficulty` (beginner / intermediate / advanced), `sets`, `reps` (free text such as "8-12", "30s", "10/side"), `formCues[]` (2 to 3), `videoUrl`.

- 168 real, common, safe exercises across every equipment and muscle combination.
- `videoUrl` is always a YouTube **search** URL (e.g. `https://www.youtube.com/results?search_query=push-up+form`). **Never invent YouTube video IDs.**
- `id` is a slug of the name (e.g. `dumbbell-romanian-deadlift`). Votes are stored against it, so do not rename shipped exercises.
- Exercises with several equipment options get neutral names ("Goblet Squat", "Squeeze Press").
- Recommendation logic: primary-muscle matches first; if too few, top up with exercises that train the muscle secondarily (for Full Body, exercises that train 3+ muscle groups). A shuffle avoids cards already on screen when the pool allows.

## 5. Status

**Working and tested** (lint, build and a headless-browser walkthrough all passed): the whole flow above, vote weighting, shuffle quota, remembered equipment, disclaimer, shareable result URLs (`/results?eq=...&m=...`).

**Stubbed or limited:**
- Payments: "Continue" only shows "Payments aren't live yet." Pro status is a localStorage flag a user could edit. Needs server-side entitlements before real money.
- The shuffle limit is a soft nudge: refreshing results gives a new set without spending a shuffle.
- No automated tests yet (the recommendation logic is pure and easy to test).
- No accounts or cross-device sync (by design).

**Not yet done:**
- **Deployment to Vercel:** NOT deployed. The Vercel connector in Claude Code could read the account but got a 403 when creating a project (scope `helloworld-925e`). Manual route: vercel.com/new, import `stanleespiderman/AIProject`, leave defaults, production branch `main` (or the working branch until `main` is updated), Deploy.
- Exercise images (see section 7).

## 6. Design artifacts (Claude artifacts, private to the owner)

- **Wireframes of every screen:** https://claude.ai/artifact/3gEyTEyRbzpeKPRPuWKC9J (home, first-visit disclaimer, equipment, muscle, results, unlock). Some buttons link between screens.
- **Exercise image style options (push-up card):** https://claude.ai/artifact/D7AgQYSepqymgn3efGYAex (A soft 3D, B flat vector, C line-art, D silhouette+glow). The owner chose **C (line-art), slightly more realistic**.

## 7. Workstream in progress: exercise images

**Decision:** every exercise card should show a **pictorial step image first**; the YouTube form video becomes a **secondary** option (smaller "Prefer video? Watch form" link).

**How images are made:** the owner generates them in **ChatGPT (Plus subscription, not the API)** using a design guide uploaded to a ChatGPT Project. Claude cannot generate images. Images are saved as `public/exercises/<exercise-id>.png` and uploaded to GitHub by hand (the ChatGPT GitHub connector found no accessible repo).

**Final style (approved):** anatomical line-art on near-black. Key rules (full detail in `docs/exercise-image-design.md`):
- One landscape 3:2 image, two panels with a thin divider. LEFT = START, RIGHT = END (static holds: SET-UP and HOLD). Same figure, size and camera in both panels. Side views: athlete faces LEFT. Figure fills about 85% of panel width.
- Figure: gender-neutral anatomy mannequin, no clothes/hair/face, fine light-gray contour `#C9CCD2`, interior NOT filled, dim gray `#5B5F68` muscle-separation lines and light hatching. No 3D shading, gradients or glow.
- Muscles: primary = outlined lime `#D4FF3A` with ~15% tint and dense fibre lines; secondary = thinner dashed lime outlines; nothing else highlighted. Lime only for muscles.
- Equipment: mid-gray `#7B8089` lines, only what the exercise needs.
- Angle labels: white dashed reference lines, a small arc centred ON the named joint (never wrist/hand/foot), number with degree sign, same joint in both panels, and the drawn angle must match the number. Angle numbers are the only text allowed.
- Safety: never draw rounded or over-arched backs, bar on the neck, sagging hips, extra limbs, etc.

**Lessons from the first renders (already folded into the guide):**
1. The 90 degree arc was placed at the wrist instead of the elbow, so the two panels measured different joints.
2. Muscles were wrong: chest not highlighted and secondary muscles looked stronger than the primary one.
3. A soft 3D look contradicted the "no 3D" rule; the owner then chose line-art instead.

**Files (all under `docs/`):**
- `exercise-image-design.md`: the FINAL design guide to keep in the ChatGPT Project (includes exact specs for the first 10 exercises).
- `reference/push-up-approved.webp`: the approved push-up image; upload it to the ChatGPT Project too, as the visual reference.
- `exercise-image-prompts-sample.md`: 10 ready-to-paste test prompts, chosen to be very different from each other (push-up, barbell-back-squat, kettlebell-swing, pull-up, dumbbell-fly, band-pull-apart, plank, cable-triceps-pushdown, dumbbell-bulgarian-split-squat, leg-press), plus a scoring list and a report-back template.
- `exercise-images.md`: SUPERSEDED older flat-mannequin prompts. Ignore.

**Update (angle ranges):** after the first squat renders (one more natural but with off angles, one with correct angles but too rigid), the decision was to give each key angle a **target plus an acceptable range** (`angleRanges` in `docs/data/whatnext-exercise-form-data.json`, drafted for the 10 test exercises only, trainer to confirm). The image labels are now approximate (`~90°`), the pose must look natural (within about 10 degrees), and one key angle per exercise may show a faint range wedge. The card shows the range as text under "How to do it". Test prompts are generated from the JSON with `npm run build:prompts`.

## 8. Next steps (in order)

1. Owner runs the 10 sample prompts in ChatGPT, one per message, and reports failures (which exercise, which rule broke).
2. Fix the guide or the per-exercise data based on the failures.
3. Write the per-exercise data (camera, equipment, primary and secondary muscles, start, end, angle labels) for all 168 exercises and generate one prompt each. A first draft of the chest and back data (44 exercises) was started in the session but not committed; redo it after the sample test.
4. Generate all images, upload to `public/exercises/`, and have a trainer review them (the angle values are typical working values, not rules).
5. App changes: add an optional `steps`/image field to the exercise data; show the image first on each card with a fallback to text cues when no image exists; make the video link secondary ("Prefer video? Watch form").
6. Deploy to Vercel; consider server-side entitlements and a real payment provider (Razorpay or Stripe) later, behind `src/lib/payments/`.

## 9. Working agreements and cautions

- Keep things simple; extendable over about 8 weeks.
- Do not invent video IDs; keep video URLs as YouTube searches.
- A wrong exercise picture can hurt someone: every image needs a human check against the checklist in the guide.
- The owner prefers decisions presented with a recommendation, not a long survey.
- Do not open pull requests or push to other branches unless asked.

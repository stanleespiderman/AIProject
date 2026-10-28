# WhatNxt

> Bored mid-workout? Get your next set in 10 seconds.

A mobile-first web app for gym-goers. Pick the equipment you have and a muscle group, and get 5–8 exercise suggestions, each with sets × reps, form cues and a link to form videos.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (optional accounts and cloud storage). Without Supabase configured there is no backend: everything the app remembers lives in `localStorage`. With it, signed-in users also get their equipment and votes saved to their account, workouts are counted (5 free, then ₹399 once via Dodo Payments) and the exercises done in each workout are logged. Pages are statically prerendered; the only server code is the route handlers in `src/app/api/`. See `docs/deploy-accounts.md` to switch accounts on.

---

## Run locally

Requires Node 20.9+ (Node 22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint (next/core-web-vitals + TypeScript rules)
npm run build      # production build (runs check:data first, also type-checks)
npm run check:data       # verify every exercise has a details entry and the data is consistent
npm run build:details    # regenerate src/data/exerciseDetails.ts from the JSON in docs/data
npm run build:prompts    # regenerate the ChatGPT image prompts (docs/exercise-image-prompts-sample.md) from the same JSON
npm start          # serve the production build
```

To test on your phone, run `npm run dev -- -H 0.0.0.0` and open `http://<your-laptop-ip>:3000` on the same Wi-Fi.

**Reset your local state:** in DevTools → Application → Local Storage, delete the keys starting with `whatnext:`. That brings back the disclaimer, your votes and your saved equipment.

## Deploy to Vercel

Push to GitHub, then "Add New Project" in Vercel and import the repo. It deploys with no settings. To turn on accounts, add the two Supabase variables (`.env.example`) and follow `docs/deploy-accounts.md`.

---

## Project structure

```
src/
├─ app/                        # Routes (App Router)
│  ├─ layout.tsx               # Fonts, page shell, footer, first-run disclaimer
│  ├─ globals.css              # Design tokens (colors, fonts, animations)
│  ├─ page.tsx                 # 1. Home
│  ├─ equipment/page.tsx       # 2. Equipment picker (multi-select, remembered)
│  ├─ muscle/                  # 3. Muscle picker (single select, tap to go)
│  ├─ level/                   # 4. Level picker (Any / Beginner / Intermediate / Advanced)
│  ├─ results/                 # 5. Tile grid + free Shuffle + votes
│  └─ unlock/page.tsx          # Paywall stub. Not linked from anywhere right now
├─ components/
│  ├─ ui/                      # Generic building blocks: Button, Chip, DifficultyDots
│  ├─ ExerciseTile.tsx         # One exercise: small tile, expands in place
│  ├─ MuscleParts.tsx          # "Muscle parts worked" reveal animation
│  ├─ VoteButtons.tsx          # Thumbs up / down
│  ├─ StepHeader.tsx           # Back button + step label + big title
│  ├─ BottomBar.tsx            # Sticky thumb-zone action area
│  ├─ DisclaimerModal.tsx      # One-time safety notice
│  ├─ Footer.tsx               # Disclaimer in the footer
│  └─ icons.tsx                # Inline SVG icons
├─ data/
│  ├─ exercises.ts             # ← The exercise library: names, groups, equipment, sets, reps (168)
│  └─ exerciseDetails.ts       # Form cues, how-to, safety, image specs. AUTO-GENERATED, don't edit
└─ lib/
   ├─ types.ts                 # Exercise model and shared types
   ├─ constants.ts             # Equipment/muscle lists, labels, storage keys, disclaimer text
   ├─ recommend.ts             # Filtering + vote-weighted random picks (pure functions)
   ├─ votes.ts                 # Thumbs up/down persistence
   ├─ storage.ts               # Safe localStorage helpers + React hook
   ├─ params.ts                # URL query param parsing/building
   ├─ youtube.ts               # Builds YouTube *search* URLs
   └─ payments/                # ← Everything monetisation-related
      ├─ index.ts              #   Plans, checkout stub, Pro status
      └─ usage.ts              #   3-free-shuffles-per-day quota
```

Outside `src/`:

```
docs/data/whatnext-exercise-form-data.json   # SOURCE OF TRUTH for form content (cues, steps, safety, image specs)
scripts/build-exercise-details.mjs           # JSON -> src/data/exerciseDetails.ts
scripts/check-exercise-data.ts               # fails the build if exercises and details are out of step
docs/exercise-image-design.md                # style guide for exercise illustrations
```

### Results screen

Results are a two-column grid of tiles (difficulty dots, name, muscle groups). Tapping a tile opens it in place at full width and moves it to the top: image (only if `public/exercises/<id>.*` exists), form cues, "Muscle parts worked" (tap to reveal), sets x reps, How to do it, Watch form and votes. The X or tapping the header closes it. See `public/exercises/README.md` for adding images.

### How the flow works

- Selections are passed between screens in the URL, e.g. `/results?eq=dumbbells,bodyweight&m=chest`. Results links can be shared and bookmarked, and they survive a refresh.
- `recommend()` in `src/lib/recommend.ts`:
  1. Picks a target of 5–8 cards.
  2. Draws from exercises whose `primaryMuscle` matches and which you can do with at least one of your selected pieces of equipment.
  3. If those run out, it tops up with exercises that train the muscle as a secondary. For **Full Body**, it tops up with compound lifts instead: any exercise that trains 3+ muscle groups.
  4. The draw is weighted random: 👍 = 3× as likely, 👎 = 0.25×, neutral = 1×. The weights are in `VOTE_WEIGHT`.
  5. With a level picked (`lv=beginner|intermediate|advanced`, absent = any), only exercises of that difficulty are drawn.
  6. A shuffle avoids the tiles currently on screen when the pool is big enough.
- Votes are read once per roll, so tapping 👍/👎 never reshuffles the cards you're looking at.

### localStorage keys

All keys are listed in `STORAGE_KEYS` in `src/lib/constants.ts`:

| Key | What |
| --- | --- |
| `whatnext:equipment` | Last equipment selection |
| `whatnext:votes` | `{ [exerciseId]: 1 \| -1 }` |
| `whatnext:disclaimer-ack` | Disclaimer dismissed |
| `whatnext:shuffles` | Unused: Shuffle is free and unlimited |
| `whatnext:pro` | Unused: paid access lives in the `entitlements` table |
| `whatnext:guest-workout-used` | This device has had its one guest workout (survives sign-out) |

---

## Adding exercises

An exercise lives in **two places**, joined by its `id`:

1. **`src/data/exercises.ts`**: the basics you edit by hand.

```ts
ex({
  name: "Dumbbell Romanian Deadlift",
  primaryMuscle: "glutes",                 // chest | back | shoulders | arms | legs | glutes | core | fullBody
  secondaryMuscles: ["legs", "back"],      // used to top up thin results
  equipment: ["dumbbells"],                // ANY one of these is enough
  difficulty: "beginner",                  // beginner | intermediate | advanced
  sets: 3,
  reps: "10–12",                           // free text: "8–10", "30s", "10/side"
}),
```

2. **`docs/data/whatnext-exercise-form-data.json`**: the form content (3 form cues, setup and execution steps, breathing, common mistakes, safety, rest, easier/harder option, image spec). Add an entry with the same `id`, then run:

```bash
npm run build:details   # regenerates src/data/exerciseDetails.ts (never edit that file by hand)
npm run check:data      # confirms every exercise has details; also runs automatically before `npm run build`
```

If you add an exercise to `exercises.ts` without a details entry, `check:data` fails and so does the build, so it can't ship by accident.

- **`id`** is generated from the name (`dumbbell-romanian-deadlift`). Votes are stored against the id, so **don't rename a shipped exercise** unless you pass the old `id` explicitly: `ex({ id: "old-id", name: "New Name", ... })`.
- **`videoUrl`** defaults to a YouTube search: `https://www.youtube.com/results?search_query=<name>+form`. Don't paste video ids. They rot, and nobody has checked them.
- **`equipment` means "any of"**: `["dumbbells", "kettlebell"]` means either one works. If you list more than one, give the exercise a neutral name ("Goblet Squat", not "Kettlebell Goblet Squat").
- Keep exactly 3 short, imperative form cues. Stick to common, safe movements.

### Angle ranges

For the exercises that have them, `angleRanges` in the JSON gives each key angle a target and an acceptable range (for example knee at the bottom of a squat: about 90°, 70–100° is fine). The card shows them under "How to do it", and the image prompts use them for the `~` labels and the optional range wedge. They are drafts until a trainer approves them. Only the 10 test exercises have them so far.

### Install to home screen

`src/app/manifest.ts` + `public/icons/` make WhatNxt installable (icons drawn by `scripts/build-app-icons.mjs`). `InstallBanner` shows on Home and under the results: on Android/Chrome an Install button opens the browser's dialog; on iPhone it shows the Share > Add to Home Screen steps. It hides once installed, waits for the first-run safety notice, and a dismissal hides it for 30 days. `/install` is a shareable page (bio, message or QR code) that shows only the steps for the visitor's phone: the Install button on Android, Share steps on iPhone, "open in your browser" inside Instagram/Facebook, and a QR code on desktop. There is deliberately no service worker, so nothing is cached offline yet.

### Muscle parts

Each details entry has `muscleParts` (`primary` / `secondary`): the specific part of the muscle worked, in everyday words ("Upper chest", "Lats", "Mid traps"). It is shown on the expanded tile. It is generated from the anatomical `muscles` names by `node scripts/build-muscle-parts.mjs`, which holds the label table and the per-exercise exceptions (for example incline push-up is lower chest, decline push-up is upper chest). Run it after changing `muscles`, then `npm run build:details`. `node scripts/build-muscle-parts.mjs --check --fedb <path to free-exercise-db exercises.json>` compares the main muscles with free-exercise-db.

### Trainer review

Every details entry has `review.status` in the JSON (`"pending"` or `"approved"`). All 168 are currently **pending**: the content was written from established coaching standards but has not been signed off by a certified trainer. Cards show a "Guidance pending trainer review" note inside "How to do it" until an entry is set to `"approved"` (then run `npm run build:details`). Review the advanced and higher-risk lifts first.

**Adding a new equipment type or muscle group:** add it to the union type in `src/lib/types.ts` and to the list in `src/lib/constants.ts`. TypeScript will then point you at everything that needs updating.

---

## Workouts, payments and the exercise log

With accounts switched on (Supabase env vars set), results show only during a **workout**:

1. **Start without an account.** Tapping *Start workout* signs the visitor in as a Supabase *anonymous* guest. A device gets one guest workout (`whatnext:guest-workout-used`). The copy only says "5 workouts are free".
2. **Then sign in.** After the guest's workout, the gate nudges them to sign in before the next one. Sign-up takes an email and a password in the app and adds both to the same guest user (`supabase.auth.updateUser`), so the workout and its log are kept; the email is confirmed from the link Supabase sends (it lands on `/account`). If the auth server refuses a password on an unconfirmed guest, the app falls back to choosing it on `/account/reset` after the link.
3. **5 free workouts, then ₹399 once** ("NextSet", lifetime). A workout counts when it's finished: *Finish* in the top bar or on the results screen, or automatically after **3 hours**. Finishing within **1 minute with nothing logged** deletes it, so it doesn't count.
4. **Exercise log.** In a running workout each tile has *Start exercise → Mark done* (and *Again*). `/history` lists workouts and their exercises.

All of this is decided in the database. The browser can only read its own rows and call the functions in the migrations. It can't change the count, its workouts or its access.

| Piece | Where |
| --- | --- |
| Workout status, start, finish, exercise logging | `supabase/migrations/20261027000000_workouts_and_access.sql`, `20261028000000_guest_workout_and_exercise_log.sql` |
| Client store (status, logs, actions) | `src/lib/payments/usage.ts` (`useWorkout`, `startWorkout`, `finishWorkout`, `startExercise`, `finishExercise`) |
| Gate on the results screen | `src/components/WorkoutGate.tsx` |
| Live bar (timer, Finish) | `src/components/WorkoutBar.tsx` |
| History | `src/app/history/page.tsx` |
| Plan and checkout start | `src/lib/payments/index.ts` (`PLAN`, display only: the charge is the Dodo product's price) |
| Dodo checkout | `src/app/api/checkout/route.ts` |
| Dodo webhook (grants and revokes access) | `src/app/api/webhooks/dodo-payments/route.ts`, `src/lib/server/payment-state.ts`, `supabase/migrations/20261027010000_payment_ledger.sql` |

**How a purchase works:** the signed-in, email-confirmed user taps *Continue · ₹399* on `/unlock`. `/api/checkout` verifies their Supabase token and creates a Dodo checkout session with their user id in `metadata`. After paying, Dodo returns them to `DODO_PAYMENTS_RETURN_URL` (`/unlock`), which polls until access appears. Access is granted only by the webhook: it verifies Dodo's signature, **re-fetches the payment from Dodo** (so a stale or replayed event can't restore refunded access), and records it through `apply_dodo_payment()` (deduplicated per event; full refunds are final).

Without the Supabase env vars, none of this runs: results show directly and nothing is gated.

### Dodo Payments setup

1. **Product:** Dodo dashboard → Products → a **one-time** product, ₹399 INR. Copy its id (`pdt_...`).
2. **API key:** Developer → API Keys. Start in **Test mode**.
3. **Webhook:** Developer → Webhooks → `https://<your-domain>/api/webhooks/dodo-payments`, events `payment.succeeded` and `refund.succeeded`. Copy the signing secret.
4. **Vercel env vars** (server-only, never `NEXT_PUBLIC_`), then redeploy:
   `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY`, `DODO_PRODUCT_ID`, `DODO_PAYMENTS_RETURN_URL` (`https://<your-domain>/unlock`), `DODO_PAYMENTS_ENVIRONMENT` (`test_mode` or `live_mode`), plus `SUPABASE_SERVICE_ROLE_KEY`.
5. **Test** with a Dodo test card, then switch the key, webhook, product and environment to live. Before going live, remove the "Test Mode demo" note at the top of `src/app/unlock/page.tsx`.

If someone pays but isn't unlocked, check Dodo → Webhooks delivery logs: a 401 means the signing secret is wrong; a 503 means an env var is missing.

---

## Safety

`DISCLAIMER` in `src/lib/constants.ts` is shown once as a modal on first visit and permanently in the footer.

# WhatNext?

> Bored mid-workout? Get your next set in 10 seconds.

A mobile-first web app for gym-goers. Pick the equipment you have and a muscle group, and get 5–8 exercise suggestions, each with sets × reps, form cues and a link to form videos.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (accounts + database) · Dodo Payments. Pages are static: Supabase is called from the browser and row level security protects the data. The only server code is two route handlers for payments (`src/app/api/`). Without Supabase env vars it runs local-only (no accounts) from `localStorage`. Every route is statically prerendered, so it deploys to Vercel with zero config.

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

**Reset your local state:** in DevTools → Application → Local Storage, delete the keys starting with `whatnext:`. That brings back the disclaimer, the 5 free sessions, your votes and your saved equipment, and clears your workout history.

## Deploy to Vercel

Push to GitHub, then "Add New Project" in Vercel and import the repo. For accounts, connect Supabase first (next section).

## Accounts (Supabase) setup

The first session on a device works without an account; from the second session on, sign-in is required (`useSignInRequiredToStart()` in `src/lib/session.ts`; the device remembers this in `whatnext:first-session-used`, which survives sign-out). Buying also requires sign-in: a purchase is a row in `public.entitlements` against the user's account, so it works on any phone. Signed-in users also get their workout log synced.

One-time setup in the Supabase dashboard:

1. **Run the migration:** SQL Editor → paste `supabase/migrations/20261027000000_accounts.sql` → Run. Creates `entitlements`, `workout_sessions`, `exercise_logs` with row level security.
2. **URLs:** Authentication → URL Configuration. Site URL = your production URL. Redirect URLs: `https://<your-domain>/auth/callback`, `https://*-<your-vercel-team>.vercel.app/auth/callback` (previews), `http://localhost:3000/auth/callback`.
3. **Email templates:** Authentication → Emails. Paste `supabase/templates/magic_link.html` into "Magic Link" and `supabase/templates/confirmation.html` into "Confirm signup" (subject: "Your WhatNext? sign-in code"). The defaults only have a link; these add the 6-digit code, which is what works when the email app opens links in a different browser.
4. **Email sending:** Supabase's built-in email is rate-limited to a few emails an hour and is for testing only. Before launch, set up custom SMTP (Authentication → Emails → SMTP, e.g. Resend or Amazon SES).
5. **Env vars:** `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`). The Vercel Supabase integration adds them; redeploy after adding, because they are baked in at build time.

Sign-in is passwordless: `/login` emails a link plus a 6-digit code.

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
│  ├─ results/                 # 4. Results + Shuffle + votes + Start exercise (needs a live session)
│  ├─ history/page.tsx         # Past sessions and the exercises done in each
│  ├─ login/                   # Email sign-in (link or 6-digit code)
│  ├─ auth/callback/page.tsx   # Where the email link lands
│  ├─ account/page.tsx         # Plan, stats, sign out
│  ├─ unlock/page.tsx          # Paywall: ₹399 one-time full access → Dodo checkout
│  ├─ unlock/success/page.tsx  # Back from Dodo: waits for the webhook to unlock
│  └─ api/                     # Server: checkout/ (create Dodo session), webhooks/dodo/ (grant/revoke)
├─ components/
│  ├─ ui/                      # Generic building blocks: Button, Chip, DifficultyBadge
│  ├─ ExerciseCard.tsx         # One exercise card (with Start exercise / Mark done)
│  ├─ SessionBar.tsx           # Sticky "Session live · timer · End session" bar
│  ├─ SessionButton.tsx        # Start / Continue session, or Unlock when free sessions are used up
│  ├─ AccountSync.tsx          # Starts Supabase Auth once per page load (in the layout)
│  ├─ AccountLink.tsx          # "Sign in" / "Account" pill on the home screen
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
   ├─ session.ts               # Session lifecycle: start/end session, start/finish exercise
   ├─ supabase.ts              # Browser Supabase client (null when env vars are missing)
   ├─ account.ts               # Sign in / out, account state, loads the purchase
   ├─ server/                  # Server-only: Dodo client, Supabase admin client (service role)
   ├─ db/                      # ← The workout database (sessions + exercise logs)
   │  ├─ schema.ts             #   Types + DB_VERSION
   │  ├─ index.ts              #   Read/write/hooks on the device copy
   │  └─ remote.ts             #   Sync with Supabase when signed in (push on change, merge on sign-in)
   ├─ youtube.ts               # Builds YouTube *search* URLs
   └─ payments/                # ← Everything monetisation-related
      ├─ index.ts              #   Plan (₹399 full access), startCheckout(), Pro status
      └─ usage.ts              #   5-free-sessions quota
```

Outside `src/`:

```
docs/data/whatnext-exercise-form-data.json   # SOURCE OF TRUTH for form content (cues, steps, safety, image specs)
scripts/build-exercise-details.mjs           # JSON -> src/data/exerciseDetails.ts
scripts/check-exercise-data.ts               # fails the build if exercises and details are out of step
docs/exercise-image-design.md                # style guide for exercise illustrations
```

### How the flow works

- Selections are passed between screens in the URL, e.g. `/results?eq=dumbbells,bodyweight&m=chest`. Results links can be shared and bookmarked, and they survive a refresh.
- `recommend()` in `src/lib/recommend.ts`:
  1. Picks a target of 5–8 cards.
  2. Draws from exercises whose `primaryMuscle` matches and which you can do with at least one of your selected pieces of equipment.
  3. If those run out, it tops up with exercises that train the muscle as a secondary. For **Full Body**, it tops up with compound lifts instead: any exercise that trains 3+ muscle groups.
  4. The draw is weighted random: 👍 = 3× as likely, 👎 = 0.25×, neutral = 1×. The weights are in `VOTE_WEIGHT`.
  5. A shuffle avoids the cards currently on screen when the pool is big enough.
- Votes are read once per roll, so tapping 👍/👎 never reshuffles the cards you're looking at.

### Sessions and the exercise log

- **Start session** on the home screen starts a workout session; the bar at the top shows a timer and **End session**. Results need a live session.
- Each card has **Start exercise**, then **Mark done** (and **Again** to log it twice). Every start and finish is written to the workout database with a snapshot of the exercise.
- A session left open for 3 hours (`SESSION_MAX_HOURS` in `src/lib/db/index.ts`) ends itself.
- A session ended within 1 minute with no exercises logged is deleted and doesn't use up a free session (`MIN_COUNTED_SESSION_MS`).
- Signed in, every change is pushed to Supabase in the background; on sign-in the device and account histories are merged. Signing out clears the device copy.
- `/history` lists every session and what was done.
- The full design, and the server-side Postgres schema for later, is in `docs/plans/sessions-paywall-and-exercise-log.md`.

### localStorage keys

All keys are listed in `STORAGE_KEYS` in `src/lib/constants.ts`:

| Key | What |
| --- | --- |
| `whatnext:equipment` | Last equipment selection |
| `whatnext:votes` | `{ [exerciseId]: 1 \| -1 }` |
| `whatnext:disclaimer-ack` | Disclaimer dismissed |
| `whatnext:db` | Workout database: `{ version, sessions: [{ number, startedAt, endedAt, exercises: [...] }] }` |
| `whatnext:pro` | Cache of the signed-in account's entitlement (from Supabase); null when signed out |
| `whatnext:auth` | Supabase Auth session |
| `whatnext:first-session-used` | This device has had its one session without an account |

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

### Trainer review

Every details entry has `review.status` in the JSON (`"pending"` or `"approved"`). All 168 are currently **pending**: the content was written from established coaching standards but has not been signed off by a certified trainer. Cards show a "Guidance pending trainer review" note inside "How to do it" until an entry is set to `"approved"` (then run `npm run build:details`). Review the advanced and higher-risk lifts first.

**Adding a new equipment type or muscle group:** add it to the union type in `src/lib/types.ts` and to the list in `src/lib/constants.ts`. TypeScript will then point you at everything that needs updating.

---

## Payments (Dodo Payments)

Checkout is [Dodo Payments](https://dodopayments.com) (hosted checkout, merchant of record). A purchase is a row in Supabase `public.entitlements` against the buyer's account.

**How a purchase works**

1. Signed-in user taps **Pay ₹399** on `/unlock` → `startCheckout()` (`src/lib/payments/index.ts`) calls `POST /api/checkout` with their Supabase access token.
2. `src/app/api/checkout/route.ts` checks the token, refuses if they already own it (409), and creates a Dodo checkout session with `metadata.user_id` = their Supabase user id. The browser goes to Dodo's checkout page.
3. After paying, Dodo sends them to `/unlock/success`, which waits for the purchase to appear. **The redirect grants nothing.**
4. Dodo calls `POST /api/webhooks/dodo` (`src/app/api/webhooks/dodo/route.ts`). It verifies the signature and, on `payment.succeeded` for our product, inserts the entitlement with the service role key. That webhook is the only thing that grants access. Duplicate deliveries are harmless. A full `refund.succeeded` or a `dispute.lost` removes the entitlement.

| Export | File | Purpose |
| --- | --- | --- |
| `PLANS` | `payments/index.ts` | One plan: ₹399 one-time full access (display only; the real price is the Dodo product) |
| `startCheckout(planId)` | `payments/index.ts` | Sends the signed-in user to Dodo checkout |
| `isPro()` / `useIsPro()` | `payments/index.ts` | Pro flag, cached from the account's `entitlements` row |
| `FREE_SESSIONS` | `payments/usage.ts` | Free sessions in total, not per day (5) |
| `canStartSession()` / `useFreeSessionsLeft()` | `payments/usage.ts` | Quota check; a session counts the moment it starts |

When the 5 free sessions are used up, Start session becomes "Unlock · ₹399" and links to `/unlock`. Shuffles are unlimited inside a session.

### Dodo Payments setup

1. **Product:** Dodo dashboard → Products → create a **one-time** product "WhatNext? Full access", price **₹399 (INR)**. Copy its id (`pdt_...`).
2. **API key:** Developer → API Keys → create one. Use **Test mode** first.
3. **Webhook:** Developer → Webhooks → add `https://<your-domain>/api/webhooks/dodo`, subscribe to `payment.succeeded`, `refund.succeeded` and `dispute.lost`. Copy the signing secret.
4. **Supabase:** run `supabase/migrations/20261028000000_dodo_payments.sql` (after the accounts migration). Copy the **service role** key (Project Settings → API).
5. **Vercel env vars** (server-only, no `NEXT_PUBLIC_` prefix), then redeploy:
   `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_KEY`, `DODO_PAYMENTS_PRODUCT_ID`, `DODO_PAYMENTS_ENVIRONMENT` (`test_mode` or `live_mode`), `SUPABASE_SERVICE_ROLE_KEY`.
6. **Test:** buy with a Dodo test card, check that `/unlock/success` says "You're unlocked" and a row appears in `entitlements`. Then switch the key, webhook, product id and `DODO_PAYMENTS_ENVIRONMENT` to live mode.

If someone pays but isn't unlocked: check Dodo → Webhooks delivery logs (a 401 means the signing secret is wrong; 503 means env vars are missing), then Vercel function logs for `[dodo webhook]`.

---

## Safety

`DISCLAIMER` in `src/lib/constants.ts` is shown once as a modal on first visit and permanently in the footer.

# WhatNext?

> Bored mid-workout? Get your next set in 10 seconds.

A mobile-first web app for gym-goers. Pick the equipment you have and a muscle group, and get 5–8 exercise suggestions, each with sets × reps, form cues and a link to form videos.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. No backend, no database and no accounts. Everything the app remembers lives in `localStorage`. Every route is statically prerendered, so it deploys to Vercel with zero config.

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
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

To test on your phone, run `npm run dev -- -H 0.0.0.0` and open `http://<your-laptop-ip>:3000` on the same Wi-Fi.

**Reset your local state:** in DevTools → Application → Local Storage, delete the keys starting with `whatnext:`. That brings back the disclaimer, the free shuffles, your votes and your saved equipment.

## Deploy to Vercel

Push to GitHub, then "Add New Project" in Vercel and import the repo. No environment variables or settings are needed.

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
│  ├─ results/                 # 4. Results + Shuffle + votes
│  └─ unlock/page.tsx          # 5. "Unlock NextSet" paywall (stub)
├─ components/
│  ├─ ui/                      # Generic building blocks: Button, Chip, DifficultyBadge
│  ├─ ExerciseCard.tsx         # One exercise card
│  ├─ VoteButtons.tsx          # Thumbs up / down
│  ├─ StepHeader.tsx           # Back button + step label + big title
│  ├─ BottomBar.tsx            # Sticky thumb-zone action area
│  ├─ DisclaimerModal.tsx      # One-time safety notice
│  ├─ Footer.tsx               # Disclaimer in the footer
│  └─ icons.tsx                # Inline SVG icons
├─ data/
│  └─ exercises.ts             # ← The exercise library (168 exercises)
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

### How the flow works

- Selections are passed between screens in the URL, e.g. `/results?eq=dumbbells,bodyweight&m=chest`. Results links can be shared and bookmarked, and they survive a refresh.
- `recommend()` in `src/lib/recommend.ts`:
  1. Picks a target of 5–8 cards.
  2. Draws from exercises whose `primaryMuscle` matches and which you can do with at least one of your selected pieces of equipment.
  3. If those run out, it tops up with exercises that train the muscle as a secondary. For **Full Body**, it tops up with compound lifts instead: any exercise that trains 3+ muscle groups.
  4. The draw is weighted random: 👍 = 3× as likely, 👎 = 0.25×, neutral = 1×. The weights are in `VOTE_WEIGHT`.
  5. A shuffle avoids the cards currently on screen when the pool is big enough.
- Votes are read once per roll, so tapping 👍/👎 never reshuffles the cards you're looking at.

### localStorage keys

All keys are listed in `STORAGE_KEYS` in `src/lib/constants.ts`:

| Key | What |
| --- | --- |
| `whatnext:equipment` | Last equipment selection |
| `whatnext:votes` | `{ [exerciseId]: 1 \| -1 }` |
| `whatnext:disclaimer-ack` | Disclaimer dismissed |
| `whatnext:shuffles` | `{ date, count }`. Today's shuffle usage (local date) |
| `whatnext:pro` | Set only by `grantPro()` after a real payment |

---

## Adding exercises

Open `src/data/exercises.ts` and add an entry to the right muscle section:

```ts
ex({
  name: "Dumbbell Romanian Deadlift",
  primaryMuscle: "glutes",                 // chest | back | shoulders | arms | legs | glutes | core | fullBody
  secondaryMuscles: ["legs", "back"],      // used to top up thin results
  equipment: ["dumbbells"],                // ANY one of these is enough
  difficulty: "beginner",                  // beginner | intermediate | advanced
  sets: 3,
  reps: "10–12",                           // free text: "8–10", "30s", "10/side"
  formCues: ["Push hips back, soft knees", "Dumbbells slide down your thighs", "Stop when your back wants to round"],
}),
```

- **`id`** is generated from the name (`dumbbell-romanian-deadlift`). Votes are stored against the id, so **don't rename a shipped exercise** unless you pass the old `id` explicitly: `ex({ id: "old-id", name: "New Name", ... })`.
- **`videoUrl`** defaults to a YouTube search: `https://www.youtube.com/results?search_query=<name>+form`. Don't paste video ids. They rot, and nobody has checked them. To tweak the search, pass `videoUrl: youtubeSearchUrl("better search terms")`.
- **`equipment` means "any of"**: `["dumbbells", "kettlebell"]` means either one works. If you list more than one, give the exercise a neutral name ("Goblet Squat", not "Kettlebell Goblet Squat") so it doesn't look wrong to someone who only has dumbbells.
- Keep 2–3 short, imperative form cues. Stick to common, safe movements.

**Adding a new equipment type or muscle group:** add it to the union type in `src/lib/types.ts` and to the list in `src/lib/constants.ts`. TypeScript will then point you at everything that needs updating.

---

## Payments (stub)

**Everything lives in `src/lib/payments/`.** The UI only touches its exports, so swapping in a real provider shouldn't require changes to any component.

| Export | File | Purpose |
| --- | --- | --- |
| `PLANS` | `index.ts` | ₹199 lifetime and ₹299/month. Edit prices and copy here |
| `startCheckout(planId)` | `index.ts` | **The stub.** Currently returns `{ status: "unavailable" }` |
| `grantPro(planId)` / `isPro()` / `useIsPro()` | `index.ts` | Pro flag; Pro users get unlimited shuffles |
| `FREE_SHUFFLES_PER_DAY` | `usage.ts` | The daily free limit (3) |
| `consumeShuffle()` / `useShufflesLeft()` | `usage.ts` | Quota tracking; resets at local midnight |

When the free shuffles run out, the Shuffle button becomes "Unlock more shuffles" and links to `/unlock`.

### Plugging in Razorpay or Stripe

1. Add a server route, e.g. `src/app/api/checkout/route.ts`, that creates a Razorpay order or a Stripe Checkout Session using your secret key from env vars. Never put secret keys in client code.
2. Replace the body of `startCheckout()` to call that route:
   - **Razorpay:** load `checkout.js`, open `new Razorpay({ order_id, key, handler })`, send the response to a server route that verifies the signature, then call `grantPro(planId)`.
   - **Stripe:** redirect to the Checkout Session URL and handle the result on a `/unlock/success` page or through a webhook.
3. **Before charging real money:** Pro status currently lives in `localStorage`, which the user can edit. Once payments are real, keep entitlements on the server (a database or the provider's customer records), and have `isPro()` check that instead.

---

## Safety

`DISCLAIMER` in `src/lib/constants.ts` is shown once as a modal on first visit and permanently in the footer.

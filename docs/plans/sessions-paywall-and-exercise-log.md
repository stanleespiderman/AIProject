# Plan: workout sessions, 5-free-sessions paywall, exercise log

Status: **v1 implemented** (on-device). **Phase 2 accounts + server database implemented** (Supabase); real payments not built yet.

## What changes

| Before | After |
| --- | --- |
| 3 free shuffles per day, resets at midnight | **5 free workout sessions in total**, then pay |
| ₹199 lifetime or ₹299/month | **One plan: ₹399 one-time, full and unlimited access** |
| Nothing is recorded | Every session and every exercise started/finished is stored |
| "Start" just opens the picker | **Start session** / **End session** buttons; **Start exercise** / **Mark done** on each card |

## Decisions (and why)

1. **A session is the unit of value.** A user taps *Start session* on the home screen, picks kit and muscle, does exercises, and taps *End session* in the bar at the top. Shuffles are unlimited inside a session.
2. **A session counts the moment it starts.** Counting at the end would let someone never end a session and use the app forever.
3. **Sessions auto-end after 3 hours** (`SESSION_MAX_HOURS`). Stops one session being left open as a permanent free pass, and tidies up when someone forgets to tap End.
4. **The paywall sits on the results screen and on *Start session*.** Equipment and muscle pickers stay open so people can explore; the exercises themselves need a live session. A 6th session sends free users to `/unlock`.
5. **Only one plan.** ₹399 one-time. Simpler to explain, one price to test. Existing Pro users (from the old plans) stay Pro.
6. **"Start exercise" logs an entry; "Mark done" completes it.** Each log stores a snapshot of the exercise (name, muscle, sets × reps) so history still reads right if the library changes later. The same exercise can be logged twice in a session (tap *Again*).
7. **The database is on-device for v1.** The project brief says no backend, no accounts. A server database without accounts can't tell users apart, so on-device is the honest v1. All reads and writes go through `src/lib/db/`, so the storage engine can be swapped without touching components.

## v1 architecture (built)

```
src/lib/db/schema.ts     Types: Database, WorkoutSession, ExerciseLog. DB_VERSION for migrations.
src/lib/db/index.ts      The repository: read/update the database, React hooks, queries.
src/lib/session.ts       Lifecycle: startSession / endSession / startExercise / finishExercise.
src/lib/payments/usage.ts  FREE_SESSIONS = 5, canStartSession(), useFreeSessionsLeft().
src/lib/payments/index.ts  PLANS = [{ full, ₹399, one-time }], checkout stub, Pro flag.
src/components/SessionBar.tsx    Sticky "Session live · timer · End session" bar (in the layout).
src/components/SessionButton.tsx Home CTA: Start / Continue session, or Unlock when out of free sessions.
src/app/history/page.tsx         Past sessions and the exercises done in each.
```

Storage: one localStorage key, `whatnext:db`:

```jsonc
{
  "version": 1,
  "sessions": [
    {
      "id": "…", "number": 1,
      "startedAt": "2026-10-27T10:00:00.000Z",
      "endedAt": "2026-10-27T10:48:12.000Z",   // null while live
      "endReason": "user",                      // "user" | "timeout"
      "exercises": [
        {
          "id": "…", "exerciseId": "dumbbell-bench-press",
          "name": "Dumbbell Bench Press", "primaryMuscle": "chest",
          "sets": 3, "reps": "8–12",
          "startedAt": "…", "completedAt": "…"   // null if started but not finished
        }
      ]
    }
  ]
}
```

## Known limits of v1

- **The paywall is a soft gate.** Clearing site data resets the count and the Pro flag is editable. Fine for validating demand; not fine once real money moves.
- History lives on one device and is lost if the browser storage is cleared.
- Payments are still a stub (`startCheckout()` returns "unavailable").

## Phase 2: accounts + server database (built) and real payments (not built)

What was built, and how it differs from the sketch below:

- **Supabase Auth, passwordless email** (link + 6-digit code). Accounts are optional to train, required to buy.
- **Schema:** `supabase/migrations/20261027000000_accounts.sql`. Uses `auth.users` directly (no `users` table); session `number` is computed on the device, not stored.
- **Entitlements are read-only to users** (RLS: select own row only). Only the service role can insert, so a purchase can only be granted by the server after payment verification. Tested: a signed-in user posting to `entitlements` gets 403.
- **Sync, not server-first:** the device keeps working offline; changes are pushed in the background and merged on sign-in (`src/lib/db/remote.ts`).
- **Quick empty sessions don't count:** ended within 1 minute with nothing logged → deleted (owner decision, 2026-10-27).
- **Still soft:** the free-session count is enforced in the browser, and anonymous use is allowed, so clearing site data still resets it. Making it hard means requiring sign-in to start a session and moving `startSession` to a server function; not worth it before payments are live.

Original sketch:

Do these together, because each needs the others:

1. **Accounts.** Phone OTP or Google sign-in (Supabase Auth, Clerk, or NextAuth). Without a user id, server-side counts and entitlements are meaningless.
2. **Postgres** (Supabase / Neon / Vercel Postgres). Schema:

```sql
create table users (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now()
);

create table entitlements (
  user_id      uuid primary key references users(id) on delete cascade,
  plan         text not null check (plan in ('full')),
  amount_paise integer not null,              -- 39900
  provider     text not null,                 -- 'razorpay'
  payment_id   text not null unique,          -- verified provider payment id
  granted_at   timestamptz not null default now()
);

create table workout_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users(id) on delete cascade,
  number      integer not null,               -- 1, 2, 3… per user; free if <= 5
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  end_reason  text check (end_reason in ('user', 'timeout')),
  unique (user_id, number)
);

create table exercise_logs (
  id             uuid primary key default gen_random_uuid(),
  session_id     uuid not null references workout_sessions(id) on delete cascade,
  exercise_id    text not null,               -- id from src/data/exercises.ts
  name           text not null,               -- snapshot
  primary_muscle text not null,
  sets           integer not null,
  reps           text not null,
  started_at     timestamptz not null default now(),
  completed_at   timestamptz
);

create index on workout_sessions (user_id, started_at desc);
create index on exercise_logs (session_id);
```

3. **Server routes** (`src/app/api/...`): `POST /sessions` (checks `count < 5 or entitlement exists` inside a transaction, then inserts), `POST /sessions/:id/end`, `POST /sessions/:id/exercises`, `PATCH /exercises/:id`.
4. **Razorpay** for ₹399: server creates an order (39900 paise), client opens Checkout, server verifies the signature (and a webhook as backup), then inserts into `entitlements`.
5. **Swap the repository.** Re-implement `src/lib/db/index.ts` against the API. Offer a one-time "import my history" that uploads the local `whatnext:db` after sign-in.

## Owner decisions

- A session ended within a minute with no exercises doesn't count. (Decided 2026-10-27.)
- Reps/weight per set: later stage. The schema has room: add a `sets_done jsonb` column to `exercise_logs`.
- Open: is 3 hours the right auto-end? Most gym sessions are under 2.

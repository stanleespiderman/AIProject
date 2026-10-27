# Regression checks

Run the pure state checks with Node 22 or later:

```
node --experimental-strip-types --test tests/payment-state.test.mjs
```

The ledger test runs the committed SQL on PGlite, a real PostgreSQL engine compiled to WASM. Install its test-only dependency without changing the app lockfile:

```
npm install --no-save --package-lock=false @electric-sql/pglite@0.5.12
node --test tests/payment-ledger.test.mjs
```

It checks duplicate event handling, refund-before-success, late-success-after-refund, independent purchases, function privileges and RLS. This is local regression evidence, not proof that the hosted database migration was applied or that provider delivery works.

## Workout rules against a real Supabase

`workouts.supabase.test.mjs` signs in like the app does (guest and email users) and checks: a guest gets one workout and must then sign up; converting the guest keeps the workout; quick empty workouts don't count; workouts left open auto-finish after 3 hours and count; the 5-workout limit and paid access; exercise logging; and that clients can't read others' rows or write tables directly.

Start a local Supabase (Docker) with anonymous sign-ins and email confirmations on, apply the migrations, then:

```
SUPABASE_URL=http://127.0.0.1:54321 SUPABASE_ANON_KEY=... SUPABASE_SERVICE_ROLE_KEY=... \
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres node --test tests/workouts.supabase.test.mjs
```

Without those variables the tests are skipped.

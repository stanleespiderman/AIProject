# Payment regression checks

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

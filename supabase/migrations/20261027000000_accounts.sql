-- WhatNext? accounts: purchases (entitlements) and the synced workout log.
-- Run once in Supabase → SQL Editor (or `supabase db push` with the CLI).
-- Users themselves live in Supabase Auth (auth.users); nothing to create for them.

-- ─── Purchases ──────────────────────────────────────────────────
-- One row per user who has paid. Users can READ their own row but never
-- write it: only the server (service role key, after verifying the payment
-- with Razorpay) inserts here. That is what ties a purchase to an account.
create table public.entitlements (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  plan         text not null check (plan in ('full')),
  amount_paise integer not null check (amount_paise > 0),  -- 39900 for ₹399
  provider     text not null,                              -- 'razorpay'
  payment_id   text not null unique,                       -- verified provider payment id
  granted_at   timestamptz not null default now()
);

alter table public.entitlements enable row level security;

create policy "Users read their own entitlement"
  on public.entitlements for select to authenticated
  using (user_id = (select auth.uid()));

-- ─── Workout log ────────────────────────────────────────────────
-- Mirrors src/lib/db/schema.ts. Ids are generated on the device so the
-- app works offline and syncs later (upserts are idempotent).
create table public.workout_sessions (
  id          uuid primary key,
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  started_at  timestamptz not null,
  ended_at    timestamptz,
  end_reason  text check (end_reason in ('user', 'timeout'))
);

create table public.exercise_logs (
  id             uuid primary key,
  session_id     uuid not null references public.workout_sessions (id) on delete cascade,
  user_id        uuid not null default auth.uid() references auth.users (id) on delete cascade,
  exercise_id    text not null,      -- id from src/data/exercises.ts
  name           text not null,      -- snapshot, so history survives library edits
  primary_muscle text not null,
  sets           integer not null,
  reps           text not null,
  started_at     timestamptz not null,
  completed_at   timestamptz
);

create index workout_sessions_user_started on public.workout_sessions (user_id, started_at desc);
create index exercise_logs_session on public.exercise_logs (session_id);
create index exercise_logs_user on public.exercise_logs (user_id);

alter table public.workout_sessions enable row level security;
alter table public.exercise_logs enable row level security;

create policy "Users manage their own sessions"
  on public.workout_sessions for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "Users manage their own exercise logs"
  on public.exercise_logs for all to authenticated
  using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.workout_sessions s
      where s.id = session_id and s.user_id = (select auth.uid())
    )
  );

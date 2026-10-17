-- WhatNext? account data. Run once in the Supabase SQL editor (or `supabase db push`).
-- Every table is locked to its owner with row level security: the anon key in the
-- browser can only ever read and write the signed-in user's own rows.

-- ── tables ──────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 60),
  created_at timestamptz not null default now()
);

create table public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  -- ids from src/lib/constants.ts EQUIPMENT
  equipment text[] not null default '{}'
    check (equipment <@ array['dumbbells','barbell','kettlebell','cables','machines','bands','bodyweight']),
  updated_at timestamptz not null default now()
);

create table public.exercise_votes (
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_id text not null check (char_length(exercise_id) between 1 and 80),
  vote smallint not null check (vote in (-1, 1)),
  updated_at timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

-- ── row level security ──────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.exercise_votes enable row level security;

create policy "profiles: own row" on public.profiles
  for all to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "settings: own row" on public.user_settings
  for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "votes: own rows" on public.exercise_votes
  for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- ── new user: create a profile and an empty settings row ────────────────
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(new.raw_user_meta_data ->> 'display_name', 60));
  insert into public.user_settings (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Workout sessions and paid access. Run once in the Supabase SQL editor after the init migration.
-- The browser can only READ its own rows. All writes go through the functions below
-- (workouts) or the server webhook with the service role key (entitlements).

create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);
create index workouts_user_idx on public.workouts (user_id, finished_at);
-- At most one unfinished workout per user.
create unique index workouts_one_active_idx on public.workouts (user_id) where finished_at is null;

create table public.entitlements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan text not null default 'lifetime' check (plan = 'lifetime'),
  dodo_payment_id text not null unique,
  granted_at timestamptz not null default now()
);

alter table public.workouts enable row level security;
alter table public.entitlements enable row level security;

create policy "workouts: read own" on public.workouts
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "entitlements: read own" on public.entitlements
  for select to authenticated using ((select auth.uid()) = user_id);
-- No insert/update/delete policies: only the functions and the server can write.

-- Free completed workouts before payment is needed.
create function public.free_workout_limit() returns int
language sql immutable as $$ select 5 $$;

-- Where does this user stand? Needs a signed-in user with a confirmed email.
create function public.workout_status()
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  confirmed boolean;
  v_paid boolean;
  v_finished int;
  v_active uuid;
begin
  if uid is null then
    return json_build_object('ok', false, 'reason', 'signed_out');
  end if;
  select (email_confirmed_at is not null) into confirmed from auth.users where id = uid;
  if not coalesce(confirmed, false) then
    return json_build_object('ok', false, 'reason', 'email_unconfirmed');
  end if;
  select exists (select 1 from public.entitlements where user_id = uid) into v_paid;
  select count(*) into v_finished from public.workouts where user_id = uid and finished_at is not null;
  select id into v_active from public.workouts where user_id = uid and finished_at is null;
  return json_build_object(
    'ok', true,
    'paid', v_paid,
    'finished', v_finished,
    'limit', public.free_workout_limit(),
    'active_id', v_active
  );
end;
$$;

-- Start a workout (or return the one already running). Refuses when the free
-- workouts are used up and the user has not paid.
create function public.start_workout()
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  st json;
  new_id uuid;
begin
  st := public.workout_status();
  if not (st ->> 'ok')::boolean then
    return st;
  end if;
  if (st ->> 'active_id') is not null then
    return st;
  end if;
  if not (st ->> 'paid')::boolean and (st ->> 'finished')::int >= public.free_workout_limit() then
    return json_build_object('ok', false, 'reason', 'limit_reached', 'finished', (st ->> 'finished')::int, 'limit', public.free_workout_limit());
  end if;
  insert into public.workouts (user_id) values (uid) returning id into new_id;
  return public.workout_status();
end;
$$;

-- Mark the running workout as completed. Only counts for the caller's own workout.
create function public.finish_workout()
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
begin
  if uid is null then
    return json_build_object('ok', false, 'reason', 'signed_out');
  end if;
  update public.workouts set finished_at = now() where user_id = uid and finished_at is null;
  return public.workout_status();
end;
$$;

revoke all on function public.workout_status(), public.start_workout(), public.finish_workout() from public, anon;
grant execute on function public.workout_status(), public.start_workout(), public.finish_workout() to authenticated;

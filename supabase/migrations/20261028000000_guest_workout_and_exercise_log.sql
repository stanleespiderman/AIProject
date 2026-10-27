-- Exercise log, guest first workout and workout timing rules.
-- Run once in the Supabase SQL editor after 20261027010000_payment_ledger.sql.
--
-- 1. exercise_logs: which exercises were started / done in each workout.
-- 2. A guest (Supabase anonymous sign-in) gets ONE workout before they must create an account.
--    Converting the guest to an email account keeps the same user id, so that workout still counts.
-- 3. A workout left running is finished automatically after 3 hours (and counts), so a free
--    workout can't be kept open forever.
-- 4. Finishing within 1 minute with nothing logged deletes the workout instead: it doesn't count.

-- ─── Exercise log ───────────────────────────────────────────────
create table public.exercise_logs (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_id text not null check (char_length(exercise_id) <= 120),
  name text not null check (char_length(name) <= 200),        -- snapshot, so history survives library edits
  primary_muscle text not null check (char_length(primary_muscle) <= 40),
  sets int not null check (sets between 0 and 100),
  reps text not null check (char_length(reps) <= 40),
  started_at timestamptz not null default now(),
  completed_at timestamptz
);
create index exercise_logs_workout_idx on public.exercise_logs (workout_id);
create index exercise_logs_user_idx on public.exercise_logs (user_id, started_at desc);

alter table public.exercise_logs enable row level security;
create policy "exercise_logs: read own" on public.exercise_logs
  for select to authenticated using ((select auth.uid()) = user_id);
-- No insert/update/delete policies: writes go through the functions below.

-- ─── Timing rules ───────────────────────────────────────────────
create function public.workout_max_duration() returns interval
language sql immutable as $$ select interval '3 hours' $$;

create function public.workout_min_counted() returns interval
language sql immutable as $$ select interval '1 minute' $$;

-- Finish (and count) the user's workout if it has been running longer than the maximum.
create function public.close_stale_workout(uid uuid) returns void
language sql security definer set search_path = '' as $$
  update public.workouts
     set finished_at = started_at + public.workout_max_duration()
   where user_id = uid and finished_at is null
     and started_at < now() - public.workout_max_duration();
$$;
revoke all on function public.close_stale_workout(uuid) from public, anon, authenticated;

-- ─── Status / start / finish (replace the versions from 20261027000000) ───
create or replace function public.workout_status()
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  u record;
  v_paid boolean;
  v_finished int;
  v_active uuid;
  v_active_started timestamptz;
begin
  if uid is null then
    return json_build_object('ok', false, 'reason', 'signed_out');
  end if;
  select email_confirmed_at is not null as confirmed, coalesce(is_anonymous, false) as guest
    into u from auth.users where id = uid;
  if not coalesce(u.guest, false) and not coalesce(u.confirmed, false) then
    return json_build_object('ok', false, 'reason', 'email_unconfirmed');
  end if;

  perform public.close_stale_workout(uid);
  select exists (select 1 from public.entitlements where user_id = uid) into v_paid;
  select count(*) into v_finished from public.workouts where user_id = uid and finished_at is not null;
  select id, started_at into v_active, v_active_started from public.workouts where user_id = uid and finished_at is null;

  -- A guest's one workout is done: they need an account (which keeps this user id) to go on.
  if u.guest and v_active is null and v_finished >= 1 then
    return json_build_object('ok', false, 'reason', 'signup_required', 'finished', v_finished,
                             'limit', public.free_workout_limit());
  end if;

  return json_build_object(
    'ok', true,
    'paid', v_paid,
    'guest', u.guest,
    'finished', v_finished,
    'limit', public.free_workout_limit(),
    'active_id', v_active,
    'active_started_at', v_active_started
  );
end;
$$;

create or replace function public.finish_workout()
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  w record;
begin
  if uid is null then
    return json_build_object('ok', false, 'reason', 'signed_out');
  end if;
  select id, started_at into w from public.workouts where user_id = uid and finished_at is null;
  if w.id is not null then
    if now() - w.started_at < public.workout_min_counted()
       and not exists (select 1 from public.exercise_logs where workout_id = w.id) then
      delete from public.workouts where id = w.id;  -- too short and empty: doesn't count
    else
      update public.workouts set finished_at = now() where id = w.id;
    end if;
  end if;
  return public.workout_status();
end;
$$;
-- start_workout() is unchanged: it calls workout_status(), which now handles guests and stale workouts.

-- ─── Logging exercises ──────────────────────────────────────────
-- Log that an exercise was started in the caller's running workout. Returns the log id.
create function public.log_exercise_start(p_exercise_id text, p_name text, p_primary_muscle text, p_sets int, p_reps text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
  v_workout uuid;
  new_id uuid;
begin
  if uid is null then raise exception 'Not signed in'; end if;
  perform public.close_stale_workout(uid);
  select id into v_workout from public.workouts where user_id = uid and finished_at is null;
  if v_workout is null then raise exception 'No workout in progress'; end if;
  insert into public.exercise_logs (workout_id, user_id, exercise_id, name, primary_muscle, sets, reps)
  values (v_workout, uid, p_exercise_id, p_name, p_primary_muscle, p_sets, p_reps)
  returning id into new_id;
  return new_id;
end;
$$;

-- Mark one of the caller's logged exercises as done.
create function public.log_exercise_done(p_log_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.exercise_logs set completed_at = coalesce(completed_at, now())
   where id = p_log_id and user_id = (select auth.uid());
$$;

revoke all on function public.log_exercise_start(text, text, text, int, text), public.log_exercise_done(uuid)
  from public, anon;
grant execute on function public.log_exercise_start(text, text, text, int, text), public.log_exercise_done(uuid)
  to authenticated;
-- create or replace keeps the existing grants on workout_status() and finish_workout().

// Workout rules against a REAL Supabase (local: `npx supabase start`), signing in like the app does.
// Needs anonymous sign-ins and email confirmations enabled, and the migrations applied.
//
//   SUPABASE_URL=http://127.0.0.1:54321 SUPABASE_ANON_KEY=... SUPABASE_SERVICE_ROLE_KEY=... \
//   DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres node --test tests/workouts.supabase.test.mjs
//
// Covers: guest gets one workout then must sign up, the guest's workout survives converting to an
// email account, quick empty workouts don't count, stale workouts auto-finish and count, the free
// limit and paid access, exercise logging, and that clients can't write tables directly.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL: url, SUPABASE_ANON_KEY: anon, SUPABASE_SERVICE_ROLE_KEY: service, DATABASE_URL: dbUrl } = process.env;
const skip = !(url && anon && service && dbUrl) && "set SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL";

const sql = (q) => execFileSync("psql", [dbUrl, "-Atc", q]).toString().trim();
const client = () => createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
const rpc = async (sb, fn, args) => {
  const { data, error } = await sb.rpc(fn, args);
  if (error) throw error;
  return data;
};
const logOne = (sb) =>
  rpc(sb, "log_exercise_start", { p_exercise_id: "push-up", p_name: "Push-Up", p_primary_muscle: "chest", p_sets: 3, p_reps: "10" });
const backdate = (uid, interval) =>
  sql(`update public.workouts set started_at = started_at - interval '${interval}' where user_id = '${uid}' and finished_at is null`);

test("guest: one workout, logging, then sign-up required; converting keeps it", { skip }, async () => {
  const sb = client();
  const { data, error } = await sb.auth.signInAnonymously();
  assert.ifError(error);
  const uid = data.user.id;

  let s = await rpc(sb, "workout_status");
  assert.equal(s.ok, true);
  assert.equal(s.guest, true);
  s = await rpc(sb, "start_workout");
  assert.ok(s.active_id, "guest can start their first workout");
  assert.ok(s.active_started_at);

  const logId = await logOne(sb);
  await rpc(sb, "log_exercise_done", { p_log_id: logId });
  const { data: logs } = await sb.from("exercise_logs").select("name, completed_at");
  assert.equal(logs.length, 1);
  assert.ok(logs[0].completed_at);

  s = await rpc(sb, "finish_workout");
  assert.equal(s.reason, "signup_required", "after the guest workout, an account is needed");
  s = await rpc(sb, "start_workout");
  assert.equal(s.reason, "signup_required", "and starting again is refused");

  // Convert the guest to an email account (same user id), confirmed as the email link would.
  const { error: upErr } = await sb.auth.updateUser({ email: `guest-${Date.now()}@example.com` });
  assert.ifError(upErr);
  sql(`update auth.users set email = email_change, email_change = '', email_confirmed_at = now(), is_anonymous = false where id = '${uid}'`);
  await sb.auth.refreshSession();
  s = await rpc(sb, "workout_status");
  assert.equal(s.ok, true);
  assert.equal(s.guest, false);
  assert.equal(s.finished, 1, "the guest workout counts towards the 5 free ones");
  s = await rpc(sb, "start_workout");
  assert.ok(s.active_id, "the converted account can keep training");
});

test("signed-in: quick empty workouts don't count, stale ones auto-finish, limit, paid access", { skip }, async () => {
  const admin = createClient(url, service, { auth: { persistSession: false } });
  const email = `user-${Date.now()}@example.com`;
  const { data: created, error } = await admin.auth.admin.createUser({ email, password: "password123", email_confirm: true });
  assert.ifError(error);
  const uid = created.user.id;
  const sb = client();
  assert.ifError((await sb.auth.signInWithPassword({ email, password: "password123" })).error);

  let s = await rpc(sb, "start_workout");
  s = await rpc(sb, "finish_workout");
  assert.equal(s.finished, 0, "finished within a minute with nothing logged: doesn't count");
  assert.equal(sql(`select count(*) from public.workouts where user_id = '${uid}'`), "0", "and is deleted");

  await rpc(sb, "start_workout");
  backdate(uid, "2 minutes");
  s = await rpc(sb, "finish_workout");
  assert.equal(s.finished, 1, "an empty workout over a minute long counts");

  await rpc(sb, "start_workout");
  backdate(uid, "4 hours");
  s = await rpc(sb, "workout_status");
  assert.equal(s.active_id, null, "a workout left open for 3+ hours is finished automatically");
  assert.equal(s.finished, 2, "and counts");
  assert.equal(
    sql(`select max(finished_at - started_at) from public.workouts where user_id = '${uid}'`),
    "03:00:00",
    "finished at the 3 hour mark",
  );
  await assert.rejects(logOne(sb), (e) => /No workout in progress/.test(e.message), "can't log without a running workout");

  for (let i = 0; i < 3; i++) {
    await rpc(sb, "start_workout");
    await logOne(sb);
    await rpc(sb, "finish_workout");
  }
  s = await rpc(sb, "start_workout");
  assert.equal(s.reason, "limit_reached", "5 finished free workouts: pay to continue");

  sql(`insert into public.entitlements (user_id, dodo_payment_id) values ('${uid}', 'pay_test_${Date.now()}')`);
  s = await rpc(sb, "start_workout");
  assert.ok(s.active_id, "paid users can keep training");
  assert.equal(s.paid, true);
});

test("clients can only read their own rows and can't write tables directly", { skip }, async () => {
  const a = client();
  const b = client();
  assert.ifError((await a.auth.signInAnonymously()).error);
  assert.ifError((await b.auth.signInAnonymously()).error);
  await rpc(a, "start_workout");
  const logId = await logOne(a);
  await rpc(b, "start_workout");

  const { data: seen } = await b.from("exercise_logs").select("id");
  assert.equal(seen.length, 0, "B can't see A's log");
  await rpc(b, "log_exercise_done", { p_log_id: logId });
  assert.equal(sql(`select completed_at is null from public.exercise_logs where id = '${logId}'`), "t", "B can't complete A's log");

  const { error: insErr } = await b.from("exercise_logs").insert({ workout_id: logId, exercise_id: "x", name: "x", primary_muscle: "x", sets: 1, reps: "1" });
  assert.ok(insErr, "direct inserts are refused");
  const aId = (await a.auth.getUser()).data.user.id;
  const { data: changed } = await b.from("workouts").update({ finished_at: new Date().toISOString() }).eq("user_id", aId).select();
  const { data: own } = await a.from("workouts").update({ started_at: "2000-01-01T00:00:00Z" }).eq("user_id", aId).select();
  assert.equal((changed ?? []).length + (own ?? []).length, 0, "direct updates are refused, even on your own rows");
  assert.equal(sql(`select count(*) from public.workouts where user_id = '${aId}' and finished_at is null and started_at > '2001-01-01'`), "1");
  const { error: staleErr } = await b.rpc("close_stale_workout", { uid: (await b.auth.getUser()).data.user.id });
  assert.ok(staleErr, "internal helpers can't be called by clients");
});

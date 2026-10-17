"use client";

import { STORAGE_KEYS } from "./constants";
import { getSupabase } from "./supabase/client";
import { readJSON, writeJSON } from "./storage";
import type { EquipmentId, Vote, VoteMap } from "./types";

/**
 * Cloud sync for signed-in users. localStorage stays the source the UI reads, so the app
 * is instant and works offline. Signed in, changes are also written to Supabase, and the
 * account's data is merged in on sign-in. Failures are swallowed: the local copy still
 * has the change and the next sign-in merge uploads anything the cloud is missing.
 */

/** Merge rule on sign-in: the account wins on conflicts; anything only on this device is kept and uploaded. */
export function mergeVotes(local: VoteMap, remote: VoteMap): VoteMap {
  return { ...local, ...remote };
}

export function mergeEquipment(local: EquipmentId[], remote: EquipmentId[]): EquipmentId[] {
  return remote.length > 0 ? remote : local;
}

export async function pullAndMerge(userId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const [votesRes, settingsRes] = await Promise.all([
    supabase.from("exercise_votes").select("exercise_id, vote"),
    supabase.from("user_settings").select("equipment").maybeSingle(),
  ]);
  if (votesRes.error || settingsRes.error) return;

  const remoteVotes: VoteMap = {};
  for (const row of votesRes.data ?? []) remoteVotes[row.exercise_id] = row.vote as Vote;
  const localVotes = readJSON<VoteMap>(STORAGE_KEYS.votes, {});
  const votes = mergeVotes(localVotes, remoteVotes);
  writeJSON(STORAGE_KEYS.votes, votes);

  const missing = Object.entries(votes)
    .filter(([id]) => !(id in remoteVotes))
    .map(([exercise_id, vote]) => ({ user_id: userId, exercise_id, vote }));
  if (missing.length > 0) await supabase.from("exercise_votes").upsert(missing);

  const remoteEquipment = (settingsRes.data?.equipment ?? []) as EquipmentId[];
  const localEquipment = readJSON<EquipmentId[]>(STORAGE_KEYS.equipment, []);
  const equipment = mergeEquipment(localEquipment, remoteEquipment);
  writeJSON(STORAGE_KEYS.equipment, equipment);
  if (remoteEquipment.length === 0 && equipment.length > 0) {
    await supabase.from("user_settings").upsert({ user_id: userId, equipment, updated_at: new Date().toISOString() });
  }
}

/** The signed-in user's id from the stored session (a local read, no network). */
async function signedInUserId(): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

/** Save one vote for the signed-in user. `null` clears it. No-op when signed out. */
export async function pushVote(exerciseId: string, vote: Vote | null): Promise<void> {
  const supabase = getSupabase();
  const userId = await signedInUserId();
  if (!supabase || !userId) return;
  if (vote === null) {
    await supabase.from("exercise_votes").delete().eq("exercise_id", exerciseId);
  } else {
    await supabase
      .from("exercise_votes")
      .upsert({ user_id: userId, exercise_id: exerciseId, vote, updated_at: new Date().toISOString() });
  }
}

/** Save the equipment selection for the signed-in user. No-op when signed out. */
export async function pushEquipment(equipment: EquipmentId[]): Promise<void> {
  const supabase = getSupabase();
  const userId = await signedInUserId();
  if (!supabase || !userId) return;
  await supabase
    .from("user_settings")
    .upsert({ user_id: userId, equipment, updated_at: new Date().toISOString() });
}

/** On sign-out, drop the account's data from this device so the next person on it starts clean. */
export function clearLocalAccountData(): void {
  writeJSON(STORAGE_KEYS.votes, {});
  writeJSON(STORAGE_KEYS.equipment, []);
}

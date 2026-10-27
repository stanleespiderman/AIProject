"use client";

/**
 * ─── ACCOUNTS ────────────────────────────────────────────────────
 * Supabase Auth, email sign-in (magic link or 6-digit code). Accounts are
 * optional for training; they are required to buy, because a purchase is
 * stored against the account (public.entitlements) and follows it to any
 * device. Signed-in users also get their workout log synced.
 * ─────────────────────────────────────────────────────────────────
 */

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "./constants";
import { syncAll } from "./db/remote";
import { cacheEntitlement } from "./payments";
import { writeJSON } from "./storage";
import { getSupabase } from "./supabase";

export type AccountState =
  | { status: "loading" }
  | { status: "unconfigured" } // no Supabase env vars: local-only mode
  | { status: "signedOut" }
  | { status: "signedIn"; userId: string; email: string };

const LOADING: AccountState = { status: "loading" };
let state: AccountState = LOADING;
const listeners = new Set<() => void>();

function setState(next: AccountState) {
  state = next;
  listeners.forEach((l) => l());
}

export function getAccount(): AccountState {
  return state;
}

export function useAccount(): AccountState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => LOADING,
  );
}

let started = false;

/** Starts listening to Supabase Auth. Called once from <AccountSync /> in the layout. */
export function initAccount(): void {
  if (started) return;
  started = true;
  const supabase = getSupabase();
  if (!supabase) {
    setState({ status: "unconfigured" });
    return;
  }
  supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
      setState({ status: "signedOut" });
      cacheEntitlement(null); // a purchase only counts while signed in to its account
      return;
    }
    const prev = state;
    setState({ status: "signedIn", userId: session.user.id, email: session.user.email ?? "" });
    const newUser = prev.status !== "signedIn" || prev.userId !== session.user.id;
    if (newUser || event === "SIGNED_IN") {
      // Supabase advises against awaiting its own calls inside this callback.
      setTimeout(() => {
        void refreshEntitlement();
        void syncAll();
      }, 0);
    }
  });
}

/** Re-reads the account's purchase from Supabase into the local Pro cache. */
export async function refreshEntitlement(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || state.status !== "signedIn") return;
  const { data, error } = await supabase
    .from("entitlements")
    .select("plan, granted_at")
    .eq("user_id", state.userId)
    .maybeSingle();
  if (error) return; // offline: keep whatever is cached
  cacheEntitlement(data ? { plan: data.plan, since: data.granted_at } : null);
}

/** Only same-site paths, so ?next= can't send people to another website. */
export function safeNext(next: string | null, fallback = "/"): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

function redirectUrl(next: string): string {
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

/** Emails a sign-in link (and a 6-digit code, if the email template includes {{ .Token }}). */
export async function sendSignInEmail(email: string, next: string): Promise<{ error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { error: "Accounts aren't set up yet." };
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl(next), shouldCreateUser: true },
  });
  return error ? { error: error.message } : {};
}

export async function verifySignInCode(email: string, code: string): Promise<{ error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { error: "Accounts aren't set up yet." };
  const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
  return error ? { error: error.message } : {};
}

/**
 * Uploads anything not yet synced, signs out, and clears this device's
 * purchase cache and workout log (they stay safe in the account).
 */
export async function signOut(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await syncAll();
  await supabase.auth.signOut();
  cacheEntitlement(null);
  writeJSON(STORAGE_KEYS.db, null);
}

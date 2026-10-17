"use client";

import type { User } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";
import { clearLocalAccountData, pullAndMerge } from "./sync";
import { cloudEnabled, getSupabase } from "./supabase/client";

/**
 * Who is signed in. One shared store so every component sees the same user.
 * Supabase keeps the session in localStorage and refreshes it for us.
 */
export interface AuthState {
  /** "loading" until Supabase has read the stored session. */
  status: "loading" | "in" | "out";
  user: User | null;
}

const SERVER_STATE: AuthState = { status: "loading", user: null };
let state: AuthState = cloudEnabled ? SERVER_STATE : { status: "out", user: null };
const listeners = new Set<() => void>();
let started = false;
/** Pull the account's data once per page load per user. SIGNED_IN also fires when a tab regains focus, and a late pull could overwrite a vote made seconds ago. */
let pulledFor: string | null = null;

function set(next: AuthState) {
  state = next;
  listeners.forEach((l) => l());
}

function start() {
  if (started) return;
  started = true;
  const supabase = getSupabase();
  if (!supabase) return;

  supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ?? null;
    set({ status: user ? "in" : "out", user });
    // Defer: Supabase asks us not to call its API from inside this callback.
    if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && user && pulledFor !== user.id) {
      pulledFor = user.id;
      setTimeout(() => void pullAndMerge(user.id), 0);
    }
    if (event === "SIGNED_OUT") {
      pulledFor = null;
      clearLocalAccountData();
    }
  });
}

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useAuth(): AuthState {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}

"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client, or null when the env vars aren't set (the app
 * then runs fully local, with no accounts). Uses the public anon key only:
 * row level security in supabase/migrations decides what each user can touch.
 *
 * Env vars (the Vercel Supabase integration sets these for you):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY  (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(url && key);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured || typeof window === "undefined") return null;
  client ??= createClient(url!, key!, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      // Finishes the email-link sign-in on /auth/callback (?code=...).
      detectSessionInUrl: true,
      storageKey: "whatnext:auth",
    },
  });
  return client;
}

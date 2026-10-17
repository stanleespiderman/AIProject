import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * False when the Supabase env vars are missing (local dev without a project).
 * The app then runs exactly as before: everything stays in localStorage.
 */
export const cloudEnabled = Boolean(url && key);

let client: SupabaseClient | null = null;

/** The browser Supabase client, or null when accounts aren't configured. Call from the browser only. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  client ??= createClient(url, key);
  return client;
}

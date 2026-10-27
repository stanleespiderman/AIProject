"use client";

/**
 * Everything money-related lives in this folder.
 * - Prices and the plan are defined here (display only: Dodo Payments charges what the product says).
 * - Who has paid is decided on the server: the Dodo webhook writes the `entitlements`
 *   table, and the browser can only read its own row. There is no editable local flag.
 * - Free workouts are counted in the database (see ./usage.ts).
 */

import { getSupabase } from "../supabase/client";

export interface Plan {
  id: "lifetime";
  name: string;
  /** Price in whole rupees, for display. The charge itself comes from the Dodo product. */
  priceInr: number;
  blurb: string;
}

export const PLAN: Plan = { id: "lifetime", name: "Lifetime", priceInr: 399, blurb: "Pay once, use it forever" };

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export type CheckoutResult = { status: "redirecting" } | { status: "unavailable"; message: string };

/** Asks the server for a Dodo checkout link for the signed-in user, then goes there. */
export async function startCheckout(): Promise<CheckoutResult> {
  const supabase = getSupabase();
  const { data } = (await supabase?.auth.getSession()) ?? { data: { session: null } };
  const token = data.session?.access_token;
  if (!token) return { status: "unavailable", message: "Sign in first to unlock NextSet." };
  try {
    const res = await fetch("/api/checkout", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    const body = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (res.ok && body.url) {
      window.location.assign(body.url);
      return { status: "redirecting" };
    }
    return { status: "unavailable", message: body.error ?? "Couldn't start checkout. Try again." };
  } catch {
    return { status: "unavailable", message: "Couldn't reach the server. Try again." };
  }
}

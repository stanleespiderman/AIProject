"use client";

/**
 * ─── PAYMENTS STUB ───────────────────────────────────────────────
 * Everything money-related lives in this folder. The UI only calls:
 *   PLANS, startCheckout(), isPro(), useIsPro()
 * and the free-session quota in ./usage.ts.
 *
 * Purchases belong to an account: the server writes them to the Supabase
 * `entitlements` table after verifying the payment, and src/lib/account.ts
 * copies the signed-in user's row into a local cache (cacheEntitlement).
 *
 * Checkout is Dodo Payments: startCheckout() asks our server route
 * (src/app/api/checkout) for a hosted checkout URL and redirects there. The
 * Dodo webhook (src/app/api/webhooks/dodo) grants the purchase.
 * ─────────────────────────────────────────────────────────────────
 */

import { STORAGE_KEYS } from "../constants";
import { readJSON, useStoredState, writeJSON } from "../storage";
import { getSupabase } from "../supabase";

export type PlanId = "full";

export interface Plan {
  id: PlanId;
  name: string;
  /** Display price in whole rupees. The amount actually charged is set on the Dodo product. */
  priceInr: number;
  billing: "one-time";
  blurb: string;
}

export const PLANS: Plan[] = [
  { id: "full", name: "Full access", priceInr: 399, billing: "one-time", blurb: "Pay once. Unlimited sessions, forever" },
];

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export type CheckoutResult =
  | { status: "redirecting" } // on the way to Dodo's checkout page
  | { status: "signin" }
  | { status: "owned" } // this account has already paid
  | { status: "error"; message: string };

/** Sends the signed-in user to Dodo Payments' hosted checkout. */
export async function startCheckout(planId: PlanId): Promise<CheckoutResult> {
  const supabase = getSupabase();
  if (!supabase) return { status: "error", message: "Payments aren't live yet. Check back soon." };
  const { data } = await supabase.auth.getSession();
  if (!data.session) return { status: "signin" };

  let res: Response;
  try {
    res = await fetch("/api/checkout", {
      method: "POST",
      headers: { Authorization: `Bearer ${data.session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planId }),
    });
  } catch {
    return { status: "error", message: "Couldn't reach the server. Check your connection and try again." };
  }
  const body = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (res.status === 401) return { status: "signin" };
  if (res.status === 409) return { status: "owned" };
  if (!res.ok || !body.url) return { status: "error", message: body.error ?? "Something went wrong. Try again." };

  window.location.assign(body.url);
  return { status: "redirecting" };
}

export interface ProState {
  plan: string;
  since: string;
}

/**
 * Local copy of the signed-in account's entitlement, so the app knows the
 * user has paid while offline. Written only by src/lib/account.ts from the
 * server; null when signed out or not paid.
 */
export function cacheEntitlement(state: ProState | null): void {
  writeJSON<ProState | null>(STORAGE_KEYS.pro, state);
}

export function isPro(): boolean {
  return readJSON<ProState | null>(STORAGE_KEYS.pro, null) !== null;
}

export function useIsPro(): boolean {
  const [pro] = useStoredState<ProState | null>(STORAGE_KEYS.pro, null);
  return pro !== null;
}

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
 * To go live with Razorpay, replace the body of `startCheckout`
 * (see README > "Payments"). No component needs to change.
 * ─────────────────────────────────────────────────────────────────
 */

import { STORAGE_KEYS } from "../constants";
import { readJSON, useStoredState, writeJSON } from "../storage";

export type PlanId = "full";

export interface Plan {
  id: PlanId;
  name: string;
  /** Price in whole rupees. Razorpay expects paise (× 100) and Stripe the smallest unit too. */
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
  | { status: "success" }
  | { status: "cancelled" }
  | { status: "unavailable"; message: string };

/**
 * STUB: no real payment happens. The caller makes sure the user is signed in.
 * Razorpay: create an order on a server route, open `new Razorpay({...}).open()`,
 * verify the signature server-side, insert into `entitlements` with the
 * service role key, then call `refreshEntitlement()` from src/lib/account.ts.
 */
export async function startCheckout(planId: PlanId): Promise<CheckoutResult> {
  void planId;
  return {
    status: "unavailable",
    message: "Payments aren't live yet. Check back soon.",
  };
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

"use client";

/**
 * ─── PAYMENTS STUB ───────────────────────────────────────────────
 * Everything money-related lives in this folder. The UI only calls:
 *   PLANS, startCheckout(), isPro(), useIsPro()
 * and the free-session quota in ./usage.ts.
 *
 * To go live with Razorpay or Stripe, replace the body of `startCheckout`
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
 * STUB: no real payment happens. Replace with your provider's checkout:
 *  - Razorpay: create an order on a server route, open `new Razorpay({...}).open()`,
 *    verify the signature server-side, then call `grantPro()`.
 *  - Stripe: create a Checkout Session on a server route and redirect to it;
 *    grant Pro from the success page / webhook.
 */
export async function startCheckout(planId: PlanId): Promise<CheckoutResult> {
  void planId;
  return {
    status: "unavailable",
    message: "Payments aren't live yet. Check back soon.",
  };
}

interface ProState {
  /** Older installs may hold "lifetime" or "monthly" from the previous plans; they stay Pro. */
  plan: PlanId | (string & {});
  since: string;
}

/** Call this only after the provider confirms payment. */
export function grantPro(plan: PlanId): void {
  writeJSON<ProState>(STORAGE_KEYS.pro, { plan, since: new Date().toISOString() });
}

export function isPro(): boolean {
  return readJSON<ProState | null>(STORAGE_KEYS.pro, null) !== null;
}

export function useIsPro(): boolean {
  const [pro] = useStoredState<ProState | null>(STORAGE_KEYS.pro, null);
  return pro !== null;
}

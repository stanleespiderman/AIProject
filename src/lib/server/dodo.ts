import DodoPayments from "dodopayments";

/**
 * Server-only Dodo Payments client. DODO_PAYMENTS_ENVIRONMENT picks "test_mode" (default) or
 * "live_mode". DODO_PAYMENTS_BASE_URL (optional, e.g. a proxy or local mock) overrides it; the
 * SDK refuses to be given both, so the environment is only passed when no base URL is set.
 */
export function dodoClient(bearerToken: string): DodoPayments {
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode";
  return new DodoPayments({ bearerToken, ...(process.env.DODO_PAYMENTS_BASE_URL ? {} : { environment }) });
}

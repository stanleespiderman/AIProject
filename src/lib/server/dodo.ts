import "server-only";
import DodoPayments from "dodopayments";

/**
 * Dodo Payments, server side. Env vars (see .env.example):
 *   DODO_PAYMENTS_API_KEY         Dodo dashboard → Developer → API keys
 *   DODO_PAYMENTS_WEBHOOK_KEY     Dodo dashboard → Developer → Webhooks (signing secret)
 *   DODO_PAYMENTS_PRODUCT_ID      the ₹399 one-time "Full access" product (pdt_...)
 *   DODO_PAYMENTS_ENVIRONMENT     test_mode (default) or live_mode
 */
let client: DodoPayments | null = null;

export function dodo(): DodoPayments | null {
  const bearerToken = process.env.DODO_PAYMENTS_API_KEY;
  if (!bearerToken) return null;
  client ??= new DodoPayments({
    bearerToken,
    webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY ?? null,
    // The SDK rejects `environment` together with DODO_PAYMENTS_BASE_URL (used for mocks/proxies).
    ...(process.env.DODO_PAYMENTS_BASE_URL
      ? {}
      : { environment: process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode" }),
  });
  return client;
}

export function fullAccessProductId(): string | null {
  return process.env.DODO_PAYMENTS_PRODUCT_ID ?? null;
}

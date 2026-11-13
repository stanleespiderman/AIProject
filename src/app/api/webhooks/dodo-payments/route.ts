import DodoPayments from "dodopayments";
import { Webhooks } from "@dodopayments/nextjs";
import type { NextRequest } from "next/server";
import { getAdminClient } from "@/lib/server/supabase-admin";
import { paymentState } from "@/lib/server/payment-state";

export async function POST(request: NextRequest) {
  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const productId = process.env.DODO_PRODUCT_ID;
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const admin = getAdminClient();
  if (!webhookKey || !productId || !apiKey || !admin) {
    return Response.json({ error: "Webhook isn't set up." }, { status: 503 });
  }
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode";
  const client = new DodoPayments({ bearerToken: apiKey, environment });
  const handler = Webhooks({
    webhookKey,
    onPayload: async payload => {
      if (payload.type !== "payment.succeeded" && payload.type !== "refund.succeeded") return;
      // Signature verified by adapter before callback. Re-fetch current provider state:
      // retries/out-of-order event snapshots must not restore refunded access.
      const payment = await client.payments.retrieve(payload.data.payment_id);
      const state = paymentState(payment, productId);
      if (!state) return;
      const { error } = await admin.rpc("apply_dodo_payment", {
        p_event: request.headers.get("webhook-id"), p_payment: payment.payment_id,
        p_user: state.userId, p_eligible: state.eligible, p_revoked: state.revoked,
      });
      // Fail for retry on provider/database errors. Never acknowledge an uncommitted grant.
      if (error) throw new Error("Could not reconcile payment access");
    },
  });
  return handler(request);
}

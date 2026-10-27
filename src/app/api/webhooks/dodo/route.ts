import type DodoPayments from "dodopayments";
import { dodo, fullAccessProductId } from "@/lib/server/dodo";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

type Payment = DodoPayments.Payment;

/**
 * Dodo Payments webhook: the ONLY place a purchase is granted. Add this URL
 * in Dodo → Developer → Webhooks: https://<your-domain>/api/webhooks/dodo
 *
 * - payment.succeeded → insert public.entitlements for metadata.user_id
 * - refund.succeeded (full) / dispute.lost → remove it
 *
 * Returns 2xx once handled (or deliberately ignored); 5xx makes Dodo retry.
 */
export async function POST(request: Request) {
  const client = dodo();
  const admin = supabaseAdmin();
  if (!client || !admin || !process.env.DODO_PAYMENTS_WEBHOOK_KEY) {
    return new Response("Payments not configured", { status: 503 });
  }

  const body = await request.text();
  let event: DodoPayments.UnwrapWebhookEvent;
  try {
    // Verifies the webhook-id / webhook-timestamp / webhook-signature headers.
    event = client.webhooks.unwrap(body, { headers: Object.fromEntries(request.headers) });
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    switch (event.type) {
      case "payment.succeeded":
        await grant(admin, event.data);
        break;
      case "refund.succeeded":
        if (!event.data.is_partial) await revoke(admin, event.data.payment_id);
        break;
      case "dispute.lost":
        await revoke(admin, event.data.payment_id);
        break;
    }
  } catch (err) {
    console.error(`[dodo webhook] ${event.type} failed`, err);
    return new Response("Handler failed", { status: 500 });
  }
  return new Response("ok");
}

async function grant(admin: NonNullable<ReturnType<typeof supabaseAdmin>>, payment: Payment) {
  const userId = payment.metadata?.user_id;
  const isFullAccess = payment.product_cart?.some((item) => item.product_id === fullAccessProductId());
  if (typeof userId !== "string" || !isFullAccess) {
    console.warn("[dodo webhook] ignoring payment without our user/product", payment.payment_id);
    return;
  }
  // Idempotent: Dodo may deliver the same event more than once.
  const { error } = await admin.from("entitlements").upsert(
    {
      user_id: userId,
      plan: "full",
      amount_minor: payment.total_amount,
      currency: payment.currency,
      provider: "dodo",
      payment_id: payment.payment_id,
    },
    { onConflict: "user_id", ignoreDuplicates: true },
  );
  if (error) throw error;
}

async function revoke(admin: NonNullable<ReturnType<typeof supabaseAdmin>>, paymentId: string) {
  const { error } = await admin.from("entitlements").delete().eq("payment_id", paymentId);
  if (error) throw error;
}

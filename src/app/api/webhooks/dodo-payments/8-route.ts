import { Webhooks } from "@dodopayments/nextjs";
import type { NextRequest } from "next/server";
import { getAdminClient } from "@/lib/server/supabase-admin";

/**
 * Receives Dodo Payments events. The adapter verifies the signature with
 * DODO_PAYMENTS_WEBHOOK_KEY, so unsigned requests never reach our code.
 * Access is granted only for a succeeded payment of OUR product, for a user id
 * we put in the checkout metadata, and revoked if that payment is refunded.
 */
export async function POST(request: NextRequest) {
  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const productId = process.env.DODO_PRODUCT_ID;
  const admin = getAdminClient();
  if (!webhookKey || !productId || !admin) {
    return Response.json({ error: "Webhook isn't set up." }, { status: 503 });
  }

  const handler = Webhooks({
    webhookKey,
    onPayload: async (payload) => {
      if (payload.type === "payment.succeeded") {
        const data = payload.data;
        const userId = data.metadata?.user_id;
        const boughtOurProduct = data.product_cart?.some((item: { product_id: string }) => item.product_id === productId);
        if (!userId || !boughtOurProduct) return;
        const { error } = await admin
          .from("entitlements")
          .upsert({ user_id: userId, plan: "lifetime", dodo_payment_id: data.payment_id }, { onConflict: "user_id" });
        // A thrown error makes Dodo retry the webhook.
        if (error) throw new Error("Could not save access");
      } else if (payload.type === "refund.succeeded") {
        const { error } = await admin.from("entitlements").delete().eq("dodo_payment_id", payload.data.payment_id);
        if (error) throw new Error("Could not revoke access");
      }
    },
  });
  return handler(request);
}

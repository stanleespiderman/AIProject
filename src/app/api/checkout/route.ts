import { dodo, fullAccessProductId } from "@/lib/server/dodo";
import { supabaseAdmin, userFromRequest } from "@/lib/server/supabaseAdmin";

/**
 * Starts a Dodo Payments checkout for the signed-in user and returns its URL.
 * The Supabase user id goes into the payment's metadata; the webhook
 * (api/webhooks/dodo) reads it back to grant access to that account.
 */
export async function POST(request: Request) {
  const client = dodo();
  const productId = fullAccessProductId();
  const admin = supabaseAdmin();
  if (!client || !productId || !admin) {
    return Response.json({ error: "Payments aren't live yet. Check back soon." }, { status: 503 });
  }

  const user = await userFromRequest(request);
  if (!user?.email) {
    return Response.json({ error: "Sign in to buy." }, { status: 401 });
  }

  const { data: owned, error } = await admin
    .from("entitlements")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    console.error("[checkout] entitlement lookup failed", error);
    return Response.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
  if (owned) return Response.json({ error: "You already have full access." }, { status: 409 });

  try {
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email: user.email },
      metadata: { user_id: user.id },
      return_url: `${new URL(request.url).origin}/unlock/success`,
      customization: { theme: "dark" },
    });
    if (!session.checkout_url) throw new Error(`No checkout_url for session ${session.session_id}`);
    return Response.json({ url: session.checkout_url });
  } catch (err) {
    console.error("[checkout] Dodo checkout session failed", err);
    return Response.json({ error: "Couldn't start the payment. Try again." }, { status: 502 });
  }
}

import DodoPayments from "dodopayments";
import { getAdminClient } from "@/lib/server/supabase-admin";

/**
 * Starts a Dodo Payments checkout for the signed-in, email-confirmed user.
 * The user id comes from the verified Supabase token and travels in the checkout
 * metadata; the webhook uses it to grant access after Dodo confirms payment.
 *
 * Env: DODO_PAYMENTS_API_KEY, DODO_PRODUCT_ID, DODO_PAYMENTS_RETURN_URL,
 * DODO_PAYMENTS_ENVIRONMENT ("test_mode" by default, "live_mode" to take real payments).
 */
export async function POST(request: Request) {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const productId = process.env.DODO_PRODUCT_ID;
  const returnUrl = process.env.DODO_PAYMENTS_RETURN_URL;
  const admin = getAdminClient();
  if (!apiKey || !productId || !returnUrl || !admin) {
    return Response.json({ error: "Payments aren't set up yet." }, { status: 503 });
  }

  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) return Response.json({ error: "Sign in first." }, { status: 401 });
  const { data, error } = await admin.auth.getUser(token);
  const user = data?.user;
  if (error || !user || !user.email) return Response.json({ error: "Sign in first." }, { status: 401 });
  if (!user.email_confirmed_at) {
    return Response.json({ error: "Confirm your email first." }, { status: 403 });
  }

  const { data: existing } = await admin.from("entitlements").select("user_id").eq("user_id", user.id).maybeSingle();
  if (existing) return Response.json({ error: "You already have NextSet." }, { status: 409 });

  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode";
  const client = new DodoPayments({ bearerToken: apiKey, environment });
  try {
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email: user.email },
      metadata: { user_id: user.id },
      return_url: returnUrl,
    });
    if (!session.checkout_url) return Response.json({ error: "Couldn't start checkout." }, { status: 502 });
    return Response.json({ url: session.checkout_url });
  } catch {
    return Response.json({ error: "Couldn't start checkout." }, { status: 502 });
  }
}

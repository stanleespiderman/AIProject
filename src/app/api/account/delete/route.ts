import { createClient } from "@supabase/supabase-js";

/**
 * Permanently deletes the signed-in user's account and everything stored for it.
 *
 * The browser can't do this itself (deleting an auth user needs the service role key),
 * so it sends its session token here. We check the token belongs to a real user, then
 * delete that user. profiles, user_settings and exercise_votes go with it through
 * `on delete cascade` (see supabase/migrations).
 *
 * Needs SUPABASE_SERVICE_ROLE_KEY, a server-only variable. Never prefix it with NEXT_PUBLIC_.
 */
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return Response.json({ error: "Account deletion isn't set up on this server." }, { status: 503 });
  }

  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) return Response.json({ error: "Not signed in." }, { status: 401 });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

  // The id comes from the verified token, never from the request body.
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return Response.json({ error: "Not signed in." }, { status: 401 });

  const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
  if (deleteError) return Response.json({ error: "Couldn't delete the account. Try again." }, { status: 500 });

  return Response.json({ ok: true });
}

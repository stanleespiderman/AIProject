import { createClient } from "@supabase/supabase-js";
import { FEEDBACK_LIMITS, isFeedbackKind } from "@/lib/feedback";

/**
 * Stores one piece of feedback in the `feedback` table (supabase/migrations/20261029000000_feedback.sql).
 *
 * Anyone can send feedback, signed in or not. The table is only writable with the service role
 * key, so everything is validated here. If a session token is sent, the user id comes from the
 * verified token, never from the request body.
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only, never NEXT_PUBLIC_).
 */
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return Response.json({ error: "Feedback isn't set up on this server yet." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object") throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "That didn't look like feedback." }, { status: 400 });
  }

  // Honeypot: a field people never see. Bots fill it; pretend it worked.
  if (typeof body.website === "string" && body.website !== "") return Response.json({ ok: true });

  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const kind = body.kind;
  const message = text(body.message);
  const email = text(body.email);
  const exerciseId = text(body.exerciseId);
  const page = text(body.page);

  if (!isFeedbackKind(kind)) return Response.json({ error: "Pick what your feedback is about." }, { status: 400 });
  if (message.length < FEEDBACK_LIMITS.messageMin || message.length > FEEDBACK_LIMITS.messageMax) {
    return Response.json(
      { error: `Write between ${FEEDBACK_LIMITS.messageMin} and ${FEEDBACK_LIMITS.messageMax} characters.` },
      { status: 400 },
    );
  }
  if (email && (email.length > FEEDBACK_LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return Response.json({ error: "That email doesn't look right. Leave it empty if you don't need a reply." }, { status: 400 });
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

  let userId: string | null = null;
  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/i)?.[1];
  if (token) {
    const { data } = await admin.auth.getUser(token);
    userId = data.user?.id ?? null;
  }

  const { error } = await admin.from("feedback").insert({
    kind,
    message,
    email: email || null,
    exercise_id: exerciseId ? exerciseId.slice(0, FEEDBACK_LIMITS.exerciseId) : null,
    page: page ? page.slice(0, FEEDBACK_LIMITS.page) : null,
    user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
    user_id: userId,
  });
  if (error) return Response.json({ error: "Couldn't send that. Try again in a minute." }, { status: 500 });

  return Response.json({ ok: true });
}

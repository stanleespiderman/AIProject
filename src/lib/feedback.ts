/** Shared by the feedback form and /api/feedback. Kinds match the check in supabase/migrations. */
export const FEEDBACK_KINDS = [
  { id: "exercise", label: "Exercise info is wrong", hint: "Wrong form cues, steps, picture, muscles or sets × reps" },
  { id: "bug", label: "Something's broken", hint: "A button doesn't work, a page looks off, it crashed" },
  { id: "idea", label: "Idea", hint: "An exercise to add, a feature you'd use" },
  { id: "other", label: "Something else", hint: "" },
] as const;

export type FeedbackKind = (typeof FEEDBACK_KINDS)[number]["id"];

export const FEEDBACK_LIMITS = { messageMin: 3, messageMax: 2000, email: 254, page: 300, exerciseId: 80 } as const;

export function isFeedbackKind(value: unknown): value is FeedbackKind {
  return FEEDBACK_KINDS.some((k) => k.id === value);
}

/** Link to the feedback form. `from` is where the sender was, so we know what they were looking at. */
export function feedbackHref({ kind, exercise, from }: { kind?: FeedbackKind; exercise?: string; from?: string } = {}) {
  const params = new URLSearchParams();
  if (kind) params.set("kind", kind);
  if (exercise) params.set("ex", exercise);
  if (from) params.set("from", from);
  const query = params.toString();
  return query ? `/feedback?${query}` : "/feedback";
}

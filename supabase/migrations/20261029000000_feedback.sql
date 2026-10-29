-- Feedback from the app: wrong exercise info, bugs, ideas. Run once in the Supabase SQL editor
-- (or `supabase db push`), after 20261017000000_init.sql.
--
-- Written only by the server (src/app/api/feedback/route.ts, with the service role key), so
-- row level security is on with no policies: the anon key in the browser can't read or write it.
-- Read it in the Supabase dashboard: Table Editor > feedback.

create table public.feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  -- kinds from src/lib/feedback.ts FEEDBACK_KINDS
  kind text not null check (kind in ('exercise', 'bug', 'idea', 'other')),
  exercise_id text check (char_length(exercise_id) between 1 and 80),
  message text not null check (char_length(message) between 3 and 2000),
  -- only when the sender wants a reply
  email text check (char_length(email) <= 254),
  -- where the sender was in the app, e.g. /results?eq=dumbbells&m=legs
  page text check (char_length(page) <= 300),
  user_agent text check (char_length(user_agent) <= 300),
  -- set when the sender was signed in; their feedback goes when their account does
  user_id uuid references auth.users (id) on delete cascade,
  -- for triage: new -> seen -> done
  status text not null default 'new' check (status in ('new', 'seen', 'done'))
);

create index feedback_created_at_idx on public.feedback (created_at desc);

alter table public.feedback enable row level security;

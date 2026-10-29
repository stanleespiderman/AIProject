# Accounts and cloud storage (Supabase) — setup

The app works without any of this: with no Supabase variables set, it stays on `localStorage` and hides the "Sign in" button. Follow these steps once to turn accounts on.

## 1. Create the Supabase project
1. supabase.com > New project (pick the region nearest your users). Save the database password somewhere safe.
2. **SQL Editor** > New query > paste all of `supabase/migrations/20261017000000_init.sql` > Run.
   It creates `profiles`, `user_settings` and `exercise_votes`, locks each to its owner with row level security, and adds a trigger that creates a profile on sign-up.
   Then run `supabase/migrations/20261029000000_feedback.sql` the same way. It creates the `feedback` table (see "Feedback" below).
3. **Project Settings > API**: copy the **Project URL** and the **anon / publishable key**.

## 2. Configure sign-in (Authentication > URL Configuration)
- **Site URL**: your production URL, e.g. `https://yourdomain.com`.
- **Redirect URLs**: add `https://<your-domain>/account` and `https://<your-domain>/account/reset`. Add `http://localhost:3000/**` for local dev, and your Vercel preview pattern (e.g. `https://*-<team>.vercel.app/**`) if you want sign-in on previews.
- **Authentication > Providers > Email**: decide whether "Confirm email" is on.
  - On (recommended): the app shows "Check your email" after sign-up. Supabase's built-in mailer is limited to a few emails per hour, so before real traffic set up your own SMTP (Authentication > SMTP Settings: Resend, Postmark, SES...).
  - Off: users are signed in straight after sign-up. Easier for launch day, but anyone can sign up with an email they don't own.

## 3. Add the variables to Vercel
Project > Settings > Environment Variables (Production and Preview), then redeploy:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | the Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the anon / publishable key |

| `SUPABASE_SERVICE_ROLE_KEY` | the `service_role` / secret key. **Server only**, used by the delete-account and feedback routes. Mark it Sensitive in Vercel and do not tick "Expose to browser". |

The first two are meant to be public. The database is protected by the row level security policies, not by hiding the key. **Never** put the `service_role` key in a `NEXT_PUBLIC_` variable.
For local dev copy `.env.example` to `.env.local`. Without `SUPABASE_SERVICE_ROLE_KEY` everything else works, but the delete button and the feedback form report that they aren't set up.

## 4. Check it
Create an account, vote on an exercise, open the app in a private window, sign in, and confirm the vote and equipment come back. In Supabase > Table Editor you should see the rows.

## Deleting an account
Account page > Delete account > confirm. The browser sends its session token to `POST /api/account/delete` (`src/app/api/account/delete/route.ts`). The server checks the token with the service role key, deletes that user, and the database cascades the delete to `profiles`, `user_settings` and `exercise_votes`. The user id always comes from the verified token, never from the request. Deleting also signs the browser out.

## Feedback
Anyone (signed in or not) can send feedback from the footer ("Send feedback") or from an open exercise ("Something wrong with this exercise?", which fills in the exercise). The form is `/feedback` (`src/app/feedback/`) and posts to `POST /api/feedback` (`src/app/api/feedback/route.ts`), which validates it and inserts it with the service role key. The `feedback` table has row level security on and no policies, so the browser can't read or write it directly. Bots are filtered with a hidden honeypot field; there is no rate limit yet.

Each row holds: kind (`exercise`, `bug`, `idea`, `other`), the message, the exercise id (when reported from an exercise), an optional email for a reply, the page the sender was on, their browser, and their user id if signed in. Read it in Supabase > Table Editor > `feedback` (newest first), and use `status` (`new` / `seen` / `done`) to triage.

The feedback links are hidden until the two public Supabase variables are set.

## What is stored
| Table | Holds |
| --- | --- |
| `auth.users` (Supabase) | email, hashed password |
| `profiles` | first name (optional) |
| `user_settings` | saved equipment |
| `exercise_votes` | 👍/👎 per exercise id |
| `feedback` | feedback messages, optional reply email (deleted with the account if sent while signed in) |

The exercise library itself stays in the code (`src/data`), versioned and checked at build time. It is not in the database.

## How sync works
`localStorage` is still what the screens read, so everything is instant and works offline. Signed in, each vote and equipment change is also written to Supabase. On sign-in (once per page load) the account's data is merged in: the account wins on conflicts and anything only on this device is uploaded. Signing out clears the picks from the device.
Code: `src/lib/auth.ts`, `src/lib/sync.ts`, `src/lib/supabase/client.ts`.

## Not built yet
- A privacy policy and terms page (you now store emails).
- Google or Apple sign-in (configure the provider in Supabase, then add a button calling `supabase.auth.signInWithOAuth`).
- Workout logs and learn-mode progress. Add them as new tables with the same row level security pattern.

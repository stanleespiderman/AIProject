-- Durable event deduplication and terminal full-refund tombstones.
create table public.dodo_payment_ledger (
  payment_id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  eligible boolean not null default false,
  revoked boolean not null default false
);
create table public.dodo_webhook_events (event_id text primary key, received_at timestamptz not null default now());
alter table public.dodo_payment_ledger enable row level security;
alter table public.dodo_webhook_events enable row level security;
revoke all on public.dodo_payment_ledger, public.dodo_webhook_events from anon, authenticated;
-- Backfill existing legitimate entitlements, without deleting or changing their owners.
insert into public.dodo_payment_ledger(payment_id,user_id,eligible)
select dodo_payment_id,user_id,true from public.entitlements on conflict do nothing;
create function public.apply_dodo_payment(p_event text,p_payment text,p_user uuid,p_eligible boolean,p_revoked boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare chosen text;
begin
  if p_event is null or p_event = '' or p_payment is null or p_payment = '' then raise exception 'Missing identifiers'; end if;
  -- Serialize all payments for an owner; two purchases/refunds cannot race the entitlement.
  perform pg_advisory_xact_lock(hashtextextended(p_user::text,0));
  if exists(select 1 from public.dodo_webhook_events where event_id=p_event) then return; end if;
  if exists(select 1 from public.dodo_payment_ledger where payment_id=p_payment and user_id<>p_user) then raise exception 'Payment owner mismatch'; end if;
  insert into public.dodo_payment_ledger as old(payment_id,user_id,eligible,revoked)
  values(p_payment,p_user,p_eligible and not p_revoked,p_revoked)
  on conflict(payment_id) do update set
    revoked=old.revoked or excluded.revoked,
    eligible=(old.eligible or excluded.eligible) and not(old.revoked or excluded.revoked);
  select payment_id into chosen from public.dodo_payment_ledger where user_id=p_user and eligible and not revoked order by payment_id limit 1;
  if chosen is null then
    delete from public.entitlements where user_id=p_user;
  else
    insert into public.entitlements(user_id,plan,dodo_payment_id) values(p_user,'lifetime',chosen)
    on conflict(user_id) do update set dodo_payment_id=excluded.dodo_payment_id;
  end if;
  insert into public.dodo_webhook_events(event_id) values(p_event);
end;
$$;
revoke all on function public.apply_dodo_payment(text,text,uuid,boolean,boolean) from public,anon,authenticated;
grant execute on function public.apply_dodo_payment(text,text,uuid,boolean,boolean) to service_role;

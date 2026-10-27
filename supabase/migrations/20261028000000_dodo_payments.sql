-- Dodo Payments charges in the customer's currency when adaptive pricing is on,
-- so store the amount in the smallest unit of whatever currency was charged.
alter table public.entitlements rename column amount_paise to amount_minor;
alter table public.entitlements add column currency text not null default 'INR';
comment on column public.entitlements.amount_minor is 'Amount paid in the smallest unit of `currency` (39900 = ₹399).';
comment on column public.entitlements.provider is 'Payment provider, e.g. dodo';

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
test('PostgreSQL ledger: duplicate, ordering, terminal refund, separate purchases and roles', async()=>{
 const db=new PGlite();
 try {
 await db.exec(`create role anon; create role authenticated; create role service_role; create schema auth; create table auth.users(id uuid primary key); create table public.entitlements(user_id uuid primary key references auth.users(id) on delete cascade,plan text not null default 'lifetime',dodo_payment_id text unique);`);
 await db.exec(await readFile(new URL('../supabase/migrations/20261027010000_payment_ledger.sql',import.meta.url),'utf8'));
 const uid='11111111-1111-4111-8111-111111111111';
 await db.query('insert into auth.users values($1)',[uid]);
 const apply=(event,payment,eligible,revoked)=>db.query('select public.apply_dodo_payment($1,$2,$3,$4,$5)',[event,payment,uid,eligible,revoked]);
 const count=async()=>Number((await db.query('select count(*) as n from public.entitlements')).rows[0].n);
 await apply('e1','p1',true,false);assert.equal(await count(),1);
 await apply('e1','p1',true,false);assert.equal(await count(),1);
 assert.equal(Number((await db.query('select count(*) as n from public.dodo_webhook_events')).rows[0].n),1);
 await apply('e2','p1',false,true);assert.equal(await count(),0);
 await apply('e3','p1',true,false);assert.equal(await count(),0,'late success cannot regrant');
 await apply('e4','p2',false,true);await apply('e5','p2',true,false);assert.equal(await count(),0,'refund before success cannot regrant');
 await apply('e6','p3',true,false);assert.equal(await count(),1);
 await apply('e7','p1',false,true);assert.equal(await count(),1,'old refunded purchase cannot revoke new purchase');
 await apply('e8','p4',true,false);await apply('e9','p3',false,true);assert.equal(await count(),1,'other valid purchase retains access');
 await apply('e10','p4',false,true);assert.equal(await count(),0);
 const roles=(await db.query(`select has_function_privilege('anon','public.apply_dodo_payment(text,text,uuid,boolean,boolean)','execute') as anon,has_function_privilege('authenticated','public.apply_dodo_payment(text,text,uuid,boolean,boolean)','execute') as client,has_function_privilege('service_role','public.apply_dodo_payment(text,text,uuid,boolean,boolean)','execute') as server`)).rows[0];
 assert.deepEqual(roles,{anon:false,client:false,server:true});
 const rls=(await db.query(`select bool_and(relrowsecurity) as enabled from pg_class where relname in ('dodo_payment_ledger','dodo_webhook_events')`)).rows[0];assert.equal(rls.enabled,true);
 } finally { await db.close(); }
});

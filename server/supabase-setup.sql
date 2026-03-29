-- ═══════════════════════════════════════════════════════
-- VERBAL CURRENCY — Database Setup
-- ═══════════════════════════════════════════════════════
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════

-- 1. Applications table
create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  experience text,
  message text,
  source text default 'website',
  status text default 'new',        -- new / accepted / rejected
  payment_status text default 'pending', -- pending / paid / refunded
  payment_id text,
  amount numeric,
  notes text
);

-- 2. Enable Row Level Security
alter table applications enable row level security;

-- 3. Anyone can submit (insert) an application from the website
create policy "Allow public inserts"
  on applications for insert
  with check (true);

-- 4. Only you (authenticated) can read applications
create policy "Allow authenticated reads"
  on applications for select
  using (auth.role() = 'authenticated');

-- 5. Only you can update (change status, add notes)
create policy "Allow authenticated updates"
  on applications for update
  using (auth.role() = 'authenticated');

-- 6. Index for fast lookups
create index idx_applications_email on applications(email);
create index idx_applications_status on applications(status);
create index idx_applications_created on applications(created_at desc);

-- ═══════════════════════════════════════════════════════
-- OPTIONAL: Email notifications via Supabase Edge Function
-- ═══════════════════════════════════════════════════════
-- 
-- After setting up Resend (resend.com), create an Edge Function:
--   supabase functions new notify-application
--
-- Then add a Database Webhook:
--   Table: applications
--   Event: INSERT
--   Function: notify-application
--
-- The Edge Function sends you an email when someone applies.
-- See: server/notify-application.ts in this project.
-- ═══════════════════════════════════════════════════════

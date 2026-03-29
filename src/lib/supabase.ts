import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || '';
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = url && key ? createClient(url, key) : null;

/*
═══ RUN THIS SQL IN SUPABASE SQL EDITOR ═══

create table applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  experience text,
  message text,
  source text default 'website',
  status text default 'new',
  payment_status text default 'pending',
  payment_id text,
  amount numeric,
  notes text
);

alter table applications enable row level security;

create policy "Public can insert" on applications for insert with check (true);
create policy "Auth can read" on applications for select using (auth.role() = 'authenticated');

═══════════════════════════════════════════
*/

export interface Application {
  name: string;
  email: string;
  phone?: string;
  experience?: string;
  message?: string;
}

export interface BookingLead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

export async function submitApplication(data: Application) {
  if (!supabase) {
    console.log('📋 Application (no Supabase):', data);
    return { ok: true };
  }
  const { error } = await supabase.from('applications').insert([{ ...data, source: 'website' }]);
  if (error) { console.error(error); return { ok: false, error: error.message }; }
  return { ok: true };
}

export async function markPaid(email: string, paymentId: string, amount: number) {
  if (!supabase) return false;
  const { error } = await supabase.from('applications')
    .update({ payment_status: 'paid', payment_id: paymentId, amount })
    .eq('email', email).eq('payment_status', 'pending');
  return !error;
}

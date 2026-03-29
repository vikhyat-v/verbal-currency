-- ═══════════════════════════════════════════════════════
-- VERBAL CURRENCY — Database Schema
-- ═══════════════════════════════════════════════════════
-- Run this in your Supabase SQL Editor (supabase.com → SQL Editor)

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  experience TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking leads (tracks who clicked "Book a Call")
CREATE TABLE IF NOT EXISTS booking_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  source TEXT NOT NULL, -- e.g. 'hero_cta', 'pricing_cta', 'footer_calendly'
  calendly_event_uri TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table (for Razorpay)
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES applications(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anonymous inserts (from the website)
CREATE POLICY "Allow public insert" ON applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public insert" ON booking_leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public insert" ON payments FOR INSERT TO anon WITH CHECK (true);

-- Policies: Only authenticated (admin) can read
CREATE POLICY "Admin read" ON applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin read" ON booking_leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin read" ON payments FOR SELECT TO authenticated USING (true);

-- Index for faster queries
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_payments_application ON payments(application_id);

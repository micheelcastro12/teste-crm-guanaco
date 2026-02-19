-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Orgs (Multi-tenant Root)
CREATE TABLE orgs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Meta Integrations
CREATE TABLE meta_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES orgs(id) ON DELETE CASCADE,
  page_id TEXT NOT NULL,
  form_id TEXT NOT NULL,
  page_access_token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_id, form_id)
);

-- 3. Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES orgs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contato', 'visita', 'proposta', 'fechado', 'perdido')),
  origin TEXT, -- ex: Meta Ads, Manual, Whatsapp
  interest TEXT, -- Interest in specific property or type
  neighborhood TEXT,
  city TEXT,
  tags TEXT[], -- array of tags
  notes TEXT,
  meta_lead_id TEXT, -- leadgen_id from Meta
  next_action_type TEXT, -- required if lead is active (custom logic in app)
  next_follow_up TIMESTAMPTZ, -- required if lead is active
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, meta_lead_id)
);

-- 4. Lead Activities
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- call, email, whatsapp, meeting, status_change
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Lead Tasks
CREATE TABLE lead_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a sample org for testing
INSERT INTO orgs (slug, name) VALUES ('test-org', 'Imobiliária Teste') ON CONFLICT (slug) DO NOTHING;

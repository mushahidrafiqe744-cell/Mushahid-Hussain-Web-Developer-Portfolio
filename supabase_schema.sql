-- ==============================================================================
-- SUPABASE SAFE MIGRATION & REALTIME SETUP SCRIPT
-- Copy and paste this script into your Supabase Dashboard -> SQL Editor and click RUN.
-- This script is 100% SAFE: It will NOT drop any tables or delete any data.
-- ==============================================================================

-- STEP 1: Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- STEP 2: Create Tables (If they do not exist)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT DEFAULT 'Mushahid Hussain',
  title TEXT DEFAULT 'Web Developer',
  scriptSubhead TEXT DEFAULT 'Web Developer & Engineer',
  badge TEXT DEFAULT 'CRAFTING SCALABLE & INTUITIVE WEB EXPERIENCES.',
  bioHero TEXT DEFAULT 'I build high-performance web applications, responsive interfaces, and robust backend services.',
  bioAbout TEXT DEFAULT 'I am a passionate Full-Stack Web Developer specializing in modern React ecosystems...',
  location TEXT DEFAULT 'Pakistan',
  email TEXT DEFAULT 'mushahidrafiqe744@gmail.com',
  phone TEXT DEFAULT '03290725117',
  whatsapp TEXT DEFAULT '03290725117',
  github TEXT DEFAULT 'https://github.com/mushahidhussain',
  linkedin TEXT DEFAULT 'https://www.linkedin.com/in/mushahid-rafiqe-5b3259425/',
  tiktok TEXT DEFAULT 'https://www.tiktok.com/@mushahidrafiqe699',
  avatarUrl TEXT DEFAULT 'https://i.pinimg.com/736x/69/0e/ee/690eee1da722bcf952fa4893995ac008.jpg',
  projectsCompleted TEXT DEFAULT '50+',
  yearsOfExperience TEXT DEFAULT '8+',
  happyClients TEXT DEFAULT '99%',
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'saas',
  categoryLabel TEXT DEFAULT 'Web Application',
  technologies TEXT[],
  imageUrl TEXT,
  liveUrl TEXT DEFAULT '#',
  githubUrl TEXT DEFAULT '#',
  featured BOOLEAN DEFAULT true,
  hidden BOOLEAN DEFAULT false,
  year TEXT DEFAULT '2025',
  metrics JSONB DEFAULT '{}',
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  percentage INTEGER DEFAULT 85,
  category TEXT DEFAULT 'Frontend',
  icon TEXT DEFAULT 'Code',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Code',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Client',
  company TEXT DEFAULT '',
  review TEXT,
  avatarUrl TEXT,
  avatarColor TEXT DEFAULT '#EA580C',
  rating INTEGER DEFAULT 5,
  date TEXT DEFAULT 'Recent',
  tags TEXT[],
  platform TEXT DEFAULT 'google',
  flag TEXT DEFAULT '🇵🇰',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT DEFAULT 'Mushahid Hussain - Web Developer Portfolio',
  description TEXT DEFAULT 'Portfolio of Mushahid Hussain, Full-Stack Web Developer.',
  themePrimary TEXT DEFAULT '#0A3D22',
  themeAccent TEXT DEFAULT '#50E364',
  fontFamily TEXT DEFAULT 'Inter',
  navbarItems TEXT[] DEFAULT ARRAY['Home', 'About', 'Services', 'Skills', 'Projects', 'Contact'],
  faviconUrl TEXT DEFAULT '/favicon.ico',
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  projectType TEXT,
  budget TEXT,
  country TEXT,
  currency TEXT,
  message TEXT,
  status TEXT DEFAULT 'unread',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  badge TEXT,
  description TEXT,
  achievements TEXT[],
  stack TEXT[],
  displayOrder INTEGER DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  institutionUrl TEXT,
  category TEXT DEFAULT 'Development',
  period TEXT,
  description TEXT,
  skills TEXT[],
  badgeImage TEXT,
  badgeUrl TEXT,
  credentialBadge TEXT,
  displayOrder INTEGER DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS why_us (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon TEXT,
  stepNumber INTEGER,
  displayOrder INTEGER DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 3: Safely Add Any Missing Columns (For existing databases)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'saas';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "categoryLabel" TEXT DEFAULT 'Web Application';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "liveUrl" TEXT DEFAULT '#';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "githubUrl" TEXT DEFAULT '#';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "featured" BOOLEAN DEFAULT true;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "hidden" BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "year" TEXT DEFAULT '2025';

ALTER TABLE messages ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS currency TEXT;

-- STEP 4: Enable Row Level Security (RLS) on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_us ENABLE ROW LEVEL SECURITY;

-- STEP 5: Drop Old Conflicting Policies & Create Clean Public Policies
DROP POLICY IF EXISTS "Public read profiles" ON profiles;
DROP POLICY IF EXISTS "Admin update profiles" ON profiles;
DROP POLICY IF EXISTS "Public all profiles" ON profiles;
CREATE POLICY "Public all profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Admin update projects" ON projects;
DROP POLICY IF EXISTS "Public all projects" ON projects;
CREATE POLICY "Public all projects" ON projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read skills" ON skills;
DROP POLICY IF EXISTS "Admin update skills" ON skills;
DROP POLICY IF EXISTS "Public all skills" ON skills;
CREATE POLICY "Public all skills" ON skills FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read services" ON services;
DROP POLICY IF EXISTS "Admin update services" ON services;
DROP POLICY IF EXISTS "Public all services" ON services;
CREATE POLICY "Public all services" ON services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public all testimonials" ON testimonials;
CREATE POLICY "Public all testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read settings" ON settings;
DROP POLICY IF EXISTS "Admin update settings" ON settings;
DROP POLICY IF EXISTS "Public all settings" ON settings;
CREATE POLICY "Public all settings" ON settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read messages" ON messages;
DROP POLICY IF EXISTS "Public insert messages" ON messages;
DROP POLICY IF EXISTS "Admin update messages" ON messages;
DROP POLICY IF EXISTS "Public all messages" ON messages;
CREATE POLICY "Public all messages" ON messages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read experiences" ON experiences;
DROP POLICY IF EXISTS "Admin update experiences" ON experiences;
DROP POLICY IF EXISTS "Public all experiences" ON experiences;
CREATE POLICY "Public all experiences" ON experiences FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read courses" ON courses;
DROP POLICY IF EXISTS "Admin update courses" ON courses;
DROP POLICY IF EXISTS "Public all courses" ON courses;
CREATE POLICY "Public all courses" ON courses FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read why_us" ON why_us;
DROP POLICY IF EXISTS "Admin update why_us" ON why_us;
DROP POLICY IF EXISTS "Public all why_us" ON why_us;
CREATE POLICY "Public all why_us" ON why_us FOR ALL USING (true) WITH CHECK (true);

-- STEP 6: Enable Supabase Realtime Publication for Live Cross-Browser Updates
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE profiles, projects, skills, services, testimonials, settings, messages, experiences, courses, why_us;
    EXCEPTION WHEN OTHERS THEN
      NULL; -- Ignore if tables are already in publication
    END;
  END IF;
END $$;

-- STEP 7: Seed Initial Profile Record (If not already present)
INSERT INTO profiles (id, name, title, email, phone, whatsapp, avatarUrl, projectsCompleted, yearsOfExperience, happyClients)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Mushahid Hussain',
  'Web Developer',
  'mushahidrafiqe744@gmail.com',
  '03290725117',
  '03290725117',
  'https://i.pinimg.com/736x/69/0e/ee/690eee1da722bcf952fa4893995ac008.jpg',
  '50+',
  '8+',
  '99%'
) ON CONFLICT (id) DO NOTHING;


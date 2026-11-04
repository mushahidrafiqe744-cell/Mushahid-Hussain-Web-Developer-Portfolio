-- Supabase PostgreSQL Schema for Portfolio CMS (Full Update)

/* 
  STEP 0: STORAGE SETUP
  1. Go to Supabase Dashboard -> Storage
  2. Create a new bucket named: images
  3. IMPORTANT: Set bucket to PUBLIC (Check "Public bucket").
  4. Go to "Policies" (under Storage in left menu).
  5. Under "images" bucket, create a policy for "ALL" (Select, Insert, Update, Delete).
  6. Choose "Authenticated" for roles (so only logged-in admin can upload).
  7. Use "true" for all policy expressions.
*/

-- 1. Profiles Table (Hero, About, Contact info, Stats)
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
  avatarUrl TEXT DEFAULT 'https://i.pinimg.com/1200x/0c/b3/9e/0cb39e700962bebdce9925a2c566b1a1.jpg',
  projectsCompleted TEXT DEFAULT '50+',
  yearsOfExperience TEXT DEFAULT '8+',
  happyClients TEXT DEFAULT '99%',
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

-- Initial Profile Seed
INSERT INTO profiles (id, name, title, email, phone, whatsapp, github, linkedin, avatarUrl, projectsCompleted, yearsOfExperience, happyClients)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Mushahid Hussain',
  'Web Developer',
  'mushahidrafiqe744@gmail.com',
  '03290725117',
  '03290725117',
  'https://github.com/mushahidhussain',
  'https://www.linkedin.com/in/mushahid-rafiqe-5b3259425/',
  'https://i.pinimg.com/1200x/0c/b3/9e/0cb39e700962bebdce9925a2c566b1a1.jpg',
  '50+',
  '8+',
  '99%'
) ON CONFLICT (id) DO NOTHING;

-- 2. Projects Table
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
  year TEXT DEFAULT '2024',
  metrics JSONB DEFAULT '{}',
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  percentage INTEGER DEFAULT 85,
  category TEXT DEFAULT 'Frontend',
  icon TEXT DEFAULT 'Code',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Code',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Testimonials Table
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
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Settings Table (SEO, Theme, Navbar)
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

-- 7. Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  projectType TEXT,
  message TEXT,
  status TEXT DEFAULT 'unread',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Experiences Table
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

-- 9. Courses Table
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

-- 10. Why Us Table (Pillars & Workflow)
CREATE TABLE IF NOT EXISTS why_us (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- 'pillar' or 'workflow'
  title TEXT NOT NULL,
  subtitle TEXT, -- for pillars
  description TEXT,
  icon TEXT, -- for pillars
  stepNumber INTEGER, -- for workflow
  displayOrder INTEGER DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
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

-- Public Read Policies
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public read why_us" ON why_us FOR SELECT USING (true);

-- Authenticated Write Policies (Admin Only)
CREATE POLICY "Admin update profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update courses" ON courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update why_us" ON why_us FOR ALL USING (auth.role() = 'authenticated');

-- Public Message Insert
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);

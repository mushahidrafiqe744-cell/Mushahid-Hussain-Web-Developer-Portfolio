-- Supabase PostgreSQL Schema for Portfolio CMS (Comprehensive Setup)

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

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  avatarUrl TEXT DEFAULT 'https://i.pinimg.com/736x/69/0e/ee/690eee1da722bcf952fa4893995ac008.jpg',
  projectsCompleted TEXT DEFAULT '50+',
  yearsOfExperience TEXT DEFAULT '8+',
  happyClients TEXT DEFAULT '99%',
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW()
);

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
  year TEXT DEFAULT '2025',
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
  flag TEXT DEFAULT '🇵🇰',
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Settings Table
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

-- 10. Why Us Table
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

-- Public Access Policies (Select, Insert, Update, Delete for all tables)
CREATE POLICY "Public all profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all skills" ON skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all settings" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all messages" ON messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all experiences" ON experiences FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all courses" ON courses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all why_us" ON why_us FOR ALL USING (true) WITH CHECK (true);

-- SEED DATA (Optional, recommended for first setup)
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

INSERT INTO testimonials (name, role, company, review, rating, date, platform, flag)
VALUES 
('Malik Saim', 'Web Client', 'Saim Solutions', 'king web developer ka', 5, '4 weeks ago', 'google', '🇵🇰'),
('M Saleem', 'Business Owner', 'Saleem Traders', 'Nice', 5, '4 weeks ago', 'google', '🇵🇰'),
('M Anass', 'Digital Creator', 'Anass Tech', 'Nice', 5, '4 weeks ago', 'google', '🇵🇰'),
('umar janjua', 'Project Manager', 'Janjua Enterprises', 'Good', 5, '4 weeks ago', 'google', '🇵🇰'),
('Abdullah Khan', 'Startup Founder', 'TechFlow', 'Excellent service and top-notch code quality. Mushahid is a pro at React and Supabase integrations.', 5, '2 months ago', 'google', '🇵🇰'),
('Zeeshan Ahmed', 'Software Architect', 'Global Systems', 'The best full-stack developer I have worked with. Very professional and timely delivery.', 5, '1 month ago', 'google', '🇵🇰'),
('Hamza Malik', 'E-commerce Manager', 'ShopRight', 'Transformed our store into a high-converting machine. The speed optimization is incredible.', 5, '3 weeks ago', 'google', '🇵🇰'),
('Bilal Hassan', 'Product Designer', 'Creative Hub', 'Exceptional UI/UX implementation. The attention to detail is exactly what we needed.', 5, '5 weeks ago', 'google', '🇵🇰'),
('Usman Ghani', 'Full Stack Dev', 'DevSquad', 'Very knowledgeable and helpful. Guided me through the entire deployment process.', 5, '2 weeks ago', 'google', '🇵🇰'),
('Faisal Mehmood', 'IT Director', 'Enterprise Solutions', 'Robust and scalable solutions. Highly recommended for complex enterprise applications.', 5, '6 weeks ago', 'google', '🇵🇰');

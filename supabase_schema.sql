-- Create tables
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  name text,
  title text,
  bio_hero text,
  email text,
  phone text,
  whatsapp text,
  location text,
  github text,
  linkedin text,
  tiktok text,
  avatar_url text
);

CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  category text,
  technologies text[],
  image_url text,
  link text
);

CREATE TABLE skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  percentage int,
  icon text
);

CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  icon text
);

CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  role text,
  message text,
  avatar_url text
);

CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  theme_colors jsonb,
  navbar_items jsonb
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies (Example: Allow authenticated admins)
CREATE POLICY "Allow authenticated updates" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read" ON profiles FOR SELECT USING (true);
-- Repeat for other tables...

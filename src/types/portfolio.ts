export type SectionId =
  | 'hero'
  | 'about'
  | 'services'
  | 'skills'
  | 'experience'
  | 'why-choose-me'
  | 'projects'
  | 'resume'
  | 'contact';

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  category: 'saas' | 'ecommerce' | 'fullstack' | 'api' | 'mobile' | string;
  categoryLabel?: string;
  year?: string;
  metrics?: string;
  description: string;
  longDescription?: string;
  fullOverview?: string;
  image: string;
  tags?: string[];
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  highlights?: string[];
  architecture?: string[];
}

export interface Service {
  id: string;
  title: string;
  iconName?: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: string; // 'Expert' | 'Advanced' | 'Proficient'
  yearsOfExp?: string;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
  short?: string;
}

export interface SkillGroup {
  category: string;
  skills?: SkillItem[];
  items?: SkillItem[];
}

export interface DeveloperProfile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  scriptSubhead: string;
  badge: string;
  bioHero: string;
  bioAbout: string;
  location: string;
  dob?: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter?: string;
  avatarUrl: string;
  yearsOfExperience: string;
  projectsCompleted: string;
  happyClients: string;
}

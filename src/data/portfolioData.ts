import { DeveloperProfile, Project, Service, SkillGroup } from '../types/portfolio';
import heroPortrait from '../assets/images/mushahid_hussain_hero_1790258485207.jpg';
import projectSaasImg from '../assets/images/project_saas_dashboard_1790256923327.jpg';
import projectEcomImg from '../assets/images/project_ecommerce_luxury_1790256942358.jpg';
import projectAiImg from '../assets/images/project_ai_platform_1790256957586.jpg';
import mbaAcademyImg from '../assets/images/mba_academy_preview_1790339491378.jpg';
import aqsaRamzanImg from '../assets/images/aqsa_ramzan_portfolio_1790343419861.jpg';
import raheemRehabImg from '../assets/images/raheem_rehab_preview_1790343771657.jpg';

export const initialProfile: DeveloperProfile = {
  name: 'Mushahid Hussain',
  firstName: 'Mushahid',
  lastName: 'Hussain',
  title: 'Web Developer',
  scriptSubhead: 'Web Developer & Engineer',
  badge: 'CRAFTING SCALABLE & INTUITIVE WEB EXPERIENCES.',
  bioHero: 'I build high-performance web applications, responsive interfaces, and robust backend services that help businesses innovate and leave a lasting impression.',
  bioAbout: 'I am a passionate Full-Stack Web Developer specializing in modern React ecosystems, TypeScript, Node.js, Next.js, and high-converting responsive interfaces. My focus is writing clean, scalable, and maintainable code that delivers outstanding user experiences and business results.',
  dob: '06th August 2016',
  location: 'Pakistan',
  email: 'mushahidrafiqe744@gmail.com',
  phone: '03290725117',
  whatsapp: '03290725117',
  github: 'https://github.com/mushahidhussain',
  linkedin: 'https://linkedin.com/in/mushahidhussain',
  twitter: 'https://twitter.com/mushahiddev',
  avatarUrl: heroPortrait,
  yearsOfExperience: '8+ Years',
  projectsCompleted: '30+',
  happyClients: '99%',
};

export const initialServices: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description: 'Pixel-perfect, accessible, and fast web UIs using React, Next.js, TypeScript, and modern CSS.',
    iconName: 'Layout',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web Apps',
    description: 'End-to-end web applications with robust server architecture, auth, and database persistence.',
    iconName: 'Layers',
  },
  {
    id: 'api',
    title: 'REST & GraphQL APIs',
    description: 'High-throughput, secure backend APIs designed with Express, Node.js, and clean middleware.',
    iconName: 'Server',
  },
  {
    id: 'database',
    title: 'Database Architecture',
    description: 'Schema modeling, indexing, and data security using PostgreSQL, Prisma, Supabase, and MongoDB.',
    iconName: 'Database',
  },
  {
    id: 'performance',
    title: 'Speed & SEO Optimization',
    description: 'Lighthouse 95+ scores, Core Web Vitals tuning, dynamic meta tags, and high search visibility.',
    iconName: 'Zap',
  },
  {
    id: 'responsive',
    title: 'Responsive & Mobile UI',
    description: 'Fluid, cross-browser responsive interfaces tailored seamlessly for mobile, tablet, and desktop.',
    iconName: 'Smartphone',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platforms',
    description: 'Custom headless storefronts, Stripe checkout flows, inventory syncing, and high conversion design.',
    iconName: 'ShoppingBag',
  },
  {
    id: 'ai-integration',
    title: 'AI & Cloud Integration',
    description: 'Integrating intelligent LLM features, workflow automation, and cloud deployments on Vercel & AWS.',
    iconName: 'Cpu',
  },
];

export const initialSkillGroups: SkillGroup[] = [
  {
    category: 'Core Tech Stack',
    items: [
      { name: 'React', level: 'Advanced', iconBg: '#23272f', iconColor: '#149eca', short: 'Re' },
      { name: 'Next.js', level: 'Advanced', iconBg: '#000000', iconColor: '#ffffff', short: 'Nx' },
      { name: 'TypeScript', level: 'Advanced', iconBg: '#3178c6', iconColor: '#ffffff', short: 'TS' },
      { name: 'Node.js', level: 'Advanced', iconBg: '#339933', iconColor: '#ffffff', short: 'Node' },
      { name: 'Tailwind CSS', level: 'Expert', iconBg: '#38bdf8', iconColor: '#ffffff', short: 'TW' },
      { name: 'PostgreSQL', level: 'Proficient', iconBg: '#4169e1', iconColor: '#ffffff', short: 'SQL' },
      { name: 'Express.js', level: 'Advanced', iconBg: '#1f2937', iconColor: '#e5e7eb', short: 'Ex' },
      { name: 'Git & GitHub', level: 'Expert', iconBg: '#f05032', iconColor: '#ffffff', short: 'Git' },
    ],
  },
  {
    category: 'Engineering Capabilities',
    items: [
      { name: 'State Management', level: 'Zustand / Redux', short: 'SM' },
      { name: 'Component Systems', level: 'Modular Design', short: 'CS' },
      { name: 'REST & GraphQL', level: 'API Design', short: 'API' },
      { name: 'Authentication', level: 'OAuth & JWT', short: 'Auth' },
      { name: 'Performance Tuning', level: 'Vitals & Caching', short: 'Perf' },
      { name: 'CI/CD & DevOps', level: 'Vercel / Docker', short: 'DevOps' },
      { name: 'Unit & E2E Testing', level: 'Jest & Vitest', short: 'Test' },
      { name: 'SEO & Structured Data', level: 'Schema.org', short: 'SEO' },
    ],
  },
];

export const initialProjects: Project[] = [
  {
    id: 'mba-academy',
    title: 'MBA Academy Web Platform',
    tagline: 'Modern educational portal and professional learning management system.',
    category: 'fullstack',
    categoryLabel: 'EdTech Platform',
    year: '2025',
    description: 'A comprehensive educational web platform featuring interactive course catalogs, student dashboard, dynamic curriculum tracking, and responsive learning interfaces.',
    fullOverview: 'Developed with modern React tooling, responsive Tailwind CSS layouts, and fast client-side navigation. Designed for seamless student enrollment, course material access, and professional skill development.',
    image: mbaAcademyImg,
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Node.js'],
    githubUrl: 'https://github.com/mushahidhussain/mba-academy',
    liveUrl: 'https://mba-academy-6611-84sn.vercel.app/#home',
    features: [
      'Interactive course catalog with instant filtering and search',
      'Student dashboard for tracking learning progress and modules',
      'Fully responsive mobile-first UI with lightning-fast load times',
      'Direct enrollment and instructor consultation portals'
    ],
    metrics: '100% responsive & accessible learning portal'
  },
  {
    id: 'aqsa-ramzan-portfolio',
    title: 'Aqsa Ramzan — Graphic Designer Portfolio',
    tagline: 'Stunning creative portfolio showcasing brand identity, illustration, and UI/UX design.',
    category: 'ecommerce',
    categoryLabel: 'Design Portfolio',
    year: '2025',
    description: 'A vibrant, creative portfolio website built for a professional graphic designer, featuring case studies, brand identity showcases, vector illustrations, and contact booking.',
    fullOverview: 'Crafted with bold artistic typography, interactive project galleries, smooth image lightboxes, and responsive layouts that highlight creative design mastery and visual storytelling.',
    image: aqsaRamzanImg,
    technologies: ['React', 'TailwindCSS', 'TypeScript', 'Vite', 'Framer Motion'],
    githubUrl: 'https://github.com/mushahidhussain/aqsa-ramzan-graphics-portfolio',
    liveUrl: 'https://aqsa-ramzan-graphics-designer-portf-hazel.vercel.app/',
    features: [
      'Interactive visual project gallery with categorized filter tabs',
      'High-resolution imagery showcase with lightbox zoom effects',
      'Client testimonial slider and inquiry contact form',
      'Fully responsive portfolio layout optimized for mobile and desktop'
    ],
    metrics: 'Showcasing 40+ brand identity & design projects'
  },
  {
    id: 'raheem-rehab',
    title: 'Raheem Insdad-e-Manshiyat',
    tagline: 'Pakistan leading addiction rehabilitation center and psychiatric care portal.',
    category: 'fullstack',
    categoryLabel: 'Healthcare Platform',
    year: '2025',
    description: 'A professional medical rehabilitation web platform featuring appointment booking, emergency care hotlines, specialist doctor directories, and patient care statistics.',
    fullOverview: 'Engineered for compassionate care and seamless patient engagement. Includes interactive consultation scheduling, 24/7 emergency support channels, medical detox information, and psychiatric counseling resources.',
    image: raheemRehabImg,
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Node.js'],
    githubUrl: 'https://github.com/mushahidhussain/raheem-rehab-center',
    liveUrl: 'https://raheem-insdad-e-manshiyat-e9qy.vercel.app/',
    features: [
      '24/7 emergency care hotline and instant trauma response banner',
      'Specialist doctor directory with US/UK board-certified profiles',
      'Online appointment booking and consultation scheduling system',
      'Patient success score and comprehensive medical department breakdown'
    ],
    metrics: '50,000+ Admitted & Cured with 99% Patient Score'
  }
];

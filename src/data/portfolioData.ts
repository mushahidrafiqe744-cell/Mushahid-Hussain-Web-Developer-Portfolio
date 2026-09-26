import { DeveloperProfile, Project, Service, SkillGroup } from '../types/portfolio';
import heroPortrait from '../assets/images/mushahid_hussain_hero_1790258485207.jpg';
import mbaAcademyImg from '../assets/images/mba_academy_full_web_1790428843333.jpg';
import aqsaRamzanImg from '../assets/images/aqsa_ramzan_full_web_1790428861081.jpg';
import raheemRehabImg from '../assets/images/raheem_rehab_full_web_1790428879741.jpg';
import grandPavilionImg from '../assets/images/grand_pavilion_full_web_1790428751763.jpg';
import quaidTributeImg from '../assets/images/quaid_tribute_full_web_1790428772996.jpg';
import alQuranImg from '../assets/images/al_quran_full_web_1790428789923.jpg';
import novaraStoreImg from '../assets/images/novara_store_full_web_1790428808211.jpg';
import alNoorTextileImg from '../assets/images/al_noor_textile_full_web_1790428824308.jpg';

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
    id: 'the-grand-pavilion',
    title: 'The Grand Pavilion — Commercial Convention & Business Center',
    tagline: 'Ultra-luxury commercial banquet, business suites, and world-class event hospitality portal.',
    category: 'fullstack',
    categoryLabel: 'Commercial & Hospitality',
    year: '2025',
    description: 'An elite commercial event venue and convention center portal with interactive hall booking, luxury suite tours, corporate catering inquiry systems, and high-converting event reservation workflows.',
    fullOverview: 'Engineered with responsive web standards, high-converting banquet booking forms, event date availability inquiries, virtual architectural showcases, and bespoke gold-accented styling.',
    image: grandPavilionImg,
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Framer Motion'],
    githubUrl: 'https://github.com/mushahidhussain/the-grand-pavilion',
    liveUrl: 'https://the-grand-pavilion-commercial-busin-delta.vercel.app/',
    features: [
      'Interactive event space reservation & date availability check',
      'Virtual hall showcase with luxury hospitality suites & menus',
      'Direct client quote generator and event coordinator booking',
      'Fully responsive high-end architectural layout'
    ],
    metrics: 'Luxury commercial hub with 500+ corporate events hosted'
  },
  {
    id: 'quaid-day-tribute',
    title: '25th December — Quaid-e-Azam Day National Tribute',
    tagline: 'Interactive historical tribute honoring the Founder of Pakistan, Quaid-e-Azam Muhammad Ali Jinnah.',
    category: 'saas',
    categoryLabel: 'National Tribute Portal',
    year: '2024',
    description: 'A digital national tribute portal commemorating 25th December, celebrating the life, vision, iconic speeches, and monumental journey of Quaid-e-Azam Muhammad Ali Jinnah.',
    fullOverview: 'Built with deep Pakistani emerald green aesthetics, national archives integration, inspiring quote galleries, interactive historical timeline milestones, and patriotic ambient styling.',
    image: quaidTributeImg,
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Lucide Icons', 'Vite'],
    githubUrl: 'https://github.com/mushahidhussain/quaid-e-azam-day-tribute',
    liveUrl: 'https://25-december-quaid-e-azam-day-tribut.vercel.app/',
    features: [
      'Historical timeline of Pakistan movement milestones (1876-1948)',
      'Curated archive of iconic speeches, quotes, and rare photographs',
      'Interactive patriotic theme with seamless audio & visual tribute',
      'Smooth mobile & desktop responsive experience'
    ],
    metrics: 'Celebrated national tribute with 100k+ patriotic visitors'
  },
  {
    id: 'al-quran-portal',
    title: 'Al-Quran — Digital Interactive Portal',
    tagline: 'Sacred Holy Quran digital experience with multi-language translations and audio recitations.',
    category: 'saas',
    categoryLabel: 'Islamic Web Application',
    year: '2025',
    description: 'A comprehensive online Quran reading and listening platform with complete Surah indexing, word-by-word font rendering, Ayah bookmarking, and pristine recitations.',
    fullOverview: 'Designed for accessibility, spiritual reflection, and seamless Quran study. Features responsive Arabic typography, instant chapter search, multiple international translations, and lightweight audio streaming.',
    image: alQuranImg,
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Audio API', 'Vite'],
    githubUrl: 'https://github.com/mushahidhussain/al-quran-interactive',
    liveUrl: 'https://al-quran-zdnx.vercel.app/',
    features: [
      'Complete 114 Surahs catalog with instant search & jump-to-Ayah',
      'Multi-Qari audio recitation player with auto-scroll Ayah tracking',
      'High-readability Uthmani script rendering and Urdu/English translations',
      'Offline-ready bookmarking and day/night reading modes'
    ],
    metrics: 'Fast <1s load time with zero-latency audio streaming'
  },
  {
    id: 'novara-ecommerce-store',
    title: 'Novara — Premium Pakistani E-Commerce Store',
    tagline: 'Luxury Pakistani fashion & lifestyle digital shopping platform with dynamic cart and checkout.',
    category: 'ecommerce',
    categoryLabel: 'Luxury E-Commerce',
    year: '2025',
    description: 'An elite designer fashion storefront featuring high-converting product pages, interactive size guides, multi-currency pricing, shopping bag management, and fast checkout.',
    fullOverview: 'Engineered with high aesthetic standards for Pakistani haute couture. Features filterable product catalogs, instant search, customer reviews, dynamic wishlist, and streamlined mobile checkout.',
    image: novaraStoreImg,
    technologies: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Zustand'],
    githubUrl: 'https://github.com/mushahidhussain/novara-ecommerce-store',
    liveUrl: 'https://novara-premium-pakistani-e-commerce.vercel.app/',
    features: [
      'Dynamic shopping bag with real-time subtotal & promo codes',
      'Multi-angle product image zoom & responsive apparel gallery',
      'Instant filter by fabric, occasion, size, and price range',
      'Integrated WhatsApp order verification and express checkout'
    ],
    metrics: '3.8x faster page transitions & 98+ Mobile Performance Score'
  },
  {
    id: 'al-noor-textile-mills',
    title: 'Al-Noor Processing & Textile Mills',
    tagline: 'Leading industrial fabric processing, textile finishing, and global export enterprise.',
    category: 'fullstack',
    categoryLabel: 'Industrial Enterprise',
    year: '2025',
    description: 'An enterprise web platform for a major Pakistani textile processing and export corporation, detailing industrial looms, eco-friendly dye houses, and global export operations.',
    fullOverview: 'Built to reflect corporate excellence and industrial scale. Showcases export certifications (OEKO-TEX, ISO), factory infrastructure tours, bulk fabric order inquiries, and production statistics.',
    image: alNoorTextileImg,
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'Vite'],
    githubUrl: 'https://github.com/mushahidhussain/al-noor-textile-mills',
    liveUrl: 'https://al-noor-processing-and-textile-mill-sigma.vercel.app/',
    features: [
      'Industrial production machinery showcase & process walkthrough',
      'Interactive bulk fabric order quotation and inquiry form',
      'International trade compliance, ISO certification showcase',
      'Enterprise facility gallery and annual export volume metrics'
    ],
    metrics: 'Representing 50+ Million meters annual textile capacity'
  },
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

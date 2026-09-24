import { DeveloperProfile, Project, Service, SkillGroup } from '../types/portfolio';
import heroPortrait from '../assets/images/mushahid_hussain_hero_1790258485207.jpg';
import projectSaasImg from '../assets/images/project_saas_dashboard_1790256923327.jpg';
import projectEcomImg from '../assets/images/project_ecommerce_luxury_1790256942358.jpg';
import projectAiImg from '../assets/images/project_ai_platform_1790256957586.jpg';

export const initialProfile: DeveloperProfile = {
  name: 'Mushahid Hussain',
  firstName: 'Mushahid',
  lastName: 'Hussain',
  title: 'Web Developer',
  scriptSubhead: 'Web Developer & Engineer',
  badge: 'CRAFTING SCALABLE & INTUITIVE WEB EXPERIENCES.',
  bioHero: 'I build high-performance web applications, responsive interfaces, and robust backend services that help businesses innovate and leave a lasting impression.',
  bioAbout: 'I am a passionate Full-Stack Web Developer specializing in modern React ecosystems, TypeScript, Node.js, Next.js, and high-converting responsive interfaces. My focus is writing clean, scalable, and maintainable code that delivers outstanding user experiences and business results.',
  dob: '15th October 2001',
  location: 'Pakistan',
  email: 'mushahidrafiqe744@gmail.com',
  phone: '+92 300 1234567',
  github: 'https://github.com/mushahidhussain',
  linkedin: 'https://linkedin.com/in/mushahidhussain',
  twitter: 'https://twitter.com/mushahiddev',
  avatarUrl: heroPortrait,
  yearsOfExperience: '3+ Years',
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
    id: 'saas-metrics',
    title: 'Aura Analytics & Cloud SaaS',
    tagline: 'Real-time telemetry and revenue intelligence platform for digital businesses.',
    category: 'saas',
    categoryLabel: 'SaaS Platform',
    year: '2025',
    description: 'A full-stack analytics suite featuring multi-tenant dashboards, real-time event ingestion, customized reporting, and role-based access control.',
    fullOverview: 'Built to handle high-frequency data streams with millisecond query speeds. Includes interactive charting, exportable PDF financial reports, team invitations, and automated Stripe billing webhooks.',
    image: projectSaasImg,
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'ChartJS', 'Express'],
    githubUrl: 'https://github.com/mushahidhussain/aura-analytics-saas',
    liveUrl: 'https://aura-analytics-demo.web.app',
    features: [
      'Sub-50ms query latency on multi-million row event logs',
      'Real-time WebSocket data updates and live visitor heatmaps',
      'Automated recurring billing and team permission matrix',
      'Zero-latency dark/light mode with custom chart theming'
    ],
    metrics: 'Processed 2.4M monthly data points'
  },
  {
    id: 'luxury-ecommerce',
    title: 'Luxe Maison E-Commerce',
    tagline: 'High-end responsive fashion and lifestyle flagship with seamless checkout.',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    year: '2024',
    description: 'A headless e-commerce store with instant client-side filtering, multi-currency support, dynamic inventory tracking, and one-click Stripe payments.',
    fullOverview: 'Designed with editorial minimalism and high visual polish. Features interactive 3D product previews, wishlist persistence via local storage, animated sliding cart drawers, and Lighthouse 98 performance score.',
    image: projectEcomImg,
    technologies: ['Next.js', 'React', 'TailwindCSS', 'Stripe API', 'Zustand', 'Node.js'],
    githubUrl: 'https://github.com/mushahidhussain/luxe-maison-storefront',
    liveUrl: 'https://luxe-maison-store.vercel.app',
    features: [
      'Instant search and multi-facet filtering with zero layout shift',
      'Integrated Stripe Checkout & Apple Pay / Google Pay',
      'Optimized Next.js Image pipeline with responsive WebP delivery',
      'Complete order history and automated email confirmations'
    ],
    metrics: '98/100 Lighthouse Performance & 3.2x faster checkout'
  },
  {
    id: 'dev-collaboration',
    title: 'CodeSync Collaborative IDE',
    tagline: 'Browser-based live pair-programming and code execution playground.',
    category: 'fullstack',
    categoryLabel: 'Developer Tool',
    year: '2024',
    description: 'A web-based workspace enabling multiple developers to edit code simultaneously in real-time, execute snippets securely, and share reproducible dev snapshots.',
    fullOverview: 'Leverages CRDT algorithm primitives and WebSockets for conflict-free real-time collaborative text editing, syntax highlighting across 40+ programming languages, and terminal emulator output.',
    image: projectAiImg,
    technologies: ['React', 'TypeScript', 'WebSockets', 'Node.js', 'Monaco Editor', 'Docker'],
    githubUrl: 'https://github.com/mushahidhussain/codesync-live-ide',
    liveUrl: 'https://codesync-playground.web.app',
    features: [
      'Multi-cursor live presence with low latency synchronization',
      'Isolated sandbox container code execution engine',
      'Instant link sharing with cryptographic project hashes',
      'Integrated audio chat and code diff inspection'
    ],
    metrics: '15k+ snippets compiled and shared'
  },
  {
    id: 'pulse-api-gateway',
    title: 'Pulse Microservice API Engine',
    tagline: 'High-throughput caching gateway and authentication proxy.',
    category: 'api',
    categoryLabel: 'Backend / API',
    year: '2024',
    description: 'A resilient microservice API proxy that manages token validation, distributed rate-limiting, and Redis caching for distributed microservices.',
    fullOverview: 'Engineered in TypeScript and Express with comprehensive unit and integration test coverage. Handles rate limiting via sliding window Redis algorithms, HMAC signature verification, and automated OpenAPI documentation.',
    image: projectSaasImg,
    technologies: ['Node.js', 'TypeScript', 'Express', 'Redis', 'Docker', 'Swagger'],
    githubUrl: 'https://github.com/mushahidhussain/pulse-api-gateway',
    liveUrl: 'https://api-docs.pulse-gateway.dev',
    features: [
      'Distributed Redis sliding-window token bucket rate limiter',
      'Automatic Swagger / OpenAPI spec generation from TypeScript types',
      'JWT and API Key authentication with permission scopes',
      'Comprehensive Jest test suite with 94% code coverage'
    ],
    metrics: 'Handles 10k+ req/sec with <8ms overhead'
  }
];

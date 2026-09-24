import React from 'react';
import {
  Layout,
  Layers,
  Server,
  Database,
  Zap,
  Smartphone,
  ShoppingBag,
  Cpu,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Service } from '../types/portfolio';

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const serviceDetails = [
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      icon: Layout,
      description: 'Pixel-perfect, accessible, and ultra-fast web interfaces engineered using React, Next.js, and TypeScript with state-of-the-art responsiveness.',
      deliverables: ['Custom React/Next.js Applications', 'Tailwind CSS & Design Systems', 'Interactive Animations & Transitions', 'WCAG AA Accessibility Compliance'],
      stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Web Apps',
      icon: Layers,
      description: 'End-to-end web applications architected with robust server-side logic, secure authentication, database persistence, and clean REST/GraphQL APIs.',
      deliverables: ['Single Page Apps (SPA) & SSR', 'Role-Based Access Control (RBAC)', 'State Management (Zustand/Redux)', 'Real-time WebSocket Sync'],
      stack: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Prisma'],
    },
    {
      id: 'api',
      title: 'REST & GraphQL APIs',
      icon: Server,
      description: 'High-throughput, enterprise-grade backend APIs with clean middleware, rate limiting, data validation, and comprehensive documentation.',
      deliverables: ['Microservice & Monolith Endpoints', 'JWT & OAuth Authentication', 'Swagger / OpenAPI Specs', 'Automated Jest Unit Tests'],
      stack: ['Node.js', 'Express', 'TypeScript', 'Redis', 'Swagger'],
    },
    {
      id: 'database',
      title: 'Database Architecture',
      icon: Database,
      description: 'Scalable data models, indexing, transaction safety, and caching strategies for relational (PostgreSQL) and NoSQL (MongoDB) databases.',
      deliverables: ['Schema Design & Migrations', 'Query Optimization & Indexing', 'Redis Caching Layers', 'Database Backups & Resilience'],
      stack: ['PostgreSQL', 'Supabase', 'MongoDB', 'Redis', 'Drizzle'],
    },
    {
      id: 'performance',
      title: 'Speed & SEO Optimization',
      icon: Zap,
      description: 'Auditing and re-architecting web apps to consistently score 95+ on Google Lighthouse, improve Core Web Vitals, and dominate search rankings.',
      deliverables: ['Core Web Vitals Optimization', 'Server-Side Rendering & SSG', 'Image & Bundle Minification', 'Dynamic OpenGraph & Schema.org'],
      stack: ['Lighthouse', 'Next.js', 'Web Vitals', 'Vercel Analytics'],
    },
    {
      id: 'responsive',
      title: 'Responsive & Mobile First',
      icon: Smartphone,
      description: 'Seamless cross-device experiences ensuring your web product renders flawlessly on everything from smartphones to ultra-wide 4K monitors.',
      deliverables: ['Fluid Multi-Breakpoint Layouts', 'Touch-Friendly UI Components', 'Progressive Web App (PWA) Support', 'Cross-Browser Testing'],
      stack: ['CSS Grid/Flexbox', 'Tailwind CSS', 'PWA Manifests'],
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platforms',
      icon: ShoppingBag,
      description: 'Headless e-commerce stores with instant search, multi-currency cart systems, dynamic checkout workflows, and Stripe payment gateways.',
      deliverables: ['Custom Storefronts & Catalogs', 'Stripe / Apple Pay / Google Pay', 'Inventory & Order Tracking', 'Conversion-Rate Optimization'],
      stack: ['Next.js', 'Stripe API', 'Zustand', 'Tailwind CSS'],
    },
    {
      id: 'ai-integration',
      title: 'AI & Cloud Integrations',
      icon: Cpu,
      description: 'Integrating modern AI models (Gemini, OpenAI, Claude), LLM workflow automation, vector search, and cloud deployments on Vercel or AWS.',
      deliverables: ['Gemini / AI Agent Integration', 'Document & Text Embeddings', 'Automated CI/CD Deployment', 'Cloud Run & Docker Containers'],
      stack: ['Google GenAI SDK', 'Docker', 'Vercel', 'Cloud Run'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F8F5EE] border-b border-[#11261B]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SPECIALIZED OFFERINGS</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4">
            My Services
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4 rounded-full" />
          <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed">
            Comprehensive web engineering services tailored to bring high-performance web applications from concept to production.
          </p>
        </div>

        {/* Services Grid (8 dedicated cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceDetails.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-[#F2EDE2] rounded-2xl p-6 border border-[#11261B]/10 hover:border-[#C5A059] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:translate-y-[-3px]"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#11261B] text-[#C5A059] flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 group-hover:bg-[#1A3828] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-[#11261B] group-hover:text-[#C5A059] transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#5C6E61] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-1.5 mb-4 pt-3 border-t border-[#11261B]/10">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#11261B] mb-1">
                      Deliverables:
                    </div>
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#11261B]/80">
                        <CheckCircle className="w-3 h-3 text-[#C5A059] shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="pt-3 border-t border-[#11261B]/10 flex flex-wrap gap-1">
                  {service.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium text-[#11261B] bg-white px-2 py-0.5 rounded-md border border-[#11261B]/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#11261B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-[#C5A059]/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="text-sm font-bold text-white">Need a custom solution or consultation?</div>
              <div className="text-xs text-[#A3B8A8]">I am currently accepting new freelance and contract opportunities.</div>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFC285] text-[#11261B] text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

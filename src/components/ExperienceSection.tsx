import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Sparkles, Star, TrendingUp, Users, Clock, ArrowUpRight } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';

interface ExperienceSectionProps {
  profile: DeveloperProfile;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ profile }) => {
  const experiences = [
    {
      role: 'Full-Stack Web Developer',
      company: 'Freelance & Independent Contractor',
      period: '2024 – Present',
      location: 'Remote Worldwide',
      badge: 'Current Role',
      description: 'Architecting and shipping responsive web apps, SaaS platforms, and headless e-commerce stores for founders, startups, and international businesses.',
      achievements: [
        'Built 30+ production web applications with 100% on-time milestone delivery.',
        'Engineered high-concurrency REST & GraphQL APIs with JWT authentication and Redis caching.',
        'Achieved 95+ average Lighthouse performance, accessibility, and SEO scores.',
        'Implemented custom Stripe payment gateways with webhook security and instant settlement.',
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    },
    {
      role: 'Frontend & UI Engineer',
      company: 'Client Contracts & Web Agencies',
      period: '2023 – 2024',
      location: 'Remote',
      badge: 'Contract',
      description: 'Collaborated directly with designers and backend teams to convert complex Figma design systems into reusable, responsive React component libraries.',
      achievements: [
        'Reduced frontend bundle sizes by 35% through dynamic code-splitting and asset optimization.',
        'Standardized design system tokens with Tailwind CSS across multi-page client websites.',
        'Integrated client-side state management with Zustand and TanStack Query for zero-latency UI updates.',
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vite', 'Figma'],
    },
    {
      role: 'Web Developer & Open Source Contributor',
      company: 'Community & Academic Projects',
      period: '2022 – 2023',
      location: 'Pakistan',
      badge: 'Milestone',
      description: 'Developed modern full-stack web applications, participated in hackathons, and contributed to developer tooling repositories on GitHub.',
      achievements: [
        'Published 15+ open-source developer toolkits, starter templates, and UI components on GitHub.',
        'Mentored aspiring web developers in JavaScript fundamentals and modern CSS techniques.',
      ],
      stack: ['JavaScript (ES6+)', 'HTML5/CSS3', 'Node.js', 'Express', 'Git', 'MongoDB'],
    },
  ];

  const stats = [
    { label: 'Completed Projects', value: profile.projectsCompleted, icon: Briefcase },
    { label: 'Client Satisfaction', value: profile.happyClients, icon: Star },
    { label: 'Years of Experience', value: profile.yearsOfExperience, icon: Clock },
    { label: 'Code Quality Rating', value: '100%', icon: TrendingUp },
  ];

  const titleChars = 'Experience & Journey'.split('');

  return (
    <section id="experience" className="py-20 bg-[#F8F5EE] border-b border-[#11261B]/10 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2 px-3 py-1 rounded-full bg-white border border-[#C5A059]/30 animate-shimmer">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
            <span>CAREER & TRACK RECORD</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4 select-none">
            {titleChars.map((char, index) => (
              <span key={index} className="hover-letter-bounce cursor-pointer">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4 rounded-full" />
          <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed">
            A proven record of delivering reliable web software, collaborating across timezones, and creating scalable digital products.
          </p>
        </div>

        {/* Highlight Stats Row with Number Bounce & Glowing Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#F2EDE2] p-6 rounded-2xl border border-[#11261B]/10 shadow-xs flex items-center gap-4 hover:border-[#C5A059] hover:shadow-xl transition-all duration-500 group hover:-translate-y-1.5 animate-shimmer cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#1A3828] group-hover:rotate-6 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#11261B] group-hover:text-[#C5A059] tabular-nums leading-none mb-1 transition-colors number-badge-glow inline-block">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#5C6E61] font-semibold">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Stack with Connecting Pulse Node Line */}
        <div className="space-y-8 relative">
          <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#C5A059] via-[#11261B]/30 to-transparent" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative lg:pl-16 group"
            >
              {/* Timeline Node Point */}
              <div className="hidden lg:flex absolute left-6 top-8 w-5 h-5 rounded-full bg-[#11261B] border-2 border-[#C5A059] items-center justify-center shadow-md group-hover:scale-125 transition-transform duration-300 group-hover:bg-[#C5A059]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#DFC285] group-hover:bg-[#11261B]" />
              </div>

              {/* Timeline Card */}
              <div className="bg-[#F2EDE2] p-6 sm:p-8 rounded-2xl border border-[#11261B]/10 hover:border-[#C5A059] shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-shimmer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#11261B]/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display text-xl sm:text-2xl font-bold text-[#11261B] group-hover:text-[#C5A059] transition-colors">
                        {exp.role}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#11261B] text-[#DFC285] px-2.5 py-0.5 rounded-full">
                        {exp.badge}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#5C6E61]">
                      {exp.company} · <span className="font-normal text-[#11261B]">{exp.location}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#11261B] bg-white px-3 py-1.5 rounded-lg border border-[#11261B]/10 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 mb-6">
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#11261B]/85 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${i * 30}ms` }}>
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#11261B]/10">
                  {exp.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium text-[#11261B] bg-white px-2.5 py-1 rounded-md border border-[#11261B]/10 hover:border-[#C5A059] hover:bg-[#11261B] hover:text-[#DFC285] transition-all duration-200 cursor-default hover:scale-105"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

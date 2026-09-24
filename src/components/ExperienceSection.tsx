import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Sparkles, Star, TrendingUp, Users, Clock } from 'lucide-react';
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

  return (
    <section id="experience" className="py-20 bg-[#F8F5EE] border-b border-[#11261B]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAREER & TRACK RECORD</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4">
            Experience & Journey
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4 rounded-full" />
          <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed">
            A proven record of delivering reliable web software, collaborating across timezones, and creating scalable digital products.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#F2EDE2] p-6 rounded-2xl border border-[#11261B]/10 shadow-xs flex items-center gap-4 hover:border-[#C5A059] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#11261B] tabular-nums leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#5C6E61] font-semibold">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-[#11261B]/15" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative md:pl-20 group"
            >
              {/* Timeline Marker Dot */}
              <div className="hidden md:flex absolute left-5 top-6 w-6 h-6 rounded-full bg-[#11261B] text-[#C5A059] border-2 border-[#C5A059] items-center justify-center -translate-x-1/2 z-10 shadow-xs group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#C5A059]" />
              </div>

              {/* Experience Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#11261B]/10 shadow-xs hover:shadow-lg hover:border-[#C5A059] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-[#11261B]/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#11261B] px-2.5 py-1 rounded-md inline-block mb-2">
                      {exp.badge}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#11261B]">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[#5C6E61] mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1 text-xs text-[#5C6E61]">
                    <div className="flex items-center gap-1.5 font-bold text-[#11261B]">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#5C6E61]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Key Accomplishments */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#11261B] mb-2">
                    Key Achievements & Deliverables:
                  </div>
                  {exp.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#11261B]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="leading-snug">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-[#11261B]/10 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#5C6E61] mr-2">Technologies:</span>
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-semibold text-[#11261B] bg-[#F2EDE2] px-2.5 py-1 rounded-lg border border-[#11261B]/5"
                    >
                      {tech}
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

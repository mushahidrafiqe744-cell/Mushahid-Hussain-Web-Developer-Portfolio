import React from 'react';
import { Lightbulb, Monitor, Clock, Award, Smile, Sparkles, Check, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export const WhyChooseMeSection: React.FC = () => {
  const pillars = [
    {
      icon: Lightbulb,
      title: 'Creative Architecture',
      subtitle: 'Clean & Scalable Code',
      description: 'Writing maintainable, modular TypeScript and React code with clear patterns and zero technical debt.',
    },
    {
      icon: Monitor,
      title: 'Modern UI/UX Design',
      subtitle: 'Pixel-Perfect Fidelity',
      description: 'Translating designs into fluid, responsive, and accessible interfaces that engage users across devices.',
    },
    {
      icon: Clock,
      title: 'Fast Delivery & Communication',
      subtitle: '100% On-Time Delivery',
      description: 'Transparent updates, sprint milestones, and rapid turnarounds without compromising on code quality.',
    },
    {
      icon: Award,
      title: 'High Code Quality',
      subtitle: 'Tested & Documented',
      description: 'Rigorous unit testing, type safety, automated linting, and comprehensive documentation.',
    },
    {
      icon: Smile,
      title: 'Client Satisfaction',
      subtitle: 'Long-Term Reliability',
      description: 'Dedicated post-launch support, clear communication, and guaranteed satisfaction on every project.',
    },
  ];

  const workflowSteps = [
    { num: '01', title: 'Discovery & Scope', desc: 'Understanding your goals, technical specifications, and user requirements.' },
    { num: '02', title: 'Architecture & Design', desc: 'Designing component trees, API contracts, database schemas, and UI flows.' },
    { num: '03', title: 'Agile Development', desc: 'Iterative coding with regular demos, clean Git commits, and responsive testing.' },
    { num: '04', title: 'Optimization & Launch', desc: 'Lighthouse audit, SEO metadata, security hardening, and deployment.' },
  ];

  return (
    <section id="why-choose-me" className="py-20 bg-[#F8F5EE] border-b border-[#11261B]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VALUE PROPOSITION</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4">
            Why Choose Me?
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4 rounded-full" />
          <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed">
            I don't just build websites; I craft high-performance digital products engineered to scale with your business goals.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F2EDE2] p-6 rounded-2xl border border-[#11261B]/10 hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:translate-y-[-3px]"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center mb-4 shadow-sm border border-[#C5A059]/30 group-hover:scale-110 group-hover:bg-[#1A3828] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#11261B] group-hover:text-[#C5A059] transition-colors mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-2.5">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs text-[#5C6E61] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Development Process / Workflow Grid */}
        <div className="bg-[#11261B] text-white p-8 sm:p-10 rounded-2xl border border-[#C5A059]/30 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C5A059] block mb-1">
              HOW I WORK
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              The 4-Step Engineering Workflow
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.num} className="bg-white/5 p-5 rounded-xl border border-white/10 relative">
                <span className="font-display font-black text-3xl text-[#C5A059]/50 block mb-2">
                  {step.num}
                </span>
                <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
                <p className="text-xs text-[#A3B8A8] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { FileText, Download, Printer, ExternalLink, Sparkles, Check, GraduationCap, Award, Briefcase, Code2 } from 'lucide-react';
import { DeveloperProfile, Project, SkillGroup } from '../types/portfolio';

interface ResumeSectionProps {
  profile: DeveloperProfile;
  projects: Project[];
  skillGroups: SkillGroup[];
  onOpenFullModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  profile,
  projects,
  skillGroups,
  onOpenFullModal,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const content = `# ${profile.name} - ${profile.title}
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}
GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}

---

## PROFESSIONAL SUMMARY
${profile.bioAbout}

---

## TECHNICAL SKILLS
- **Core Languages & Frameworks**: React, Next.js, TypeScript, JavaScript (ES6+), Node.js, Express, HTML5/CSS3, Tailwind CSS
- **Databases & Cloud**: PostgreSQL, MongoDB, Redis, Supabase, Docker, Vercel
- **Engineering Competencies**: Full-Stack Architecture, REST & GraphQL APIs, State Management, Performance Tuning

---

## WORK EXPERIENCE
### Freelance Web & Full-Stack Developer (2024 – Present)
- Built 30+ production web applications with 100% on-time milestone delivery.
- Implemented headless e-commerce storefronts with Stripe payment integration.
- Architected RESTful and GraphQL API backends with JWT authentication and Redis caching.

---

## EDUCATION
- **Bachelor of Science in Computer Science** (2020 – 2024)
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}_Resume.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-20 bg-[#F2EDE2] border-b border-[#11261B]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURRICULUM VITAE</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4">
            Downloadable Resume
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4 rounded-full" />
          <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed">
            Review my professional background, education, and technical competencies. Available for instant preview, print export, or file download.
          </p>
        </div>

        {/* Resume Preview Sheet */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-[#11261B]/15 overflow-hidden">
          
          {/* Top Sheet Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#11261B] text-white border-b border-[#C5A059]/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C5A059] text-[#11261B] flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Official Developer Resume</span>
                <span className="text-[10px] text-[#A3B8A8]">Last updated for {new Date().getFullYear()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Markdown (.md)</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFC285] text-xs font-bold text-[#11261B] transition-colors shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Embedded CV Body */}
          <div className="p-8 sm:p-12 text-[#11261B]">
            
            {/* Header Lockup */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-[#11261B] mb-8">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#11261B]">
                  {profile.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C5A059] mt-1">
                  {profile.title} & Full-Stack Engineer
                </p>
              </div>

              <div className="text-xs text-[#5C6E61] space-y-1 sm:text-right font-medium">
                <div>{profile.email} · {profile.phone}</div>
                <div>{profile.location} · {profile.github.replace('https://', '')}</div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1.5 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <span>Executive Summary</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#11261B]/80 leading-relaxed">
                {profile.bioAbout} Experienced in translating complex business requirements into high-performance, responsive web applications with type safety and scalable database schemas.
              </p>
            </div>

            {/* Core Skills Matrix */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1.5 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <span>Technical Skills Matrix</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#11261B]/5">
                  <span className="font-bold text-[#11261B] block mb-1">Frontend Engineering:</span>
                  <span className="text-[#5C6E61]">React, Next.js, TypeScript, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3</span>
                </div>
                <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#11261B]/5">
                  <span className="font-bold text-[#11261B] block mb-1">Backend & APIs:</span>
                  <span className="text-[#5C6E61]">Node.js, Express, RESTful APIs, GraphQL, JWT/OAuth Authentication</span>
                </div>
                <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#11261B]/5">
                  <span className="font-bold text-[#11261B] block mb-1">Databases & Caching:</span>
                  <span className="text-[#5C6E61]">PostgreSQL, MongoDB, Redis, Supabase, Prisma, Drizzle ORM</span>
                </div>
                <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#11261B]/5">
                  <span className="font-bold text-[#11261B] block mb-1">DevOps & Best Practices:</span>
                  <span className="text-[#5C6E61]">Docker, Git, CI/CD Pipelines, SEO Optimization, Core Web Vitals</span>
                </div>
              </div>
            </div>

            {/* Experience Highlights */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1.5 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <span>Professional Experience</span>
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sm text-[#11261B]">Freelance Web & Full-Stack Developer</span>
                    <span className="text-[#5C6E61] font-semibold">2024 – Present</span>
                  </div>
                  <div className="text-xs text-[#C5A059] font-medium mb-1.5">Remote Contracting</div>
                  <ul className="list-disc list-inside text-xs text-[#11261B]/80 space-y-1 pl-1">
                    <li>Engineered 30+ responsive web applications with 99.8% client satisfaction.</li>
                    <li>Designed headless e-commerce stores with Stripe payments and live product catalogs.</li>
                    <li>Architected scalable RESTful API services with JWT token authentication and Redis caching.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education & Certs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1.5 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <span>Education & Certifications</span>
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div>
                  <span className="font-bold text-[#11261B]">Bachelor of Science in Computer Science</span>
                  <div className="text-[#5C6E61]">Software Engineering & Web Systems (2020 – 2024)</div>
                </div>
                <div className="text-xs text-[#5C6E61]">
                  <span className="font-bold text-[#11261B]">Certifications:</span> Meta Certified Front-End Developer
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Card Footer */}
          <div className="px-6 py-4 bg-[#F8F5EE] border-t border-[#11261B]/10 flex items-center justify-between">
            <span className="text-xs text-[#5C6E61]">Ready to interview or collaborate?</span>
            <button
              onClick={onOpenFullModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#11261B] hover:text-[#C5A059] transition-colors"
            >
              <span>Expand Full Modal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, Github, Linkedin, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';
import { DeveloperProfile, Project, SkillGroup } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
  projects: Project[];
  skillGroups: SkillGroup[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  skillGroups,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
- **Engineering Competencies**: Full-Stack Architecture, REST & GraphQL APIs, State Management (Zustand/Redux), Authentication (OAuth/JWT), SEO & Web Vitals Optimization

---

## WORK EXPERIENCE
### Freelance Web & Full-Stack Developer (2024 – Present)
- Designed and engineered 30+ responsive, production-ready web applications for global clients.
- Implemented headless e-commerce storefronts with Stripe payment integration, achieving Lighthouse 98 scores.
- Architected RESTful and GraphQL API backends with JWT authentication and Redis caching.
- Collaborated directly with founders and product teams to translate Figma wireframes into performant, accessible React components.

---

## FEATURED PROJECTS
${projects
  .map(
    (p) => `### ${p.title} (${p.categoryLabel}, ${p.year})
- **Stack**: ${p.technologies.join(', ')}
- **Description**: ${p.description}
- **GitHub**: ${p.githubUrl}
- **Live Demo**: ${p.liveUrl}
- **Key Highlights**:
${p.features.map((f) => `  * ${f}`).join('\n')}`
  )
  .join('\n\n')}

---

## EDUCATION & CERTIFICATIONS
- **Bachelor of Science in Computer Science** (2020 – 2024)
- **Meta Certified Front-End Developer**
- **Full Stack Web Development Professional Certification**
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#11261B]/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#11261B]/20 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#11261B] text-white border-b border-[#C5A059]/30 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Curriculum Vitae Preview
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-[#A3B8A8]">Printable & PDF Export</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Markdown (.md)</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFC285] text-xs font-bold text-[#11261B] transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-[#11261B] font-sans printable-resume">
          
          {/* Header */}
          <div className="border-b-2 border-[#11261B] pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#11261B] leading-none">
                  {profile.name}
                </h1>
                <p className="text-sm font-bold uppercase tracking-widest text-[#C5A059] mt-1.5">
                  {profile.title} & Full-Stack Engineer
                </p>
              </div>

              {/* Contact Chips */}
              <div className="text-xs text-[#5C6E61] space-y-1 sm:text-right">
                <div>{profile.email} · {profile.phone}</div>
                <div>{profile.location} · {profile.github.replace('https://', '')}</div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1 mb-2.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#11261B]/80 leading-relaxed">
              {profile.bioAbout} Experienced in translating complex business and product requirements into clean, high-performance web applications with modular component design, type safety, and optimized database pipelines.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1 mb-2.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs">
              <div>
                <span className="font-bold text-[#11261B]">Frontend: </span>
                <span className="text-[#5C6E61]">React, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3</span>
              </div>
              <div>
                <span className="font-bold text-[#11261B]">Backend: </span>
                <span className="text-[#5C6E61]">Node.js, Express, REST APIs, GraphQL, Authentication (JWT/OAuth)</span>
              </div>
              <div>
                <span className="font-bold text-[#11261B]">Databases & Cloud: </span>
                <span className="text-[#5C6E61]">PostgreSQL, MongoDB, Redis, Supabase, Docker, Vercel, Git</span>
              </div>
              <div>
                <span className="font-bold text-[#11261B]">Architecture & Best Practices: </span>
                <span className="text-[#5C6E61]">Responsive Design, Core Web Vitals, SEO, CI/CD, Unit Testing</span>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1 mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sm text-[#11261B]">Freelance Web & Full-Stack Developer</span>
                  <span className="text-[#5C6E61] font-medium">2024 – Present</span>
                </div>
                <div className="text-xs text-[#C5A059] font-semibold mb-1.5">Remote / Independent Contracting</div>
                
                <ul className="list-disc list-inside text-xs text-[#11261B]/80 space-y-1 pl-1">
                  <li>Engineered over 30+ responsive web applications, single-page apps, and custom landing platforms.</li>
                  <li>Delivered headless e-commerce stores with Stripe checkout and automated inventory synchronization.</li>
                  <li>Constructed scalable RESTful API services in Express & TypeScript with rate limiting and database indexing.</li>
                  <li>Achieved 95+ average Google Lighthouse scores across Core Web Vitals, accessibility, and SEO audits.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1 mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span>Selected Key Projects</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 rounded-lg bg-[#F8F5EE] border border-[#11261B]/10">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#11261B]">{p.title}</span>
                    <span className="text-[10px] text-[#5C6E61]">{p.year}</span>
                  </div>
                  <div className="text-[11px] text-[#C5A059] font-medium mb-1 truncate">
                    {p.technologies.slice(0, 4).join(', ')}
                  </div>
                  <p className="text-[11px] text-[#5C6E61] line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#11261B] border-b border-[#11261B]/15 pb-1 mb-2.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span>Education & Certifications</span>
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
              <div>
                <span className="font-bold text-[#11261B]">Bachelor of Science in Computer Science</span>
                <div className="text-[#5C6E61]">Software Engineering & Web Architecture (2020 – 2024)</div>
              </div>
              <div className="text-xs text-[#5C6E61] sm:text-right">
                <span className="font-semibold text-[#11261B]">Certifications:</span> Meta Front-End Certified, Full-Stack Specialist
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

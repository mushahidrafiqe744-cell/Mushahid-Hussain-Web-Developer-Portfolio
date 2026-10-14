import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import {
  initialProfile,
  initialServices,
  initialSkillGroups,
  initialProjects,
  initialCourses,
  initialTestimonials,
} from './data/portfolioData';
import { SectionId, Project } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CoursesSection } from './components/CoursesSection';
import { WhyChooseMeSection } from './components/WhyChooseMeSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';

const SECTION_HASH_MAP: Record<string, SectionId> = {
  hero: 'hero',
  home: 'hero',
  about: 'about',
  services: 'services',
  skills: 'skills',
  experience: 'experience',
  courses: 'courses',
  certifications: 'courses',
  'why-choose-me': 'why-choose-me',
  testimonials: 'testimonials',
  reviews: 'testimonials',
  feedback: 'testimonials',
  projects: 'projects',
  resume: 'resume',
  contact: 'contact',
};

const SECTION_TITLES: Record<SectionId, string> = {
  hero: 'Web Developer Portfolio',
  about: 'About Me',
  services: 'Services & Solutions',
  skills: 'Technical Skills & Stack',
  experience: 'Professional Experience',
  courses: 'Verified Courses & Official Accreditations',
  'why-choose-me': 'Why Choose Me',
  testimonials: 'Client Testimonials & Feedback',
  projects: 'Featured Projects & Work',
  resume: 'Resume & Credentials',
  contact: 'Contact & Work Together',
};

const getInitialSection = (): SectionId => {
  if (typeof window === 'undefined') return 'hero';
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  return hash && SECTION_HASH_MAP[hash] ? SECTION_HASH_MAP[hash] : 'hero';
};

export default function App() {
  const [profile] = useState(() => initialProfile);
  const [projects] = useState(() => initialProjects);
  const [activeSection, setActiveSection] = useState<SectionId>(() => getInitialSection());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const section = getInitialSection();
      setActiveSection(section);
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const title = SECTION_TITLES[activeSection] || 'Web Developer Portfolio';
    document.title =
      activeSection === 'hero'
        ? `${profile.name} - Web Developer Portfolio`
        : `${title} — ${profile.name}`;

    const hashName = activeSection === 'hero' ? 'home' : activeSection;
    const currentHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (
      currentHash !== hashName &&
      !(activeSection === 'hero' && (currentHash === 'home' || currentHash === 'hero' || currentHash === ''))
    ) {
      window.history.pushState(null, '', `#${hashName}`);
    }
  }, [activeSection, profile.name]);

  const handleSelectSection = (section: SectionId) => {
    setActiveSection(section);
    const hashName = section === 'hero' ? 'home' : section;
    if (window.location.hash !== `#${hashName}`) {
      window.history.pushState(null, '', `#${hashName}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#11261B] selection:bg-[#C5A059] selection:text-white">
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      <main className="flex-1">
        {activeSection === 'hero' && (
          <Hero
            profile={profile}
            onOpenSection={handleSelectSection}
            onOpenResume={() => setIsResumeModalOpen(true)}
          />
        )}
        {activeSection === 'about' && <AboutSection profile={profile} />}
        {activeSection === 'services' && (
          <ServicesSection
            services={initialServices}
            adminPhone={profile.whatsapp || profile.phone}
          />
        )}
        {activeSection === 'skills' && <SkillsSection skillGroups={initialSkillGroups} />}
        {activeSection === 'experience' && <ExperienceSection profile={profile} />}
        {activeSection === 'courses' && <CoursesSection courses={initialCourses} />}
        {activeSection === 'why-choose-me' && <WhyChooseMeSection />}
        {activeSection === 'testimonials' && (
          <TestimonialsSection
            testimonials={initialTestimonials}
            onOpenContact={() => handleSelectSection('contact')}
          />
        )}
        {activeSection === 'projects' && (
          <ProjectsSection
            projects={projects}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}
        {activeSection === 'resume' && (
          <ResumeSection
            profile={profile}
            projects={projects}
            skillGroups={initialSkillGroups}
            courses={initialCourses}
            onOpenFullModal={() => setIsResumeModalOpen(true)}
          />
        )}
        {activeSection === 'contact' && (
          <ContactSection
            profile={profile}
            onOpenResume={() => setIsResumeModalOpen(true)}
          />
        )}

        {activeSection !== 'hero' && (
          <div className="py-8 bg-[#F8F5EE] border-t border-[#11261B]/10 text-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleSelectSection('hero');
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#11261B] text-white hover:bg-[#1A3828] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <Home className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Back to Home (Hero)</span>
            </a>
          </div>
        )}
      </main>

      <Footer
        profile={profile}
        onSelectSection={handleSelectSection}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        profile={profile}
        projects={projects}
        skillGroups={initialSkillGroups}
        courses={initialCourses}
      />
    </div>
  );
}

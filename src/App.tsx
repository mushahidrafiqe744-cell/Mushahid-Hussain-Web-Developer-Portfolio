import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WhyChooseMeSection } from './components/WhyChooseMeSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import {
  initialProfile,
  initialServices,
  initialSkillGroups,
  initialProjects,
} from './data/portfolioData';
import { DeveloperProfile, Project, SectionId } from './types/portfolio';
import { Home } from 'lucide-react';

const VALID_SECTIONS: Record<string, SectionId> = {
  hero: 'hero',
  home: 'hero',
  about: 'about',
  services: 'services',
  skills: 'skills',
  experience: 'experience',
  'why-choose-me': 'why-choose-me',
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
  'why-choose-me': 'Why Choose Me',
  projects: 'Featured Projects & Work',
  resume: 'Resume & Credentials',
  contact: 'Contact & Work Together',
};

const getSectionFromHash = (): SectionId => {
  if (typeof window === 'undefined') return 'hero';
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (rawHash && VALID_SECTIONS[rawHash]) {
    return VALID_SECTIONS[rawHash];
  }
  return 'hero';
};

export default function App() {
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    return initialProfile;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    return initialProjects;
  });

  // Initialize activeSection from URL hash (e.g. #projects, #services, #contact, #home)
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    return getSectionFromHash();
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync state when URL hash changes (back/forward buttons or direct hash edit)
  useEffect(() => {
    const handleHashChange = () => {
      const sectionFromHash = getSectionFromHash();
      setActiveSection(sectionFromHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Sync document title and current URL hash whenever activeSection changes
  useEffect(() => {
    const titleSnippet = SECTION_TITLES[activeSection] || 'Web Developer Portfolio';
    document.title = activeSection === 'hero' 
      ? `${profile.name} - Web Developer Portfolio` 
      : `${titleSnippet} — ${profile.name}`;

    const targetHash = activeSection === 'hero' ? 'home' : activeSection;
    const currentHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (currentHash !== targetHash && !(activeSection === 'hero' && (currentHash === 'home' || currentHash === 'hero' || currentHash === ''))) {
      window.history.pushState(null, '', `#${targetHash}`);
    }
  }, [activeSection, profile.name]);

  const handleSelectSection = (section: SectionId) => {
    setActiveSection(section);
    const targetHash = section === 'hero' ? 'home' : section;
    if (window.location.hash !== `#${targetHash}`) {
      window.history.pushState(null, '', `#${targetHash}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#11261B] selection:bg-[#C5A059] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Section Area */}
      <main className="flex-1">

        {/* 1. Hero Section (Opened when activeSection is 'hero' or clicking the logo) */}
        {activeSection === 'hero' && (
          <Hero
            profile={profile}
            onOpenSection={handleSelectSection}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}

        {/* 2. About Section */}
        {activeSection === 'about' && (
          <AboutSection profile={profile} />
        )}

        {/* 3. Services Section */}
        {activeSection === 'services' && (
          <ServicesSection
            services={initialServices}
            adminPhone={profile.whatsapp || profile.phone}
          />
        )}

        {/* 4. Skills Section */}
        {activeSection === 'skills' && (
          <SkillsSection skillGroups={initialSkillGroups} />
        )}

        {/* 5. Experience Section */}
        {activeSection === 'experience' && (
          <ExperienceSection profile={profile} />
        )}

        {/* 6. Why Choose Me Section */}
        {activeSection === 'why-choose-me' && (
          <WhyChooseMeSection />
        )}

        {/* 7. Projects Section */}
        {activeSection === 'projects' && (
          <ProjectsSection
            projects={projects}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}

        {/* 8. Resume Section */}
        {activeSection === 'resume' && (
          <ResumeSection
            profile={profile}
            projects={projects}
            skillGroups={initialSkillGroups}
            onOpenFullModal={() => setIsResumeOpen(true)}
          />
        )}

        {/* 9. Contact Section */}
        {activeSection === 'contact' && (
          <ContactSection
            profile={profile}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}

        {/* If inside any sub-section, provide a quick return button back to Home/Hero */}
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

      {/* Footer */}
      <Footer
        profile={profile}
        onSelectSection={handleSelectSection}
      />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Downloadable & Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        projects={projects}
        skillGroups={initialSkillGroups}
      />
    </div>
  );
}

import React, { useState } from 'react';
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
import { EditProfileDrawer } from './components/EditProfileDrawer';
import { Footer } from './components/Footer';
import {
  initialProfile,
  initialServices,
  initialSkillGroups,
  initialProjects,
} from './data/portfolioData';
import { DeveloperProfile, Project, SectionId } from './types/portfolio';
import { Home } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    try {
      const saved = localStorage.getItem('developer_profile_data');
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('developer_projects_data');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  // Default active section is 'hero' (opened initially & when clicking the logo)
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSelectSection = (section: SectionId) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = (newProfile: DeveloperProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('developer_profile_data', JSON.stringify(newProfile));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetDefaults = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    try {
      localStorage.removeItem('developer_profile_data');
      localStorage.removeItem('developer_projects_data');
    } catch (err) {
      console.error(err);
    }
    setIsEditOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#11261B] selection:bg-[#C5A059] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenEdit={() => setIsEditOpen(true)}
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
          <ServicesSection services={initialServices} />
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

        {/* If inside any sub-section, provide a quick return button back to Hero */}
        {activeSection !== 'hero' && (
          <div className="py-8 bg-[#F8F5EE] border-t border-[#11261B]/10 text-center">
            <button
              onClick={() => handleSelectSection('hero')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#11261B] text-white hover:bg-[#1A3828] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <Home className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Back to Home (Hero)</span>
            </button>
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

      {/* Profile Customizer Drawer */}
      <EditProfileDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}

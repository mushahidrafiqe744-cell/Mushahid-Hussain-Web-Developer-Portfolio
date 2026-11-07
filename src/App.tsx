import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLogin } from './components/Admin/AdminLogin';
import { DashboardLayout } from './components/Admin/DashboardLayout';
import { AdminOverview } from './components/Admin/AdminOverview';
import { ManageHero } from './components/Admin/ManageHero';
import { ManageAbout } from './components/Admin/ManageAbout';
import { ManageProjects } from './components/Admin/ManageProjects';
import { ManageSkills } from './components/Admin/ManageSkills';
import { ManageServices } from './components/Admin/ManageServices';
import { ManageTestimonials } from './components/Admin/ManageTestimonials';
import { ManageMessages } from './components/Admin/ManageMessages';
import { ManageSettings } from './components/Admin/ManageSettings';
import { ManageExperience } from './components/Admin/ManageExperience';
import { ManageCourses } from './components/Admin/ManageCourses';
import { ManageWhyUs } from './components/Admin/ManageWhyUs';
import { cmsService } from './services/cms';
import {
  initialProfile,
  initialServices,
  initialSkillGroups,
  initialProjects,
  initialCourses,
  initialTestimonials,
} from './data/portfolioData';
import { SectionId, Project, SkillGroup } from './types/portfolio';
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
import { FeedbackModal } from './components/FeedbackModal';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ScrollIsland } from './components/ScrollIsland';
import { SCROLL_TOPICS } from './data/scrollTopics';

const SECTION_HASH_MAP: Record<string, SectionId> = {
  hero: 'hero', home: 'hero', about: 'about', services: 'services',
  skills: 'skills', experience: 'experience', courses: 'courses',
  'why-choose-me': 'why-choose-me', testimonials: 'testimonials',
  projects: 'projects', resume: 'resume', contact: 'contact',
};

const SECTION_TITLES: Record<SectionId, string> = {
  hero: 'Web Developer Portfolio', about: 'About Me', services: 'Services & Solutions',
  skills: 'Technical Skills & Stack', experience: 'Professional Experience',
  courses: 'Certifications & Accreditations', 'why-choose-me': 'Why Choose Me',
  testimonials: 'Client Feedback', projects: 'Featured Projects',
  resume: 'Resume & Credentials', feedback: 'Leave Feedback', contact: 'Contact Me',
};

const getInitialSection = (): SectionId => {
  if (typeof window === 'undefined') return 'hero';
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  return hash && SECTION_HASH_MAP[hash] ? SECTION_HASH_MAP[hash] : 'hero';
};

function PortfolioMain() {
  const [profile, setProfile] = useState(() => initialProfile);
  const [projects, setProjects] = useState<any[]>(() => initialProjects);
  const [services, setServices] = useState<any[]>(() => initialServices);
  const [testimonials, setTestimonials] = useState<any[]>(() => initialTestimonials);
  const [skills, setSkills] = useState<SkillGroup[]>(() => initialSkillGroups);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>(() => initialCourses);
  const [whyUs, setWhyUs] = useState<{ pillars: any[], workflow: any[] }>({ pillars: [], workflow: [] });
  const [settings, setSettings] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<SectionId>(() => getInitialSection());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const loadCmsFrontendData = async () => {
    try {
      const [pData, projData, sData, tData, skData, eData, cData, wData, setData] = await Promise.all([
        cmsService.fetchData('profiles'),
        cmsService.fetchData('projects'),
        cmsService.fetchData('services'),
        cmsService.fetchData('testimonials'),
        cmsService.fetchData('skills'),
        cmsService.fetchData('experiences'),
        cmsService.fetchData('courses'),
        cmsService.fetchData('why_us'),
        cmsService.fetchData('settings')
      ]);

      if (pData?.[0]) {
          const p = pData[0];
          setProfile(prev => ({
            ...prev, ...p,
            projectsCompleted: p.projectsCompleted || prev.projectsCompleted,
            yearsOfExperience: p.yearsOfExperience || prev.yearsOfExperience,
            happyClients: p.happyClients || prev.happyClients
          }));
      }
      
      if (projData?.length) setProjects(projData.map((p: any) => ({
          ...p,
          imageUrl: p.imageUrl || p.image,
          technologies: Array.isArray(p.technologies) ? p.technologies : []
      })));
      
      if (sData?.length) setServices(sData);
      
      if (tData?.length) setTestimonials(tData);
      
      if (skData?.length) {
          const groups: Record<string, any[]> = {};
          skData.forEach((s: any) => {
              const cat = s.category || 'Technical';
              if (!groups[cat]) groups[cat] = [];
              groups[cat].push({ name: s.name, levelPercentage: s.percentage, iconName: s.icon });
          });
          setSkills(Object.keys(groups).map(cat => ({ category: cat, skills: groups[cat], items: groups[cat] })));
      }

      if (eData?.length) setExperiences(eData);
      if (cData?.length) setCourses(cData);
      
      if (wData?.length) {
          setWhyUs({
              pillars: wData.filter((i: any) => i.type === 'pillar'),
              workflow: wData.filter((i: any) => i.type === 'workflow')
          });
      }

      if (setData?.[0]) {
          const s = setData[0];
          setSettings(s);
          if (s.themePrimary) document.documentElement.style.setProperty('--primary-dark', s.themePrimary);
          if (s.themeAccent) document.documentElement.style.setProperty('--accent-green', s.themeAccent);
          if (s.title) document.title = s.title;
      }
    } catch (err) {
      console.warn('Frontend CMS sync error', err);
    }
  };

  useEffect(() => {
    loadCmsFrontendData();
    window.addEventListener('cms_data_updated', loadCmsFrontendData);
    
    // Cross-window/iframe sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cms_sync_trigger') {
        loadCmsFrontendData();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('cms_data_updated', loadCmsFrontendData);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => setActiveSection(getInitialSection());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectSection = (section: SectionId) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#11261B]" style={{ fontFamily: settings?.fontFamily || 'Inter, sans-serif' }}>
      <Navbar 
        profile={profile} 
        activeSection={activeSection} 
        onSelectSection={handleSelectSection} 
        onOpenResume={() => setIsResumeModalOpen(true)} 
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
        customLinks={settings?.navbarItems} 
      />
      <main className="flex-1">
        {activeSection === 'hero' && <Hero profile={profile} onOpenSection={handleSelectSection} onOpenResume={() => setIsResumeModalOpen(true)} />}
        {activeSection === 'about' && <AboutSection profile={profile} />}
        {activeSection === 'services' && <ServicesSection services={services} adminPhone={profile.whatsapp || profile.phone} />}
        {activeSection === 'skills' && <SkillsSection skillGroups={skills} />}
        {activeSection === 'experience' && <ExperienceSection profile={profile} experiences={experiences} />}
        {activeSection === 'courses' && <CoursesSection courses={courses} />}
        {activeSection === 'why-choose-me' && <WhyChooseMeSection pillars={whyUs.pillars} workflow={whyUs.workflow} />}
        {activeSection === 'testimonials' && <TestimonialsSection testimonials={testimonials} onOpenContact={() => handleSelectSection('contact')} onOpenFeedback={() => setIsFeedbackModalOpen(true)} />}
        {activeSection === 'projects' && <ProjectsSection projects={projects.filter((p: any) => !p.hidden)} onSelectProject={setSelectedProject} />}
        {activeSection === 'resume' && <ResumeSection profile={profile} projects={projects.filter((p: any) => !p.hidden)} skillGroups={skills} experiences={experiences} courses={courses} onOpenFullModal={() => setIsResumeModalOpen(true)} />}
        {activeSection === 'contact' && <ContactSection profile={profile} onOpenResume={() => setIsResumeModalOpen(true)} />}
      </main>
      <Footer profile={profile} onSelectSection={handleSelectSection} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} profile={profile} projects={projects} skillGroups={skills} experiences={experiences} courses={courses} />
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
      <ScrollIsland topics={SCROLL_TOPICS} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<DashboardLayout />}>
           <Route index element={<AdminOverview />} />
           <Route path="hero" element={<ManageHero />} />
           <Route path="about" element={<ManageAbout />} />
           <Route path="projects" element={<ManageProjects />} />
           <Route path="experience" element={<ManageExperience />} />
           <Route path="skills" element={<ManageSkills />} />
           <Route path="services" element={<ManageServices />} />
           <Route path="courses" element={<ManageCourses />} />
           <Route path="testimonials" element={<ManageTestimonials />} />
           <Route path="why-us" element={<ManageWhyUs />} />
           <Route path="messages" element={<ManageMessages />} />
           <Route path="settings" element={<ManageSettings />} />
        </Route>
        <Route path="/" element={<PortfolioMain />} />
        <Route path="*" element={<PortfolioMain />} />
      </Routes>
    </BrowserRouter>
  );
}

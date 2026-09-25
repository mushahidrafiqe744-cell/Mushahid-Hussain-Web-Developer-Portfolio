import React, { useState } from 'react';
import { FileText, Send, SlidersHorizontal, Menu, X } from 'lucide-react';
import { DeveloperProfile, SectionId } from '../types/portfolio';
import { EmblemLogo } from './EmblemLogo';

interface NavbarProps {
  profile: DeveloperProfile;
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onOpenResume: () => void;
  onOpenEdit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onSelectSection,
  onOpenResume,
  onOpenEdit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 'ALL' has been removed as requested. Logo click now opens the Hero section.
  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'why-choose-me', label: 'Why Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: SectionId) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#11261B]/10 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Running Circular Line - Clicking this opens the Hero Section */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          title="Click to go to Hero Section"
        >
          <div className="relative transition-transform duration-300 group-hover:scale-105">
            <EmblemLogo size="sm" showSubtitle={false} interactive={true} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#11261B] group-hover:text-[#C5A059] transition-colors leading-none">
                {profile.name}
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#5C6E61] mt-0.5">
              {profile.title}
            </span>
          </div>
        </button>

        {/* Main Nav Links (Without ALL button) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#11261B] text-[#C5A059] shadow-xs'
                    : 'text-[#11261B]/80 hover:text-[#11261B] hover:bg-[#11261B]/5'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenEdit}
            title="Personalize Details"
            className="p-2 text-[#11261B]/70 hover:text-[#11261B] hover:bg-[#11261B]/5 rounded-xl transition-colors cursor-pointer"
            aria-label="Customize profile"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNavClick('resume')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold tracking-wide rounded-xl border transition-all shadow-xs cursor-pointer ${
              activeSection === 'resume'
                ? 'bg-[#11261B] text-[#C5A059] border-[#11261B]'
                : 'bg-white text-[#11261B] border-[#11261B]/15 hover:border-[#C5A059] hover:bg-[#F2EDE2]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>CV</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-sm hover:scale-[1.02] cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-[#C5A059] text-[#11261B]'
                : 'bg-[#11261B] text-white hover:bg-[#1A3828]'
            }`}
          >
            <span>Let's Talk</span>
            <Send className="w-3 h-3" />
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#11261B] hover:bg-[#11261B]/5 rounded-xl transition-colors ml-1 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5EE] border-b border-[#11261B]/10 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-fade-in">
          <button
            onClick={() => handleNavClick('hero')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
              activeSection === 'hero'
                ? 'bg-[#11261B] text-[#C5A059]'
                : 'text-[#11261B] hover:bg-[#F2EDE2]'
            }`}
          >
            <span>Home / Hero</span>
            {activeSection === 'hero' && <span className="w-2 h-2 rounded-full bg-[#C5A059]" />}
          </button>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#11261B] text-[#C5A059]'
                    : 'text-[#11261B] hover:bg-[#F2EDE2]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#C5A059]" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#11261B]/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-[#11261B] bg-white border border-[#11261B]/15 rounded-xl text-center shadow-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#C5A059]" />
              <span>Download PDF Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

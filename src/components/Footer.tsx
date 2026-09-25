import React from 'react';
import { Sparkles, Github, Linkedin, Mail, ArrowUp, Home, Phone } from 'lucide-react';
import { DeveloperProfile, SectionId } from '../types/portfolio';
import { EmblemLogo } from './EmblemLogo';

interface FooterProps {
  profile: DeveloperProfile;
  onSelectSection: (section: SectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onSelectSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <footer className="bg-[#11261B] text-[#F8F5EE] border-t border-[#C5A059]/30">
      
      {/* Top Banner Ribbon */}
      <div className="py-8 border-b border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-3 px-4">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="font-display text-lg sm:text-2xl text-white font-medium">
            Let's Build <span className="font-script text-3xl sm:text-4xl text-[#C5A059] mx-1">Your Next Project</span> Together.
          </span>
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand Lockup with Running Circular Line - Clicking goes to Hero */}
          <button
            onClick={() => onSelectSection('hero')}
            className="flex items-center gap-4 text-center md:text-left cursor-pointer group"
          >
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
              <EmblemLogo size="sm" showSubtitle={false} interactive={true} />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-[#DFC285] transition-colors">
                {profile.name}
              </span>
              <p className="text-xs text-[#A3B8A8] mt-0.5">
                Full-Stack Web Developer · High Performance & Clean Architecture
              </p>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold uppercase tracking-wider text-[#A3B8A8]">
            <button
              onClick={() => onSelectSection('hero')}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onSelectSection(link.id)}
                className="hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/92${profile.phone.replace(/^0+/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center text-white transition-colors"
              aria-label="WhatsApp"
              title="Chat on WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => onSelectSection('contact')}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Contact"
            >
              <Mail className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-[#C5A059] text-[#11261B] hover:bg-[#DFC285] flex items-center justify-center transition-colors ml-2 shadow-xs cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quiet Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3B8A8] gap-4">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with React & TypeScript</span>
            <span aria-hidden="true">·</span>
            <span>Tailwind CSS</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#C5A059]">Production Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

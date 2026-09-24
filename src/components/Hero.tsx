import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Code2, Layers } from 'lucide-react';
import { DeveloperProfile, SectionId } from '../types/portfolio';

interface HeroProps {
  profile: DeveloperProfile;
  onOpenSection: (section: SectionId) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenSection, onOpenResume }) => {
  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Small Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#11261B]/80 mb-2">
              <span>HELLO, I'M</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>

            {/* Massive Display Name & Script Lockup */}
            <div className="relative mb-6">
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#11261B] leading-[0.95]">
                {profile.firstName}
              </h1>
              
              <div className="font-script text-5xl sm:text-6xl lg:text-7xl text-[#C5A059] -mt-3 sm:-mt-5 ml-4 sm:ml-8 transform -rotate-2 select-none pointer-events-none drop-shadow-xs">
                {profile.scriptSubhead}
              </div>
            </div>

            {/* Dark Pill Motto */}
            <div className="inline-block bg-[#11261B] text-[#F8F5EE] text-xs sm:text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full mb-6 shadow-sm border border-[#C5A059]/30">
              {profile.badge}
            </div>

            {/* Bio Paragraph */}
            <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
              {profile.bioHero}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenSection('projects')}
                className="group inline-flex items-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#11261B] hover:bg-[#1A3828] rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                <span>View Projects</span>
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
              </button>

              <button
                onClick={() => onOpenSection('services')}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#11261B] bg-white border border-[#11261B]/20 hover:border-[#C5A059] hover:bg-[#F2EDE2] rounded-full transition-all shadow-xs cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#C5A059]" />
                <span>My Services</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#11261B] bg-white border border-[#11261B]/20 hover:border-[#C5A059] hover:bg-[#F2EDE2] rounded-full transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Quick Metrics Bar with Click to Section */}
            <div className="flex items-center gap-6 sm:gap-10 mt-10 pt-8 border-t border-[#11261B]/10 w-full max-w-lg">
              <button
                onClick={() => onOpenSection('projects')}
                className="text-left group cursor-pointer"
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#11261B] group-hover:text-[#C5A059] transition-colors tabular-nums">
                  {profile.projectsCompleted}
                </div>
                <div className="text-xs text-[#5C6E61] font-medium mt-0.5 group-hover:underline">
                  Projects Delivered ↗
                </div>
              </button>
              <div className="h-8 w-px bg-[#11261B]/15" />
              <button
                onClick={() => onOpenSection('experience')}
                className="text-left group cursor-pointer"
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#11261B] group-hover:text-[#C5A059] transition-colors tabular-nums">
                  {profile.yearsOfExperience}
                </div>
                <div className="text-xs text-[#5C6E61] font-medium mt-0.5 group-hover:underline">
                  Experience ↗
                </div>
              </button>
              <div className="h-8 w-px bg-[#11261B]/15" />
              <button
                onClick={() => onOpenSection('why-choose-me')}
                className="text-left group cursor-pointer"
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#11261B] group-hover:text-[#C5A059] transition-colors tabular-nums">
                  {profile.happyClients}
                </div>
                <div className="text-xs text-[#5C6E61] font-medium mt-0.5 group-hover:underline">
                  Satisfaction ↗
                </div>
              </button>
            </div>

          </div>

          {/* Right Column: Arch Portrait with Floating Glass Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background Decorative Arch Rings & Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#DFC285]/30 via-transparent to-[#11261B]/10 rounded-[180px_180px_40px_40px] blur-xl -z-10" />
            
            {/* Arch Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] p-2.5 rounded-t-[190px] rounded-b-[28px] bg-gradient-to-b from-[#C5A059] via-[#DFC285] to-[#11261B] shadow-2xl">
              
              {/* Inner Arch Background */}
              <div className="w-full h-full rounded-t-[180px] rounded-b-[20px] overflow-hidden relative bg-[#11261B]">
                
                {/* Developer Image */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11261B]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Social Glass Badge Card */}
            <div className="absolute -bottom-6 -right-2 sm:right-2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#11261B]/10 flex flex-col gap-2.5 z-20 min-w-[210px]">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#5C6E61] px-1">
                Direct Channels
              </div>

              {/* GitHub Link */}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F8F5EE] transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-[#11261B] text-white flex items-center justify-center group-hover:bg-[#C5A059] transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#11261B] leading-none">GitHub</span>
                  <span className="text-[10px] text-[#5C6E61] truncate max-w-[130px]">@mushahiddev</span>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F8F5EE] transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-[#0A66C2] text-white flex items-center justify-center group-hover:opacity-90 transition-opacity">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#11261B] leading-none">LinkedIn</span>
                  <span className="text-[10px] text-[#5C6E61] truncate max-w-[130px]">mushahidrafiq</span>
                </div>
              </a>

              {/* Email Link */}
              <button
                onClick={() => onOpenSection('contact')}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F8F5EE] transition-colors group text-left cursor-pointer w-full"
              >
                <div className="w-7 h-7 rounded-full bg-[#C5A059] text-[#11261B] flex items-center justify-center group-hover:bg-[#11261B] group-hover:text-[#C5A059] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#11261B] leading-none">Send Message</span>
                  <span className="text-[10px] text-[#5C6E61] truncate max-w-[130px]">Open Contact Form ↗</span>
                </div>
              </button>

            </div>

            {/* Top-left Decorative Code Badge */}
            <button
              onClick={() => onOpenSection('skills')}
              className="hidden sm:flex absolute -top-4 -left-4 bg-[#11261B] text-[#C5A059] p-3 rounded-2xl shadow-lg border border-[#C5A059]/40 items-center gap-2 z-20 cursor-pointer hover:scale-105 transition-transform"
            >
              <Code2 className="w-5 h-5 text-[#C5A059]" />
              <div className="text-[11px] font-mono font-medium text-white leading-tight text-left">
                Full-Stack<br/><span className="text-[#C5A059]">Developer ↗</span>
              </div>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

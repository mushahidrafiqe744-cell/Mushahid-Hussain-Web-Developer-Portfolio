import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Code2, Layers, Award, Star, Zap } from 'lucide-react';
import { DeveloperProfile, SectionId } from '../types/portfolio';
import { EmblemLogo } from './EmblemLogo';

interface HeroProps {
  profile: DeveloperProfile;
  onOpenSection: (section: SectionId) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenSection, onOpenResume }) => {
  // Split name letters for interactive letter animation
  const nameLetters = profile.firstName.split('');

  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden">
      {/* Background Animated Floating Ambient Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#C5A059]/10 rounded-full blur-3xl animate-float-slow pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#11261B]/15 rounded-full blur-3xl animate-float-delayed pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Small Kicker with Pulse Sparkle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11261B]/5 border border-[#11261B]/10 text-xs font-bold tracking-[0.2em] uppercase text-[#11261B]/90 mb-3 animate-shimmer hover:scale-105 transition-transform duration-300">
              <span>HELLO, I'M</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
            </div>

            {/* Massive Display Name with Interactive Letter Bouncing */}
            <div className="relative mb-6 group cursor-default">
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#11261B] leading-[0.95] select-none">
                {nameLetters.map((char, index) => (
                  <span
                    key={index}
                    className="hover-letter-bounce cursor-pointer inline-block"
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
              
              <div className="font-script text-5xl sm:text-6xl lg:text-7xl text-[#C5A059] -mt-3 sm:-mt-5 ml-4 sm:ml-8 transform -rotate-2 select-none pointer-events-none drop-shadow-xs animate-float">
                {profile.scriptSubhead}
              </div>
            </div>

            {/* Dark Pill Motto with Shimmer Reflection */}
            <div className="inline-flex items-center gap-2 bg-[#11261B] text-[#F8F5EE] text-xs sm:text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full mb-6 shadow-md border border-[#C5A059]/30 animate-shimmer hover:scale-105 transition-all duration-300">
              <Zap className="w-3.5 h-3.5 text-[#C5A059] animate-bounce" />
              <span>{profile.badge}</span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
              {profile.bioHero}
            </p>

            {/* CTA Buttons with Active Shimmer Beams */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenSection('projects')}
                className="group relative overflow-hidden inline-flex items-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#11261B] hover:bg-[#1A3828] rounded-full transition-all shadow-md hover:shadow-xl hover:scale-[1.03] cursor-pointer animate-shimmer"
              >
                <span>View Projects</span>
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
              </button>

              <button
                onClick={() => onOpenSection('services')}
                className="group inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#11261B] bg-white border border-[#11261B]/20 hover:border-[#C5A059] hover:bg-[#F2EDE2] rounded-full transition-all shadow-xs hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#C5A059] group-hover:rotate-12 transition-transform duration-300" />
                <span>My Services</span>
              </button>

              <button
                onClick={onOpenResume}
                className="group inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#11261B] bg-white border border-[#11261B]/20 hover:border-[#C5A059] hover:bg-[#F2EDE2] rounded-full transition-all shadow-xs hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C5A059] group-hover:translate-y-0.5 transition-transform duration-300" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Interactive Animated Metric Numbers Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[#11261B]/10 w-full max-w-lg">
              
              {/* Stat 1: Projects Delivered */}
              <button
                onClick={() => onOpenSection('projects')}
                className="text-left group cursor-pointer p-2 rounded-xl hover:bg-white/60 transition-all duration-300 number-badge-glow"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-[#11261B] group-hover:text-[#C5A059] transition-colors tabular-nums">
                    {profile.projectsCompleted}
                  </span>
                  <Award className="w-3.5 h-3.5 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#5C6E61] font-semibold mt-0.5 group-hover:text-[#11261B] transition-colors">
                  Projects Delivered ↗
                </div>
              </button>

              {/* Stat 2: Experience Years */}
              <button
                onClick={() => onOpenSection('experience')}
                className="text-left group cursor-pointer p-2 rounded-xl hover:bg-white/60 transition-all duration-300 number-badge-glow border-x border-[#11261B]/10"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-[#11261B] group-hover:text-[#C5A059] transition-colors tabular-nums">
                    {profile.yearsOfExperience}
                  </span>
                  <Zap className="w-3.5 h-3.5 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#5C6E61] font-semibold mt-0.5 group-hover:text-[#11261B] transition-colors">
                  Experience ↗
                </div>
              </button>

              {/* Stat 3: Satisfaction */}
              <button
                onClick={() => onOpenSection('why-choose-me')}
                className="text-left group cursor-pointer p-2 rounded-xl hover:bg-white/60 transition-all duration-300 number-badge-glow"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-[#11261B] group-hover:text-[#C5A059] transition-colors tabular-nums">
                    {profile.happyClients}
                  </span>
                  <Star className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#5C6E61] font-semibold mt-0.5 group-hover:text-[#11261B] transition-colors">
                  Satisfaction ↗
                </div>
              </button>
            </div>

          </div>

          {/* Right Column: Arch Portrait with Animated Image & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background Decorative Arch Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#DFC285]/40 via-transparent to-[#11261B]/20 rounded-[180px_180px_40px_40px] blur-2xl -z-10 animate-pulse-glow" />
            
            {/* Arch Container with Float Animation */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] p-2.5 rounded-t-[190px] rounded-b-[28px] bg-gradient-to-b from-[#C5A059] via-[#DFC285] to-[#11261B] shadow-2xl interactive-image-card">
              
              {/* Inner Arch Background */}
              <div className="w-full h-full rounded-t-[180px] rounded-b-[20px] overflow-hidden relative bg-[#11261B] group">
                
                {/* Developer Image with Hover Scale & Light Zoom */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.04] transition-transform duration-700 group-hover:scale-108"
                />

                {/* Shimmer Light Reflection on Image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Subtle bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11261B]/85 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Left Side: Floating Emblem Badge with Running 360° Circular Text & Dashed Line */}
            <div className="absolute -top-5 -left-4 sm:-left-7 z-20 transition-transform duration-300 hover:scale-110 cursor-pointer drop-shadow-2xl animate-float">
              <EmblemLogo size="md" showSubtitle={true} interactive={true} />
            </div>

            {/* Right Side: Floating Full-Stack Developer Badge */}
            <button
              onClick={() => onOpenSection('skills')}
              className="flex absolute -top-4 -right-3 sm:-right-6 bg-[#11261B] text-[#C5A059] px-4 py-2.5 rounded-2xl shadow-xl border border-[#C5A059]/40 items-center gap-2.5 z-20 cursor-pointer hover:scale-108 transition-all duration-300 group backdrop-blur-md animate-float-delayed animate-shimmer"
              title="Click to view Skills"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#11261B] group-hover:rotate-12 transition-all">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-bold text-white tracking-wide">Full-Stack</div>
                <div className="text-[10px] font-semibold text-[#DFC285] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Developer ↗
                </div>
              </div>
            </button>

            {/* Bottom-Right: Floating Social Glass Badge Card */}
            <div className="absolute -bottom-6 -right-2 sm:right-2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-[#11261B]/10 flex flex-col gap-2.5 z-20 min-w-[210px] animate-float hover:scale-105 transition-all duration-300">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#5C6E61] px-1 flex items-center justify-between">
                <span>Direct Channels</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* GitHub Link */}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F8F5EE] transition-all group hover:translate-x-1"
              >
                <div className="w-7 h-7 rounded-full bg-[#11261B] text-white flex items-center justify-center group-hover:bg-[#C5A059] group-hover:scale-110 transition-all">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#11261B] leading-none">GitHub</span>
                  <span className="text-[10px] text-[#5C6E61] truncate max-w-[130px]">@mushahidhussain</span>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F8F5EE] transition-all group hover:translate-x-1"
              >
                <div className="w-7 h-7 rounded-full bg-[#0A66C2] text-white flex items-center justify-center group-hover:scale-110 transition-all">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#11261B] leading-none">LinkedIn</span>
                  <span className="text-[10px] text-[#5C6E61] truncate max-w-[130px]">@mushahidhussain</span>
                </div>
              </a>

              {/* Email Link */}
              <button
                onClick={() => onOpenSection('contact')}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F8F5EE] transition-all group text-left cursor-pointer w-full hover:translate-x-1"
              >
                <div className="w-7 h-7 rounded-full bg-[#C5A059] text-[#11261B] flex items-center justify-center group-hover:bg-[#11261B] group-hover:text-[#C5A059] group-hover:scale-110 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#11261B] leading-none">Send Message</span>
                  <span className="text-[10px] text-[#5C6E61] truncate max-w-[130px]">Open Contact Form ↗</span>
                </div>
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

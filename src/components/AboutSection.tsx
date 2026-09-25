import React from 'react';
import { Calendar, MapPin, Mail, Phone, ExternalLink, Code2, Sparkles, CheckCircle } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { EmblemLogo } from './EmblemLogo';

interface AboutSectionProps {
  profile: DeveloperProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const nameChars = profile.firstName.split('');

  return (
    <section id="about" className="py-16 bg-[#11261B] text-[#F8F5EE] relative overflow-hidden border-y border-[#C5A059]/20">
      
      {/* Background Animated Floating Ambient Orbs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-[#1A3828]/40 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      {/* Background Subtle Pattern */}
      <div className="absolute top-4 right-8 text-[#C5A059]/20 font-mono text-xs select-none pointer-events-none hidden sm:block">
        <div className="grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Title & Bio */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2 px-3 py-1 rounded-full bg-white/5 border border-[#C5A059]/30">
              <Sparkles className="w-3 h-3 text-[#C5A059] animate-spin-slow" />
              <span>ABOUT ME</span>
            </div>
            
            {/* Title with Interactive Bouncing Letters */}
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 select-none">
              <span className="hover-letter-bounce">I</span>
              <span className="hover-letter-bounce">'</span>
              <span className="hover-letter-bounce">m</span>
              <span className="inline-block w-3" />
              {nameChars.map((char, i) => (
                <span key={i} className="hover-letter-bounce text-[#DFC285]">
                  {char}
                </span>
              ))}
              <span className="hover-letter-bounce text-[#C5A059]">!</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] via-[#DFC285] to-transparent mb-6 rounded-full" />
            
            <p className="text-[#A3B8A8] text-base leading-relaxed mb-4">
              {profile.bioAbout}
            </p>
            <p className="text-[#A3B8A8] text-base leading-relaxed">
              With a background in modern web engineering and UI/UX design principles, I bridge the gap between technical architecture and intuitive digital experiences. Whether creating bespoke applications or optimizing legacy codebases, I bring precision and dedication to every line of code.
            </p>
          </div>

          {/* Center Column: Quick Metadata Interactive Cards */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 py-4 lg:border-l lg:border-white/10 lg:pl-8">
            
            {/* Metadata Card 1: Experience Start */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-default border border-transparent hover:border-[#C5A059]/20 animate-shimmer">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C5A059] group-hover:text-[#11261B] group-hover:rotate-6 transition-all duration-300">
                <Calendar className="w-4 h-4 text-[#C5A059] group-hover:text-[#11261B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#A3B8A8]">Experience Start</span>
                <span className="text-sm font-semibold text-white tracking-wide group-hover:text-[#DFC285] transition-colors">{profile.dob}</span>
              </div>
            </div>

            {/* Metadata Card 2: Location */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-default border border-transparent hover:border-[#C5A059]/20 animate-shimmer">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C5A059] group-hover:text-[#11261B] group-hover:rotate-6 transition-all duration-300">
                <MapPin className="w-4 h-4 text-[#C5A059] group-hover:text-[#11261B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#A3B8A8]">Location</span>
                <span className="text-sm font-semibold text-white tracking-wide group-hover:text-[#DFC285] transition-colors">{profile.location}</span>
              </div>
            </div>

            {/* Metadata Card 3: Email */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-[#C5A059]/20 animate-shimmer">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0 group-hover:bg-[#C5A059] group-hover:text-[#11261B] group-hover:rotate-6 transition-all duration-300">
                <Mail className="w-4 h-4 text-[#C5A059] group-hover:text-[#11261B]" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-[10px] uppercase tracking-wider text-[#A3B8A8]">Email</span>
                <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-white hover:text-[#C5A059] transition-colors truncate">
                  {profile.email}
                </a>
              </div>
            </div>

            {/* Metadata Card 4: Phone & WhatsApp */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-[#C5A059]/20 animate-shimmer">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                <Phone className="w-4 h-4 text-[#C5A059] group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#A3B8A8]">WhatsApp / Phone</span>
                <a
                  href={`https://wa.me/92${profile.phone.replace(/^0+/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white hover:text-[#25D366] transition-colors flex items-center gap-1"
                >
                  <span>{profile.phone}</span>
                  <span className="text-[10px] text-[#25D366] font-bold">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Circular Running Emblem */}
          <div className="lg:col-span-3 flex justify-center items-center">
            <div className="relative p-2 rounded-full transition-transform duration-500 hover:scale-108 cursor-pointer animate-float">
              {/* Outer decorative halo */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C5A059]/25 via-transparent to-[#C5A059]/15 rounded-full blur-xl opacity-85 animate-pulse-glow" />
              <EmblemLogo size="hero" showSubtitle={true} interactive={true} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

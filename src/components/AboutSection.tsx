import React from 'react';
import { Calendar, MapPin, Mail, Phone, ExternalLink, Code2 } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';

interface AboutSectionProps {
  profile: DeveloperProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-16 bg-[#11261B] text-[#F8F5EE] relative overflow-hidden border-y border-[#C5A059]/20">
      
      {/* Background Subtle Pattern */}
      <div className="absolute top-4 right-8 text-[#C5A059]/20 font-mono text-xs select-none pointer-events-none hidden sm:block">
        <div className="grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#C5A059]" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Title & Bio */}
          <div className="lg:col-span-6">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2">
              ABOUT ME
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              I'm {profile.firstName}!
            </h2>
            <div className="w-16 h-1 bg-[#C5A059] mb-6 rounded-full" />
            
            <p className="text-[#A3B8A8] text-base leading-relaxed mb-4">
              {profile.bioAbout}
            </p>
            <p className="text-[#A3B8A8] text-base leading-relaxed">
              With a background in modern web engineering and UI/UX design principles, I bridge the gap between technical architecture and intuitive digital experiences. Whether creating bespoke applications or optimizing legacy codebases, I bring precision and dedication to every line of code.
            </p>
          </div>

          {/* Center Column: Quick Metadata List */}
          <div className="lg:col-span-3 flex flex-col gap-4 py-4 lg:border-l lg:border-white/10 lg:pl-8">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#A3B8A8]">Experience Start</span>
                <span className="text-sm font-medium text-white">{profile.dob}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#A3B8A8]">Location</span>
                <span className="text-sm font-medium text-white">{profile.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-[11px] uppercase tracking-wider text-[#A3B8A8]">Email</span>
                <a href={`mailto:${profile.email}`} className="text-sm font-medium text-white hover:text-[#C5A059] transition-colors truncate">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#C5A059]/30 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#A3B8A8]">Phone / WhatsApp</span>
                <a href={`tel:${profile.phone}`} className="text-sm font-medium text-white hover:text-[#C5A059] transition-colors">
                  {profile.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Monogram Crest */}
          <div className="lg:col-span-3 flex justify-center items-center">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full border-2 border-[#C5A059]/40 p-3 flex items-center justify-center bg-[#0D1F16] shadow-xl group hover:border-[#C5A059] transition-colors">
              
              {/* Inner Dashed Ring */}
              <div className="w-full h-full rounded-full border border-dashed border-[#C5A059]/30 flex flex-col items-center justify-center text-center p-4">
                <span className="font-display font-black text-4xl sm:text-5xl text-[#C5A059] tracking-wider leading-none">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </span>
                <span className="font-script text-2xl text-white -mt-1 transform -rotate-2">
                  {profile.firstName}
                </span>
                <div className="w-8 h-px bg-[#C5A059]/60 my-1.5" />
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#A3B8A8]">
                  WEB DEVELOPER
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

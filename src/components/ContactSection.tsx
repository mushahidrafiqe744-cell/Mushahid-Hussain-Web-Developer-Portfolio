import React, { useState } from 'react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  FileText,
  Sparkles,
  MessageSquare,
  CheckCircle,
  Zap,
  Clock,
  ShieldCheck,
  ArrowRight,
  SendHorizontal,
  Linkedin,
  Github
} from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { HoverCounter } from './HoverCounter';

interface ContactSectionProps {
  profile: DeveloperProfile;
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  const projectTypes = [
    'Full-Stack Web App',
    'Frontend (React/Next.js)',
    'E-Commerce Store',
    'REST/GraphQL API',
    'Performance & SEO',
    'Contract Role',
  ];

  const budgetOptions = [
    '< $1,000',
    '$1,000 - $3,000',
    '$3,000 - $7,000',
    '$7,000+',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate real network submission with animated transmission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web App',
        budget: '$1,000 - $3,000',
        message: '',
      });
    }, 900);
  };

  const titleChars = "Let's Work Together!".split('');

  return (
    <section id="contact" className="py-20 bg-[#F2EDE2] border-t border-[#11261B]/10 relative overflow-hidden">
      
      {/* Background Animated Floating Ambient Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#11261B]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info, Metrics & Editorial Pitch */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2 px-3.5 py-1 rounded-full bg-white border border-[#C5A059]/30 animate-shimmer shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
                <span>GET IN TOUCH</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
              </div>
              
              {/* Interactive Title with Letter-by-Letter Bouncing */}
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4 select-none">
                {titleChars.map((char, index) => (
                  <span key={index} className="hover-letter-bounce cursor-pointer">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h2>

              <p className="text-[#5C6E61] text-base leading-relaxed mb-6">
                Have a project in mind, need a full-stack web developer for your team, or want to discuss architecture and development? Send me a message and let's bring your vision to life.
              </p>

              {/* Dynamic Animated Response Metrics (0 -> Target Count-up on hover) */}
              <div className="grid grid-cols-3 gap-3 mb-8 p-3 rounded-2xl bg-white/70 border border-[#11261B]/10 shadow-xs">
                
                {/* Metric 1: Avg Response Time */}
                <div
                  onMouseEnter={() => setHoveredMetric(1)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  className={`p-2.5 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                    hoveredMetric === 1 ? 'bg-white shadow-md border border-[#C5A059] scale-105' : 'bg-transparent'
                  }`}
                >
                  <div className="text-lg font-bold font-mono text-[#11261B] leading-none mb-1 flex items-center justify-center gap-0.5">
                    <span>&lt;</span>
                    <HoverCounter target={1} suffix=" Hr" isParentHovered={hoveredMetric === 1} />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Response</div>
                </div>

                {/* Metric 2: Reply Rate */}
                <div
                  onMouseEnter={() => setHoveredMetric(2)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  className={`p-2.5 rounded-xl text-center transition-all duration-300 cursor-pointer border-x border-[#11261B]/10 ${
                    hoveredMetric === 2 ? 'bg-white shadow-md border border-[#C5A059] scale-105' : 'bg-transparent'
                  }`}
                >
                  <div className="text-lg font-bold font-mono text-[#11261B] leading-none mb-1">
                    <HoverCounter target={100} suffix="%" isParentHovered={hoveredMetric === 2} />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Reply Rate</div>
                </div>

                {/* Metric 3: Availability */}
                <div
                  onMouseEnter={() => setHoveredMetric(3)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  className={`p-2.5 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                    hoveredMetric === 3 ? 'bg-white shadow-md border border-[#C5A059] scale-105' : 'bg-transparent'
                  }`}
                >
                  <div className="text-lg font-bold font-mono text-[#25D366] leading-none mb-1 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                    <span>24/7</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Online</div>
                </div>

              </div>

              {/* Direct Contact Cards with Shimmer & Spring Effects */}
              <div className="space-y-4 mb-8">
                
                {/* WhatsApp & Phone Card with Live Pulse */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-xs flex items-center justify-between gap-4 hover:border-[#25D366] hover:shadow-xl transition-all duration-300 animate-shimmer group hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider flex items-center gap-1.5">
                        <span>WhatsApp & Phone</span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-[9px] font-bold text-[#25D366]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                          Online
                        </span>
                      </div>
                      <a
                        href={`https://wa.me/92${profile.phone.replace(/^0+/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-[#11261B] hover:text-[#25D366] transition-colors block font-mono"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/92${profile.phone.replace(/^0+/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 cursor-pointer"
                  >
                    <span>Chat ↗</span>
                  </a>
                </div>

                {/* Email Card with Copy Button */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-xs flex items-center justify-between gap-4 hover:border-[#C5A059] hover:shadow-xl transition-all duration-300 animate-shimmer group hover:-translate-y-1">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-11 h-11 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-[#1A3828] transition-transform duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Email Address</div>
                      <a href={`mailto:${profile.email}`} className="text-xs sm:text-sm font-bold text-[#11261B] hover:text-[#C5A059] transition-colors truncate block">
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email"
                    className="px-3 py-1.5 rounded-lg bg-[#F8F5EE] hover:bg-[#11261B] text-[#11261B] hover:text-white transition-all text-xs flex items-center gap-1 font-semibold shrink-0 cursor-pointer hover:scale-105 shadow-2xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                        <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Base Location Card */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-xs flex items-center gap-3 hover:border-[#C5A059] hover:shadow-xl transition-all duration-300 animate-shimmer group hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-[#1A3828] transition-transform duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Base Location</div>
                    <div className="text-xs sm:text-sm font-bold text-[#11261B]">
                      {profile.location} (Open to Global Remote Projects)
                    </div>
                  </div>
                </div>

                {/* Social Profiles: LinkedIn & TikTok Card */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 hover:border-[#C5A059] hover:shadow-xl transition-all duration-300 animate-shimmer">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Social Channels:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* LinkedIn */}
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold transition-all shadow-2xs hover:scale-105"
                      title="Connect on LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>

                    {/* TikTok */}
                    {profile.tiktok && (
                      <a
                        href={profile.tiktok}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-2xs hover:scale-105"
                        title="Follow on TikTok"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.49V8.5a8.27 8.27 0 0 0 4.84 1.56V6.69z" />
                        </svg>
                        <span>TikTok</span>
                      </a>
                    )}

                    {/* GitHub */}
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11261B] hover:bg-[#1A3828] text-white text-xs font-bold transition-all shadow-2xs hover:scale-105"
                      title="View GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Download CV Banner */}
              <div className="p-5 rounded-2xl bg-[#11261B] text-white flex items-center justify-between gap-4 border border-[#C5A059]/30 shadow-xl animate-shimmer hover:scale-[1.01] transition-all">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#DFC285] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Verified Credentials</span>
                  </div>
                  <div className="text-xs text-[#A3B8A8] mt-0.5">
                    Download complete PDF resume & technical achievements
                  </div>
                </div>
                <button
                  onClick={onOpenResume}
                  className="px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFC285] text-[#11261B] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-md hover:scale-105 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Animated Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#11261B]/10 shadow-2xl relative overflow-hidden animate-shimmer">
            
            {submitted ? (
              <div className="py-14 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-lg animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display text-3xl font-bold text-[#11261B] mb-2">Inquiry Transmitted!</h3>
                <p className="text-sm text-[#5C6E61] max-w-md mb-6 leading-relaxed">
                  Thank you for reaching out, <span className="font-bold text-[#11261B]">{formData.name || 'friend'}</span>. I have received your message and will reply to your email address within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-[#11261B] hover:bg-[#1A3828] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#11261B]/10">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Direct Project Inquiry</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#5C6E61]">Fast Response Guaranteed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="group">
                    <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5 group-focus-within:text-[#C5A059] transition-colors">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61]/60 focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all shadow-2xs focus:ring-2 focus:ring-[#C5A059]/25 hover:border-[#C5A059]/50"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5 group-focus-within:text-[#C5A059] transition-colors">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61]/60 focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all shadow-2xs focus:ring-2 focus:ring-[#C5A059]/25 hover:border-[#C5A059]/50"
                    />
                  </div>
                </div>

                {/* Project Type Interactive Pills */}
                <div>
                  <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-2">
                    Select Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                            isSelected
                              ? 'bg-[#11261B] text-[#DFC285] border-[#C5A059] shadow-sm scale-[1.02]'
                              : 'bg-[#F8F5EE] text-[#5C6E61] border-[#11261B]/10 hover:border-[#C5A059]/50 hover:bg-white'
                          }`}
                        >
                          <div className="leading-tight">{type}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Budget Interactive Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-2">
                    Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((budget) => {
                      const isSelected = formData.budget === budget;
                      return (
                        <button
                          type="button"
                          key={budget}
                          onClick={() => setFormData({ ...formData, budget })}
                          className={`p-2.5 rounded-xl text-center text-xs font-bold font-mono transition-all duration-200 border cursor-pointer ${
                            isSelected
                              ? 'bg-[#C5A059] text-[#11261B] border-[#DFC285] shadow-md scale-[1.03]'
                              : 'bg-[#F8F5EE] text-[#5C6E61] border-[#11261B]/10 hover:border-[#C5A059]/50 hover:bg-white'
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Input */}
                <div className="group">
                  <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5 group-focus-within:text-[#C5A059] transition-colors">
                    Project Details & Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your product requirements, desired timeline, stack, and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61]/60 focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all shadow-2xs focus:ring-2 focus:ring-[#C5A059]/25 hover:border-[#C5A059]/50 resize-y"
                  />
                </div>

                {/* Animated Submit Button with Shimmer, Pulse & Flying Plane */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden w-full py-4 px-6 rounded-full bg-[#11261B] hover:bg-[#1A3828] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer disabled:opacity-70 animate-shimmer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Project Scope...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                        <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                      </div>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

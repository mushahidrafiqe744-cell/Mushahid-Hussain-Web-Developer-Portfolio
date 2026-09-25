import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Copy, Check, FileText, Sparkles, MessageSquare, CheckCircle, Zap } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate real network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web App',
        budget: '$1,000 - $3,000',
        message: '',
      });
    }, 800);
  };

  const titleChars = "Let's Work Together!".split('');

  return (
    <section id="contact" className="py-16 bg-[#F2EDE2] border-t border-[#11261B]/10 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Editorial Pitch */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2 px-3 py-1 rounded-full bg-white border border-[#C5A059]/30 animate-shimmer">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
                <span>GET IN TOUCH</span>
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4 select-none">
                {titleChars.map((char, index) => (
                  <span key={index} className="hover-letter-bounce cursor-pointer">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h2>

              <p className="text-[#5C6E61] text-base leading-relaxed mb-8">
                Have a project in mind, need a full-stack web developer for your team, or want to discuss architecture and development? Send me a message and let's bring your vision to life.
              </p>

              {/* Direct Contact Cards with Shimmer */}
              <div className="space-y-4 mb-8">
                
                {/* Email Card with Copy Button */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-xs flex items-center justify-between gap-4 hover:border-[#C5A059] hover:shadow-lg transition-all duration-300 animate-shimmer">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
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
                    className="p-2 rounded-lg bg-[#F8F5EE] hover:bg-[#11261B] text-[#11261B] hover:text-white transition-all text-xs flex items-center gap-1 font-semibold shrink-0 cursor-pointer hover:scale-105"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
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

                {/* Phone Card */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-xs flex items-center gap-3 hover:border-[#C5A059] hover:shadow-lg transition-all duration-300 animate-shimmer">
                  <div className="w-10 h-10 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Phone / WhatsApp</div>
                    <a href={`tel:${profile.phone}`} className="text-xs sm:text-sm font-bold text-[#11261B] hover:text-[#C5A059] transition-colors block">
                      {profile.phone}
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-xs flex items-center gap-3 hover:border-[#C5A059] hover:shadow-lg transition-all duration-300 animate-shimmer">
                  <div className="w-10 h-10 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Base Location</div>
                    <div className="text-xs sm:text-sm font-bold text-[#11261B]">
                      {profile.location} (Open to Global Remote)
                    </div>
                  </div>
                </div>

              </div>

              {/* Download CV Banner */}
              <div className="p-5 rounded-xl bg-[#11261B] text-white flex items-center justify-between gap-4 border border-[#C5A059]/30 shadow-md animate-shimmer">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#DFC285]">
                    Offline Portfolio
                  </div>
                  <div className="text-xs text-[#A3B8A8] mt-0.5">
                    Download full verified developer resume (PDF)
                  </div>
                </div>
                <button
                  onClick={onOpenResume}
                  className="px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFC285] text-[#11261B] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-xs hover:scale-105 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#11261B]/10 shadow-xl relative overflow-hidden">
            
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#11261B] mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-[#5C6E61] max-w-md mb-6">
                  Thank you for reaching out. I have received your inquiry and will reply to your email address within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#11261B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A3828] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2 pb-3 border-b border-[#11261B]/10">
                  <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Direct Project Inquiry</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61]/70 focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61]/70 focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all"
                    >
                      <option value="Full-Stack Web App">Full-Stack Web App</option>
                      <option value="Frontend Architecture">Frontend Architecture (React/Next.js)</option>
                      <option value="E-Commerce Store">E-Commerce Platform</option>
                      <option value="REST/GraphQL API">Backend API & Database</option>
                      <option value="Performance & SEO">Speed & SEO Optimization</option>
                      <option value="Contract Role">Full-Time / Contract Role</option>
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div>
                    <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all"
                    >
                      <option value="< $1,000">&lt; $1,000 (Quick Sprint)</option>
                      <option value="$1,000 - $3,000">$1,000 – $3,000 (Standard MVP)</option>
                      <option value="$3,000 - $7,000">$3,000 – $7,000 (Full-Stack Product)</option>
                      <option value="$7,000+">$7,000+ (Enterprise / Scaled App)</option>
                      <option value="Monthly Retainer">Monthly Retainer</option>
                    </select>
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-bold text-[#11261B] uppercase tracking-wider mb-1.5">
                    Project Details & Goals <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your product, required features, timeline, and tech stack..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61]/70 focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all focus:ring-2 focus:ring-[#C5A059]/20 resize-y"
                  />
                </div>

                {/* Submit Button with Shimmer & Scale */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-[#11261B] hover:bg-[#1A3828] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer disabled:opacity-70 animate-shimmer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Message</span>
                      <Send className="w-4 h-4 text-[#C5A059]" />
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

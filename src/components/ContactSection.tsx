import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Copy, Check, FileText, Sparkles, MessageSquare } from 'lucide-react';
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

  return (
    <section id="contact" className="py-16 bg-[#F2EDE2] border-t border-[#11261B]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Editorial Pitch */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2 flex items-center gap-1.5">
                <span>GET IN TOUCH</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4">
                Let's Work Together!
              </h2>

              <p className="text-[#5C6E61] text-base leading-relaxed mb-8">
                Have a project in mind, need a full-stack web developer for your team, or want to discuss architecture and development? Send me a message and let's bring your vision to life.
              </p>

              {/* Direct Contact Cards */}
              <div className="space-y-4 mb-8">
                
                {/* Email Card with Copy Button */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-2xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0">
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
                    className="p-2 rounded-lg bg-[#F8F5EE] hover:bg-[#11261B] text-[#11261B] hover:text-white transition-colors text-xs flex items-center gap-1 font-semibold shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location & Availability */}
                <div className="p-4 rounded-xl bg-white border border-[#11261B]/10 shadow-2xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#5C6E61] tracking-wider">Location & Availability</div>
                    <div className="text-xs sm:text-sm font-bold text-[#11261B]">
                      {profile.location} · Remote Worldwide
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Download Resume Action Box */}
            <div className="p-6 rounded-2xl bg-[#11261B] text-white border border-[#C5A059]/30 flex items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-[#11261B] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Curriculum Vitae</div>
                  <div className="text-sm font-bold text-white">Download Full Resume</div>
                </div>
              </div>

              <button
                onClick={onOpenResume}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#11261B] bg-white hover:bg-[#C5A059] rounded-lg transition-colors shadow-xs"
              >
                View / PDF
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#11261B]/10 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-[#11261B] mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#C5A059]" />
              <span>Send a Direct Message</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6E61] mb-6">
              Fill in your project requirements or question below. I will respond within 24 hours.
            </p>

            {submitted && (
              <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been received. I will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#11261B] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#11261B] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#11261B] mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App</option>
                    <option value="Frontend Development">Frontend Development (React/Next)</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                    <option value="E-Commerce Store">E-Commerce Storefront</option>
                    <option value="API & Backend">REST / GraphQL API & Backend</option>
                    <option value="Website Revamp">Performance & UI Optimization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#11261B] mb-1.5">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all"
                  >
                    <option value="< $1,000">&lt; $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#11261B] mb-1.5">
                  Project Details / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your vision, timeline, or technologies required..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-[#F8F5EE] border border-[#11261B]/15 rounded-xl text-[#11261B] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-[11px] text-[#5C6E61]">
                  🔒 Your email is never shared with third parties.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#11261B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A3828] transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Github, ExternalLink, Check, Layers, Zap, Calendar, Sparkles, MessageCircle } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isImgHovered, setIsImgHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#11261B]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#F8F5EE] rounded-2xl shadow-2xl border border-[#11261B]/20 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#11261B] text-white border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              {project.categoryLabel}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-[#A3B8A8]">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Project Image with Interactive Browser Mockup & Full Webpage Scroll */}
          <div
            onMouseEnter={() => setIsImgHovered(true)}
            onMouseLeave={() => setIsImgHovered(false)}
            className="relative rounded-2xl overflow-hidden mb-6 h-80 sm:h-[460px] bg-[#0d1e13] border border-[#C5A059]/30 shadow-xl cursor-pointer group"
          >
            {/* Top Browser Bar */}
            <div className="absolute top-0 left-0 right-0 h-7 bg-[#11261B]/95 backdrop-blur-md border-b border-[#C5A059]/20 z-20 flex items-center px-3.5 justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
              </div>
              <div className="text-[10px] font-mono text-[#DFC285] truncate max-w-[240px]">
                {project.liveUrl || project.title}
              </div>
              <div className="text-[9px] font-bold text-[#DFC285] bg-white/10 px-2 py-0.5 rounded tracking-wider uppercase flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isImgHovered ? 'bg-emerald-400 animate-pulse' : 'bg-[#DFC285]'}`} />
                <span>{isImgHovered ? 'Full Website Scrolling ▾' : 'Hover to Scroll Full Page'}</span>
              </div>
            </div>

            {/* Scrolling Viewport (Whole Website from Header to Footer) */}
            <div
              className="w-full pt-7 will-change-transform"
              style={{
                transform: isImgHovered ? 'translateY(calc(-100% + 460px))' : 'translateY(0%)',
                transition: isImgHovered
                  ? 'transform 7.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
                  : 'transform 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto block pointer-events-none select-none"
              />
            </div>

            {project.metrics && (
              <div className="absolute bottom-3 left-3 bg-[#11261B]/90 backdrop-blur-xs text-[#C5A059] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#C5A059]/40 flex items-center gap-1.5 z-20 shadow-md">
                <Zap className="w-3.5 h-3.5" />
                <span>{project.metrics}</span>
              </div>
            )}
          </div>

          {/* Title & Tagline */}
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#11261B] mb-2">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-[#5C6E61] font-medium mb-6">
            {project.tagline}
          </p>

          {/* Action Links (GitHub & Live Demo) */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-[#11261B]/10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#11261B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A3828] transition-all shadow-sm"
              >
                <Github className="w-4 h-4 text-[#C5A059]" />
                <span>View GitHub Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#11261B]/20 text-[#11261B] text-xs font-bold uppercase tracking-wider hover:border-[#C5A059] hover:bg-[#F2EDE2] transition-all shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-[#C5A059]" />
                <span>Live Project Demo</span>
              </a>
            )}
          </div>

          {/* Full Overview */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>Project Overview & Architecture</span>
            </h4>
            <p className="text-sm text-[#11261B]/80 leading-relaxed bg-[#F2EDE2] p-4 rounded-xl border border-[#11261B]/5">
              {project.fullOverview || project.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Key Features & Engineering Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-[#11261B]/5">
                  <div className="w-5 h-5 rounded-full bg-[#11261B] text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-[#11261B]/90 font-medium leading-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] mb-2.5">
              Tech Stack & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium text-[#11261B] bg-white px-3 py-1 rounded-lg border border-[#11261B]/10 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F2EDE2] border-t border-[#11261B]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`https://wa.me/923290725117?text=${encodeURIComponent(
              `Hi Mushahid! I saw your "${project.title}" (${project.categoryLabel || 'Web'}) project on your portfolio and I want to order a similar website for my business. Please share quotation and timeline.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 hover:scale-105 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order a Website Like This on WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#11261B] hover:text-black transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

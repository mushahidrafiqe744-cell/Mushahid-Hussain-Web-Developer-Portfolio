import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Globe,
  MessageSquare,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Testimonial } from '../types/portfolio';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenContact?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenContact,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<number | null>(null);

  const total = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay timer
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const current = testimonials[currentIndex];

  const titleChars = 'Client Testimonials & Feedback'.split('');

  return (
    <section id="testimonials" className="py-20 bg-[#F8F5EE] relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#11261B]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11261B] text-[#DFC285] text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-sm border border-[#C5A059]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
            <span>VERIFIED REVIEWS</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4 select-none">
            {titleChars.map((char, index) => (
              <span key={index} className="hover-letter-bounce cursor-pointer">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>

          <p className="text-base sm:text-lg text-[#5C6E61] leading-relaxed">
            Real feedback and performance milestones from founders, enterprise clients, and business partners across the globe.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Active Testimonial Card */}
          <div className="relative bg-[#F2EDE2] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#C5A059]/30 overflow-hidden transition-all duration-500 min-h-[460px] flex flex-col justify-between">
            
            {/* Top Row: Quote Icon + Rating Stars + Verified Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#11261B]/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#11261B] text-[#DFC285] flex items-center justify-center shadow-md">
                  <Quote className="w-6 h-6 rotate-180" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#C5A059] mb-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#11261B] uppercase tracking-wider">
                    5.0 Star Verified Review
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#11261B]/10 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span className="text-xs font-semibold text-[#11261B]">
                  Verified Client
                </span>
                <span className="text-sm select-none">{current.flag}</span>
              </div>
            </div>

            {/* Middle: Review Quote Body */}
            <div className="my-auto py-2">
              <blockquote className="font-serif-cormorant text-xl sm:text-2xl lg:text-3xl text-[#11261B] leading-snug italic font-normal tracking-wide">
                "{current.review}"
              </blockquote>

              {/* Impact / Metrics Outcome Pill */}
              {current.metricsResult && (
                <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-2xl bg-white border border-[#C5A059]/40 text-[#11261B] text-xs sm:text-sm font-bold shadow-xs">
                  <TrendingUp className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>Impact: <strong className="text-[#11261B]">{current.metricsResult}</strong></span>
                </div>
              )}
            </div>

            {/* Bottom Row: Client Profile & Project Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#11261B]/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#C5A059] shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 text-base drop-shadow-xs select-none">
                    {current.flag}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#11261B]">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[#5C6E61] font-medium">
                    {current.role} • <span className="font-semibold text-[#11261B]">{current.company}</span>
                  </p>
                  <p className="text-[11px] text-[#A38038] font-mono mt-0.5">
                    Project: {current.project} ({current.location})
                  </p>
                </div>
              </div>

              {/* Technologies Badges */}
              {current.tags && (
                <div className="hidden sm:flex flex-wrap items-center gap-1.5">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#11261B]/10 text-[11px] font-mono font-semibold text-[#5C6E61]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center justify-between mt-6 px-2">
            
            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-2xl bg-[#11261B] hover:bg-[#1A3828] text-[#DFC285] hover:text-white flex items-center justify-center transition-all shadow-md hover:scale-105 cursor-pointer border border-[#C5A059]/40"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-2xl bg-[#11261B] hover:bg-[#1A3828] text-[#DFC285] hover:text-white flex items-center justify-center transition-all shadow-md hover:scale-105 cursor-pointer border border-[#C5A059]/40"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono font-bold text-[#5C6E61] ml-2">
                0{currentIndex + 1} / 0{total}
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 h-2.5 bg-[#C5A059]'
                      : 'w-2.5 h-2.5 bg-[#11261B]/20 hover:bg-[#11261B]/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Quick CTA to Contact */}
            <a
              href="#contact"
              onClick={(e) => {
                if (onOpenContact) {
                  e.preventDefault();
                  onOpenContact();
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#11261B] text-[#11261B] hover:text-[#DFC285] text-xs font-bold uppercase tracking-wider transition-all border border-[#11261B]/15 shadow-xs hover:shadow-md cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

          {/* Quick Client Thumbnails Row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mt-8">
            {testimonials.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#11261B] text-white border-[#C5A059] shadow-md scale-105'
                      : 'bg-white text-[#11261B] border-[#11261B]/10 hover:border-[#C5A059]/50 hover:bg-[#F2EDE2]'
                  }`}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold truncate leading-tight">
                      {item.name.split(' ')[0]}
                    </div>
                    <div className={`text-[9px] truncate mt-0.5 ${isSelected ? 'text-[#DFC285]' : 'text-[#5C6E61]'}`}>
                      {item.flag} {item.company.split(' ')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

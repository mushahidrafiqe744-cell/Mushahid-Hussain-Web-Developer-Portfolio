import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { SkillGroup } from '../types/portfolio';

interface SkillItemData {
  name: string;
  category: string;
  level: string;
  score: number;
  exp: string;
  short: string;
  bg: string;
  color: string;
  desc: string;
}

interface SkillsSectionProps {
  skillGroups: SkillGroup[];
}

const SkillCard: React.FC<{ skill: SkillItemData }> = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  // Smooth number counting from 0% to skill.score on hover
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1200; // 1.2 seconds for a luxurious slow run

    if (isHovered) {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Easing function (easeOutCubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(easeOut * skill.score));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      animationFrameId = requestAnimationFrame(step);
    } else {
      // Reset smoothly to 0% when cursor leaves
      setDisplayScore(0);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, skill.score]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white p-5 rounded-2xl border border-[#11261B]/10 shadow-xs hover:border-[#C5A059] hover:shadow-xl transition-all duration-500 group cursor-pointer relative overflow-hidden"
    >
      {/* Header with Icon, Name, and Level */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: skill.bg, color: skill.color }}
          >
            {skill.short}
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#11261B] leading-tight group-hover:text-[#C5A059] transition-colors">
              {skill.name}
            </h4>
            <span className="text-[10px] text-[#5C6E61] font-medium">{skill.exp}</span>
          </div>
        </div>

        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-2xs transition-all duration-300 ${
          isHovered
            ? 'bg-[#C5A059] text-[#11261B]'
            : 'bg-[#11261B] text-[#C5A059]'
        }`}>
          {skill.level}
        </span>
      </div>

      {/* Score Header & 0% to Target Progress Meter */}
      <div className="mb-3">
        <div className="flex justify-between items-center text-[10px] font-bold text-[#11261B] mb-1.5">
          <span className="text-[#5C6E61] uppercase tracking-wider text-[9px]">
            {isHovered ? 'Running Proficiency' : 'Hover to Fill'}
          </span>
          <span className={`font-mono text-xs transition-all duration-200 ${
            isHovered ? 'text-[#C5A059] font-extrabold scale-110' : 'text-[#5C6E61]'
          }`}>
            {displayScore}%
          </span>
        </div>

        {/* The Track Line - starts at 0%, slowly fills up on hover */}
        <div className="relative w-full bg-[#E5DEC9] h-2.5 rounded-full overflow-hidden shadow-inner">
          
          {/* Animated Fill Bar (0% -> target% with slow 1.2s cubic ease) */}
          <div
            className="h-full rounded-full relative overflow-hidden bg-gradient-to-r from-[#B0893F] via-[#C5A059] to-[#DFC285]"
            style={{
              width: isHovered ? `${skill.score}%` : '0%',
              transition: isHovered 
                ? 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1), filter 0.3s ease' 
                : 'width 0.4s ease-out',
              filter: isHovered ? 'brightness(1.1) drop-shadow(0 0 5px rgba(197, 160, 89, 0.7))' : 'none',
            }}
          >
            {/* Travelling Light Beam when running */}
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent w-full h-full -skew-x-12 running-line-beam" />
            )}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#5C6E61] leading-snug group-hover:text-[#11261B] transition-colors">
        {skill.desc}
      </p>

      {/* Bottom subtle gold indicator line that expands on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#C5A059] via-[#DFC285] to-[#11261B]"
        style={{
          width: isHovered ? '100%' : '0%',
          transition: 'width 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />
    </div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'devops'>('all');

  const detailedSkills: SkillItemData[] = [
    { name: 'React', category: 'frontend', level: 'Expert', score: 95, exp: '3+ Years', short: 'Re', bg: '#23272f', color: '#149eca', desc: 'Hooks, Suspense, Server Components, State Management' },
    { name: 'Next.js', category: 'frontend', level: 'Expert', score: 92, exp: '3 Years', short: 'Nx', bg: '#000000', color: '#ffffff', desc: 'App Router, SSR, SSG, API Routes, Optimization' },
    { name: 'TypeScript', category: 'frontend', level: 'Advanced', score: 90, exp: '3 Years', short: 'TS', bg: '#3178c6', color: '#ffffff', desc: 'Strict Typing, Generics, Utility Types, Interface Design' },
    { name: 'Node.js', category: 'backend', level: 'Advanced', score: 88, exp: '3 Years', short: 'Node', bg: '#339933', color: '#ffffff', desc: 'Event Loop, Streams, REST Architecture, Microservices' },
    { name: 'Express.js', category: 'backend', level: 'Advanced', score: 90, exp: '3 Years', short: 'Ex', bg: '#1f2937', color: '#e5e7eb', desc: 'Middleware, Routing, Error Handling, JWT Auth' },
    { name: 'Tailwind CSS', category: 'frontend', level: 'Expert', score: 98, exp: '3+ Years', short: 'TW', bg: '#38bdf8', color: '#ffffff', desc: 'JIT, Responsive Design, Fluid Breakpoints, Custom Design Tokens' },
    { name: 'PostgreSQL', category: 'database', level: 'Advanced', score: 85, exp: '2+ Years', short: 'SQL', bg: '#4169e1', color: '#ffffff', desc: 'Relational Schemas, Indexing, Transactions, Drizzle/Prisma' },
    { name: 'MongoDB', category: 'database', level: 'Proficient', score: 82, exp: '2 Years', short: 'MD', bg: '#13aa52', color: '#ffffff', desc: 'Document Modeling, Aggregation Pipelines, Mongoose' },
    { name: 'Redis', category: 'database', level: 'Proficient', score: 80, exp: '2 Years', short: 'RD', bg: '#dc382d', color: '#ffffff', desc: 'In-memory Caching, Session Stores, Rate Limiting' },
    { name: 'Git & GitHub', category: 'devops', level: 'Expert', score: 94, exp: '3+ Years', short: 'Git', bg: '#f05032', color: '#ffffff', desc: 'Branching Models, GitHub Actions, Pull Requests, Rebase' },
    { name: 'Docker', category: 'devops', level: 'Proficient', score: 78, exp: '1.5 Years', short: 'Doc', bg: '#2496ed', color: '#ffffff', desc: 'Containerization, Docker Compose, Multi-stage Builds' },
    { name: 'GraphQL & REST', category: 'backend', level: 'Advanced', score: 86, exp: '2+ Years', short: 'API', bg: '#e535ab', color: '#ffffff', desc: 'Schema Stitching, Queries, Mutations, OpenAPI Specs' },
  ];

  const engineeringPractices = [
    { title: 'Modular Architecture', desc: 'DRY, SOLID, reusable component design patterns.' },
    { title: 'Type Safety & Verification', desc: 'End-to-end type safety from database to UI components.' },
    { title: 'Web Vitals & Performance', desc: 'Bundle splitting, image compression, sub-second LCP.' },
    { title: 'Security & Auth Standards', desc: 'OAuth, JWT, CSRF protection, and CORS policies.' },
    { title: 'Automated Testing', desc: 'Unit & component testing using Vitest, Jest & React Testing Lib.' },
    { title: 'SEO & Structured Data', desc: 'Full Schema.org, OpenGraph, dynamic sitemaps, and robots.txt.' },
  ];

  const filtered = detailedSkills.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  return (
    <section id="skills" className="py-20 bg-[#F2EDE2] border-b border-[#11261B]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL EXPERTISE</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] mb-4">
            My Skills & Tech Stack
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4 rounded-full" />
          <p className="text-[#5C6E61] text-base sm:text-lg leading-relaxed">
            A battle-tested set of languages, frameworks, libraries, and engineering practices. Hover over any skill to watch the proficiency meter run.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'database', label: 'Databases & Caching' },
            { id: 'devops', label: 'DevOps & Git' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shadow-2xs cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#11261B] text-white shadow-sm'
                  : 'bg-white text-[#5C6E61] hover:text-[#11261B] hover:bg-[#F8F5EE] border border-[#11261B]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid - Starts at 0%, slowly fills up to target% on hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>

        {/* Engineering Principles Section */}
        <div className="bg-[#11261B] text-white p-8 sm:p-10 rounded-2xl border border-[#C5A059]/30 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C5A059] mb-1">
              ENGINEERING STANDARDS
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Core Principles & Architectural Rigor
            </h3>
            <p className="text-xs sm:text-sm text-[#A3B8A8]">
              Writing code is more than syntax; it's about building maintainable, readable, and future-proof systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringPractices.map((practice, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#C5A059]/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-1 group-hover:text-[#C5A059] transition-colors">{practice.title}</h4>
                  <p className="text-[11px] text-[#A3B8A8] leading-relaxed">{practice.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

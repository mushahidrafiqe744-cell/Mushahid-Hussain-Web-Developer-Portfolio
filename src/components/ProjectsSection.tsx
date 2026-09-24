import React, { useState } from 'react';
import { Github, ExternalLink, ArrowUpRight, Search, Code, Filter, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'saas', label: 'SaaS & Web Apps' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'api', label: 'APIs & Backend' },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-16 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#11261B]/10">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-1.5 flex items-center gap-1.5">
              <span>SELECTED WORKS</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B]">
              Featured Projects
            </h2>
            <p className="text-sm text-[#5C6E61] mt-1 max-w-xl">
              Explore recent web applications, production codebases, and architectural implementations with live previews and open-source GitHub repositories.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#5C6E61] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech, stack, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F2EDE2] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F2EDE2] rounded-xl border border-[#11261B]/10 mb-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#11261B] text-[#F8F5EE] shadow-xs'
                  : 'text-[#5C6E61] hover:text-[#11261B] hover:bg-white/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#F2EDE2] rounded-2xl border border-dashed border-[#11261B]/20">
            <Code className="w-10 h-10 text-[#5C6E61] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#11261B]">No projects found matching your search.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#C5A059] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-[#F2EDE2] rounded-2xl border border-[#11261B]/10 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:translate-y-[-2px]"
              >
                <div>
                  {/* Project Media Frame */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative aspect-[16/10] overflow-hidden bg-[#11261B] cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#11261B]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-4 py-2 rounded-full bg-white/95 text-[#11261B] text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        View Architecture & Code →
                      </div>
                    </div>

                    {/* Category Label */}
                    <div className="absolute top-3 left-3 bg-[#11261B]/85 backdrop-blur-xs text-[#C5A059] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#C5A059]/30">
                      {project.categoryLabel}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Unboxed Metadata (Zero Pill Rule) */}
                    <div className="flex items-center gap-2 text-[11px] text-[#5C6E61] font-medium mb-2">
                      <span>{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                      {project.metrics && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#11261B] font-semibold">{project.metrics}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="font-display text-xl font-bold text-[#11261B] group-hover:text-[#C5A059] transition-colors cursor-pointer mb-2 leading-snug"
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack Unboxed Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-medium text-[#11261B]/80 bg-white px-2 py-0.5 rounded-md border border-[#11261B]/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-[11px] font-medium text-[#5C6E61] px-1 py-0.5">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-6 py-4 bg-white/60 border-t border-[#11261B]/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="View GitHub Repository"
                        className="p-2 rounded-lg bg-[#11261B] text-white hover:bg-[#1A3828] hover:text-[#C5A059] transition-all shadow-2xs flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">GitHub</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Live Preview"
                        className="p-2 rounded-lg bg-white border border-[#11261B]/15 text-[#11261B] hover:border-[#C5A059] hover:bg-[#F2EDE2] transition-all shadow-2xs flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="hidden sm:inline">Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#11261B] hover:text-[#C5A059] transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ExternalLink, Terminal, ChevronRight, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [activeFilter, setActiveFilter] = useState<'all' | 'systems' | 'ai' | 'web'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleFilterClick = (filter: 'all' | 'systems' | 'ai' | 'web') => {
    sound.playBlip(620, 0.04);
    setActiveFilter(filter);
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B4D9FD] bg-[#171715] px-3 py-1 border border-[#2a2a26] rounded-md">
            <Terminal className="w-3.5 h-3.5" />
            <span>// 03. FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF9F5] tracking-tight uppercase font-pixel-head">
            THINGS I'VE BUILT
          </h2>
          <p className="text-[#EDECE8]/70 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            Here are some of my favorite projects. Each one was built to solve a real technical challenge or make everyday software faster.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'web', 'ai', 'systems'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-all ${
                activeFilter === filter
                  ? 'bg-[#B4D9FD] text-black border-[#B4D9FD] font-bold'
                  : 'border-dashed border-[#EDECE8]/30 text-[#EDECE8]/80 hover:bg-[#B4D9FD] hover:text-black hover:border-transparent'
              }`}
            >
              [{filter === 'all' ? 'ALL PROJECTS' : filter.toUpperCase()}]
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => sound.playBlip(700, 0.02)}
            className="dev-card flex flex-col justify-between text-left p-6 rounded-lg relative overflow-hidden transition-all"
          >
            {/* Top metadata strip */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono pb-3 mb-3 border-b border-[#222220]">
                <span className="text-[#B4D9FD] font-semibold">{project.year}</span>
                <span className="text-[#33FF7D] flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 bg-[#33FF7D] rounded-full animate-pulse"></span>
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#FAF9F5] group-hover:text-[#B4D9FD] transition-colors font-mono leading-snug">
                {project.title}
              </h3>

              {/* Key Metric Highlight */}
              <div className="mt-3 p-2 bg-[#121211] border border-[#2a2a26] text-[#B4D9FD] text-xs font-mono rounded flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#B4D9FD] shrink-0" />
                <span className="truncate">{project.metrics}</span>
              </div>

              {/* Description in simple English */}
              <p className="text-xs sm:text-sm text-[#EDECE8]/80 mt-3.5 font-sans leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Highlights bullet list */}
              <div className="mt-4 space-y-1.5">
                {project.highlights.slice(0, 2).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-[#EDECE8]/70 font-sans">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B4D9FD] mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Tags & Links */}
            <div className="mt-6 pt-4 border-t border-[#222220] space-y-4">
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 bg-[#121211] text-[#EDECE8]/70 border border-[#2a2a26] rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playBlip(600, 0.04)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#EDECE8] hover:text-black hover:bg-[#B4D9FD] transition-colors py-1 px-2.5 border border-dashed border-[#EDECE8]/30 rounded-md"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>CODE</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    sound.playWarp();
                    setActiveModalProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-black py-1 px-3 bg-[#B4D9FD] hover:bg-[#9ecbff] rounded-md transition-all shadow-sm"
                >
                  <span>DETAILS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#171715] border border-[#B4D9FD] max-w-2xl w-full p-6 text-left rounded-lg shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-[#2a2a26]">
              <span className="font-mono text-xs text-[#B4D9FD]">
                [PROJECT OVERVIEW // {activeModalProject.title}]
              </span>
              <button
                onClick={() => {
                  sound.playBlip(440, 0.05);
                  setActiveModalProject(null);
                }}
                className="text-[#EDECE8]/60 hover:text-white font-mono text-xs"
              >
                [CLOSE_X]
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FAF9F5] font-mono">
                {activeModalProject.title}
              </h3>
              <div className="text-xs font-mono text-[#B4D9FD] bg-[#121211] p-2.5 border border-[#2a2a26] rounded">
                ⚡ Key Metric: {activeModalProject.metrics}
              </div>
              <p className="text-sm text-[#EDECE8]/80 font-sans leading-relaxed">
                {activeModalProject.longDescription}
              </p>

              <div className="space-y-2">
                <h4 className="font-mono text-xs text-[#B4D9FD] uppercase tracking-wider">KEY HIGHLIGHTS:</h4>
                {activeModalProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#EDECE8]/70 font-sans">
                    <ChevronRight className="w-3.5 h-3.5 text-[#B4D9FD] mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2a26]">
                <a
                  href={activeModalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-transparent text-xs font-mono text-[#EDECE8] border border-dashed border-[#EDECE8]/40 hover:bg-[#B4D9FD] hover:text-black rounded-md transition-colors"
                >
                  VIEW REPOSITORY
                </a>
                <a
                  href={activeModalProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#B4D9FD] hover:bg-[#9ecbff] text-xs font-mono text-black font-semibold rounded-md transition-colors"
                >
                  OPEN LIVE DEMO
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

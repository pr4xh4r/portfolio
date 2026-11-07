import React, { useState } from 'react';
import { Folder, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const spotlightProject = projects[spotlightIndex] || projects[0];

  return (
    <section id="projects" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left">
      {/* Section Header with extending horizontal line */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF9F5] flex items-center gap-2 whitespace-nowrap">
          <span className="text-[#B4D9FD] font-mono">/</span>
          <span>software</span>
        </h2>
        <div className="h-[1px] bg-[#2a2a26] flex-grow max-w-md"></div>
      </div>

      {/* Featured Spotlight Card matching Gazi Jarin reference (Screenshot 3 top) */}
      <div className="mb-12 relative rounded-2xl overflow-hidden bg-[#171715] border border-[#2a2a26] hover:border-[#B4D9FD]/60 shadow-2xl transition-all">
        {/* Top subtle visual banner */}
        <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-gradient-to-br from-[#121211] via-[#1a1a18] to-[#121211] flex items-center justify-center border-b border-[#222220]">
          <div className="absolute inset-0 bg-[radial-gradient(#B4D9FD_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

          {/* Centered Spotlight Title */}
          <div className="text-center z-10 px-4 space-y-2">
            <h3 className="text-3xl sm:text-4xl font-sans font-bold text-[#FAF9F5] tracking-tight">
              {spotlightProject.title.split('//')[0].trim()}
            </h3>
            <p className="text-xs sm:text-sm text-[#EDECE8]/75 max-w-lg mx-auto font-sans">
              {spotlightProject.description}
            </p>
            <div className="text-[11px] font-mono text-[#B4D9FD] tracking-wider uppercase pt-1">
              {spotlightProject.tags.slice(0, 4).join(' • ')}
            </div>
            <div className="pt-2 flex justify-center items-center gap-3">
              <a
                href={spotlightProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDECE8]/80 hover:text-[#B4D9FD] transition-colors p-1"
                title="GitHub Repository"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              {spotlightProject.demo && (
                <a
                  href={spotlightProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EDECE8]/80 hover:text-[#B4D9FD] transition-colors p-1"
                  title="Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Pill Indicators */}
        <div className="flex justify-center items-center gap-2 py-3 bg-[#141412]">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playBlip(750, 0.03);
                setSpotlightIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === spotlightIndex
                  ? 'w-8 bg-[#B4D9FD]'
                  : 'w-4 bg-[#2a2a26] hover:bg-[#383833]'
              }`}
              title={`Switch to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 3-Column Project Cards matching Screenshot 3 bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col justify-between bg-[#171715] hover:bg-[#1c1c1a] border border-[#2a2a26] hover:border-[#B4D9FD]/70 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 shadow-lg"
          >
            <div>
              {/* Card Header: Folder Icon on Left, Links on Right */}
              <div className="flex items-center justify-between pb-6">
                <Folder className="w-9 h-9 text-[#B4D9FD] stroke-[1.5]" />

                <div className="flex items-center gap-3 text-[#EDECE8]/70">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B4D9FD] transition-colors p-1"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B4D9FD] transition-colors p-1"
                      title="External Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-sans font-bold text-[#FAF9F5] group-hover:text-[#B4D9FD] transition-colors mb-3 leading-snug">
                {project.title.split('//')[0].trim()}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#EDECE8]/70 font-sans leading-relaxed line-clamp-4">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Footer */}
            <div className="pt-6 font-mono text-[11px] text-[#EDECE8]/50 group-hover:text-[#EDECE8]/70 transition-colors">
              {project.tags.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

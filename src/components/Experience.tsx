import React from 'react';
import { Terminal, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B4D9FD] bg-[#171715] px-3 py-1 border border-[#2a2a26] rounded-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>// 04. EXPERIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF9F5] tracking-tight uppercase font-pixel-head">
          WHERE I'VE WORKED
        </h2>
        <p className="text-[#EDECE8]/70 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
          A summary of my previous roles, engineering teams, and key accomplishments.
        </p>
      </div>

      {/* Timeline track */}
      <div className="relative border-l border-[#2a2a26] ml-4 sm:ml-8 space-y-12">
        {experience.map((exp) => (
          <div
            key={exp.id}
            onMouseEnter={() => sound.playBlip(680, 0.02)}
            className="relative pl-8 sm:pl-12 group text-left"
          >
            {/* Timeline Pixel Junction Node in pure Ice Blue */}
            <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 bg-[#121211] border-2 border-[#B4D9FD] flex items-center justify-center rounded-none group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(180,217,253,0.5)]">
              <div className="w-1 h-1 bg-[#B4D9FD]"></div>
            </div>

            {/* Content Panel */}
            <div className="dev-card p-6 rounded-lg transition-all">
              
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222220] pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#B4D9FD]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#FAF9F5] group-hover:text-[#B4D9FD] font-mono mt-1 transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <div className="font-mono text-xs text-[#B4D9FD] font-semibold">
                    {exp.organization}
                  </div>
                  <div className="flex items-center sm:justify-end gap-1 text-[11px] text-[#EDECE8]/40 font-mono mt-0.5">
                    <MapPin className="w-3 h-3 text-[#EDECE8]/30" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights in simple, clear English */}
              <div className="space-y-2 mb-5">
                {exp.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#EDECE8]/80 font-sans">
                    <ChevronRight className="w-4 h-4 text-[#B4D9FD] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#222220]">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 bg-[#121211] text-[#EDECE8]/70 border border-[#2a2a26] rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

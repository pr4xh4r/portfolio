import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState(0);

  const activeExp = experience[activeTab] || experience[0];

  return (
    <section id="experience" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left">
      {/* Section Header with extending horizontal line */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF9F5] flex items-center gap-2 whitespace-nowrap">
          <span className="text-[#B4D9FD] font-mono">/</span>
          <span>experience</span>
        </h2>
        <div className="h-[1px] bg-[#2a2a26] flex-grow max-w-md"></div>
      </div>

      {/* Tabbed Experience Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Organization Tabs */}
        <div className="md:col-span-4 flex md:flex-col overflow-x-auto border-b md:border-b-0 md:border-l border-[#2a2a26]">
          {experience.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => {
                sound.playBlip(680, 0.03);
                setActiveTab(idx);
              }}
              className={`px-4 py-3 text-left font-mono text-xs sm:text-sm whitespace-nowrap transition-all border-b-2 md:border-b-0 md:-ml-[2px] md:border-l-2 ${
                activeTab === idx
                  ? 'border-[#B4D9FD] text-[#B4D9FD] bg-[#B4D9FD]/10 font-bold'
                  : 'border-transparent text-[#EDECE8]/60 hover:text-[#EDECE8] hover:bg-[#1c1c1a]'
              }`}
            >
              {exp.organization}
            </button>
          ))}
        </div>

        {/* Right Column: Experience Details */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#FAF9F5]">
              {activeExp.role}{' '}
              <span className="text-[#B4D9FD]">@ {activeExp.organization}</span>
            </h3>
            <div className="flex items-center gap-3 text-xs font-mono text-[#EDECE8]/60 mt-1">
              <span>{activeExp.period}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#B4D9FD]" />
                {activeExp.location}
              </span>
            </div>
          </div>

          {/* Bullet points with right arrow */}
          <div className="space-y-3 pt-2">
            {activeExp.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-[#EDECE8]/80 font-sans leading-relaxed">
                <span className="text-[#B4D9FD] text-xs mt-1 shrink-0">▷</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#222220]">
            {activeExp.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 bg-[#171715] text-[#EDECE8]/75 border border-[#2a2a26] rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

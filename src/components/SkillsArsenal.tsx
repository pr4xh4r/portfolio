import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const SkillsArsenal: React.FC = () => {
  const { skills: skillCategories } = PORTFOLIO_DATA;
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  const filteredCategories = selectedSector === 'ALL'
    ? skillCategories
    : skillCategories.filter((cat) => cat.sector === selectedSector);

  const handleSectorChange = (sector: string) => {
    sound.playBlip(550, 0.04);
    setSelectedSector(sector);
  };

  const renderPixelBar = (level: number) => {
    const totalBlocks = 12;
    const filledBlocks = Math.round((level / 100) * totalBlocks);

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: totalBlocks }).map((_, idx) => (
          <span
            key={idx}
            className={`w-2.5 h-2 rounded-sm transition-all ${
              idx < filledBlocks
                ? 'bg-[#B4D9FD]'
                : 'bg-[#222220] border border-[#2a2a26]'
            }`}
          />
        ))}
        <span className="ml-2 font-mono text-xs text-[#FAF9F5] font-semibold">{level}%</span>
      </div>
    );
  };

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-left space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B4D9FD] bg-[#171715] px-3 py-1 border border-[#2a2a26] rounded-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>// 02. TECH STACK &amp; TOOLS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF9F5] tracking-tight uppercase font-pixel-head">
          WHAT I WORK WITH
        </h2>
        <p className="text-[#EDECE8]/70 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
          Here are the main programming languages, frameworks, and databases I use to build fast, reliable web applications and AI tools.
        </p>
      </div>

      {/* Sector Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#222220]">
        <button
          onClick={() => handleSectorChange('ALL')}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-all ${
            selectedSector === 'ALL'
              ? 'bg-[#B4D9FD] text-black border-[#B4D9FD] font-bold'
              : 'border-dashed border-[#EDECE8]/30 text-[#EDECE8]/80 hover:bg-[#B4D9FD] hover:text-black hover:border-transparent'
          }`}
        >
          [ALL SKILLS]
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.sector}
            onClick={() => handleSectorChange(cat.sector)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-all ${
              selectedSector === cat.sector
                ? 'bg-[#B4D9FD] text-black border-[#B4D9FD] font-bold'
                : 'border-dashed border-[#EDECE8]/30 text-[#EDECE8]/80 hover:bg-[#B4D9FD] hover:text-black hover:border-transparent'
            }`}
          >
            [{cat.title}]
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="space-y-12">
        {filteredCategories.map((cat) => (
          <div key={cat.sector} className="space-y-4">
            
            {/* Category Banner */}
            <div className="flex items-center justify-between border-b border-[#2a2a26] pb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2 py-0.5 bg-[#171715] text-[#B4D9FD] border border-[#2a2a26] rounded">
                  {cat.sector}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-mono text-[#FAF9F5] tracking-tight uppercase">
                  {cat.title}
                </h3>
              </div>
              <span className="text-xs text-[#EDECE8]/40 font-mono hidden sm:inline">
                {cat.skills.length} TOOLS
              </span>
            </div>

            <p className="text-xs text-[#EDECE8]/60 max-w-2xl font-sans">
              {cat.description}
            </p>

            {/* Skills Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => sound.playBlip(750, 0.02)}
                  className="dev-card p-4 rounded-md text-left group transition-all relative"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{skill.icon}</span>
                      <div>
                        <h4 className="font-bold text-[#FAF9F5] group-hover:text-[#B4D9FD] transition-colors font-mono text-sm">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 border rounded-sm mt-1 inline-block text-[#B4D9FD] border-[#B4D9FD]/40 bg-[#B4D9FD]/10">
                          {skill.tier}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Level Bar */}
                  <div className="mt-4 pt-3 border-t border-[#222220]">
                    <div className="text-[10px] font-mono text-[#EDECE8]/40 mb-1 flex justify-between">
                      <span>CONFIDENCE</span>
                      <span>EXPERIENCE</span>
                    </div>
                    {renderPixelBar(skill.level)}
                  </div>

                  {/* Simple Plain-English Description */}
                  <p className="text-xs text-[#EDECE8]/70 font-sans mt-3 leading-relaxed">
                    &bull; {skill.detail}
                  </p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

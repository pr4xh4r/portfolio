import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const StatsBanner: React.FC = () => {
  const { telemetry } = PORTFOLIO_DATA;

  const statItems = [
    { label: 'EXPERIENCE', value: telemetry.yearsExp, desc: 'Full-Stack Development', color: 'text-[#B4D9FD]' },
    { label: 'PROJECTS BUILT', value: telemetry.missionsCompleted, desc: 'Web Apps, Tools & APIs', color: 'text-[#FAF9F5]' },
    { label: 'RELIABILITY', value: telemetry.availability, desc: 'Clean, Tested Software', color: 'text-[#33FF7D]' },
    { label: 'SPEED', value: telemetry.latency, desc: 'Fast, Sub-Second Loads', color: 'text-[#B4D9FD]' },
    { label: 'CODE WRITTEN', value: telemetry.codeUnitsCrafted, desc: 'React, Node, Go, Python', color: 'text-[#FAF9F5]' },
  ];

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#171715]/80 border border-[#2a2a26] rounded-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#222220] shadow-sm">
        {statItems.map((stat, i) => (
          <div key={i} className="p-4 sm:p-5 text-left group hover:bg-[#1a1a18] transition-colors">
            <div className="text-[10px] font-mono text-[#EDECE8]/40 uppercase tracking-wider">
              [METRIC 0{i + 1}]
            </div>
            <div className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${stat.color} tracking-tight`}>
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-[#FAF9F5] mt-1 font-mono">
              {stat.label}
            </div>
            <div className="text-[11px] text-[#EDECE8]/50 mt-0.5 font-sans">
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

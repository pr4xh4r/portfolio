import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const technologies = [
    'TypeScript / JavaScript',
    'Python',
    'Go (Golang)',
    'React & Next.js',
    'Rust & Systems',
    'Gemini API & AI Agents',
    'PostgreSQL & Redis',
    'Docker & Linux',
  ];

  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left">
      {/* Section Header with extending horizontal line */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF9F5] flex items-center gap-2 whitespace-nowrap">
          <span className="text-[#B4D9FD] font-mono">/</span>
          <span>about me</span>
        </h2>
        <div className="h-[1px] bg-[#2a2a26] flex-grow max-w-md"></div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Text & Skills */}
        <div className="md:col-span-7 space-y-5 text-sm sm:text-base text-[#EDECE8]/85 font-sans leading-relaxed">
          <p>
            I am the founder of <span className="text-[#B4D9FD] font-semibold">Build x</span>, where I architect intelligence by building AI-native software and autonomous systems that make hardware think. Previously, I've engineered high-throughput event streaming systems and production web platforms.
          </p>

          <p>
            My work focuses on the intersection of deep systems, physical computing, and machine intelligence — crafting software that is fast, resilient, and human-friendly.
          </p>

          <p className="text-xs sm:text-sm text-[#EDECE8]/70 pt-1 font-mono uppercase tracking-wider">
            Here are some technologies I have been working with:
          </p>

          {/* 2-Column Tech Grid with triangle bullets */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1 font-mono text-xs sm:text-sm">
            {technologies.map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-[#EDECE8]/90 group">
                <span className="text-[#B4D9FD] text-xs transition-transform group-hover:translate-x-0.5">▷</span>
                <span className="group-hover:text-[#FAF9F5] transition-colors">{tech}</span>
              </div>
            ))}
          </div>

          <p className="pt-2 text-xs sm:text-sm text-[#EDECE8]/70 italic">
            In my free time, I build hardware cyberdecks, experiment with physical AI, play battle royale games, and document my builds in the public domain.
          </p>
        </div>

        {/* Right Column: Real Photo Card */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="relative group max-w-xs w-full">
            {/* Soft decorative backdrop glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B4D9FD]/20 to-[#388bfd]/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>

            {/* Main Photo container */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2a2a26] group-hover:border-[#B4D9FD]/60 bg-[#171715] shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
              <img
                src="/avatar_blue.png"
                alt={profile.name}
                className="w-full h-auto object-cover aspect-square contrast-105 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121211]/80 via-transparent to-transparent opacity-50 pointer-events-none"></div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#EDECE8]/80 pointer-events-none">
                <span className="text-[#B4D9FD]">@{profile.handle}</span>
                <span>India // Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

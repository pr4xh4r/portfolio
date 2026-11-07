import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hardware: React.FC = () => {
  const { hardware } = PORTFOLIO_DATA;

  return (
    <section id="hardware" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left">
      {/* Section Header with extending horizontal line */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF9F5] flex items-center gap-2 whitespace-nowrap">
          <span className="text-[#B4D9FD] font-mono">/</span>
          <span>hardware</span>
        </h2>
        <div className="h-[1px] bg-[#2a2a26] flex-grow max-w-md"></div>
      </div>

      {/* Hardware 3-Card Grid matching Screenshot 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hardware.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between bg-[#171715] border border-[#2a2a26] hover:border-[#B4D9FD]/70 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-lg"
          >
            <div>
              {/* Image banner on top */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-[#121211] border-b border-[#222220]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text content */}
              <div className="p-6 space-y-3">
                <div className="text-[11px] font-mono text-[#B4D9FD] uppercase tracking-wider">
                  {item.category}
                </div>
                <h3 className="text-lg font-bold text-[#FAF9F5] group-hover:text-[#B4D9FD] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#EDECE8]/75 font-sans leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Bottom link matching Screenshot 4 */}
            <div className="px-6 pb-6 pt-2">
              <a
                href={item.logUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B4D9FD] hover:text-[#FAF9F5] transition-colors"
              >
                <span>Full project log</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

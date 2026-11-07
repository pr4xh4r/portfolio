import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  onWarpTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onWarpTo }) => {
  const scrollToTop = () => {
    sound.playWarp();
    onWarpTo('hero');
  };

  return (
    <footer className="relative border-t border-[#2a2a26] bg-[#121211] pt-10 pb-0 overflow-hidden text-center z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-8">
        {/* Return to top button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 px-4 bg-[#171715] hover:bg-[#B4D9FD] hover:text-black border border-dashed border-[#EDECE8]/40 text-[#EDECE8] font-mono text-xs flex items-center gap-2 rounded-md transition-all cursor-pointer"
          title="Return to Top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>


      {/* Massive Pixel Wordmark at the very bottom */}
      <div className="w-full overflow-hidden select-none pointer-events-none flex justify-center items-end pt-4 pb-0 border-t border-[#1c1c1a]/70">
        <span className="font-pixel-head font-bold text-[18vw] sm:text-[20vw] leading-none tracking-tight text-white/[0.08] text-center whitespace-nowrap block translate-y-[2.5%]">
          pr4xh4r
        </span>
      </div>
    </footer>
  );
};

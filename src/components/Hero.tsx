import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { AsciiSilhouette } from './AsciiSilhouette';

interface HeroProps {
  onWarpTo: (sectionId: string) => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWarpTo, onOpenTerminal }) => {
  const { profile } = PORTFOLIO_DATA;

  const handleSayHi = () => {
    sound.playSuccess();
    window.location.href = `mailto:${profile.email}`;
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20 pb-12">
      {/* Top Left Game / Terminal Mode Pill Button */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => {
            sound.playTerminalKey();
            onOpenTerminal();
          }}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a2a26] hover:border-[#B4D9FD] bg-[#171715]/80 text-[11px] font-mono text-[#EDECE8]/80 hover:text-[#FAF9F5] transition-all shadow-sm"
          title="Open Dev Terminal / Game Mode"
        >
          <span className="w-2 h-2 rounded-full bg-[#B4D9FD] animate-pulse"></span>
          <span className="tracking-wider uppercase">TERMINAL / GAME MODE</span>
        </button>
      </div>

      {/* Main Hero Container: Left ASCII Simulation + Right Intro Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Interactive 3D ASCII Simulation Container */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-1">
          <div className="relative group">
            {/* Subtle soft circular radial glow */}
            <div className="absolute inset-0 bg-[#B4D9FD]/10 rounded-full blur-3xl pointer-events-none -z-10 transform scale-90"></div>
            <AsciiSilhouette />
          </div>
        </div>

        {/* Right Side: Intro Block matching Gazi Jarin reference */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-2">
          {/* Title: "hi, prakhar here." with blinking cursor */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-[#FAF9F5] leading-none">
            hi, <span className="text-[#B4D9FD] inline-block hover:scale-105 transition-transform duration-200">prakhar</span> here.
            <span className="text-[#B4D9FD] font-light ml-1 animate-terminal-blink">|</span>
          </h1>

          {/* Intro Description */}
          <p className="text-sm sm:text-lg text-[#EDECE8]/80 max-w-xl font-sans leading-relaxed">
            Software engineer and founder of <span className="text-[#B4D9FD] font-medium">Build x</span>. I architect intelligence by building AI-native software and autonomous systems that make hardware think. Occasionally both happen at the same time.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Say Hi Button (Signature Gazi Pill Style) */}
            <button
              onClick={handleSayHi}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded border border-[#B4D9FD] text-[#B4D9FD] hover:bg-[#B4D9FD]/15 hover:-translate-y-0.5 active:translate-y-0 text-sm font-mono font-semibold transition-all shadow-[0_0_15px_rgba(180,217,253,0.15)] hover:shadow-[0_0_25px_rgba(180,217,253,0.3)]"
            >
              <Mail className="w-4 h-4" />
              <span>Say hi!</span>
            </button>

            {/* View Work Link */}
            <button
              onClick={() => {
                sound.playWarp();
                onWarpTo('projects');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-transparent hover:border-[#2a2a26] text-[#EDECE8]/75 hover:text-[#FAF9F5] text-sm font-mono transition-all"
            >
              <span>Explore projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  ArrowRight, Copy, Check, Briefcase, MapPin, Globe, Send,
  Brain, Infinity as InfinityIcon, Layers, Workflow 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';


interface HeroProps {
  onWarpTo: (sectionId: string) => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWarpTo, onOpenTerminal }) => {
  const { profile } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {

    sound.playSuccess();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const techPills = [
    { label: 'PHYSICAL AI', icon: <Brain className="w-3.5 h-3.5 text-[#B4D9FD]" /> },
    { label: 'SUPER INTELLIGENCE (SI)', icon: <InfinityIcon className="w-3.5 h-3.5 text-[#B4D9FD]" /> },
    { label: 'AI-NATIVE PRODUCTS', icon: <Layers className="w-3.5 h-3.5 text-[#B4D9FD]" /> },
    { label: 'AUTONOMOUS SYSTEMS', icon: <Workflow className="w-3.5 h-3.5 text-[#B4D9FD]" /> },
  ];


  return (
    <div id="hero" className="relative pt-16 pb-16 w-full text-center overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-6 sm:pt-10">
        
        {/* 2. Main Top Hero Grid: Left Content + Right Profile Photo */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          
          {/* Left Column: Headline, simple intro, buttons, CLI */}
          <div className="lg:col-span-7 space-y-5">
            

            {/* Headline in Pixelify Sans font */}
            <h1 className="font-pixel-head text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#FAF9F5] leading-[1.08]">
              BUILDING<br />
              <span className="text-[#B4D9FD]">X THAT HELPS.</span>
            </h1>

            {/* Bio paragraph */}
            <p className="text-[#EDECE8]/90 text-sm sm:text-base font-sans leading-relaxed">
              Founder of Build x. Architecting intelligence by building AI-native software and autonomous systems that make hardware think.
            </p>

            {/* Simple Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Blue Button */}
              <button
                onClick={() => {
                  sound.playWarp();
                  onWarpTo('projects');
                }}
                className="group flex items-center justify-center gap-2 px-5 py-2.5 bg-[#B4D9FD] hover:bg-[#9ecbff] text-black font-mono text-xs uppercase tracking-wider rounded-md font-semibold transition-all shadow-sm"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Dashed Button */}
              <button
                onClick={() => {
                  sound.playBlip(600, 0.05);
                  onWarpTo('contact');
                }}
                className="group flex items-center justify-center gap-2 px-5 py-2.5 bg-[#171715] hover:bg-[#B4D9FD] hover:text-black text-[#EDECE8] font-mono text-xs uppercase tracking-wider rounded-md border border-dashed border-[#EDECE8]/40 hover:border-transparent transition-all"
              >
                <span>CONTACT ME</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Email Copy Pill */}
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#171715] hover:bg-[#20201d] text-[#EDECE8]/80 hover:text-white border border-[#2a2a26] rounded-md font-mono text-xs transition-colors"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#33FF7D]" /> : <Copy className="w-3.5 h-3.5 text-[#B4D9FD]" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Quick CLI bar */}
            <div className="pt-2">
              <div
                onClick={() => {
                  sound.playTerminalKey();
                  onOpenTerminal();
                }}
                className="cursor-pointer group flex items-center justify-between w-full max-w-lg bg-[#171715] border border-[#2a2a26] hover:border-[#B4D9FD] rounded p-2.5 px-3.5 font-mono text-xs transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 text-[11px] sm:text-xs">
                  <span className="text-[#EDECE8]/40 uppercase tracking-wider">DEV TERMINAL</span>
                  <span className="text-[#EDECE8]/40">you@pr4xh4r ~ %</span>
                  <span className="text-[#B4D9FD] font-semibold">contact --say-hi</span>

                  <span className="inline-block w-1.5 h-3.5 bg-[#FAF9F5] animate-terminal-blink"></span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#EDECE8]/40 group-hover:text-[#B4D9FD] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

          </div>

          {/* Right Column: Clean Profile Card matching user reference */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            
            <div className="relative w-full max-w-lg sm:max-w-[490px] lg:max-w-[520px] bg-[#161614] border border-[#2a2a26] rounded-2xl p-8 sm:p-9 lg:p-10 shadow-2xl backdrop-blur-sm group hover:border-[#B4D9FD]/40 transition-colors">
              
              {/* Subtle Ornamental Corners matching reference card */}
              <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t border-l border-[#B4D9FD]/40 pointer-events-none"></div>
              <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t border-r border-[#B4D9FD]/40 pointer-events-none"></div>
              <div className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b border-l border-[#B4D9FD]/40 pointer-events-none"></div>
              <div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b border-r border-[#B4D9FD]/40 pointer-events-none"></div>

              {/* Top Row: Blue Glow Avatar + Name & Handle */}
              <div className="flex items-start gap-6 sm:gap-7">
                
                {/* Blue Glow Avatar */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden shrink-0 border border-[#B4D9FD]/60 shadow-[0_0_30px_rgba(180,217,253,0.3)] bg-[#121211]">
                  <img
                    src="/avatar_blue.png"
                    alt="Prakhar Sharma"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Name & Handle */}
                <div className="min-w-0 pt-2 sm:pt-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-normal text-[#FAF9F5] tracking-tight leading-tight">
                    Prakhar Sharma
                  </h2>
                  <div className="text-sm sm:text-base font-mono text-[#EDECE8]/65 mt-1.5">
                    @{profile.handle}
                  </div>
                </div>



              </div>

              {/* Middle Row: Meta Info (Build x, India, English) with simple clean icons */}
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-7 sm:mt-8 text-sm sm:text-base text-[#EDECE8]/80 font-sans">
                <div className="flex items-center gap-2 text-[#EDECE8]/85 hover:text-white transition-colors">
                  <Briefcase className="w-4 h-4 text-[#B4D9FD] shrink-0" />
                  <span>Build x</span>
                </div>
                <div className="flex items-center gap-2 text-[#EDECE8]/85 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 text-[#B4D9FD] shrink-0" />
                  <span>India</span>
                </div>
                <div className="flex items-center gap-2 text-[#EDECE8]/85 hover:text-white transition-colors">
                  <Globe className="w-4 h-4 text-[#B4D9FD] shrink-0" />
                  <span>English</span>
                </div>
              </div>

              {/* Bottom Row: Simple Social Icons */}
              <div className="flex items-center gap-6 mt-8 pt-7 border-t border-[#22221e]">
                <a
                  href="https://t.me/pr4xh4r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EDECE8]/65 hover:text-[#B4D9FD] hover:scale-110 transition-all p-1"
                  title="Telegram"
                >
                  <Send className="w-5 h-5" />
                </a>

                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EDECE8]/65 hover:text-[#B4D9FD] hover:scale-110 transition-all p-1"
                  title="X / Twitter"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EDECE8]/65 hover:text-[#B4D9FD] hover:scale-110 transition-all p-1"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EDECE8]/65 hover:text-[#B4D9FD] hover:scale-110 transition-all p-1"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>

            </div>

          </div>



        </div>

        {/* 3. Technology Ribbon Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-t border-[#222220]">
          {techPills.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#171715]/60 hover:bg-[#1c1c1a] border border-[#2a2a26] hover:border-[#B4D9FD] rounded text-[11px] font-mono text-[#EDECE8]/80 cursor-default transition-colors shadow-xs"
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

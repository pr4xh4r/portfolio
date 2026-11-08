import React, { useState, useEffect } from 'react';
import { Mail, Terminal, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  onWarpTo: (sectionId: string) => void;
  hidden?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleTerminal,
  onWarpTo,
  hidden = false,
}) => {
  const { profile } = PORTFOLIO_DATA;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Experience', target: 'experience' },
    { label: 'Software', target: 'projects' },
    { label: 'Hardware', target: 'hardware' },
    { label: 'Skills', target: 'skills' },
    { label: 'Art', target: 'photos' },
  ];

  const handleNavClick = (target: string) => {
    sound.playBlip(720, 0.03);
    onWarpTo(target);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } ${
        scrolled
          ? 'bg-[#161616]/90 backdrop-blur-md border-[#2a2a26]'
          : 'bg-[#161616]/60 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Name / Brand */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-base font-bold font-sans tracking-tight text-[#FAF9F5] hover:text-[#B4D9FD] transition-colors focus:outline-none flex items-center gap-2.5 group"
          >
            <div className="w-6 h-6 rounded bg-[#1f1f1d] border border-[#B4D9FD]/30 p-1 flex items-center justify-center group-hover:border-[#B4D9FD] group-hover:shadow-[0_0_10px_rgba(180,217,253,0.3)] transition-all">
              <img src="/buildx_logo_blue.png" alt="Build X" className="w-full h-full object-contain" />
            </div>
            <span>pr4xh4r</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-sans text-[#EDECE8]/80">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="hover:text-[#B4D9FD] transition-colors focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Social & Terminal Icons */}
        <div className="hidden sm:flex items-center gap-4 text-[#EDECE8]/75">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[#B4D9FD] transition-colors p-1"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B4D9FD] transition-colors p-1"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B4D9FD] transition-colors p-1"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              sound.playTerminalKey();
              onToggleTerminal();
            }}
            className="hover:text-[#B4D9FD] transition-colors p-1 focus:outline-none"
            title="Dev Terminal / Mode"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => onToggleTerminal()}
            className="p-2 text-[#EDECE8]/75 hover:text-[#B4D9FD]"
            title="Terminal"
          >
            <Terminal className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#EDECE8]/75 hover:text-[#B4D9FD]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#161614] border-b border-[#2a2a26] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-sans text-base">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-left text-[#EDECE8]/80 hover:text-[#B4D9FD] py-1 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5 pt-4 border-t border-[#222220] text-[#EDECE8]/75">
            <a href={`mailto:${profile.email}`} className="hover:text-[#B4D9FD]">
              <Mail className="w-5 h-5" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#B4D9FD]">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#B4D9FD]">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

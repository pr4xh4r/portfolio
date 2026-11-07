import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

interface NavbarProps {
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  onWarpTo: (sectionId: string) => void;
  hidden?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleTerminal,
  isTerminalOpen,
  onWarpTo,
  hidden = false,
}) => {

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
    { label: 'ABOUT', target: 'hero' },
    { label: 'PHOTOS', target: 'photos' },
    { label: 'SKILLS', target: 'skills' },
    { label: 'PROJECTS', target: 'projects' },
    { label: 'EXPERIENCE', target: 'experience' },
    { label: 'CONTACT', target: 'contact' },
  ];

  const handleNavClick = (target: string) => {
    onWarpTo(target);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } ${
        scrolled
          ? 'bg-[#121211]/90 backdrop-blur-md border-[#2a2a26]'
          : 'bg-[#121211]/80 backdrop-blur-sm border-[#222220]'
      }`}
    >


      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand logo (Pixel mark) */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          {/* Circular Pixel Profile Logo */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#2a2a26] group-hover:border-[#B4D9FD] group-hover:shadow-[0_0_12px_rgba(180,217,253,0.4)] transition-all shrink-0 bg-[#171715]">
            <img
              src="/avatar_pixel.png"
              alt="pr4xh4r logo"
              className="w-full h-full object-cover pixelated"
            />
          </div>

          <div>
            <div className="font-mono text-base font-bold tracking-tight text-[#FAF9F5] group-hover:text-[#B4D9FD] transition-colors">
              pr4xh4r.dev
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="px-2.5 py-1 text-xs font-mono text-[#EDECE8]/80 hover:text-[#000000] hover:bg-[#B4D9FD] border border-transparent hover:border-[#B4D9FD] rounded-md transition-all uppercase tracking-wider"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          



          {/* Terminal / CLI Button */}
          <button
            onClick={() => onToggleTerminal()}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md flex items-center gap-1.5 transition-all ${
              isTerminalOpen
                ? 'bg-[#B4D9FD] text-black shadow-[0_0_15px_rgba(180,217,253,0.4)]'
                : 'bg-[#B4D9FD] text-black hover:bg-[#9ecbff]'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span className="font-bold tracking-wide">&gt; CLI</span>
          </button>


          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#EDECE8] border border-[#2a2a26] rounded-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121211] border-b border-[#2a2a26] px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="w-full text-left py-2 font-mono text-xs text-[#EDECE8] hover:text-[#B4D9FD] border-b border-[#1c1c1a] transition-colors"
            >
              &gt; {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

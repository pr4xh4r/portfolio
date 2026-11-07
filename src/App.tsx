import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Hardware } from './components/Hardware';
import { SkillsArsenal } from './components/SkillsArsenal';
import { PhotoMarquee } from './components/PhotoMarquee';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CosmicTerminal } from './components/CosmicTerminal';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const handleWarpTo = (sectionId: string) => {
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#161616] text-[#EDECE8] font-mono overflow-x-hidden selection:bg-[#388bfd]/30 selection:text-[#B4D9FD]">
      {/* Top Navigation */}
      <Navbar
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
        onWarpTo={handleWarpTo}
        hidden={isPhotoOpen}
      />

      {/* Main Content Stream */}
      <main className="relative z-10 flex flex-col space-y-16 sm:space-y-24">
        <Hero
          onWarpTo={handleWarpTo}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />
        <About />
        <Experience />
        <Projects />
        <Hardware />
        <SkillsArsenal />
        <PhotoMarquee onModalOpenChange={setIsPhotoOpen} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onWarpTo={handleWarpTo} />

      {/* Interactive CLI Terminal */}
      <CosmicTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onWarpTo={handleWarpTo}
      />
    </div>
  );
}

export default App;

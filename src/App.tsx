import { useState } from 'react';
import { CosmicCanvas } from './components/CosmicCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhotoMarquee } from './components/PhotoMarquee';
import { SkillsArsenal } from './components/SkillsArsenal';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CosmicTerminal } from './components/CosmicTerminal';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const handleWarpTo = (sectionId: string) => {
    setIsWarping(true);

    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsWarping(false);
    }, 700);
  };

  return (
    <div className="relative min-h-screen bg-[#121211] text-[#EDECE8] font-mono overflow-x-hidden selection:bg-[#388bfd]/30 selection:text-[#B4D9FD] checkered-bg">
      
      {/* Interactive Cellular Grid Canvas (Conway's Life & migrating square tiles) */}
      <CosmicCanvas isWarping={isWarping} />

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
        <PhotoMarquee onModalOpenChange={setIsPhotoOpen} />
        <SkillsArsenal />
        <Projects />
        <Experience />
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

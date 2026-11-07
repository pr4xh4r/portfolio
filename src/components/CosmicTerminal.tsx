import React, { useState, useRef, useEffect } from 'react';
import { X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface CosmicTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onWarpTo: (sectionId: string) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: string;
  timestamp: string;
}

export const CosmicTerminal: React.FC<CosmicTerminalProps> = ({
  isOpen,
  onClose,
  onWarpTo,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-1',
      command: 'welcome',
      output: 'PR4XH4R.DEV // CLI TERMINAL\nType "help" to see available commands.\nType "projects", "skills", or "contact" to learn more.',
      timestamp: '00:00:01',
    },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    sound.playTerminalKey();
    const parts = rawCmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    let output = '';

    switch (mainCmd) {
      case 'help':
        output = PORTFOLIO_DATA.terminalCommands.help;
        break;
      case 'about':
        output = PORTFOLIO_DATA.terminalCommands.about;
        break;
      case 'skills':
        output = PORTFOLIO_DATA.terminalCommands.skills;
        break;
      case 'projects':
        output = PORTFOLIO_DATA.projects
          .map((p) => `• ${p.title} (${p.category.toUpperCase()})\n  ${p.description}\n  GitHub: ${p.github}`)
          .join('\n\n');
        break;
      case 'contact':
        output = PORTFOLIO_DATA.terminalCommands.contact;
        break;
      case 'warp':
        if (!arg) {
          output = 'Please specify a section: "warp projects", "warp skills", or "warp contact".';
        } else {
          const map: Record<string, string> = {
            hero: 'hero',
            about: 'hero',
            photos: 'photos',
            snapshots: 'photos',
            gallery: 'photos',
            skills: 'skills',
            projects: 'projects',
            exp: 'experience',
            experience: 'experience',
            contact: 'contact',
          };
          const target = map[arg];
          if (target) {
            sound.playWarp();
            onWarpTo(target);
            output = `Navigating to ${target.toUpperCase()}... Done!`;
          } else {
            output = `Section "${arg}" not found. Try: about, photos, skills, projects, experience, contact.`;
          }
        }
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'sudo':
        if (arg === 'hire') {
          sound.playSuccess();
          output = PORTFOLIO_DATA.terminalCommands.sudoHire;
        } else {
          output = `Permission denied: ${rawCmd}. Try "sudo hire".`;
        }
        break;

      default:
        output = `Command not recognized: "${rawCmd}". Type "help" to see available commands.`;
    }


    const timestamp = new Date().toTimeString().split(' ')[0];
    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        output,
        timestamp,
      },
    ]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const quickChips = ['help', 'about', 'skills', 'projects', 'warp projects', 'contact', 'sudo hire'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Terminal Window Box */}
      <div
        className={`bg-[#121211] border border-[#B4D9FD] flex flex-col rounded-lg shadow-2xl transition-all ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[560px] max-h-[90vh]'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#171715] border-b border-[#2a2a26] select-none rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#B4D9FD] rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-[#9ecbff] rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-[#33FF7D] rounded-full"></div>
            <span className="ml-2 font-mono text-xs text-[#FAF9F5] font-semibold tracking-tight">
              you@pr4xh4r-cli ~ %
            </span>

          </div>

          <div className="flex items-center gap-2 text-[#EDECE8]/60">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:bg-[#222220] hover:text-white rounded"
              title="Toggle Size"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                sound.playBlip(440, 0.05);
                onClose();
              }}
              className="p-1 hover:bg-[#B4D9FD]/20 hover:text-[#B4D9FD] rounded"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#141413] border-b border-[#222220] overflow-x-auto text-[10px] font-mono">
          <span className="text-[#EDECE8]/40 shrink-0">COMMANDS:</span>
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => executeCommand(chip)}
              className="px-2 py-0.5 bg-transparent hover:bg-[#B4D9FD] hover:text-black text-[#EDECE8]/80 border border-dashed border-[#EDECE8]/30 rounded-sm shrink-0 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Terminal Scroll Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm text-left select-text">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[#B4D9FD] font-semibold">
                <span className="text-[#FAF9F5]">&gt;</span>
                <span>{item.command}</span>
                <span className="text-[10px] text-[#EDECE8]/40 ml-auto font-mono">
                  [{item.timestamp}]
                </span>
              </div>
              <div className="text-[#EDECE8]/90 whitespace-pre-wrap pl-4 border-l border-[#2a2a26] text-xs sm:text-[13px] leading-relaxed">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 bg-[#171715] border-t border-[#2a2a26] rounded-b-lg"
        >
          <span className="text-[#B4D9FD] font-mono text-xs shrink-0">&gt;&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. projects, skills, contact)..."
            className="flex-1 bg-transparent text-[#FAF9F5] font-mono text-xs sm:text-sm focus:outline-none placeholder:text-[#EDECE8]/30"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#B4D9FD] hover:bg-[#9ecbff] text-black font-mono text-xs font-semibold rounded flex items-center gap-1 transition-colors"
          >
            <span>SEND</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>

      </div>
    </div>
  );
};

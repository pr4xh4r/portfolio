import React, { useState, useEffect, useRef } from 'react';
import { Zap, Moon, Camera, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

type ViewMode = 'blue_surge' | 'dark' | 'real';

interface PixelGlitchAvatarProps {
  initialMode?: ViewMode;
}

export const PixelGlitchAvatar: React.FC<PixelGlitchAvatarProps> = ({
  initialMode = 'blue_surge',
}) => {
  const [mode, setMode] = useState<ViewMode>(initialMode);
  const [fillProgress, setFillProgress] = useState(0); // 0 to 1
  const [isSurging, setIsSurging] = useState(false);
  const [surgeId, setSurgeId] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger blue energy fill animation
  const triggerBlueSurge = () => {
    sound.playWarp();
    setSurgeId((prev) => prev + 1);
  };

  useEffect(() => {
    if (mode !== 'blue_surge') {
      setFillProgress(0);
      return;
    }

    setIsSurging(true);
    let startTime: number | null = null;
    const duration = 1800; // 1.8 seconds smooth liquid fill
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Smooth ease-in-out curve
      const eased =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      setFillProgress(eased);

      if (rawProgress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setIsSurging(false);
        sound.playSuccess();
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [mode, surgeId]);

  // Canvas renderer for the Blue Fill Surge with dynamic wave and floating grid blocks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isCancelled = false;

    const imgDark = new Image();
    imgDark.src = '/avatar_dark.png';

    const imgBlue = new Image();
    imgBlue.src = '/avatar_blue.png';

    let loadedCount = 0;
    const onImgLoad = () => {
      loadedCount++;
      if (loadedCount === 2 && !isCancelled) {
        drawFrame();
      }
    };

    imgDark.onload = onImgLoad;
    imgBlue.onload = onImgLoad;

    const size = 320;
    canvas.width = size;
    canvas.height = size;

    let frame = 0;

    const drawFrame = () => {
      if (isCancelled) return;
      frame++;

      ctx.clearRect(0, 0, size, size);

      if (mode === 'dark') {
        // Pure seamless dark mode
        ctx.drawImage(imgDark, 0, 0, size, size);
      } else if (mode === 'real') {
        // Handled by the real camera image element
      } else {
        // --- BLUE SURGE MODE: Clean Liquid Color Fill (No squares) ---
        // 1. Draw base dark portrait
        ctx.drawImage(imgDark, 0, 0, size, size);

        // 2. Smooth liquid wave clipping boundary
        const waterLevelY = (1 - fillProgress) * size;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, size);

        // Sinusoidal undulating wave front
        const waveAmp = isSurging ? Math.sin(frame * 0.08) * 5 : 0;
        for (let x = 0; x <= size; x += 8) {
          const wave = Math.sin((x / 45) + frame * 0.1) * waveAmp;
          ctx.lineTo(x, waterLevelY + wave);
        }

        ctx.lineTo(size, size);
        ctx.closePath();
        ctx.clip();

        // Draw blue avatar into clipped region
        ctx.drawImage(imgBlue, 0, 0, size, size);
        ctx.restore();

        // 3. Glowing Laser Crest Line along the wave boundary
        if (fillProgress > 0 && fillProgress < 1) {
          ctx.save();
          const waveAtCenter = waterLevelY + Math.sin(frame * 0.1) * waveAmp;

          // Soft blue bloom glow
          const grad = ctx.createLinearGradient(0, waveAtCenter - 12, 0, waveAtCenter + 12);
          grad.addColorStop(0, 'rgba(180, 217, 253, 0)');
          grad.addColorStop(0.5, 'rgba(180, 217, 253, 0.95)');
          grad.addColorStop(1, 'rgba(180, 217, 253, 0)');

          ctx.fillStyle = grad;
          ctx.fillRect(0, waveAtCenter - 10, size, 20);

          // Intense core white-blue beam
          ctx.fillStyle = '#FAF9F5';
          ctx.fillRect(0, waveAtCenter - 1, size, 2);
          ctx.restore();
        } else if (fillProgress >= 1) {
          // Fully filled with blue!
          ctx.drawImage(imgBlue, 0, 0, size, size);
        }
      }

      if (mode === 'blue_surge' && isSurging) {
        animId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
    };
  }, [mode, fillProgress, isSurging]);

  const handleSelectMode = (newMode: ViewMode) => {
    if (newMode === mode) return;
    sound.playTerminalKey();
    setMode(newMode);
    if (newMode === 'blue_surge') {
      triggerBlueSurge();
    }
  };

  return (
    <div className="relative group select-none w-full max-w-[280px] sm:max-w-[320px] mx-auto space-y-3">
      {/* 3-Way Mode Selector */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#171715] border border-[#2a2a26] rounded-md font-mono text-[10px]">
        <button
          type="button"
          onClick={() => handleSelectMode('blue_surge')}
          className={`flex items-center justify-center gap-1 py-1.5 rounded transition-all ${
            mode === 'blue_surge'
              ? 'bg-[#B4D9FD] text-[#121211] font-bold shadow-[0_0_12px_rgba(180,217,253,0.4)]'
              : 'text-[#EDECE8]/60 hover:text-[#EDECE8]'
          }`}
          title="Interactive Blue Accent Fill"
        >
          <Zap className="w-3 h-3" />
          <span>BLUE GLOW</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectMode('dark')}
          className={`flex items-center justify-center gap-1 py-1.5 rounded transition-all ${
            mode === 'dark'
              ? 'bg-[#B4D9FD] text-[#121211] font-bold shadow-sm'
              : 'text-[#EDECE8]/60 hover:text-[#EDECE8]'
          }`}
          title="Monochrome Minimalist Style"
        >
          <Moon className="w-3 h-3" />
          <span>MONO</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectMode('real')}
          className={`flex items-center justify-center gap-1 py-1.5 rounded transition-all ${
            mode === 'real'
              ? 'bg-[#B4D9FD] text-[#121211] font-bold shadow-sm'
              : 'text-[#EDECE8]/60 hover:text-[#EDECE8]'
          }`}
          title="Original Camera Photo"
        >
          <Camera className="w-3 h-3" />
          <span>PHOTO</span>
        </button>
      </div>

      {/* Photo Enclosure Frame with Energy Glow */}
      <div
        onClick={() => {
          if (mode === 'blue_surge') triggerBlueSurge();
          else handleSelectMode('blue_surge');
        }}
        className={`relative aspect-square w-full border-2 rounded-md overflow-hidden bg-[#121211] cursor-pointer transition-all ${
          isSurging
            ? 'border-[#B4D9FD] shadow-[0_0_30px_rgba(180,217,253,0.6)]'
            : mode === 'blue_surge' && fillProgress >= 1
            ? 'border-[#B4D9FD] shadow-[0_4px_24px_rgba(180,217,253,0.3)]'
            : 'border-[#2a2a26]'
        }`}
      >
        {/* Real Camera Image (shown only when in real mode) */}
        {mode === 'real' ? (
          <img
            src="/profile.jpeg"
            alt="pr4xh4r"
            className="w-full h-full object-cover object-top"
          />

        ) : (
          /* Dynamic Canvas Rendering the Liquid Blue Wave */
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        )}

        {/* Scanlines overlay for authentic terminal feel */}
        <div className="absolute inset-0 avatar-scanlines opacity-25 pointer-events-none"></div>

        {/* Live HUD Progress Display during the Blue Surge */}
        {mode === 'blue_surge' && isSurging && (
          <div className="absolute top-2.5 left-2.5 font-mono text-[10px] text-[#121211] bg-[#B4D9FD] px-2 py-0.5 rounded font-bold shadow-md animate-pulse">
            ⚡ COLOR FILL: {Math.floor(fillProgress * 100)}%
          </div>
        )}
      </div>

      {/* Bottom Status & Manual Trigger */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono px-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isSurging
                ? 'bg-[#B4D9FD] animate-ping'
                : mode === 'blue_surge'
                ? 'bg-[#33FF7D] shadow-[0_0_6px_#33ff7d]'
                : mode === 'dark'
                ? 'bg-[#B4D9FD]'
                : 'bg-[#33FF7D]'
            }`}
          />
          <span className="text-[#EDECE8]/70">
            {isSurging
              ? 'APPLYING ACCENT...'
              : mode === 'blue_surge'
              ? 'ICE BLUE [ACTIVE]'
              : mode === 'dark'
              ? 'MONOCHROME [ACTIVE]'
              : 'CAMERA PHOTO [ACTIVE]'}
          </span>
        </div>

        {mode === 'blue_surge' && (
          <button
            type="button"
            onClick={triggerBlueSurge}
            className="text-[#B4D9FD] hover:text-white flex items-center gap-1 hover:underline underline-offset-2 transition-colors font-medium"
            title="Replay Color Fill Animation"
          >
            <RotateCcw className="w-3 h-3" />
            <span>REPLAY</span>
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState, useCallback } from 'react';
import solidAvatarData from '../data/asciiPoints.json';
import buildxData from '../data/buildxAsciiPoints.json';
import { sound } from '../utils/audio';

interface Point {
  x: number;
  y: number;
  char: string;
  alpha: number;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  fontSize: number;
  baseAlpha: number;
  currentAlpha: number;
  delay: number;
  shimmer: number;
}

interface Shockwave {
  x: number;
  y: number;
  startTime: number;
  maxRadius: number;
  speed: number;
}

const getCanvasSize = (w: number) => {
  if (w <= 480) return Math.min(240, w - 40);
  if (w <= 768) return Math.min(300, w - 60);
  return 400;
};

export const AsciiSilhouette: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const startTimeRef = useRef<number>(performance.now());

  const [canvasSize, setCanvasSize] = useState<number>(() =>
    typeof window !== 'undefined' ? getCanvasSize(window.innerWidth) : 400
  );
  const [isReady, setIsReady] = useState(false);
  const [activeModel, setActiveModel] = useState<'avatar' | 'buildx'>('avatar');
  const activeModelRef = useRef<'avatar' | 'buildx'>('avatar');
  activeModelRef.current = activeModel;

  const toggleModel = useCallback(() => {
    const nextModel = activeModelRef.current === 'avatar' ? 'buildx' : 'avatar';
    setActiveModel(nextModel);
    activeModelRef.current = nextModel;

    sound.playWarp();
    // Add radial shockwave at center of canvas
    shockwavesRef.current.push({
      x: canvasSize / 2,
      y: canvasSize / 2,
      startTime: performance.now(),
      maxRadius: canvasSize * 0.9,
      speed: 380,
    });

    const key = canvasSize <= 240 ? '220' : canvasSize <= 300 ? '280' : '400';
    const targetSet = nextModel === 'buildx'
      ? (buildxData as Record<string, Point[]>)[key]
      : (solidAvatarData as Record<string, Point[]>)[key];

    if (!targetSet || targetSet.length === 0) return;

    particlesRef.current.forEach((p, idx) => {
      const target = targetSet[idx % targetSet.length];
      p.targetX = target.x;
      p.targetY = target.y;
      p.char = target.char;
      p.baseAlpha = target.alpha;
      // Dynamic outward dispersion kick so particles swarm into new form
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      p.vx += Math.cos(angle) * speed;
      p.vy += Math.sin(angle) * speed;
    });
  }, [canvasSize]);

  useEffect(() => {
    const handleToggle = () => toggleModel();
    window.addEventListener('toggle-avatar-morph', handleToggle);
    return () => window.removeEventListener('toggle-avatar-morph', handleToggle);
  }, [toggleModel]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getCanvasSize(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize particles from points
  const createParticles = (points: Point[], isSmall: boolean): Particle[] => {
    const fontSize = isSmall ? 5 : 7;
    return points.map((p) => ({
      x: p.x + (Math.random() - 0.5) * 400,
      y: p.y + (Math.random() - 0.5) * 400,
      targetX: p.x,
      targetY: p.y,
      vx: 0,
      vy: 0,
      char: p.char,
      fontSize,
      baseAlpha: p.alpha,
      currentAlpha: 0,
      delay: Math.random() * 0.4,
      shimmer: Math.random() * Math.PI * 2,
    }));
  };

  // Load avatar or buildx points
  useEffect(() => {
    const isSmall = canvasSize <= 280;
    const key = canvasSize <= 240 ? '220' : canvasSize <= 300 ? '280' : '400';
    const targetData = activeModelRef.current === 'buildx' ? buildxData : solidAvatarData;
    const precomputed = (targetData as Record<string, Point[]>)[key];

    if (precomputed && precomputed.length > 0) {
      particlesRef.current = createParticles(precomputed, isSmall);
      setIsReady(true);
      startTimeRef.current = performance.now();
    }
  }, [canvasSize]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    ctx.scale(dpr, dpr);

    let animationId: number;

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      if (!isReady || particlesRef.current.length === 0) return;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const targetMouse = targetMouseRef.current;
      const now = performance.now();
      const elapsed = (now - startTimeRef.current) / 1000;

      // Mouse smoothing
      mouse.x += (targetMouse.x - mouse.x) * 0.15;
      mouse.y += (targetMouse.y - mouse.y) * 0.15;

      const isSmall = canvasSize <= 280;
      ctx.font = `${isSmall ? 5 : 7}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 1. Process active shockwaves (invisible force wave)
      const activeShockwaves: Shockwave[] = [];
      shockwavesRef.current.forEach((sw) => {
        const age = (now - sw.startTime) / 1000;
        const radius = age * sw.speed;

        if (radius < sw.maxRadius) {
          activeShockwaves.push(sw);
        }
      });
      shockwavesRef.current = activeShockwaves;

      // 2. Update and render particles
      particles.forEach((p) => {
        const timeSince = elapsed - p.delay;
        if (timeSince < 0) return;

        // Smooth assembly easing
        const introProgress = 1 - Math.pow(1 - Math.min(timeSince / 1.5, 1), 2);
        const isInteracting = mouse.active || timeSince < 3 || activeShockwaves.length > 0;
        const shimmerOffset = isInteracting
          ? Math.sin(elapsed * 2 + p.shimmer) * 0.1
          : 0;

        p.currentAlpha = Math.max(0, p.baseAlpha * introProgress + shimmerOffset);
        const springPower = 1 - Math.pow(1 - Math.min(timeSince / 2.5, 1), 3);

        // A. Interactive continuous mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = canvasSize * 0.22;

          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * 4.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // B. Active Shockwave impulse physics
        activeShockwaves.forEach((sw) => {
          const age = (now - sw.startTime) / 1000;
          const waveRadius = age * sw.speed;
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Impulse applied as the wave front sweeps across the particle
          const distFromFront = Math.abs(dist - waveRadius);
          if (distFromFront < 24 && dist > 0) {
            const progress = waveRadius / sw.maxRadius;
            const waveForce = (1 - progress) * (1 - distFromFront / 24) * 6.5;
            p.vx += (dx / dist) * waveForce;
            p.vy += (dy / dist) * waveForce;
          }
        });

        // C. Spring back to target position
        const targetDx = p.targetX - p.x;
        const targetDy = p.targetY - p.y;
        const springFactor = 0.01 + springPower * 0.08;

        p.vx += targetDx * springFactor;
        p.vy += targetDy * springFactor;

        if (isInteracting) {
          // Floating wave breathing effect
          const waveX = Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.15;
          const waveY = Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.15;
          p.vx += waveX;
          p.vy += waveY;
          p.vx *= 0.92;
          p.vy *= 0.92;
        } else {
          p.vx *= 0.85;
          p.vy *= 0.85;
          if (
            timeSince > 4 &&
            Math.abs(targetDx) < 0.01 &&
            Math.abs(targetDy) < 0.01
          ) {
            p.x = p.targetX;
            p.y = p.targetY;
            p.vx = 0;
            p.vy = 0;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // D. Kinetic Velocity Glow: particles brighten toward white when moving fast
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const energy = Math.min(1.0, speed / 5.0);

        if (energy > 0.05) {
          // Interpolate from Ice Blue (#B4D9FD / 180, 217, 253) toward pure Electric White
          const r = Math.round(180 + (255 - 180) * energy);
          const g = Math.round(217 + (255 - 217) * energy);
          const b = Math.round(253 + (255 - 253) * energy);
          const alpha = Math.min(1.0, p.currentAlpha + energy * 0.35);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(180, 217, 253, ${p.currentAlpha})`;
        }

        ctx.fillText(p.char, p.x, p.y);
      });
    };

    // Trigger shockwave at position
    const triggerShockwave = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      shockwavesRef.current.push({
        x,
        y,
        startTime: performance.now(),
        maxRadius: canvasSize * 0.85,
        speed: 550, // fast, punchy shockwave speed in px/sec
      });

      sound.playWarp();
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = e.clientX - rect.left;
      targetMouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleClick = (e: MouseEvent) => {
      triggerShockwave(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        triggerShockwave(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      targetMouseRef.current.x = touch.clientX - rect.left;
      targetMouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
      if (e.cancelable) e.preventDefault();
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      targetMouseRef.current.x = -1000;
      targetMouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleMouseLeave);

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
    };
  }, [canvasSize, isReady]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        onDoubleClick={toggleModel}
        className="simulation-container select-none active:scale-[0.99] transition-transform duration-100"
        style={{
          width: `${canvasSize}px`,
          height: `${canvasSize}px`,
          cursor: 'crosshair',
          touchAction: 'none',
        }}
        title="Interactive ASCII Particle Matrix — Click to shockwave, double-click or use button below to morph!"
      />

      {/* Sleek Minimal Morph Indicator */}
      <div className="mt-2.5 flex items-center gap-2">
        <button
          onClick={toggleModel}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2a26] hover:border-[#B4D9FD]/40 bg-[#161616] hover:bg-[#1f1f1d] text-[#EDECE8]/60 hover:text-[#B4D9FD] text-[11px] font-mono transition-all group shadow-sm"
          title="Morph particle simulation between portrait and Build X emblem (double-click canvas also works)"
        >
          <span className="text-[#B4D9FD] group-hover:rotate-180 transition-transform duration-500 text-xs">⟳</span>
          <span>{activeModel === 'buildx' ? 'RESTORE PORTRAIT' : 'MORPH: BUILD X'}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${activeModel === 'buildx' ? 'bg-[#B4D9FD] animate-pulse' : 'bg-[#B4D9FD]/40'}`}></span>
        </button>
      </div>
    </div>
  );
};

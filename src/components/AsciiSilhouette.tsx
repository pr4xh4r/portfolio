import React, { useEffect, useRef, useState } from 'react';
import solidAvatarData from '../data/asciiPoints.json';

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
  const startTimeRef = useRef<number>(performance.now());

  const [canvasSize, setCanvasSize] = useState<number>(() =>
    typeof window !== 'undefined' ? getCanvasSize(window.innerWidth) : 400
  );
  const [isReady, setIsReady] = useState(false);

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

  // Load solid avatar points
  useEffect(() => {
    const isSmall = canvasSize <= 280;
    const key = canvasSize <= 240 ? '220' : canvasSize <= 300 ? '280' : '400';
    const precomputed = (solidAvatarData as Record<string, Point[]>)[key];

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
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      // Mouse smoothing
      mouse.x += (targetMouse.x - mouse.x) * 0.15;
      mouse.y += (targetMouse.y - mouse.y) * 0.15;

      const isSmall = canvasSize <= 280;
      ctx.font = `${isSmall ? 5 : 7}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      particles.forEach((p) => {
        const timeSince = elapsed - p.delay;
        if (timeSince < 0) return;

        // Smooth assembly easing
        const introProgress = 1 - Math.pow(1 - Math.min(timeSince / 1.5, 1), 2);
        const isInteracting = mouse.active || timeSince < 3;
        const shimmerOffset = isInteracting
          ? Math.sin(elapsed * 2 + p.shimmer) * 0.1
          : 0;

        p.currentAlpha = Math.max(0, p.baseAlpha * introProgress + shimmerOffset);
        const springPower = 1 - Math.pow(1 - Math.min(timeSince / 2.5, 1), 3);

        // Interactive mouse repulsion
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

        // Spring back to target position
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

        // Signature Ice-Blue palette styling
        ctx.fillStyle = `rgba(180, 217, 253, ${p.currentAlpha})`;
        ctx.fillText(p.char, p.x, p.y);
      });
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = e.clientX - rect.left;
      targetMouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
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
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleMouseLeave);

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
    };
  }, [canvasSize, isReady]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="simulation-container select-none"
        style={{
          width: `${canvasSize}px`,
          height: `${canvasSize}px`,
          cursor: 'crosshair',
          touchAction: 'none',
        }}
        title="Interactive ASCII Particle Matrix — move your mouse or touch to scatter particles"
      />
    </div>
  );
};

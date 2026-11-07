import React, { useEffect, useRef } from 'react';

interface CosmicCanvasProps {
  isWarping?: boolean;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const GRID_SIZE = 25;
    const OUTER_SIZE = 23;
    const OUTER_RADIUS = 2;
    const INNER_SIZE = 17;
    const INNER_OFFSET = 4;
    const INNER_RADIUS = 1;

    let cols = Math.ceil(width / GRID_SIZE) + 1;
    let rows = Math.ceil(height / GRID_SIZE) + 1;
    let totalCells = cols * rows;

    let grid = new Uint8Array(totalCells);
    let nextGrid = new Uint8Array(totalCells);
    let alphas = new Float32Array(totalCells);

    // Glider patterns for 4 movement directions
    const gliders: [number, number][][] = [
      // Down-Right
      [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
      // Down-Left
      [[0, 1], [1, 0], [2, 0], [2, 1], [2, 2]],
      // Up-Right
      [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1]],
      // Up-Left
      [[0, 0], [0, 1], [0, 2], [1, 0], [2, 1]],
    ];

    // Lightweight spaceship (moves horizontally across the grid)
    const lwss: [number, number][] = [
      [0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3]
    ];

    // Common stable / oscillating shapes
    const stillAndOscillators: [number, number][][] = [
      // 2x2 Block
      [[0, 0], [1, 0], [0, 1], [1, 1]],
      // Blinker
      [[0, 0], [0, 1], [0, 2]],
      // Toad
      [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]],
      // Beacon
      [[0, 0], [0, 1], [1, 0], [2, 3], [3, 2], [3, 3]],
      // Tub
      [[0, 1], [1, 0], [1, 2], [2, 1]],
    ];

    const placePattern = (targetGrid: Uint8Array, pattern: [number, number][], originX: number, originY: number) => {
      for (let i = 0; i < pattern.length; i++) {
        const [dx, dy] = pattern[i];
        const x = (originX + dx + cols) % cols;
        const y = (originY + dy + rows) % rows;
        const idx = y * cols + x;
        targetGrid[idx] = 1;
        alphas[idx] = Math.max(alphas[idx], 0.75);
      }
    };

    // Initialize board with authentic cellular life (Sparse & calm)
    const initBoard = () => {
      grid.fill(0);
      nextGrid.fill(0);
      alphas.fill(0);

      // Seed a couple of wandering gliders (very sparse)
      const numGliders = Math.max(2, Math.floor(cols / 35));
      for (let i = 0; i < numGliders; i++) {
        const g = gliders[Math.floor(Math.random() * gliders.length)];
        const rx = Math.floor(Math.random() * (cols - 8)) + 4;
        const ry = Math.floor(Math.random() * (rows - 8)) + 4;
        placePattern(grid, g, rx, ry);
      }

      // Seed 1 horizontal lightweight spaceship occasionally
      if (cols > 25) {
        const rx = Math.floor(Math.random() * (cols - 10)) + 5;
        const ry = Math.floor(Math.random() * (rows - 10)) + 5;
        placePattern(grid, lwss, rx, ry);
      }

      // Seed a few calm anchor blocks & blinkers (widely spaced)
      const numAnchors = Math.max(3, Math.floor((cols * rows) / 320));
      for (let i = 0; i < numAnchors; i++) {
        const shape = stillAndOscillators[Math.floor(Math.random() * stillAndOscillators.length)];
        const rx = Math.floor(Math.random() * (cols - 6)) + 3;
        const ry = Math.floor(Math.random() * (rows - 6)) + 3;
        placePattern(grid, shape, rx, ry);
      }

      // Minimal sparse dust (0.2%)
      const dustCount = Math.floor(totalCells * 0.002);
      for (let i = 0; i < dustCount; i++) {
        const idx = Math.floor(Math.random() * totalCells);
        grid[idx] = 1;
        alphas[idx] = 0.4 + Math.random() * 0.3;
      }

      // Pre-evolve just 4 steps so it starts organic but clean
      for (let step = 0; step < 4; step++) {
        evolveGameOfLife();
      }
    };

    // Conway's Game of Life step calculation
    const evolveGameOfLife = () => {
      let liveCount = 0;

      for (let y = 0; y < rows; y++) {
        const yTop = (y - 1 + rows) % rows;
        const yBottom = (y + 1) % rows;
        const rowOffset = y * cols;
        const topOffset = yTop * cols;
        const bottomOffset = yBottom * cols;

        for (let x = 0; x < cols; x++) {
          const xLeft = (x - 1 + cols) % cols;
          const xRight = (x + 1) % cols;

          // 8 neighbor count with fast toroidal wrap
          const neighbors =
            grid[topOffset + xLeft] +
            grid[topOffset + x] +
            grid[topOffset + xRight] +
            grid[rowOffset + xLeft] +
            grid[rowOffset + xRight] +
            grid[bottomOffset + xLeft] +
            grid[bottomOffset + x] +
            grid[bottomOffset + xRight];

          const currentIdx = rowOffset + x;
          const isAlive = grid[currentIdx] === 1;

          if (isAlive) {
            nextGrid[currentIdx] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            nextGrid[currentIdx] = neighbors === 3 ? 1 : 0;
          }

          if (nextGrid[currentIdx] === 1) liveCount++;
        }
      }

      // Density limiter: If population grows too high, gently cull excess cells to stay sparse
      if (liveCount > totalCells * 0.016) {
        for (let i = 0; i < totalCells; i++) {
          if (nextGrid[i] === 1 && Math.random() < 0.45) {
            nextGrid[i] = 0;
          }
        }
      }

      // Swap buffers
      const temp = grid;
      grid = nextGrid;
      nextGrid = temp;

      // Auto-replenish if population gets too low or empty (spawn just 1 gentle glider)
      if (liveCount < totalCells * 0.005) {
        replenishLife();
      }
    };

    const replenishLife = () => {
      const g = gliders[Math.floor(Math.random() * gliders.length)];
      const rx = Math.floor(Math.random() * (cols - 8)) + 4;
      const ry = Math.floor(Math.random() * (rows - 8)) + 4;
      placePattern(grid, g, rx, ry);
    };

    initBoard();

    // Interaction state
    let mouseX = -1000;
    let mouseY = -1000;
    let lastCellX = -1;
    let lastCellY = -1;
    let isUserActive = false;
    let lastActivityTime = performance.now();
    let prevMouseX = -1000;
    let prevMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isUserActive = true;
      lastActivityTime = performance.now();

      const cellX = Math.floor(mouseX / GRID_SIZE);
      const cellY = Math.floor(mouseY / GRID_SIZE);

      if (cellX !== lastCellX || cellY !== lastCellY) {
        const dx = mouseX - prevMouseX;
        const dy = mouseY - prevMouseY;
        const speed = Math.hypot(dx, dy);

        // Throttle mouse spawning: only trigger occasionally (28% of moved cells)
        if (Math.random() < 0.28) {
          // When moving with good velocity, small chance to launch a single glider
          if (speed > 22 && Math.random() < 0.15) {
            let chosenGlider = gliders[0];
            if (dx >= 0 && dy >= 0) chosenGlider = gliders[0]; // Down-Right
            else if (dx < 0 && dy >= 0) chosenGlider = gliders[1]; // Down-Left
            else if (dx >= 0 && dy < 0) chosenGlider = gliders[2]; // Up-Right
            else chosenGlider = gliders[3]; // Up-Left

            placePattern(grid, chosenGlider, cellX, cellY);
          } else {
            // Calm single-cell seed that evolves gently
            const bx = (cellX + cols) % cols;
            const by = (cellY + rows) % rows;
            const idx = by * cols + bx;
            grid[idx] = 1;
            alphas[idx] = 0.9;
          }
        }

        lastCellX = cellX;
        lastCellY = cellY;
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      isUserActive = true;
      lastActivityTime = performance.now();

      // Launch migrating glider very rarely on deliberate scroll (10% chance)
      if (scrollDelta > 20 && Math.random() < 0.10) {
        const g = gliders[Math.floor(Math.random() * gliders.length)];
        const rx = Math.floor(Math.random() * (cols - 8)) + 4;
        const ry = Math.floor(Math.random() * (rows - 8)) + 4;
        placePattern(grid, g, rx, ry);
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / GRID_SIZE) + 1;
      rows = Math.ceil(height / GRID_SIZE) + 1;
      totalCells = cols * rows;
      grid = new Uint8Array(totalCells);
      nextGrid = new Uint8Array(totalCells);
      alphas = new Float32Array(totalCells);
      initBoard();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let frameCount = 0;
    let stepTimer = 0;

    // Render loop
    const render = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastActivityTime > 2000) {
        isUserActive = false;
      }

      // Cadence: Balanced, pleasant evolution (52 frames idle ≈ 0.85s, 28 frames active ≈ 0.46s)
      const stepInterval = isUserActive ? 28 : 52;
      stepTimer++;
      if (stepTimer >= stepInterval) {
        evolveGameOfLife();
        stepTimer = 0;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth, responsive alpha transitions for crisp yet soft migration trails
      for (let i = 0; i < totalCells; i++) {
        if (grid[i] === 1) {
          alphas[i] = Math.min(1.0, alphas[i] + 0.08);
        } else if (alphas[i] > 0) {
          alphas[i] = Math.max(0.0, alphas[i] - 0.03);
        }
      }

      // Group active cells into 10 opacity buckets for single-draw-call performance
      type CellPos = { x: number; y: number; effectiveAlpha: number };
      const buckets: CellPos[][] = Array.from({ length: 10 }, () => []);

      for (let y = 0; y < rows; y++) {
        const py = y * GRID_SIZE;
        const rowOffset = y * cols;

        // Skip cells far outside viewport
        if (py < -GRID_SIZE || py > height) continue;

        for (let x = 0; x < cols; x++) {
          const px = x * GRID_SIZE;
          if (px < -GRID_SIZE || px > width) continue;

          const idx = rowOffset + x;
          const a = alphas[idx];
          if (a <= 0.01) continue;

          // Mouse proximity boost
          const distToMouse = Math.hypot(px + 12.5 - mouseX, py + 12.5 - mouseY);
          let boost = 0;
          if (distToMouse < 110) {
            boost = (1 - distToMouse / 110) * 0.22;
          }

          const effectiveAlpha = Math.min(1.0, a + boost);
          const bucketIdx = Math.min(9, Math.max(0, Math.floor(effectiveAlpha * 9.99)));
          buckets[bucketIdx].push({ x: px, y: py, effectiveAlpha });
        }
      }

      // Render each bucket with smooth dual-layer styling
      // R=123, G=167, B=209 (Muted Slate / Ice Blue)
      for (let b = 0; b < 10; b++) {
        const cellList = buckets[b];
        if (cellList.length === 0) continue;

        const bucketAlpha = (b + 0.5) / 10;

        // Layer 1: Outer soft rounded square (23x23, radius 2)
        const outerAlpha = bucketAlpha * 0.14;
        ctx.fillStyle = `rgba(123, 167, 209, ${outerAlpha})`;
        ctx.beginPath();
        for (let i = 0; i < cellList.length; i++) {
          const { x, y } = cellList[i];
          ctx.roundRect(x + 1, y + 1, OUTER_SIZE, OUTER_SIZE, OUTER_RADIUS);
        }
        ctx.fill();

        // Layer 2: Inner core rounded square (17x17, radius 1)
        const innerAlpha = bucketAlpha * 0.28;
        ctx.fillStyle = `rgba(158, 203, 255, ${innerAlpha})`;
        ctx.beginPath();
        for (let i = 0; i < cellList.length; i++) {
          const { x, y } = cellList[i];
          ctx.roundRect(x + INNER_OFFSET, y + INNER_OFFSET, INNER_SIZE, INNER_SIZE, INNER_RADIUS);
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

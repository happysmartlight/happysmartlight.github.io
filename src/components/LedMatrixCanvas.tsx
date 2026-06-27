import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/perf";

export type PresetMode = "rainbow" | "audio" | "aurora" | "fire";

interface LedMatrixCanvasProps {
  preset: PresetMode;
  /** 10–100, drives animation speed */
  speed: number;
  /** 10–100, drives pixel brightness/alpha */
  brightness: number;
  className?: string;
}

const GRID = 8; // logical 8x8 matrix (keeps preset math + scroll text intact)

// 5-pixel-high font bitmaps for the scrolling text (each char: 5 rows x variable width)
const FONT_MAP: Record<string, number[][]> = {
  H: [[1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1]],
  A: [[0, 1, 0], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1]],
  P: [[1, 1, 0], [1, 0, 1], [1, 1, 0], [1, 0, 0], [1, 0, 0]],
  Y: [[1, 0, 1], [1, 0, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
  S: [[0, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0]],
  M: [[1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
  R: [[1, 1, 0], [1, 0, 1], [1, 1, 0], [1, 0, 1], [1, 0, 1]],
  T: [[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
  L: [[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 1, 1]],
  I: [[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]],
  G: [[0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 0, 1], [0, 1, 1]],
  " ": [[0], [0], [0], [0], [0]],
};

const SCROLL_TEXT = "HAPPY SMART LIGHT  ";
const scrollBitmap: number[][] = [[], [], [], [], []];
for (const char of SCROLL_TEXT) {
  const glyph = FONT_MAP[char] || FONT_MAP[" "];
  for (let row = 0; row < 5; row++) {
    scrollBitmap[row].push(...glyph[row], 0); // 1px gap between chars
  }
}
const SCROLL_WIDTH = scrollBitmap[0].length;

type RGB = [number, number, number] | null;

/** Per-cell color for a preset. Returns null for an unlit pixel. */
function cellColor(
  preset: PresetMode,
  row: number,
  col: number,
  frame: number,
  scrollOffset: number
): RGB {
  switch (preset) {
    case "rainbow": {
      const hue = (row * 20 + col * 20 + frame * 3) % 360;
      const h = hue / 60;
      const x = 1 - Math.abs((h % 2) - 1);
      let r = 0, g = 0, b = 0;
      if (h < 1) { r = 255; g = x * 255; }
      else if (h < 2) { r = x * 255; g = 255; }
      else if (h < 3) { g = 255; b = x * 255; }
      else if (h < 4) { g = x * 255; b = 255; }
      else if (h < 5) { r = x * 255; b = 255; }
      else { r = 255; b = x * 255; }
      return [r, g, b];
    }
    case "audio": {
      const speedScale = frame * (Math.PI / 180);
      const amplitude = Math.sin(col * 0.8 + speedScale * 4) * 3.5 + 3.5;
      if (7 - row > amplitude) return null;
      return [
        Math.max(0, 255 - row * 30),
        Math.min(255, row * 25 + 50),
        Math.min(255, col * 32),
      ];
    }
    case "aurora": {
      const textRow = row - 1; // center 5-row font in 8 rows
      if (textRow < 0 || textRow >= 5) return null;
      const bitmapCol = (col + scrollOffset) % SCROLL_WIDTH;
      if (scrollBitmap[textRow][bitmapCol] !== 1) return null;
      const t = col / 7; // pink -> blue gradient across columns
      return [
        Math.round(236 * (1 - t) + 6 * t),
        Math.round(72 * (1 - t) + 182 * t),
        Math.round(153 * (1 - t) + 212 * t),
      ];
    }
    case "fire": {
      const speedScale = frame * (Math.PI / 180);
      const noise = Math.sin(col * 1.5 + speedScale * 5) * 1.2;
      const intensity = Math.max(0, Math.min(1, (4.5 + noise - row * 0.8) / 4));
      if (intensity <= 0.1) return null;
      return [
        255,
        Math.round(100 * intensity + Math.sin(speedScale * 8) * 30),
        Math.round(20 * (1 - intensity)),
      ];
    }
  }
}

/**
 * Canvas LED matrix visualizer. Replaces 64 DOM nodes + React-driven state with a
 * single self-contained canvas running at up to ~45fps with additive bloom, so the
 * pixels glow like a real LED panel without re-rendering React. Pauses when the
 * canvas is off-screen or the user prefers reduced motion.
 */
export default function LedMatrixCanvas({ preset, speed, brightness, className }: LedMatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Latest control values, read inside the rAF loop without restarting it.
  const presetRef = useRef(preset);
  const speedRef = useRef(speed);
  const brightnessRef = useRef(brightness);
  presetRef.current = preset;
  speedRef.current = speed;
  brightnessRef.current = brightness;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cssSize = 0; // logical (CSS) px of the square canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssSize = Math.max(1, Math.min(rect.width, rect.height));
      canvas.width = Math.round(cssSize * dpr);
      canvas.height = Math.round(cssSize * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (frame: number, scrollOffset: number) => {
      const size = cssSize;
      const cell = size / GRID;
      const radius = cell * 0.32; // crisp LED core
      const glow = cell * 0.46; // tight halo — just enough to read as "lit", not hazy
      const alpha = brightnessRef.current / 100;
      const p = presetRef.current;

      ctx.clearRect(0, 0, size, size);

      // Unlit pixels: faint dots so the panel reads as a full matrix.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let row = 0; row < GRID; row++) {
        for (let col = 0; col < GRID; col++) {
          ctx.beginPath();
          ctx.arc(col * cell + cell / 2, row * cell + cell / 2, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Collect lit pixels once, then draw in two passes so each pixel keeps a
      // crisp solid core (sharp edge) with only a subtle glow ring around it.
      const lit: Array<{ cx: number; cy: number; r: number; g: number; b: number }> = [];
      for (let row = 0; row < GRID; row++) {
        for (let col = 0; col < GRID; col++) {
          const rgb = cellColor(p, row, col, frame, scrollOffset);
          if (!rgb) continue;
          lit.push({ cx: col * cell + cell / 2, cy: row * cell + cell / 2, r: rgb[0], g: rgb[1], b: rgb[2] });
        }
      }

      // Pass 1: faint additive halo (bloom hint only, starts past the core edge).
      ctx.globalCompositeOperation = "lighter";
      for (const { cx, cy, r, g, b } of lit) {
        const grad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, glow);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, glow, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pass 2: solid, crisp LED core + a tiny specular highlight for that glossy pop.
      ctx.globalCompositeOperation = "source-over";
      for (const { cx, cy, r, g, b } of lit) {
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha + 0.1)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(cx - radius * 0.25, cy - radius * 0.25, radius * 0.32, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Reduced motion: render one static frame and stop.
    if (reducedMotion) {
      draw(0, 0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = true;
    let frame = 0;
    let scrollAccum = 0;
    let scrollOffset = 0;
    let last = performance.now();
    let lastDraw = last;
    const MIN_INTERVAL = 1000 / 45; // cap to ~45fps to stay light on mobile GPUs

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    io.observe(canvas);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const delta = now - last;
      last = now;
      if (!visible) return;

      const spd = speedRef.current;
      frame = (frame + (spd / 100 * 2 + 0.2) * (delta / 16.7)) % 360;
      scrollAccum += delta * (spd / 100) * 0.0095;
      if (scrollAccum >= 1) {
        scrollOffset = (scrollOffset + Math.floor(scrollAccum)) % SCROLL_WIDTH;
        scrollAccum %= 1;
      }

      if (now - lastDraw >= MIN_INTERVAL) {
        lastDraw = now;
        draw(frame, scrollOffset);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

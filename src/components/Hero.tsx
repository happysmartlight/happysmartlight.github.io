import { useState, useEffect, useRef } from "react";
import { Zap, Play, Sliders, Settings, Wifi, Eye } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

type PresetMode = "rainbow" | "audio" | "aurora" | "fire";

// 5-pixel-high font bitmaps for scrolling text (each char is 5 rows x variable width)
const FONT_MAP: Record<string, number[][]> = {
  H: [[1,0,1],[1,0,1],[1,1,1],[1,0,1],[1,0,1]],
  A: [[0,1,0],[1,0,1],[1,1,1],[1,0,1],[1,0,1]],
  P: [[1,1,0],[1,0,1],[1,1,0],[1,0,0],[1,0,0]],
  Y: [[1,0,1],[1,0,1],[0,1,0],[0,1,0],[0,1,0]],
  S: [[0,1,1],[1,0,0],[0,1,0],[0,0,1],[1,1,0]],
  M: [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  R: [[1,1,0],[1,0,1],[1,1,0],[1,0,1],[1,0,1]],
  T: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
  L: [[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,1,1]],
  I: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
  G: [[0,1,1],[1,0,0],[1,0,1],[1,0,1],[0,1,1]],
  ' ': [[0],[0],[0],[0],[0]],
};

const SCROLL_TEXT = "HAPPY SMART LIGHT  ";
const scrollBitmap: number[][] = [[], [], [], [], []];
for (const char of SCROLL_TEXT) {
  const glyph = FONT_MAP[char] || FONT_MAP[' '];
  for (let row = 0; row < 5; row++) {
    scrollBitmap[row].push(...glyph[row], 0); // 1-pixel gap between chars
  }
}
const SCROLL_WIDTH = scrollBitmap[0].length;

export default function Hero({ onNavigate }: HeroProps) {
  const [activePreset, setActivePreset] = useState<PresetMode>("aurora");
  const [ledSpeed, setLedSpeed] = useState<number>(50);
  const [ledBrightness, setLedBrightness] = useState<number>(85);
  const [frameCount, setFrameCount] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const animateRef = useRef<number | null>(null);
  const textOffsetRef = useRef<number>(0);

  // Stats generation helper based on state
  const getProtocolStats = () => {
    switch (activePreset) {
      case "rainbow":
        return { protocol: "ARGB HSL Stream", streamType: "Stand-alone", ip: "192.168.4.1 (Access Pt)", fps: Math.round(30 + ledSpeed / 2) };
      case "audio":
        return { protocol: "LedFx Sound Sync", streamType: "E1.31 (Unicast)", ip: "192.168.1.115 (Client)", fps: Math.round(45 + ledSpeed / 3) };
      case "aurora":
        return { protocol: "xLights Custom", streamType: "DDP (Raw Pixels)", ip: "192.168.1.200 (Wired)", fps: 60 };
      case "fire":
        return { protocol: "Art-Net DMX", streamType: "Art-Net (E1.31)", ip: "10.0.0.45 (Stage Local)", fps: Math.round(40 + ledSpeed / 4) };
    }
  };

  const { protocol, streamType, ip, fps: currentFps } = getProtocolStats();

  // Animation frame loop to generate visual pulses or waves on the visualizer matrix
  useEffect(() => {
    let lastTime = performance.now();
    let scrollAccum = 0;
    const tick = (now: number) => {
      // simulate speed effect
      const increment = ledSpeed / 100 * 2 + 0.2;
      setFrameCount((prev) => (prev + increment) % 360);

      // Advance scrolling text offset
      const delta = now - lastTime;
      scrollAccum += delta * (ledSpeed / 100) * 0.0095;
      if (scrollAccum >= 1) {
        textOffsetRef.current = (textOffsetRef.current + Math.floor(scrollAccum)) % SCROLL_WIDTH;
        scrollAccum = scrollAccum % 1;
      }

      // Calculate realistic FPS variance
      lastTime = now;
      const calculatedFps = Math.min(60, Math.round(1000 / delta));
      if (Math.random() < 0.05) {
        setFps(calculatedFps === 0 ? 60 : calculatedFps);
      }

      animateRef.current = requestAnimationFrame(tick);
    };

    animateRef.current = requestAnimationFrame(tick);
    return () => {
      if (animateRef.current) cancelAnimationFrame(animateRef.current);
    };
  }, [ledSpeed]);

  // Generate color values for an 8x8 matrix grid based on mode, scale, frameCount, and brightness
  const renderCellColor = (row: number, col: number) => {
    const alpha = ledBrightness / 100;
    const speedScale = frameCount * (Math.PI / 180);

    let r = 0, g = 0, b = 0;

    switch (activePreset) {
      case "rainbow": {
        // Hue cycles across columns and rows smoothly
        const hue = (row * 20 + col * 20 + frameCount * 3) % 360;
        // Simple HSL to RGB conversion approximation
        const h = hue / 60;
        const x = (1 - Math.abs((h % 2) - 1));
        if (h < 1) { r = 255; g = x * 255; }
        else if (h < 2) { r = x * 255; g = 255; }
        else if (h < 3) { g = 255; b = x * 255; }
        else if (h < 4) { g = x * 255; b = 255; }
        else if (h < 5) { r = x * 255; b = 255; }
        else { r = 255; b = x * 255; }
        break;
      }
      case "audio": {
        // Equalizer columns bouncing according to sine waves and speed
        const amplitude = Math.sin(col * 0.8 + speedScale * 4) * 3.5 + 3.5;
        const active = (7 - row) <= amplitude;
        if (active) {
          // Yellow-to-cyan audio reactive gradient
          r = Math.max(0, 255 - row * 30);
          g = Math.min(255, row * 25 + 50);
          b = Math.min(255, col * 32);
        } else {
          return "transparent";
        }
        break;
      }
      case "aurora": {
        // Scrolling "HAPPY SMART LIGHT" text across the 8x8 matrix
        // Text is rendered in rows 1-5 (centered vertically), rows 0,6,7 are off
        const textRow = row - 1; // offset to center 5-row font in 8-row grid
        if (textRow >= 0 && textRow < 5) {
          const bitmapCol = (col + textOffsetRef.current) % SCROLL_WIDTH;
          if (scrollBitmap[textRow][bitmapCol] === 1) {
            // Gradient color from neon pink to neon blue based on column position
            const colBlend = col / 7;
            r = Math.round(236 * (1 - colBlend) + 6 * colBlend);
            g = Math.round(72 * (1 - colBlend) + 182 * colBlend);
            b = Math.round(153 * (1 - colBlend) + 212 * colBlend);
          } else {
            return "transparent";
          }
        } else {
          return "transparent";
        }
        break;
      }
      case "fire": {
        // Flame effect: noisy bottom row rising with flicker
        const noise = Math.sin(col * 1.5 + speedScale * 5) * 1.2;
        const flameHeight = 4.5 + noise - (row * 0.8);
        const intensity = Math.max(0, Math.min(1, flameHeight / 4));
        
        if (intensity > 0.1) {
          r = Math.round(255);
          g = Math.round(100 * intensity + (Math.sin(speedScale * 8) * 30));
          b = Math.round(20 * (1 - intensity));
        } else {
          return "transparent";
        }
        break;
      }
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const presetLabels = [
    { id: "aurora", label: "Text Scroll", activeClass: "bg-neon-pink/20 text-neon-pink-bright border-neon-pink/50 shadow-[0_0_15px_rgba(255,0,127,0.4)]" },
    { id: "audio", label: "LedFx Audio Sync", activeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]" },
    { id: "rainbow", label: "ARGB HSL Flow", activeClass: "bg-purple-500/20 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]" },
    { id: "fire", label: "DMX Stage Fire", activeClass: "bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.4)]" },
  ];

  const techBadges = ["ARGB HSL", "xLights", "LedFx", "Art-Net", "E1.31 dmx", "DDP streaming"];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden"
    >
      {/* Dynamic Background Neon Light Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-neon-pink-bright/10 rounded-full blur-[120px] mix-blend-screen anim-pulse-slow-1 -z-10" />
      <div className="absolute bottom-1/3 right-1/10 w-96 h-96 bg-neon-blue-bright/10 rounded-full blur-[120px] mix-blend-screen anim-pulse-slow-1 -z-10" />
      
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center" id="hero-layout-grid">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left" id="hero-left-col">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 w-fit backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-pink-bright"></span>
              </span>
              <span className="text-xs font-mono tracking-wider text-slate-300">
                Hệ Sinh Thái LED Nghệ Thuật Thế Hệ Mới
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-[1.1] flex flex-col">
              <span>Hệ Thống Điều Khiển</span>
              <span className="bg-gradient-to-r from-neon-pink-bright via-purple-400 to-neon-blue-bright bg-clip-text text-transparent text-glow-pink">
                Happy Smart Light
              </span>
            </h1>

            <p className="font-sans font-light text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Thắp sáng ý tưởng – Điều khiển ánh sáng theo cách thông minh hơn.
              <span className="text-white font-medium block mt-1">
                Giải pháp điều khiển LED ARGB, LED sân khấu và LED nghệ thuật dành cho maker, kỹ thuật viên, đội biểu diễn chuyên nghiệp.
              </span>
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2" id="hero-ctas">
              <button
                onClick={() => onNavigate("products")}
                className="relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-blue text-white font-display text-sm font-bold uppercase tracking-wider shadow-glow-dual transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2 cursor-pointer"
                id="btn-hero-explore"
              >
                <Eye className="w-4 h-4 text-white" />
                <span>Khám Phá Sản Phẩm</span>
              </button>

              <button
                onClick={() => onNavigate("contact")}
                className="px-8 py-4 rounded-full bg-slate-900 border border-white/10 text-white font-display text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-slate-800/80 hover:border-white/25 flex items-center justify-center space-x-2 cursor-pointer"
                id="btn-hero-consult"
              >
                <span>Liên Hệ Tư Vấn</span>
                <Zap className="w-4 h-4 text-neon-blue-bright" />
              </button>
            </div>

            {/* Protocol Support Icons Row */}
            <div className="pt-6 border-t border-white/5 flex flex-col gap-3" id="hero-badge-row">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                Hỗ trợ đầy đủ giao thức:
              </span>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-slate-950 border border-white/5 text-[10px] font-mono uppercase tracking-wide text-slate-400 hover:border-neon-blue/40 hover:text-[#00f0ff] transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Interface Visualizer Block */}
          <div className="lg:col-span-5 flex justify-center items-center" id="hero-right-col">
            <div className="relative w-full max-w-md bg-glass border border-white/10 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
              {/* Card Ambient Neon Glow Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-blue-bright/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-neon-pink-bright/10 rounded-full blur-2xl pointer-events-none" />

              {/* Hardware Mock Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4" id="visualizer-header">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-neon-blue-bright" />
                  <span className="text-[10px] font-mono tracking-wider text-slate-400">
                    HAPPY-LIGHT-V4 // CH-ONLINE
                  </span>
                </div>
              </div>

              {/* Glowing Simulator Matrix Panel */}
              <div className="flex flex-col space-y-4" id="visualizer-body">
                <div className="aspect-square w-full rounded-2xl bg-black/70 border border-white/5 p-4 flex flex-col justify-between relative overflow-hidden">
                  {/* Neon Grid of LED Matrix */}
                  <div className="grid grid-cols-8 grid-rows-8 gap-2 w-full h-full relative z-10">
                    {Array.from({ length: 64 }).map((_, idx) => {
                      const row = Math.floor(idx / 8);
                      const col = idx % 8;
                      const cellColor = renderCellColor(row, col);
                      const isLit = cellColor !== "transparent";

                      return (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: isLit ? cellColor : "rgba(255, 255, 255, 0.03)",
                            boxShadow: isLit ? `0 0 8px ${cellColor}` : "none",
                          }}
                          className="rounded-full transition-all duration-75 relative overflow-hidden"
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Terminal Telemetry Screen */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 font-mono text-[10px] text-slate-400 space-y-1">
                  <p className="text-neon-pink-bright">// SPECS & FEEDBACK</p>
                  <div className="grid grid-cols-2 gap-y-0.5 gap-x-2">
                    <div>Giao thức: <span className="text-white font-medium">{protocol}</span></div>
                    <div>Liên kết: <span className="text-white font-medium">{streamType}</span></div>
                    <div>Thết bị IP: <span className="text-neon-blue-bright font-medium">{ip}</span></div>
                    <div>Tốc độ quét: <span className="text-[#00f0ff] font-bold">{currentFps} FPS</span></div>
                  </div>
                  <div className="h-[2px] bg-white/5 my-1.5" />
                  <div className="flex justify-between items-center text-[9px] text-slate-500">
                    <span>LEDs: 2048px (Sync OK)</span>
                    <span>Tải nguồn: 3.4A / 5.0V</span>
                  </div>
                </div>

                {/* Presets Grid Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Chọn chế độ trải nghiệm:</span>
                    <span className="text-white font-semibold font-sans">{activePreset.toUpperCase()}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {presetLabels.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setActivePreset(p.id as PresetMode)}
                        className={`py-1.5 px-3 rounded-lg text-[10px] font-display font-bold uppercase border tracking-wider transition-all duration-200 cursor-pointer text-left ${
                          activePreset === p.id
                            ? p.activeClass
                            : "bg-slate-900/60 hover:bg-slate-900 border-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controller Sliders Panel */}
                <div className="mt-2 space-y-2 pt-2 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Speed (Tần số)</span>
                        <span className="text-neon-blue-bright">{ledSpeed}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={ledSpeed}
                        onChange={(e) => setLedSpeed(parseInt(e.target.value))}
                        className="w-full accent-neon-blue h-1 bg-slate-900 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Intensity (Độ sáng)</span>
                        <span className="text-neon-pink-bright">{ledBrightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={ledBrightness}
                        onChange={(e) => setLedBrightness(parseInt(e.target.value))}
                        className="w-full accent-neon-pink h-1 bg-slate-900 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

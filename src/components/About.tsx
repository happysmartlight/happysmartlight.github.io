import { useEffect, useRef, useState } from "react";
import { Cpu, ShieldCheck, Sparkles, Orbit, Timer, LayoutGrid, Wifi, Crosshair } from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/perf";

// Counts from 0 up to `value` once the element scrolls into view (easeOutCubic).
// Honors reduced-motion by jumping straight to the final value.
function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const begin = () => {
      if (started.current) return;
      started.current = true;
      if (reduced) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      begin();
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          begin();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, decimals, duration, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function About() {
  const brandPillars = [
    {
      icon: <Cpu className="w-6 h-6 text-neon-blue-bright" />,
      title: "Công Nghệ Tiên Phong",
      desc: "Trang bị chip vi xử lý ARM 32-bit tốc độ cao, tích hợp bộ chuyển đổi mức logic điện áp (Level Shifter) chuẩn công nghiệp bảo vệ tín hiệu không bị suy hao trên dây dài.",
      color: "border-neon-blue/20 hover:border-neon-blue/50 group-hover:shadow-glow-blue/10",
      glow: "bg-neon-blue/5",
      bar: "bg-gradient-to-r from-neon-blue to-cyan-400",
      numShadow: "group-hover:drop-shadow-[0_0_16px_rgba(0,229,255,0.55)]",
    },
    {
      icon: <Orbit className="w-6 h-6 text-neon-pink-bright" />,
      title: "Hệ Sinh Thái Mở",
      desc: "Hỗ trợ toàn diện các nền tảng ARGB HSL, xLights, LedFx kết nối qua Wi-Fi 2.4Ghz tốc độ cao, cho phép phối ghép và điều khiển không giới hạn mọi loại thiết bị ánh sáng nghệ thuật.",
      color: "border-neon-pink/20 hover:border-neon-pink/50 group-hover:shadow-glow-pink/10",
      glow: "bg-neon-pink/5",
      bar: "bg-gradient-to-r from-neon-pink to-fuchsia-400",
      numShadow: "group-hover:drop-shadow-[0_0_16px_rgba(255,45,149,0.55)]",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Sáng Tạo Vô Tận",
      desc: "Tạo lập hiệu ứng ánh sáng động theo thời gian thực (real-time music visualizer), ma trận màu sắc LED Matrix rực rỡ, hay đồng bộ timeline biểu diễn nhạc nước, nhạc hội chuyên nghiệp.",
      color: "border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/5",
      glow: "bg-amber-500/5",
      bar: "bg-gradient-to-r from-amber-400 to-orange-400",
      numShadow: "group-hover:drop-shadow-[0_0_16px_rgba(245,158,11,0.55)]",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Đáng Tin Cậy & Bền Bỉ",
      desc: "Sản phẩm được tối ưu mạch lọc nhiễu, bảo vệ quá nhiệt, bảo vệ phân cực ngược, đảm bảo hệ thống LED hoạt động liên tục 24/7 dưới mọi điều kiện sân khấu phức tạp.",
      color: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/5",
      glow: "bg-emerald-500/5",
      bar: "bg-gradient-to-r from-emerald-400 to-teal-400",
      numShadow: "group-hover:drop-shadow-[0_0_16px_rgba(16,185,129,0.55)]",
    },
  ];

  const stats = [
    {
      icon: Timer,
      iconColor: "text-neon-pink-bright",
      numClass: "text-neon-pink-bright text-glow-pink",
      prefix: "< ",
      value: 0.5,
      decimals: 1,
      suffix: "ms",
      label: "Độ Trễ Tín Hiệu (DDP)",
    },
    {
      icon: LayoutGrid,
      iconColor: "text-slate-300",
      numClass: "text-white",
      value: 4096,
      decimals: 0,
      suffix: "+",
      label: "Số Điểm LED Độc Lập / Mạch 4X",
    },
    {
      icon: Wifi,
      iconColor: "text-neon-blue-bright",
      numClass: "text-neon-blue-bright text-glow-blue",
      value: 100,
      decimals: 0,
      suffix: "%",
      label: "Đồng Bộ Wi-Fi/Ethernet ",
    },
    {
      icon: Crosshair,
      iconColor: "text-amber-400",
      numClass: "text-amber-400 text-glow-yellow",
      prefix: "± ",
      value: 1,
      decimals: 0,
      suffix: " ms",
      label: "Độ Chính Xác Timecode",
    },
  ];

  return (
    <section id="about" className="relative py-[65px] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" id="about-intro">
          <span className="font-mono text-xs text-neon-blue-bright uppercase tracking-widest font-bold">
            VỀ HAPPY SMART LIGHT
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Kỷ Nguyên Mới Của{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright to-neon-blue-bright bg-clip-text text-transparent">
              Ánh Sáng Thông Minh
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Chúng tôi sinh ra để thúc đẩy sự sáng tạo nghệ thuật ánh sáng của người Việt. Bằng việc cung cấp các thiết bị điều khiển LED thông minh thế hệ mới, chúng tôi giúp mọi ý tưởng chiếu sáng từ phòng ngủ cá nhân, xe độ độc bản, đến các sân khấu ca nhạc bùng nổ, rực rỡ nhất trở thành hiện thực hiện đại.
          </p>
        </div>

        {/* Bento Grid Concept */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" id="about-bento-grid">
          {brandPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative overflow-hidden p-6 rounded-2xl bg-slate-950/40 backdrop-blur-md max-md:backdrop-blur-none max-md:bg-slate-950/60 border ${pillar.color} transition-[background-color,border-color,box-shadow] duration-300 group flex flex-col justify-between`}
              id={`about-pillar-${idx}`}
            >
              {/* Large index number — accent gradient, brightens + scales + glows on hover */}
              <span
                className={`pointer-events-none absolute top-2 right-4 font-display font-extrabold text-6xl leading-none select-none origin-top-right bg-clip-text text-transparent transition-all duration-500 opacity-25 group-hover:opacity-100 group-hover:scale-110 ${pillar.bar} ${pillar.numShadow}`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                {/* Top accent bar */}
                <div className={`h-1 w-10 rounded-full mb-5 ${pillar.bar} group-hover:w-16 transition-all duration-500`} />

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden ${pillar.glow}`}>
                  {pillar.icon}
                </div>
                <h3 className="font-display font-medium text-lg text-white mb-3 group-hover:text-neon-pink transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                  {pillar.desc}
                </p>
              </div>

              {/* Decorative light line at the bottom */}
              <div className="w-full h-[2px] bg-slate-900 mt-6 overflow-hidden rounded-full relative z-10">
                <div className="w-1/3 h-[2px] bg-gradient-to-r from-neon-pink to-neon-blue opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Localized Dev & Core Metrics stats */}
        <div className="mt-16 bg-glass p-8 rounded-3xl border border-white/10" id="about-stats-panel">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 text-center" id="about-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="relative px-2 space-y-2">
                {/* Vertical neon divider between columns (md+ only) */}
                {i > 0 && (
                  <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-14 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                )}

                <s.icon className={`w-5 h-5 mx-auto ${s.iconColor}`} strokeWidth={1.75} />

                <span className={`block font-display font-bold text-3xl sm:text-4xl ${s.numClass}`}>
                  <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                </span>

                <span className="block text-[10px] sm:text-xs font-mono tracking-widest uppercase text-slate-500">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

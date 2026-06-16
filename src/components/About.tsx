import { Cpu, ShieldCheck, Sparkles, Orbit } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const brandPillars = [
    {
      icon: <Cpu className="w-6 h-6 text-neon-blue-bright" />,
      title: "Công Nghệ Tiên Phong",
      desc: "Trang bị chip vi xử lý ARM 32-bit tốc độ cao, tích hợp bộ chuyển đổi mức logic điện áp (Level Shifter) chuẩn công nghiệp bảo vệ tín hiệu không bị suy hao trên dây dài.",
      color: "border-neon-blue/20 hover:border-neon-blue/50 group-hover:shadow-glow-blue/10",
      glow: "bg-neon-blue/5",
    },
    {
      icon: <Orbit className="w-6 h-6 text-neon-pink-bright" />,
      title: "Hệ Sinh Thái Mở",
      desc: "Hỗ trợ toàn diện các nền tảng ARGB HSL, xLights, LedFx kết nối qua Wi-Fi 2.4Ghz tốc độ cao, cho phép phối ghép và điều khiển không giới hạn mọi loại thiết bị ánh sáng nghệ thuật.",
      color: "border-neon-pink/20 hover:border-neon-pink/50 group-hover:shadow-glow-pink/10",
      glow: "bg-neon-pink/5",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Sáng Tạo Vô Tận",
      desc: "Tạo lập hiệu ứng ánh sáng động theo thời gian thực (real-time music visualizer), ma trận màu sắc LED Matrix rực rỡ, hay đồng bộ timeline biểu diễn nhạc nước, nhạc hội chuyên nghiệp.",
      color: "border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/5",
      glow: "bg-amber-500/5",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Đáng Tin Cậy & Bền Bỉ",
      desc: "Sản phẩm được tối ưu mạch lọc nhiễu, bảo vệ quá nhiệt, bảo vệ phân cực ngược, đảm bảo hệ thống LED hoạt động liên tục 24/7 dưới mọi điều kiện sân khấu phức tạp.",
      color: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/5",
      glow: "bg-emerald-500/5",
    },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
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
              className={`p-6 rounded-2xl bg-slate-950/40 backdrop-blur-md border ${pillar.color} transition-all duration-300 group flex flex-col justify-between`}
              id={`about-pillar-${idx}`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden ${pillar.glow}`}>
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
              <div className="w-full h-[2px] bg-slate-900 mt-6 overflow-hidden rounded-full">
                <div className="w-1/3 h-[2px] bg-gradient-to-r from-neon-pink to-neon-blue opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Localized Dev & Core Metrics stats */}
        <div className="mt-16 bg-glass p-8 rounded-3xl border border-white/10" id="about-stats-panel">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" id="about-stats-grid">
            <div className="space-y-1">
              <span className="block font-display font-bold text-3xl sm:text-4xl text-glow-pink text-neon-pink-bright">
                &lt; 0.5ms
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-slate-500">
                Độ Trễ Tín Hiệu (DDP)
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-display font-bold text-3xl sm:text-4xl text-white">
                4096+
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-slate-500">
                Số Điểm LED Độc Lập / Cổng
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-display font-bold text-3xl sm:text-4xl text-glow-blue text-neon-blue-bright">
                100%
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-slate-500">
                Đồng Bộ Không Dây Wi-Fi
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-display font-bold text-3xl sm:text-4xl text-white">
                24/7
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-slate-500">
                Sẵn Sàng Cho Sân Khấu
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Wifi, Network, Activity, Sliders, Layers, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { FeatureItem } from "../types";

export default function Features() {
  const features: FeatureItem[] = [
    {
      id: "wifi",
      title: "Điều Khiển LED Qua Wi-Fi Tốc Độ Cao",
      description: "Hỗ trợ 2 chế độ thu phát linh hoạt: Chế độ Trạm (Client Mode - kết nối đồng bộ router nhà mạng) hoặc chế độ Điểm truy cập tự phát (AP Mode - tự phát Wi-Fi nội bộ cho các kịch bản lưu động). Cự ly thu anten cực xa.",
      iconName: "wifi",
      color: "blue",
    },
    {
      id: "protocols",
      title: "Đa Giao Thức Đồng Bộ Chuyên Nghiệp",
      description: "Tương thích hoàn toàn với các luồng kịch bản tốc độ cao hàng đầu thế giới: ARGB HSL Sync độc quyền, xLights (E1.31 / DDP), LedFx (Audio reactive streams), Art-Net dmx và TPM2.net. Tự động chuyển đổi thông minh.",
      iconName: "network",
      color: "pink",
    },
    {
      id: "sync",
      title: "Giải Pháp Đồng Bộ Đa Điểm Không Độ Trễ",
      description: "Ứng dụng thuật toán đồng bộ thời gian thực chuẩn UDP multicast/multidrop, giúp ghép nối vô số tủ điều khiển Happy Smart Light cùng nhịp chạy kịch bản mượt mà, loại bỏ lệch pha (Frame tearing).",
      iconName: "activity",
      color: "blue",
    },
    {
      id: "integration",
      title: "Tích Hợp Sẵn xLights / LedFx / HSL Suite",
      description: "Dễ dàng lồng ghép sơ đồ LED pixel vào timeline xLights múa nhạc theo kịch bản lễ hội có sẵn, hoặc dùng LedFx đồng bộ màu dải LED nhấp nháy chuyển trạng thái tốc độ cao.",
      iconName: "sliders",
      color: "pink",
    },
    {
      id: "versatile",
      title: "Tối Ưu Cho Mọi Cấp Độ Thi Công",
      description: "Mạch điện chịu nạp tải cường độ mạnh, tương thích tuyệt hảo các kết cấu hình học LED khác nhau: Kênh LED Thanh (Lines), Bảng Ma Trận LED (Matrix Canvas), LED Gầm Ô Tô, hay các thiết bị quay múa POI ảo ảnh.",
      iconName: "layers",
      color: "blue",
    },
    {
      id: "dashboard",
      title: "Web Dashboard Cấu Hình Bằng Điện Thoại",
      description: "Không cần cài đặt app phức tạp. Chỉ cần truy cập nhanh qua IP từ trình duyệt điện thoại để thực hiện quản lý, định hình loại chip LED (WS2812, SK6812, GS8208,...), giới hạn dòng điện tối đa để loại trừ cháy nổ.",
      iconName: "smartphone",
      color: "pink",
    },
  ];

  const getIcon = (name: string, colorClass: string) => {
    switch (name) {
      case "wifi":
        return <Wifi className={`w-6 h-6 ${colorClass}`} />;
      case "network":
        return <Network className={`w-6 h-6 ${colorClass}`} />;
      case "activity":
        return <Activity className={`w-6 h-6 ${colorClass}`} />;
      case "sliders":
        return <Sliders className={`w-6 h-6 ${colorClass}`} />;
      case "layers":
        return <Layers className={`w-6 h-6 ${colorClass}`} />;
      case "smartphone":
        return <Smartphone className={`w-6 h-6 ${colorClass}`} />;
      default:
        return <Wifi className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  return (
    <section id="features" className="relative py-[65px] overflow-hidden bg-[#080710]/50 border-t border-white/5">
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-neon-blue-bright/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-pink-bright/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" id="features-header">
          <span className="font-mono text-xs text-neon-pink-bright uppercase tracking-widest font-bold">
            ƯU ĐIỂM CẠNH TRANH VƯỢT TRỘI
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Thiết Kế Đột Phá,{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright to-neon-blue-bright bg-clip-text text-transparent">
              Hiệu Năng Vô Song
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Dành cho cả người dùng phổ thông (mở điện thoại là sài) và chuyên gia ánh sáng (cần can thiệp sâu các luồng tin DMX thế giới).
          </p>
        </div>

        {/* Features list grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="features-list-grid">
          {features.map((feat, idx) => {
            const isPink = feat.color === "pink";
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`flex flex-col justify-between p-6 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/5 hover:bg-slate-950/80 transition-all duration-300 relative group overflow-hidden ${
                  isPink
                    ? "hover:border-neon-pink/40 hover:shadow-glow-pink/5"
                    : "hover:border-neon-blue/40 hover:shadow-glow-blue/5"
                }`}
                id={`feature-item-${feat.id}`}
              >
                <div>
                  {/* Decorative spotlight background glow */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -z-10 transition-opacity duration-300 opacity-20 group-hover:opacity-40 ${
                    isPink ? "bg-neon-pink" : "bg-neon-blue"
                  }`} />

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-105 ${
                    isPink
                      ? "bg-neon-pink/10 border-neon-pink/20"
                      : "bg-neon-blue/10 border-neon-blue/20"
                  }`}>
                    {getIcon(feat.iconName, isPink ? "text-neon-pink-bright" : "text-neon-blue-bright")}
                  </div>

                  <h3 className="font-display font-medium text-base text-zinc-100 group-hover:text-white transition-colors duration-200 mb-3">
                    {feat.title}
                  </h3>

                  <p className="font-sans font-light text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Interactive Visual Simulation Panels */}
                {feat.id === "wifi" && (
                  <div className="mt-5 h-12 w-full bg-black/40 rounded-lg flex items-center justify-center relative overflow-hidden border border-white/5">
                    <div className="flex items-center space-x-2 text-[9px] font-mono text-slate-400 relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>AP MODE (HSL_WIFI_AP)</span>
                      <div className="flex items-end gap-0.5 h-3 ml-1.5">
                        <div className="w-1 h-1 bg-emerald-500" />
                        <div className="w-1 h-1.5 bg-emerald-500 animate-pulse" />
                        <div className="w-1 h-2.5 bg-emerald-500 animate-pulse [animation-delay:0.1s]" />
                        <div className="w-1 h-3 bg-emerald-500/30" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                      <div className="w-8 h-8 rounded-full border border-neon-blue animate-ping" />
                      <div className="w-16 h-16 rounded-full border border-neon-blue/70 animate-ping [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}

                {feat.id === "protocols" && (
                  <div className="mt-5 h-12 w-full bg-black/40 rounded-lg flex items-center justify-around px-3 border border-white/5 font-mono text-[8px] text-slate-500 overflow-hidden">
                    <span className="animate-pulse duration-1000 text-neon-pink-bright">ARGB HSL</span>
                    <span className="text-slate-700">➔</span>
                    <span className="animate-pulse duration-700 text-neon-blue-bright">xLights DDP</span>
                    <span className="text-slate-700">➔</span>
                    <span className="animate-pulse duration-500 text-purple-400">Art-Net</span>
                  </div>
                )}

                {feat.id === "sync" && (
                  <div className="mt-5 h-12 w-full bg-black/40 rounded-lg flex items-center justify-center gap-4 border border-white/5">
                    <div className="flex items-center space-x-1 font-mono text-[8px] text-slate-500 mr-1">
                      <span>SYNC GROUP</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-pulse" style={{ boxShadow: "0 0 8px #00e5ff" }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-pulse" style={{ boxShadow: "0 0 8px #00e5ff", animationDelay: "0.15s" }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-pulse" style={{ boxShadow: "0 0 8px #00e5ff", animationDelay: "0.3s" }} />
                    </div>
                    <span className="text-[7px] font-mono text-emerald-400 border border-emerald-500/20 px-1 rounded">0ms delay</span>
                  </div>
                )}

                {feat.id === "integration" && (
                  <div className="mt-5 h-12 w-full bg-black/40 rounded-lg flex items-end justify-center gap-1.5 pb-2 px-3 border border-white/5">
                    <span className="text-[8px] font-mono text-slate-500 mr-auto mb-1.5">AUDIO REACTIVE</span>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-[#ff2d95] rounded-t-sm origin-bottom"
                        style={{
                          height: `${10 + (i % 3) * 6}px`,
                          boxShadow: "0 0 4px #ff2d95",
                          animation: `pulse 0.6s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {feat.id === "versatile" && (
                  <div className="mt-5 h-12 w-full bg-black/40 rounded-lg flex items-center justify-around px-3 border border-white/5">
                    <span className="text-[8px] font-mono text-slate-500">PRESETS:</span>
                    <div className="flex gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-[8px] font-mono text-[#00e5ff]">STRIP</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-[8px] font-mono text-[#00e5ff]">MATRIX</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-[#00e5ff]/30 text-[8px] font-mono text-white bg-[#00e5ff]/10">POI WAND</span>
                    </div>
                  </div>
                )}

                {feat.id === "dashboard" && (
                  <div className="mt-5 h-12 w-full bg-black/40 rounded-lg flex items-center justify-between px-3 border border-white/5 font-mono text-[8px]">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-slate-400">AMP LIMIT: 15A</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">BRIGHT:</span>
                      <div className="w-12 h-1.5 bg-slate-800 rounded-full relative">
                        <div className="absolute top-0 left-0 h-full w-4/5 bg-neon-pink rounded-full animate-pulse" />
                        <div className="absolute top-1/2 -translate-y-1/2 left-[80%] w-2.5 h-2.5 rounded-full bg-white border border-neon-pink shadow-md" />
                      </div>
                      <span className="text-white">80%</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

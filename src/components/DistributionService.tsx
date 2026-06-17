import { useState } from "react";
import { Award, Zap, Cpu, Star, ExternalLink, ShieldCheck, Mail, Phone, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChipItem {
  id: string;
  brand: "Lighttoys" | "Ignis";
  name: string;
  codeName: string;
  originalProp: string;
  description: string;
  specs: { label: string; value: string }[];
  highlight: string;
  availability: "Sẵn hàng tại HCM" | "Hàng Oder (5-7 ngày)" | "Sắp có hàng";
  colorTheme: "pink" | "blue";
  bestSeller?: boolean;
  referenceUrl?: string;
}

export default function DistributionService() {
  const [selectedBrand, setSelectedBrand] = useState<"all" | "Lighttoys" | "Ignis">("all");
  const [activeChipId, setActiveChipId] = useState<string | null>(null);

  const distributedChips: ChipItem[] = [
    {
      id: "lt-ft2-chip",
      brand: "Lighttoys",
      name: "Chip Điều Khiển FT2 (Future Technology)",
      codeName: "LT-FT2-RX",
      bestSeller: true,
      referenceUrl: "https://www.lighttoys.cz/product/ft2-control-chip/",
      originalProp: "Trang bị gốc trên Buugeng, Juggling Club & Aerial Hoop FT2 của Lighttoys",
      description: "Dòng chip điều khiển bán chạy nhất của Lighttoys: bộ thu (receiver) điều khiển dải LED pixel digital 5V (APA102/WS2812, khuyến nghị APA102) cho đạo cụ biểu diễn. Tích hợp DC-DC ổn áp ngõ ra, sạc nhanh USB-C và đồng bộ vô tuyến tầm xa cho cả đội múa.",
      specs: [
        { label: "Ngõ ra LED", value: "2 cổng digital độc lập (mỗi bên 1 cổng) — APA102 / WS2812" },
        { label: "Tầm sóng đồng bộ", value: "Điều khiển vô tuyến tới 200m qua FT Remote" },
        { label: "Nguồn", value: "Pin Li-ion 3.7V đơn (hoặc ghép song song), sạc nhanh USB-C" },
        { label: "Ổn áp ngõ ra", value: "DC-DC converter giữ điện áp ổn định, màu không lệch" },
        { label: "Lập trình", value: "Cấu hình & nạp hiệu ứng bằng phần mềm LtComposer" }
      ],
      highlight: "Tương thích hoàn toàn với FT Remote, các đạo cụ Lighttoys khác và phần mềm LtComposer — chuẩn đồng bộ cho cả đội biểu diễn chuyên nghiệp",
      availability: "Hàng Oder (5-7 ngày)",
      colorTheme: "pink"
    },
    {
      id: "lt-core-v2",
      brand: "Lighttoys",
      name: "Chip Điều Khiển Staging Core V2",
      codeName: "LT-STG-MCU-V2",
      originalProp: "Trang bị gốc trên Gậy Lighttoys Pyro & Buugeng LED",
      description: "Chip xử lý nạp cực mạnh tích hợp sẵn phần cứng đồng bộ vô tuyến cực xa (truyền nhận tín hiệu RF tầm xa 868MHz), ổn định tín hiệu cho môi trường nhiễu sóng sân khấu nặng.",
      specs: [
        { label: "Tần số quét PWM", value: "Tới 19.2 KHz (Không nhấp nháy trên máy quay phim)" },
        { label: "Băng tải Pixel", value: "Hỗ trợ tối đa 4096 dòng pixel APA102/WS2812" },
        { label: "Bảo vệ dòng", value: "Cầu chì tự phục hồi dòng ngắn mạch 12A" },
        { label: "Đế hàn", value: "Chuẩn SMD QFN48 siêu gọn cho gậy biểu diễn" }
      ],
      highlight: "Tương thích tuyệt hảo với các hệ thống phát tín hiệu điều khiển tập trung DMX và USB Transmitter của Lighttoys",
      availability: "Sẵn hàng tại HCM",
      colorTheme: "pink"
    },
    {
      id: "ig-pixel-p16",
      brand: "Ignis",
      name: "Vi Xử Lý Ổn Định Điểm Ảnh Ignis P16",
      codeName: "IG-PXL-DRV-P16",
      originalProp: "Trang bị gốc trên dòng Ignis Pixel POI 80HD / 160HD",
      description: "IC điều khiển nén ảnh thông minh, đặc biệt tích hợp con quay hồi chuyển 6 trục IMU nhạy cao để tính toán vị trí góc quay thời gian thực (POV), tạo ảo ảnh logo/ảnh chân dung sắc nét kinh ngạc khi múa gậy xoay.",
      specs: [
        { label: "Tốc độ xử lý", value: "Cortex-M7 rực rỡ @ 400MHz song song" },
        { label: "Bộ lưu trữ ảnh", value: "Tích hợp 64MB Flash tốc độ kéo ảnh cực hạn" },
        { label: "Độ phân giải POV", value: "Hỗ trợ vẽ ảnh bitmap độ phân giải cực nét tới 256px" },
        { label: "Bù trừ tốc quay", value: "Thuật toán nội suy góc (Gyro tracking auto-interpolation)" }
      ],
      highlight: "Nạp và quản lý ảnh mượt mà từ PC thông qua USB hoặc tải không dây Wifi nội bộ",
      availability: "Hàng Oder (5-7 ngày)",
      colorTheme: "blue"
    }
  ];

  return (
    <section id="distribution" className="relative py-24 overflow-hidden border-t border-white/5 bg-slate-950/20">
      
      {/* Dynamic graphic accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner header badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 rounded-3xl bg-gradient-to-r from-slate-900/80 to-[#0e0d16] p-6 sm:p-8 mb-16 shadow-glow-dual/10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/35 flex items-center justify-center text-2xl relative">
              <Award className="w-8 h-8 text-[#00e5ff] animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-pink-bright" />
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-neon-pink/20 text-neon-pink-bright text-[9px] font-mono uppercase tracking-widest font-bold">
                  CHÍNH HÃNG ĐỘC QUYỀN
                </span>
                <span className="text-xs text-slate-500 font-mono">AUTHORIZED PARTNER</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1">
                Phân Phối Chip Linh Kiện Lighttoys & Ignis Pixel Tại Việt Nam
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                Nhập khẩu trực tiếp từ Czech và Đức, hỗ trợ kỹ thuật cài nạp firmware chuẩn sân khấu.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
            <button 
              onClick={() => setSelectedBrand("all")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider border cursor-pointer transition-all ${
                selectedBrand === "all" 
                  ? "bg-white/10 text-white border-white/20" 
                  : "bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:border-white/10"
              }`}
            >
              Tất cả
            </button>
            <button 
              onClick={() => setSelectedBrand("Lighttoys")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider border cursor-pointer transition-all ${
                selectedBrand === "Lighttoys" 
                  ? "bg-neon-pink-bright/20 text-white border-neon-pink/40 shadow-glow-pink/10" 
                  : "bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:border-white/10"
              }`}
            >
              Lighttoys Chips
            </button>
            <button 
              onClick={() => setSelectedBrand("Ignis")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider border cursor-pointer transition-all ${
                selectedBrand === "Ignis" 
                  ? "bg-neon-blue-bright/20 text-white border-neon-blue/40 shadow-glow-blue/10" 
                  : "bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:border-white/10"
              }`}
            >
              Ignis Chips
            </button>
          </div>
        </div>

        {/* Chips list grid with rich detailed drawers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="distributed-chips-row">
          {distributedChips
            .filter((chip) => selectedBrand === "all" || chip.brand === selectedBrand)
            .map((chip) => {
              const isActive = activeChipId === chip.id;
              const isPink = chip.colorTheme === "pink";

              return (
                <div
                  key={chip.id}
                  className={`bg-glass rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                    isPink 
                      ? "hover:border-neon-pink/40 hover:shadow-glow-pink/5" 
                      : "hover:border-neon-blue/40 hover:shadow-glow-blue/5"
                  } ${isActive ? (isPink ? "border-neon-pink-bright/50 bg-neon-pink/5" : "border-neon-blue-bright/50 bg-neon-blue/5") : "border-white/5"}`}
                  id={`chip-card-${chip.id}`}
                >
                  <div className="p-6">
                    {/* Header line */}
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded font-bold ${
                        isPink ? "bg-neon-pink/10 text-neon-pink-bright" : "bg-neon-blue/10 text-neon-blue-bright"
                      }`}>
                        {chip.brand.toUpperCase()} SEMICONDUCTOR
                      </span>

                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                        chip.availability.includes("Sẵn") 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        {chip.availability}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {chip.bestSeller && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/30 mb-1">
                          <Star className="w-3 h-3 fill-current" /> BÁN CHẠY #1
                        </span>
                      )}
                      <h4 className="font-display font-bold text-base text-zinc-100 group-hover:text-white transition-colors">
                        {chip.name}
                      </h4>
                      <code className="block text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                        CODE: {chip.codeName}
                      </code>
                    </div>

                    <p className="font-sans text-xs text-slate-400 line-clamp-3 mt-3.5 leading-relaxed font-light">
                      {chip.description}
                    </p>

                    <p className="italic text-[10px] text-slate-500 mt-2 font-mono">
                      * {chip.originalProp}
                    </p>

                    {/* Specs expand toggler drawer */}
                    <div className="mt-5 pt-4 border-t border-white/5">
                      <button 
                        onClick={() => setActiveChipId(isActive ? null : chip.id)}
                        className="w-full py-2 bg-slate-950/60 hover:bg-slate-900 border border-white/5 rounded-xl text-[10px] font-mono text-slate-400 hover:text-white text-center tracking-widest uppercase cursor-pointer transition-all flex items-center justify-center space-x-1"
                      >
                        <Cpu className="w-3.5 h-3.5 mr-1" />
                        <span>{isActive ? "Thu gọn thông số" : "Xem chi tiết thông số chip"}</span>
                      </button>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-4 pt-4 border-t border-dashed border-white/10 space-y-3"
                          id={`chip-expand-specs-${chip.id}`}
                        >
                          <div className="space-y-2">
                            {chip.specs.map((spec, sIdx) => (
                              <div key={sIdx} className="flex flex-col sm:flex-row sm:justify-between sm:items-start text-[10px] font-mono py-1.5 border-b border-white/5 gap-1 sm:gap-2">
                                <span className="text-slate-500 uppercase font-semibold sm:font-normal">{spec.label}</span>
                                <span className="text-zinc-100 sm:text-right font-medium sm:max-w-[180px] leading-relaxed">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className={`p-2 rounded bg-slate-950 border text-[9px] leading-relaxed text-slate-400 font-sans italic ${
                            isPink ? "border-neon-pink/10" : "border-neon-blue/10"
                          }`}>
                            <Star className="w-3.5 h-3.5 inline mr-1 text-yellow-500 shrink-0" />
                            {chip.highlight}
                          </div>

                          {chip.referenceUrl && (
                            <a
                              href={chip.referenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[9px] font-mono text-slate-500 hover:text-neon-blue-bright transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" /> Thông số gốc: lighttoys.cz
                            </a>
                          )}

                          <div className="pt-2 flex justify-stretch w-full">
                            <a 
                              href="#estimator" 
                              onClick={() => {
                                const element = document.getElementById("estimator");
                                if (element) {
                                  element.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              className="w-full text-center py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[10px] text-white font-mono uppercase tracking-widest transition-colors duration-200"
                            >
                              Liên hệ bộ phận kỹ thuật &amp; đặt mua ➔
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              );
            })}
        </div>

        {/* Partnership Note info footer */}
        <div className="mt-12 p-6 rounded-3xl bg-glass border border-white/15 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm font-sans gap-4" id="distribution-partnership-note">
          <div className="flex items-start">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" />
            <p className="text-slate-400">
              <strong className="text-white">Cam kết về kỹ thuật:</strong> Quý khách hàng tự thiết kế POI, gậy múa hoặc sân khấu sử dụng chip nhập khẩu từ Lighttoys hay Ignis sẽ được kỹ sư trưởng của <strong className="text-white">Happy Smart Light</strong> tư vấn giải pháp nguồn pin Lipo dòng xả cao, cách hàn đấu an toàn và cung cấp các tệp cấu hình (Timeline profile) tối ưu hóa sẵn trên máy tính máy chủ xLights.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

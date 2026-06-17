import { useState } from "react";
import { Cpu, Zap, Radio, Sliders, Check, ShieldAlert, Award, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";

interface ProductsProps {
  onQuoteRequested: (productName: string) => void;
  onViewProductDetails: (productId: string) => void;
}

export default function Products({ onQuoteRequested, onViewProductDetails }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "features" | "specs">>({
    v4pro: "features",
    matrix: "features",
    hsl4x: "features",
    poi: "features",
  });

  const products: Product[] = [
    {
      id: "v4pro",
      name: "Bộ Điều Khiển ARGB Happy Smart Light V4 PRO",
      price: "1.200.000 VND",
      description: "Bộ điều khiển ánh sáng độc quyền sử dụng giao thức ARGB HSL tốc độ cao, chuyên dụng cho các dải LED ARGB mật độ lớn. Tích hợp giải pháp phần cứng tối ưu hỗ trợ làm mạch Poi mạnh mẽ, bền bỉ và di động.",
      features: [
        "Tối ưu hóa phần cứng siêu nhỏ gọn, hỗ trợ đắc lực làm mạch POI biểu diễn mạnh mẽ",
        "2 cổng ra ARGB cách ly vật lý độc lập chống xung tín hiệu dội ngược",
        "Bộ chuyển mức logic tích hợp (Level Shifter 3.3V lên đúng 5.0V chuẩn công nghiệp)",
        "Nút cơ học chuyển nhanh kịch bản ngoại tuyến khi tạm ngắt kết nối không dây",
      ],
      specs: [
        { label: "Vi xử lý", value: "ESP32 ARM Dual-Core 240MHz" },
        { label: "Điện áp hỗ trợ", value: "DC 5V (Tương thích cell pin sạc 3.7V - 4.2V)" },
        { label: "Giao thức Gốc", value: "ARGB HSL Sync Protocol (Độc quyền)" },
        { label: "Đế đỡ", value: "Hộp nhôm anot hóa tản nhiệt chuyên sâu" },
        { label: "Chuẩn chống bụi", value: "IP44 bảo vệ linh kiện tối đa" },
      ],
      protocols: ["ARGB HSL Protocol", "xLights DDP", "LedFx Engine", "Art-Net DMX", "E1.31"],
      badge: "Flagship POI",
      glowColor: "yellow",
    },
    {
      id: "matrix",
      name: "Happy Smart LED Matrix Driver Pro",
      price: "Tùy thời giá linh kiện",
      description: "Bộ lái ma trận LED cabin chuyên nghiệp hàng đầu với chip ghim tọa độ, tối ưu hiển thị tranh điện LED Matrix, hoạt ảnh chữ xếp động và timeline nhạc sự kiện.",
      features: [
        "Điều khiển trực tiếp các tấm Panel LED (LED Cabin) đồng bộ thời gian thực mượt mà",
        "Bố trí khe SD Micro nạp trước kịch bản đồng bộ offline đa độ phân giải",
        "Phân tách zone điều khiển riêng biệt giữa các mảng ma trận không trễ",
        "Kéo thẳng luồng dữ liệu DDP xLights trực quan cực nhanh thông qua LAN Ethernet",
      ],
      specs: [
        { label: "Vi xử lý", value: "ESP32-S3 High Performance 8MB Flash" },
        { label: "Loại LED hỗ trợ", value: "Các dòng Panel LED/Cabin LED chuyên dụng" },
        { label: "Giao thức nén", value: "ARGB HSL Matrix Stream (Zero Delay)" },
        { label: "Thẻ nhớ mở rộng", value: "Hỗ trợ chuẩn FAT32 lưu trữ hàng nghìn tệp GIF/POV" },
        { label: "Cảm biến điện", value: "Ngắt tải tự động bảo vệ quá nhiệt và ngắn mạch" },
      ],
      protocols: ["ARGB HSL Matrix", "xLights DDP", "Art-Net", "E1.31 multicast", "TPM2.net"],
      badge: "Cho Panel LED",
      glowColor: "blue",
    },
    {
      id: "hsl4x",
      name: "Bộ Điều Khiển ARGB Happy Smart Light 4X",
      price: "930.000 VND",
      description: "Bộ điều khiển ARGB công suất lớn cực kỳ mạnh mẽ, chịu dòng cực cao. Chuyên dụng cho các ứng dụng làm matrix pixel, trống led matrix, cờ led matrix sự kiện.",
      features: [
        "Điều khiển số lượng LED lớn, chịu dòng tải cực cao chuyên dụng cho sự kiện lớn",
        "4 cổng ra LED ARGB độc lập tích hợp diode chống dòng dội ngược bảo vệ mạch",
        "IC chuyển mức Level Shifter (3.3V lên 5.0V) đảm bảo tín hiệu luôn ổn định, sắc nét",
        "Phù hợp hoàn hảo cho thi công trống LED matrix, cờ LED matrix phức tạp",
      ],
      specs: [
        { label: "Vi xử lý", value: "ESP32 ARM Dual-Core 240MHz" },
        { label: "Cấp nguồn tối đa", value: "Cầu đấu đồng khối mạ niken gánh tải liên tục lên tới 30A" },
        { label: "Cổng ra độc lập", value: "4 cổng ra chống dội ngược xung tín hiệu" },
        { label: "IC chuyển mức logic", value: "Chuẩn chuyển mức logic tín hiệu 5V công nghiệp" },
        { label: "Bảo vệ mạch", value: "Chống ngược cực nguồn và xả tải an toàn" },
      ],
      protocols: ["ARGB HSL Protocol", "xLights DDP", "LedFx Engine", "Art-Net", "E1.31"],
      badge: "Công Suất Cực Cao",
      glowColor: "dual",
    },
    {
      id: "poi",
      name: "Happy POI Performance Wand (Gậy LED Biêu Diễn)",
      price: "Tùy thời giá linh kiện",
      description: "Gậy múa LED xiếc ảo ảnh POV cầm tay di động siêu bền, pin Lipo sạc tích hợp đồng bộ nhóm múa chuyên dùng sân khấu.",
      features: [
        "Module dải LED SK9822 rực rỡ nhất (Tần suất PWM rọi kịch 4.7KHz)",
        "Đồng bộ liên minh sóng Wifi nội bộ AP tự trị giữa các gậy múa liên kết",
        "Đồng hồ thời gian thực RTC pin sạc Type-C siêu trâu múa liên tục 5-8 giờ",
        "Lõi vỏ nhựa Polycarbonate bọc chống rạn vỡ chịu rơi ném va đập mạnh",
      ],
      specs: [
        { label: "Vi xử lý", value: "Cortex M4 Ultra low-power Co-processor" },
        { label: "Pin Lithium sạc", value: "Li-poly sạc an toàn chống phồng 4200mAh" },
        { label: "Dung lượng chứa ảnh", value: "128MB nạp sẵn hàng trăm ảnh Bitmap POV rực rỡ" },
        { label: "Độ chính xác xoay", value: "Con quay hồi chuyển IMU đo hành trình múa vẽ ảnh" },
        { label: "Khối lượng", value: "Nặng 240g tối ưu hóa trọng tâm quăng múa nghệ sĩ" },
      ],
      protocols: ["ARGB HSL POI Sync", "xLights Timeline", "Wireless AP mode", "Offline POV Script"],
      badge: "Nghệ Thuật Di Động",
      glowColor: "pink",
    },
  ];

  const handleTabChange = (productId: string, tab: "features" | "specs") => {
    setActiveTabMap((prev) => ({
      ...prev,
      [productId]: tab,
    }));
  };

  const getGlowBorderClass = (color: string) => {
    switch (color) {
      case "pink":
        return "border-neon-pink/20 hover:border-neon-pink/60 hover:shadow-glow-pink";
      case "blue":
        return "border-neon-blue/20 hover:border-neon-blue/60 hover:shadow-glow-blue";
      case "yellow":
        return "border-neon-yellow/20 hover:border-neon-yellow/60 hover:shadow-glow-yellow";
      case "dual":
        return "border-purple-500/20 hover:border-purple-500/60 hover:shadow-glow-dual";
      default:
        return "border-white/10 hover:border-white/30";
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "pink":
        return "bg-neon-pink-bright/20 text-neon-pink-bright border-neon-pink/30";
      case "blue":
        return "bg-neon-blue-bright/20 text-neon-blue-bright border-neon-blue/30";
      case "yellow":
        return "bg-gradient-to-r from-neon-yellow/20 to-amber-500/10 text-neon-yellow-bright border-neon-yellow/40 shadow-glow-yellow/10";
      case "dual":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-white/10 text-white";
    }
  };

  return (
    <section id="products" className="relative py-[65px] overflow-hidden border-t border-white/5 bg-slate-950/20">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyber-dark to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-neon-pink-bright/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-neon-blue-bright/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16" id="products-heading">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest font-bold">
              THIẾT BỊ ĐIỀU KHIỂN CHUYÊN DỤNG
            </span>
            <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Sản Phẩm Cốt Lõi{" "}
              <span className="bg-gradient-to-r from-neon-pink-bright to-neon-blue-bright bg-clip-text text-transparent">
                Happy Smart Light
              </span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Các dòng sản phẩm được hoàn thiện cơ khí tinh xảo, sử dụng linh kiện công nghiệp và phần mềm mở tối ưu hóa độ trễ, sẵn sàng đáp ứng mọi hình thức thi công của bạn.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto pb-2 md:pb-0" id="products-filter">
            {["all", "ARGB HSL/xLights", "Matrix/Panel", "Biểu Diễn POV"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border cursor-pointer transition-all duration-200 whitespace-nowrap ${selectedCategory === cat
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-slate-900/40 text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
              >
                {cat === "all" ? "Tất Cả Sản Phẩm" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8" id="products-grid">
          {products
            .filter((p) => {
              if (selectedCategory === "all") return true;
              if (selectedCategory === "ARGB HSL/xLights") return p.id === "v4pro" || p.id === "hsl4x" || p.id === "poi";
              if (selectedCategory === "Matrix/Panel") return p.id === "matrix" || p.id === "hsl4x";
              if (selectedCategory === "Biểu Diễn POV") return p.id === "poi" || p.id === "v4pro";
              return false;
            })
            .map((product) => {
              const activeTab = activeTabMap[product.id] || "features";
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                  className={`bg-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 relative group overflow-hidden ${getGlowBorderClass(
                    product.glowColor
                  )}`}
                  id={`product-card-${product.id}`}
                >
                  <div>
                    {/* Top badging & indicators */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <Cpu className={`w-5 h-5 ${
                          product.glowColor === 'pink' 
                            ? 'text-neon-pink-bright' 
                            : product.glowColor === 'yellow'
                              ? 'text-neon-yellow-bright'
                              : 'text-neon-blue-bright'
                        }`} />
                        <span className="font-mono text-[10px] tracking-widest text-slate-500">
                          ID: {product.id.toUpperCase()}-LITE_V4
                        </span>
                      </div>
                      {product.badge && (
                        <span className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase border ${getBadgeColor(product.glowColor)}`}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#00f0ff] transition-colors duration-300 mb-3">
                      {product.name}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Supported protocols badges inside card */}
                    <div className="flex flex-wrap gap-1.5 mb-6" id={`product-protocols-${product.id}`}>
                      {product.protocols.map((proto) => (
                        <span
                          key={proto}
                          className="px-2.5 py-0.5 rounded bg-slate-900 border border-white/5 text-[9px] font-mono tracking-wide text-zinc-300"
                        >
                          {proto}
                        </span>
                      ))}
                    </div>

                    {/* Tab Navigation (Features / Spec Details) */}
                    <div className="border-b border-white/5 mb-4 flex space-x-4">
                      <button
                        onClick={() => handleTabChange(product.id, "features")}
                        className={`pb-2 text-xs font-mono uppercase tracking-wider relative cursor-pointer ${activeTab === "features" ? "text-white font-semibold" : "text-slate-500 hover:text-slate-300"
                          }`}
                      >
                        Đặc điểm nổi bật
                        {activeTab === "features" && (
                          <motion.span
                            layoutId={`active-tab-line-${product.id}`}
                            className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                              product.glowColor === "pink" 
                                ? "bg-neon-pink" 
                                : product.glowColor === "yellow"
                                  ? "bg-neon-yellow"
                                  : "bg-neon-blue"
                            }`}
                          />
                        )}
                      </button>
                      <button
                        onClick={() => handleTabChange(product.id, "specs")}
                        className={`pb-2 text-xs font-mono uppercase tracking-wider relative cursor-pointer ${activeTab === "specs" ? "text-white font-semibold" : "text-slate-500 hover:text-slate-300"
                          }`}
                      >
                        Thông số kỹ thuật
                        {activeTab === "specs" && (
                          <motion.span
                            layoutId={`active-tab-line-${product.id}`}
                            className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                              product.glowColor === "pink" 
                                ? "bg-neon-pink" 
                                : product.glowColor === "yellow"
                                  ? "bg-neon-yellow"
                                  : "bg-neon-blue"
                            }`}
                          />
                        )}
                      </button>
                    </div>

                    {/* Tab Content Display */}
                    <div className="min-h-[160px] pb-6" id={`product-details-tab-${product.id}`}>
                      <AnimatePresence mode="wait">
                        {activeTab === "features" ? (
                          <motion.ul
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="space-y-2.5"
                          >
                            {product.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start text-xs text-slate-300 font-sans leading-relaxed">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center p-0.5 mt-0.5 mr-2.5 ${
                                  product.glowColor === "pink" 
                                    ? "bg-neon-pink/10" 
                                    : product.glowColor === "yellow"
                                      ? "bg-neon-yellow/10"
                                      : "bg-neon-blue/10"
                                }`}>
                                  <Check className={`w-3.5 h-3.5 ${
                                    product.glowColor === "pink" 
                                      ? "text-neon-pink-bright" 
                                      : product.glowColor === "yellow"
                                        ? "text-neon-yellow-bright"
                                        : "text-neon-blue-bright"
                                  }`} />
                                </span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </motion.ul>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5"
                          >
                            {product.specs.map((spec, sIdx) => (
                              <div key={sIdx} className="p-2 rounded-lg bg-slate-900/40 border border-white/5 font-mono">
                                <span className="block text-[9px] text-slate-500 uppercase tracking-wider">{spec.label}</span>
                                <span className="text-xs text-white block mt-0.5">{spec.value}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Pricing / CTA button */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Giá bán lẻ đề xuất</span>
                      <span className="text-sm font-display font-semibold text-[#00f0ff] uppercase tracking-wider">
                        {product.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap gap-2" id={`btn-group-product-${product.id}`}>
                      <button
                        onClick={() => onViewProductDetails(product.id)}
                        className="py-3 px-4.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider cursor-pointer text-center whitespace-nowrap transition-all duration-300 bg-white/5 text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/10 hover:text-white flex items-center justify-center space-x-1.5"
                        id={`btn-product-details-${product.id}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem Chi Tiết</span>
                      </button>

                      <button
                        onClick={() => onQuoteRequested(product.name)}
                        className={`py-3 px-5 rounded-xl font-display text-xs font-bold uppercase tracking-wider cursor-pointer text-center whitespace-nowrap transition-all duration-300 flex-1 sm:flex-none ${
                          product.glowColor === "pink"
                            ? "bg-neon-pink/15 text-neon-pink-bright border border-neon-pink/35 hover:bg-neon-pink hover:text-white"
                            : product.glowColor === "yellow"
                              ? "bg-neon-yellow/15 text-neon-yellow-bright border border-neon-yellow/35 hover:bg-neon-yellow hover:text-white"
                              : product.glowColor === "blue"
                                ? "bg-neon-blue/15 text-neon-blue-bright border border-neon-blue/35 hover:bg-neon-blue hover:text-white"
                                : "bg-purple-500/15 text-purple-300 border border-purple-500/35 hover:bg-purple-500 hover:text-white"
                          }`}
                        id={`btn-product-quote-${product.id}`}
                      >
                        Báo Giá & Setup
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

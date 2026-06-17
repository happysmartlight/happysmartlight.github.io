import { useState, useEffect } from "react";
import { Laptop, Cpu, Layers, Radio, Network, SlidersHorizontal, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "../hooks/perf";

interface SoftwareNode {
  id: string;
  name: string;
  type: string;
  useCase: string;
  dataRate: string;
  latency: string;
  desc: string;
  glowColor: "pink" | "blue" | "purple";
  particleColor: string;
  flowDirection: "fast" | "normal" | "burst";
}

export default function Ecosystem() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("xlights");
  const [pulseCount, setPulseCount] = useState<number>(0);

  const softwareNodes: SoftwareNode[] = [
    {
      id: "xlights",
      name: "xLights Software",
      type: "Dự án kịch bản đồng bộ âm nhạc chuyên sâu",
      useCase: "Biểu diễn nhạc hội nghệ thuật, trang trí mùa lễ hội, nhạc nước chuyên nghiệp với timeline nhạc chi tiết từng mili-giây.",
      dataRate: "DDP / E1.31 (~15 - 50Kbps/cổng)",
      latency: "< 2ms ở tần số 40Hz",
      desc: "Phần mềm mã nguồn mở mạnh mẽ nhất thế giới để vẽ mô hình LED đa chiều, nạp tệp nhạc wav/mp3, đặt từng keyframe biến chuyển màu săc cho hàng triệu điểm pixel đồng loạt.",
      glowColor: "pink",
      particleColor: "rgba(255, 0, 127, 0.8)",
      flowDirection: "burst",
    },
    {
      id: "ledfx",
      name: "LedFx Audio Engine",
      type: "Phân tích và phản hồi âm thanh trực tiếp",
      useCase: "Phòng Bar, Gaming Room cá nhân, sân khấu Club. LED chớp nhảy và lướt sóng dải tần hoàn hảo theo nhịp tiếng Bass/Mids/Highs.",
      dataRate: "E1.31 dmx / Art-Net (~25Kbps)",
      latency: "< 1ms (Cực nhạy âm thanh)",
      desc: "Engine phân tích tần số âm thanh từ card máy tính thời gian thực. Tự phát luồng sáng pixel nhấp nháy, nổ bùm, rượt đuổi dải màu mượt mà ôm trọn khoảnh khắc EDM cao trào.",
      glowColor: "blue",
      particleColor: "rgba(0, 240, 255, 0.8)",
      flowDirection: "fast",
    },
    {
      id: "wled",
      name: "ARGB HSL Mobile App",
      type: "Điều khiển phân nhóm và cấu hình Wi-Fi/Bluetooth",
      useCase: "Thiết kế LED phòng ngủ, gầm tủ bếp, lắp ráp LED nội thất xe hơi, trang trí nhà thông minh hằng ngày trực tiếp thuận tiện.",
      dataRate: "HSL Bluetooth BLE & WebSockets (~3Kbps)",
      latency: "< 5ms (Tối ưu phản xạ chuyển đổi kịch bản)",
      desc: "Ứng dụng di động độc quyền thiết kế riêng cho hệ sinh thái ARGB HSL Việt Nam. Nhận diện BLE siêu tốc, tinh chỉnh màu sắc sRGB kịch bản rộng, hỗ trợ chia tới 16 phân vùng độc lập tùy biến kịch bản cực mượt.",
      glowColor: "purple",
      particleColor: "rgba(168, 85, 247, 0.8)",
      flowDirection: "normal",
    },
    {
      id: "artnet",
      name: "Art-Net / DMX Standard",
      type: "Chuẩn điều khiển ánh sáng sân khấu sự kiện",
      useCase: "Đồng bộ dây cáp đèn Moving Head sân khấu, hệ thống sương mù khói lửa, dàn Laser hoành tráng trong hội trường sự kiện lớn.",
      dataRate: "Art-Net IV (DMX over IP, ~250Kbps)",
      latency: "~3 - 5ms tiêu chuẩn",
      desc: "Giao thức truyền gói tin DMX512 qua chuẩn cáp mạng Ethernet/Wi-Fi thông dụng. Giúp bộ điều khiển Happy Smart Light dễ dàng kết nối thẳng vào bàn Mixer điều khiển ánh sáng của kỹ thuật viên sân khấu chuyên nghiệp.",
      glowColor: "blue",
      particleColor: "rgba(6, 182, 212, 0.8)",
      flowDirection: "normal",
    },
  ];

  const selectedNode = softwareNodes.find((n) => n.id === selectedNodeId) || softwareNodes[0];

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const { ref: sectionRef, inView } = useInView<HTMLElement>();

  // Particle pulse trigger simulation — paused while the section is off-screen.
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setPulseCount((p) => p + 1);
    }, selectedNode ? (selectedNode.flowDirection === "fast" ? 1200 : selectedNode.flowDirection === "burst" ? 950 : 1600) : 1500);
    return () => clearInterval(interval);
  }, [selectedNode?.flowDirection, selectedNode?.id, inView]);

  return (
    <section ref={sectionRef} id="ecosystem" className="relative py-[65px] overflow-hidden">
      <div className="absolute inset-0 bg-radial-at-t from-slate-900/40 via-cyber-dark to-cyber-dark -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="ecosystem-intro">
          <span className="font-mono text-xs text-neon-blue-bright uppercase tracking-widest font-bold">
            HỆ SINH THÁI ĐA KẾT NỐI MỞ
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Cầu Nối Tuyệt Đối Giữa{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright via-purple-400 to-neon-blue-bright bg-clip-text text-transparent">
              Ứng Dụng & Thiết Bị
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Happy Smart Light là phần cứng hoàn thiện trung gian lý tưởng, chuyển hóa tức thời các dữ liệu điểm màu phức tạp từ PC/Điện thoại sang các dải bóng đèn LED phát sáng nghệ thuật.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch" id="ecosystem-layout">
          {/* Left Software Switcher Column with In-Place Accordion Expansion */}
          <div className="lg:col-span-6 flex flex-col justify-start" id="ecosystem-left">
            <div className="space-y-4">
              <span className="font-mono text-[10px] uppercase text-slate-500 tracking-wider block">
                [BƯỚC 1] CHỌN PHẦN MỀM GỐC ĐỂ XEM CHI TIẾT (TOUCH/CLICK):
              </span>
              <div className="space-y-3.5">
                {softwareNodes.map((node) => {
                  const isActive = node.id === selectedNodeId;
                  const isPink = node.glowColor === "pink";
                  const isPurple = node.glowColor === "purple";
                  const glowClass = isPink
                    ? "hover:border-neon-pink/40 hover:bg-neon-pink/5"
                    : isPurple
                    ? "hover:border-purple-500/40 hover:bg-purple-500/5"
                    : "hover:border-neon-blue/40 hover:bg-neon-blue/5";

                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeSelect(node.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-start group select-none ${
                        isActive
                          ? isPink
                            ? "bg-neon-pink/10 border-neon-pink/40 text-white shadow-lg shadow-neon-pink/5"
                            : isPurple
                            ? "bg-purple-500/10 border-purple-500/40 text-white shadow-lg shadow-purple-500/5"
                            : "bg-neon-blue/10 border-neon-blue/40 text-white shadow-lg shadow-neon-blue/5"
                          : "bg-slate-950/40 border-white/5 text-slate-400" + " " + glowClass
                      }`}
                      id={`software-node-card-${node.id}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                            isActive
                              ? isPink
                                ? "bg-neon-pink/20 border-neon-pink/40 text-neon-pink-bright"
                                : isPurple
                                ? "bg-purple-500/20 border-purple-500/40 text-purple-400"
                                : "bg-neon-blue/20 border-neon-blue/40 text-neon-blue-bright"
                              : "bg-slate-900 border-white/5 text-slate-400 group-hover:scale-105"
                          }`}>
                            {node.id === "wled" ? (
                              <SlidersHorizontal className="w-5 h-5" />
                            ) : node.id === "ledfx" ? (
                              <Network className="w-5 h-5" />
                            ) : (
                              <Laptop className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <span className="font-display font-semibold text-sm sm:text-base text-zinc-100 block group-hover:text-white transition-colors">
                              {node.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 block transition-colors mt-0.5">
                              {node.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono tracking-wider ${isActive ? "text-neon-blue-bright" : "text-slate-600"} hidden sm:inline`}>
                            {isActive ? "ĐANG MỞ" : "XEM CHI TIẾT"}
                          </span>
                          <div className="w-2.5 h-2.5 rounded-full relative flex">
                            {isActive && (
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                isPink ? "bg-neon-pink" : isPurple ? "bg-purple-500" : "bg-neon-blue"
                              }`} />
                            )}
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                              isActive
                                ? isPink
                                  ? "bg-neon-pink-bright"
                                  : isPurple
                                  ? "bg-purple-400"
                                  : "bg-neon-blue-bright"
                                : "bg-slate-700"
                            }`} />
                          </div>
                        </div>
                      </div>

                      {/* Expanding Accordion Segment */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 18 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden w-full"
                          >
                            <div className="border-t border-white/5 pt-4" onClick={(e) => e.stopPropagation()}>
                              <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed mb-4">
                                {node.desc}
                              </p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 border-t border-white/5 font-mono text-[11px] leading-relaxed">
                                <div className="space-y-1">
                                  <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">KỊCH BẢN PHÙ HỢP:</span>
                                  <span className="text-[#00f0ff] font-medium block leading-normal">{node.useCase}</span>
                                </div>
                                <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-2">
                                  <div>
                                    <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">BĂNG THÔNG:</span>
                                    <span className="text-zinc-200 font-medium block mt-0.5">{node.dataRate}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">ĐỘ TRỄ TRUYỀN:</span>
                                    <span className="text-neon-pink-bright font-bold block mt-0.5">{node.latency}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: VERTICAL Flow Transmission Chart */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center" id="ecosystem-right">
            <div className="w-full bg-glass border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
              <span className="font-mono text-[10px] uppercase text-slate-500 tracking-wider block mb-5">
                [BƯỚC 2] BIỂU ĐỒ TRUYỀN DẪN THỜI GIAN THỰC (VERTICAL REAL-TIME FLOW):
              </span>

              {/* Centered Vertical Canvas */}
              <div className="relative w-full h-[520px] bg-black/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between items-center overflow-hidden" id="schematic-canvas">
                {/* SVG connection lines overlaying the components */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none animate-pulse-slow" id="schematic-lines">
                  <defs>
                    <linearGradient id="vertical-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={selectedNode.particleColor} stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Vertical Connection Wire 1: App to Wifi Router */}
                  <line
                    x1="50%"
                    y1="64"
                    x2="50%"
                    y2="152"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />

                  {/* Vertical Connection Wire 2: Wifi Router to Happy Light Controller */}
                  <line
                    x1="50%"
                    y1="202"
                    x2="50%"
                    y2="288"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3"
                  />

                  {/* Vertical Connection Wire 3: Happy Light Controller to LEDs output */}
                  <line
                    x1="50%"
                    y1="344"
                    x2="50%"
                    y2="422"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3"
                  />

                  {/* Downward moving particles synced with selection */}
                  {/* Particle 1: App to Router */}
                  <AnimatePresence>
                    <motion.circle
                      key={`vpart1-${pulseCount}`}
                      cx="50%"
                      cy="64"
                      r="4.5"
                      fill={selectedNode.particleColor}
                      style={{ filter: "drop-shadow(0 0 6px " + selectedNode.particleColor + ")" }}
                      animate={{ cy: [64, 152], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: selectedNode.flowDirection === "fast" ? 0.6 : selectedNode.flowDirection === "burst" ? 0.45 : 1.0,
                        ease: "easeInOut",
                      }}
                    />
                  </AnimatePresence>

                  {/* Particle 2: Router to Controller */}
                  <AnimatePresence>
                    <motion.circle
                      key={`vpart2-${pulseCount}`}
                      cx="50%"
                      cy="202"
                      r="5.5"
                      fill="#00f0ff"
                      style={{ filter: "drop-shadow(0 0 8px #00f0ff)" }}
                      animate={{ cy: [202, 288], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: selectedNode.flowDirection === "fast" ? 0.5 : selectedNode.flowDirection === "burst" ? 0.35 : 0.8,
                        ease: "linear",
                        delay: selectedNode.flowDirection === "fast" ? 0.25 : selectedNode.flowDirection === "burst" ? 0.15 : 0.4,
                      }}
                    />
                  </AnimatePresence>

                  {/* Particle 3: Controller to LEDs */}
                  <AnimatePresence>
                    <motion.circle
                      key={`vpart3-${pulseCount}`}
                      cx="50%"
                      cy="344"
                      r="4.5"
                      fill="#ff007f"
                      style={{ filter: "drop-shadow(0 0 6px #ff007f)" }}
                      animate={{ cy: [344, 422], opacity: [1, 0.8, 0] }}
                      transition={{
                        duration: 0.45,
                        ease: "easeOut",
                        delay: selectedNode.flowDirection === "fast" ? 0.65 : selectedNode.flowDirection === "burst" ? 0.45 : 1.1,
                      }}
                    />
                  </AnimatePresence>
                </svg>

                {/* Vertical Node 1: Source Application */}
                <div className="flex flex-col items-center space-y-1 z-10" id="schematic-node-app">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-900 border transition-all duration-300 ${
                    selectedNode.glowColor === "pink"
                      ? "border-neon-pink/40 shadow-glow-pink/30 text-neon-pink-bright"
                      : selectedNode.glowColor === "purple"
                      ? "border-purple-500/40 shadow-glow-dual/30 text-purple-400"
                      : "border-neon-blue/40 shadow-glow-blue/30 text-neon-blue-bright"
                  }`}>
                    {selectedNode.id === "wled" ? (
                      <SlidersHorizontal className="w-6 h-6 animate-pulse" />
                    ) : selectedNode.id === "ledfx" ? (
                      <Network className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Laptop className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white mt-1">
                    {selectedNode.name}
                  </span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">Ứng dụng phát dữ liệu</span>
                </div>

                {/* Vertical Node 2: Wi-Fi Router / Network */}
                <div className="flex flex-col items-center space-y-1 z-10" id="schematic-node-router">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-900 border border-white/10 text-slate-300">
                    <Radio className="w-5 h-5 text-[#00f0ff] animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-300">
                    Wi-Fi Router 2.4GHz
                  </span>
                  <span className="text-[8px] font-mono text-emerald-400 uppercase">
                    Truyền tải UDP / Bluetooth BLE
                  </span>
                </div>

                {/* Vertical Node 3: Happy Smart Light Hardware */}
                <div className="flex flex-col items-center space-y-1 z-10" id="schematic-node-controller">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-950 border-2 border-[#00f0ff] shadow-glow-blue text-white relative">
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <Cpu className="w-8 h-8 text-[#00f0ff]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neon-blue-bright mt-1">
                    Happy Smart Light Controller
                  </span>
                  <span className="text-[8px] font-mono text-yellow-500 uppercase">
                    Level Shifter 3.3V → 5V Safe Signal
                  </span>
                </div>

                {/* Vertical Node 4: LEDs arrays */}
                <div className="flex flex-col items-center space-y-2 z-10" id="schematic-node-leds">
                  <div className="flex space-x-3 bg-slate-900/80 px-4 py-1.5 rounded-xl border border-white/10 shadow-lg" id="schematic-led-strips">
                    {/* Strip CH1 */}
                    <div className="flex space-x-1 items-center">
                      <span className="text-[8px] font-mono text-slate-500 mr-1 font-bold">CH1</span>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: selectedNode.particleColor,
                            boxShadow: `0 0 8px ${selectedNode.particleColor}`,
                            opacity: 0.4 + i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                    {/* Strip CH2 */}
                    <div className="flex space-x-1 items-center border-l border-white/10 pl-3">
                      <span className="text-[8px] font-mono text-slate-500 mr-1 font-bold">CH2</span>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: "rgba(0, 240, 255, 0.8)",
                            boxShadow: "0 0 8px rgba(0, 240, 255, 0.8)",
                            opacity: 0.4 + i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-pink-500 uppercase leading-none tracking-wider font-semibold">
                    Đồng bộ hiệu ứng dải LED ARGB siêu tốc
                  </span>
                </div>
              </div>

              {/* Protocol summary footer bar with level description */}
              <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-white/5 flex flex-col sm:flex-row items-center sm:justify-between text-xs gap-3 font-sans" id="schematic-legend">
                <p className="text-slate-400 text-center sm:text-left">
                  <strong className="text-white">Kiến thức chuyên môn:</strong> Chip chuyển mức logic (<span className="text-yellow-400">Level Shifter</span>) là tuyệt đối cần thiết vì ESP32 xuất tín hiệu 3.3V, trong khi IC dải LED WS2812B/SK6812 yêu cầu chuẩn 5.0V để không bị chớp giật hoặc lỗi điểm ảnh. Happy Smart Light trang bị nó mặc định.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

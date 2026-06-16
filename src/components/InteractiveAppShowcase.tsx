import { useState } from "react";
import { Music, Car, Gamepad2, Presentation, Flame, Sparkles, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ApplicationItem } from "../types";

interface InteractiveAppShowcaseProps {
  onThemeChanged: (colorTheme: "pink" | "blue" | "emerald" | "amber" | "purple") => void;
}

export default function InteractiveAppShowcase({ onThemeChanged }: InteractiveAppShowcaseProps) {
  const [activeAppId, setActiveAppId] = useState<string>("stage");

  const applications: ApplicationItem[] = [
    {
      id: "stage",
      title: "LED Sân Khấu & Sự Kiện",
      tagline: "Đồng bộ không gian biểu diễn bùng nổ",
      description: "Tích hợp mượt mà với bàn nâng cơ học, phần mềm DMX hay sơ đồ xLights. Điều khiển hàng nghìn tia ánh sáng kết nối liền mạch, tăng tối đa tương tác cùng khán giả trong đêm diễn.",
      themeColor: "pink",
      gradientClass: "from-neon-pink to-purple-600",
      metrics: ["Đồng bộ timeline mượt mà", "Băng tần Ethernet dự phòng", "Chuẩn chống nước IP65 vỏ tủ"],
    },
    {
      id: "car",
      title: "Độ LED Trang Trí Xe Ô Tô/Xe Máy",
      tagline: "Độc bản bứt phá phong cách cá nhân",
      description: "Mạch lọc nguồn thích nghi đặc tính điện áp biến thiên trên phương tiện giao thông. Tạo lập hiệu ứng ánh sáng gầm xe rực sáng lướt sóng đồng điệu với nhịp ga hay chuyển làn.",
      themeColor: "amber",
      gradientClass: "from-amber-500 to-orange-600",
      metrics: ["Chống rung xóc va đập vỏ", "Ổn định dải áp 9-30V DC", "Ứng dụng kết nối bluetooth BLE"],
    },
    {
      id: "gaming",
      title: "Ánh Sáng LED Phòng Gaming / Studio",
      tagline: "Nhập tâm vào không gian sinh động",
      description: "Kết nối cổng quang âm thanh hoặc mic máy tính chạy LedFx. Dải LED góc phòng chớp giật đổi tông màu xanh, hồng, lục, lam chuẩn mực theo tín hiệu cháy nổ trong game hoặc tiết điệu nhạc lướt.",
      themeColor: "blue",
      gradientClass: "from-[#00f0ff] to-[#06b6d4]",
      metrics: ["Phản hồi âm thanh < 1ms", "Không gây loãng tín hiệu wifi", "Hỗ trợ 150+ bảng màu ARGB HSL"],
    },
    {
      id: "matrix",
      title: "Ma Trận LED Quảng Cáo & Chữ Chạy",
      tagline: "Thu hút mọi ánh nhìn với độ rực sáng cao",
      description: "Dễ dàng lồng ghép logo, biểu tượng đồ họa hay văn bản chạy ngang thu hút khách qua lại hằng đêm. Cấu hình phân chia khung hình cực kỳ linh động bằng giao diện trực quan.",
      themeColor: "purple",
      gradientClass: "from-purple-500 via-pink-600 to-indigo-600",
      metrics: ["Cấu hình kích cỡ 32x32, 64x64", "Trình chiếu ảnh Gif động", "Cập nhật chữ chạy qua wifi"],
    },
    {
      id: "poi",
      title: "Gậy POI & Đội Biểu Diễn Di Động",
      tagline: "Sân khấu ảo ảnh sắc màu chuyển dịch",
      description: "Trọng lượng nhẹ lý tưởng cùng liên kết sóng không dây AP Master-Slave giúp các thành viên đội múa giữ đồng điệu hiệu ứng POV vẽ hình ảnh tinh tế trong không khí khi múa xoay gậy.",
      themeColor: "emerald",
      gradientClass: "from-emerald-400 to-teal-600",
      metrics: ["Thời lượng pin sạc tới 8 tiếng", "IMU 6 trục định vị tốc độ quay", "Vỏ siêu dẻo chống vỡ nứt"],
    },
  ];

  const activeApp = applications.find((a) => a.id === activeAppId) || applications[0];

  const getIcon = (id: string, colorTheme: string) => {
    let style = "w-6 h-6";
    if (colorTheme === "pink") style += " text-neon-pink-bright";
    else if (colorTheme === "blue") style += " text-neon-blue-bright";
    else if (colorTheme === "emerald") style += " text-emerald-400";
    else if (colorTheme === "amber") style += " text-amber-400";
    else if (colorTheme === "purple") style += " text-purple-400";

    switch (id) {
      case "stage":
        return <Music className={style} />;
      case "car":
        return <Car className={style} />;
      case "gaming":
        return <Gamepad2 className={style} />;
      case "matrix":
        return <Presentation className={style} />;
      case "poi":
        return <Flame className={style} />;
      default:
        return <Sparkles className={style} />;
    }
  };

  const handleAppSelect = (id: string, theme: "pink" | "blue" | "emerald" | "amber" | "purple") => {
    setActiveAppId(id);
    onThemeChanged(theme);
  };

  return (
    <section id="applications" className="relative py-24 border-t border-white/5">
      {/* Background light bubble simulating selected theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="applications-header">
          <span className="font-mono text-xs text-neon-blue-bright uppercase tracking-widest font-bold">
            THỰC TIỄN KIẾN TẠO KHÔNG GIAN
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Ứng Dụng Thực Tế{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright via-white to-neon-blue-bright bg-clip-text text-transparent">
              Vô Giới Hạn
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Click chọn một cấu trúc ứng dụng dưới đây để xem kịch bản thông số tương thích, đồng thời kích hoạt trình giả lập hiệu ứng màu sắc gầm/không khí tương thích thời gian thực!
          </p>
        </div>

        {/* Action Toggle Stack (Accordion) */}
        <div className="max-w-4xl mx-auto flex flex-col space-y-3.5" id="applications-selector-stack">
          <span className="font-mono text-[10px] uppercase text-slate-500 tracking-wider block text-center sm:text-left mb-2">
            CHỌN MÔI TRƯỜNG THỰC TẾ (TOUCH/CLICK ĐỂ MỞ RỘNG):
          </span>
          {applications.map((app) => {
            const isActive = app.id === activeAppId;
            let borderActiveColor = "border-white/5";
            let shadowClass = "";
            let textHighlight = "text-white";
            
            if (isActive) {
              if (app.themeColor === "pink") {
                borderActiveColor = "border-neon-pink/40 bg-neon-pink/5";
                shadowClass = "shadow-lg shadow-neon-pink/5";
                textHighlight = "text-neon-pink-bright";
              }
              else if (app.themeColor === "blue") {
                borderActiveColor = "border-neon-blue/40 bg-neon-blue/5";
                shadowClass = "shadow-lg shadow-neon-blue/5";
                textHighlight = "text-neon-blue-bright";
              }
              else if (app.themeColor === "emerald") {
                borderActiveColor = "border-emerald-500/40 bg-emerald-500/5";
                shadowClass = "shadow-lg shadow-emerald-500/5";
                textHighlight = "text-emerald-400";
              }
              else if (app.themeColor === "amber") {
                borderActiveColor = "border-amber-500/40 bg-amber-500/5";
                shadowClass = "shadow-lg shadow-amber-500/5";
                textHighlight = "text-amber-400";
              }
              else if (app.themeColor === "purple") {
                borderActiveColor = "border-purple-500/40 bg-purple-500/5";
                shadowClass = "shadow-lg shadow-purple-500/5";
                textHighlight = "text-purple-400";
              }
            }

            return (
              <div
                key={app.id}
                onClick={() => handleAppSelect(app.id, app.themeColor)}
                className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-start group select-none ${
                  isActive
                    ? borderActiveColor + " " + shadowClass
                    : "bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/40 text-slate-400"
                }`}
                id={`btn-app-selector-${app.id}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                      isActive
                        ? "bg-black/60 border-white/20 " + textHighlight
                        : "bg-slate-900 border-white/5 text-slate-400 group-hover:scale-105"
                    }`}>
                      {getIcon(app.id, app.themeColor)}
                    </div>
                    <div>
                      <span className={`font-display font-semibold text-base sm:text-lg block transition-colors ${isActive ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                        {app.title}
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs text-slate-500 block mt-0.5 group-hover:text-slate-400 transition-colors">
                        {app.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono tracking-wider ${isActive ? textHighlight : "text-slate-600"} hidden sm:inline`}>
                      {isActive ? "ĐANG MỞ" : "XEM CHI TIẾT"}
                    </span>
                    <div className="w-2.5 h-2.5 rounded-full relative flex">
                      {isActive && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current ${textHighlight}`} />
                      )}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        isActive ? textHighlight.replace("text-", "bg-") : "bg-slate-700"
                      }`} />
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={true}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden w-full"
                    >
                      <div className="border-t border-white/5 pt-5 relative" onClick={(e) => e.stopPropagation()}>
                        {/* Visual Backdrop Color Burst */}
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] -z-10 opacity-20 bg-gradient-to-br ${app.gradientClass}`} />

                        <p className="font-sans font-light text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                          {app.description}
                        </p>

                        <div className="space-y-3 pt-5 border-t border-white/5">
                          <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider block">
                            THÔNG SỐ GIẢI PHÁP ĐỒNG BỘ ĐI KÈM:
                          </span>
                          <div className="grid sm:grid-cols-3 gap-3" id={`app-metrics-${app.id}`}>
                            {app.metrics.map((metric, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 font-mono text-xs flex items-start sm:items-center space-x-2.5 text-zinc-300 shadow-sm"
                              >
                                <div className={`w-2 h-2 rounded-full mt-1 sm:mt-0 shrink-0 bg-gradient-to-tr ${app.gradientClass}`} />
                                <span className="leading-tight">{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-white/5 font-mono text-xs">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              <span className="text-slate-400 text-[10px] sm:text-xs">Live Environment Demo Active</span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase text-right">Mô phỏng thực tế</span>
                          </div>
                          
                          {/* Dynamic SVG / CSS Animation Demos based on app ID */}
                          <div className="w-full h-40 sm:h-52 bg-black rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center" id={`demo-visual-${app.id}`}>
                            {app.id === "stage" && (
                              <div className="absolute inset-0">
                                {/* Ceiling truss bar */}
                                <div className="absolute top-0 inset-x-0 h-3 bg-slate-800 border-b border-white/10 z-20" />
                                {/* Spotlight cones from ceiling */}
                                {[
                                  { left: "10%", color: "rgba(255,45,149,0.4)", delay: 0 },
                                  { left: "30%", color: "rgba(138,43,226,0.35)", delay: 0.3 },
                                  { left: "50%", color: "rgba(0,229,255,0.35)", delay: 0.6 },
                                  { left: "70%", color: "rgba(255,45,149,0.35)", delay: 0.9 },
                                  { left: "90%", color: "rgba(138,43,226,0.4)", delay: 1.2 },
                                ].map((spot, i) => (
                                  <motion.div
                                    key={i}
                                    style={{ left: spot.left, transformOrigin: "top center" }}
                                    animate={{ rotate: [-12, 12, -12], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: spot.delay }}
                                    className="absolute top-3 w-0 h-0 z-10"
                                  >
                                    <div
                                      className="w-0 h-0 -translate-x-1/2"
                                      style={{
                                        borderLeft: "25px solid transparent",
                                        borderRight: "25px solid transparent",
                                        borderTop: `120px solid ${spot.color}`,
                                        filter: "blur(6px)",
                                      }}
                                    />
                                  </motion.div>
                                ))}
                                {/* Horizontal sweeping laser */}
                                <motion.div
                                  animate={{ left: ["-10%", "110%"] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                                  className="absolute top-[30%] w-[30%] h-[1px] z-10"
                                  style={{ background: "linear-gradient(90deg, transparent, #ff2d95, transparent)", boxShadow: "0 0 8px 2px rgba(255,45,149,0.6)" }}
                                />
                                <motion.div
                                  animate={{ right: ["-10%", "110%"] }}
                                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
                                  className="absolute top-[45%] w-[25%] h-[1px] z-10"
                                  style={{ background: "linear-gradient(90deg, transparent, #00e5ff, transparent)", boxShadow: "0 0 8px 2px rgba(0,229,255,0.5)" }}
                                />
                                {/* Stage floor with reflection */}
                                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent z-10">
                                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />
                                </div>
                                {/* Crowd silhouette */}
                                <div className="absolute bottom-1 inset-x-0 flex items-end justify-center gap-[2px] z-20 px-2">
                                  {Array.from({ length: 20 }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ y: [0, i % 3 === 0 ? -3 : -1, 0] }}
                                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                                      className="rounded-full bg-slate-950"
                                      style={{ width: `${4 + Math.random() * 3}%`, height: `${8 + Math.random() * 8}px` }}
                                    />
                                  ))}
                                </div>
                                {/* Floating particles */}
                                {Array.from({ length: 12 }).map((_, i) => (
                                  <motion.div
                                    key={`p-${i}`}
                                    animate={{ y: ["100%", "-20%"], opacity: [0, 1, 0], x: [0, (i % 2 === 0 ? 15 : -15)] }}
                                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                                    className="absolute w-1 h-1 rounded-full"
                                    style={{ left: `${5 + i * 8}%`, background: i % 2 === 0 ? "#ff2d95" : "#00e5ff" }}
                                  />
                                ))}
                              </div>
                            )}

                            {app.id === "car" && (
                              <div className="w-48 sm:w-64 h-20 relative flex items-center justify-center">
                                {/* Car Body */}
                                <div className="w-36 sm:w-44 h-12 bg-slate-800 rounded-t-2xl relative z-10 border border-white/5 border-b-0" />
                                {/* Wheels */}
                                <div className="absolute bottom-0 left-[15%] w-5 h-5 rounded-full bg-slate-700 border border-white/10 z-10" />
                                <div className="absolute bottom-0 right-[15%] w-5 h-5 rounded-full bg-slate-700 border border-white/10 z-10" />
                                {/* Underglow Effect */}
                                <motion.div
                                  animate={{
                                    boxShadow: [
                                      "0 12px 30px rgba(245, 158, 11, 0.5)",
                                      "0 12px 45px rgba(245, 158, 11, 0.9)",
                                      "0 12px 30px rgba(245, 158, 11, 0.5)",
                                    ]
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute bottom-1 w-36 sm:w-44 h-2 bg-amber-500 rounded-full blur-[8px]"
                                />
                                {/* Sliding flow effect */}
                                <motion.div
                                  animate={{ x: ["-100%", "100%"] }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="absolute bottom-1 w-1/3 h-2 bg-white blur-sm rounded-full mix-blend-overlay"
                                />
                                {/* Road line */}
                                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-slate-700" />
                              </div>
                            )}

                            {app.id === "gaming" && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {/* Wall ambient LED strips */}
                                <motion.div
                                  animate={{
                                    background: [
                                      "linear-gradient(180deg, rgba(0,240,255,0.15), transparent 60%)",
                                      "linear-gradient(180deg, rgba(255,0,127,0.15), transparent 60%)",
                                      "linear-gradient(180deg, rgba(16,185,129,0.15), transparent 60%)",
                                      "linear-gradient(180deg, rgba(139,92,246,0.15), transparent 60%)",
                                      "linear-gradient(180deg, rgba(0,240,255,0.15), transparent 60%)",
                                    ]
                                  }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute inset-0"
                                />
                                {/* Corner LED strips */}
                                <motion.div
                                  animate={{ background: ["rgba(0,240,255,0.5)", "rgba(255,0,127,0.5)", "rgba(16,185,129,0.5)", "rgba(0,240,255,0.5)"] }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                                />
                                <motion.div
                                  animate={{ background: ["rgba(255,0,127,0.5)", "rgba(16,185,129,0.5)", "rgba(0,240,255,0.5)", "rgba(255,0,127,0.5)"] }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute right-0 top-0 bottom-0 w-[2px]"
                                />
                                {/* Monitor */}
                                <div className="relative z-10 mb-1">
                                  <div className="w-36 sm:w-52 h-20 sm:h-28 bg-slate-900 border border-slate-700/80 rounded-md relative overflow-hidden shadow-2xl">
                                    {/* Screen content - game scene simulation */}
                                    <motion.div
                                      animate={{
                                        background: [
                                          "linear-gradient(135deg, #0f172a 0%, #164e63 30%, #0f172a 60%, #831843 100%)",
                                          "linear-gradient(135deg, #831843 0%, #0f172a 30%, #164e63 60%, #0f172a 100%)",
                                          "linear-gradient(135deg, #0f172a 0%, #064e3b 30%, #0f172a 60%, #4c1d95 100%)",
                                          "linear-gradient(135deg, #0f172a 0%, #164e63 30%, #0f172a 60%, #831843 100%)",
                                        ]
                                      }}
                                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                      className="absolute inset-0"
                                    />
                                    {/* HUD overlay */}
                                    <div className="absolute top-1 left-1.5 text-[6px] sm:text-[8px] text-green-400/70 font-mono">FPS: 144</div>
                                    <div className="absolute top-1 right-1.5 text-[6px] sm:text-[8px] text-cyan-400/70 font-mono">LED SYNC ●</div>
                                    {/* Crosshair */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-3 h-3 sm:w-4 sm:h-4 border border-red-500/60 rounded-full" />
                                      <div className="absolute w-[1px] h-2 sm:h-3 bg-red-500/40" />
                                      <div className="absolute w-2 sm:w-3 h-[1px] bg-red-500/40" />
                                    </div>
                                  </div>
                                  {/* Monitor stand */}
                                  <div className="w-4 h-2 bg-slate-700 mx-auto" />
                                  <div className="w-12 h-1 bg-slate-700 rounded-sm mx-auto" />
                                  {/* Monitor backlight glow */}
                                  <motion.div
                                    animate={{
                                      boxShadow: [
                                        "0 0 40px 20px rgba(0,240,255,0.3)",
                                        "0 0 50px 25px rgba(255,0,127,0.3)",
                                        "0 0 40px 20px rgba(16,185,129,0.3)",
                                        "0 0 40px 20px rgba(0,240,255,0.3)",
                                      ]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-2 -z-10 rounded-lg"
                                  />
                                </div>
                                {/* RGB Keyboard below monitor */}
                                <div className="relative z-10 mt-1 flex gap-[1px] sm:gap-[2px] flex-wrap justify-center w-32 sm:w-44">
                                  {Array.from({ length: 30 }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{
                                        backgroundColor: [
                                          `hsl(${(i * 12) % 360}, 100%, 60%)`,
                                          `hsl(${(i * 12 + 120) % 360}, 100%, 60%)`,
                                          `hsl(${(i * 12 + 240) % 360}, 100%, 60%)`,
                                          `hsl(${(i * 12) % 360}, 100%, 60%)`,
                                        ]
                                      }}
                                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.05 }}
                                      className="w-[8px] h-[5px] sm:w-[10px] sm:h-[6px] rounded-[1px]"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {app.id === "matrix" && (
                              <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                                {/* LED Panel frame */}
                                <div className="relative border-2 border-slate-700 rounded-lg p-1.5 sm:p-2 bg-slate-950 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                                  {/* LED dot matrix */}
                                  <div className="grid grid-cols-16 gap-[2px] sm:gap-[3px]" style={{ gridTemplateColumns: "repeat(16, 1fr)" }}>
                                    {Array.from({ length: 96 }).map((_, i) => {
                                      const col = i % 16;
                                      const row = Math.floor(i / 16);
                                      // Create a wave pattern that scrolls horizontally
                                      const waveDelay = col * 0.12 - row * 0.05;
                                      // Determine if this LED should be "on" in the text pattern
                                      const isTextLed = (row >= 1 && row <= 4) && (
                                        (col >= 1 && col <= 3) || (col >= 5 && col <= 7) || (col >= 9 && col <= 11) || (col >= 13 && col <= 15)
                                      );
                                      
                                      return (
                                        <motion.div
                                          key={i}
                                          animate={{
                                            opacity: isTextLed ? [0.2, 1, 1, 0.2] : [0.05, 0.3, 0.05],
                                            backgroundColor: isTextLed
                                              ? ["#a855f7", "#ec4899", "#8b5cf6", "#a855f7"]
                                              : ["#1e1b4b", "#2e1065", "#1e1b4b"],
                                          }}
                                          transition={{
                                            duration: isTextLed ? 2 : 3,
                                            repeat: Infinity,
                                            delay: waveDelay,
                                            ease: "easeInOut",
                                          }}
                                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1px]"
                                          style={{
                                            boxShadow: isTextLed ? "0 0 4px rgba(168,85,247,0.5)" : "none",
                                          }}
                                        />
                                      );
                                    })}
                                  </div>
                                  {/* Scanning line effect */}
                                  <motion.div
                                    animate={{ top: ["-5%", "105%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none"
                                  />
                                </div>
                              </div>
                            )}

                            {app.id === "poi" && (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <motion.div
                                  animate={{ rotateZ: 360, rotateX: 20 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                  className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center"
                                >
                                  {/* Spinning stick effect */}
                                  <div className="absolute w-2 h-full bg-slate-800 rounded-full flex justify-between flex-col overflow-hidden">
                                    <div className="h-1/3 w-full bg-emerald-400 blur-[2px] shadow-[0_0_15px_#34d399]" />
                                    <div className="h-1/3 w-full bg-emerald-400 blur-[2px] shadow-[0_0_15px_#34d399]" />
                                  </div>
                                  {/* POV ghost trails */}
                                  <motion.div
                                     animate={{ opacity: [0.2, 0.8, 0.2] }}
                                     transition={{ duration: 0.4, repeat: Infinity }}
                                     className="absolute inset-0 rounded-full border-[12px] border-dashed border-emerald-500/20"
                                  />
                                </motion.div>
                              </div>
                            )}
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
    </section>
  );
}

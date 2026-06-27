import { useState, useEffect } from "react";
import { Music, Car, Gamepad2, Presentation, Flame, Sparkles, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ApplicationItem } from "../types";

interface InteractiveAppShowcaseProps {
  onThemeChanged: (colorTheme: "pink" | "blue" | "emerald" | "amber" | "purple") => void;
}

export default function InteractiveAppShowcase({ onThemeChanged }: InteractiveAppShowcaseProps) {
  const [activeAppId, setActiveAppId] = useState<string>("poi");

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
    {
      id: "dance",
      title: "LED Dance & Trang Phục Pixel",
      tagline: "Trang phục phát sáng đồng bộ theo giai điệu nhạc",
      description: "Dành cho nhóm nhảy, vũ đoàn và performer mặc trang phục gắn các đoạn LED pixel. Ánh sáng trên từng dải LED được sync theo beat, bass và melody của bài nhạc, giúp chuyển động cơ thể và hiệu ứng ánh sáng đối chọi nhau trên sân khấu.",
      themeColor: "purple",
      gradientClass: "from-fuchsia-500 via-neon-pink to-cyan-400",
      metrics: ["Trang phục LED pixel theo nhóm", "Sync beat nhạc / bass / melody", "Kịch bản ánh sáng cho vũ đoàn"],
    },
  ];

  const applicationOrder = ["poi", "dance", "stage", "gaming", "matrix", "car"];
  const orderedApplications = applicationOrder
    .map((id) => applications.find((app) => app.id === id))
    .filter((app): app is ApplicationItem => Boolean(app));

  const activeApp = orderedApplications.find((a) => a.id === activeAppId) || orderedApplications[0];

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
      case "dance":
        return <Sparkles className={style} />;
      default:
        return <Sparkles className={style} />;
    }
  };

  const handleAppSelect = (id: string, theme: "pink" | "blue" | "emerald" | "amber" | "purple") => {
    setActiveAppId(id);
    onThemeChanged(theme);
  };

  // Allow the navbar "Giải Pháp" dropdown to deep-link to a specific use-case:
  // it dispatches `hsl:select-app` (live, when this section is already mounted)
  // and/or stashes the id in sessionStorage (read on mount when arriving from
  // another route). Either path selects the tab + applies its theme.
  useEffect(() => {
    const applyApp = (id: string) => {
      const app = applications.find((a) => a.id === id);
      if (!app) return;
      setActiveAppId(app.id);
      onThemeChanged(app.themeColor);
      try {
        sessionStorage.removeItem("hsl-pending-app");
      } catch {
        /* ignore */
      }
    };

    try {
      const pending = sessionStorage.getItem("hsl-pending-app");
      if (pending) applyApp(pending);
    } catch {
      /* ignore */
    }

    const handler = (e: Event) => applyApp((e as CustomEvent<string>).detail);
    window.addEventListener("hsl:select-app", handler);
    return () => window.removeEventListener("hsl:select-app", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="applications" className="relative py-[65px] overflow-hidden border-t border-white/5">
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
          {orderedApplications.map((app) => {
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
                                {/* Lighting truss bar */}
                                <div className="absolute top-0 inset-x-0 h-2.5 bg-slate-800 border-b border-white/10 z-20" />
                                {/* Hanging LED beam bars (theme pink/purple) */}
                                <div className="absolute top-2.5 inset-x-0 bottom-0 flex items-start justify-center gap-2 sm:gap-3 px-5">
                                  {Array.from({ length: 7 }).map((_, i) => {
                                    const isPink = i % 2 === 0;
                                    return (
                                      <motion.div
                                        key={i}
                                        animate={{
                                          height: [`${30 + (i % 3) * 8}%`, `${72 + (i % 3) * 8}%`, `${30 + (i % 3) * 8}%`],
                                          opacity: [0.45, 1, 0.45],
                                        }}
                                        transition={{ duration: 1.4 + (i % 3) * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                                        className="w-2.5 sm:w-3.5 rounded-b-full"
                                        style={{
                                          background: isPink
                                            ? "linear-gradient(to bottom, #ff2d95, rgba(255,45,149,0))"
                                            : "linear-gradient(to bottom, #a855f7, rgba(168,85,247,0))",
                                          boxShadow: isPink ? "0 0 12px rgba(255,45,149,0.7)" : "0 0 12px rgba(168,85,247,0.7)",
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                                {/* Floor glow */}
                                <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-neon-pink/15 to-transparent z-10" />
                              </div>
                            )}

                            {app.id === "dance" && (
                              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-fuchsia-500/15 via-cyan-400/10 to-transparent" />
                                <div className="absolute inset-x-8 top-5 flex items-end justify-center gap-1.5 opacity-35">
                                  {Array.from({ length: 18 }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ height: [`${18 + (i % 4) * 8}px`, `${44 + (i % 5) * 9}px`, `${18 + (i % 4) * 8}px`] }}
                                      transition={{ duration: 0.75 + (i % 3) * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.035 }}
                                      className="w-1 rounded-full bg-gradient-to-t from-neon-pink to-cyan-300"
                                    />
                                  ))}
                                </div>

                                <div className="relative z-10 flex items-end justify-center gap-6 sm:gap-10">
                                  {[
                                    { delay: 0, tilt: -8, color: "#ff2d95" },
                                    { delay: 0.18, tilt: 7, color: "#00e5ff" },
                                    { delay: 0.36, tilt: -5, color: "#a855f7" },
                                  ].map((dancer, idx) => (
                                    <motion.div
                                      key={idx}
                                      animate={{ y: [0, -9, 0], rotate: [0, dancer.tilt, 0] }}
                                      transition={{ duration: 0.72, repeat: Infinity, ease: "easeInOut", delay: dancer.delay }}
                                      className="relative h-28 sm:h-32 w-14 sm:w-16 flex items-center justify-center"
                                    >
                                      <div className="absolute top-0 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border border-white/15 bg-slate-900" />
                                      <div className="absolute top-8 left-1/2 h-14 w-8 -translate-x-1/2 rounded-full border border-white/10 bg-slate-900/90">
                                        {Array.from({ length: 8 }).map((_, dot) => (
                                          <motion.span
                                            key={dot}
                                            animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.18, 0.85] }}
                                            transition={{ duration: 0.62, repeat: Infinity, ease: "easeInOut", delay: dancer.delay + dot * 0.045 }}
                                            className="absolute h-1.5 w-1.5 rounded-full"
                                            style={{
                                              left: `${20 + (dot % 2) * 44}%`,
                                              top: `${12 + dot * 10}%`,
                                              backgroundColor: dancer.color,
                                              boxShadow: `0 0 10px ${dancer.color}`,
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <div className="absolute top-10 left-1 h-1.5 w-11 origin-right -rotate-12 rounded-full bg-gradient-to-l from-cyan-300 to-transparent shadow-[0_0_10px_rgba(0,229,255,0.7)]" />
                                      <div className="absolute top-10 right-1 h-1.5 w-11 origin-left rotate-12 rounded-full bg-gradient-to-r from-neon-pink to-transparent shadow-[0_0_10px_rgba(255,45,149,0.7)]" />
                                      <div className="absolute bottom-0 left-4 h-12 w-1.5 rotate-12 rounded-full bg-gradient-to-b from-slate-700 to-cyan-300 shadow-[0_0_8px_rgba(0,229,255,0.55)]" />
                                      <div className="absolute bottom-0 right-4 h-12 w-1.5 -rotate-12 rounded-full bg-gradient-to-b from-slate-700 to-neon-pink shadow-[0_0_8px_rgba(255,45,149,0.55)]" />
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {app.id === "car" && (
                              <div className="relative w-52 sm:w-64 flex flex-col items-center justify-center">
                                {/* Chassis silhouette */}
                                <div className="relative z-10 w-40 sm:w-48 h-11 sm:h-12 bg-slate-800 rounded-t-[26px] rounded-b-md border border-white/5">
                                  {/* cabin window */}
                                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 bg-slate-900/80 rounded-t-2xl border border-white/5" />
                                  {/* wheels */}
                                  <div className="absolute -bottom-2 left-[16%] w-5 h-5 rounded-full bg-slate-900 border border-white/10 z-20" />
                                  <div className="absolute -bottom-2 right-[16%] w-5 h-5 rounded-full bg-slate-900 border border-white/10 z-20" />
                                </div>
                                {/* Underglow LED strip (row of glowing dots) */}
                                <div className="relative z-0 mt-3 w-40 sm:w-48 flex justify-between px-1">
                                  {Array.from({ length: 14 }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ opacity: [0.35, 1, 0.35] }}
                                      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
                                      className="w-1.5 h-1.5 rounded-full bg-amber-400"
                                      style={{ boxShadow: "0 0 8px 2px rgba(245,158,11,0.85)" }}
                                    />
                                  ))}
                                </div>
                                {/* Soft underglow pool */}
                                <motion.div
                                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute -bottom-1 w-44 sm:w-52 h-3 bg-amber-500 blur-[10px] rounded-full"
                                />
                                {/* Light sweep */}
                                <motion.div
                                  animate={{ x: ["-130%", "130%"] }}
                                  transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                                  className="absolute bottom-0 w-1/3 h-2 bg-white/70 blur-sm rounded-full mix-blend-overlay"
                                />
                              </div>
                            )}

                            {app.id === "gaming" && (
                              <div className="relative w-44 sm:w-56 flex flex-col items-center justify-center">
                                {/* Ambient back glow cycling RGB */}
                                <motion.div
                                  animate={{
                                    boxShadow: [
                                      "0 0 45px 16px rgba(0,240,255,0.35)",
                                      "0 0 45px 16px rgba(255,0,127,0.35)",
                                      "0 0 45px 16px rgba(16,185,129,0.35)",
                                      "0 0 45px 16px rgba(139,92,246,0.35)",
                                      "0 0 45px 16px rgba(0,240,255,0.35)",
                                    ],
                                  }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute w-36 sm:w-44 h-20 sm:h-24 rounded-lg -z-10"
                                />
                                {/* Monitor / screen */}
                                <div className="relative z-10 w-36 sm:w-44 h-20 sm:h-24 rounded-md bg-slate-900 border border-slate-700 overflow-hidden">
                                  <motion.div
                                    animate={{
                                      background: [
                                        "linear-gradient(135deg, #0f172a, #164e63, #0f172a, #831843)",
                                        "linear-gradient(135deg, #831843, #0f172a, #164e63, #0f172a)",
                                        "linear-gradient(135deg, #0f172a, #064e3b, #0f172a, #4c1d95)",
                                        "linear-gradient(135deg, #0f172a, #164e63, #0f172a, #831843)",
                                      ],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 opacity-90"
                                  />
                                  <div className="absolute top-1 left-1.5 text-[7px] sm:text-[8px] text-green-400/70 font-mono">144 FPS</div>
                                  <div className="absolute top-1 right-1.5 text-[7px] sm:text-[8px] text-cyan-300/80 font-mono">LED SYNC ●</div>
                                </div>
                                {/* Stand */}
                                <div className="w-5 h-2 bg-slate-700" />
                                <div className="w-14 h-1 bg-slate-700 rounded-sm" />
                                {/* RGB LED desk strip (row of glowing dots cycling hue) */}
                                <div className="mt-2 w-44 sm:w-52 flex justify-between">
                                  {Array.from({ length: 18 }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{
                                        backgroundColor: [
                                          `hsl(${(i * 18) % 360}, 100%, 62%)`,
                                          `hsl(${(i * 18 + 140) % 360}, 100%, 62%)`,
                                          `hsl(${(i * 18 + 260) % 360}, 100%, 62%)`,
                                          `hsl(${(i * 18) % 360}, 100%, 62%)`,
                                        ],
                                        boxShadow: [
                                          `0 0 6px 1px hsla(${(i * 18) % 360},100%,62%,0.8)`,
                                          `0 0 6px 1px hsla(${(i * 18 + 140) % 360},100%,62%,0.8)`,
                                          `0 0 6px 1px hsla(${(i * 18 + 260) % 360},100%,62%,0.8)`,
                                          `0 0 6px 1px hsla(${(i * 18) % 360},100%,62%,0.8)`,
                                        ],
                                      }}
                                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.05 }}
                                      className="w-1.5 h-1.5 rounded-full"
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

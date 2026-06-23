import { useState } from "react";
import { Smartphone, Laptop, Download, RefreshCw, Smartphone as PhoneIcon, Sliders, Play, CheckCircle2, QrCode, Monitor, Sparkles, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AppAndToolSectionProps {
  onViewPrivacy?: () => void;
  onViewAppDetails?: () => void;
  onViewToolDetails?: () => void;
}

export default function AppAndToolSection({ onViewPrivacy, onViewAppDetails, onViewToolDetails }: AppAndToolSectionProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // App Simulator State
  const [activeColor, setActiveColor] = useState("#ff2d95");
  const [activeEffect, setActiveEffect] = useState("Rainbow Flow");
  const [brightness, setBrightness] = useState(85);
  const [syncStatus, setSyncStatus] = useState(true);

  const colorsList = ["#ff2d95", "#00e5ff", "#a855f7", "#eab308", "#22c55e", "#ef4444"];
  const effectsList = ["Rainbow Flow", "Cosmic Strobe", "Pixel Wave", "Pulse Beat", "Metropoli Beat"];

  const WINDOWS_TOOL_URL = "https://github.com/happysmartlight/happysmartlight.github.io/releases/download/App_ARGB_HSL/ToolARGB_HSL_Setup_3.7.1.exe";
  const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.happysmartlight.argb";

  const startDownload = () => {
    const link = document.createElement("a");
    link.href = WINDOWS_TOOL_URL;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerDownload = () => {
    if (downloading || downloadSuccess) return;
    setDownloading(true);
    setDownloadProgress(0);

    let started = false;
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setDownloadSuccess(true);
          if (!started) {
            started = true;
            startDownload();
          }
          setTimeout(() => setDownloadSuccess(false), 5000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <section id="app-and-tool" className="relative py-[65px] border-t border-white/5 bg-slate-950/40 overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-neon-pink-bright/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-neon-blue-bright/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="apptool-header">
          <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest font-bold block">
            HỆ ĐIỀU HÀNH THỜI GIAN THỰC
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Bộ Đôi Giải Pháp Tối Ưu:{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright via-purple-400 to-neon-blue-bright bg-clip-text text-transparent">
              Ứng Dụng HSL
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Kiểm soát tuyệt đối dải LED của bạn trực tiếp từ Thiết bị di động (Android App) hoặc Thiết lập không gian diễn sướng phức tạp cấp độ cao qua Máy tính (Windows Tool) độc quyền của <strong className="text-white">Happy Smart Light</strong>.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch" id="apptool-grid">
          
          {/* Card 1: Android Mobile App Showcase */}
          <div className="lg:col-span-7 bg-glass rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group" id="android-app-card">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-neon-pink-bright/5 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-pink-bright/10 transition-colors" />
            
            <div className="grid md:grid-cols-12 gap-6 items-center">
              {/* Text Specs info */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-neon-pink-bright/35 flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-neon-pink-bright" />
                  </div>
                  <span className="font-mono text-xs tracking-wider uppercase text-neon-pink-bright font-bold">
                    MOBILE APP (ANDROID / CH PLAY)
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                  Ứng Dụng Di Động <br />
                  <span className="text-glow-pink font-extrabold text-neon-pink-bright">ARGB HSL CONTROLLER</span>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Thiết kế riêng cho hệ sinh thái ARGB HSL. Tự động quy quét Bluetooth BLE dải siêu rộng, kết nối và cấu hình nhanh Wi-Fi qua AP mode, hỗ trợ hơn 180 hiệu ứng kịch bản chuyển động độc lập không phụ thuộc internet.
                </p>

                <ul className="space-y-2 font-sans text-xs text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-pink-bright mr-2 shrink-0" />
                    <span>BLE Auto-Scout & Ghép Nối 1-Chạm không cần mật khẩu</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-pink-bright mr-2 shrink-0" />
                    <span>Bộ mã hóa bản đồ ma trận (Matrix Mapper) trực quan</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-pink-bright mr-2 shrink-0" />
                    <span>Lên lịch hẹn giờ thông minh, chế độ theo nhạc nhảy cực nhạy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-pink-bright mr-2 shrink-0 mt-0.5" />
                    <span>Nhỏ gọn cầm tay — điều khiển trọn buổi diễn ngay trên điện thoại với <strong className="text-white font-semibold">đầy đủ tính năng như bản máy tính</strong></span>
                  </li>
                </ul>

                {/* Download panel: QR + nút Google Play gom gọn một khối */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-950/50 border border-white/5">
                    {/* QR Code → Google Play (quét trên di động hoặc bấm trên desktop) */}
                    <a
                      href={ANDROID_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Quét hoặc bấm để mở ARGB HSL trên Google Play"
                      className="w-20 h-20 bg-white p-1.5 rounded-lg flex items-center justify-center shrink-0 hover:ring-2 hover:ring-neon-pink/40 transition-shadow cursor-pointer no-underline"
                    >
                      <img
                        src="/img/app-mobile/qr-google-play.png"
                        alt="QR code tải ứng dụng ARGB HSL trên Google Play"
                        loading="lazy"
                        className="w-full h-full"
                      />
                    </a>

                    {/* Nút Get it on Google Play + gợi ý */}
                    <div className="flex flex-col gap-2 min-w-0">
                      <a
                        href={ANDROID_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center w-fit bg-black border border-white/10 hover:border-neon-pink/50 rounded-xl px-4 py-2 transition-all cursor-pointer shadow-lg"
                      >
                        <div className="mr-3 text-white">
                          {/* Play Store Vector icon */}
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 5.25V18.75c0 .69.56 1.25 1.25 1.25H19.75c.69 0 1.25-.56 1.25-1.25V5.25c0-.69-.56-1.25-1.25-1.25H4.25c-.69 0-1.25.56-1.25 1.25z" fill="none" />
                            <path d="M5.5 4h13c.8 0 1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5h-13C4.7 20 4 19.3 4 18.5v-13c0-.8.7-1.5 1.5-1.5zm6.5 13.8l4.4-4.4-4.4-4.4V11.5H7.2v1.8H12v4.5z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">Tải ngay trên</p>
                          <p className="text-xs font-display font-semibold text-white tracking-tight">Google Play</p>
                        </div>
                      </a>
                      <p className="text-[10px] text-slate-500 font-sans leading-snug">
                        Quét mã QR hoặc bấm nút để tải trực tiếp từ kho ứng dụng.
                      </p>
                    </div>
                  </div>

                  {/* Pricing note: app trả phí */}
                  <p className="text-[11px] text-amber-400/90 font-sans flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    Ứng dụng di động là <strong className="font-semibold">phần mềm trả phí</strong> trên Google Play.
                  </p>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  {onViewAppDetails && (
                    <button
                      onClick={onViewAppDetails}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-slate-900 border border-neon-pink/30 hover:border-neon-pink hover:bg-neon-pink/5 text-xs font-display font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Info className="w-4 h-4 text-neon-pink" />
                      Xem chi tiết & hướng dẫn sử dụng
                    </button>
                  )}

                  {onViewPrivacy && (
                    <button
                      onClick={onViewPrivacy}
                      className="text-[11px] text-slate-400 hover:text-neon-pink underline transition-colors cursor-pointer font-sans flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-neon-pink" />
                      Xem Chính sách bảo mật ARGB HSL (Google Play Compliance)
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic Interactive App Interface Simulator — chỉ hiện từ md trở lên */}
              <div className="hidden md:col-span-5 md:flex justify-center">
                <div className="w-[190px] h-[380px] rounded-[32px] bg-slate-950 border-4 border-slate-700 shadow-glow-dual relative overflow-hidden flex flex-col justify-between p-3 select-none">
                  {/* Top phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-slate-700 rounded-b-xl z-20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900 mr-2" />
                    <div className="w-10 h-1 bg-slate-800 rounded-full" />
                  </div>

                  {/* App Shell Content */}
                  <div className="flex-1 mt-4 flex flex-col justify-between pt-1 font-sans text-[10px]">
                    
                    {/* App Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-bold text-[8px] text-zinc-100 uppercase tracking-tight">ARGB HSL V4</span>
                      </div>
                      <span className="text-[7px] text-slate-500 font-mono">RSSI: -45dBm</span>
                    </div>

                    {/* App Dashboard controllers */}
                    <div className="space-y-3 my-2 flex-1 flex flex-col justify-center">
                      {/* Live color display */}
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundColor: activeColor }} />
                        <span className="block text-slate-500 text-[8px] uppercase">Đầu Ra Đồng Bộ</span>
                        <span className="font-mono text-[10px] font-bold" style={{ color: activeColor }}>{activeColor.toUpperCase()}</span>
                      </div>

                      {/* Speed / Brightness slide */}
                      <div className="space-y-1.5 p-2 rounded-lg bg-slate-900/50">
                        <div className="flex justify-between items-center text-[8px] text-slate-400">
                          <span>ĐỘ SÁNG LED (DIMMER)</span>
                          <span className="font-bold text-white">{brightness}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={brightness} 
                          onChange={(e) => setBrightness(Number(e.target.value))}
                          className="w-full accent-neon-pink h-1 bg-slate-700 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Effects dropdown simulation */}
                      <div className="space-y-1">
                        <span className="text-[8px] text-slate-400 block px-1">KỊCH BẢN ĐANG CHẠY</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {effectsList.slice(0, 4).map((eff) => (
                            <button
                              key={eff}
                              onClick={() => setActiveEffect(eff)}
                              className={`py-1 px-1.5 rounded text-[8px] truncate transition-colors text-left font-mono ${
                                activeEffect === eff 
                                  ? "bg-neon-pink/20 text-white border border-neon-pink/40" 
                                  : "bg-slate-900 text-slate-400 border border-transparent"
                              }`}
                            >
                              • {eff}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color dots choice */}
                      <div className="space-y-1">
                        <span className="text-[8px] text-slate-400 block px-1">MÀU SẮC NHANH</span>
                        <div className="flex justify-between px-1">
                          {colorsList.map((c) => (
                            <button
                              key={c}
                              onClick={() => setActiveColor(c)}
                              className={`w-4.5 h-4.5 rounded-full border transition-transform ${
                                activeColor === c ? "scale-115 border-white" : "border-transparent"
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* App Bottom Status bar */}
                    <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                      <button 
                        onClick={() => setSyncStatus(!syncStatus)}
                        className={`py-1 px-2.5 rounded-full w-full font-bold text-[9px] text-center transition-all ${
                          syncStatus 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {syncStatus ? "● HỆ THUYỀN: ONLINE" : "○ HỆ THUYỀN: OFFLINE"}
                      </button>
                    </div>

                  </div>

                  {/* Home indicator bar */}
                  <div className="w-16 h-1 bg-slate-600 rounded-full mx-auto mt-1" />
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Windows Control Tool Showcase */}
          <div className="lg:col-span-5 bg-glass rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group" id="windows-tool-card">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-neon-blue-bright/5 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-blue-bright/10 transition-colors" />

            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-neon-blue-bright/35 flex items-center justify-center">
                    <Laptop className="w-4 h-4 text-neon-blue-bright" />
                  </div>
                  <span className="font-mono text-xs tracking-wider uppercase text-neon-blue-bright font-bold">
                    DESKTOP SETUP TOOL (WINDOWS x64)
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                  Công Cụ Máy Tính <br />
                  <span className="text-glow-blue font-extrabold text-neon-blue-bright">ARGB HSL CONTROL TOOL</span>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed mt-3">
                  Phần mềm điều khiển và cấu hình ma trận LED chuyên nghiệp hàng đầu Việt Nam cho các kỹ sư ánh sáng và nhà thầu biểu diễn nghệ thuật.
                </p>

                <div className="mt-5 space-y-3.5" id="windows-tool-specs">
                  <div className="flex items-start">
                    <div className="w-5 h-5 rounded-md bg-slate-900 border border-white/5 flex items-center justify-center p-1 mr-3 mt-0.5">
                      <span className="text-[10px] text-neon-blue-bright">1</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-white block font-medium">Auto-Flasher firmware qua cổng COM</span>
                      <span className="text-slate-400">Tự động nạp code chương trình tối tân mới nhất không lo nạp lỗi hoặc hỏng chip điều khiển dán.</span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-5 h-5 rounded-md bg-slate-900 border border-white/5 flex items-center justify-center p-1 mr-3 mt-0.5">
                      <span className="text-[10px] text-neon-blue-bright">2</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-white block font-medium">Bộ thiết kế Layout 2D/3D (Pixel Mapper)</span>
                      <span className="text-slate-400">Chỉ số hóa sơ đồ nối dây bất kỳ, xuất ma trận mượt tối ưu hóa tối đa tuyến đường tín hiệu đi dây thực.</span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-5 h-5 rounded-md bg-slate-900 border border-white/5 flex items-center justify-center p-1 mr-3 mt-0.5">
                      <span className="text-[10px] text-neon-blue-bright">3</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-white block font-medium">Băng thông tối cấp Ethernet / Wi-Fi UDP</span>
                      <span className="text-slate-400">Stream trực tiếp luồng kịch bản xLights với nén dữ liệu độc quyền ARGB HSL nén 60Hz không trễ.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic responsive download block with progress */}
              <div className="pt-6 border-t border-white/5 space-y-3.5">
                <AnimatePresence mode="wait">
                  {downloadSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/35 flex items-center space-x-3 text-xs"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-white font-bold block">Tải xuống hoàn tất!</span>
                        <span className="text-emerald-300">File cài đặt ToolARGB_HSL_Setup_3.7.1.exe đã sẵn sàng.</span>
                      </div>
                    </motion.div>
                  ) : downloading ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2 p-3.5 rounded-xl bg-slate-900 border border-white/5"
                    >
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span className="flex items-center">
                          <RefreshCw className="w-3.5 h-3.5 text-neon-blue-bright animate-spin mr-2" />
                          Đang tải phần mềm cài đặt...
                        </span>
                        <span className="font-mono font-bold text-white">{downloadProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-neon-blue-bright to-cyan-500 transition-all duration-200"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={triggerDownload}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-neon-blue text-center font-display text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 cursor-pointer shadow-glow-blue hover:scale-102 transition-all"
                      id="btn-download-windows-tool"
                    >
                      <Download className="w-4 h-4 text-slate-950 animate-bounce" />
                      <span>TẢI ARGB HSL WINDOWS TOOL (325 MB)</span>
                    </button>
                  )}
                </AnimatePresence>
                
                <span className="block text-[10px] text-center font-mono text-emerald-400 uppercase font-bold">
                  Miễn phí 100% // Phiên bản v3.7.1 // Windows 10/11 x64
                </span>
                <span className="block text-[9px] text-center font-mono text-slate-600 break-all leading-relaxed">
                  SHA256: e54c7ddcde8dac45bcb1f0d921e6e97d91004154af752767e34fa7b58e6eeeec
                </span>

                {onViewToolDetails && (
                  <button
                    onClick={onViewToolDetails}
                    className="w-full py-2.5 px-5 rounded-xl bg-slate-900 border border-neon-blue/30 hover:border-neon-blue hover:bg-neon-blue/5 text-xs font-display font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Info className="w-4 h-4 text-neon-blue" />
                    Xem chi tiết & hướng dẫn sử dụng
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

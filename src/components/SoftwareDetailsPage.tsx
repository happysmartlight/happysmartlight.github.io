import { ArrowLeft, Smartphone, Laptop, Download, CheckCircle2, Cpu, Wifi, Sliders, Music, Camera, ShieldCheck, Mail, Phone, PlayCircle, Settings, Sparkles, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Step {
  title: string;
  desc: string;
}

interface ThemeConfig {
  glow: string;
  backHover: string;
  accentLine: string;
  label: string;
  icon: string;
  bar: string;
  stepCircle: string;
}

const THEME: Record<"app" | "tool", ThemeConfig> = {
  app: {
    glow: "bg-neon-pink-bright/5",
    backHover: "hover:text-neon-pink-bright",
    accentLine: "from-neon-pink via-purple-500 to-neon-blue",
    label: "text-neon-pink-bright",
    icon: "text-neon-pink-bright",
    bar: "bg-neon-pink",
    stepCircle: "bg-neon-pink/10 border-neon-pink-bright/35 text-neon-pink-bright",
  },
  tool: {
    glow: "bg-neon-blue-bright/5",
    backHover: "hover:text-neon-blue-bright",
    accentLine: "from-neon-blue via-cyan-500 to-emerald-400",
    label: "text-neon-blue-bright",
    icon: "text-neon-blue-bright",
    bar: "bg-neon-blue",
    stepCircle: "bg-neon-blue/10 border-neon-blue-bright/35 text-neon-blue-bright",
  },
};

interface SoftwareDetailsPageProps {
  type: "app" | "tool";
  onBack: () => void;
}

const WINDOWS_TOOL_URL =
  "https://github.com/happysmartlight/happysmartlight.github.io/releases/download/App_ARGB_HSL/ToolARGB_HSL_Setup_3.7.1.exe";

export default function SoftwareDetailsPage({ type, onBack }: SoftwareDetailsPageProps) {
  const isApp = type === "app";
  const t = THEME[type];

  const startToolDownload = () => {
    const link = document.createElement("a");
    link.href = WINDOWS_TOOL_URL;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---- Feature data ----
  const appFeatures: Feature[] = [
    { icon: Wifi, title: "Kết nối WiFi / Local Network tức thì", desc: "Tự động quét và bắt sóng bộ điều khiển ESP8266/ESP32 trong cùng mạng, không cần cấu hình IP thủ công." },
    { icon: Sliders, title: "300+ hiệu ứng dựng sẵn", desc: "Rainbow Flow, Pixel Wave, Cosmic Strobe... chỉnh tốc độ, độ sáng, hướng chạy theo thời gian thực." },
    { icon: Music, title: "Đồng bộ âm thanh (Audio Reactive)", desc: "Phân tích nhạc bằng FFT ngay trên điện thoại, đèn nhảy theo nhịp cực nhạy, độ trễ gần như bằng 0." },
    { icon: Camera, title: "Quét QR cấu hình nhanh", desc: "Quét mã QR trên mạch để ghép nối và nạp cấu hình chỉ trong vài giây." },
    { icon: ShieldCheck, title: "Offline-First — Riêng tư tuyệt đối", desc: "Mọi xử lý đều cục bộ trên thiết bị, không tài khoản, không thu thập dữ liệu, không quảng cáo." },
  ];

  const toolFeatures: Feature[] = [
    { icon: Download, title: "Auto-Flasher firmware qua cổng COM", desc: "Tự động nạp code chương trình mới nhất cho chip điều khiển, chống nạp lỗi và hỏng chip dán." },
    { icon: Sliders, title: "Pixel Mapper Layout 2D/3D", desc: "Số hóa sơ đồ nối dây bất kỳ, xuất ma trận tối ưu tuyến đường tín hiệu đi dây thực tế." },
    { icon: Wifi, title: "Stream Ethernet / Wi-Fi UDP 60Hz", desc: "Truyền trực tiếp luồng kịch bản xLights với nén dữ liệu độc quyền ARGB HSL, không trễ." },
    { icon: Cpu, title: "Hỗ trợ ma trận quy mô lớn", desc: "Điều khiển hàng chục nghìn điểm ảnh, phù hợp sân khấu, mặt dựng tòa nhà, sự kiện lớn." },
    { icon: Settings, title: "Quản lý kịch bản & preset", desc: "Lưu, xuất và tái sử dụng các bố cục, preset hiệu ứng cho từng dự án thi công." },
  ];

  // ---- Usage steps ----
  const appSteps: Step[] = [
    { title: "Cài đặt ứng dụng", desc: "Tải ARGB HSL từ Google Play hoặc quét QR để cài file .APK trực tiếp." },
    { title: "Cấp nguồn & kết nối WiFi", desc: "Cắm nguồn bộ điều khiển, đảm bảo điện thoại và mạch cùng một mạng WiFi nhà bạn." },
    { title: "Quét & ghép nối thiết bị", desc: "Mở app, nhấn 'Quét thiết bị' hoặc quét QR trên mạch để app tự nhận bộ điều khiển." },
    { title: "Chọn hiệu ứng & tuỳ chỉnh", desc: "Lựa chọn màu, hiệu ứng, độ sáng; bật chế độ theo nhạc nếu muốn đèn nhảy theo âm thanh." },
    { title: "Lưu preset & hẹn giờ", desc: "Lưu lại cấu hình yêu thích và đặt lịch bật/tắt tự động cho không gian của bạn." },
  ];

  const toolSteps: Step[] = [
    { title: "Tải & cài đặt phần mềm", desc: "Tải bộ cài ToolARGB_HSL_Setup_3.7.1.exe, chạy file và làm theo trình hướng dẫn cài đặt." },
    { title: "Kết nối mạch qua cổng COM", desc: "Cắm bộ điều khiển vào máy tính bằng cáp USB, chọn đúng cổng COM trong phần mềm." },
    { title: "Nạp firmware (nếu cần)", desc: "Dùng Auto-Flasher để nạp/cập nhật firmware mới nhất cho chip điều khiển." },
    { title: "Thiết kế layout Pixel Mapper", desc: "Vẽ sơ đồ ma trận LED 2D/3D theo bố cục thi công thực tế của bạn." },
    { title: "Stream kịch bản & xuất bản", desc: "Kết nối nguồn kịch bản (xLights) qua Ethernet/Wi-Fi UDP và phát trực tiếp ra dải đèn." },
  ];

  const features = isApp ? appFeatures : toolFeatures;
  const steps = isApp ? appSteps : toolSteps;

  return (
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] pt-24 pb-16 font-sans">
      {/* Decorative Glow */}
      <div className={`absolute top-20 left-10 w-96 h-96 ${t.glow} rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-20 right-10 w-96 h-96 ${t.glow} rounded-full blur-[120px] pointer-events-none`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Back navigation */}
        <button
          onClick={onBack}
          className={`group flex items-center space-x-2 text-slate-400 ${t.backHover} transition-colors text-sm font-medium font-mono cursor-pointer mb-8`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>QUAY LẠI TRANG CHỦ / BACK TO HOME</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-10 rounded-2xl bg-slate-950/80 border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Accent line */}
          <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${t.accentLine}`} />

          {/* Heading */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
              {isApp ? <Smartphone className={`w-6 h-6 ${t.icon}`} /> : <Laptop className={`w-6 h-6 ${t.icon}`} />}
            </div>
            <div>
              <span className={`font-mono text-[9px] uppercase tracking-widest ${t.label} font-bold`}>
                {isApp ? "MOBILE APPLICATION (ANDROID)" : "DESKTOP SETUP TOOL (WINDOWS x64)"}
              </span>
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight mt-1">
                {isApp ? "ỨNG DỤNG DI ĐỘNG ARGB HSL" : "CÔNG CỤ MÁY TÍNH ARGB HSL CONTROL TOOL"}
              </h1>
              <p className="font-mono text-xs text-slate-400 mt-2">
                {isApp ? "Điều khiển dải LED ARGB từ điện thoại — mọi lúc, mọi nơi." : "Phần mềm cấu hình & điều khiển ma trận LED chuyên nghiệp — Phiên bản v3.7.1"}
              </p>
            </div>
          </div>

          {/* Intro box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/10 flex items-start gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              {isApp
                ? "ARGB HSL là ứng dụng điều khiển LED thông minh theo triết lý 'Offline-First': nhanh, mượt, bảo mật tuyệt đối. Phù hợp cho trang trí nhà cửa, phòng gaming, quán cà phê và các không gian sáng tạo."
                : "ARGB HSL Control Tool là bộ phần mềm máy tính chuyên nghiệp dành cho kỹ sư ánh sáng và nhà thầu biểu diễn nghệ thuật: thiết kế layout, nạp firmware và stream kịch bản ánh sáng quy mô lớn."}
            </p>
          </div>

          {/* Illustration image for PC tool */}
          {!isApp && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-white/5 bg-slate-900/40 p-2 shadow-inner">
              <img 
                src="/img/controller-chip/tool_argb_hsl.png" 
                alt="Giao diện ARGB HSL Control Tool" 
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          )}

          {/* Key features */}
          <section className="space-y-4 mb-10">
            <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
              <span className={`w-1.5 h-6 rounded-full ${t.bar}`} />
              Tính năng nổi bật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                    <f.icon className={`w-4 h-4 ${t.icon}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm">{f.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Usage guide */}
          <section className="space-y-4 mb-10">
            <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
              <span className={`w-1.5 h-6 rounded-full ${t.bar}`} />
              Hướng dẫn sử dụng
            </h2>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 font-display font-bold text-sm ${t.stepCircle}`}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{s.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* System requirements */}
          <section className="space-y-4 mb-10">
            <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
              <span className={`w-1.5 h-6 rounded-full ${t.bar}`} />
              Yêu cầu hệ thống
            </h2>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 font-mono text-xs text-slate-400 space-y-2">
              {isApp ? (
                <>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Android 8.0 trở lên</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Kết nối WiFi 2.4GHz cùng mạng với bộ điều khiển</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Bộ điều khiển ARGB HSL (chip ESP8266 / ESP32)</p>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Windows 10 / 11 (64-bit)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dung lượng cài đặt: 325 MB</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cổng USB (nạp firmware) & cổng mạng LAN/Wi-Fi (stream)</p>
                  <p className="break-all pt-1 text-[10px] text-slate-500">SHA256: e54c7ddcde8dac45bcb1f0d921e6e97d91004154af752767e34fa7b58e6eeeec</p>
                </>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-6 border-t border-white/5">
            {isApp ? (
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("Đang chuyển hướng đến CH Play..."); }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-neon-pink to-purple-500 text-center font-display text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center space-x-2 cursor-pointer shadow-glow-pink hover:scale-102 transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                <span>TẢI ỨNG DỤNG TRÊN GOOGLE PLAY</span>
              </a>
            ) : (
              <button
                onClick={startToolDownload}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-neon-blue text-center font-display text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 cursor-pointer shadow-glow-blue hover:scale-102 transition-all"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>TẢI ARGB HSL WINDOWS TOOL (325 MB)</span>
              </button>
            )}
          </section>

          {/* Support */}
          <section className="pt-6 mt-6 border-t border-white/5">
            <h2 className="font-display font-bold text-sm text-white mb-3">Hỗ trợ kỹ thuật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center">
                <Phone className="w-4 h-4 text-neon-blue mr-3 shrink-0" />
                <span>Hotline & Zalo: (+84) 0784 140 494</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center">
                <Mail className="w-4 h-4 text-purple-400 mr-3 shrink-0" />
                <span>happysmartlight@outlook.com</span>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

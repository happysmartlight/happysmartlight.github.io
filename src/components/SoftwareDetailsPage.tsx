import { useState } from "react";
import { Images, Wrench, ArrowLeft, Smartphone, Laptop, Download, CheckCircle2, Cpu, Wifi, Sliders, Music, Camera, ShieldCheck, Mail, Phone, PlayCircle, Settings, Sparkles, Eye, WandSparkles, ImageUp, Users, Thermometer, Gauge, BatteryCharging, Trash2, Clock, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import ImageZoomLightbox, { type ZoomGalleryItem } from "./ImageZoomLightbox";
import { WINDOWS_TOOL_URL, WINDOWS_TOOL_VERSION, WINDOWS_TOOL_FILE, WINDOWS_TOOL_SIZE, WINDOWS_TOOL_SHA256 } from "../windowsTool";
import { POI_STUDIO_URL, POI_STUDIO_VERSION, POI_STUDIO_FILE, POI_STUDIO_SIZE, POI_STUDIO_SHA256 } from "../poiStudio";

// "app" = Android, "tool" = ARGB HSL Windows Tool, "poi" = POI HSL Studio (app POI riêng cho Windows).
type SoftwareType = "app" | "tool" | "poi";

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

const THEME: Record<SoftwareType, ThemeConfig> = {
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
  poi: {
    glow: "bg-emerald-500/5",
    backHover: "hover:text-emerald-400",
    accentLine: "from-emerald-400 via-cyan-500 to-neon-blue",
    label: "text-emerald-400",
    icon: "text-emerald-400",
    bar: "bg-emerald-500",
    stepCircle: "bg-emerald-500/10 border-emerald-400/35 text-emerald-400",
  },
};

interface SoftwareDetailsPageProps {
  type: SoftwareType;
  onBack: () => void;
}

const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.happysmartlight.argb";

const APP_SCREENSHOTS: (ZoomGalleryItem & { desc: string })[] = [
  {
    url: "/img/app-mobile/Screenshot_2026-06-18-21-43-57-964_com.happysmartlight.argb.jpg",
    label: "Màn hình điều khiển chính",
    desc: "Bật/tắt, chỉnh độ sáng và đổi kịch bản nhanh.",
    alt: "Màn hình điều khiển chính của ứng dụng ARGB HSL",
  },
  {
    url: "/img/app-mobile/Screenshot_2026-06-18-21-44-06-086_com.happysmartlight.argb.jpg",
    label: "Danh sách hiệu ứng",
    desc: "Hơn 300 hiệu ứng kịch bản chạy mượt mà.",
    alt: "Danh sách hiệu ứng của ứng dụng ARGB HSL",
  },
  {
    url: "/img/app-mobile/Screenshot_2026-06-18-21-44-21-470_com.happysmartlight.argb.jpg",
    label: "Tùy biến dải màu",
    desc: "Phối màu sRGB đa sắc độ cực kỳ trực quan.",
    alt: "Màn hình tùy biến dải màu của ứng dụng ARGB HSL",
  },
  {
    url: "/img/app-mobile/Screenshot_2026-06-18-21-44-32-337_com.happysmartlight.argb.jpg",
    label: "Cài đặt & Ghép nối",
    desc: "Cấu hình WiFi/Bluetooth BLE nhanh chóng.",
    alt: "Màn hình cài đặt và ghép nối của ứng dụng ARGB HSL",
  },
];

const POI_SCREENSHOTS: (ZoomGalleryItem & { desc: string })[] = [
  {
    url: "/img/poi-hsl-studio/poi-hsl-studio-cong-cu-poi.webp",
    label: "Công cụ POI & bảng tất cả gậy",
    desc: "Kéo-thả ảnh, chỉnh tốc độ quay, xem trước vòng quay, theo dõi sóng / bộ nhớ / nhiệt độ từng gậy.",
    alt: "Giao diện Công cụ POI của POI HSL Studio với bảng trạng thái nhiều gậy POI",
  },
  {
    url: "/img/poi-hsl-studio/poi-hsl-studio-thu-vien-mau.webp",
    label: "Thư viện 306 ảnh mẫu",
    desc: "Xem sẵn hình khi gậy quay: rê chuột để xem quay, bấm 1 lần là dùng ngay.",
    alt: "Thư viện ảnh mẫu của POI HSL Studio: lưới ảnh hiển thị đúng hình khi gậy POI quay",
  },
  {
    url: "/img/poi-hsl-studio/poi-hsl-studio-gui-nhieu-anh.webp",
    label: "Gửi nhiều ảnh cho cả đội gậy",
    desc: "Chọn các gậy đích và chế độ ghi, gửi một lần cho cả đội.",
    alt: "Hộp thoại gửi nhiều ảnh lên nhiều gậy POI của POI HSL Studio",
  },
  {
    url: "/img/poi-hsl-studio/poi-hsl-studio-timecode.webp",
    label: "Timecode theo nhạc",
    desc: "Sắp xếp ảnh và hiệu ứng theo bài nhạc, cả đội POI chạy đồng bộ.",
    alt: "Tab Timecode của POI HSL Studio: nhạc và chuỗi hiệu ứng cho từng gậy POI",
  },
];

// Album ảnh giao diện theo mẫu /san-pham/hsl4x/: nhãn trên, 1 ảnh lớn, hàng thumbnail, lightbox.
interface GalleryConfig {
  items: (ZoomGalleryItem & { desc: string })[];
  tab: string;
  badge: string;
  title: string;
  frame: string;
  ping: string;
  ring: string;
  eye: string;
  selected: string;
  thumb: string;
  aspect: string;
}

const GALLERY: Partial<Record<SoftwareType, GalleryConfig>> = {
  app: {
    items: APP_SCREENSHOTS,
    tab: "Ảnh demo app",
    badge: "APP SCREEN VIEW",
    title: "Ứng dụng di động ARGB HSL",
    frame: "border-neon-pink/25 shadow-glow-pink/10",
    ping: "bg-neon-pink",
    ring: "focus-visible:ring-neon-pink/60",
    eye: "text-neon-pink-bright",
    selected: "border-neon-pink shadow-glow-pink/30 scale-105",
    thumb: "w-12 h-12 sm:w-14 sm:h-14",
    aspect: "aspect-[1.65/1]",
  },
  poi: {
    items: POI_SCREENSHOTS,
    tab: "Ảnh giao diện app",
    badge: "DESKTOP SCREEN VIEW",
    title: "POI HSL Studio",
    frame: "border-emerald-400/25",
    ping: "bg-emerald-400",
    ring: "focus-visible:ring-emerald-400/60",
    eye: "text-emerald-400",
    selected: "border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105",
    thumb: "w-20 h-12 sm:w-24 sm:h-14",
    aspect: "aspect-[1720/1010]",
  },
};

export default function SoftwareDetailsPage({ type, onBack }: SoftwareDetailsPageProps) {
  const isApp = type === "app";
  const isPoi = type === "poi";
  const t = THEME[type];
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState<number>(0);
  const [isScreenshotViewerOpen, setIsScreenshotViewerOpen] = useState<boolean>(false);
  const gallery = GALLERY[type];
  const screenshots = gallery?.items ?? [];
  const activeScreenshot = screenshots[activeScreenshotIndex] ?? screenshots[0];

  const startToolDownload = () => {
    const link = document.createElement("a");
    link.href = isPoi ? POI_STUDIO_URL : WINDOWS_TOOL_URL;
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
    { icon: Images, title: "Công cụ POI có thư viện 306 ảnh mẫu", desc: "Xem sẵn hình khi gậy quay, bấm 1 lần là dùng ngay; mỗi mẫu tự chọn kiểu hình phù hợp, có nhóm, tìm kiếm và mục Yêu thích." },
    { icon: Wrench, title: "Cấu hình phần cứng theo đúng dòng mạch", desc: "Tự nhận giới hạn port và số LED của từng dòng mạch. Đổi số LED hoặc port là phân đoạn tự về 1 đoạn phủ toàn bộ LED, giữ hiệu ứng và màu, không phải xoá bằng tay." },
    { icon: Download, title: "Auto-Flasher firmware qua cổng COM", desc: "Tự động nạp code chương trình mới nhất cho chip điều khiển, chống nạp lỗi và hỏng chip dán." },
    { icon: Sliders, title: "Pixel Mapper Layout 2D/3D", desc: "Số hóa sơ đồ nối dây bất kỳ, xuất ma trận tối ưu tuyến đường tín hiệu đi dây thực tế." },
    { icon: Wifi, title: "Stream Ethernet / Wi-Fi UDP 60Hz", desc: "Truyền trực tiếp luồng kịch bản xLights với nén dữ liệu độc quyền ARGB HSL, không trễ." },
    { icon: Cpu, title: "Hỗ trợ ma trận quy mô lớn", desc: "Điều khiển hàng chục nghìn điểm ảnh, phù hợp sân khấu, mặt dựng tòa nhà, sự kiện lớn." },
    { icon: Settings, title: "Quản lý kịch bản & preset", desc: "Lưu, xuất và tái sử dụng các bố cục, preset hiệu ứng cho từng dự án thi công." },
    { icon: Clock, title: "Timecode trực quan", desc: "Mạch nguồn có badge ★ NGUỒN, kéo-thả hiện trước chỗ clip sẽ nằm và app sẽ làm gì, nút tô màu theo chức năng. Mạch firmware 2611091 dùng được tới 1024 preset." },
    { icon: Trash2, title: "Dọn bộ nhớ mạch gọn gàng", desc: "Xoá preset là xoá luôn ảnh BMP/GIF của nó (ảnh preset khác còn dùng được giữ lại). Nút Xóa bộ nhớ giải phóng bộ nhớ mạch mà vẫn giữ WiFi và cấu hình." },
  ];

  const poiFeatures: Feature[] = [
    { icon: Images, title: "Thư viện 306 ảnh mẫu", desc: "Xem sẵn hình khi gậy quay thay vì ảnh gốc khó đoán: rê chuột để xem quay, bấm 1 lần là dùng ngay. Mỗi mẫu tự chọn kiểu hình phù hợp; có nhóm, tìm kiếm không cần gõ dấu và mục Yêu thích." },
    { icon: ImageUp, title: "Nạp ảnh POI kéo-thả", desc: "Kéo-thả ảnh, xem trước vòng quay như khi múa thật; tự kiểm tra dung lượng (tới 512 KB mỗi ảnh) và gợi ý số pixel phù hợp trước khi gửi." },
    { icon: Gauge, title: "Tốc độ quay & kiểu hình", desc: "Thanh trượt RPM: đang chạy preset thì mạch đổi ngay, bấm Lưu mới ghi vào preset. Kiểu Đúng hình hiện logo đúng dáng, chiếm cả vòng tròn; kiểu Uốn theo vòng chọn được số ảnh mỗi vòng; có Đảo chiều khi quay ngược lại." },
    { icon: Users, title: "Gửi một lần cho cả đội gậy", desc: "Chọn nhiều gậy, gửi nhiều ảnh cùng lúc; tên ảnh tiếng Việt tự bỏ dấu, không ghi đè ảnh của preset khác." },
    { icon: Music, title: "Timecode theo nhạc", desc: "Lập trình kịch bản ánh sáng theo bài nhạc trên timeline, cả đội POI chạy đồng bộ khi biểu diễn. Gậy nguồn có badge ★ NGUỒN, kéo-thả báo trước app sẽ làm gì; gậy firmware 2611091 dùng được tới 1024 preset." },
    { icon: Trash2, title: "Xoá preset kèm ảnh", desc: "Một nút xoá preset cùng ảnh BMP của nó và dọn ảnh thừa trên gậy; ảnh mà preset khác còn dùng được giữ lại." },
    { icon: Thermometer, title: "Theo dõi từng gậy", desc: "Bảng tất cả gậy: sóng Wi-Fi, bộ nhớ, nhiệt độ chip, mode quay POI; cảnh báo gậy cần chú ý và nút Nháy để nhận diện từng cây." },
    { icon: BatteryCharging, title: "Độ sáng an toàn cho pin", desc: "Thanh độ sáng giới hạn ở mức an toàn cho pin POI (hiển thị 0-100%), tránh sụt áp giữa buổi diễn." },
  ];

  // ---- Usage steps ----
  const appSteps: Step[] = [
    { title: "Cài đặt ứng dụng", desc: "Tải ARGB HSL trực tiếp từ Google Play (CH Play) — cài đặt chính chủ, tự động cập nhật." },
    { title: "Cấp nguồn & kết nối WiFi", desc: "Cắm nguồn bộ điều khiển, đảm bảo điện thoại và mạch cùng một mạng WiFi nhà bạn." },
    { title: "Quét & ghép nối thiết bị", desc: "Mở app, nhấn 'Quét thiết bị' hoặc quét QR trên mạch để app tự nhận bộ điều khiển." },
    { title: "Chọn hiệu ứng & tuỳ chỉnh", desc: "Lựa chọn màu, hiệu ứng, độ sáng; bật chế độ theo nhạc nếu muốn đèn nhảy theo âm thanh." },
    { title: "Lưu preset & hẹn giờ", desc: "Lưu lại cấu hình yêu thích và đặt lịch bật/tắt tự động cho không gian của bạn." },
  ];

  const toolSteps: Step[] = [
    { title: "Tải & cài đặt phần mềm", desc: `Tải bộ cài ${WINDOWS_TOOL_FILE}, chạy file và làm theo trình hướng dẫn cài đặt.` },
    { title: "Kết nối mạch qua cổng COM", desc: "Cắm bộ điều khiển vào máy tính bằng cáp USB, chọn đúng cổng COM trong phần mềm." },
    { title: "Nạp firmware (nếu cần)", desc: "Dùng Auto-Flasher để nạp/cập nhật firmware mới nhất cho chip điều khiển." },
    { title: "Thiết kế layout Pixel Mapper", desc: "Vẽ sơ đồ ma trận LED 2D/3D theo bố cục thi công thực tế của bạn." },
    { title: "Stream kịch bản & xuất bản", desc: "Kết nối nguồn kịch bản (xLights) qua Ethernet/Wi-Fi UDP và phát trực tiếp ra dải đèn." },
  ];

  const poiSteps: Step[] = [
    { title: "Tải & cài đặt", desc: `Tải bộ cài ${POI_STUDIO_FILE}, chạy file và làm theo trình hướng dẫn. App cài song song, không ảnh hưởng ARGB HSL Windows Tool.` },
    { title: "Bật gậy POI & quét mạng", desc: "Bật gậy POI, để máy tính và gậy cùng mạng Wi-Fi; app tự tìm gậy (hoặc bấm Quét mạng). Thanh thiết bị hiện 'Quay POI: Có' là gậy đã sẵn sàng. Mạch 2X Pro firmware cũ sẽ có cảnh báo kèm nút Nạp firmware ngay trong app." },
    { title: "Chọn ảnh & thông số", desc: "Kéo-thả ảnh vào app hoặc chọn từ Thư viện mẫu, chỉnh số pixel LED, độ sáng, kiểu hình và tốc độ quay (RPM); thanh dung lượng báo ngay ảnh có vừa với gậy không." },
    { title: "Gửi ảnh lên gậy", desc: "Bấm 'Gửi ảnh này' để ghi vào ID trống kế tiếp, hoặc 'Gửi nhiều…' để nạp cho cả đội gậy cùng lúc." },
    { title: "Lập trình Timecode (tuỳ chọn)", desc: "Mở Tab Timecode, nạp bài nhạc và sắp xếp hiệu ứng theo nhịp để cả đội POI chạy đồng bộ." },
  ];

  const features = isApp ? appFeatures : isPoi ? poiFeatures : toolFeatures;
  const steps = isApp ? appSteps : isPoi ? poiSteps : toolSteps;
  const HeadingIcon = isApp ? Smartphone : isPoi ? WandSparkles : Laptop;

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
              <HeadingIcon className={`w-6 h-6 ${t.icon}`} />
            </div>
            <div>
              <span className={`font-mono text-[9px] uppercase tracking-widest ${t.label} font-bold`}>
                {isApp ? "MOBILE APPLICATION (ANDROID)" : isPoi ? "POI DESKTOP APP (WINDOWS x64)" : "DESKTOP SETUP TOOL (WINDOWS x64)"}
              </span>
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight mt-1">
                {isApp ? "ỨNG DỤNG DI ĐỘNG ARGB HSL" : isPoi ? "POI HSL STUDIO — APP CHUYÊN DỤNG GẬY POI" : "CÔNG CỤ MÁY TÍNH ARGB HSL CONTROL TOOL"}
              </h1>
              <p className="font-mono text-xs text-slate-400 mt-2">
                {isApp
                  ? "Điều khiển dải LED ARGB từ điện thoại — mọi lúc, mọi nơi."
                  : isPoi
                    ? `Nạp ảnh & lập trình Timecode cho gậy POI ARGB HSL — Phiên bản v${POI_STUDIO_VERSION}`
                    : `Phần mềm cấu hình & điều khiển ma trận LED chuyên nghiệp — Phiên bản v${WINDOWS_TOOL_VERSION}`}
              </p>
            </div>
          </div>

          {/* Intro box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/10 flex items-start gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              {isApp
                ? "ARGB HSL là ứng dụng điều khiển LED thông minh theo triết lý 'Offline-First': nhanh, mượt, bảo mật tuyệt đối. Phù hợp cho trang trí nhà cửa, phòng gaming, quán cà phê và các không gian sáng tạo."
                : isPoi
                  ? "POI HSL Studio là app máy tính miễn phí, gọn nhẹ, dành riêng cho gậy POI: chỉ gồm Công cụ POI, Timecode và Cập nhật phần mềm — giao diện tập trung, thao tác nhanh cho đội biểu diễn. Cài song song với ARGB HSL Windows Tool và dùng chung bản quyền: máy đã kích hoạt Windows Tool thì mở là dùng. App dành cho mạch ARGB HSL Controller 2X Pro, firmware build 2611050 trở lên."
                  : "ARGB HSL Control Tool là bộ phần mềm máy tính chuyên nghiệp dành cho kỹ sư ánh sáng và nhà thầu biểu diễn nghệ thuật: thiết kế layout, nạp firmware và stream kịch bản ánh sáng quy mô lớn."}
            </p>
          </div>

          {/* Illustration image for PC tool */}
          {type === "tool" && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-white/5 bg-slate-900/40 p-2 shadow-inner">
              <img 
                src="/img/controller-chip/tool_argb_hsl.png" 
                alt="Giao diện ARGB HSL Control Tool" 
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          )}

          {/* Album ảnh giao diện (app Android / POI HSL Studio) */}
          {gallery && activeScreenshot && (
            <div className="mb-10 space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex rounded-2xl bg-slate-950 border border-white/10 p-1 shadow-inner">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-xl bg-white/10 text-white font-display text-xs font-bold uppercase tracking-wider"
                  >
                    {gallery.tab}
                  </button>
                </div>
              </div>

              <div className={`w-full rounded-3xl bg-slate-950 border ${gallery.frame} p-4 sm:p-5 flex flex-col items-center justify-between min-h-[420px] relative overflow-hidden`}>
                <div className="absolute top-2 right-3 flex items-center space-x-1.5 opacity-40 font-mono text-[8px] z-10">
                  <span className={`w-1.5 h-1.5 rounded-full ${gallery.ping} animate-ping`} />
                  <span>{gallery.badge}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsScreenshotViewerOpen(true)}
                  aria-label={`Xem lớn ${activeScreenshot.label}`}
                  className={`group/zoom w-full relative ${gallery.aspect} overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 flex items-center justify-center cursor-zoom-in mt-2 focus-visible:outline-none focus-visible:ring-2 ${gallery.ring}`}
                >
                  <img
                    src={activeScreenshot.url}
                    alt={activeScreenshot.alt ?? activeScreenshot.label}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-contain group-hover/zoom:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                    <span className="px-3.5 py-1.5 bg-slate-900/90 border border-white/10 rounded-lg text-[10px] font-mono text-white flex items-center space-x-1.5 shadow-lg">
                      <Eye className={`w-3 h-3 ${gallery.eye}`} />
                      <span>CLICK ĐỂ PHÓNG TO</span>
                    </span>
                  </div>
                </button>

                <div className="flex flex-wrap justify-center gap-2 mt-4 max-h-[84px] overflow-y-auto py-1 w-full">
                  {screenshots.map((screen, idx) => {
                    const selected = idx === activeScreenshotIndex;
                    return (
                      <button
                        key={screen.url}
                        type="button"
                        onClick={() => setActiveScreenshotIndex(idx)}
                        aria-pressed={selected}
                        aria-label={`Chọn ${screen.label}`}
                        className={`${gallery.thumb} rounded-lg overflow-hidden border bg-slate-900 transition-all duration-200 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 ${gallery.ring} ${
                          selected ? gallery.selected : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <img
                          src={screen.url}
                          alt={screen.alt ?? screen.label}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="w-full pt-3 mt-3 border-t border-white/5 flex items-center justify-center text-center text-[10px] font-mono text-slate-500">
                  <span className="text-slate-300 mr-2 tabular-nums">
                    {activeScreenshotIndex + 1} / {screenshots.length}
                  </span>
                  <span>{activeScreenshot.label}</span>
                </div>
              </div>
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
              ) : isPoi ? (
                <>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Windows 10 / 11 (64-bit)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dung lượng cài đặt: {POI_STUDIO_SIZE}</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Chỉ hỗ trợ mạch ARGB HSL Controller 2X Pro, firmware build 2611050 trở lên (nâng cấp qua USB ngay trong app)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gậy POI cùng mạng Wi-Fi với máy tính</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Mạch đã bật mode POI — thiết lập 1 lần bằng ARGB HSL Windows Tool (Tab Cấu hình phần cứng)</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Kích hoạt bản quyền 1 lần: gửi mã máy cho HSL qua Zalo ngay trong app</p>
                  <p className="break-all pt-1 text-[10px] text-slate-500">SHA256: {POI_STUDIO_SHA256}</p>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Windows 10 / 11 (64-bit)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dung lượng cài đặt: {WINDOWS_TOOL_SIZE}</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cổng USB (nạp firmware) & cổng mạng LAN/Wi-Fi (stream)</p>
                  <p className="break-all pt-1 text-[10px] text-slate-500">SHA256: {WINDOWS_TOOL_SHA256}</p>
                </>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-6 border-t border-white/5">
            {isApp ? (
              <a
                href={ANDROID_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-neon-pink to-purple-500 text-center font-display text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center space-x-2 cursor-pointer shadow-glow-pink hover:scale-102 transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                <span>TẢI ỨNG DỤNG TRÊN GOOGLE PLAY (CÓ PHÍ)</span>
              </a>
            ) : isPoi ? (
              <button
                onClick={startToolDownload}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-center font-display text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-102 transition-all"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>TẢI POI HSL STUDIO ({POI_STUDIO_SIZE})</span>
              </button>
            ) : (
              <button
                onClick={startToolDownload}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-neon-blue text-center font-display text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 cursor-pointer shadow-glow-blue hover:scale-102 transition-all"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>TẢI ARGB HSL WINDOWS TOOL ({WINDOWS_TOOL_SIZE})</span>
              </button>
            )}

            <p className={`mt-3 text-center text-[11px] font-mono uppercase tracking-wider ${isApp ? "text-amber-400" : "text-emerald-400"}`}>
              {isApp
                ? "Ứng dụng di động: phần mềm trả phí trên Google Play"
                : isPoi
                  ? "POI HSL Studio: miễn phí 100%"
                  : "Công cụ máy tính Windows: miễn phí 100%"}
            </p>
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

      {gallery && (
        <ImageZoomLightbox
          open={isScreenshotViewerOpen}
          items={gallery.items}
          currentIndex={activeScreenshotIndex}
          title={gallery.title}
          onClose={() => setIsScreenshotViewerOpen(false)}
          onIndexChange={setActiveScreenshotIndex}
        />
      )}
    </div>
  );
}

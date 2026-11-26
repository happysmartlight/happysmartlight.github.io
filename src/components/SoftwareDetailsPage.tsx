import { useState } from "react";
import { Link } from "react-router-dom";
import { Images, Wrench, ArrowLeft, Smartphone, Laptop, Download, CheckCircle2, Wifi, Sliders, Music, Camera, ShieldCheck, Mail, Phone, PlayCircle, Sparkles, Eye, WandSparkles, ImageUp, Users, Thermometer, Gauge, BatteryCharging, Trash2, SlidersHorizontal, Clapperboard, Tv, Timer, Layers, Rocket, Menu, Orbit, Grid3x3, LayoutGrid, Copy, PenTool, RefreshCw, BookOpen, ArrowDown, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import ImageZoomLightbox, { type ZoomGalleryItem } from "./ImageZoomLightbox";
import { WINDOWS_TOOL_URL, WINDOWS_TOOL_VERSION, WINDOWS_TOOL_FILE, WINDOWS_TOOL_SIZE, WINDOWS_TOOL_SHA256 } from "../windowsTool";
import { MACOS_TOOL } from "../macosTool";
import { POI_STUDIO_URL, POI_STUDIO_VERSION, POI_STUDIO_FILE, POI_STUDIO_SIZE, POI_STUDIO_SHA256, POI_STUDIO_MAC } from "../poiStudio";
import type { MacRelease } from "../macosRelease";

// Dòng yêu cầu hệ thống của bản macOS (chỉ hiện khi app đã có bản .dmg).
function MacRequirement({ mac }: { mac: MacRelease }) {
  return (
    <p className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> macOS {mac.minOs} trở lên, máy Mac {mac.chip} (file .dmg {mac.size})</p>
  );
}

// Bước "Tải & cài đặt": thêm hướng dẫn macOS khi app đã có bản .dmg.
function installDesc(winFile: string, mac: MacRelease | null, extra = ""): string {
  const win = `${mac ? "Windows: tải" : "Tải"} bộ cài ${winFile}, chạy file và làm theo trình hướng dẫn cài đặt.${extra}`;
  if (!mac) return win;
  return `${win} macOS: tải ${mac.file}, kéo app vào thư mục Applications; lần đầu mở vào Cài đặt hệ thống → Quyền riêng tư & Bảo mật → bấm "Vẫn mở", và cho phép quyền Mạng cục bộ để app tìm được mạch.`;
}

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

// Ảnh giao diện Tool ARGB HSL v4: chụp từ app thật (mạch mẫu, tên chung), 1440×900 / 1600×1000.
// `thumb` = bản nhỏ 360 px cho hàng thumbnail và thẻ tab (đỡ tải 11 ảnh lớn trên điện thoại).
const TOOL_IMG = "/img/argb-hsl-tool-pc";
const toolShot = (file: string, label: string, desc: string, alt: string) => ({
  url: `${TOOL_IMG}/${file}.webp`,
  thumb: `${TOOL_IMG}/thumbs/${file}.webp`,
  label,
  desc,
  alt,
});

const TOOL_SCREENSHOTS: (ZoomGalleryItem & { desc: string; thumb?: string })[] = [
  toolShot("tab-thiet-bi-argb", "Thiết bị ARGB", "Danh sách mạch và bảng điều khiển riêng.",
    "Tab Thiết bị ARGB của Tool ARGB HSL: danh sách mạch bên trái, bảng điều khiển màu, hiệu ứng, bảng màu, preset và phân đoạn bên phải"),
  toolShot("tab-cau-hinh-phan-cung", "Cấu hình phần cứng", "Cổng, GPIO, số LED, nguồn, bộ nhớ của mạch.",
    "Tab Cấu hình phần cứng của Tool ARGB HSL: firmware, LED vật lý, nguồn, bộ nhớ thiết bị và các cổng LED"),
  toolShot("tab-cau-hinh-phan-cung-cap-nhat-nhieu-mach", "Cấu hình phần cứng · Cập nhật firmware nhiều mạch", "Nạp OTA nhiều mạch cùng lúc.",
    "Hộp thoại Cập nhật firmware nhiều mạch của Tool ARGB HSL: bản firmware trên server, mạch cần cập nhật và mạch đã mới nhất"),
  toolShot("tab-cong-cu-poi", "Công cụ POI", "Xem trước hình khi gậy POI quay.",
    "Tab Công cụ POI của Tool ARGB HSL: ảnh nguồn, thông số POI, xem trước vòng quay và danh sách preset trên gậy"),
  toolShot("tab-matrix-led", "Matrix Led · Ghép 3 màn thành màn lớn", "Ảnh, GIF, video lên màn LED ma trận.",
    "Tab Matrix Led của Tool ARGB HSL: ghép ba màn LED thành một màn lớn 64×16, mỗi màn hiện trước phần hình nó nhận"),
  toolShot("tab-timecode-lap-trinh", "Timecode · Lập trình", "Show theo nhạc trên timeline từng mạch.",
    "Tab Timecode của Tool ARGB HSL ở chế độ Lập trình: thư viện hiệu ứng, bảng màu, preset và timeline theo nhạc cho nhiều mạch"),
  toolShot("tab-timecode-chay-show-30-mach", "Timecode · Chạy show, Live view 30 mạch", "Theo dõi cả đội hình trong lúc diễn.",
    "Tab Timecode của Tool ARGB HSL ở chế độ Chạy show: Live view Tổng quan 30 mạch phía trên, timeline khoá sửa phía dưới"),
  toolShot("tab-tao-so-do-led", "Tạo sơ đồ LED", "Kích thước, đi dây, gửi ledmap lên mạch.",
    "Tab Tạo sơ đồ LED của Tool ARGB HSL: lưới 16×16 đi dây zigzag và thẻ mạch báo Khớp với sơ đồ"),
  toolShot("tab-sao-chep-cau-hinh", "Sao chép cấu hình", "Chép cấu hình mẫu sang nhiều mạch.",
    "Tab Sao chép cấu hình của Tool ARGB HSL: cấu hình mẫu, chọn phần sẽ chép và danh sách mạch nhận kèm tên mới"),
  toolShot("tab-ve-so-do-tu-do", "Vẽ sơ đồ tự do", "Vẽ LED theo hình bất kỳ, chia nhóm, đi dây.",
    "Tab Vẽ sơ đồ tự do của Tool ARGB HSL: sơ đồ LED trang phục robot chia theo nhóm bộ phận"),
  toolShot("tab-update-log", "Update & Log", "Phiên bản, Có gì mới, nhật ký hoạt động.",
    "Tab Update & Log của Tool ARGB HSL: thẻ phiên bản, mục Có gì mới và nhật ký hoạt động"),
];

// 9 tab của Tool, đúng thứ tự trên app. `shot` = vị trí ảnh trong TOOL_SCREENSHOTS.
interface ToolTab {
  icon: LucideIcon;
  name: string;
  desc: string;
  shot: number;
  links?: { to: string; label: string }[];
}

const TOOL_TABS: ToolTab[] = [
  {
    icon: SlidersHorizontal,
    name: "Thiết bị ARGB",
    desc: "Danh sách mọi mạch trong mạng, mỗi thẻ có công tắc nguồn và dòng cho biết mạch đang chạy gì. Bảng điều khiển bên phải chỉnh độ sáng, màu, hiệu ứng (có hình, tên tiếng Việt), bảng màu, preset và phân đoạn; tick nhiều mạch để đổi cùng lúc, lưu trạng thái đang chạy thành preset.",
    shot: 0,
    links: [{ to: "/post-news/giao-dien-supernova-argb-hsl/", label: "Trang web SuperNova của mạch" }],
  },
  {
    icon: Wrench,
    name: "Cấu hình phần cứng",
    desc: "Đặt số cổng, GPIO, số LED, loại LED, nguồn và nút bấm theo đúng giới hạn của từng dòng mạch, đổi tên mạch mà không phải khởi động lại. Cập nhật firmware OTA cho nhiều mạch cùng lúc, mỗi mạch một thanh tiến độ; dọn bộ nhớ mà vẫn giữ WiFi và cấu hình.",
    shot: 1,
    links: [{ to: "/post-news/nap-firmware-cau-hinh-wifi-argb-hsl/", label: "Nạp firmware & cấu hình WiFi" }],
  },
  {
    icon: Orbit,
    name: "Công cụ POI",
    desc: "Kéo thả ảnh hoặc chọn trong thư viện 306 mẫu, xem trước đúng hình hiện ra khi gậy quay, chỉnh tốc độ (RPM), kiểu hình, số ảnh mỗi vòng rồi gửi cho một gậy hay cả đội. Dành cho mạch 2X Pro.",
    shot: 3,
    links: [
      { to: "/post-news/su-dung-poi-voi-argb-hsl/", label: "Hướng dẫn POI" },
      { to: "/post-news/thu-vien-mau-poi/", label: "Thư viện 306 mẫu POI" },
    ],
  },
  {
    icon: Grid3x3,
    name: "Matrix Led",
    desc: "Đưa ảnh, GIF hoặc video lên màn LED ma trận theo 4 bước: gửi cho mọi màn, chọn vài màn, hoặc ghép nhiều màn thành một màn lớn. Mỗi màn hiện trước đúng phần hình nó sẽ nhận trước khi gửi.",
    shot: 4,
  },
  {
    icon: Clapperboard,
    name: "Timecode",
    desc: "Lập trình show theo nhạc: kéo hiệu ứng, bảng màu, preset xuống timeline của từng mạch và từng phân đoạn. Chế độ Chạy show khoá sửa timeline, đặt Live view và Camera ngay cạnh; Tổng quan theo dõi cả đội hình 30 mạch. Đồng hồ show giữ các mạch lệch nhau khoảng 1 ms và mỗi mạch lưu được tới 7 show (firmware 2611260 trở lên).",
    shot: 5,
    links: [{ to: "/post-news/tab-timecode-tool-argb-hsl/", label: "Hướng dẫn Tab Timecode" }],
  },
  {
    icon: LayoutGrid,
    name: "Tạo sơ đồ LED",
    desc: "Tạo sơ đồ ledmap.json cho ma trận theo 4 bước: kích thước, đi dây (góc dây vào, zigzag, ghép nhiều tấm), tên file, gửi lên mạch. Sơ đồ quá lớn so với mạch bị chặn trước khi gửi; chạy thử vạch quét để kiểm tra đi dây trên mạch thật.",
    shot: 7,
    links: [{ to: "/post-news/tab-tao-so-do-led-tool-argb-hsl/", label: "Hướng dẫn Tab Tạo sơ đồ LED" }],
  },
  {
    icon: Copy,
    name: "Sao chép cấu hình",
    desc: "Chép cấu hình của một mạch mẫu (hoặc file cfg.json) sang nhiều mạch: chọn từng phần sẽ chép, đặt tên hàng loạt. WiFi mặc định không chép, IP tĩnh không bao giờ chép, cấu hình cũ của từng mạch được sao lưu trước khi ghi.",
    shot: 8,
    links: [{ to: "/post-news/tab-sao-chep-cau-hinh-tool-argb-hsl/", label: "Hướng dẫn Tab Sao chép cấu hình" }],
  },
  {
    icon: PenTool,
    name: "Vẽ sơ đồ tự do",
    desc: "Vẽ LED theo hình bất kỳ (trang phục, logo, chữ) bằng bút, đường, hình, chữ, vẽ đối xứng; chia cổng, nhóm và đi dây. Gửi thẳng lên mạch, soi từng bóng trên mạch thật, hoặc xuất ledmap.json, xLights, Excel, CSV; nhập được file OneLED.",
    shot: 9,
    links: [
      { to: "/post-news/tab-ve-so-do-tu-do-tool-argb-hsl/", label: "Hướng dẫn Tab Vẽ sơ đồ tự do" },
      { to: "/post-news/luu-y-khi-su-dung-xlights-voi-argb-hsl/", label: "Lưu ý khi dùng xLights" },
    ],
  },
  {
    icon: RefreshCw,
    name: "Update & Log",
    desc: "Xem bản đang dùng, kiểm tra và cài bản mới ngay trong app (Windows), đọc Có gì mới theo từng mục. Nhật ký hoạt động lọc lỗi / cảnh báo, tìm theo IP hoặc tên mạch, sao chép báo cáo gửi kỹ thuật HSL.",
    shot: 10,
  },
];

// Album ảnh giao diện theo mẫu /san-pham/hsl4x/: nhãn trên, 1 ảnh lớn, hàng thumbnail, lightbox.
interface GalleryConfig {
  items: (ZoomGalleryItem & { desc: string; thumb?: string })[];
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
  /** Hàng thumbnail riêng (nhiều ảnh): điện thoại cuộn ngang, màn rộng xuống dòng. */
  thumbRow?: string;
  /** Chiều cao tối thiểu của khung album (mặc định min-h-[420px]). */
  minH?: string;
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
  tool: {
    items: TOOL_SCREENSHOTS,
    tab: "Giao diện từng tab",
    badge: "DESKTOP SCREEN VIEW",
    title: "Tool ARGB HSL",
    frame: "border-neon-blue/25",
    ping: "bg-neon-blue",
    ring: "focus-visible:ring-neon-blue/60",
    eye: "text-neon-blue-bright",
    selected: "border-neon-blue-bright shadow-lg shadow-cyan-500/20 scale-105",
    thumb: "w-20 h-[50px] sm:w-24 sm:h-[60px]",
    aspect: "aspect-[16/10]",
    thumbRow: "w-full mt-4 overflow-x-auto sm:overflow-visible",
    minH: "min-h-0",
  },
};

export default function SoftwareDetailsPage({ type, onBack }: SoftwareDetailsPageProps) {
  const isApp = type === "app";
  const isPoi = type === "poi";
  // Bản macOS của trang đang xem (Android không có; chưa đăng .dmg thì null → ẩn).
  const mac: MacRelease | null = isApp ? null : isPoi ? POI_STUDIO_MAC : MACOS_TOOL;
  const t = THEME[type];
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState<number>(0);
  const [isScreenshotViewerOpen, setIsScreenshotViewerOpen] = useState<boolean>(false);
  const gallery = GALLERY[type];
  const screenshots = gallery?.items ?? [];
  const activeScreenshot = screenshots[activeScreenshotIndex] ?? screenshots[0];

  const startToolDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
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

  // Điểm mới của giao diện 4.0 (nguồn: changelog app). Chi tiết từng tab ở mục "9 tab" bên dưới.
  const toolFeatures: Feature[] = [
    { icon: SlidersHorizontal, title: "Bảng điều khiển riêng, nhẹ hơn hẳn", desc: `Tab Thiết bị ARGB không còn nhúng trang web của mạch: chọn mạch là thấy màu, hiệu ứng, bảng màu, preset, phân đoạn và bấm là mạch đổi ngay. App mở nhanh hơn, bộ cài Windows chỉ còn ${WINDOWS_TOOL_SIZE}.` },
    { icon: Clapperboard, title: "Timecode 2 chế độ: Lập trình & Chạy show", desc: "Soạn show theo nhạc bằng thư viện hiệu ứng, bảng màu, preset; lúc diễn chuyển sang Chạy show: timeline khoá sửa, Live view và Camera nằm ngay cạnh để vừa diễn vừa nhìn LED thật." },
    { icon: Tv, title: "Live view cho buổi diễn 30 mạch", desc: "Tổng quan hiện mọi mạch thành ô nhỏ kèm clip đang chạy; mạch mất kết nối hoặc lệch nhịp xếp lên đầu, bấm một ô để xem trực tiếp. Màu LED cập nhật mỗi giây nên gần như không tốn WiFi của buổi diễn." },
    { icon: Timer, title: "Đồng hồ show: các mạch lệch khoảng 1 ms", desc: "Bấm Phát là mọi mạch cùng hiện khung hình đầu và chạy theo cùng một đồng hồ (trước đây lệch tới 31 ms khi WiFi chậm). Mạch khởi động lại giữa show tự vào lại đúng vị trí. Cần firmware 2611260 trở lên." },
    { icon: Layers, title: "Nhiều show trong một mạch", desc: "Mỗi mạch lưu tới 7 show; tạo preset \"Show kế tiếp\" để gán cho nút bấm, mỗi lần bấm mạch chuyển sang show kế và phát. Phát thử timeline đang soạn không ghi đè show đã lưu." },
    { icon: Rocket, title: "Cập nhật firmware nhiều mạch cùng lúc", desc: "Kiểm tra mọi mạch trong mạng, chọn sẵn mạch có bản mới, nạp OTA song song, mỗi mạch một thanh tiến độ. App chỉ báo xong khi mạch đã khởi động lại với đúng bản mới." },
    { icon: Menu, title: "Thanh menu đổi theo tab", desc: "Bên trái là menu của tab đang mở; bên phải luôn có số mạch online (bấm để mở Tab Thiết bị), Công cụ (Quét mạng, Nạp firmware / WiFi qua USB) và Trợ giúp." },
    { icon: Laptop, title: mac ? "Vừa laptop 1366×768, có bản macOS" : "Vừa màn laptop 1366×768", desc: mac ? `Cửa sổ thu gọn vừa màn 1366×768, hàng nút tự rút gọn khi hẹp. Chạy trên Windows 10/11 64-bit và macOS ${mac.minOs} trở lên cho máy Mac ${mac.chip}.` : "Cửa sổ thu gọn vừa màn 1366×768, hàng nút tự rút gọn khi hẹp. Chạy trên Windows 10/11 64-bit." },
  ];

  const poiFeatures: Feature[] = [
    { icon: Images, title: "Thư viện 306 ảnh mẫu", desc: "Xem sẵn hình khi gậy quay thay vì ảnh gốc khó đoán: rê chuột để xem quay, bấm 1 lần là dùng ngay. Mỗi mẫu tự chọn kiểu hình phù hợp; có nhóm, tìm kiếm không cần gõ dấu và mục Yêu thích." },
    { icon: ImageUp, title: "Nạp ảnh POI kéo-thả", desc: "Kéo-thả ảnh, xem trước vòng quay như khi múa thật; tự kiểm tra dung lượng (tới 512 KB mỗi ảnh) và gợi ý số pixel phù hợp trước khi gửi." },
    { icon: Gauge, title: "Tốc độ quay & kiểu hình", desc: "Thanh trượt RPM: đang chạy preset thì mạch đổi ngay, bấm Lưu mới ghi vào preset. Kiểu Đúng hình hiện logo đúng dáng, chiếm cả vòng tròn; kiểu Uốn theo vòng chọn được số ảnh mỗi vòng; có Đảo chiều khi quay ngược lại." },
    { icon: Users, title: "Gửi một lần cho cả đội gậy", desc: "Chọn nhiều gậy, gửi nhiều ảnh cùng lúc; tên ảnh tiếng Việt tự bỏ dấu, không ghi đè ảnh của preset khác." },
    { icon: Music, title: "Timecode theo nhạc", desc: "Lập trình kịch bản ánh sáng theo bài nhạc trên timeline, cả đội POI chạy đồng bộ khi biểu diễn. Cột Preset mẫu lọc theo loại (ảnh POI, Timecode, Playlist…) và tìm theo tên hoặc ID. Gậy nguồn có badge ★ NGUỒN, kéo-thả báo trước app sẽ làm gì; gậy firmware 2611091 dùng được tới 1024 preset." },
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
    { title: "Tải & cài đặt phần mềm", desc: installDesc(WINDOWS_TOOL_FILE, MACOS_TOOL) },
    { title: "Cùng mạng & quét mạch", desc: "Cấp nguồn mạch, để máy tính và mạch cùng mạng WiFi / LAN rồi bấm Quét mạng ở Tab Thiết bị ARGB. Mạch mới chưa vào WiFi: cắm cáp USB và dùng Công cụ → Nạp firmware / WiFi qua USB." },
    { title: "Cấu hình & cập nhật firmware", desc: "Ở Tab Cấu hình phần cứng, đặt số cổng, số LED, loại LED, nguồn, nút bấm; bấm Cập nhật nhiều mạch để đưa cả đội lên firmware mới nhất." },
    { title: "Chuẩn bị nội dung", desc: "Gửi ảnh cho gậy POI, ảnh / GIF / video cho màn Matrix; tạo sơ đồ LED cho ma trận hoặc vẽ sơ đồ tự do cho trang phục, logo rồi gửi lên mạch." },
    { title: "Lập trình & chạy show", desc: "Ở Tab Timecode, thêm nhạc, kéo hiệu ứng / preset xuống timeline của từng mạch, ghi show vào mạch, rồi chuyển sang Chạy show khi biểu diễn." },
  ];

  const poiSteps: Step[] = [
    { title: "Tải & cài đặt", desc: installDesc(POI_STUDIO_FILE, POI_STUDIO_MAC, " App cài song song, không ảnh hưởng ARGB HSL Windows Tool.") },
    { title: "Bật gậy POI & quét mạng", desc: "Bật gậy POI, để máy tính và gậy cùng mạng Wi-Fi; app tự tìm gậy (hoặc bấm Quét mạng). Thanh thiết bị hiện 'Quay POI: Có' là gậy đã sẵn sàng. Mạch 2X Pro firmware cũ sẽ có cảnh báo kèm nút Nạp firmware ngay trong app." },
    { title: "Chọn ảnh & thông số", desc: "Kéo-thả ảnh vào app hoặc chọn từ Thư viện mẫu, chỉnh số pixel LED, độ sáng, kiểu hình và tốc độ quay (RPM); thanh dung lượng báo ngay ảnh có vừa với gậy không." },
    { title: "Gửi ảnh lên gậy", desc: "Bấm 'Gửi ảnh này' để ghi vào ID trống kế tiếp, hoặc 'Gửi nhiều…' để nạp cho cả đội gậy cùng lúc." },
    { title: "Lập trình Timecode (tuỳ chọn)", desc: "Mở Tab Timecode, nạp bài nhạc và sắp xếp hiệu ứng theo nhịp để cả đội POI chạy đồng bộ." },
  ];

  const features = isApp ? appFeatures : isPoi ? poiFeatures : toolFeatures;
  const steps = isApp ? appSteps : isPoi ? poiSteps : toolSteps;
  const HeadingIcon = isApp ? Smartphone : isPoi ? WandSparkles : Laptop;

  // Album ảnh giao diện (mẫu /san-pham/hsl4x/): nhãn trên, 1 ảnh lớn, hàng thumbnail, lightbox.
  const albumBlock = gallery && activeScreenshot ? (
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

      <div className={`w-full rounded-3xl bg-slate-950 border ${gallery.frame} p-4 sm:p-5 flex flex-col items-center justify-between ${gallery.minH ?? "min-h-[420px]"} relative overflow-hidden`}>
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

        <div className={gallery.thumbRow ?? "flex flex-wrap justify-center gap-2 mt-4 max-h-[84px] overflow-y-auto py-1 w-full"}>
          <div className={gallery.thumbRow ? "flex gap-2 py-1 px-1 w-max mx-auto sm:w-full sm:flex-wrap sm:justify-center" : "contents"}>
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
                  src={screen.thumb ?? screen.url}
                  alt={screen.alt ?? screen.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
          </div>
        </div>

        <div className="w-full pt-3 mt-3 border-t border-white/5 flex items-center justify-center text-center text-[10px] font-mono text-slate-500">
          <span className="text-slate-300 mr-2 tabular-nums">
            {activeScreenshotIndex + 1} / {screenshots.length}
          </span>
          <span>{activeScreenshot.label}</span>
        </div>
      </div>
    </div>
  ) : null;

  // Bấm ảnh nhỏ ở thẻ tab: mở thẳng ảnh đó trong trình xem lớn.
  const openShot = (idx: number) => {
    setActiveScreenshotIndex(idx);
    setIsScreenshotViewerOpen(true);
  };

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
                {isApp ? "MOBILE APPLICATION (ANDROID)" : isPoi ? "POI DESKTOP APP (WINDOWS x64)" : mac ? "DESKTOP APP (WINDOWS x64 · MACOS)" : "DESKTOP APP (WINDOWS x64)"}
              </span>
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight mt-1">
                {isApp ? "ỨNG DỤNG DI ĐỘNG ARGB HSL" : isPoi ? "POI HSL STUDIO — APP CHUYÊN DỤNG GẬY POI" : "TOOL ARGB HSL — PHẦN MỀM MÁY TÍNH CHO MẠCH LED ARGB HSL"}
              </h1>
              <p className="font-mono text-xs text-slate-400 mt-2">
                {isApp
                  ? "Điều khiển dải LED ARGB từ điện thoại — mọi lúc, mọi nơi."
                  : isPoi
                    ? `Nạp ảnh & lập trình Timecode cho gậy POI ARGB HSL — Phiên bản v${POI_STUDIO_VERSION}`
                    : `Điều khiển, cấu hình và lập trình show ánh sáng cho cả đội mạch — Phiên bản v${WINDOWS_TOOL_VERSION}`}
              </p>
              {type === "tool" && (
                <a
                  href="#tai-ve"
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-blue/10 border border-neon-blue-bright/30 text-neon-blue-bright font-mono text-[11px] uppercase tracking-wider hover:bg-neon-blue/20 transition-colors"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Tải về {mac ? "Windows & macOS" : "cho Windows"} — miễn phí</span>
                </a>
              )}
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
                  : "Tool ARGB HSL là phần mềm máy tính miễn phí cho mạch ARGB HSL Controller (2X Pro, 4X, 16X): tìm và điều khiển mọi mạch trong mạng, cấu hình phần cứng, cập nhật firmware, nạp ảnh POI và Matrix, tạo sơ đồ LED, lập trình show ánh sáng theo nhạc cho cả đội hình. Từ bản 4.0, cả 9 tab đều có giao diện mới."}
            </p>
          </div>

          {/* Ảnh bìa Tool: ghép từ ảnh chụp giao diện thật (Timecode, Công cụ POI, Thiết bị ARGB) */}
          {type === "tool" && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-neon-blue/20 bg-slate-900/40 p-1.5 sm:p-2 shadow-inner">
              <img
                src={`${TOOL_IMG}/tool-argb-hsl-v4-cover.webp`}
                alt="Giao diện Tool ARGB HSL: tab Timecode lập trình show theo nhạc, Công cụ POI xem trước khi quay và bảng điều khiển Thiết bị ARGB"
                width={1600}
                height={900}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-auto rounded-xl"
              />
            </div>
          )}

          {/* Album ảnh giao diện (app Android / POI HSL Studio). Tool: đặt sau "Tính năng nổi bật". */}
          {type !== "tool" && albumBlock}

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

          {/* 9 tab của Tool: album ảnh từng tab + thẻ tóm tắt kèm bài hướng dẫn */}
          {type === "tool" && (
            <section className="mb-10" aria-labelledby="tool-tabs-heading">
              <h2 id="tool-tabs-heading" className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5 mb-2">
                <span className={`w-1.5 h-6 rounded-full ${t.bar}`} />
                9 tab trong Tool ARGB HSL
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                Ảnh chụp giao diện bản {WINDOWS_TOOL_VERSION}, xếp theo thứ tự tab trên app. Bấm ảnh để phóng to, dùng phím ← → để xem tab kế.
              </p>
              {albumBlock}
              <ol className="grid grid-cols-1 gap-3">
                {TOOL_TABS.map((tab, i) => {
                  const shot = TOOL_SCREENSHOTS[tab.shot];
                  return (
                    <li key={tab.name} className="p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => openShot(tab.shot)}
                        aria-label={`Xem lớn ảnh tab ${tab.name}`}
                        className="shrink-0 w-24 sm:w-40 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-slate-900 hover:border-neon-blue-bright/60 transition-colors cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60"
                      >
                        <img
                          src={shot.thumb ?? shot.url}
                          alt={shot.alt ?? shot.label}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </button>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                          <tab.icon className={`w-4 h-4 shrink-0 ${t.icon}`} />
                          <span className="font-mono text-[10px] text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                          <span>{tab.name}</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tab.desc}</p>
                        {tab.links && (
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                            {tab.links.map((l) => (
                              <Link
                                key={l.to}
                                to={l.to}
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-neon-blue-bright hover:underline"
                              >
                                <BookOpen className="w-3 h-3 shrink-0" />
                                <span>{l.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

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
                  {mac && <MacRequirement mac={mac} />}
                  <p className="break-all pt-1 text-[10px] text-slate-500">SHA256{mac ? " Windows" : ""}: {POI_STUDIO_SHA256}</p>
                  {mac && <p className="break-all text-[10px] text-slate-500">SHA256 macOS: {mac.sha256}</p>}
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Windows 10 / 11 (64-bit)</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dung lượng cài đặt: {WINDOWS_TOOL_SIZE}</p>
                  {mac && <MacRequirement mac={mac} />}
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Máy tính và mạch ARGB HSL cùng mạng WiFi / LAN; màn hình từ 1366×768</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Đồng hồ show và nhiều show trong một mạch: firmware 2611260 trở lên (cập nhật OTA ngay trong Tab Cấu hình phần cứng)</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Cáp USB chỉ cần khi nạp firmware / WiFi qua cổng USB của mạch</p>
                  <p className="break-all pt-1 text-[10px] text-slate-500">SHA256{mac ? " Windows" : ""}: {WINDOWS_TOOL_SHA256}</p>
                  {mac && <p className="break-all text-[10px] text-slate-500">SHA256 macOS: {mac.sha256}</p>}
                </>
              )}
            </div>
          </section>

          {/* CTA */}
          <section id="tai-ve" className="pt-6 border-t border-white/5 scroll-mt-24">
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
                onClick={() => startToolDownload(POI_STUDIO_URL)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-center font-display text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-102 transition-all"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>TẢI POI HSL STUDIO ({POI_STUDIO_SIZE})</span>
              </button>
            ) : (
              <button
                onClick={() => startToolDownload(WINDOWS_TOOL_URL)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-neon-blue text-center font-display text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 cursor-pointer shadow-glow-blue hover:scale-102 transition-all"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>TẢI TOOL ARGB HSL CHO WINDOWS ({WINDOWS_TOOL_SIZE})</span>
              </button>
            )}

            {/* Bản macOS (.dmg) của Tool / Studio: chưa có trong manifest macOS thì ẩn. */}
            {mac && (
              <div className="mt-3 space-y-3">
                <button
                  onClick={() => startToolDownload(mac.url)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-300 text-center font-display text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-white/10 hover:scale-102 transition-all"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>TẢI BẢN MACOS ({mac.size})</span>
                </button>
                <p className="text-center text-[11px] text-amber-300/80 leading-relaxed">
                  macOS {mac.minOs}+, máy Mac {mac.chip}. Bản macOS chưa ký với Apple: lần đầu mở app, vào Cài đặt hệ thống → Quyền riêng tư &amp; Bảo mật → bấm "Vẫn mở".
                </p>
              </div>
            )}

            <p className={`mt-3 text-center text-[11px] font-mono uppercase tracking-wider ${isApp ? "text-amber-400" : "text-emerald-400"}`}>
              {isApp
                ? "Ứng dụng di động: phần mềm trả phí trên Google Play"
                : `${isPoi ? "POI HSL Studio" : "Tool ARGB HSL"} ${mac ? "Windows & macOS" : "Windows"}: miễn phí 100%`}
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

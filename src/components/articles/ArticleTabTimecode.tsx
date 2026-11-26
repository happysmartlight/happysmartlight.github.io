import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, Camera, Clapperboard, Eye, Filter, FlaskConical, FolderKanban, Keyboard, Layers, Lightbulb,
  ListChecks, Menu, MonitorPlay, MousePointerClick, Music, Palette, Timer, Wrench,
} from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, Callout, ArtQuote } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";
import LiveViewDemo from "./LiveViewDemo";

const IMG = "/img/post-news/tab-timecode";
const ACCENT = "purple" as const;

// Kích thước thật của ảnh, để trang không bị nhảy khi ảnh tải xong. Thứ tự = thứ tự xuất hiện trong bài.
const PHOTO_LIST: { file: string; label: string; w: number; h: number }[] = [
  { file: "01-tong-quan.webp", label: "Tab Timecode ở chế độ Lập trình: thư viện hiệu ứng ở trên, timeline theo nhạc ở dưới, mỗi mạch một hàng, mạch 4X chia 5 phân đoạn", w: 1600, h: 1005 },
  { file: "10-thanh-menu.webp", label: "Thanh menu đổi theo tab: ở Tab Timecode có Dự án, Phát, Mạch. Bên phải là số mạch online, Công cụ và Trợ giúp", w: 1600, h: 440 },
  { file: "02-thu-vien.webp", label: "Thanh trên cùng, hàng Tất cả mạch và 4 cột thư viện: Hiệu ứng (mục Đã ghim, Vừa dùng), Bảng màu, Tuỳ chỉnh hiệu ứng, Preset mẫu có nút lọc theo loại", w: 1600, h: 403 },
  { file: "08-thanh-dieu-khien.webp", label: "Hai hàng nút điều khiển: phát, Live view, Camera, nhạc, mô phỏng, độ dài clip, chọn show, đọc và ghi vào mạch", w: 925, h: 156 },
  { file: "14-show-trong-mach.webp", label: "Hộp Show trong mạch: 7 chỗ lưu show, tên, thời lượng, số mạch đang giữ show đó, nút tạo preset Show kế tiếp cho nút bấm", w: 760, h: 430 },
  { file: "11-chay-show.webp", label: "Chế độ Chạy show: Live view và Camera thay chỗ các cột thư viện, timeline đang khoá sửa, nút soạn mờ đi", w: 1600, h: 1000 },
  { file: "12-live-tong-quan.webp", label: "Live view Tổng quan của buổi diễn 30 mạch: mạch mất kết nối, lệch nhịp, vừa khởi động lại xếp lên đầu", w: 1180, h: 330 },
  { file: "13-camera.webp", label: "Cửa sổ Camera nhận hình từ card capture HDMI, timecode và clip đang chạy của từng mạch vẽ lên hình", w: 1000, h: 640 },
  { file: "15-mach-trong-du-an.webp", label: "Hộp Mạch trong dự án: mạch bỏ tick không nhận lệnh nào từ Tab Timecode, clip của nó được giữ", w: 460, h: 380 },
  { file: "03-menu-mach.webp", label: "Chuột phải vào tên mạch: mạch nguồn, Thêm phân đoạn, Chia nhanh, Đọc phân đoạn đang có trên mạch, chép track, Kiểm tra & ghi lại clip, Ẩn, Loại khỏi dự án", w: 1000, h: 390 },
  { file: "04-hop-thoai-phan-doan.webp", label: "Hộp thoại Phân đoạn: đặt tên, khoảng LED, nút Lên lớp trên / Xuống lớp dưới, thanh LED xem trước", w: 725, h: 560 },
  { file: "04c-ma-tran.webp", label: "Mạch ma trận 2D: cột Kiểu chọn Vùng ma trận (kéo chuột trên lưới) hoặc Thứ tự LED (theo đường dây)", w: 740, h: 700 },
  { file: "09-hang-phan-doan.webp", label: "Hàng nhạc có vạch đánh dấu, hàng tên mạch và các hàng phân đoạn. Vệt sọc “toàn mạch” là lúc clip ở hàng tên mạch phủ lên đoạn đó", w: 1600, h: 435 },
  { file: "05-menu-phan-doan.webp", label: "Chuột phải vào tên phân đoạn: đổi tên, sửa khoảng LED, lên / xuống lớp, nháy thử, đưa clip lên toàn mạch, gộp, xoá", w: 1000, h: 390 },
  { file: "06-mo-phong.webp", label: "Track mô phỏng có nhãn MÔ PHỎNG, chia phân đoạn và lập trình như mạch thật", w: 1600, h: 355 },
  { file: "07-gan-mach-that.webp", label: "Gán mạch thật: chọn mạch cho từng track mô phỏng, cột Phân đoạn cho biết đoạn nào ghép vào đoạn nào", w: 820, h: 200 },
];

const PHOTOS: ZoomGalleryItem[] = PHOTO_LIST.map(({ file, label }) => ({ url: `${IMG}/${file}`, label, alt: label }));

const SHORTCUTS: { keys: string; desc: string }[] = [
  { keys: "Space", desc: "Tạm dừng / phát tiếp từ vạch phát" },
  { keys: "T", desc: "Đặt vạch đánh dấu tại vạch phát. Bấm T đúng chỗ vạch cũ để bỏ vạch" },
  { keys: "Delete", desc: "Xoá các clip đang chọn" },
  { keys: "Ctrl + C / Ctrl + V", desc: "Chép clip. Bấm vào tên mạch rồi Ctrl + C để chép cả track" },
  { keys: "Ctrl + Z / Ctrl + Y", desc: "Hoàn tác / làm lại, kể cả thao tác phân đoạn" },
  { keys: "Ctrl + N", desc: "Dự án mới, timeline trống. Tool hỏi lưu nếu còn thay đổi chưa lưu" },
  { keys: "Ctrl + S / Ctrl + O", desc: "Lưu file / mở file timeline trên máy tính" },
  { keys: "Ctrl + lăn chuột", desc: "Phóng to, thu nhỏ timeline" },
  { keys: "Ctrl + bấm tên hàng", desc: "Chọn nhiều hàng, thả 1 hiệu ứng là mỗi hàng có 1 clip" },
];

// Màu nút trong tab Timecode: cùng màu = cùng loại việc (lấy đúng màu của Tool).
const BUTTON_COLORS: { label: string; desc: string; bg: string; border: string; text: string; dashed?: boolean }[] = [
  { label: "💾 Lưu file", desc: "File trên máy, hoàn tác, công cụ chung, Dừng", bg: "#1b2330", border: "#34455d", text: "#dce4f2" },
  { label: "★ Mạch nguồn", desc: "Mạch cung cấp thư viện", bg: "#2a2414", border: "#b8902f", text: "#ffe7a8" },
  { label: "▶ Phát từ đầu", desc: "Phát", bg: "#245a44", border: "#4fc28a", text: "#f3fff8" },
  { label: "⏸ Tạm dừng", desc: "Tạm dừng", bg: "#4a3712", border: "#d99a2b", text: "#fff3d0" },
  { label: "🎵 Thêm nhạc", desc: "Nhạc", bg: "#142a33", border: "#2f8fb0", text: "#d6f6ff" },
  { label: "📺 Live view", desc: "Xem LED, xem camera", bg: "#2a1a3a", border: "#a46be0", text: "#f1dcff" },
  { label: "🧪 Thêm track", desc: "Mô phỏng (viền nét đứt)", bg: "#12282b", border: "#3fb8c4", text: "#d9f8fb", dashed: true },
  { label: "⬇ Đọc từ mạch", desc: "Đọc / ghi mạch. ⬆ Ghi vào mạch là nút đặc, nổi nhất", bg: "#172338", border: "#4a74b0", text: "#d7e7ff" },
  { label: "🗑 Xóa preset + ảnh…", desc: "Xoá, mất dữ liệu (viền đỏ)", bg: "#1f171b", border: "#a8505e", text: "#ffb4bd" },
];

const strong = "text-white";
const link = "text-purple-400 hover:underline";
const iconClass = "w-4 h-4 text-purple-400";

function Shot({ file, open, narrow = false }: { file: string; open: (url: string) => void; narrow?: boolean }) {
  const url = `${IMG}/${file}`;
  const photo = PHOTO_LIST.find((p) => p.file === file);
  const label = photo?.label ?? "Ảnh chụp tab Timecode";
  return (
    <figure className={`mt-2 ${narrow ? "max-w-xl" : ""}`}>
      <button
        type="button"
        onClick={() => open(url)}
        aria-label={`Xem lớn: ${label}`}
        className="group/zoom relative block w-full overflow-hidden rounded-lg border border-white/10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
      >
        <img src={url} alt={label} width={photo?.w} height={photo?.h} loading="lazy" className="w-full h-auto" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Eye className="w-5 h-5 text-white" />
        </div>
      </button>
      <figcaption className="text-[11px] text-slate-500 mt-1.5 leading-snug">{label}</figcaption>
    </figure>
  );
}

function Point({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
      <span><strong className={strong}>{title}:</strong> {children}</span>
    </li>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4 p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-white/15 transition-colors">
      <span className="font-mono text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2.5 py-1 rounded-lg shrink-0 h-fit">
        B.{n}
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-white">{title}</h4>
        <div className="text-xs text-slate-400 mt-1 space-y-1.5">{children}</div>
      </div>
    </div>
  );
}

function AreaHeading({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-white pt-1 flex items-center gap-2">
      <span className="shrink-0">{icon}</span>
      {children}
    </h3>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <InfoCard>
      <h3 className="font-semibold text-white text-xs mb-1.5">{title}</h3>
      <p className="text-xs text-slate-400">{children}</p>
    </InfoCard>
  );
}

export default function ArticleTabTimecode() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  const open = (url: string) => {
    const index = PHOTOS.findIndex((photo) => photo.url === url);
    if (index < 0) return;
    setActiveIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <ArticleLayout
      title="Tab Timecode Trong Tool ARGB HSL: Lập Trình Và Chạy Show Ánh Sáng Theo Nhạc Cho Nhiều Mạch"
      metaTitle="Tab Timecode Tool ARGB HSL | Lập Trình Và Chạy Show Ánh Sáng Theo Nhạc"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN SỬ DỤNG"
      description="Hướng dẫn tab Timecode của Tool ARGB HSL v4.0.0: dựng show theo nhạc, chia phân đoạn, chế độ Chạy show có Live view và Camera, Tổng quan cho buổi diễn nhiều mạch, đồng hồ show giữ các mạch lệch nhau khoảng 1 ms, lưu tới 7 show trong một mạch, quản lý mạch trong dự án."
      bannerImg={`${IMG}/banner.webp`}
      accent={ACCENT}
      path="/post-news/tab-timecode-tool-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-purple-400" />}>
        <p>
          <strong className={strong}>Timecode</strong> là tab trong Tool ARGB HSL dùng để dựng show ánh sáng theo một bài nhạc. Bài nhạc nằm trên một dòng thời gian (timeline), mỗi mạch ARGB HSL là một hàng. Bạn kéo hiệu ứng vào đúng đoạn nhạc, bấm phát để xem cả nhóm mạch chạy cùng nhau, rồi ghi show vào mạch. Mọi ảnh trong bài đều bấm vào để xem lớn.
        </p>
        <p className="mt-2"><strong className={strong}>Mới trong Tool v4.0.0 (26/11/2026):</strong></p>
        <ul className="mt-1 space-y-1 list-disc pl-5">
          <li>Hai chế độ <strong className={strong}>✏ Lập trình</strong> và <strong className={strong}>🎬 Chạy show</strong>. Lúc diễn, Live view và Camera thay chỗ thư viện, timeline được khoá để không sửa nhầm.</li>
          <li><strong className={strong}>Đồng hồ show</strong>: các mạch trong một show lệch nhau khoảng 1 ms (trước đây tới 31 ms). Mạch sụt nguồn, khởi động lại giữa show thì tự vào lại đúng chỗ.</li>
          <li>Lưu tới <strong className={strong}>7 show trong một mạch</strong>, kèm preset “Show kế tiếp” để đổi show bằng nút bấm trên mạch.</li>
          <li>Live view <strong className={strong}>Tổng quan</strong> cho buổi diễn nhiều mạch (ví dụ 30 mạch) và cửa sổ <strong className={strong}>🎥 Camera</strong> để xem đạo cụ thật.</li>
          <li>Nút <strong className={strong}>🆕 Mới</strong>, loại mạch khỏi dự án, thanh menu riêng cho từng tab, lọc cột Preset mẫu theo loại.</li>
        </ul>
      </Callout>

      {/* Chuẩn bị */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cần Chuẩn Bị Gì</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tool ARGB HSL">bản v4.0.0 trở lên trên máy tính. Trên Windows, mỗi lần mở Tool tự kiểm tra bản mới và hiện thông báo để cập nhật ngay. Chưa có Tool? <Link to="/argb-hsl-tool-pc/" className={link}>Tải Tool ARGB HSL cho máy tính</Link>.</Point>
          <Point title="Mạch ARGB HSL">2X Pro, 4X hoặc 16X, kết nối cùng mạng WiFi với máy tính. Mạch tìm thấy ở tab Thiết bị ARGB tự hiện thành một hàng trên timeline. Vừa thêm mạch mới thì bấm <strong className={strong}>🔄 DS mạch</strong>.</Point>
          <Point title="Firmware">bản dựng <strong className={strong}>2611260</strong> trở lên để dùng đủ các tính năng trong bài: đồng hồ show, nhiều show trong mạch, phân đoạn, preset nhiều lớp. Cập nhật ở tab <strong className={strong}>Cấu hình phần cứng</strong>, nút <strong className={strong}>Cập nhật nhiều mạch</strong> nạp cả đội hình cùng lúc. Các bước có trong bài <Link to="/post-news/nap-firmware-cau-hinh-wifi-argb-hsl/" className={link}>Nạp Firmware Mới Và Cấu Hình WiFi</Link>. Mạch firmware cũ vẫn phát show cả mạch như trước, chỉ thiếu các tính năng mới.</Point>
          <Point title="Bài nhạc">file âm thanh trên máy tính, ví dụ mp3 hoặc wav.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Chưa có mạch trong tay? Vẫn lập trình trước được bằng <strong className={strong}>track mô phỏng</strong>, xem phần cuối bài.
        </p>
      </section>

      {/* Màn hình */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Làm Quen Màn Hình Timecode</SectionHeading>
        <p className="text-xs text-slate-400">
          Nửa trên là <strong className={strong}>thư viện</strong> (chế độ Lập trình) hoặc <strong className={strong}>khung xem</strong> Live view và Camera (chế độ Chạy show). Nửa dưới là <strong className={strong}>timeline</strong>: hàng nhạc trên cùng, tiếp theo là từng mạch. Cả tab vừa màn laptop 1366px, hàng nút tự rút gọn khi thiếu chỗ.
        </p>
        <Shot file="01-tong-quan.webp" open={open} />

        <AreaHeading icon={<Menu className={iconClass} />}>Thanh menu đổi theo tab</AreaHeading>
        <p className="text-xs text-slate-400">
          Bên trái thanh menu là tên tab đang mở và các menu của riêng tab đó. Ở Tab Timecode có ba menu:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Dự án">Dự án mới, Mở / Lưu file dự án, Hoàn tác, Làm lại, Mạch trong dự án…, thêm / cắt / bỏ nhạc, track mô phỏng, Làm sạch timeline.</Point>
          <Point title="Phát">Chế độ Lập trình / Chạy show, Khoá sửa timeline, Phát từ đầu, Tạm dừng, Dừng, Lặp lại show, Phát bản đã ghi, Live view, Camera.</Point>
          <Point title="Mạch">Show trong mạch…, Đọc từ mạch, Ghi vào mạch, đọc lại danh sách mạch, Test RGBW, Chuẩn màu, Xóa preset + ảnh….</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Mỗi mục menu làm đúng việc của nút tương ứng trong tab, nút nào đang không dùng được thì mục đó cũng mờ đi. Bên phải luôn có số mạch đang online (bấm để mở tab Thiết bị ARGB), menu <strong className={strong}>Công cụ</strong> (Quét mạng, Nạp firmware qua USB) và <strong className={strong}>Trợ giúp</strong> (Kiểm tra bản cập nhật, Thông tin, Liên hệ).
        </p>
        <Shot file="10-thanh-menu.webp" open={open} />

        <AreaHeading icon={<ListChecks className={iconClass} />}>Thanh trên cùng và thư viện</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="✏ Lập trình, 🎬 Chạy show">đổi chế độ của tab, xem phần Chế độ Chạy show bên dưới. Tool nhớ chế độ cho lần mở sau.</Point>
          <Point title="🆕 Mới, 💾 Lưu file, 📂 Mở file, Hoàn tác, Làm lại">bắt đầu dự án mới, lưu và mở timeline trên máy tính, quay lại thao tác vừa làm.</Point>
          <Point title="Thư viện Có sẵn">hiệu ứng và bảng màu có sẵn trong Tool, dùng được khi chưa có mạch online.</Point>
          <Point title="Thư viện Từ mạch">tải hiệu ứng, bảng màu và preset từ <strong className={strong}>mạch nguồn</strong>. Mạch nguồn có nhãn ★ NGUỒN trên timeline. Chọn mạch khác ở ô <strong className={strong}>Mạch nguồn</strong>, hoặc chuột phải tên mạch → Dùng làm mạch nguồn.</Point>
          <Point title="Tất cả mạch">nút <strong className={strong}>Test RGBW</strong> chạy lần lượt đỏ, xanh lá, xanh dương, trắng trên mọi mạch online để kiểm tra dây LED và thứ tự màu. <strong className={strong}>Chuẩn màu</strong> đặt màu chính đỏ, màu nền đen trên mọi mạch để bắt đầu từ cùng một màu. Thanh trượt đặt độ sáng chung cho mọi mạch.</Point>
          <Point title="Cột Hiệu ứng">tên hiệu ứng hiện bằng tiếng Việt, rê chuột lên thẻ để xem cả tên gốc, ví dụ Cầu vồng (Rainbow). Tìm theo tên tiếng Việt (gõ không dấu cũng được), tên gốc hoặc ID, có chip lọc theo nhóm. Bấm một hiệu ứng là mạch chạy thử ngay, không cần lưu preset. Bấm ☆ trên thẻ để ghim: mục <strong className={strong}>Đã ghim</strong> và <strong className={strong}>Vừa dùng</strong> nằm trên đầu cột, Tool nhớ cho lần mở sau.</Point>
          <Point title="Thẻ đang chọn">có viền trắng và quầng sáng nhấp nháy nhẹ. Cùng một hiệu ứng nằm ở cả Đã ghim, Vừa dùng và Tất cả thì mọi thẻ đó cùng sáng, nhìn là biết đang chọn gì.</Point>
          <Point title="Cột Tuỳ chỉnh hiệu ứng">thanh trượt đúng theo hiệu ứng đang chọn, ví dụ Ngọn lửa có Làm nguội, Tần suất tia lửa. Chỉnh màu, đảo chiều ở đây. Clip kéo xuống giữ đúng thông số lúc thả.</Point>
          <Point title="Cột Bảng màu">mỗi thẻ hiện dải màu lớn, có ô tìm theo tên và mục Đã ghim. Chọn một bảng màu rồi kéo hiệu ứng, clip sẽ mang cả hai.</Point>
        </ul>
        <Shot file="02-thu-vien.webp" open={open} />

        <AreaHeading icon={<Filter className={iconClass} />}>Lọc cột Preset mẫu</AreaHeading>
        <p className="text-xs text-slate-400">
          Preset là trạng thái đã lưu trên mạch nguồn: ảnh POI, ảnh hay GIF ma trận, chữ chạy, hiệu ứng lưu từ trang điều khiển của mạch. Hàng nút lọc đầu cột chia preset theo nội dung, mỗi thẻ cũng có nhãn nhỏ cho biết loại:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="🖼 Ảnh POI">ảnh gửi từ tab Công cụ POI.</Point>
          <Point title="🎞 Matrix">ảnh, GIF gửi từ tab Matrix Led.</Point>
          <Point title="🎬 Visual">video chuyển thành GIF ở Upload Visual. Preset Visual tạo bằng Tool bản cũ vẫn nằm ở nhóm Matrix.</Point>
          <Point title="✨ Timecode">hiệu ứng mà Timecode đã ghi vào mạch.</Point>
          <Point title="📃 Playlist">show đã lưu trong mạch.</Point>
          <Point title="⚙ Khác">preset lưu từ trang điều khiển của mạch hoặc app điện thoại.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Số trên mỗi nút đếm theo ô tìm (tìm theo tên hoặc ID, gõ không dấu cũng được), Tool nhớ nhóm bạn đang chọn. Mạch firmware mới lưu được tới 1024 preset, cột hiện đủ cả, không cắt bớt. Hai ô đếm ở đầu cột: <strong className={strong}>🖼 8</strong> là số preset logo, ảnh; <strong className={strong}>🎬 5/949</strong> là số chỗ preset Timecode đã dùng trên tổng số chỗ của mạch nguồn.
        </p>

        <AreaHeading icon={<Clapperboard className={iconClass} />}>Hai hàng nút điều khiển</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Phát từ đầu, Tạm dừng, Dừng, Lặp">phát show cùng nhạc trên mọi mạch. Ô bên cạnh ghi trạng thái và vị trí đang phát.</Point>
          <Point title="📺 Live view, 🎥 Camera">mở cửa sổ xem LED đang sáng và cửa sổ xem đạo cụ qua camera. Trên màn hẹp, hai nút tự thu lại chỉ còn biểu tượng.</Point>
          <Point title="Nhạc">Thêm nhạc, Cắt & thêm (lấy một đoạn của bài), Bỏ nhạc, và ô chọn loa phát.</Point>
          <Point title="Mô phỏng">Thêm track, Gán mạch thật.</Point>
          <Point title="Clip mới dài, Chuyển cảnh">độ dài mặc định của clip khi thả, và thời gian chuyển mượt sang clip mới.</Point>
          <Point title="Làm sạch timeline">xoá hết clip và vạch đánh dấu trên timeline (chỉ trong Tool, Ctrl + Z để lấy lại).</Point>
          <Point title="Mạch ARGB"><strong className={strong}>🗂 Show 1</strong> chọn show sẽ làm việc, rồi Đọc từ mạch, Ghi vào mạch, Phát bản đã ghi. Xem bước 6 và phần Lưu nhiều show.</Point>
        </ul>
        <Shot file="08-thanh-dieu-khien.webp" open={open} narrow />
        <p className="text-xs text-slate-400">
          Nút <strong className={strong}>⚙ Tối ưu preset</strong> của bản cũ đã bỏ: mạch firmware mới phát show từ file riêng và có tới 1024 chỗ preset, không cần gộp preset nữa. Mạch còn đầy preset cũ thì dọn bằng <strong className={strong}>🗑 Xóa preset + ảnh…</strong>.
        </p>

        <AreaHeading icon={<Palette className={iconClass} />}>Màu nút cho biết loại việc</AreaHeading>
        <p className="text-xs text-slate-400">Cùng màu là cùng loại việc, nhãn nhóm cũng cùng màu với nút của nhóm. Nhìn màu là biết nút nào đụng tới mạch, nút nào chỉ làm trên máy:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {BUTTON_COLORS.map((c) => (
            <div key={c.label} className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/40 border border-white/5">
              <span
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-md shrink-0"
                style={{ background: c.bg, color: c.text, border: `1px ${c.dashed ? "dashed" : "solid"} ${c.border}` }}
              >
                {c.label}
              </span>
              <span className="text-xs text-slate-400">{c.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Các bước */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Dựng Một Show Trong 6 Bước</SectionHeading>
        <div className="space-y-3">
          <Step n={1} title="Thêm nhạc">
            <p>Bấm <strong className={strong}>🎵 Thêm nhạc</strong> và chọn bài. Dạng sóng của bài hiện trên hàng Audio, nhìn vào là thấy chỗ nhạc mạnh, chỗ nhạc nhẹ.</p>
            <p>Chỉ cần một đoạn của bài? Bấm <strong className={strong}>✂ Cắt & thêm</strong>, kéo hai đầu để chọn đoạn, bấm <strong className={strong}>Nghe thử đoạn chọn</strong> rồi <strong className={strong}>Cắt và import</strong>. Nút <strong className={strong}>Tự động phát hiện đoạn biểu diễn</strong> tự tìm đoạn có nhạc. Bài dài hơn 20 phút sẽ tự mở hộp thoại này.</p>
          </Step>
          <Step n={2} title="Đánh dấu nhịp bằng phím T">
            <p>Bấm <strong className={strong}>Space</strong> để nghe nhạc. Tới chỗ nhạc đổi, ví dụ vào điệp khúc hay một tiếng trống lớn, bấm <strong className={strong}>T</strong>. Một vạch xanh hiện trên thước thời gian.</p>
            <p>Thả hiệu ứng vào giữa hai vạch thì clip tự dài vừa khoảng đó, đèn đổi đúng nhịp mà không phải kéo tay. Vạch đánh dấu được lưu cùng show, nên khi đọc show từ mạch về vẫn còn.</p>
          </Step>
          <Step n={3} title="Chọn hiệu ứng">
            <p>Bấm vào một hiệu ứng ở cột Hiệu ứng để xem thử trên mạch. Ưng rồi thì chỉnh tốc độ và màu ở cột Tuỳ chỉnh hiệu ứng.</p>
            <p>Muốn xem thử ở chỗ khác, bấm vào <strong className={strong}>tên mạch</strong> ở cột tên để xem trên cả mạch đó, hoặc bấm <strong className={strong}>tên một phân đoạn</strong> để chỉ phần LED của đoạn đó chạy hiệu ứng. Hàng đang xem thử có dấu <strong className={strong}>👁</strong>. Xem thử không làm đổi phân đoạn hay trạng thái lưu của mạch: bấm Dừng hoặc Phát là mạch về như cũ.</p>
          </Step>
          <Step n={4} title="Kéo thả xuống timeline">
            <p>Kéo hiệu ứng, bảng màu hoặc preset vào hàng của mạch. Trong lúc kéo, bóng clip cho biết clip sẽ nằm ở đâu và Tool sẽ làm gì: dùng preset có sẵn, chép preset từ mạch nguồn sang, hay tạo preset tạm.</p>
            <p>Clip hiệu ứng màu xanh lá, clip preset màu cam. Kéo giữa clip để dời, kéo mép để đổi độ dài, bấm <strong className={strong}>Delete</strong> để xoá. Kéo preset có ảnh sang mạch khác thì Tool tự chép cả preset lẫn ảnh sang.</p>
          </Step>
          <Step n={5} title="Phát thử">
            <p>Bấm <strong className={strong}>▶ Phát từ đầu</strong>. Khoảng 0,3 giây sau, mọi mạch cùng hiện khung hình đầu rồi chạy theo một đồng hồ chung suốt bài (xem phần Đồng hồ show). Bấm vào thước thời gian để nhảy tới đoạn cần xem.</p>
            <p>Phát thử chỉ gửi timeline đang soạn, <strong className={strong}>không ghi đè show đã lưu</strong> trong mạch. <strong className={strong}>Space</strong> tạm dừng: cả đội hình đứng yên đúng hình ở vị trí đó để bạn soi kỹ. <strong className={strong}>⏹ Dừng</strong> đưa về 0 giây và tắt LED ngay. Tick <strong className={strong}>Lặp</strong> để show chạy lại từ đầu khi tới vạch END.</p>
          </Step>
          <Step n={6} title="Lưu file và ghi vào mạch">
            <p><strong className={strong}>💾 Lưu file</strong> (Ctrl + S) lưu toàn bộ timeline, nhạc và track mô phỏng ra một file trên máy tính, để mở lại hoặc gửi cho người khác. File này không ghi gì vào mạch.</p>
            <p>Chọn show ở nút <strong className={strong}>🗂 Show 1</strong> (mặc định là Show 1), rồi bấm <strong className={strong}>⬆ Ghi vào mạch</strong> để ghi show vào từng mạch đang online. Sau đó mạch giữ show trong bộ nhớ và chạy được mà không cần máy tính, qua nút bấm hoặc lịch hẹn giờ đã cài trên mạch. Bấm <strong className={strong}>📡 Phát bản đã ghi</strong> để kiểm tra đúng bản đang nằm trong mạch, các mạch cũng bắt đầu cùng lúc.</p>
            <p><strong className={strong}>⬇ Đọc từ mạch</strong> đọc show đang chọn về lại timeline, gồm cả phân đoạn và vạch đánh dấu. Tool hỏi trước khi thay timeline đang soạn.</p>
          </Step>
        </div>
      </section>

      {/* Đồng hồ show */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Nhiều Mạch Chạy Khớp Nhau Nhờ Đồng Hồ Show</SectionHeading>
        <p className="text-xs text-slate-400">
          Trước đây mỗi mạch tự tính giờ lúc lệnh Phát tới nơi, nên WiFi chậm là các mạch lệch nhau: đo trên hai mạch thật, lệch tới <strong className={strong}>31 ms</strong>. Với Tool v4.0.0 và firmware 2611260, Tool lên giờ cho từng mạch trước khi phát, mọi mạch bắt đầu cùng lúc và chạy theo một đồng hồ chung. Đo lại, các mạch lệch nhau còn khoảng <strong className={strong}>1 ms</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card title="Cùng hiện khung hình đầu">Bấm Phát hoặc Phát bản đã ghi, khoảng 0,3 giây sau mọi mạch cùng bắt đầu. Khoảng chờ ngắn này để lệnh kịp tới đủ cả đội hình, nhạc trên máy tính cũng bắt đầu đúng mốc đó.</Card>
          <Card title="Tạm dừng, Dừng cùng lúc">Lệnh Tạm dừng và Dừng tới cả đội hình cùng một lúc, không còn mạch dừng trước mạch dừng sau.</Card>
          <Card title="Giữ nhịp suốt bài">Trong lúc phát, Tool giữ các mạch theo cùng đồng hồ. Mạch nào lệch thì tự chỉnh, mạch nào không nhận được gói đồng bộ thì Tool gửi lại.</Card>
          <Card title="Mạch khởi động lại giữa show">Ví dụ pin yếu hay sụt nguồn làm mạch tự khởi động lại: mạch tự vào lại show đúng vị trí đang phát, không phải bấm Phát lại cả đội hình.</Card>
        </div>
        <p className="text-xs text-slate-400">
          Mạch firmware cũ vẫn phát chung show như trước, theo cách cũ. Muốn biết các mạch có đang đúng nhịp không, mở Live view ở chế độ <strong className={strong}>Tổng quan</strong>: mạch lệch nhịp hay vừa khởi động lại có ô màu vàng.
        </p>
      </section>

      {/* Nhiều show */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Lưu Nhiều Show Trong Một Mạch</SectionHeading>
        <p className="text-xs text-slate-400">
          Mỗi mạch lưu được tới <strong className={strong}>7 show</strong>, ví dụ Khai mạc, Vũ điệu robot, Kết màn. Show 1 là show mặc định, như trước giờ.
        </p>
        <div className="space-y-3">
          <Step n={1} title="Mở danh sách show">
            <p>Bấm <strong className={strong}>🗂 Show 1</strong> cạnh nút Đọc từ mạch (hoặc menu Mạch → Show trong mạch…). Hộp <strong className={strong}>Show trong mạch</strong> đọc các mạch online và liệt kê đủ 7 chỗ: tên show, thời lượng, show đó đang có trên mấy mạch.</p>
          </Step>
          <Step n={2} title="Chọn show để làm việc">
            <p>Chọn một dòng rồi bấm <strong className={strong}>✔ Chọn show này</strong>. Nút đổi thành Show 2, Show 3… Từ đó ⬇ Đọc từ mạch, ⬆ Ghi vào mạch và 📡 Phát bản đã ghi đều làm việc với show này. Tool nhớ show đang chọn.</p>
          </Step>
          <Step n={3} title="Phát, đổi tên, xoá">
            <p><strong className={strong}>📡 Phát</strong> chạy show đó trên mọi mạch đang lưu nó, bắt đầu cùng lúc. <strong className={strong}>✏ Đổi tên…</strong> đổi tên show trên các mạch, tên này cũng hiện khi bạn gán nút bấm. <strong className={strong}>🗑 Xoá khỏi mạch…</strong> xoá show khỏi các mạch đang lưu nó.</p>
          </Step>
          <Step n={4} title="Đổi show bằng nút bấm trên mạch">
            <p>Bấm <strong className={strong}>🔁 Tạo preset “Show kế tiếp” cho nút bấm</strong>: Tool ghi preset 247 “Show kế tiếp” lên các mạch. Sau đó vào tab <strong className={strong}>Cấu hình phần cứng</strong>, mục Nút bấm, chọn preset 247 cho thao tác bấm. Mỗi lần bấm, mạch chuyển sang show kế tiếp và phát từ đầu.</p>
          </Step>
        </div>
        <Shot file="14-show-trong-mach.webp" open={open} narrow />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Phát thử không đè show">bấm Phát để xem timeline đang soạn không còn ghi đè show đã lưu, nên show mà nút bấm sẽ chạy vẫn nguyên.</Point>
          <Point title="Không đè preset của bạn">nếu chỗ của Show 2 tới Show 7 trên mạch đang có một preset riêng của bạn, Tool báo lỗi và không ghi đè.</Point>
          <Point title="Tên show màu cam">các mạch đang giữ nội dung khác nhau ở cùng một show (tên hoặc thời lượng lệch). Ghi lại show đó lên mọi mạch để đồng nhất.</Point>
          <Point title="Ảnh của show được giữ">xoá preset logo hay ảnh ở bất kỳ tab nào cũng không xoá mất ảnh mà một show đã lưu đang dùng.</Point>
          <Point title="Firmware cũ">không đọc được tên show và không có “Show kế tiếp”. Cập nhật firmware 2611260 trở lên để dùng đủ phần này.</Point>
        </ul>
      </section>

      {/* Chạy show */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Chế Độ Chạy Show: Vừa Diễn Vừa Nhìn LED</SectionHeading>
        <p className="text-xs text-slate-400">
          Bấm <strong className={strong}>🎬 Chạy show</strong> ở đầu thanh trên cùng (hoặc menu Phát → Chế độ Chạy show). Bốn cột thư viện nhường chỗ cho <strong className={strong}>khung xem</strong>, timeline vẫn ở dưới: bạn vừa điều khiển show vừa nhìn LED và đạo cụ thật. Bấm <strong className={strong}>✏ Lập trình</strong> để quay lại soạn.
        </p>
        <Shot file="11-chay-show.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Khung xem">chọn <strong className={strong}>Live view + Camera</strong> đặt cạnh nhau, <strong className={strong}>Chỉ Live view</strong> hoặc <strong className={strong}>Chỉ Camera</strong>. Kéo vạch giữa hai khung để đổi tỉ lệ, kéo mép dưới để khung xem cao hơn.</Point>
          <Point title="Khoá sửa timeline">vào Chạy show là timeline được khoá: không kéo, xoá hay thêm clip nhầm lúc đang diễn. Các nút chỉ dùng lúc soạn vẫn ở chỗ cũ nhưng mờ đi. Cần sửa gấp thì bấm <strong className={strong}>🔒 Đang khoá sửa timeline</strong> ở góc phải khung xem để mở khoá, bấm lần nữa để khoá lại.</Point>
          <Point title="Vẫn dùng được khi khoá">tua trên thước thời gian, Space, Phát, Tạm dừng, Dừng, Phát bản đã ghi, chọn show, độ sáng, Lưu file.</Point>
          <Point title="↗ Tách cửa sổ">đưa Live view hoặc Camera ra cửa sổ riêng, ví dụ sang màn hình thứ hai (bấm đúp vào hình camera cũng được). Khung trong tab tạm trống và có nút <strong className={strong}>Gắn lại vào tab</strong>. Một camera chỉ mở được ở một chỗ.</Point>
          <Point title="Nhẹ cho mạch">khung xem chỉ nối tới mạch khi đang hiện: đổi sang Lập trình hay rời tab là Live view ngắt, camera tắt. Tool nhớ chế độ và bố cục khung xem cho lần mở sau.</Point>
        </ul>
      </section>

      {/* Live view */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Live View: Xem Kỹ Và Tổng Quan</SectionHeading>
        <p className="text-xs text-slate-400">
          Bấm <strong className={strong}>📺 Live view</strong> trên hàng nút phát để mở cửa sổ riêng (kéo sang màn hình thứ hai được), hoặc xem ngay trong khung của chế độ Chạy show. Có hai cách xem, chuyển bằng hai nút đầu thanh công cụ:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Xem kỹ">vẽ đúng LED đang sáng khoảng 25 khung mỗi giây, tối đa 4 mạch cùng lúc. Bấm chip tên mạch để thêm hoặc bỏ; chọn mạch thứ năm thì mạch chọn lâu nhất được bỏ ra.</Point>
          <Point title="Tổng quan">mọi mạch của buổi diễn thành ô nhỏ: chấm trạng thái, tên, dải màu LED cập nhật mỗi giây và clip đang chạy. Bấm một ô để Xem kỹ mạch đó. Từ 5 mạch trở lên, Live view mở sẵn Tổng quan; Tool nhớ cách xem bạn chọn.</Point>
        </ul>
        <LiveViewDemo />
        <p className="text-[11px] text-slate-500">Minh hoạ chạy thử ngay trên trang: đổi Tổng quan / Xem kỹ, bấm chip tên mạch, đổi bố cục, bật tắt Khung phân đoạn, bấm tên một mạch để phóng to. LED ở đây là giả lập; trong Tool là LED thật của mạch.</p>

        <AreaHeading icon={<MonitorPlay className={iconClass} />}>Tổng quan cho buổi diễn nhiều mạch</AreaHeading>
        <p className="text-xs text-slate-400">
          Xem trực tiếp mỗi mạch tốn đáng kể WiFi, mà WiFi đó cũng đang chở lệnh đồng bộ của show. Tổng quan chỉ lấy một khung LED mỗi giây cho mỗi mạch, nên buổi diễn 30 mạch vẫn vừa màn hình và gần như không chiếm WiFi của show.
        </p>
        <Shot file="12-live-tong-quan.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Chấm xanh">bình thường, dòng dưới là clip đang chạy.</Point>
          <Point title="Chấm vàng (cần chú ý)">lệch nhịp và đang tự chỉnh, vừa khởi động lại và đang vào lại show, không trả lời gói đồng bộ, đã vào lại show vài lần, hoặc có clip mà không nhận lượt Phát này.</Point>
          <Point title="Chấm đỏ">mất kết nối.</Point>
          <Point title="Chấm xám">tắt (khoảng trống): mạch không có clip ở thời điểm đó.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Mạch có vấn đề luôn xếp lên đầu. Tick <strong className={strong}>Chỉ mạch cần chú ý</strong> để lưới chỉ còn các mạch đó.
        </p>

        <AreaHeading icon={<Layers className={iconClass} />}>Xem kỹ: mạch nào hiện ra sao</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Mạch ma trận">hiện đúng lưới, ví dụ 16×16.</Point>
          <Point title="Mạch dải LED">mỗi cổng LED một hàng, theo cấu hình của mạch.</Point>
          <Point title="Mạch rất nhiều LED">mỗi khung hình mạch chỉ gửi khoảng 1024 LED, nên màn LED lớn hiện thô hơn (1/2 hoặc 1/4 số điểm) và dải dài hiện cách quãng. Dòng dưới mỗi ô ghi rõ điều này.</Point>
          <Point title="Khung phân đoạn, Cỡ điểm LED, Luôn trên cùng">vẽ viền và tên từng phân đoạn ngay trên LED (đoạn đang xem thử có viền xanh và dấu 👁), chỉnh cỡ chấm LED, ghim cửa sổ nằm trên các cửa sổ khác.</Point>
        </ul>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Firmware 2611260 trở lên: Tool và trang điều khiển của mạch xem LED trực tiếp cùng lúc được (tối đa 3 nơi). Firmware cũ: mỗi mạch chỉ gửi hình cho <strong className="text-amber-300">một</strong> nơi xem; nếu trang điều khiển đang bật Xem LED trực tiếp, ô của mạch báo lại và có nút <strong className="text-amber-300">Giành lại live</strong>. Màu trong cửa sổ là màu hiệu ứng, chưa tính độ sáng của mạch. Đóng cửa sổ là xong, Live view không ghi gì vào mạch.
          </p>
        </Callout>
      </section>

      {/* Camera */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cửa Sổ Camera: Xem Đạo Cụ Thật</SectionHeading>
        <p className="text-xs text-slate-400">
          Bấm <strong className={strong}>🎥 Camera</strong> cạnh nút Live view. Cửa sổ hiện hình từ camera kèm timecode và clip đang chạy của từng mạch, để bạn nhìn đạo cụ thật có đổi đúng nhịp nhạc không, kể cả khi đạo cụ ở xa hay sau sân khấu. Dùng được cho mọi đạo cụ LED: trang phục, màn LED, gậy, quạt…
        </p>
        <Shot file="13-camera.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Nguồn">mọi thứ máy tính coi là camera: webcam USB, card capture HDMI nối máy quay, điện thoại dùng làm webcam, OBS Virtual Camera… Camera IP: chọn <strong className={strong}>📡 Camera IP (RTSP / HTTP)</strong> ở ô Nguồn, nhập địa chỉ (xem trong hướng dẫn hoặc app của camera) rồi bấm <strong className={strong}>Kết nối</strong>.</Point>
          <Point title="Độ phân giải, Phơi sáng">chọn cỡ hình; khi camera hỗ trợ, kéo Phơi sáng xuống nếu LED bị cháy thành màu trắng trên hình.</Point>
          <Point title="⇋ Lật gương, ⟳ Xoay">cho camera đặt dọc hay lộn ngược.</Point>
          <Point title="Thông tin timeline">vẽ timecode, trạng thái phát và clip đang chạy của từng mạch (kèm tên phân đoạn) lên hình.</Point>
          <Point title="📸 Chụp ảnh">lưu khung hình hiện tại, kèm thông tin timeline nếu đang bật, thành ảnh PNG trong thư mục Ảnh → HSL Camera. Nút 📂 mở thư mục đó.</Point>
          <Point title="⛶ Toàn màn hình, 📌 Luôn trên cùng">bấm đúp vào hình cũng ra toàn màn hình, Esc để thoát.</Point>
        </ul>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Không đụng tới mạch">camera chỉ bật khi cửa sổ đang mở, đóng là tắt. Cửa sổ Camera không gửi gì tới mạch.</Point>
          <Point title="Nhớ camera đã chọn">rút camera ra thì ô Nguồn ghi “(chưa cắm)” chứ không tự chuyển sang camera khác; cắm lại là tự mở. Camera IP rớt mạng thì Tool tự nối lại mỗi 5 giây.</Point>
          <Point title="Không mở được camera">thường do app khác (Zoom, Teams, OBS…) đang giữ camera, đóng app đó rồi thử lại. Trên Windows, kiểm tra Cài đặt › Quyền riêng tư và bảo mật › Camera › bật “Cho phép ứng dụng desktop truy cập camera”. Trên macOS, cho phép Tool dùng camera ở mục Quyền riêng tư và bảo mật.</Point>
        </ul>
      </section>

      {/* Dự án */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Dự Án Mới Và Mạch Trong Dự Án</SectionHeading>
        <AreaHeading icon={<FolderKanban className={iconClass} />}>🆕 Mới (Ctrl + N)</AreaHeading>
        <p className="text-xs text-slate-400">
          Bắt đầu dự án mới với timeline trống: Tool xoá clip, vạch đánh dấu, nhạc, phân đoạn, track mô phỏng và lịch sử hoàn tác trên màn hình soạn. Còn thay đổi chưa lưu thì Tool hỏi lưu trước. Không gửi gì tới mạch, show đã ghi trong mạch vẫn nguyên. Thư viện, show đang chọn và danh sách mạch ngoài dự án được giữ. Đang phát thì bấm Dừng trước.
        </p>

        <AreaHeading icon={<MousePointerClick className={iconClass} />}>Loại mạch khỏi dự án</AreaHeading>
        <p className="text-xs text-slate-400">
          Dùng khi trong mạng có mạch đang làm việc khác, ví dụ đèn trang trí sảnh hay POI của một tiết mục khác, mà bạn không muốn show đụng tới. Chuột phải tên mạch → <strong className={strong}>🚫 Loại “tên mạch” khỏi dự án</strong>, hoặc menu Dự án → <strong className={strong}>Mạch trong dự án…</strong> rồi bỏ tick.
        </p>
        <Shot file="15-mach-trong-du-an.webp" open={open} narrow />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Không nhận lệnh nào từ Tab Timecode">Phát, Tạm dừng, Dừng, độ sáng, Test RGBW, Chuẩn màu, ghi hay đọc show. Mạch đó vẫn chạy việc của nó trong lúc bạn lập trình các mạch còn lại. Các tab khác vẫn dùng mạch đó bình thường.</Point>
          <Point title="Clip được giữ">track của mạch không hiện, clip giữ nguyên và không tính vào độ dài show. Tick lại là dùng tiếp.</Point>
          <Point title="Lưu theo file dự án">mở file là áp đúng danh sách lúc lưu; mạch đổi địa chỉ IP vẫn được nhận đúng.</Point>
          <Point title="Không đổi khi đang phát">đang phát hoặc tạm dừng thì không đổi được danh sách, vì mạch bị loại lúc đó sẽ không nhận được lệnh Dừng.</Point>
          <Point title="Ẩn khác với loại">Ẩn (chuột phải tên mạch → Ẩn) chỉ giấu track cho gọn màn hình, mạch vẫn phát và nhận lệnh như thường. Nút 👁 / 🚫 ở hàng trạng thái, ví dụ “🚫 1 mạch ngoài dự án”, cho biết có bao nhiêu mạch đang ẩn hay ngoài dự án; bấm để xem danh sách và đưa lại vào timeline.</Point>
        </ul>
      </section>

      {/* Phân đoạn */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Chia Phân Đoạn: Mỗi Phần Một Hiệu Ứng</SectionHeading>
        <p className="text-xs text-slate-400">
          Một mạch thường điều khiển cả bộ trang phục hay cả một cụm đèn. Khi chia phân đoạn, mỗi phần có hàng riêng ngay dưới tên mạch: Giáp đầu có thể chạy Ngọn lửa trong lúc Giáp tay chạy Đuổi màu, còn Giáp ngực hiện logo.
        </p>
        <p className="text-xs text-slate-400">
          Phân đoạn là <strong className={strong}>một khoảng LED bất kỳ</strong>, đặt tên tuỳ ý. Không cần trùng với cổng LED: Giáp tay có thể là LED 40 tới 119, nằm vắt qua hai cổng. Các đoạn được dùng chung LED, ví dụ đoạn Logo ngực nằm bên trong Giáp ngực. Một mạch chia được tới 63 phân đoạn.
        </p>

        <AreaHeading icon={<MousePointerClick className={iconClass} />}>Tạo phân đoạn</AreaHeading>
        <p className="text-xs text-slate-400">Chuột phải vào tên mạch trên timeline (ở chế độ Lập trình, hoặc khi đã mở khoá sửa):</p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="➕ Thêm phân đoạn…">mở hộp thoại để đặt tên và khoảng LED cho từng đoạn.</Point>
          <Point title="✂ Chia nhanh">Chia đôi, Chia 3 đoạn, Chia 4 đoạn, hoặc Mỗi cổng LED một đoạn. Chia xong vẫn đổi tên, sửa khoảng LED thoải mái.</Point>
          <Point title="Đọc phân đoạn đang có trên mạch">lấy các phân đoạn bạn đã chia trên trang điều khiển của mạch vào timeline.</Point>
          <Point title="Thu gọn phân đoạn">ẩn bớt các hàng con cho gọn. Bấm mũi tên cạnh tên mạch để mở lại.</Point>
        </ul>
        <Shot file="03-menu-mach.webp" open={open} />

        <AreaHeading icon={<Layers className={iconClass} />}>Hộp thoại Phân đoạn</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tự chọn khoảng">gõ tên, LED bắt đầu và LED kết thúc cho từng dòng, hoặc kéo chuột trên thanh LED bên dưới. Bấm các nút <strong className={strong}>Gợi ý tên</strong> như Giáp đầu, Giáp tay trái, Kiếm, Khiên để điền nhanh.</Point>
          <Point title="Chia đều, Theo cổng LED">hai tab để chia nhanh ngay trong hộp thoại.</Point>
          <Point title="Thanh LED xem trước">tô mỗi đoạn một màu, đúng màu của hàng đó trên timeline. Hai đoạn dùng chung LED thì thanh tách thành hai hàng, kèm dòng ghi chú vàng cho biết chỗ chung hiện đoạn nào. Đoạn vượt quá số LED thì có dòng báo đỏ.</Point>
          <Point title="▲ Lên lớp trên, ▼ Xuống lớp dưới">đổi thứ tự đoạn đang chọn. Đoạn nằm trên trong bảng là lớp trên, đè lên đoạn bên dưới ở chỗ dùng chung LED.</Point>
          <Point title="🔦 Nháy thử trên mạch">các đoạn trong bảng chớp sáng đúng màu của chúng trên đồ thật, nhìn là biết Giáp tay nằm ở đâu. Mạch đang tắt vẫn sáng lúc nháy, xong mạch trở lại như cũ, không mất preset hay cài đặt nào.</Point>
        </ul>
        <Shot file="04-hop-thoai-phan-doan.webp" open={open} narrow />
        <p className="text-xs text-slate-400">
          Với mạch <strong className={strong}>ma trận 2D</strong>, hộp thoại hiện lưới LED và có thêm cột <strong className={strong}>Kiểu</strong>:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Vùng ma trận">kéo chuột trên lưới để vẽ một vùng chữ nhật cho mỗi phân đoạn, ví dụ mắt trái, mắt phải, miệng của mặt nạ LED.</Point>
          <Point title="Thứ tự LED">Từ / Đến là số LED theo đường dây, như với dải LED. Hợp với hình LED tự do có sơ đồ LED (hình người, logo…) mà mỗi bộ phận nối liền một khúc dây: đầu, tay, chân. Lưới hiện đúng hình theo sơ đồ LED của mạch, rê chuột lên ô để xem số LED của ô đó. Đổi kiểu thì khoảng LED tự quy đổi, và tab Theo cổng LED cũng chia được ma trận theo cách này.</Point>
        </ul>
        <Shot file="04c-ma-tran.webp" open={open} narrow />

        <AreaHeading icon={<ListChecks className={iconClass} />}>Quy tắc chạy</AreaHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card title="Hàng tên mạch là lớp trên cùng">Clip ở hàng này phủ kín toàn bộ LED của mạch, nằm trên mọi phân đoạn. Logo hay ảnh GIF đặt ở đây hiện thành một hình lớn trên cả khung, không bị chia nhỏ theo từng đoạn. Mạch chưa chia thì chỉ có hàng này, như trước giờ.</Card>
          <Card title="Clip toàn mạch che clip phân đoạn">Trong lúc clip ở hàng tên mạch chạy, clip của các phân đoạn bị che. Timeline phủ mờ phần bị che và vẽ vệt sọc “toàn mạch”. Hết clip toàn mạch, các đoạn chạy tiếp clip của mình.</Card>
          <Card title="Hàng trên đè hàng dưới">Hai đoạn dùng chung LED thì chỗ chung hiện đoạn nằm trên. Đổi thứ tự bằng chuột phải tên đoạn → Lên lớp trên hoặc Xuống lớp dưới.</Card>
          <Card title="Không có clip nào thì đoạn tắt">Giống khoảng trống trên timeline, nhưng chỉ tắt đúng đoạn đó. Các đoạn khác vẫn chạy, và nếu có đoạn nằm dưới dùng chung LED thì đoạn đó hiện ra.</Card>
          <Card title="Một hiệu ứng cho nhiều đoạn">Giữ Ctrl và bấm tên các hàng, ví dụ Giáp tay và Giáp chân, rồi thả hiệu ứng vào một trong số đó. Mỗi hàng có một clip giống nhau, sửa riêng từng clip được.</Card>
          <Card title="Preset nhiều lớp">Preset có nhiều lớp, ví dụ chữ chạy với một hiệu ứng hoà lên trên, kéo xuống hàng tên mạch thì chạy đủ các lớp như khi bấm preset trên trang điều khiển, mỗi lớp đúng vùng LED của nó. Clip ở hàng phân đoạn chỉ chạy lớp đầu của preset, Tool nhắc khi bạn bấm Phát.</Card>
        </div>
        <Shot file="09-hang-phan-doan.webp" open={open} />

        <AreaHeading icon={<Wrench className={iconClass} />}>Sửa phân đoạn</AreaHeading>
        <p className="text-xs text-slate-400">Chuột phải vào tên một phân đoạn:</p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Đổi tên, Sửa khoảng LED">sửa trực tiếp, clip của đoạn giữ nguyên.</Point>
          <Point title="Lên lớp trên, Xuống lớp dưới">đổi chỗ với hàng ngay trên hoặc ngay dưới. Menu ghi sẵn tên đoạn sẽ đổi chỗ.</Point>
          <Point title="Nháy thử đoạn này trên mạch">chỉ đoạn đó chớp sáng, đúng màu của đoạn.</Point>
          <Point title="Đưa clip lên toàn mạch">chuyển clip của đoạn lên hàng tên mạch.</Point>
          <Point title="Gộp với đoạn dưới">nối hai đoạn thành một. Nếu khoảng mới trùm lên đoạn khác, Tool hỏi trước.</Point>
          <Point title="Xoá phân đoạn">nếu đoạn còn clip, Tool hỏi đưa clip lên toàn mạch hay xoá luôn. Mặc định là đưa lên.</Point>
        </ul>
        <Shot file="05-menu-phan-doan.webp" open={open} />
        <p className="text-xs text-slate-400">
          Phân đoạn được lưu cùng show. Ghi vào mạch rồi <strong className={strong}>Đọc từ mạch</strong> là dựng lại đúng tên, khoảng LED và clip của từng đoạn, không cần file gốc. Cài đặt thường ngày của mạch không bị đổi: trang điều khiển, nút bấm và preset của bạn vẫn như cũ, phân đoạn chỉ có tác dụng khi show chạy.
        </p>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Mỗi lúc chỉ <strong className="text-amber-300">một phân đoạn</strong> chạy được ảnh GIF. Nếu hai đoạn cùng chạy GIF một lúc, đoạn thứ hai sẽ tối. Hãy so le các clip GIF giữa các đoạn, hoặc để GIF ở hàng tên mạch: GIF ở hàng này luôn hiện, phủ kín cả khung.
          </p>
        </Callout>
      </section>

      {/* Mô phỏng */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Chưa Có Mạch? Lập Trình Trước Bằng Track Mô Phỏng</SectionHeading>
        <p className="text-xs text-slate-400">
          Bấm <strong className={strong}>🧪 Thêm track</strong> để tạo một track có nhãn <strong className={strong}>MÔ PHỎNG</strong>. Track này nhận clip y như mạch thật, phù hợp khi đang dựng show cho bộ đồ chưa làm xong hoặc mạch chưa giao tới. Chuột phải vào track để đổi tên, xoá hoặc chia phân đoạn. Lần đầu chia phân đoạn, Tool hỏi số LED hoặc kích thước ma trận của bộ đồ.
        </p>
        <Shot file="06-mo-phong.webp" open={open} />
        <p className="text-xs text-slate-400">
          Khi mạch thật đã online, bấm <strong className={strong}>🔗 Gán mạch thật</strong>. Bảng gán liệt kê từng track mô phỏng, bạn chọn mạch nhận và xem trước cách ghép phân đoạn ở cột bên phải, rồi bấm Áp dụng:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Ghép theo tên trước">Giáp tay của track mô phỏng vào Giáp tay của mạch thật, dù thứ tự hay khoảng LED trên mạch thật khác đi.</Point>
          <Point title="Rồi theo thứ tự">các đoạn không trùng tên được ghép theo thứ tự.</Point>
          <Point title="Mạch thật chưa chia">phân đoạn của track mô phỏng được chép sang nguyên vẹn.</Point>
          <Point title="Đoạn chưa có trên mạch thật">được thêm vào mạch thật với đúng khoảng LED và thứ tự lớp như ở track mô phỏng, kể cả khi dùng chung LED với đoạn có sẵn.</Point>
        </ul>
        <Shot file="07-gan-mach-that.webp" open={open} narrow />
      </section>

      {/* An toàn dữ liệu */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Không Lo Mất Show Đang Soạn</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Mạch tạm vắng">bấm Quét mạng lúc một mạch đang tắt, hay mạch rớt WiFi: track của mạch đang có clip vẫn ở lại dạng offline, clip không mất.</Point>
          <Point title="Mạch đổi địa chỉ IP">Tool nhận đúng mạch đó, clip đi theo mạch, không phải gán lại.</Point>
          <Point title="Mạch vừa cắm lại, xoá bộ nhớ hay thay mạch mới">trước khi Phát hoặc Ghi, Tool đối chiếu preset trên mạch với clip. Clip nào mất preset có dấu ⚠ và được ghi lại từ nội dung đã lưu trong file timeline; ghi xong, bấm Phát hoặc Ghi lại một lần. Muốn làm ngay: chuột phải tên mạch → <strong className={strong}>♻ Kiểm tra & ghi lại clip lên mạch này</strong>.</Point>
          <Point title="Sao lưu trước khi ghi">trước mỗi lần ghi danh sách preset lên mạch, Tool giữ một bản sao trên máy, ghi xong đọc lại để chắc mạch đã lưu.</Point>
          <Point title="Tự nhớ phiên làm việc">Tool tự lưu timeline đang soạn mỗi 20 giây và khi thoát. Đóng Tool rồi mở lại, timeline tự quay về.</Point>
          <Point title="Mở file khi còn thay đổi chưa lưu">Tool hỏi trước khi thay timeline đang soạn.</Point>
        </ul>
      </section>

      {/* Công cụ khác */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Vài Tiện Ích Khác</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Chép cả show sang mạch khác">chuột phải tên mạch → <strong className={strong}>Copy toàn bộ track</strong>, rồi chuột phải mạch khác → <strong className={strong}>Paste toàn bộ vào track</strong>. Phân đoạn được ghép theo tên như khi gán mạch thật.</Point>
          <Point title="Xóa preset + ảnh">dọn preset Timecode cũ trên mạch kèm ảnh của chúng. Logo, ảnh của bạn, preset hệ thống và ảnh mà một show đã lưu còn dùng luôn được giữ.</Point>
          <Point title="Tìm hiệu ứng nhanh">gõ không dấu, gõ tên gốc tiếng Anh hay gõ số ID đều ra. Hiệu ứng hay dùng thì ghim lên đầu cột.</Point>
        </ul>
      </section>

      {/* Phím tắt */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Phím Tắt</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SHORTCUTS.map(({ keys, desc }) => (
            <div key={keys} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3 items-start">
              <Keyboard className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400"><kbd className="font-mono text-[11px] text-white bg-slate-800 border border-white/10 rounded px-1.5 py-0.5">{keys}</kbd> <span className="ml-1">{desc}</span></p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Nếu phím không ăn, bấm vào timeline một lần rồi thử lại. Ở chế độ Chạy show đang khoá sửa, các phím sửa (Delete, Ctrl + V, T, Ctrl + Z / Y / N / O) không có tác dụng; Space, Ctrl + C và tua trên thước vẫn dùng được.
        </p>
      </section>

      {/* Lưu ý */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Lưu Ý Trước Buổi Diễn</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Cập nhật firmware cả đội hình">firmware 2611260 trở lên để các mạch chạy theo đồng hồ show. Nút Cập nhật nhiều mạch ở tab Cấu hình phần cứng nạp nhiều mạch cùng lúc.</Point>
          <Point title="Kiểm tra mạch trước">bật mạch, chờ mạch hiện online trên timeline. Bấm Test RGBW một lần để chắc dây LED và thứ tự màu đúng.</Point>
          <Point title="Dọn dự án">mạch nào không thuộc show thì loại khỏi dự án, để lệnh Phát, Dừng, độ sáng không đụng tới nó.</Point>
          <Point title="Lưu file không phải là ghi vào mạch">muốn mạch tự chạy show thì phải bấm ⬆ Ghi vào mạch, đúng show đang chọn. Ghi xong, bấm 📡 Phát bản đã ghi để xem lại một lượt.</Point>
          <Point title="Chuyển sang Chạy show trước giờ diễn">timeline được khoá, Live view Tổng quan cho thấy cả đội hình, mạch nào mất kết nối hay lệch nhịp nổi lên đầu. Có camera thì mở thêm Camera để nhìn đạo cụ thật.</Point>
          <Point title="Giữ một bản trên máy">lưu file timeline trước buổi diễn. Có sự cố thì mở file và ghi lại vào mạch.</Point>
        </ul>
        <Callout icon={<Music className="w-5 h-5 text-purple-400" />}>
          <p>
            Mẹo: dựng khung show trước bằng vạch đánh dấu. Nghe hết bài một lượt và bấm T ở mỗi chỗ nhạc đổi, sau đó chỉ việc thả hiệu ứng vào từng ô giữa hai vạch.
          </p>
        </Callout>
        <Callout icon={<Timer className="w-5 h-5 text-purple-400" />}>
          <p>
            Diễn nhiều tiết mục trong một chương trình? Lưu mỗi tiết mục thành một show trong mạch, tạo preset “Show kế tiếp” rồi gán cho nút bấm: người diễn tự chuyển tiết mục, không cần máy tính.
          </p>
        </Callout>
        <Callout icon={<FlaskConical className="w-5 h-5 text-purple-400" />}>
          <p>
            Dùng gậy POI? Xem thêm <Link to="/post-news/su-dung-poi-voi-argb-hsl/" className={link}>bài hướng dẫn POI</Link> và <Link to="/post-news/thu-vien-mau-poi/" className={link}>thư viện 306 mẫu POI</Link> để có ảnh đưa vào show.
          </p>
        </Callout>
        <p className="text-[11px] text-slate-500 flex gap-1.5 items-start">
          <Camera className="w-3.5 h-3.5 shrink-0 mt-px" />
          <span>Ảnh chụp từ Tool ARGB HSL v4.0.0 với dữ liệu mẫu và mạch giả lập; hình trong khung Camera là ảnh mẫu một nhóm trang phục LED; minh hoạ Live view chạy bằng LED giả lập. Tên mạch, địa chỉ và hiệu ứng trên máy của bạn sẽ khác.</span>
        </p>
      </section>

      <ArtQuote accent={ACCENT}>
        Cần hỗ trợ dựng show đầu tiên? Gọi hoặc nhắn Zalo cho Happy Smart Light qua số 0784 140 494, gửi kèm ảnh chụp màn hình tab Timecode để được hỗ trợ nhanh hơn.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={PHOTOS}
        currentIndex={activeIndex}
        title="Ảnh tab Timecode"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}

import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, Clapperboard, Eye, FlaskConical, Keyboard, Layers, Lightbulb, ListChecks,
  MousePointerClick, Music, Wrench,
} from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, Callout, ArtQuote } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";

const IMG = "/img/post-news/tab-timecode";
const ACCENT = "purple" as const;

// Kích thước thật của ảnh, để trang không bị nhảy khi ảnh tải xong.
const PHOTO_LIST: { file: string; label: string; w: number; h: number }[] = [
  { file: "01-tong-quan.webp", label: "Tab Timecode: thư viện hiệu ứng ở trên, timeline theo nhạc ở dưới, mỗi mạch một hàng, mạch 4X chia 5 phân đoạn", w: 1600, h: 1000 },
  { file: "02-thu-vien.webp", label: "Thanh trên cùng và 4 cột thư viện: Hiệu ứng, Bảng màu, Tuỳ chỉnh hiệu ứng, Preset mẫu", w: 1600, h: 400 },
  { file: "08-thanh-dieu-khien.webp", label: "Hai hàng nút điều khiển: phát, nhạc, mô phỏng, độ dài clip, đọc và ghi vào mạch", w: 900, h: 140 },
  { file: "09-hang-phan-doan.webp", label: "Hàng nhạc có vạch đánh dấu, hàng toàn mạch và các hàng phân đoạn. Vệt sọc “toàn mạch” là lúc đoạn đó chạy theo clip toàn mạch", w: 1600, h: 436 },
  { file: "03-menu-mach.webp", label: "Chuột phải vào tên mạch: Thêm phân đoạn, Chia nhanh, Đọc phân đoạn đang có trên mạch, Thu gọn", w: 1000, h: 322 },
  { file: "04-hop-thoai-phan-doan.webp", label: "Hộp thoại Phân đoạn: đặt tên, khoảng LED, thanh LED xem trước màu từng đoạn, nút Nháy thử trên mạch", w: 705, h: 560 },
  { file: "04c-ma-tran.webp", label: "Mạch ma trận 2D: kéo chuột trên lưới để vẽ vùng cho từng phân đoạn", w: 705, h: 560 },
  { file: "05-menu-phan-doan.webp", label: "Chuột phải vào tên phân đoạn: đổi tên, sửa khoảng LED, nháy thử, đưa clip lên toàn mạch, gộp, xoá", w: 1000, h: 322 },
  { file: "06-mo-phong.webp", label: "Track mô phỏng có nhãn MÔ PHỎNG, chia phân đoạn và lập trình như mạch thật", w: 1600, h: 364 },
  { file: "07-gan-mach-that.webp", label: "Gán mạch thật: chọn mạch cho từng track mô phỏng, cột Phân đoạn cho biết đoạn nào ghép vào đoạn nào", w: 820, h: 190 },
];

const PHOTOS: ZoomGalleryItem[] = PHOTO_LIST.map(({ file, label }) => ({ url: `${IMG}/${file}`, label, alt: label }));

const SHORTCUTS: { keys: string; desc: string }[] = [
  { keys: "Space", desc: "Tạm dừng / phát tiếp từ vạch phát" },
  { keys: "T", desc: "Đặt vạch đánh dấu tại vạch phát. Bấm T đúng chỗ vạch cũ để bỏ vạch" },
  { keys: "Delete", desc: "Xoá các clip đang chọn" },
  { keys: "Ctrl + C / Ctrl + V", desc: "Chép clip. Bấm vào tên mạch rồi Ctrl + C để chép cả track" },
  { keys: "Ctrl + Z / Ctrl + Y", desc: "Hoàn tác / làm lại, kể cả thao tác phân đoạn" },
  { keys: "Ctrl + S / Ctrl + O", desc: "Lưu file / mở file timeline trên máy tính" },
  { keys: "Ctrl + lăn chuột", desc: "Phóng to, thu nhỏ timeline" },
  { keys: "Ctrl + bấm tên hàng", desc: "Chọn nhiều hàng, thả 1 hiệu ứng là mỗi hàng có 1 clip" },
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
      title="Tab Timecode Trong Tool ARGB HSL: Lập Trình Show Ánh Sáng Theo Nhạc, Chia Từng Phân Đoạn"
      metaTitle="Tab Timecode Tool ARGB HSL | Lập Trình Show Ánh Sáng Theo Nhạc"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN SỬ DỤNG"
      description="Hướng dẫn dùng tab Timecode của Tool ARGB HSL: thêm nhạc, đánh dấu nhịp, kéo thả hiệu ứng lên timeline cho từng mạch, chia phân đoạn để mỗi phần trang phục LED chạy hiệu ứng riêng, lập trình trước bằng track mô phỏng, phát thử và ghi show vào mạch."
      bannerImg={`${IMG}/banner.webp`}
      accent={ACCENT}
      path="/post-news/tab-timecode-tool-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-purple-400" />}>
        <p>
          <strong className={strong}>Timecode</strong> là tab trong Tool ARGB HSL dùng để dựng show ánh sáng theo một bài nhạc. Bài nhạc nằm trên một dòng thời gian (timeline), mỗi mạch ARGB HSL là một hàng. Bạn kéo hiệu ứng vào đúng đoạn nhạc, bấm phát để xem cả nhóm mạch chạy cùng nhau, rồi ghi show vào mạch.
        </p>
        <p className="mt-2">
          <strong className={strong}>Mới trong Tool v3.17.5 (16/11/2026):</strong> chia một mạch thành nhiều <strong className={strong}>phân đoạn</strong> đặt tên theo thứ bạn nhìn thấy, ví dụ Giáp đầu, Giáp tay, Giáp ngực của bộ trang phục LED. Mỗi phân đoạn có hàng riêng trên timeline và chạy hiệu ứng riêng. Mọi ảnh trong bài đều bấm vào để xem lớn.
        </p>
      </Callout>

      {/* Chuẩn bị */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cần Chuẩn Bị Gì</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tool ARGB HSL">bản v3.17.5 trở lên trên máy tính. Tool đang cài sẽ tự báo khi có bản mới. Chưa có Tool? <Link to="/argb-hsl-tool-pc/" className={link}>Tải Tool ARGB HSL cho máy tính</Link>.</Point>
          <Point title="Mạch ARGB HSL">2X Pro, 4X hoặc 16X, kết nối cùng mạng WiFi với máy tính. Mạch tìm thấy ở tab Thiết bị ARGB tự hiện thành một hàng trên timeline. Vừa thêm mạch mới thì bấm <strong className={strong}>🔄 DS mạch</strong>.</Point>
          <Point title="Firmware để chia phân đoạn">bản dựng 2611163 trở lên. Cập nhật ở tab <strong className={strong}>Cấu hình phần cứng</strong>, các bước có trong bài <Link to="/post-news/nap-firmware-cau-hinh-wifi-argb-hsl/" className={link}>Nạp Firmware Mới Và Cấu Hình WiFi</Link>. Mạch chưa cập nhật vẫn chạy show cả mạch như trước.</Point>
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
          Nửa trên là <strong className={strong}>thư viện</strong>: hiệu ứng, bảng màu và preset để kéo xuống. Nửa dưới là <strong className={strong}>timeline</strong>: hàng nhạc trên cùng, tiếp theo là từng mạch.
        </p>
        <Shot file="01-tong-quan.webp" open={open} />

        <AreaHeading icon={<ListChecks className={iconClass} />}>Thanh trên cùng và thư viện</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Lưu file, Mở file, Hoàn tác, Làm lại">lưu và mở timeline trên máy tính, quay lại thao tác vừa làm.</Point>
          <Point title="Thư viện Có sẵn">hiệu ứng và bảng màu có sẵn trong Tool, dùng được khi chưa có mạch online.</Point>
          <Point title="Thư viện Từ mạch">tải hiệu ứng, bảng màu và preset từ <strong className={strong}>mạch nguồn</strong>. Mạch nguồn có nhãn ★ NGUỒN trên timeline. Chọn mạch khác ở ô <strong className={strong}>Mạch nguồn</strong>, hoặc chuột phải tên mạch → Dùng làm mạch nguồn.</Point>
          <Point title="Tất cả mạch">nút <strong className={strong}>Test RGBW</strong> chạy lần lượt đỏ, xanh lá, xanh dương, trắng trên mọi mạch online để kiểm tra dây LED và thứ tự màu. <strong className={strong}>Chuẩn màu</strong> đặt màu chính đỏ, màu nền đen trên mọi mạch để bắt đầu từ cùng một màu. Thanh trượt đặt độ sáng chung cho mọi mạch.</Point>
          <Point title="Cột Hiệu ứng">tìm theo tên tiếng Việt (gõ không dấu cũng được), tên gốc hoặc ID, có chip lọc theo nhóm. Bấm một hiệu ứng là mạch nguồn chạy thử ngay, không cần lưu preset.</Point>
          <Point title="Cột Tuỳ chỉnh hiệu ứng">chỉnh Tốc độ, Cường độ, màu, đảo chiều cho hiệu ứng đang chọn. Clip kéo xuống giữ đúng thông số lúc thả.</Point>
          <Point title="Cột Bảng màu và Preset mẫu">chọn một bảng màu rồi kéo hiệu ứng, clip sẽ mang cả hai. Preset là trạng thái đã lưu trên mạch, ví dụ ảnh, logo, chữ chạy. Ô đếm như 0/180 cho biết số chỗ preset Timecode đã dùng.</Point>
        </ul>
        <Shot file="02-thu-vien.webp" open={open} />

        <AreaHeading icon={<Clapperboard className={iconClass} />}>Hai hàng nút điều khiển</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Phát từ đầu, Tạm dừng, Dừng, Lặp">phát show cùng nhạc trên mọi mạch. Ô bên cạnh ghi trạng thái và vị trí đang phát.</Point>
          <Point title="Nhạc">Thêm nhạc, Cắt & thêm (lấy một đoạn của bài), Bỏ nhạc, và ô chọn loa phát.</Point>
          <Point title="Mô phỏng">Thêm track mô phỏng, Gán mạch thật.</Point>
          <Point title="Clip mới dài, Chuyển cảnh">độ dài mặc định của clip khi thả, và thời gian chuyển mượt sang clip mới.</Point>
          <Point title="Làm sạch timeline, Tối ưu preset">xoá hết clip trên timeline (chỉ trong Tool, Ctrl + Z để lấy lại), gộp các preset trùng nhau trên mạch để có thêm chỗ.</Point>
          <Point title="Mạch ARGB">Đọc từ mạch, Ghi vào mạch, Phát bản đã ghi. Xem bước 6 bên dưới.</Point>
        </ul>
        <Shot file="08-thanh-dieu-khien.webp" open={open} />
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
            <p>Bấm vào một hiệu ứng ở cột Hiệu ứng để xem thử trên mạch nguồn. Ưng rồi thì chỉnh tốc độ và màu ở cột Tuỳ chỉnh hiệu ứng.</p>
          </Step>
          <Step n={4} title="Kéo thả xuống timeline">
            <p>Kéo hiệu ứng, bảng màu hoặc preset vào hàng của mạch. Trong lúc kéo, bóng clip cho biết clip sẽ nằm ở đâu và Tool sẽ làm gì: dùng preset có sẵn, chép preset từ mạch nguồn sang, hay tạo preset tạm.</p>
            <p>Clip hiệu ứng màu xanh lá, clip preset màu cam. Kéo giữa clip để dời, kéo mép để đổi độ dài, bấm <strong className={strong}>Delete</strong> để xoá. Kéo preset có ảnh sang mạch khác thì Tool tự chép cả preset lẫn ảnh sang.</p>
          </Step>
          <Step n={5} title="Phát thử">
            <p>Bấm <strong className={strong}>▶ Phát từ đầu</strong>. Nhạc và đèn của mọi mạch chạy cùng lúc, Tool giữ các mạch khớp nhịp trong suốt bài. Bấm vào thước thời gian để nhảy tới đoạn cần xem.</p>
            <p><strong className={strong}>Space</strong> tạm dừng: mạch đứng yên đúng hình ở vị trí đó để bạn soi kỹ. <strong className={strong}>⏹ Dừng</strong> đưa về 0 giây và tắt LED. Tick <strong className={strong}>Lặp</strong> để show chạy lại từ đầu khi tới vạch END.</p>
          </Step>
          <Step n={6} title="Lưu file và ghi vào mạch">
            <p><strong className={strong}>💾 Lưu file</strong> (Ctrl + S) lưu toàn bộ timeline, nhạc và track mô phỏng ra một file trên máy tính, để mở lại hoặc gửi cho người khác. File này không ghi gì vào mạch.</p>
            <p><strong className={strong}>⬆ Ghi vào mạch</strong> ghi show vào từng mạch đang online. Sau đó mạch giữ show trong bộ nhớ và chạy được mà không cần máy tính, qua nút bấm hoặc lịch hẹn giờ đã cài trên mạch. Bấm <strong className={strong}>📡 Phát bản đã ghi</strong> để kiểm tra đúng bản đang nằm trong mạch.</p>
            <p><strong className={strong}>⬇ Đọc từ mạch</strong> đọc show đã ghi về lại timeline, gồm cả phân đoạn và vạch đánh dấu. Tool hỏi trước khi thay timeline đang soạn.</p>
          </Step>
        </div>
      </section>

      {/* Phân đoạn */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Chia Phân Đoạn: Mỗi Phần Một Hiệu Ứng</SectionHeading>
        <p className="text-xs text-slate-400">
          Một mạch thường điều khiển cả bộ trang phục hay cả một cụm đèn. Khi chia phân đoạn, mỗi phần có hàng riêng ngay dưới tên mạch: Giáp đầu có thể chạy Ngọn lửa trong lúc Giáp tay chạy Đuổi màu, còn Giáp ngực hiện logo.
        </p>
        <p className="text-xs text-slate-400">
          Phân đoạn là <strong className={strong}>một khoảng LED bất kỳ</strong>, đặt tên tuỳ ý. Không cần trùng với cổng LED: Giáp tay có thể là LED 40 tới 119, nằm vắt qua hai cổng. Một mạch chia được tới 64 phân đoạn.
        </p>

        <AreaHeading icon={<MousePointerClick className={iconClass} />}>Tạo phân đoạn</AreaHeading>
        <p className="text-xs text-slate-400">Chuột phải vào tên mạch trên timeline:</p>
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
          <Point title="Thanh LED xem trước">tô mỗi đoạn một màu, đúng màu của hàng đó trên timeline. Hai đoạn chồng lên nhau hoặc vượt quá số LED thì có dòng báo đỏ.</Point>
          <Point title="Nháy thử trên mạch">các đoạn trong bảng chớp sáng trên đồ thật, nhìn là biết Giáp tay nằm ở đâu. Mạch đang tắt vẫn sáng lúc nháy, xong mạch trở lại như cũ, không mất preset hay cài đặt nào.</Point>
        </ul>
        <Shot file="04-hop-thoai-phan-doan.webp" open={open} narrow />
        <p className="text-xs text-slate-400">
          Với mạch <strong className={strong}>ma trận 2D</strong>, hộp thoại hiện lưới LED. Kéo chuột trên lưới để vẽ một vùng chữ nhật cho mỗi phân đoạn, ví dụ mắt trái, mắt phải, miệng của mặt nạ LED.
        </p>
        <Shot file="04c-ma-tran.webp" open={open} narrow />

        <AreaHeading icon={<ListChecks className={iconClass} />}>Quy tắc chạy</AreaHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5">Hàng tên mạch là toàn mạch</h3>
            <p className="text-xs text-slate-400">Clip ở hàng này chạy trên mọi phân đoạn. Mạch chưa chia thì chỉ có hàng này, như trước giờ.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5">Clip phân đoạn đè clip toàn mạch</h3>
            <p className="text-xs text-slate-400">Trong lúc clip riêng chạy, đoạn đó bỏ clip toàn mạch. Hết clip riêng, đoạn quay về clip toàn mạch. Vệt sọc mờ ghi “toàn mạch” cho biết lúc đó.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5">Không có clip nào thì đoạn tắt</h3>
            <p className="text-xs text-slate-400">Giống khoảng trống trên timeline, nhưng chỉ tắt đúng đoạn đó. Các đoạn khác vẫn chạy.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5">Một hiệu ứng cho nhiều đoạn</h3>
            <p className="text-xs text-slate-400">Giữ Ctrl và bấm tên các hàng, ví dụ Giáp tay và Giáp chân, rồi thả hiệu ứng vào một trong số đó. Mỗi hàng có một clip giống nhau, sửa riêng từng clip được.</p>
          </InfoCard>
        </div>
        <Shot file="09-hang-phan-doan.webp" open={open} />

        <AreaHeading icon={<Wrench className={iconClass} />}>Sửa phân đoạn</AreaHeading>
        <p className="text-xs text-slate-400">Chuột phải vào tên một phân đoạn:</p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Đổi tên, Sửa khoảng LED">sửa trực tiếp, clip của đoạn giữ nguyên.</Point>
          <Point title="Nháy thử đoạn này trên mạch">chỉ đoạn đó chớp sáng.</Point>
          <Point title="Đưa clip lên toàn mạch">chuyển clip của đoạn lên hàng tên mạch.</Point>
          <Point title="Gộp với đoạn dưới">nối hai đoạn liền nhau thành một.</Point>
          <Point title="Xoá phân đoạn">nếu đoạn còn clip, Tool hỏi đưa clip lên toàn mạch hay xoá luôn. Mặc định là đưa lên.</Point>
        </ul>
        <Shot file="05-menu-phan-doan.webp" open={open} />
        <p className="text-xs text-slate-400">
          Phân đoạn được lưu cùng show. Ghi vào mạch rồi <strong className={strong}>Đọc từ mạch</strong> là dựng lại đúng tên, khoảng LED và clip của từng đoạn, không cần file gốc. Cài đặt thường ngày của mạch không bị đổi: trang điều khiển, nút bấm và preset của bạn vẫn như cũ, phân đoạn chỉ có tác dụng khi show chạy.
        </p>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Mỗi lúc chỉ <strong className="text-amber-300">một phân đoạn</strong> chạy được ảnh GIF. Nếu hai đoạn cùng chạy GIF một lúc, đoạn thứ hai sẽ tối. Hãy so le các clip GIF giữa các đoạn, hoặc để GIF ở hàng toàn mạch.
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
          <Point title="Đoạn không ghép được">clip của nó lên hàng toàn mạch, và Tool báo cho bạn biết.</Point>
        </ul>
        <Shot file="07-gan-mach-that.webp" open={open} narrow />
      </section>

      {/* Công cụ khác */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Vài Tiện Ích Khác</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Chép cả show sang mạch khác">chuột phải tên mạch → <strong className={strong}>Copy toàn bộ track</strong>, rồi chuột phải mạch khác → <strong className={strong}>Paste toàn bộ vào track</strong>. Phân đoạn được ghép theo tên như khi gán mạch thật.</Point>
          <Point title="Ẩn mạch khỏi timeline">chuột phải → Ẩn, clip vẫn giữ nguyên. Bấm nút 👁 trên thanh điều khiển để hiện lại.</Point>
          <Point title="Kiểm tra & ghi lại clip lên mạch này">dùng khi mạch vừa xoá bộ nhớ hay thay mạch mới: Tool ghi lại những preset mà show cần.</Point>
          <Point title="Xóa preset + ảnh">dọn preset Timecode cũ trên mạch kèm ảnh của chúng. Logo, ảnh của bạn và preset hệ thống luôn được giữ.</Point>
          <Point title="Tự nhớ phiên làm việc">đóng Tool rồi mở lại, timeline đang soạn tự quay về.</Point>
          <Point title="Mạch đổi địa chỉ IP">clip vẫn đi theo đúng mạch đó, không phải gán lại.</Point>
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
        <p className="text-xs text-slate-400">Nếu phím không ăn, bấm vào timeline một lần rồi thử lại.</p>
      </section>

      {/* Lưu ý */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Lưu Ý Trước Buổi Diễn</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Kiểm tra mạch trước">bật mạch, chờ mạch hiện online trên timeline. Bấm Test RGBW một lần để chắc dây LED và thứ tự màu đúng.</Point>
          <Point title="Lưu file không phải là ghi vào mạch">muốn mạch tự chạy show thì phải bấm ⬆ Ghi vào mạch. Ghi xong, bấm 📡 Phát bản đã ghi để xem lại một lượt.</Point>
          <Point title="Show có nhiều clip">nếu Tool báo hết chỗ preset Timecode, bấm ⚙ Tối ưu preset để gộp các preset trùng nhau.</Point>
          <Point title="Giữ một bản trên máy">lưu file timeline trước buổi diễn. Có sự cố thì mở file và ghi lại vào mạch.</Point>
        </ul>
        <Callout icon={<Music className="w-5 h-5 text-purple-400" />}>
          <p>
            Mẹo: dựng khung show trước bằng vạch đánh dấu. Nghe hết bài một lượt và bấm T ở mỗi chỗ nhạc đổi, sau đó chỉ việc thả hiệu ứng vào từng ô giữa hai vạch.
          </p>
        </Callout>
        <Callout icon={<FlaskConical className="w-5 h-5 text-purple-400" />}>
          <p>
            Dùng gậy POI? Xem thêm <Link to="/post-news/su-dung-poi-voi-argb-hsl/" className={link}>bài hướng dẫn POI</Link> và <Link to="/post-news/thu-vien-mau-poi/" className={link}>thư viện 306 mẫu POI</Link> để có ảnh đưa vào show.
          </p>
        </Callout>
        <p className="text-[11px] text-slate-500">Ảnh chụp từ Tool ARGB HSL v3.17.5 với dữ liệu mẫu. Tên mạch, địa chỉ và hiệu ứng trên máy của bạn sẽ khác.</p>
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

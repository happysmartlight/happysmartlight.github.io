import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, Cable, Eye, Heart, Info, Layers, Lightbulb, Monitor, Moon, Network,
  Palette, RefreshCw, Search, SlidersHorizontal, Smartphone, Sparkles, Star, SunMoon, Zap,
} from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, Callout, ArtQuote } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";

const IMG = "/img/post-news/giao-dien-supernova";
const ACCENT = "blue" as const;

// Kích thước thật của ảnh, để trang không bị nhảy khi ảnh tải xong.
const PHOTO_LIST: { file: string; label: string; w: number; h: number }[] = [
  { file: "01-may-tinh-3-cot.webp", label: "Trên máy tính: thanh nút bên trái, màn hình chia 3 cột Màu sắc, Hiệu ứng, Phân đoạn và Presets", w: 1366, h: 840 },
  { file: "02-dien-thoai-mau-sac.webp", label: "Tab Màu sắc trên điện thoại: ô màu, vòng màu, thanh trượt và màu nhanh", w: 420, h: 840 },
  { file: "05-mau-nhanh-bang-mau.webp", label: "Kéo xuống: màu nhanh, ba nút công cụ và danh sách bảng màu có ô tìm", w: 420, h: 840 },
  { file: "03-canh-bao-dong-dien.webp", label: "Ô dòng điện báo ABL quá thấp, chạm vào để đọc giải thích", w: 420, h: 840 },
  { file: "04-xem-truc-tiep-2d.webp", label: "Ma trận 2D: bảng Xem LED trực tiếp vẽ từng LED của tấm", w: 420, h: 840 },
  { file: "06-hieu-ung.webp", label: "Tab Hiệu ứng: ô tìm, chip lọc, ngôi sao yêu thích, ngăn Tùy chỉnh hiệu ứng đang thu gọn", w: 420, h: 840 },
  { file: "07-tuy-chinh-hieu-ung.webp", label: "Bấm vào ngăn Tùy chỉnh hiệu ứng để kéo lên các thanh chỉnh", w: 420, h: 840 },
  { file: "08-phan-doan.webp", label: "Tab Phân đoạn: thẻ phân đoạn đang mở và nút Thêm phân đoạn", w: 420, h: 840 },
  { file: "09-luu-preset.webp", label: "Tab Presets: bấm + Preset để lưu trạng thái đang chạy", w: 420, h: 840 },
  { file: "10-thong-tin-dien-thoai.webp", label: "Bảng Thông tin trên điện thoại", w: 420, h: 840 },
  { file: "11-thong-tin-may-tinh.webp", label: "Bảng Thông tin trên máy tính (đã che địa chỉ IP và MAC)", w: 1366, h: 840 },
  { file: "12-cong-led.webp", label: "Bảng Cổng LED: mỗi cổng LED là một thẻ, bấm Chỉnh sửa để mở trang cài đặt", w: 1278, h: 218 },
  { file: "13-cau-hinh.webp", label: "Trang Cài đặt trên điện thoại: nút Về màn hình điều khiển và 6 thẻ", w: 420, h: 720 },
  { file: "14-den-led.webp", label: "Trang Đèn LED và phần cứng: ô tóm tắt, thẻ Nguồn và độ sáng, mỗi cổng một thẻ", w: 1366, h: 840 },
  { file: "15-giao-dien-sang.webp", label: "Giao diện nền sáng trên máy tính", w: 1366, h: 840 },
];

const PHOTOS: ZoomGalleryItem[] = PHOTO_LIST.map(({ file, label }) => ({ url: `${IMG}/${file}`, label, alt: label }));

const HEADER_BUTTONS: { icon: ReactNode; name: string; desc: string }[] = [
  { icon: <Moon className="w-4 h-4 text-neon-blue-bright" />, name: "Hẹn giờ", desc: "Bật hẹn giờ cho đèn. Màn hình báo đèn sẽ tắt sau bao nhiêu phút. Bấm lần nữa để huỷ." },
  { icon: <RefreshCw className="w-4 h-4 text-neon-blue-bright" />, name: "Đồng bộ", desc: "Bật để các mạch ARGB HSL khác trong cùng mạng chạy theo mạch này. Bấm lần nữa để tắt." },
  { icon: <Info className="w-4 h-4 text-neon-blue-bright" />, name: "Thông tin", desc: "Mở bảng Thông tin: nhiệt độ chip, số khung hình, số LED, dòng điện, WiFi." },
  { icon: <Cable className="w-4 h-4 text-neon-blue-bright" />, name: "Cổng LED", desc: "Xem nhanh từng cổng LED của mạch. Nút này có trên màn hình rộng như máy tính." },
  { icon: <Network className="w-4 h-4 text-neon-blue-bright" />, name: "ARGB khác", desc: "Chỉ hiện khi trong mạng có mạch ARGB HSL khác, để mở danh sách các mạch đó." },
  { icon: <SunMoon className="w-4 h-4 text-neon-blue-bright" />, name: "Giao diện", desc: "Đổi nền tối hoặc nền sáng." },
  { icon: <SlidersHorizontal className="w-4 h-4 text-neon-blue-bright" />, name: "Cấu hình", desc: "Mở trang Cài đặt: WiFi, đèn LED, ma trận, giao diện, bảo mật và cập nhật." },
];

const SETTING_CARDS: { name: string; desc: string }[] = [
  { name: "WiFi", desc: "Mạng WiFi nhà, điểm phát riêng của mạch, tên mạch." },
  { name: "Đèn LED", desc: "Cổng LED, số LED, loại LED, giới hạn dòng điện." },
  { name: "Ma trận 2D", desc: "Kích thước và cách xếp tấm LED ma trận." },
  { name: "Giao diện", desc: "Tên thiết bị, nền sáng hoặc tối, ảnh nền." },
  { name: "Usermods", desc: "Các chức năng mở rộng như Autosave, POI, cảm biến." },
  { name: "Bảo mật và cập nhật", desc: "Mật khẩu, sao lưu cấu hình, cập nhật firmware." },
];

const strong = "text-white";
const link = "text-neon-blue-bright hover:underline";

function Shot({ file, open, phone = false }: { file: string; open: (url: string) => void; phone?: boolean }) {
  const url = `${IMG}/${file}`;
  const photo = PHOTO_LIST.find((p) => p.file === file);
  const label = photo?.label ?? "Ảnh chụp giao diện SuperNova";
  return (
    <figure className={phone ? "min-w-0" : "mt-2"}>
      <button
        type="button"
        onClick={() => open(url)}
        aria-label={`Xem lớn: ${label}`}
        className={`group/zoom relative block w-full overflow-hidden border border-white/10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60 ${phone ? "rounded-2xl" : "rounded-lg"}`}
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

/** Hai ảnh điện thoại đứng cạnh nhau. */
function PhoneRow({ files, open }: { files: string[]; open: (url: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-xl mt-2">
      {files.map((file) => <Shot key={file} file={file} open={open} phone />)}
    </div>
  );
}

function Point({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-blue-bright shrink-0" />
      <span><strong className={strong}>{title}:</strong> {children}</span>
    </li>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4 p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-white/15 transition-colors">
      <span className="font-mono text-[10px] text-neon-blue-bright font-bold bg-neon-blue/10 px-2.5 py-1 rounded-lg shrink-0 h-fit">
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

const iconClass = "w-4 h-4 text-neon-blue-bright";

export default function ArticleGiaoDienSuperNova() {
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
      title="Giao Diện SuperNova Mới Của Mạch ARGB HSL: Làm Quen Từng Vùng Màn Hình"
      metaTitle="Giao Diện SuperNova Mạch ARGB HSL | Hướng Dẫn Sử Dụng"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN SỬ DỤNG"
      description="Làm quen giao diện SuperNova trên trang điều khiển của mạch ARGB HSL: thanh trên cùng, dải LED xem trước, nút nguồn và độ sáng, các tab Màu sắc, Hiệu ứng, Phân đoạn, Presets, bảng Thông tin, Cổng LED và trang Cấu hình, trên cả điện thoại lẫn máy tính."
      bannerImg={`${IMG}/banner.webp`}
      accent={ACCENT}
      path="/post-news/giao-dien-supernova-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-neon-blue-bright" />}>
        <p>
          Mạch ARGB HSL (2X Pro, 4X, 16X) có sẵn một trang điều khiển: mở trình duyệt trên điện thoại hoặc máy tính, gõ địa chỉ của mạch là dùng được, không cần cài app. <strong className={strong}>SuperNova</strong> là giao diện mới của trang này. Chữ rõ hơn, nút có tên tiếng Việt, và bố cục tự đổi theo màn hình bạn đang dùng. Mọi ảnh trong bài đều bấm vào để xem lớn.
        </p>
      </Callout>

      {/* Cách có giao diện mới */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cách Có Giao Diện Mới</SectionHeading>
        <p className="text-xs text-slate-400">
          Giao diện SuperNova nằm sẵn trong firmware của mạch. Bạn chỉ cần cập nhật firmware, không phải cài thêm gì.
        </p>
        <div className="space-y-3">
          <Step n={1} title="Cập nhật firmware bằng Tool ARGB HSL">
            <p>
              Mở Tool, vào tab <strong className={strong}>Cấu hình phần cứng</strong>, chọn mạch rồi bấm <strong className={strong}>Kiểm tra cập nhật</strong>. Nếu có bản mới, nạp OTA không dây để giữ nguyên cấu hình. Các bước chi tiết có trong bài{" "}
              <Link to="/post-news/nap-firmware-cau-hinh-wifi-argb-hsl/" className={link}>Nạp Firmware Mới Và Cấu Hình WiFi</Link>.
            </p>
            <p>Chưa có Tool? <Link to="/argb-hsl-tool-pc/" className={link}>Tải Tool ARGB HSL cho máy tính</Link>.</p>
          </Step>
          <Step n={2} title="Mở trang điều khiển">
            <p>
              Dùng điện thoại hoặc máy tính <strong className={strong}>cùng mạng WiFi</strong> với mạch. Gõ địa chỉ của mạch vào trình duyệt, dạng <code className="text-slate-300">http://192.168.x.x</code>. Địa chỉ này hiện trong Tool, và ngay dưới tên mạch trên chính trang điều khiển.
            </p>
            <p>Nếu trình duyệt vẫn hiện giao diện cũ, hãy tải lại trang.</p>
          </Step>
        </div>
      </section>

      {/* Bố cục */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Điện Thoại Hay Máy Tính Đều Gọn</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard>
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-1.5"><Smartphone className={iconClass} />Trên điện thoại</h3>
            <p className="text-xs text-slate-400">Mỗi lần xem một phần. Chọn phần cần dùng ở <strong className={strong}>thanh tab dưới cùng</strong>: Màu sắc, Hiệu ứng, Phân đoạn, Presets.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-1.5"><Monitor className={iconClass} />Trên máy tính</h3>
            <p className="text-xs text-slate-400">Khi cửa sổ đủ rộng, các nút chuyển sang <strong className={strong}>thanh dọc bên trái</strong> và màn hình chia <strong className={strong}>3 cột</strong>. Bạn thấy màu, hiệu ứng, phân đoạn và preset cùng lúc, không phải chuyển tab.</p>
          </InfoCard>
        </div>
        <Shot file="01-may-tinh-3-cot.webp" open={open} />
      </section>

      {/* Phần trên cùng */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Phần Trên Cùng: Tên Mạch, Nút Nhanh, Dải LED</SectionHeading>

        <AreaHeading icon={<SlidersHorizontal className={iconClass} />}>Tên mạch và các nút tròn</AreaHeading>
        <p className="text-xs text-slate-400">
          Bên trái là logo, tên mạch và địa chỉ của mạch. Bên phải là các nút tròn. Trên máy tính, mỗi nút có thêm tên ngay bên dưới.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {HEADER_BUTTONS.map(({ icon, name, desc }) => (
            <div key={name} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3">
              <span className="shrink-0 mt-0.5">{icon}</span>
              <p className="text-xs text-slate-400"><strong className={strong}>{name}.</strong> {desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Điện thoại màn hình nhỏ chỉ giữ các nút <strong className={strong}>Hẹn giờ, Đồng bộ, Thông tin</strong> và <strong className={strong}>Cấu hình</strong> cho gọn.
        </p>

        <AreaHeading icon={<Eye className={iconClass} />}>Dải LED xem trước và nút Xem trực tiếp</AreaHeading>
        <p className="text-xs text-slate-400">
          Ngay dưới tên mạch là một dải chấm tròn, tô theo màu hoặc bảng màu bạn đang chọn. Nhìn vào là biết đèn đang dùng tông màu gì.
        </p>
        <p className="text-xs text-slate-400">
          Bấm <strong className={strong}>Xem trực tiếp</strong> để xem đúng màu LED đang sáng. Với dải LED thường, màu thật hiện ngay trên dải chấm. Với <strong className={strong}>ma trận 2D</strong>, bảng <strong className={strong}>Xem LED trực tiếp</strong> mở ra, vẽ từng LED của tấm kèm kích thước, ví dụ 60 × 60 LED. Lúc này nút đổi thành <strong className={strong}>Đang xem · Tắt</strong>. Bấm nút đó hoặc dấu X để đóng.
        </p>

        <AreaHeading icon={<Zap className={iconClass} />}>Nút nguồn, độ sáng và ô dòng điện</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Nút nguồn">bật hoặc tắt toàn bộ đèn.</Point>
          <Point title="Độ sáng">kéo thanh trượt, số phần trăm hiện ngay bên cạnh.</Point>
          <Point title="Ô fps">chỉ có trên máy tính. Đây là số khung hình mạch gửi ra LED mỗi giây, số càng cao hiệu ứng càng mượt.</Point>
          <Point title="Ô dòng điện">dòng điện LED đang dùng, tính ước lượng theo màu chứ không phải số đo. Trên máy tính có ghi thêm mức giới hạn bạn đã đặt.</Point>
        </ul>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Mạch có chức năng <strong className="text-amber-300">ABL</strong>: tự giảm độ sáng để dòng điện không vượt quá mức bạn đặt cho bộ nguồn. Nếu mức này đặt quá thấp so với số LED, ô dòng điện chuyển màu cam và ghi <strong className="text-amber-300">ABL quá thấp</strong>, đèn gần như tắt. Chạm vào ô đó để đọc giải thích, rồi sửa trong <strong className="text-amber-300">Cấu hình → Đèn LED</strong> (xem phần Trang Cấu hình bên dưới).
          </p>
        </Callout>
        <PhoneRow files={["03-canh-bao-dong-dien.webp", "04-xem-truc-tiep-2d.webp"]} open={open} />
      </section>

      {/* Màu sắc */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Tab Màu Sắc</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Ô màu trên cùng">mỗi ô là một màu mà hiệu ứng đang dùng: <strong className={strong}>Màu chính</strong>, <strong className={strong}>Màu nền</strong>, <strong className={strong}>Màu phụ</strong>, kèm mã màu. Hiệu ứng dùng bao nhiêu màu thì hiện bấy nhiêu ô. Bấm vào ô nào thì vòng màu sẽ chỉnh màu đó, ô đang chọn có viền xanh.</Point>
          <Point title="Vòng màu">kéo chấm tròn để chọn màu.</Point>
          <Point title="Thanh trượt">mỗi thanh có tên và số ở hai đầu. <strong className={strong}>Độ sáng màu</strong> tính bằng phần trăm. <strong className={strong}>Nhiệt độ màu trắng</strong> kéo về trái cho trắng ấm hơi vàng, về phải cho trắng lạnh.</Point>
          <Point title="Màu nhanh">12 ô xếp 6 × 2. Bấm một ô là đổi màu ngay. Ô có hình xúc xắc chọn màu ngẫu nhiên, ô <strong className={strong}>#</strong> mở dòng để gõ mã màu HEX.</Point>
          <Point title="Công cụ">ba nút có chữ rõ ràng. <strong className={strong}>Tệp</strong> xem các tệp lưu trong mạch. <strong className={strong}>PixelForge</strong> đưa ảnh lên mạch, cắt cho vừa tấm LED, hoặc tạo chữ chạy. <strong className={strong}>Tạo bảng màu</strong> để tự làm bảng màu riêng.</Point>
          <Point title="Bảng màu">danh sách có ô tìm. Mỗi bảng có dải màu xem trước, tên tiếng Việt và tên gốc. Bảng có dấu * lấy màu từ các ô màu bạn chọn ở trên. Danh sách này chỉ hiện khi hiệu ứng đang chạy có dùng bảng màu.</Point>
        </ul>
        <PhoneRow files={["02-dien-thoai-mau-sac.webp", "05-mau-nhanh-bang-mau.webp"]} open={open} />
      </section>

      {/* Hiệu ứng */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Tab Hiệu Ứng</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Ô Tìm">gõ tên tiếng Việt, không dấu cũng được, hoặc tên tiếng Anh.</Point>
          <Point title="Chip lọc"><strong className={strong}>Tất cả</strong>, <strong className={strong}>★ Yêu thích</strong>, <strong className={strong}>Bảng màu</strong> (hiệu ứng dùng bảng màu), <strong className={strong}>1D</strong> (cho dải LED), <strong className={strong}>2D</strong> (cho ma trận), <strong className={strong}>Âm lượng</strong> và <strong className={strong}>Tần số</strong> (hiệu ứng chạy theo âm thanh). Trên điện thoại, vuốt ngang để thấy hết.</Point>
          <Point title="Danh sách">mỗi dòng có tên tiếng Việt, tên gốc bên dưới và vài nhãn nhỏ cho biết hiệu ứng dùng bảng màu, chạy trên dải hay ma trận, có theo âm thanh không. Hiệu ứng đang chạy được tô sáng.</Point>
          <Point title="Ngôi sao">bấm ☆ để đưa hiệu ứng vào Yêu thích, rồi bấm chip Yêu thích để chỉ xem các hiệu ứng có sao. Danh sách này được nhớ trên trình duyệt bạn đang dùng.</Point>
        </ul>

        <AreaHeading icon={<Sparkles className={iconClass} />}>Ngăn Tùy chỉnh hiệu ứng</AreaHeading>
        <p className="text-xs text-slate-400">
          Ở đáy tab có một ngăn ghi <strong className={strong}>Tùy chỉnh hiệu ứng</strong> và tên hiệu ứng đang chạy. Ngăn này thu gọn sẵn để danh sách rộng rãi. Khi muốn tinh chỉnh, bấm vào ngăn để kéo lên: các thanh như <strong className={strong}>Tốc độ hiệu ứng</strong> và tuỳ chọn riêng của hiệu ứng đó hiện ra. Bấm mũi tên để thu lại. Trên máy tính, phần này nằm ở cuối cột Hiệu ứng.
        </p>
        <p className="text-xs text-slate-400">
          Dùng gậy POI? Khi chọn hiệu ứng <strong className={strong}>Poi HSL</strong>, phần tùy chỉnh có thêm thẻ POI riêng để chọn số ảnh mỗi vòng và đảo chiều. Xem thêm{" "}
          <Link to="/post-news/su-dung-poi-voi-argb-hsl/" className={link}>bài hướng dẫn POI</Link>.
        </p>
        <PhoneRow files={["06-hieu-ung.webp", "07-tuy-chinh-hieu-ung.webp"]} open={open} />
      </section>

      {/* Phân đoạn và Presets */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Tab Phân Đoạn Và Tab Presets</SectionHeading>

        <AreaHeading icon={<Layers className={iconClass} />}>Phân đoạn</AreaHeading>
        <p className="text-xs text-slate-400">
          Phân đoạn là một vùng LED chạy hiệu ứng riêng. Mặc định cả dải, hoặc cả tấm ma trận, là một phân đoạn.
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Thẻ phân đoạn">ô tick để chọn phân đoạn bạn đang chỉnh. Bấm mũi tên để mở thẻ: chọn LED đầu và LED cuối (ma trận thì theo cột X và hàng Y), lật gương, đảo ngược. Số LED của vùng hiện ngay bên dưới.</Point>
          <Point title="Thêm phân đoạn">chia thêm một vùng mới.</Point>
          <Point title="Hiệu ứng chuyển đổi">số giây để đèn chuyển mượt khi bạn đổi màu hay hiệu ứng, và kiểu chuyển, ví dụ Mờ dần.</Point>
        </ul>

        <AreaHeading icon={<Heart className={iconClass} />}>Presets</AreaHeading>
        <p className="text-xs text-slate-400">
          Preset là một trạng thái đã lưu: màu, hiệu ứng, độ sáng. Bấm vào một preset để bật lại ngay. Có ô tìm khi bạn lưu nhiều preset.
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="+ Preset">mở khung lưu. Đặt tên, chọn các ô tick cần dùng, rồi bấm <strong className={strong}>Lưu</strong>. Tick <strong className={strong}>Áp dụng khi khởi động</strong> nếu muốn mạch bật preset này mỗi lần có điện. Bấm <strong className={strong}>Hủy bỏ</strong> nếu chưa muốn lưu.</Point>
          <Point title="+ Playlist">ghép nhiều preset để chạy nối tiếp nhau.</Point>
        </ul>
        <PhoneRow files={["08-phan-doan.webp", "09-luu-preset.webp"]} open={open} />
      </section>

      {/* Thông tin */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Bảng Thông Tin</SectionHeading>
        <p className="text-xs text-slate-400">Bấm nút <strong className={strong}>Thông tin</strong> để mở. Bảng gồm:</p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Thẻ thiết bị">tên sản phẩm (ví dụ ARGB HSL Controller 16X), tên phiên bản firmware và thời gian mạch đã chạy liên tục.</Point>
          <Point title="Bốn con số chính"><strong className={strong}>Nhiệt độ chip</strong>, <strong className={strong}>Khung hình</strong> (fps), <strong className={strong}>Số LED</strong> kèm kích thước nếu là ma trận, và <strong className={strong}>Dòng ước tính</strong>. Ô dòng chuyển màu cam và ghi rõ cần bao nhiêu mA khi giới hạn đặt quá thấp.</Point>
          <Point title="Hệ thống">bộ nhớ còn trống, dung lượng lưu tệp, giờ trên mạch, trạng thái Autosave (tự lưu).</Point>
          <Point title="Mạng">độ mạnh sóng WiFi, kênh, địa chỉ IP và địa chỉ MAC của mạch.</Point>
          <Point title="Hai nút"><strong className={strong}>Làm mới</strong> cập nhật lại số liệu. <strong className={strong}>Khởi động lại</strong> khởi động lại mạch.</Point>
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] gap-3 sm:gap-5 items-start">
          <Shot file="10-thong-tin-dien-thoai.webp" open={open} phone />
          <Shot file="11-thong-tin-may-tinh.webp" open={open} phone />
        </div>
        <Callout icon={<Info className="w-5 h-5 text-neon-blue-bright" />}>
          <p>Cần Happy Smart Light hỗ trợ? Chụp màn hình bảng Thông tin gửi kèm, kỹ thuật sẽ nắm tình trạng mạch nhanh hơn.</p>
        </Callout>
      </section>

      {/* Cổng LED */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Bảng Cổng LED</SectionHeading>
        <p className="text-xs text-slate-400">
          Trên máy tính, nút <strong className={strong}>Cổng LED</strong> mở bảng tổng quan: tổng số cổng, tổng số LED và giới hạn dòng. Mỗi cổng là một thẻ ghi số LED, loại LED, thứ tự màu và LED bắt đầu. Thanh nhỏ dưới mỗi thẻ cho biết cổng đó nằm ở đoạn nào trong toàn bộ dải.
        </p>
        <p className="text-xs text-slate-400">
          Bảng này chỉ để xem. Muốn sửa, bấm <strong className={strong}>Chỉnh sửa</strong> để mở trang cài đặt Đèn LED.
        </p>
        <Shot file="12-cong-led.webp" open={open} />
      </section>

      {/* Cấu hình */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Trang Cấu Hình</SectionHeading>
        <p className="text-xs text-slate-400">
          Bấm nút <strong className={strong}>Cấu hình</strong> để mở trang Cài đặt. Nút <strong className={strong}>Về màn hình điều khiển</strong> nằm riêng ở trên cùng để quay lại. Bên dưới là các thẻ, mỗi thẻ có một dòng mô tả:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SETTING_CARDS.map(({ name, desc }) => (
            <div key={name} className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
              <p className="text-xs text-slate-400"><strong className={strong}>{name}.</strong> {desc}</p>
            </div>
          ))}
        </div>

        <AreaHeading icon={<Cable className={iconClass} />}>Trang Đèn LED</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Bốn ô tóm tắt">Tổng LED, Cổng đang dùng, Nguồn cần khi trắng 100% và Giới hạn ABL. Ô nguồn cho biết bộ nguồn cần bao nhiêu ampe khi mọi LED sáng trắng hết cỡ, và mức thường gặp với đa số hiệu ứng. Ô giới hạn ghi kèm mức tối thiểu.</Point>
          <Point title="Nguồn và độ sáng">độ sáng chung, công tắc giới hạn độ sáng tự động (ABL), và ô <strong className={strong}>Dòng tối đa của nguồn</strong>, tức định mức thật của bộ nguồn.</Point>
          <Point title="Cổng LED">mỗi cổng một thẻ: loại LED, LED bắt đầu, số LED, thứ tự màu và vài tuỳ chọn như đảo chiều. Nút <strong className={strong}>Thêm cổng</strong> và <strong className={strong}>Bớt cổng</strong> ở cuối.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Nếu giới hạn dòng đặt quá thấp so với số LED, trang hiện một dòng cảnh báo màu cam kèm nút <strong className={strong}>Nhập định mức nguồn</strong>. Bấm nút này để nhảy tới ô Dòng tối đa của nguồn, nhập đúng định mức bộ nguồn bạn đang dùng (nguồn 10 A thì nhập 10000), rồi bấm <strong className={strong}>Lưu</strong> ở trên cùng.
        </p>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>Chỉ đổi loại LED và số LED khi bạn biết chắc LED đang lắp là loại gì. Sai loại LED có thể làm đèn sáng sai màu hoặc không sáng. Nếu chỉ xem, bấm <strong className="text-amber-300">Quay lại</strong> thay vì Lưu.</p>
        </Callout>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] gap-3 sm:gap-5 items-start">
          <Shot file="13-cau-hinh.webp" open={open} phone />
          <Shot file="14-den-led.webp" open={open} phone />
        </div>
      </section>

      {/* Sáng tối */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Nền Tối Hay Nền Sáng</SectionHeading>
        <p className="text-xs text-slate-400">
          Mặc định là nền tối, dễ nhìn khi đang chỉnh đèn trong phòng tối. Trên máy tính, bấm nút <strong className={strong}>Giao diện</strong> ở thanh bên trái để đổi sang nền sáng, bấm lần nữa để về nền tối. Trên điện thoại, đổi trong <strong className={strong}>Cấu hình → Giao diện</strong>.
        </p>
        <Shot file="15-giao-dien-sang.webp" open={open} />
      </section>

      {/* Bắt đầu nhanh */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Bắt Đầu Nhanh Trong 4 Bước</SectionHeading>
        <div className="space-y-3">
          <Step n={1} title="Chọn màu">
            <p>Mở tab <strong className={strong}>Màu sắc</strong> <Palette className="inline w-3.5 h-3.5 text-neon-blue-bright align-[-2px]" />. Bấm ô Màu chính, rồi kéo vòng màu hoặc bấm một ô màu nhanh.</p>
          </Step>
          <Step n={2} title="Chọn hiệu ứng và tinh chỉnh">
            <p>Mở tab <strong className={strong}>Hiệu ứng</strong>, gõ tên vào ô <Search className="inline w-3.5 h-3.5 text-neon-blue-bright align-[-2px]" /> Tìm hoặc bấm chip lọc, rồi bấm vào hiệu ứng. Bấm ngăn <strong className={strong}>Tùy chỉnh hiệu ứng</strong> ở đáy để chỉnh tốc độ. Thích thì bấm <Star className="inline w-3.5 h-3.5 text-neon-blue-bright align-[-2px]" /> để lưu vào Yêu thích.</p>
          </Step>
          <Step n={3} title="Lưu thành preset">
            <p>Mở tab <strong className={strong}>Presets</strong>, bấm <strong className={strong}>+ Preset</strong>, đặt tên rồi bấm <strong className={strong}>Lưu</strong>. Lần sau chỉ cần bấm vào preset đó.</p>
          </Step>
          <Step n={4} title="Kiểm tra mạch">
            <p>Bấm <strong className={strong}>Thông tin</strong>. Nếu ô Dòng ước tính màu cam, vào <strong className={strong}>Cấu hình → Đèn LED</strong> và nhập định mức bộ nguồn như hướng dẫn ở trên.</p>
          </Step>
        </div>
        <p className="text-[11px] text-slate-500">Ảnh chụp từ mạch thử nghiệm của Happy Smart Light. Tên mạch, số LED và các số liệu trên mạch của bạn sẽ khác.</p>
      </section>

      <ArtQuote accent={ACCENT}>
        Có chỗ nào chưa rõ khi dùng giao diện mới? Gọi hoặc nhắn Zalo cho Happy Smart Light qua số 0784 140 494, kèm ảnh chụp màn hình để được hỗ trợ nhanh hơn.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={PHOTOS}
        currentIndex={activeIndex}
        title="Ảnh giao diện SuperNova"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}

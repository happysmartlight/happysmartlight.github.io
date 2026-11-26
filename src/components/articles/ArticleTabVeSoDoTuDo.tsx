import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, Cable, Eye, FileInput, History, Keyboard, Layers, LifeBuoy, Lightbulb, ListChecks,
  PenTool, Route, Save, Send, ShieldCheck, Shapes,
} from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, Callout, ArtQuote } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";

const IMG = "/img/post-news/tab-ve-so-do-tu-do";
const ACCENT = "emerald" as const;

// Kích thước thật của ảnh, để trang không bị nhảy khi ảnh tải xong.
const PHOTO_LIST: { file: string; label: string; w: number; h: number }[] = [
  { file: "01-tong-quan.webp", label: "Tab Vẽ sơ đồ tự do: thanh trên, thanh tuỳ chọn, dải công cụ bên trái, khung vẽ ở giữa và cột phải gồm Dây và cổng, Kiểm tra, Nhóm, Gửi lên mạch. Ví dụ một mặt nạ LED 297 bóng chia 3 cổng", w: 1440, h: 900 },
  { file: "02-cong-cu.webp", label: "Dải công cụ bên trái và phím tắt của từng công cụ", w: 250, h: 490 },
  { file: "02b-thanh-tuy-chon.webp", label: "Thanh tuỳ chọn đổi theo công cụ đang cầm: Bút, Chữ nhật, Elip / Vòng, Tô vùng, Chữ, Tẩy, Đi dây", w: 1210, h: 288 },
  { file: "03-hinh-ve.webp", label: "Mỗi hình là một đoạn dây liền: đường thẳng có Bước LED 2, gấp khúc, chữ nhật theo viền, chữ nhật tô kín zigzag, vòng 28 LED, chữ HSL nét đơn, ô vuông được Tô vùng bên trong", w: 932, h: 692 },
  { file: "04-so-thu-tu.webp", label: "Phóng to là thấy số của từng LED. Rê chuột lên một ô: số LED, cột, hàng, nhóm, cổng và vị trí trong cổng", w: 668, h: 278 },
  { file: "05-doi-xung.webp", label: "Vẽ đối xứng trái – phải bằng Bút: nét đứt xanh là trục, nửa bên kia tự hiện và đi dây ngược lại để dây quay về", w: 1094, h: 734 },
  { file: "06-di-day.webp", label: "Công cụ Đi dây: bấm LED đầu rồi kéo qua các LED theo đường dây thật, số mới hiện ngay trong lúc kéo", w: 1094, h: 382 },
  { file: "07-day-va-cong.webp", label: "Mạch đang tick đặt số LED từng cổng khác sơ đồ: thẻ Dây và cổng báo “Mạch đặt …” và dòng “Mạch cần đặt”. Bấm dòng dây nhảy ở thẻ Kiểm tra để tới đúng chỗ đó", w: 1096, h: 464 },
  { file: "08-nhom-anh-nen.webp", label: "Mẫu trang phục robot tô màu theo nhóm, đặt trên ảnh nền để dò theo. Nhóm Mũ bảo hiểm đang khoá, nhóm Ngực đang vẽ", w: 1026, h: 780 },
  { file: "09-oneled.webp", label: "Hộp nhập file OneLED (file mẫu 5 vòng tròn): thông tin file, độ phân giải lưới tự chọn để không LED nào trùng ô, xem trước màu theo từng đoạn dây", w: 760, h: 476 },
  { file: "09b-oneled-trung-o.webp", label: "Giảm độ phân giải xuống ×1: chấm đỏ là LED rơi trùng ô, sẽ bị mất khỏi sơ đồ. Bấm Tự động để về mức an toàn", w: 760, h: 476 },
  { file: "10-gui-len-mach.webp", label: "Thẻ Gửi lên mạch: mạch Khớp gửi được, mạch thiếu LED bị chặn và có dòng nêu lý do", w: 304, h: 267 },
  { file: "11-qua-gioi-han.webp", label: "Hai hình đặt quá xa nhau: chỉ 384 LED nhưng lưới rộng 516 ô, vượt giới hạn 512 ô mỗi cạnh. Nhãn ở thanh trên chuyển đỏ, nút Gửi bị khoá", w: 1440, h: 820 },
  { file: "12-menu.webp", label: "Menu Sơ đồ trên thanh menu (khi đang ở tab này) và menu Xuất ▾ ở góc phải thanh trên", w: 564, h: 432 },
];

const PHOTOS: ZoomGalleryItem[] = PHOTO_LIST.map(({ file, label }) => ({ url: `${IMG}/${file}`, label, alt: label }));

const TOOLS: { key: string; name: string; desc: string }[] = [
  { key: "V", name: "Chọn", desc: "Kéo để khoanh vùng, bấm một LED để chọn riêng nó, giữ Shift để chọn thêm. Bấm đúp một LED để chọn cả đoạn dây liền mạch chứa nó." },
  { key: "H", name: "Kéo khung", desc: "Kéo để di chuyển khung nhìn. Đang cầm công cụ nào cũng giữ Space rồi kéo được." },
  { key: "B", name: "Bút", desc: "Kéo để vẽ từng ô theo đường chuột đi. Kéo nhanh thì các ô ở giữa vẫn được nối liền." },
  { key: "L", name: "Đường thẳng", desc: "Kéo một đường. Giữ Shift để ra đường ngang, dọc hoặc chéo 45°." },
  { key: "P", name: "Gấp khúc", desc: "Bấm từng điểm, Enter hoặc bấm đúp để chốt, chuột phải bỏ điểm vừa đặt, Esc bỏ cả đường." },
  { key: "R", name: "Chữ nhật", desc: "Viền hoặc tô kín, chọn góc dây vào. Giữ Shift để ra hình vuông." },
  { key: "O", name: "Elip / Vòng", desc: "Vòng LED theo số bóng bạn nhập, chọn điểm bắt đầu và chiều đi. Giữ Shift để ra hình tròn." },
  { key: "G", name: "Tô vùng", desc: "Bấm vào bên trong một viền LED khép kín để tô đầy, đi dây zigzag." },
  { key: "T", name: "Chữ", desc: "Gõ chữ, chọn chiều cao, bấm vào chỗ đặt góc trên trái của dòng chữ." },
  { key: "E", name: "Tẩy", desc: "Kéo qua các LED cần xoá. Đang cầm công cụ vẽ thì kéo chuột phải cũng xoá nhanh." },
  { key: "W", name: "Đi dây", desc: "Sửa thứ tự dây: kéo qua các LED theo đúng đường dây thật." },
];

const SHORTCUTS: { keys: string; desc: string }[] = [
  { keys: "Ctrl + Z / Ctrl + Y", desc: "Hoàn tác / làm lại, mỗi nét vẽ là một bước. Ctrl + Shift + Z cũng là làm lại" },
  { keys: "Ctrl + N / Ctrl + O / Ctrl + S", desc: "Sơ đồ mới / mở file / lưu file" },
  { keys: "Ctrl + A / Ctrl + C / Ctrl + X / Ctrl + V", desc: "Chọn tất cả / chép / cắt / dán tại chỗ con trỏ" },
  { keys: "Ctrl + D", desc: "Nhân bản vùng chọn ngay bên cạnh, bấm tiếp để ra thành dãy" },
  { keys: "Delete", desc: "Xoá các LED đang chọn" },
  { keys: "Phím mũi tên", desc: "Nhích vùng chọn từng ô" },
  { keys: "Space + kéo", desc: "Kéo khung nhìn với bất kỳ công cụ nào. Kéo chuột giữa cũng được" },
  { keys: "Lăn chuột", desc: "Phóng to, thu nhỏ tại chỗ con trỏ" },
  { keys: "+ / − / 0 / F", desc: "Phóng to / thu nhỏ / cỡ 100% / cả sơ đồ vừa khung" },
  { keys: "Shift", desc: "Vẽ thẳng (Đường thẳng, Gấp khúc), ra hình vuông hoặc tròn (Chữ nhật, Elip), chọn thêm (Chọn)" },
  { keys: "Chuột phải + kéo", desc: "Xoá nhanh khi đang cầm công cụ vẽ" },
  { keys: "Alt + kéo / Alt + lăn chuột", desc: "Dời / co giãn ảnh nền" },
  { keys: "Enter / Esc", desc: "Chốt đường gấp khúc / bỏ thao tác đang dở và bỏ chọn" },
];

const strong = "text-white";
const link = "text-emerald-400 hover:underline";
const iconClass = "w-4 h-4 text-emerald-400";
const kbd = "font-mono text-[11px] text-white bg-slate-800 border border-white/10 rounded px-1.5 py-0.5";

function Shot({ file, open, narrow = false }: { file: string; open: (url: string) => void; narrow?: "sm" | "md" | "lg" | false }) {
  const url = `${IMG}/${file}`;
  const photo = PHOTO_LIST.find((p) => p.file === file);
  const label = photo?.label ?? "Ảnh chụp tab Vẽ sơ đồ tự do";
  const width = narrow === "sm" ? "max-w-xs" : narrow === "md" ? "max-w-md" : narrow === "lg" ? "max-w-2xl" : "";
  return (
    <figure className={`mt-2 ${width}`}>
      <button
        type="button"
        onClick={() => open(url)}
        aria-label={`Xem lớn: ${label}`}
        className="group/zoom relative block w-full overflow-hidden rounded-lg border border-white/10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
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
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
      <span><strong className={strong}>{title}:</strong> {children}</span>
    </li>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4 p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-white/15 transition-colors">
      <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg shrink-0 h-fit">
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

export default function ArticleTabVeSoDoTuDo() {
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
      title="Tab Vẽ Sơ Đồ Tự Do Trong Tool ARGB HSL: Vẽ LED Theo Hình Bất Kỳ, Gửi Thẳng Lên Mạch Hoặc Xuất Cho xLights"
      metaTitle="Tab Vẽ Sơ Đồ Tự Do Tool ARGB HSL | Vẽ Sơ Đồ LED Theo Hình Bất Kỳ"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN SỬ DỤNG"
      description="Hướng dẫn dùng tab Vẽ sơ đồ tự do (tên cũ xLights Model) của Tool ARGB HSL v4.0.0: vẽ LED theo hình robot, chữ, logo, đạo cụ, mỗi hình thành một đoạn dây liền; chia cổng, nhóm, vẽ đối xứng, dò theo ảnh nền, nhập file OneLED, gửi sơ đồ thẳng lên mạch có lớp chặn an toàn, chạy thử thứ tự dây, soi từng bóng và xuất cho xLights."
      bannerImg={`${IMG}/banner.webp`}
      accent={ACCENT}
      path="/post-news/tab-ve-so-do-tu-do-tool-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
        <p>
          <strong className={strong}>Vẽ sơ đồ tự do</strong> là tab trong Tool ARGB HSL để vẽ vị trí và thứ tự của từng bóng LED trên một đạo cụ có hình bất kỳ: bộ giáp robot, đôi cánh, mặt nạ, chữ, logo, biển hiệu. Vẽ xong, bạn gửi sơ đồ thẳng lên mạch ARGB HSL để hiệu ứng chạy đúng theo hình, hoặc xuất model cho xLights.
        </p>
        <p className="mt-2">
          <strong className={strong}>Làm lại hoàn toàn trong Tool v4.0.0 (26/11/2026)</strong>, tên cũ là tab xLights Model. Vẽ tới đâu dây nối liền tới đó, số LED đếm từ 0 giống trên mạch. Gửi lên mạch, chạy thử thứ tự dây và soi từng bóng đều làm ngay trong tab; sơ đồ khoảng 16.000 LED vẫn vẽ mượt. Mọi ảnh trong bài bấm vào để xem lớn.
        </p>
      </Callout>

      {/* Dùng để làm gì */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Tab Này Dùng Để Làm Gì</SectionHeading>
        <p className="text-xs text-slate-400">
          Mạch ARGB HSL chỉ biết LED số 0, số 1, số 2… nối tiếp nhau trên dây. Muốn hiệu ứng hiện đúng hình của đạo cụ, mạch cần thêm một <strong className={strong}>sơ đồ</strong> cho biết bóng số mấy nằm ở ô nào. Tab Vẽ sơ đồ tự do giúp bạn vẽ sơ đồ đó bằng chuột, theo đúng đường dây thật.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5">Sơ đồ cho mạch (ledmap.json)</h3>
            <p className="text-xs text-slate-400">Bấm gửi là sơ đồ lên mạch, mạch khởi động lại và chạy hiệu ứng theo hình. Trước khi gửi, Tool kiểm tra sơ đồ có hợp với mạch không, quá cỡ thì không gửi.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5">Model cho xLights, Excel, CSV</h3>
            <p className="text-xs text-slate-400">Xuất model Custom (.xml) cho xLights, hoặc chép bảng dán thẳng vào ô Custom Model. Bản Excel tô màu theo từng phần, tiện in ra cho thợ đi dây.</p>
          </InfoCard>
        </div>
        <p className="text-xs text-slate-400">
          Màn LED hình chữ nhật đi dây zigzag đều đặn thì tab <strong className={strong}>Tạo sơ đồ LED</strong> làm nhanh hơn. Tab Vẽ sơ đồ tự do dành cho mọi hình còn lại: LED rải theo đường cong, nhiều mảnh rời, nhiều cổng, chỗ dày chỗ thưa.
        </p>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            <strong className="text-amber-300">Điều khiển bằng xLights?</strong> Khi chạy xLights, mạch ARGB HSL không được bật Mode 2D và không được có cấu hình 2D Mapping, xem bài <Link to="/post-news/luu-y-khi-su-dung-xlights-voi-argb-hsl/" className="text-amber-300 hover:underline">Lưu Ý Khi Sử Dụng xLights Với ARGB HSL</Link>. Với dự án chạy xLights, chỉ xuất model cho xLights, đừng gửi sơ đồ lên mạch. Mạch đã có sơ đồ thì xoá đi bằng nút <strong className="text-amber-300">🗑 Xoá trên mạch…</strong> ở tab Tạo sơ đồ LED.
          </p>
        </Callout>
      </section>

      {/* Chuẩn bị */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cần Chuẩn Bị Gì</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tool ARGB HSL">bản v4.0.0 trở lên trên máy tính. Tool đang cài tự báo khi có bản mới. Chưa có Tool? <Link to="/argb-hsl-tool-pc/" className={link}>Tải Tool ARGB HSL cho máy tính</Link>.</Point>
          <Point title="Thứ tự dây thật của đạo cụ">bóng nào nối với mạch trước, dây đi tiếp qua đâu, mỗi cổng của mạch kéo phần nào. Vẽ đúng thứ tự này là phần quan trọng nhất.</Point>
          <Point title="Ảnh chụp hoặc bản vẽ đạo cụ">không bắt buộc, nhưng đặt làm ảnh nền để dò theo thì nhanh và đúng tỉ lệ hơn.</Point>
          <Point title="Mạch ARGB HSL">chỉ cần khi gửi sơ đồ lên và chạy thử. Mạch phải online cùng mạng WiFi với máy tính, tìm thấy ở tab Thiết bị ARGB.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Vẽ và lưu sơ đồ không cần mạch. Bạn có thể vẽ trước trong lúc đạo cụ còn đang làm.
        </p>
      </section>

      {/* Màn hình */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Làm Quen Màn Hình</SectionHeading>
        <Shot file="01-tong-quan.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Thanh trên">tên file (dấu ● là còn thay đổi chưa lưu, dòng nhỏ bên dưới ghi giờ tự lưu), Mở…, Lưu, Hoàn tác, Làm lại, phóng to thu nhỏ và Vừa khung. Nhóm <strong className={strong}>Hiện</strong> bật tắt: Số (số trong ô), Màu theo dây (tắt thì tô màu theo nhóm), Chỗ dây nhảy, Ảnh nền.</Point>
          <Point title="Nhãn giới hạn">ở góc phải thanh trên, luôn hiện. Ví dụ “297 LED · 41 × 39 = 1599 ô · gửi lên mạch được” màu xanh, hoặc “quá giới hạn của mạch” màu đỏ. Cạnh đó là nút <strong className={strong}>Xuất ▾</strong>.</Point>
          <Point title="Thanh tuỳ chọn">ngay dưới thanh trên, đổi theo công cụ đang cầm.</Point>
          <Point title="Dải công cụ">cột hẹp bên trái, mỗi công cụ một phím tắt.</Point>
          <Point title="Khung vẽ">lưới ô vuông, mỗi ô là một chỗ đặt được một bóng LED. Góc dưới có chú thích: LED đầu của cổng, màu đổi dần theo thứ tự dây, LED cuối, chỗ dây nhảy.</Point>
          <Point title="Cột phải">4 thẻ <strong className={strong}>Dây và cổng</strong>, <strong className={strong}>Kiểm tra</strong>, <strong className={strong}>Nhóm</strong>, <strong className={strong}>Gửi lên mạch</strong>.</Point>
          <Point title="Dòng trạng thái">dưới cùng, báo kết quả thao tác vừa làm, ví dụ “Đã vẽ chữ nhật: thêm 85 LED, số 212 – 296”. Góc phải ghi thông tin ô đang rê chuột.</Point>
          <Point title="Thanh menu">khi đang ở tab này, thanh menu trên cùng có thêm các menu <strong className={strong}>Sơ đồ</strong>, <strong className={strong}>Sửa</strong>, <strong className={strong}>Xem</strong>.</Point>
        </ul>
      </section>

      {/* Các bước */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Làm Một Sơ Đồ Trong 7 Bước</SectionHeading>
        <div className="space-y-3">
          <Step n={1} title="Đặt ảnh nền (nếu có)">
            <p>Kéo ảnh chụp đạo cụ vào khung vẽ. Giữ <strong className={strong}>Alt</strong> rồi kéo để dời ảnh, Alt + lăn chuột để co giãn cho tới khi khoảng cách hai bóng LED trên ảnh bằng khoảng cách hai ô lưới. Vừa rồi thì tick <strong className={strong}>Khoá</strong> ở thẻ Nhóm.</p>
          </Step>
          <Step n={2} title="Vẽ theo đúng chiều tín hiệu">
            <p>Bắt đầu từ bóng nối với mạch, vẽ dần theo đường dây thật. Mỗi nét hay mỗi hình mới được nối vào cuối dây, nên vẽ theo thứ tự nào thì số LED đi theo thứ tự đó. Chọn công cụ hợp với từng phần: Bút cho đường cong, Elip / Vòng cho vòng LED, Chữ nhật tô kín cho mảng LED.</p>
          </Step>
          <Step n={3} title="Nhìn màu và số để kiểm tra">
            <p>Màu ô đổi dần từ xanh lá sang xanh dương theo thứ tự dây. LED đầu của mỗi cổng là ô trắng viền xanh lá, LED cuối có viền cam. Chỗ hai LED liền số mà nằm xa nhau có nét đứt đỏ: đó là chỗ phải nối dây ngoài.</p>
          </Step>
          <Step n={4} title="Sửa thứ tự nếu cần">
            <p>Dùng công cụ <strong className={strong}>Đi dây</strong> để kéo lại đường dây, hoặc chọn một vùng rồi bấm <strong className={strong}>Tự đi dây ▾</strong>, <strong className={strong}>Đảo chiều</strong>. Xem phần “Sửa thứ tự dây” bên dưới.</p>
          </Step>
          <Step n={5} title="Chia cổng">
            <p>Mạch có nhiều cổng LED thì mỗi cổng là một đoạn số liên tiếp. Chọn các LED của cổng sau rồi bấm <strong className={strong}>Thành cổng mới</strong>. Thẻ Dây và cổng ghi mỗi cổng cần bao nhiêu LED, bạn đặt đúng số đó cho từng cổng ở tab <strong className={strong}>Cấu hình phần cứng</strong>.</p>
          </Step>
          <Step n={6} title="Lưu file">
            <p>Bấm <strong className={strong}>Lưu</strong> (Ctrl + S). File có đuôi <strong className={strong}>.hslmodel</strong>, giữ cả nhóm, cổng và ảnh nền để mở lại sửa tiếp.</p>
          </Step>
          <Step n={7} title="Gửi lên mạch và chạy thử">
            <p>Tick mạch ở thẻ <strong className={strong}>Gửi lên mạch</strong>, bấm <strong className={strong}>Gửi sơ đồ lên mạch</strong>. Mạch khởi động lại để nhận sơ đồ. Sau đó bấm <strong className={strong}>Chạy thử thứ tự dây</strong> để xem điểm sáng chạy dọc theo dây trên đồ thật, hoặc bật <strong className={strong}>Soi LED</strong> để dò từng bóng.</p>
          </Step>
        </div>
      </section>

      {/* Công cụ vẽ */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Công Cụ Vẽ</SectionHeading>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-full sm:w-52 shrink-0">
            <Shot file="02-cong-cu.webp" open={open} />
          </div>
          <div className="grid grid-cols-1 gap-2 flex-1 min-w-0">
            {TOOLS.map(({ key, name, desc }) => (
              <div key={key} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3 items-start">
                <kbd className={`${kbd} shrink-0`}>{key}</kbd>
                <p className="text-xs text-slate-400"><strong className={strong}>{name}.</strong> {desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400">
          Phím một chữ chỉ ăn khi khung vẽ đang được chọn: bấm vào khung vẽ một lần nếu phím không có tác dụng. Phím <kbd className={kbd}>D</kbd> cũng chọn Bút.
        </p>

        <AreaHeading icon={<PenTool className={iconClass} />}>Thanh tuỳ chọn của từng công cụ</AreaHeading>
        <Shot file="02b-thanh-tuy-chon.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Nhóm">có ở hầu hết công cụ vẽ: LED sắp vẽ thuộc nhóm nào.</Point>
          <Point title="Bước LED (Bút, Đường thẳng, Gấp khúc)">mỗi bao nhiêu ô đặt một LED, 1 là sát nhau. Dây LED thưa thì đặt 2 hoặc 3 để sơ đồ đúng khoảng cách thật.</Point>
          <Point title="Chữ nhật">Kiểu <strong className={strong}>Viền</strong> (đi một vòng quanh viền từ góc dây vào) hoặc <strong className={strong}>Tô kín</strong> (Zigzag ngang hoặc Zigzag dọc). Ô <strong className={strong}>Dây vào ở góc</strong>: Trên trái, Trên phải, Dưới phải, Dưới trái.</Point>
          <Point title="Elip / Vòng">Số LED để “tự động” là bao nhiêu ô trên viền thì bấy nhiêu LED; nhập một số thì đúng chừng ấy LED rải đều quanh vòng. Chọn chỗ bắt đầu (Trên, Phải, Dưới, Trái) và chiều (Thuận kim đồng hồ, Ngược). Vòng quá nhỏ cho số LED đã nhập thì Tool không đặt và báo để bạn kéo rộng hơn.</Point>
          <Point title="Tô vùng">vẽ viền khép kín trước, rồi bấm vào bên trong. Chọn Zigzag ngang hoặc Zigzag dọc.</Point>
          <Point title="Chữ">gõ nội dung, chọn chiều cao theo số ô. <strong className={strong}>Chữ nét đơn</strong> là chữ in hoa không dấu, đi dây theo từng nét, hợp với dây LED uốn theo chữ. <strong className={strong}>Phông của máy</strong> vẽ chữ đậm bằng phông chữ của máy tính, mỗi điểm sáng là một LED, đi dây từng chữ cái. Rê chuột trên khung vẽ để thấy bóng mờ của dòng chữ trước khi bấm đặt.</Point>
          <Point title="Tẩy">khi xoá một LED ở giữa dây: <strong className={strong}>Dồn số các LED sau</strong>, hoặc <strong className={strong}>Giữ chỗ trên dây</strong> (bóng vẫn nằm trên dây nhưng không dùng trong sơ đồ, số của các LED sau không đổi). Giữ chỗ hợp với bóng bị che hay đoạn dây đi vòng ra sau đạo cụ.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Trong lúc kéo, hình hiện bóng mờ màu xanh kèm nhãn như “+85 LED”, thả chuột mới đặt. Ô đã có LED thì được bỏ qua, Tool không bao giờ vẽ đè lên LED đang có.
        </p>
      </section>

      {/* Dây liền */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Mỗi Hình Là Một Đoạn Dây Liền</SectionHeading>
        <p className="text-xs text-slate-400">
          Mỗi hình bạn vẽ đã có sẵn thứ tự dây: viền chữ nhật đi một vòng từ góc dây vào, chữ nhật tô kín đi zigzag, vòng đi một vòng từ điểm bắt đầu, chữ nét đơn đi từng nét. Hình mới nối tiếp vào cuối dây. Trong ảnh dưới, các hình được vẽ lần lượt nên số LED nối tiếp nhau từ hình này sang hình kia.
        </p>
        <Shot file="03-hinh-ve.webp" open={open} />
        <p className="text-xs text-slate-400">
          Ô quá nhỏ thì số tự ẩn cho đỡ rối. Phóng to (lăn chuột hoặc phím +) để thấy số, hoặc rê chuột lên một ô: khung nhỏ ghi số LED, cột, hàng, nhóm, cổng và LED thứ mấy của cổng. Bóng trước và bóng sau trên dây cũng được viền mờ, nhìn là biết dây đi hướng nào.
        </p>
        <Shot file="04-so-thu-tu.webp" open={open} narrow="lg" />
        <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
          <p>
            Các hình nằm rời nhau trên cùng một cổng thì giữa chúng là một chỗ <strong className={strong}>dây nhảy</strong>: ngoài đời bạn phải nối một đoạn dây từ bóng cuối của hình trước sang bóng đầu của hình sau. Nếu mỗi phần đi một cổng riêng của mạch, hãy chia cổng để không phải nối dây.
          </p>
        </Callout>
      </section>

      {/* Đối xứng */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Vẽ Đối Xứng</SectionHeading>
        <p className="text-xs text-slate-400">
          Với Bút, Đường thẳng và Gấp khúc, chọn <strong className={strong}>Vẽ đối xứng</strong>: Trái – phải hoặc Trên – dưới. Trục là đường nét đứt màu xanh nhạt, bấm <strong className={strong}>Trục giữa sơ đồ</strong> để đặt trục vào giữa phần đã vẽ. Vẽ một bên, bên kia tự hiện.
        </p>
        <Shot file="05-doi-xung.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Không tick chung số">nửa đối xứng là một đoạn riêng ngay sau nét gốc và đi ngược lại, để dây quay về liền mạch. Hợp với đôi cánh, hai bên áo đi một dây.</Point>
          <Point title="Tick chung số">hai bóng đối xứng đấu song song, dùng chung một số thứ tự. Hợp khi hai bên đạo cụ được cấp chung một đường tín hiệu và luôn sáng giống nhau.</Point>
          <Point title="Nhóm trái, phải">nếu có cặp nhóm kiểu “Vai trái” và “Vai phải”, nửa đối xứng tự vào nhóm bên kia.</Point>
        </ul>
      </section>

      {/* Sửa thứ tự dây */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Sửa Thứ Tự Dây</SectionHeading>
        <AreaHeading icon={<Route className={iconClass} />}>Công cụ Đi dây (W)</AreaHeading>
        <p className="text-xs text-slate-400">
          Bấm vào LED cuối cùng còn đúng thứ tự, rồi kéo qua các LED kế tiếp theo đúng đường dây thật. Số mới hiện ngay trong lúc kéo, các LED chưa kéo qua giữ thứ tự cũ và nối tiếp phía sau. Trong ảnh, khối LED vốn đi zigzag ngang được kéo lại theo cột dọc.
        </p>
        <Shot file="06-di-day.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Bắt đầu từ số">để “tự động” thì LED bấm đầu tiên giữ nguyên số. Nhập một số thì LED bấm đầu tiên nhận đúng số đó.</Point>
          <Point title="Đảo chiều đoạn">đảo thứ tự của đoạn dây liền mạch chứa LED vừa bấm.</Point>
          <Point title="Bắt đầu dây từ LED này">LED vừa bấm thành LED đầu của cổng, cả cổng xoay vòng theo. Dùng cho vòng LED mà dây vào nằm ở chỗ khác.</Point>
          <Point title="Nối tiếp vào sau LED…">bấm một LED của đoạn cần dời, bấm nút này, rồi bấm LED mà đoạn đó sẽ nối ngay sau.</Point>
        </ul>

        <AreaHeading icon={<Shapes className={iconClass} />}>Chọn một vùng rồi sửa (V)</AreaHeading>
        <p className="text-xs text-slate-400">
          Khoanh một vùng bằng công cụ Chọn, thanh tuỳ chọn hiện các nút:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Dời">kéo vùng chọn tới chỗ mới, hoặc nhích từng ô bằng phím mũi tên.</Point>
          <Point title="Nhân bản, Lật ngang, Lật dọc, Xoay 90°">Nhân bản đặt bản sao ngay bên phải hoặc bên dưới, bấm tiếp để ra thành dãy. Ctrl + C rồi Ctrl + V dán tại chỗ con trỏ.</Point>
          <Point title="Tự đi dây ▾">Zigzag ngang, Zigzag dọc, hoặc Theo đường gần nhất cho LED rải lộn xộn.</Point>
          <Point title="Đảo chiều">đảo thứ tự dây của các LED đang chọn.</Point>
          <Point title="Đổi nhóm ▾, Thành cổng mới, Xoá">chuyển nhóm, tách thành cổng riêng, xoá vùng chọn.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Dời, dán, lật hay xoay mà chỗ mới đè lên LED khác thì Tool không làm và báo ở dòng trạng thái, ví dụ “Không dời được: vướng 3 ô đang có LED khác (hoặc ra ngoài vùng vẽ)”. Bạn dời vùng chọn ra chỗ trống rồi làm lại.
        </p>
      </section>

      {/* Cổng, kiểm tra, nhóm */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cổng, Thẻ Kiểm Tra Và Nhóm</SectionHeading>
        <AreaHeading icon={<Cable className={iconClass} />}>Thẻ Dây và cổng</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Mỗi cổng một dòng">ví dụ “Cổng 1 · 148 LED · số 0 – 147”. Bấm vào dòng để chọn mọi LED của cổng đó. Trên khung vẽ, LED đầu mỗi cổng có nhãn “Cổng 1 · dây vào ở đây”.</Point>
          <Point title="Cổng mới từ LED đang chọn">các LED đang chọn (giữ thứ tự dây của chúng) thành một cổng mới ở cuối dây. <strong className={strong}>Gộp cổng</strong> nối cổng cuối vào cổng đứng trước.</Point>
          <Point title="So với mạch đang tick">chip <strong className={strong}>Vừa</strong> khi cổng nằm trong mức cho phép (và khớp số LED mạch đang tick đặt cho cổng đó), <strong className={strong}>Mạch đặt …</strong> khi mạch đang đặt số khác, <strong className={strong}>Quá …</strong> khi cổng nhiều LED hơn mức tối đa mỗi cổng của mạch (thường 1.024 LED).</Point>
          <Point title="Mạch cần đặt">dòng vàng ghi số LED từng cổng, ví dụ “cổng 1 = 148 LED, cổng 2 = 64 LED”. Bấm <strong className={strong}>Chép</strong> rồi đặt đúng số đó ở tab Cấu hình phần cứng. Tab Vẽ sơ đồ tự do không tự sửa cấu hình của mạch.</Point>
          <Point title="Dây và nguồn">dòng nhỏ ước lượng chiều dài dây và công suất nguồn, tính cho dây 60 LED/m, LED 5 V. Chỉ để tham khảo.</Point>
        </ul>
        <Shot file="07-day-va-cong.webp" open={open} />

        <AreaHeading icon={<ListChecks className={iconClass} />}>Thẻ Kiểm tra</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Chỗ dây nhảy">hai LED liền số trên cùng một cổng mà nằm cách xa nhau. Bấm dòng này để khung vẽ tới đúng chỗ đó, hai đầu được khoanh tròn trắng; bấm tiếp để tới chỗ kế. Nếu đúng là dây thật đi xa, ví dụ từ mắt trái sang mắt phải, ghi chú để nối dây khi lắp. Nếu là vẽ nhầm, sửa bằng công cụ Đi dây. LED vẽ thưa đều bằng Bước LED không bị tính là dây nhảy.</Point>
          <Point title="LED giữ chỗ">bóng có trên dây nhưng không dùng trong sơ đồ. Muốn bỏ hẳn: menu Sửa → Gỡ các LED giữ chỗ.</Point>
          <Point title="Số dùng chung">số thứ tự đang dùng cho nhiều bóng (vẽ đối xứng chung số). Bấm để chọn các bóng đó.</Point>
          <Point title="Cổng quá số LED, sơ đồ quá giới hạn">báo đỏ, xem phần Gửi lên mạch.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Mọi thứ ổn thì thẻ ghi “Không có chỗ dây nhảy, không thiếu số, không LED nào chồng nhau.”
        </p>

        <AreaHeading icon={<Layers className={iconClass} />}>Thẻ Nhóm</AreaHeading>
        <p className="text-xs text-slate-400">
          Nhóm dùng để tô màu, ẩn hoặc khoá từng phần của sơ đồ, ví dụ Mũ, Ngực, Tay trái. Nhóm <strong className={strong}>không ảnh hưởng số thứ tự</strong> LED. Tắt “Màu theo dây” ở thanh trên để khung vẽ tô màu theo nhóm.
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Thêm nhóm">nhóm mới thành nhóm đang vẽ. Bấm tên một nhóm để vẽ vào nhóm đó (chữ “đang vẽ”), bấm đúp để đổi tên.</Point>
          <Point title="Chuột phải tên nhóm">chọn mọi LED của nhóm, đổi tên, xoá nhóm (khi nhóm không còn LED).</Point>
          <Point title="hiện / ẩn">ẩn LED của nhóm trên khung vẽ cho đỡ rối, LED vẫn nằm trong sơ đồ.</Point>
          <Point title="khoá / mở khoá">nhóm đang khoá không bị chọn, dời hay xoá nhầm.</Point>
          <Point title="Mẫu trang phục robot">menu Sơ đồ → Mẫu trang phục robot nạp một bộ giáp 491 LED chia sẵn 21 nhóm: Mũ bảo hiểm, Kính mũ, Cổ, Vai, Ngực, Bắp tay, Cẳng tay, Đai lưng, Đùi, Gối, Ống chân, Giày. Dùng làm điểm bắt đầu rồi sửa theo bộ đồ của bạn.</Point>
        </ul>
      </section>

      {/* Ảnh nền */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Dò Theo Ảnh Nền</SectionHeading>
        <p className="text-xs text-slate-400">
          Kéo một ảnh (png, jpg, bmp, gif, webp) vào khung vẽ, hoặc bấm <strong className={strong}>Tải ảnh…</strong> ở cuối thẻ Nhóm. Ảnh nằm dưới lưới để bạn vẽ dò theo đường LED thật.
        </p>
        <Shot file="08-nhom-anh-nen.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Dời và co giãn">Alt + kéo để dời, Alt + lăn chuột để co giãn ảnh.</Point>
          <Point title="Độ mờ, Khoá, Bỏ ảnh">thanh trượt ở thẻ Nhóm chỉnh độ mờ. Tick Khoá khi ảnh đã vừa để không lỡ tay dời. Nút “Ảnh nền” ở thanh trên ẩn hiện ảnh.</Point>
          <Point title="Ảnh đi theo file">vị trí và độ mờ của ảnh được lưu trong file sơ đồ, nhưng chính file ảnh vẫn nằm ở chỗ cũ trên máy. Chép file sơ đồ sang máy khác thì chép kèm ảnh; thiếu ảnh, Tool báo “không tìm thấy ảnh nền” và vẫn mở sơ đồ bình thường.</Point>
        </ul>
      </section>

      {/* OneLED */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Nhập Sơ Đồ Từ OneLED (.SFMap)</SectionHeading>
        <p className="text-xs text-slate-400">
          Đã có mapping làm bằng phần mềm OneLED? Menu Sơ đồ → <strong className={strong}>Nhập file OneLED (.SFMap)…</strong>, bấm <strong className={strong}>Mở…</strong> rồi chọn file .SFMap, hoặc kéo file vào khung vẽ. Một hộp xem trước hiện ra:
        </p>
        <Shot file="09-oneled.webp" open={open} narrow="lg" />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Thông tin file">loại IC, số LED, khoảng cách giữa hai LED (pitch), số đoạn dây kèm số LED từng đoạn, ngày giờ file được lưu.</Point>
          <Point title="Độ phân giải lưới">OneLED đặt LED theo toạ độ tự do, Tool phải đưa mỗi LED vào một ô lưới. Mức này là số ô lưới trên mỗi khoảng cách giữa hai LED: càng cao lưới càng to nhưng càng ít LED rơi trùng ô. Khi mở hộp, Tool tự chọn mức nhỏ nhất mà không LED nào trùng ô; nút <strong className={strong}>Tự động</strong> chọn lại mức đó.</Point>
          <Point title="Lật trục Y">bật nếu hình xem trước bị ngược trên dưới so với trong OneLED.</Point>
          <Point title="Tô màu theo từng đoạn dây">mỗi đoạn dây của OneLED thành một nhóm riêng (OneLED 1, OneLED 2…) có màu riêng.</Point>
          <Point title="Kết quả">cỡ lưới, số LED giữ được, cỡ file sơ đồ ước tính. Bấm <strong className={strong}>Nạp vào canvas</strong> để đưa vào khung vẽ.</Point>
        </ul>
        <Shot file="09b-oneled-trung-o.webp" open={open} narrow="lg" />
        <p className="text-xs text-slate-400">
          Tool không bao giờ âm thầm bỏ LED. Hai LED rơi trùng một ô thì ô đó tô đỏ và hộp báo rõ số LED sẽ mất. Lưới quá cỡ cho mạch thì hộp cũng báo trước: vẫn nạp vào để xem hoặc xuất cho xLights được, nhưng muốn gửi lên mạch thì giảm độ phân giải.
        </p>
        <p className="text-xs text-slate-400">
          Sau khi nạp, thứ tự LED giữ đúng như trong OneLED: LED thứ bao nhiêu trên dây vẫn mang đúng số đó. Một số file OneLED đặc biệt có thể chưa đọc được; khi đó Tool báo lỗi, sơ đồ đang vẽ vẫn còn nguyên. Gửi file cho Happy Smart Light để được hỗ trợ.
        </p>
      </section>

      {/* Gửi lên mạch */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Gửi Sơ Đồ Lên Mạch</SectionHeading>
        <p className="text-xs text-slate-400">
          Thẻ <strong className={strong}>Gửi lên mạch</strong> ở cuối cột phải liệt kê các mạch Tool đang thấy, mỗi mạch một dòng: tên, địa chỉ IP, số LED và số cổng đang đặt. Chip bên phải so sơ đồ đang vẽ với mạch đó.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-full sm:w-72 shrink-0">
            <Shot file="10-gui-len-mach.webp" open={open} />
          </div>
          <ul className="text-xs text-slate-400 space-y-1.5 flex-1 min-w-0">
            <Point title="Khớp">mạch đang chạy đúng sơ đồ cỡ này (thường là sơ đồ bạn vừa gửi).</Point>
            <Point title="Gửi được">sơ đồ hợp với mạch, mạch đang chạy sơ đồ khác hoặc chưa có sơ đồ.</Point>
            <Point title="Thiếu … LED">sơ đồ cần nhiều LED hơn số LED mạch đang đặt. Không gửi được cho tới khi bạn tăng số LED của mạch ở tab Cấu hình phần cứng.</Point>
            <Point title="Quá sức chứa">sơ đồ vượt giới hạn của mạch: lưới quá lớn, hoặc file không vừa chỗ trống trong bộ nhớ mạch.</Point>
            <Point title="Offline, Đang đọc, Không đọc được">mạch chưa online, hoặc Tool chưa đọc được sức chứa của mạch.</Point>
          </ul>
        </div>
        <p className="text-xs text-slate-400">
          Tick các mạch cần gửi rồi bấm <strong className={strong}>Gửi sơ đồ lên N mạch</strong>. Mạch nào không hợp thì có dòng vàng “Không gửi cho … : lý do”, các mạch còn lại vẫn nhận. Ngay trước khi gửi, Tool đọc lại thông tin của từng mạch một lần nữa; không đọc được thì không gửi. Gửi xong, mạch khởi động lại để nhận sơ đồ.
        </p>

        <AreaHeading icon={<ShieldCheck className={iconClass} />}>Giới hạn an toàn</AreaHeading>
        <p className="text-xs text-slate-400">
          Sơ đồ quá lớn có thể làm mạch lỗi ngay lúc khởi động, lặp lại mỗi lần bật nguồn. Vì vậy Tool chặn từ lúc vẽ tới lúc gửi, giống tab Tạo sơ đồ LED. Sơ đồ không được gửi khi:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Một cạnh dài quá 512 ô">ngang hoặc dọc.</Point>
          <Point title="Tổng số ô quá 16.384">ngang × dọc của lưới.</Point>
          <Point title="Lưới lớn hơn sức chứa của mạch">số cổng × số LED mỗi cổng, ví dụ 2X Pro có 2 cổng × 1.024 LED.</Point>
          <Point title="Sơ đồ cần nhiều LED hơn mạch đang đặt">LED thừa trên sơ đồ sẽ không bao giờ sáng.</Point>
          <Point title="File sơ đồ lớn hơn chỗ trống">trong bộ nhớ của mạch.</Point>
        </ul>
        <Shot file="11-qua-gioi-han.webp" open={open} />
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Giới hạn tính theo <strong className="text-amber-300">số ô của lưới</strong> (khung bao ngang × dọc), không theo số LED. Hai hình đặt cách nhau 500 ô thì lưới rộng hơn 500 ô dù chỉ có vài trăm LED. Hãy dồn các phần của sơ đồ lại gần nhau; với file OneLED thì nhập lại với độ phân giải thấp hơn.
          </p>
        </Callout>

        <AreaHeading icon={<Send className={iconClass} />}>Chạy thử thứ tự dây và Soi LED</AreaHeading>
        <p className="text-xs text-slate-400">
          Hai nút dưới nút Gửi chỉ bấm được với mạch đang tick mà đang chạy đúng sơ đồ này (chip <strong className={strong}>Khớp</strong>). Gửi sơ đồ trước, chờ mạch khởi động lại.
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Chạy thử thứ tự dây">từng đoạn LED sáng lần lượt theo đúng thứ tự dây trên đồ thật. Điểm sáng chạy liền mạch dọc theo dây là sơ đồ đúng; nhảy lung tung là có chỗ vẽ sai thứ tự. Xong, mạch trở về hiệu ứng đang chạy.</Point>
          <Point title="Soi LED">bật nút, rê chuột lên một LED trên sơ đồ: đúng bóng đó sáng trên đồ thật. Rất tiện để dò bóng bị đấu nhầm. Tắt nút hoặc chuyển sang tab khác, mạch về như trước khi soi.</Point>
          <Point title="Mạch đang phát show thì không chạy">nếu mạch đang phát show (ví dụ show ghi từ tab Timecode), Tool từ chối và báo “mạch đang phát show, hãy dừng show trước”, để không làm dừng show của bạn. Dừng show rồi thử lại.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Muốn sửa sơ đồ đang nằm trên mạch: tick mạch ở thẻ Gửi lên mạch, vào menu Sơ đồ → <strong className={strong}>Đọc sơ đồ từ mạch đang tick</strong>. Sơ đồ về khung vẽ, số LED giữ đúng như trên mạch.
        </p>
      </section>

      {/* File */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Lưu, Mở Và Xuất File</SectionHeading>
        <Shot file="12-menu.webp" open={open} narrow="md" />
        <AreaHeading icon={<Save className={iconClass} />}>File sơ đồ .hslmodel</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Lưu, Lưu thành file khác…">lưu sơ đồ thành file .hslmodel: LED, thứ tự dây, cổng, nhóm, vẽ đối xứng và ảnh nền.</Point>
          <Point title="Mở…">mở file .hslmodel, file <strong className={strong}>.xlmodel</strong> của tab xLights Model đời cũ, file ledmap.json, hoặc file OneLED .SFMap. Kéo file vào khung vẽ cũng được. File cũ có tên bộ phận tiếng Anh thì tên tự đổi sang tiếng Việt.</Point>
          <Point title="Có thay đổi chưa lưu">mở file khác hay tạo sơ đồ mới (Ctrl + N), Tool hỏi có lưu lại trước không.</Point>
        </ul>
        <AreaHeading icon={<FileInput className={iconClass} />}>Nút Xuất ▾</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="File ledmap.json cho mạch">số LED đếm từ 0, ô trống là -1, giống file Tool gửi lên mạch. Sơ đồ quá giới hạn thì Tool cảnh báo trước khi lưu, mặc định là không lưu.</Point>
          <Point title="Model cho xLights (.xml)">model kiểu Custom, nhập vào xLights.</Point>
          <Point title="Excel (.xlsx)">bảng ô tô màu theo nhóm, có số hàng, số cột.</Point>
          <Point title="CSV">bảng số thuần.</Point>
          <Point title="Chép bảng để dán vào Excel / xLights">chép vào bộ nhớ tạm, dán vào Excel hoặc ô Custom Model của xLights.</Point>
        </ul>
        <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
          <p>
            Bản cho xLights, Excel và CSV đếm số LED <strong className={strong}>từ 1</strong>, vì xLights coi 0 là ô trống. LED số 0 trong tab chính là LED số 1 trong xLights. File ledmap.json cho mạch thì đếm từ 0.
          </p>
        </Callout>
      </section>

      {/* Hoàn tác, tự lưu */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Hoàn Tác Và Tự Lưu</SectionHeading>
        <AreaHeading icon={<History className={iconClass} />}>Hoàn tác theo từng nét</AreaHeading>
        <p className="text-xs text-slate-400">
          Ctrl + Z bỏ cả nét vừa vẽ, không phải từng ô; Ctrl + Y làm lại. Thao tác không làm đổi gì thì không tính bước. Mở hoặc tạo sơ đồ khác thì lịch sử hoàn tác của sơ đồ cũ được xoá, nên Ctrl + Z không bao giờ đưa sơ đồ cũ đè lên file vừa mở. Lỡ tay <strong className={strong}>Xoá hết sơ đồ…</strong> (menu Sửa) thì Ctrl + Z vẫn lấy lại được.
        </p>
        <AreaHeading icon={<LifeBuoy className={iconClass} />}>Tự lưu bản vẽ</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Lưu liên tục">mỗi thay đổi được Tool tự ghi lại sau chưa tới 2 giây. App tắt đột ngột (sập, mất điện, tắt nhầm) thì mở lại tab là bản vẽ đang làm dở tự quay về (thoát bình thường cũng vậy), dòng trạng thái báo “Đã mở lại bản vẽ đang làm dở”.</Point>
          <Point title="Bản chụp mỗi 5 phút">trong lúc vẽ, cứ 5 phút Tool giữ thêm một bản, giữ 20 bản gần nhất. Mở bằng menu Sơ đồ → <strong className={strong}>Mở bản tự lưu…</strong>, tên file là ngày giờ chụp. Mở xong, bấm Lưu để chọn chỗ lưu thành file của bạn; Ctrl + Z quay về bản đang vẽ trước đó.</Point>
          <Point title="An toàn khi mở lại">nếu lần trước app tắt đúng lúc đang mở lại bản vẽ, lần sau Tool không tự mở bản đó nữa mà báo bản vẽ vẫn còn ở Mở bản tự lưu…</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Tự lưu chỉ để phòng sự cố trên chính máy đó. Muốn giữ lâu dài, gửi cho người khác hay mở ở máy khác, hãy Lưu thành file .hslmodel.
        </p>
      </section>

      {/* Phím tắt */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Phím Tắt</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SHORTCUTS.map(({ keys, desc }) => (
            <div key={keys} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3 items-start">
              <Keyboard className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400"><kbd className={kbd}>{keys}</kbd> <span className="ml-1">{desc}</span></p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">Phím chọn công cụ (V, H, B, L, P, R, O, G, T, E, W) nằm ở phần Công cụ vẽ. Nếu phím không ăn, bấm vào khung vẽ một lần rồi thử lại.</p>
      </section>

      {/* Mẹo */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Mẹo Khi Làm Sơ Đồ Cho Đạo Cụ</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Vẽ đúng chiều tín hiệu ngay từ đầu">bắt đầu từ bóng nối với mạch, đi theo dây. Sửa thứ tự sau vẫn được, nhưng vẽ đúng từ đầu thì nhanh hơn nhiều.</Point>
          <Point title="Mỗi phần lớn một cổng">đạo cụ có nhiều mảnh rời (mũ, ngực, tay) thì cho mỗi mảnh một cổng của mạch, bớt được dây nối và dễ sửa khi hỏng.</Point>
          <Point title="Chạy thử trước khi lắp hoàn thiện">gửi sơ đồ, bấm Chạy thử thứ tự dây khi đạo cụ còn dễ tháo, sai chỗ nào sửa chỗ đó.</Point>
          <Point title="Đặt số LED từng cổng cho khớp">làm theo dòng “Mạch cần đặt” ở thẻ Dây và cổng, nếu không hiệu ứng sẽ lệch giữa các phần.</Point>
          <Point title="Giữ file trước buổi diễn">lưu file .hslmodel và một bản ledmap.json. Có sự cố thì mở file và gửi lại lên mạch.</Point>
        </ul>
        <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
          <p>
            Làm trang phục LED biểu diễn? Xem thêm <Link to="/post-news/trang-phuc-led-robot-dance-happy-smart-light/" className={link}>Trang Phục LED Robot Dance</Link>, và bài <Link to="/post-news/tab-timecode-tool-argb-hsl/" className={link}>Tab Timecode</Link> để dựng show theo nhạc, chia mạch thành nhiều phân đoạn chạy hiệu ứng riêng.
          </p>
        </Callout>
        <p className="text-[11px] text-slate-500">Ảnh chụp từ Tool ARGB HSL v4.0.0 với dữ liệu và mạch mẫu. Tên mạch, địa chỉ IP và số LED trên máy của bạn sẽ khác.</p>
      </section>

      <ArtQuote accent={ACCENT}>
        Cần hỗ trợ làm sơ đồ cho đạo cụ đầu tiên? Gọi hoặc nhắn Zalo cho Happy Smart Light qua số 0784 140 494, gửi kèm file .hslmodel hoặc ảnh chụp màn hình tab Vẽ sơ đồ tự do để được hỗ trợ nhanh hơn.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={PHOTOS}
        currentIndex={activeIndex}
        title="Ảnh tab Vẽ sơ đồ tự do"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}

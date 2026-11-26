import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, Cable, Eye, FileJson, Grid3x3, Keyboard, LayoutGrid, Lightbulb, ListChecks,
  MousePointerClick, ScanLine, ShieldAlert,
} from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, Callout, ArtQuote } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";

const IMG = "/img/post-news/tab-tao-so-do-led";
const ACCENT = "emerald" as const;

// Kích thước thật của ảnh, để trang không bị nhảy khi ảnh tải xong. Thứ tự = thứ tự trong bài
// (nút trái / phải của khung xem lớn đi theo thứ tự này).
const PHOTO_LIST: { file: string; label: string; w: number; h: number }[] = [
  { file: "01-tong-quan.webp", label: "Tab Tạo sơ đồ LED: bên trái 3 bước thiết lập, giữa là sơ đồ, bên phải là bước 4 Gửi lên mạch và Kiểm tra trên mạch thật", w: 1600, h: 956 },
  { file: "02-kich-thuoc.webp", label: "Bước 1 Kích thước: ô Ngang × Dọc, các cỡ có sẵn, nút Theo mạch và dòng giới hạn theo mạch đang tick", w: 656, h: 414 },
  { file: "03-di-day.webp", label: "Bước 2 Đi dây: bấm vào góc dây vào trên hình mini, chọn hướng chạy và cách đi khi hết hàng; câu bên dưới đọc lại lựa chọn bằng lời", w: 656, h: 614 },
  { file: "03b-ten-file.webp", label: "Bước 3 Tên và file: đặt tên sơ đồ, mở file đã lưu, lưu ra máy tính hoặc chép nội dung", w: 656, h: 256 },
  { file: "04-hien-thi-day.webp", label: "Ma trận 8 × 8 đi zigzag ngang: LED 0 nền trắng viền xanh lá, LED cuối viền cam, cung vàng ở mép là chỗ dây quay đầu", w: 1536, h: 1544 },
  { file: "05-doc-ve-dau-cot.webp", label: "Dây vào ở góc dưới phải, chạy dọc, hết cột thì về đầu cột kế: mũi tên vàng ở mép dưới chỉ chiều chạy của từng cột", w: 1600, h: 1120 },
  { file: "13-o-nho.webp", label: "Ma trận 32 × 32: ô nhỏ nên ẩn số, nhưng độ sáng tăng dần trong từng hàng vẫn cho thấy chiều tín hiệu", w: 1536, h: 1544 },
  { file: "06-o-khong-gan-led.webp", label: "Màn tròn trên lưới 9 × 9: các góc không gắn LED được tắt, dây đi thẳng sang LED kế nên chỉ tốn 69 LED", w: 1536, h: 1544 },
  { file: "12-tu-do.webp", label: "Chế độ Tự do: số thứ tự LED là thứ tự bạn bấm vào từng ô, dùng cho cách đi dây bất kỳ", w: 1536, h: 1544 },
  { file: "07-ghep-tam.webp", label: "Ghép 2 tấm 16 × 16 nối ngang: vạch trắng ngăn hai tấm, dây đi hết tấm đầu mới sang tấm kế", w: 1600, h: 1120 },
  { file: "08-the-mach.webp", label: "Bước 4: mỗi mạch một thẻ với nhãn Khớp, Đang 32×16, Thiếu 128 LED, Chưa có sơ đồ, Offline. Mạch không nhận được sơ đồ được nêu lý do dưới nút Gửi", w: 636, h: 1262 },
  { file: "10-theo-mach.webp", label: "Bấm Theo mạch: sơ đồ lấy đúng cỡ 16 × 8 của mạch đang tick, thẻ mạch chuyển sang Khớp", w: 1600, h: 870 },
  { file: "11-chay-thu.webp", label: "Kiểm tra trên mạch thật: nút Chạy thử vạch quét", w: 636, h: 290 },
  { file: "09-canh-bao.webp", label: "Sơ đồ cần nhiều LED hơn mạch đang cấu hình: dòng giới hạn ở bước 1 chuyển sang màu đỏ", w: 656, h: 414 },
];

const PHOTOS: ZoomGalleryItem[] = PHOTO_LIST.map(({ file, label }) => ({ url: `${IMG}/${file}`, label, alt: label }));

const CHIPS: { chip: string; tone: string; desc: string }[] = [
  { chip: "Khớp", tone: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30", desc: "Mạch đang chạy sơ đồ đúng cỡ này. Gửi được, và chạy thử vạch quét được." },
  { chip: "Chưa có sơ đồ", tone: "text-slate-300 bg-slate-500/10 border-slate-500/30", desc: "Mạch chưa có sơ đồ LED nào. Gửi được." },
  { chip: "Đang 32×16", tone: "text-amber-300 bg-amber-500/10 border-amber-500/30", desc: "Mạch đang chạy một sơ đồ cỡ khác. Gửi được, sơ đồ mới sẽ thay sơ đồ cũ." },
  { chip: "Thiếu N LED", tone: "text-red-300 bg-red-500/10 border-red-500/30", desc: "Sơ đồ cần nhiều LED hơn số LED mạch đang cấu hình. Tool không gửi cho mạch này." },
  { chip: "Quá sức chứa", tone: "text-red-300 bg-red-500/10 border-red-500/30", desc: "Sơ đồ lớn hơn mức mạch chạy được, hoặc file lớn hơn chỗ trống trong bộ nhớ mạch. Tool không gửi." },
  { chip: "Offline", tone: "text-slate-400 bg-slate-500/10 border-slate-500/20", desc: "Mạch đang mất kết nối, không tick được." },
];

const LIMITS: { title: string; desc: string }[] = [
  { title: "Mỗi cạnh tối đa 512 ô", desc: "Ngang và Dọc, mỗi chiều không quá 512." },
  { title: "Tổng tối đa 16 384 ô", desc: "Ngang × Dọc không quá 16 384, mức cao nhất firmware nhận." },
  { title: "Không quá sức chứa của mạch", desc: "Số cổng × 1 024 LED mỗi cổng: mạch 2X Pro chạy tối đa 2 048 LED (2 cổng), mạch 4X tối đa 4 096 LED (4 cổng)." },
  { title: "Không cần nhiều LED hơn mạch đang cấu hình", desc: "Số LED khai báo cho các cổng ở Tab Cấu hình phần cứng phải đủ cho sơ đồ. Mạch cấu hình nhiều LED hơn sơ đồ thì chỉ có cảnh báo vàng." },
  { title: "Vừa chỗ trống trong bộ nhớ mạch", desc: "File sơ đồ cộng thêm khoảng 16 kB dự phòng phải nhỏ hơn chỗ còn trống. Thiếu chỗ thì xoá bớt ảnh hoặc preset trên mạch." },
];

const SHORTCUTS: { keys: string; desc: string }[] = [
  { keys: "Ctrl + Z", desc: "Hoàn tác, tới 60 bước: đổi cỡ, đổi cách đi dây, bật tắt ô, ghép tấm, mở file" },
  { keys: "Ctrl + lăn chuột", desc: "Phóng to, thu nhỏ sơ đồ. Nút Vừa khung đưa cả sơ đồ về vừa khung nhìn" },
  { keys: "Rê chuột lên ô", desc: "Xem số LED, cột và hàng của ô đó, kể cả khi ô quá nhỏ để hiện số" },
  { keys: "Bấm / kéo trên ô", desc: "Chế độ Chữ nhật: tắt hoặc bật ô có gắn LED. Chế độ Tự do: đánh số theo thứ tự bấm" },
];

const strong = "text-white";
const link = "text-emerald-400 hover:underline";
const iconClass = "w-4 h-4 text-emerald-400";

type ShotSize = "full" | "md" | "sm" | "xs";
const SHOT_WIDTH: Record<ShotSize, string> = { full: "", md: "max-w-xl", sm: "max-w-sm", xs: "max-w-[300px]" };

function Shot({ file, open, size = "full" }: { file: string; open: (url: string) => void; size?: ShotSize }) {
  const url = `${IMG}/${file}`;
  const photo = PHOTO_LIST.find((p) => p.file === file);
  const label = photo?.label ?? "Ảnh chụp tab Tạo sơ đồ LED";
  return (
    <figure className={`mt-2 ${SHOT_WIDTH[size]}`}>
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

export default function ArticleTabTaoSoDoLed() {
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
      title="Tab Tạo Sơ Đồ LED Trong Tool ARGB HSL: Vẽ Sơ Đồ Ma Trận, Gửi Lên Mạch An Toàn"
      metaTitle="Tab Tạo Sơ Đồ LED Tool ARGB HSL | Sơ Đồ Ma Trận ledmap.json"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN SỬ DỤNG"
      description="Hướng dẫn dùng tab Tạo sơ đồ LED của Tool ARGB HSL v4.0.0: nhập kích thước, chọn cách đi dây bằng hình, đọc chiều tín hiệu ngay trên sơ đồ, ghép nhiều tấm, gửi sơ đồ lên nhiều mạch, chạy thử vạch quét, và vì sao Tool chặn sơ đồ quá lớn để mạch không lỗi khi khởi động."
      bannerImg={`${IMG}/banner.webp`}
      accent={ACCENT}
      path="/post-news/tab-tao-so-do-led-tool-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
        <p>
          <strong className={strong}>Sơ đồ LED</strong> (file <strong className={strong}>ledmap.json</strong> trên mạch) cho mạch ARGB HSL biết LED số mấy nằm ở ô nào của màn LED. Có sơ đồ đúng thì hiệu ứng 2D, ảnh và GIF hiện đúng hình, dù dây LED đi zigzag, đi dọc hay ghép từ nhiều tấm. Tab <strong className={strong}>Tạo sơ đồ LED</strong> (tên cũ <strong className={strong}>Gen JSON Matrix</strong>) dùng để vẽ sơ đồ đó và gửi lên mạch.
        </p>
        <p className="mt-2">
          <strong className={strong}>Làm mới trong Tool v4.0.0 (26/11/2026):</strong> 4 bước rõ ràng, chọn góc dây vào bằng hình, sơ đồ cho thấy chiều tín hiệu mà không vẽ gì đè lên ô LED, mỗi mạch một thẻ báo Khớp hay Thiếu LED, ghép nhiều tấm, hoàn tác bằng Ctrl + Z, chạy thử vạch quét trên mạch thật. Quan trọng nhất: <strong className={strong}>sơ đồ quá lớn so với mạch bị chặn</strong>, không gửi được nữa. Mọi ảnh trong bài đều bấm vào để xem lớn.
        </p>
      </Callout>

      {/* Chuẩn bị */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cần Chuẩn Bị Gì</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tool ARGB HSL">bản v4.0.0 trở lên trên máy tính. Tool đang cài sẽ tự báo khi có bản mới. Chưa có Tool? <Link to="/argb-hsl-tool-pc/" className={link}>Tải Tool ARGB HSL cho máy tính</Link>.</Point>
          <Point title="Mạch ARGB HSL">2X Pro, 4X hoặc 16X, kết nối cùng mạng WiFi với máy tính. Mạch tìm thấy ở tab Thiết bị ARGB tự hiện thành một thẻ ở cột Gửi lên mạch.</Point>
          <Point title="Số LED của mạch">khai báo đúng số LED trên từng cổng ở tab <strong className={strong}>Cấu hình phần cứng</strong> trước. Tool so sơ đồ với con số này.</Point>
          <Point title="Biết màn LED đi dây thế nào">dây tín hiệu vào ở góc nào, LED chạy theo hàng ngang hay cột dọc, hết hàng thì dây quay đầu (zigzag) hay chạy về đầu hàng kế. Nhìn mặt sau tấm LED: mũi tên in trên dải LED, hoặc chữ DIN (vào) và DOUT (ra), cho biết chiều tín hiệu.</Point>
        </ul>
      </section>

      {/* Màn hình */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Làm Quen Màn Hình</SectionHeading>
        <p className="text-xs text-slate-400">
          Tab chia 3 cột, đi theo 4 bước đánh số. Cột trái là <strong className={strong}>① Kích thước</strong>, <strong className={strong}>② Đi dây</strong>, <strong className={strong}>③ Tên và file</strong>. Cột giữa là sơ đồ, luôn vừa khung, mọi thay đổi hiện ngay. Cột phải là <strong className={strong}>④ Gửi lên mạch</strong> và khung <strong className={strong}>Kiểm tra trên mạch thật</strong>. Các lệnh chính cũng nằm ở menu <strong className={strong}>Sơ đồ LED</strong> trên thanh menu khi tab đang mở.
        </p>
        <Shot file="01-tong-quan.webp" open={open} />
      </section>

      {/* Các bước */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Tạo Một Sơ Đồ Trong 4 Bước</SectionHeading>
        <div className="space-y-3">
          <Step n={1} title="Kích thước">
            <p>Gõ số cột vào ô <strong className={strong}>Ngang</strong>, số hàng vào ô <strong className={strong}>Dọc</strong>, hoặc bấm một cỡ có sẵn: 8×8, 16×16, 8×32, 16×32, 32×32. Góc phải thẻ ghi số LED sơ đồ cần.</p>
            <p>Nút <strong className={strong}>Theo mạch</strong> lấy đúng cỡ của mạch đang tick: cỡ sơ đồ mạch đang dùng, mạch chưa có sơ đồ thì chia số LED của mạch thành một hình chữ nhật gần vuông nhất (ví dụ 300 LED thành 20 × 15).</p>
            <p>Dòng chữ xanh bên dưới cho biết sơ đồ được lớn tới đâu với các mạch đang tick, ví dụ “Tối đa 4096 ô cho mạch đang tick, mạch đang cấu hình 256 LED”. Ô nhập không cho gõ quá mức này, cỡ có sẵn nào quá mức thì bị mờ.</p>
          </Step>
          <Shot file="02-kich-thuoc.webp" open={open} size="sm" />
          <Step n={2} title="Đi dây">
            <p><strong className={strong}>Bấm vào góc</strong> của hình mini, nơi dây tín hiệu đi vào màn (đó là LED số 0). Hình mini vẽ lại đường dây theo lựa chọn của bạn, mũi tên xanh chỉ chỗ dây vào.</p>
            <p><strong className={strong}>Hướng chạy</strong>: Ngang hoặc Dọc. <strong className={strong}>Hết hàng thì</strong>: Quay đầu (zigzag, kiểu thường gặp ở tấm LED dẻo) hoặc Về đầu hàng (mỗi hàng chạy cùng một chiều). Chọn Dọc thì chữ đổi thành “Hết cột thì”, “Về đầu cột”.</p>
            <p>Khung chữ bên dưới đọc lại lựa chọn bằng lời, ví dụ “Dây vào ở góc trên trái, chạy ngang, hết hàng thì quay đầu (zigzag)”. Đối chiếu câu này với mặt sau tấm LED trước khi gửi.</p>
          </Step>
          <Shot file="03-di-day.webp" open={open} size="sm" />
          <Step n={3} title="Tên và file">
            <p>Đặt <strong className={strong}>Tên</strong> cho sơ đồ, tên này được lưu trong file. <strong className={strong}>💾 Lưu file</strong> lưu sơ đồ ra máy tính để giữ bản gốc. <strong className={strong}>📂 Mở file…</strong> mở lại file đã lưu để xem và sửa. <strong className={strong}>📋 Chép JSON</strong> chép nội dung sơ đồ để dán vào chỗ khác.</p>
            <p>Mở file chỉ nạp sơ đồ lên màn hình, không ghi gì vào mạch. Sơ đồ đi dây theo kiểu thường gặp thì Tool tự nhận ra cách đi dây và đặt sẵn các lựa chọn ở bước 2. Sơ đồ đi dây kiểu riêng thì giữ nguyên số thứ tự trong file; sửa một ô là sơ đồ được đánh số lại theo bước 2.</p>
          </Step>
          <Shot file="03b-ten-file.webp" open={open} size="sm" />
          <Step n={4} title="Gửi lên mạch">
            <p>Ở cột phải, <strong className={strong}>bấm vào thẻ</strong> của mạch cần nhận (bấm chỗ nào trên thẻ cũng được). Xem nhãn bên phải thẻ: Khớp, Chưa có sơ đồ hay Đang 32×16 là gửi được; Thiếu LED hay Quá sức chứa là Tool sẽ không gửi cho mạch đó. Ý nghĩa từng nhãn có ở phần Thẻ mạch bên dưới.</p>
            <p>Bấm <strong className={strong}>⬆ Gửi sơ đồ lên N mạch</strong>. Ngay trước khi gửi, Tool đọc lại thông tin của từng mạch một lần nữa; mạch nào không đọc được thì không gửi. Gửi xong mạch tự khởi động lại để nhận sơ đồ, dòng trạng thái dưới sơ đồ báo “Đã gửi sơ đồ và khởi động lại… Mạch lên lại sau vài giây”.</p>
            <p>Mạch lên lại rồi thì bấm <strong className={strong}>▶ Chạy thử vạch quét</strong> để kiểm tra trên đèn thật, xem phần Chạy thử bên dưới.</p>
          </Step>
        </div>
      </section>

      {/* Đọc sơ đồ */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Đọc Sơ Đồ: Nhìn Là Biết Dây Đi Đâu</SectionHeading>
        <p className="text-xs text-slate-400">
          Mỗi ô là một LED, số trong ô là thứ tự của LED đó trên dây. Tool không vẽ mũi tên hay đường dây đè lên ô, mà dùng màu và các dấu ở lề:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tối → sáng là chiều tín hiệu">trong mỗi hàng (hoặc mỗi cột khi chạy dọc), ô đầu hàng tối nhất, ô cuối hàng sáng nhất. Nhìn hàng sáng dần về bên nào là biết dây chạy về bên đó.</Point>
          <Point title="Xanh lá → xanh dương theo cả dây">sắc màu đổi dần từ LED đầu tới LED cuối, nên hàng nằm gần đầu dây hơi xanh lá, hàng gần cuối dây hơi xanh dương.</Point>
          <Point title="LED 0">ô nền trắng, viền xanh lá: chỗ dây tín hiệu đi vào. Mũi tên xanh ở lề chỉ vào ô này.</Point>
          <Point title="LED cuối">ô viền cam. Mũi tên cam nét đứt <strong className={strong}>Ra tấm kế</strong> ở lề là chỗ dây đi ra, nối sang tấm LED tiếp theo nếu có.</Point>
          <Point title="Cung vàng ở mép">chỗ dây quay đầu (zigzag). Với kiểu Về đầu hàng, mỗi hàng có một mũi tên vàng ở đầu hàng chỉ chiều chạy.</Point>
        </ul>
        <Shot file="04-hien-thi-day.webp" open={open} size="md" />
        <p className="text-xs text-slate-400">
          Dòng chú thích dưới sơ đồ nhắc lại các ký hiệu và mô tả cách đi dây đang chọn. Đổi lựa chọn ở bước 2 là sơ đồ, cung và mũi tên đổi theo ngay. Ví dụ dây vào ở góc dưới phải, chạy dọc, hết cột thì về đầu cột: dấu chỉ hướng chuyển xuống mép trên và mép dưới.
        </p>
        <Shot file="05-doc-ve-dau-cot.webp" open={open} />

        <AreaHeading icon={<Grid3x3 className={iconClass} />}>Ma trận lớn vẫn vừa khung</AreaHeading>
        <p className="text-xs text-slate-400">
          Sơ đồ luôn co vừa khung nhìn: ma trận càng lớn ô càng nhỏ. Ô quá nhỏ thì số được ẩn, rê chuột lên ô để xem “LED 312 · cột 7, hàng 9”; ô nhỏ hơn nữa thì cung và mũi tên ở lề cũng ẩn. Muốn soi kỹ một góc thì phóng to bằng nút <strong className={strong}>+</strong> hoặc Ctrl + lăn chuột, bấm <strong className={strong}>Vừa khung</strong> để về như cũ. Ba ô tick <strong className={strong}>Số</strong>, <strong className={strong}>Màu theo dây</strong>, <strong className={strong}>Mũi tên hướng dây</strong> bật tắt từng lớp hiển thị.
        </p>
        <Shot file="13-o-nho.webp" open={open} size="md" />
      </section>

      {/* Ô không gắn LED, Tự do */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Màn Không Phải Hình Chữ Nhật Kín</SectionHeading>
        <AreaHeading icon={<MousePointerClick className={iconClass} />}>Tắt các ô không gắn LED</AreaHeading>
        <p className="text-xs text-slate-400">
          Màn tròn, logo hay chữ thường có ô không gắn LED. Ở chế độ <strong className={strong}>Chữ nhật</strong>, bấm vào ô để tắt, kéo chuột để tắt nhiều ô một lượt, bấm lại để bật. Mục <strong className={strong}>Ô không gắn LED</strong> ở bước 2 quyết định cách đánh số:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Bỏ qua, không tốn LED">ô tắt không có LED thật, dây đi thẳng sang LED kế. Dùng cho màn chỉ gắn LED ở những ô cần sáng.</Point>
          <Point title="Vẫn tính trên dây">ô tắt vẫn có LED thật nằm trên dây nhưng không dùng để vẽ, ví dụ tấm LED vuông bị che bớt một phần. Các ô này được đánh số sau các ô sáng.</Point>
        </ul>
        <Shot file="06-o-khong-gan-led.webp" open={open} size="md" />
        <AreaHeading icon={<LayoutGrid className={iconClass} />}>Chế độ Tự do: bấm từng LED</AreaHeading>
        <p className="text-xs text-slate-400">
          Dây đi kiểu không theo hàng nào? Chọn <strong className={strong}>Tự do: bấm từng LED</strong> ở đầu khung sơ đồ, tick <strong className={strong}>Lưới trống</strong> rồi bấm <strong className={strong}>↺ Làm lại lưới</strong> để mọi ô tắt. Sau đó bấm lần lượt vào từng ô theo đúng thứ tự LED trên dây: ô bấm đầu tiên là LED 0. Bấm lại ô vừa chọn để bỏ nó. Với hình phức tạp hơn nữa, tab <strong className={strong}>Vẽ sơ đồ tự do</strong> của Tool có bút vẽ, đường thẳng, hình tròn, chữ và gửi lên mạch qua cùng các bước kiểm tra an toàn.
        </p>
        <Shot file="12-tu-do.webp" open={open} size="md" />
      </section>

      {/* Ghép tấm */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Ghép Nhiều Tấm Nối Tiếp</SectionHeading>
        <p className="text-xs text-slate-400">
          Màn ghép từ nhiều tấm giống nhau, ví dụ 2 tấm 16 × 16 thành màn 32 × 16, dây đi hết tấm này rồi mới sang tấm kế. Tick <strong className={strong}>Ghép nhiều tấm nối tiếp</strong> ở bước 1:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Kích thước là cỡ một tấm">hai ô đổi thành “Mỗi tấm ngang × dọc”. Bước 2 là cách đi dây bên trong một tấm.</Point>
          <Point title="Số tấm">số tấm theo chiều ngang × số tấm theo chiều dọc.</Point>
          <Point title="Nối tấm">Ngang: dây đi lần lượt các tấm trong một hàng tấm. Dọc: đi lần lượt các tấm trong một cột tấm. Tấm đầu tiên nằm ở cùng góc dây vào đã chọn ở bước 2.</Point>
          <Point title="Hết hàng tấm thì quay đầu">tick khi dây đi hết một hàng tấm thì vòng ngược lại ở hàng tấm kế, giống kiểu zigzag nhưng tính theo tấm.</Point>
        </ul>
        <p className="text-xs text-slate-400">
          Trên sơ đồ, vạch trắng ngăn các tấm. Câu mô tả ở bước 2 ghi thêm “Đi hết một tấm rồi sang tấm kế theo chiều ngang (2 × 1 tấm)”.
        </p>
        <Shot file="07-ghep-tam.webp" open={open} />
      </section>

      {/* Thẻ mạch */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Thẻ Mạch: Gửi Đúng Sơ Đồ Cho Đúng Mạch</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,300px)_1fr] gap-4 items-start">
          <Shot file="08-the-mach.webp" open={open} size="xs" />
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Mỗi mạch một thẻ: tên, địa chỉ, số LED đang cấu hình và sơ đồ đang dùng. Nhãn bên phải so mạch đó với sơ đồ bạn đang soạn:
            </p>
            <div className="space-y-1.5">
              {CHIPS.map(({ chip, tone, desc }) => (
                <div key={chip} className="flex gap-2 items-start text-xs text-slate-400">
                  <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded border whitespace-nowrap ${tone}`}>{chip}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Tick nhiều mạch để gửi một lượt. Mạch không nhận được sơ đồ được nêu tên và lý do ngay dưới nút Gửi, kèm cách xử lý, ví dụ “Tăng số LED ở Tab Cấu hình phần cứng, hoặc giảm cỡ sơ đồ”. Các mạch còn lại vẫn nhận bình thường. Dòng chữ vàng là cảnh báo, không chặn: mạch cấu hình 512 LED mà sơ đồ chỉ dùng 256 thì 256 LED cuối dây sẽ không nằm trong sơ đồ.
            </p>
          </div>
        </div>
        <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
          <p>
            Mẹo: tick đúng một mạch rồi bấm <strong className={strong}>Theo mạch</strong> ở bước 1 là sơ đồ lấy ngay cỡ của mạch đó, thẻ chuyển sang Khớp. Mạch đang dùng sơ đồ có ô trống (màn tròn, logo) thì bấm <strong className={strong}>⬇ Đọc từ mạch</strong> thay vì Theo mạch, để lấy đúng cả các ô trống.
          </p>
        </Callout>
        <Shot file="10-theo-mach.webp" open={open} />
        <p className="text-xs text-slate-400">
          Tool chỉ đọc thông tin các mạch khi tab đang mở, mỗi mạch một lần, vì mỗi lần đọc có thể làm hiệu ứng đang chạy trên mạch giật nhẹ. Sau khi gửi hoặc xoá sơ đồ, Tool đọc lại mạch đó sau khoảng 9 giây để thẻ cập nhật.
        </p>
      </section>

      {/* Chạy thử */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Chạy Thử Vạch Quét Trên Mạch Thật</SectionHeading>
        <p className="text-xs text-slate-400">
          Sơ đồ trên màn hình đúng chưa đủ, phải nhìn đèn thật. Bấm <strong className={strong}>▶ Chạy thử vạch quét</strong>: một vạch sáng dọc quét từ trái sang phải, rồi một vạch ngang quét từ trên xuống.
        </p>
        <Shot file="11-chay-thu.webp" open={open} size="sm" />
        <AreaHeading icon={<ScanLine className={iconClass} />}>Đọc kết quả và lưu ý</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Vạch thẳng, chạy đều">sơ đồ khớp với cách đi dây của màn.</Point>
          <Point title="Vạch gãy khúc, nhảy lung tung">đi dây chưa khớp. Xem lại góc dây vào, hướng chạy và kiểu quay đầu ở bước 2, gửi lại rồi chạy thử lần nữa.</Point>
          <Point title="Chỉ chạy trên mạch đã nhận sơ đồ cỡ này">nút chỉ bấm được khi mạch đang tick đã chạy đúng cỡ sơ đồ đang soạn. Gửi sơ đồ trước rồi mới chạy thử.</Point>
          <Point title="Xong là mạch về như cũ">vạch dùng màu dịu, độ sáng thấp. Chạy xong mạch trở lại hiệu ứng, màu, preset, trạng thái bật tắt và độ sáng như trước khi chạy thử.</Point>
          <Point title="Mạch đang phát show thì không chạy">Tool từ chối và báo “mạch đang phát show, hãy dừng show trước”, để không làm dừng show đang diễn.</Point>
        </ul>
      </section>

      {/* An toàn */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Vì Sao Tool Chặn Sơ Đồ Quá Lớn</SectionHeading>
        <Callout icon={<ShieldAlert className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Mỗi lần khởi động, mạch đọc file sơ đồ và dành bộ nhớ theo đúng kích thước ghi trong file. Sơ đồ <strong className="text-amber-300">quá lớn so với mạch</strong> làm mạch lỗi ngay lúc khởi động. Vì file vẫn nằm trong bộ nhớ, lần bật nguồn nào cũng lỗi lại, cho tới khi mạch tự quay về bản firmware trước đó. Người dùng không tự gỡ file ra được, và Tool bản cũ từng cho nhập tới 300 × 300 ô. Vì vậy từ v4.0.0, Tool kiểm tra sơ đồ trước khi cho gửi.
          </p>
        </Callout>
        <p className="text-xs text-slate-400">Một sơ đồ chỉ được gửi cho một mạch khi đạt đủ các điều kiện sau:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LIMITS.map(({ title, desc }) => (
            <InfoCard key={title}>
              <h3 className="font-semibold text-white text-xs mb-1.5">{title}</h3>
              <p className="text-xs text-slate-400">{desc}</p>
            </InfoCard>
          ))}
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5">Ô trống vẫn hợp lệ</h3>
            <p className="text-xs text-slate-400">Giới hạn ô tính theo cả khung Ngang × Dọc, giới hạn LED tính riêng. Màn 9 × 20 = 180 ô mà chỉ 72 ô gắn LED vẫn gửi được cho mạch cấu hình 72 LED.</p>
          </InfoCard>
        </div>
        <AreaHeading icon={<ListChecks className={iconClass} />}>Tool kiểm tra ở 3 chỗ</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Lúc nhập">ô Ngang, Dọc và số tấm không cho vượt mức của các mạch đang tick. Dòng giới hạn ở bước 1 chuyển đỏ khi sơ đồ cần nhiều LED hơn mạch. Mở file sơ đồ quá cỡ thì Tool từ chối, không nạp.</Point>
          <Point title="Trên thẻ mạch">mạch không hợp với sơ đồ có nhãn đỏ và không nằm trong danh sách gửi.</Point>
          <Point title="Ngay trước khi gửi">Tool đọc lại số LED và chỗ trống của từng mạch, vì chúng có thể đã đổi từ lúc mở tab. Không đọc được thì không gửi.</Point>
        </ul>
        <Shot file="09-canh-bao.webp" open={open} size="sm" />
        <p className="text-xs text-slate-400">
          Bị báo Thiếu LED? Hoặc giảm cỡ sơ đồ, hoặc sang tab <strong className={strong}>Cấu hình phần cứng</strong> đặt lại số LED cho đúng số LED thật đang gắn trên các cổng, lưu, rồi quay lại tab này. Đừng khai số LED lớn hơn số LED thật chỉ để gửi được sơ đồ.
        </p>
      </section>

      {/* Đọc, xoá */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Đọc, Sửa Và Xoá Sơ Đồ Trên Mạch</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="⬇ Đọc từ mạch">đọc sơ đồ đang nằm trên mạch đang tick (mạch đầu tiên có sơ đồ) về màn hình. Sửa xong bấm Gửi để ghi lại. Cách này giữ đúng cả các ô trống và số thứ tự của sơ đồ cũ.</Point>
          <Point title="🗑 Xoá trên mạch…">xoá sơ đồ khỏi các mạch đang tick rồi khởi động lại mạch, mạch quay về thứ tự LED mặc định. Tool hỏi xác nhận trước, nút mặc định là Không.</Point>
          <Point title="Giữ bản gốc">bấm 💾 Lưu file sau khi sơ đồ chạy đúng. Thay mạch mới, hoặc nạp lại firmware qua cổng USB (cách này xoá sạch bộ nhớ mạch), thì chỉ cần Mở file rồi Gửi.</Point>
        </ul>
      </section>

      {/* Phím tắt */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Hoàn Tác Và Thao Tác Nhanh</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SHORTCUTS.map(({ keys, desc }) => (
            <div key={keys} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3 items-start">
              <Keyboard className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400"><kbd className="font-mono text-[11px] text-white bg-slate-800 border border-white/10 rounded px-1.5 py-0.5">{keys}</kbd> <span className="ml-1">{desc}</span></p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Nút <strong className={strong}>↶ Hoàn tác</strong> ở đầu khung sơ đồ làm đúng việc của Ctrl + Z. Gõ tên sơ đồ không tính là một bước hoàn tác, nên Ctrl + Z không xoá chữ bạn vừa gõ. <strong className={strong}>↺ Làm lại lưới</strong> dựng lại lưới mới theo kích thước đang nhập, và cũng hoàn tác được.
        </p>
      </section>

      {/* Lưu ý */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Lưu Ý Khi Lắp Đặt</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Khai số LED trước, vẽ sơ đồ sau">đặt đúng số LED từng cổng ở tab Cấu hình phần cứng trước, thẻ mạch mới báo đúng Khớp hay Thiếu.</Point>
          <Point title="Một sơ đồ cho nhiều màn giống nhau">lắp nhiều màn cùng cỡ, cùng cách đi dây thì tick tất cả rồi gửi một lần.</Point>
          <Point title="Luôn chạy thử sau khi gửi">vạch quét thẳng thì ảnh, GIF và hiệu ứng 2D sẽ hiện đúng hình.</Point>
          <Point title="Mở file không ghi vào mạch">muốn mạch dùng sơ đồ vừa mở thì phải bấm Gửi.</Point>
        </ul>
        <Callout icon={<Cable className="w-5 h-5 text-emerald-400" />}>
          <p>
            Sơ đồ LED còn được dùng ở nơi khác: ở tab Timecode, phân đoạn của mạch ma trận được vẽ đúng theo sơ đồ (xem <Link to="/post-news/tab-timecode-tool-argb-hsl/" className={link}>bài Tab Timecode</Link>); trên trang điều khiển của mạch, trang Ma trận 2D lấy kích thước và cách đi dây từ sơ đồ (xem <Link to="/post-news/giao-dien-supernova-argb-hsl/" className={link}>bài Giao diện SuperNova</Link>).
          </p>
        </Callout>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Định chạy mạch với xLights? Đọc trước bài <Link to="/post-news/luu-y-khi-su-dung-xlights-voi-argb-hsl/" className="text-amber-300 hover:underline">Lưu ý khi dùng xLights với ARGB HSL</Link>: khi nhận tín hiệu từ xLights, mạch không được còn cấu hình Mapping 2D. Sơ đồ đã gửi từ tab này xoá được bằng nút <strong className="text-amber-300">🗑 Xoá trên mạch…</strong>.
          </p>
        </Callout>
        <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
          <FileJson className="w-3.5 h-3.5 shrink-0 mt-px" />
          <span>Ảnh chụp từ Tool ARGB HSL v4.0.0 với các mạch mẫu. Tên mạch, địa chỉ và số LED trên máy của bạn sẽ khác.</span>
        </p>
      </section>

      <ArtQuote accent={ACCENT}>
        Cần hỗ trợ dựng sơ đồ cho màn LED của bạn? Gọi hoặc nhắn Zalo cho Happy Smart Light qua số 0784 140 494, gửi kèm ảnh mặt sau tấm LED và ảnh chụp tab Tạo sơ đồ LED để được hỗ trợ nhanh hơn.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={PHOTOS}
        currentIndex={activeIndex}
        title="Ảnh tab Tạo sơ đồ LED"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}

import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, ArchiveRestore, BadgeCheck, CopyCheck, Eye, FileJson, KeyRound, Lightbulb, ListChecks,
  PauseCircle, RefreshCw, ShieldCheck, Tags, Wifi, Wrench,
} from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, Callout, ArtQuote } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";

const IMG = "/img/post-news/tab-sao-chep-cau-hinh";
const ACCENT = "emerald" as const;

// Kích thước thật của ảnh, để trang không bị nhảy khi ảnh tải xong.
const PHOTO_LIST: { file: string; label: string; w: number; h: number }[] = [
  { file: "01-tong-quan.webp", label: "Tab Sao chép cấu hình trước khi gửi: bên trái là cấu hình mẫu, bên phải là các mạch nhận, dưới cùng là nút Gửi", w: 1440, h: 900 },
  { file: "08-dang-gui.webp", label: "Đang gửi: từng mạch lần lượt ghi cấu hình, khởi động lại, rồi Tool chờ mạch online lại mới sang mạch kế", w: 1440, h: 900 },
  { file: "09-ket-qua.webp", label: "Gửi xong: mỗi hàng báo kết quả của mạch đó, dòng cuối thẻ tóm tắt cả đợt", w: 1440, h: 900 },
  { file: "02-cau-hinh-mau.webp", label: "Bước 1: cấu hình mẫu lấy từ mạch Cổng chào 1, các phần sẽ chép và ô sao lưu", w: 372, h: 835 },
  { file: "03-wifi.webp", label: "Tick WiFi là hiện ngay cảnh báo: mạch đang ở WiFi khác sẽ mất kết nối, IP tĩnh không bao giờ được chép", w: 372, h: 462 },
  { file: "05-trung-ten.webp", label: "Hai mạch trùng tên ARGB-A1 và một tên có dấu nháy kép: hàng tô đỏ, có nút Đổi thành ARGB-A2, nút Gửi bị khoá", w: 1032, h: 800 },
  { file: "06-mdns.webp", label: "Tick Đổi cả mDNS theo tên: cột mDNS thành ô nhập, tự điền theo tên mới", w: 1032, h: 500 },
  { file: "04-khac-dong-mach.webp", label: "Mạch 2X Pro nhận mẫu 4 cổng: báo Khác dòng mạch kèm lý do, không tick được. Mạch offline cũng không tick được", w: 1032, h: 164 },
  { file: "07-xac-nhan.webp", label: "Hộp xác nhận liệt kê phần sẽ chép, từng mạch và tên mới. Nút mặc định là Huỷ", w: 500, h: 325 },
  { file: "08b-tien-do.webp", label: "Thanh tiến độ ở cuối thẻ trong lúc gửi, kèm nút Dừng sau mạch này", w: 1031, h: 88 },
  { file: "09b-ket-qua-tung-mach.webp", label: "Kết quả từng mạch: Xong · đã online lại, Đã giống mẫu, Xong · đã đổi tên, Đang khoá Mã PIN", w: 1032, h: 800 },
  { file: "10-dung-dot.webp", label: "Một mạch không online lại: cả đợt dừng, các mạch sau báo Chưa gửi và giữ nguyên cấu hình", w: 1032, h: 910 },
  { file: "11-menu-sao-luu.webp", label: "Menu Sao chép cấu hình trên thanh menu: Mở bản sao lưu cấu hình…", w: 760, h: 286 },
  { file: "12-khoi-phuc.webp", label: "Bản sao lưu được nạp làm cấu hình mẫu, tên file có ngày giờ sao lưu", w: 372, h: 300 },
];

const PHOTOS: ZoomGalleryItem[] = PHOTO_LIST.map(({ file, label }) => ({ url: `${IMG}/${file}`, label, alt: label }));

const ALBUM: { file: string; tab: string }[] = [
  { file: "01-tong-quan.webp", tab: "Trước khi gửi" },
  { file: "08-dang-gui.webp", tab: "Đang gửi" },
  { file: "09-ket-qua.webp", tab: "Kết quả" },
];

const PARTS: { title: string; desc: string; on: boolean }[] = [
  { title: "LED và cổng", desc: "Số cổng, chân GPIO, số LED, loại LED, thứ tự màu, giới hạn nguồn.", on: true },
  { title: "Nút bấm, IR, relay", desc: "Chân nút và preset gán cho nút.", on: true },
  { title: "Độ sáng và lúc bật nguồn", desc: "Độ sáng, preset chạy khi bật nguồn, gamma, chuyển cảnh.", on: true },
  { title: "Đồng bộ và hẹn giờ", desc: "Đồng bộ UDP, E1.31 / Art-Net, giờ NTP, đồng hồ, hẹn giờ.", on: true },
  { title: "Usermod", desc: "Autosave và các module khác.", on: true },
  { title: "WiFi", desc: "Mặc định tắt: mỗi mạch giữ WiFi đang dùng.", on: false },
];

const strong = "text-white";
const link = "text-emerald-400 hover:underline";
const iconClass = "w-4 h-4 text-emerald-400";

function photoOf(file: string) {
  return PHOTO_LIST.find((p) => p.file === file);
}

function Shot({ file, open, narrow = false }: { file: string; open: (url: string) => void; narrow?: boolean }) {
  const url = `${IMG}/${file}`;
  const photo = photoOf(file);
  const label = photo?.label ?? "Ảnh chụp tab Sao chép cấu hình";
  return (
    <figure className={`mt-2 ${narrow ? "max-w-sm" : ""}`}>
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

/** Album theo mục 4.3: nhãn chọn ảnh ở trên, một ảnh lớn bấm để phóng to, hàng ảnh nhỏ bên dưới. */
function Album({ open }: { open: (url: string) => void }) {
  const [active, setActive] = useState(0);
  const item = ALBUM[active];
  const url = `${IMG}/${item.file}`;
  const photo = photoOf(item.file);
  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="Chọn ảnh giao diện" className="flex flex-wrap justify-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5 w-fit mx-auto">
        {ALBUM.map((a, i) => (
          <button
            key={a.file}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              active === i ? "bg-white/10 text-white font-semibold shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {a.tab}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-slate-950 border border-emerald-500/20 p-2 sm:p-3 shadow-[0_0_30px_rgba(52,211,153,0.08)]">
        <button
          type="button"
          onClick={() => open(url)}
          aria-label={`Xem lớn: ${photo?.label ?? item.tab}`}
          className="group/zoom relative block w-full overflow-hidden rounded-xl border border-white/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
        >
          <img src={url} alt={photo?.label ?? item.tab} width={photo?.w} height={photo?.h} loading="eager" className="w-full h-auto" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-3.5 py-1.5 bg-slate-900/90 border border-white/10 rounded-lg text-[10px] font-mono text-white flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-emerald-400" />
              BẤM ĐỂ PHÓNG TO
            </span>
          </div>
        </button>
        <p className="text-[11px] text-slate-500 mt-2 px-1 leading-snug">{photo?.label}</p>
      </div>
      <div className="flex justify-center gap-2">
        {ALBUM.map((a, i) => (
          <button
            key={a.file}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Xem ảnh ${a.tab}`}
            aria-pressed={active === i}
            className={`w-20 sm:w-28 aspect-[16/10] rounded-lg overflow-hidden border bg-slate-900 transition-all duration-200 cursor-pointer ${
              active === i
                ? "border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.35)]"
                : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
            }`}
          >
            <img src={`${IMG}/${a.file}`} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
          </button>
        ))}
      </div>
    </div>
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

function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "ok" | "warn" | "error" | "info" }) {
  const tones = {
    neutral: "text-slate-300 bg-slate-800/80 border-white/10",
    ok: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    warn: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    error: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    info: "text-sky-300 bg-sky-500/10 border-sky-500/30",
  } as const;
  return (
    <span className={`inline-block whitespace-nowrap font-semibold text-[11px] px-2 py-0.5 rounded-full border ${tones[tone]}`}>{children}</span>
  );
}

const STATUSES: { chip: string; tone: "neutral" | "ok" | "warn" | "error" | "info"; desc: string }[] = [
  { chip: "Sẵn sàng", tone: "ok", desc: "Mạch đã tick, tên hợp lệ. Dòng dưới ghi Đổi tên: … → … hoặc Giữ tên …." },
  { chip: "Không gửi", tone: "neutral", desc: "Mạch online nhưng chưa tick." },
  { chip: "Offline", tone: "neutral", desc: "Mạch không có trên mạng lúc này, không tick được." },
  { chip: "Đang đọc mạch…", tone: "neutral", desc: "Tool đang đọc cấu hình hiện tại của mạch. Đọc xong mới gửi được." },
  { chip: "Không đọc được mạch", tone: "error", desc: "Bấm Đọc lại ngay dưới chữ báo lỗi." },
  { chip: "Khác dòng mạch", tone: "warn", desc: "Mạch không có đủ cổng, chân GPIO hay số LED như mẫu. Xem mục bên dưới." },
  { chip: "Trùng tên / Tên không dùng được", tone: "error", desc: "Sửa tên ở cột Tên mới, hoặc bấm Đổi thành … để Tool chọn tên trống." },
  { chip: "Trùng mDNS / mDNS không dùng được", tone: "error", desc: "Chỉ gặp khi tick Đổi cả mDNS theo tên." },
];

export default function ArticleTabSaoChepCauHinh() {
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
      title="Tab Sao Chép Cấu Hình Trong Tool ARGB HSL: Cài Đặt Nhiều Mạch Giống Nhau Trong Một Lần"
      metaTitle="Tab Sao Chép Cấu Hình Tool ARGB HSL | Cài Đặt Nhiều Mạch Cùng Lúc"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN SỬ DỤNG"
      description="Hướng dẫn dùng tab Sao chép cấu hình mới của Tool ARGB HSL v4.0.0: lấy cấu hình mẫu từ một mạch hoặc file cfg.json, chọn phần sẽ chép, đặt tên hàng loạt, gửi lần lượt cho nhiều mạch, vì sao WiFi và IP tĩnh không bị chép, và cách khôi phục từ bản sao lưu."
      bannerImg={`${IMG}/banner.webp`}
      accent={ACCENT}
      path="/post-news/tab-sao-chep-cau-hinh-tool-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
        <p>
          Công trình có 5, 10 hay 30 mạch ARGB HSL chạy giống nhau thì chỉ cần cài đặt kỹ <strong className={strong}>một mạch</strong>. Tab <strong className={strong}>Sao chép cấu hình</strong> lấy cấu hình của mạch đó làm mẫu rồi chép sang các mạch còn lại: số cổng, số LED, loại LED, nút bấm, độ sáng, đồng bộ… Mỗi mạch vẫn giữ tên, WiFi và địa chỉ IP của riêng nó.
        </p>
        <p className="mt-2">
          <strong className={strong}>Mới trong Tool ARGB HSL v4.0.0 (26/11/2026):</strong> tab được làm lại theo 3 bước rõ ràng: <strong className={strong}>① Cấu hình mẫu</strong>, <strong className={strong}>② Mạch nhận cấu hình</strong>, <strong className={strong}>③ Gửi</strong>. Bạn chọn từng phần sẽ chép thay vì chép đè cả file, tên trùng được báo ngay trên hàng, Tool gửi lần lượt từng mạch và tự sao lưu cấu hình cũ trước khi ghi. Mọi ảnh trong bài đều bấm vào để xem lớn.
        </p>
      </Callout>

      {/* Album */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Giao Diện Mới Trong 3 Ảnh</SectionHeading>
        <Album open={open} />
      </section>

      {/* Khi nào dùng */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Khi Nào Dùng Tab Này</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5 flex items-center gap-2"><CopyCheck className={iconClass} />Lắp nhiều mạch giống nhau</h3>
            <p className="text-xs text-slate-400">Dãy cổng chào, các bảng hiệu cùng mẫu, một đoàn đạo cụ LED: cài một mạch cho đúng, chép sang các mạch còn lại trong một lần bấm.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5 flex items-center gap-2"><Tags className={iconClass} />Đặt tên cho cả đội hình</h3>
            <p className="text-xs text-slate-400">Đánh số ARGB-A1, A2… hoặc 01, 02… cho mọi mạch đang chọn, để khỏi nhầm khi mạch nào cũng tên là ARGB.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5 flex items-center gap-2"><RefreshCw className={iconClass} />Thay mạch mới</h3>
            <p className="text-xs text-slate-400">Mạch mới lắp vào chỗ mạch cũ nhận lại đúng cấu hình của các mạch cùng loại, hoặc từ file cfg.json bạn đã lưu.</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs mb-1.5 flex items-center gap-2"><ArchiveRestore className={iconClass} />Quay lại cấu hình cũ</h3>
            <p className="text-xs text-slate-400">Tool sao lưu cấu hình của từng mạch trước khi ghi. Lỡ chép sai thì mở bản sao lưu và gửi lại.</p>
          </InfoCard>
        </div>
        <p className="text-xs text-slate-400">
          Tab chỉ chép <strong className={strong}>cấu hình của mạch</strong> (file cfg.json). Preset, ảnh và show trong mạch nằm riêng nên không đi kèm: phần Nút bấm hay Lúc bật nguồn chỉ chép số preset được gán.
        </p>
      </section>

      {/* Chuẩn bị */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Cần Chuẩn Bị Gì</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tool ARGB HSL">bản v4.0.0 trở lên. Tool đang cài tự báo khi có bản mới. Chưa có Tool? <Link to="/argb-hsl-tool-pc/" className={link}>Tải Tool ARGB HSL cho máy tính</Link>.</Point>
          <Point title="Các mạch đã online">cùng mạng WiFi với máy tính. Bấm <strong className={strong}>Quét mạng</strong> ở tab Thiết bị ARGB để Tool tìm đủ mạch.</Point>
          <Point title="Một cấu hình mẫu">một mạch đã cài đặt đúng và chạy thử ổn ở tab Cấu hình phần cứng, hoặc một file cfg.json đã lưu từ trước.</Point>
          <Point title="Lúc mạch rảnh">mạch có thay đổi sẽ tự khởi động lại, LED tắt khoảng 10 giây, show đang phát sẽ dừng. Đừng gửi trong lúc đang diễn.</Point>
        </ul>
      </section>

      {/* Bước 1 */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Bước 1: Chọn Cấu Hình Mẫu</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr] gap-4 sm:gap-6 items-start">
          <Shot file="02-cau-hinh-mau.webp" open={open} narrow />
          <div className="space-y-3">
            <AreaHeading icon={<BadgeCheck className={iconClass} />}>Lấy mẫu ở đâu</AreaHeading>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <Point title="Lấy từ mạch">chọn mạch ở ô <strong className={strong}>Mạch mẫu</strong> (chỉ có mạch đang online). Tool đọc cấu hình của mạch đó, trên bảng mạch ở bước 2 mạch này có nhãn <Chip tone="info">mạch mẫu</Chip>. Vừa sửa mạch mẫu ở tab Cấu hình phần cứng thì bấm <strong className={strong}>Đọc lại</strong>.</Point>
              <Point title="Mở file cfg.json">bấm nút này rồi <strong className={strong}>📂 Mở file…</strong> để chọn file đã lưu. Dùng khi mạch mẫu không có ở công trình. File không phải cấu hình của mạch ARGB HSL sẽ bị từ chối, mẫu đang có giữ nguyên.</Point>
            </ul>
            <AreaHeading icon={<FileJson className={iconClass} />}>Mẫu có gì</AreaHeading>
            <p className="text-xs text-slate-400">
              Khung tóm tắt cho biết ngay mẫu lấy từ đâu (dòng mạch, VID, giờ đọc hoặc ngày lưu file) và có gì: số cổng và chân GPIO, số LED mỗi cổng, loại LED và thứ tự màu, giới hạn nguồn, số nút bấm, tên WiFi, các Usermod. Mẫu có đặt IP tĩnh thì hiện chip vàng <Chip tone="warn">IP tĩnh …</Chip> để bạn để ý: IP tĩnh không bao giờ được chép sang mạch khác.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <Point title="Lưu ra file…">lưu cấu hình mẫu thành file cfg.json trên máy, mở lại cho công trình sau.</Point>
              <Point title="Xem nội dung">xem toàn bộ cấu hình mẫu trước khi gửi.</Point>
            </ul>
          </div>
        </div>
      </section>

      {/* Phần sẽ chép */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Chọn Phần Sẽ Chép</SectionHeading>
        <p className="text-xs text-slate-400">
          Mẫu được chia thành 6 phần, tick phần nào thì chép phần đó. <strong className={strong}>Phần không tick giữ nguyên như trên từng mạch</strong> (bản cũ chép đè cả file). Tool nhớ lựa chọn cho lần sau.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PARTS.map((p) => (
            <div key={p.title} className={`p-3 rounded-xl border flex gap-3 items-start ${p.on ? "bg-emerald-500/5 border-emerald-500/15" : "bg-slate-900/40 border-white/5"}`}>
              <span className={`mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center text-[10px] font-bold ${p.on ? "bg-emerald-500 text-slate-950" : "border border-white/20"}`}>{p.on ? "✓" : ""}</span>
              <div>
                <p className="text-xs font-semibold text-white">{p.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">Dấu tick là lựa chọn mặc định khi mở tab lần đầu.</p>
        <Callout icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}>
          <p>
            Dù tick phần nào, vài thứ luôn là của riêng từng mạch: <strong className={strong}>tên và mDNS</strong> (đặt ở bước 2, để trống là giữ tên cũ), <strong className={strong}>khoá OTA</strong>, <strong className={strong}>Mã PIN</strong> và <strong className={strong}>IP tĩnh</strong>. Ba thứ sau không bao giờ được chép.
          </p>
        </Callout>
      </section>

      {/* WiFi và IP tĩnh */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Vì Sao WiFi Không Chép, IP Tĩnh Không Bao Giờ Chép</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr] gap-4 sm:gap-6 items-start">
          <Shot file="03-wifi.webp" open={open} narrow />
          <div className="space-y-3">
            <AreaHeading icon={<Wifi className={iconClass} />}>WiFi mặc định tắt</AreaHeading>
            <p className="text-xs text-slate-400">
              Mật khẩu WiFi không nằm trong cfg.json. Chép phần WiFi thì tên WiFi của mạch bị đổi theo mẫu nhưng mạch vẫn giữ <strong className={strong}>mật khẩu cũ</strong>. Mạch nào đang ở một WiFi khác mẫu sẽ không vào được mạng nữa, và Tool cũng không còn thấy mạch đó.
            </p>
            <p className="text-xs text-slate-400">
              Chỉ tick WiFi khi mọi mạch nhận đang dùng đúng WiFi của mẫu. Tick vào là Tool hiện ngay khung cảnh báo vàng, ghi rõ tên WiFi của mẫu.
            </p>
            <AreaHeading icon={<ShieldCheck className={iconClass} />}>IP tĩnh không bao giờ chép</AreaHeading>
            <p className="text-xs text-slate-400">
              Nếu chép IP tĩnh của mẫu, mọi mạch sẽ trùng một địa chỉ IP và giành nhau trên mạng (bản cũ từng gặp lỗi này). Kể cả khi tick WiFi, mỗi mạch vẫn giữ cách lấy IP của nó: mạch đang lấy IP tự động thì vẫn tự động, mạch đặt IP tĩnh thì giữ IP của mạch đó.
            </p>
          </div>
        </div>
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Lỡ làm mạch mất WiFi? Cắm dây Type-C và cấu hình lại WiFi theo bài <Link to="/post-news/nap-firmware-cau-hinh-wifi-argb-hsl/" className="text-amber-300 hover:underline">Nạp Firmware Mới Và Cấu Hình WiFi</Link>, mục Cấu hình WiFi cho mạch. Bước đó không xoá dữ liệu của mạch.
          </p>
        </Callout>
      </section>

      {/* Bước 2 */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Bước 2: Chọn Mạch Nhận Và Đặt Tên</SectionHeading>
        <p className="text-xs text-slate-400">
          Mỗi mạch một hàng: <strong className={strong}>Mạch hiện tại</strong> (tên, IP, dòng mạch, VID), <strong className={strong}>Tên mới</strong>, <strong className={strong}>mDNS</strong>, <strong className={strong}>Trạng thái</strong>. Mở tab là Tool đọc cấu hình từng mạch online một lần, trong lúc đó hàng báo <Chip>Đang đọc mạch…</Chip>.
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Tick mạch cần nhận">bấm ô vuông đầu hàng. <strong className={strong}>Chọn mọi mạch online</strong> tick mọi mạch nhận được mẫu, <strong className={strong}>Bỏ chọn</strong> bỏ hết. Ô <strong className={strong}>Tìm tên / IP</strong> lọc bảng khi có nhiều mạch. Dòng dưới tiêu đề đếm số mạch đã chọn, ví dụ 5 / 7 mạch online được chọn.</Point>
          <Point title="Tên mới">để trống là giữ tên đang có (ô ghi mờ “giữ: …”). Tên tối đa 32 byte, chữ có dấu tính 2 tới 3 byte, không dùng các ký tự &lt; &gt; " \.</Point>
          <Point title="Đặt tên hàng loạt">gõ <strong className={strong}>Tiền tố</strong> (mặc định ARGB-), chọn <strong className={strong}>Kiểu số</strong> A1, A2 … A9, B1 hoặc 01, 02, 03 …, rồi bấm <strong className={strong}>Đánh số mạch đang chọn</strong>. Chỉ mạch đang tick được đánh số, theo thứ tự trong bảng (bảng xếp theo tên hiện tại của mạch). Sửa tay từng tên sau đó vẫn được.</Point>
        </ul>

        <AreaHeading icon={<Tags className={iconClass} />}>Tên trùng được báo ngay</AreaHeading>
        <p className="text-xs text-slate-400">
          Hai mạch đặt cùng một tên (không phân biệt hoa thường) thì cả hai hàng tô đỏ, báo <Chip tone="error">Trùng tên</Chip> kèm tên mạch bị trùng và nút <strong className={strong}>Đổi thành …</strong>: bấm là Tool điền tên trống kế tiếp theo tiền tố và kiểu số bạn đang dùng. Tên có ký tự không cho phép báo <Chip tone="error">Tên không dùng được</Chip>. Còn hàng đỏ thì nút Gửi bị khoá, dòng cuối thẻ ghi số mạch cần sửa.
        </p>
        <Shot file="05-trung-ten.webp" open={open} />

        <AreaHeading icon={<ListChecks className={iconClass} />}>mDNS: mặc định giữ nguyên</AreaHeading>
        <p className="text-xs text-slate-400">
          mDNS là tên của mạch trên mạng (mở trang mạch bằng địa chỉ dạng <code className="text-slate-300">tên-mdns.local</code>). Mặc định mỗi mạch có mDNS dạng hsl-&lt;MAC&gt;, vốn đã khác nhau giữa các mạch, nên Tool giữ nguyên. Tick <strong className={strong}>Đổi cả mDNS theo tên</strong> thì cột mDNS thành ô nhập, tự điền theo tên mới: bỏ dấu, chữ thường, chỉ a-z, 0-9 và dấu gạch ngang (ARGB-A1 thành argb-a1). mDNS trùng hoặc sai cũng được báo trên hàng như tên. Đổi mDNS thì mạch phải khởi động lại.
        </p>
        <Shot file="06-mdns.webp" open={open} />

        <AreaHeading icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}>Mạch khác dòng không tick được</AreaHeading>
        <p className="text-xs text-slate-400">
          Mẫu dùng nhiều cổng hơn, dùng chân GPIO mà mạch không có, hoặc mỗi cổng dài hơn số LED mạch chịu được, thì hàng báo <Chip tone="warn">Khác dòng mạch</Chip>, ô tick bị khoá và khung vàng ghi rõ lý do. Ví dụ mẫu lấy từ mạch 4X (4 cổng) không gửi phần LED cho mạch 2X Pro (2 cổng). Nút bấm cũng vậy: mẫu gán nút vào chân mà mạch không có thì không gửi được phần Nút bấm.
        </p>
        <Shot file="04-khac-dong-mach.webp" open={open} />
        <p className="text-xs text-slate-400">
          Vẫn muốn chép các phần còn lại (độ sáng, đồng bộ…) cho mạch đó? Bỏ tick <strong className={strong}>LED và cổng</strong> (hoặc <strong className={strong}>Nút bấm, IR, relay</strong>) ở bước 1, hàng sẽ tick được lại.
        </p>

        <AreaHeading icon={<Eye className={iconClass} />}>Các trạng thái trước khi gửi</AreaHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STATUSES.map((s) => (
            <div key={s.chip} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 space-y-1.5">
              <Chip tone={s.tone}>{s.chip}</Chip>
              <p className="text-[11px] text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bước 3 */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Bước 3: Gửi Cấu Hình</SectionHeading>
        <div className="space-y-3">
          <Step n={1} title="Bấm Gửi và đọc kỹ hộp xác nhận">
            <p>Nút ở góc dưới ghi rõ số mạch, ví dụ <strong className={strong}>⬆ Gửi cấu hình lên 5 mạch</strong>. Nút chỉ bấm được khi đã có mẫu, đã chọn ít nhất một phần, đã tick mạch và không còn hàng đỏ. Chưa đủ thì dòng bên cạnh nút nói còn thiếu gì.</p>
            <p>Hộp xác nhận liệt kê các phần sẽ chép (ghi rõ “không chép WiFi” khi bỏ tick WiFi), từng mạch kèm tên mới, và nhắc mạch sẽ khởi động lại. Nút mặc định là <strong className={strong}>Huỷ</strong>, phải bấm <strong className={strong}>Gửi</strong> mới chạy.</p>
            <Shot file="07-xac-nhan.webp" open={open} narrow />
          </Step>
          <Step n={2} title="Tool gửi lần lượt từng mạch">
            <p>Với mỗi mạch, Tool đọc cấu hình hiện tại của chính mạch đó, sao lưu lại, chỉ thay các phần bạn chọn rồi mới ghi. Hàng đang gửi báo <Chip tone="info">Đang gửi</Chip> kèm việc đang làm (Đang đọc cấu hình hiện tại…, Đang ghi cấu hình…, Đang khởi động lại…), các mạch sau báo <Chip>Chờ tới lượt</Chip>.</p>
            <p>Mạch cần khởi động lại thì Tool chờ mạch online lại rồi mới sang mạch kế. Muốn ngừng giữa chừng, bấm <strong className={strong}>Dừng sau mạch này</strong>: mạch đang gửi làm cho xong, các mạch sau giữ nguyên.</p>
            <Shot file="08b-tien-do.webp" open={open} />
          </Step>
          <Step n={3} title="Xem kết quả trên từng hàng">
            <p>Gửi xong, mỗi hàng báo kết quả của mạch đó, dòng cuối thẻ tóm tắt cả đợt, ví dụ “Gửi chưa trọn: 3 mạch xong, 1 mạch đã giống mẫu, 1 mạch lỗi.”. Thành công thì không có hộp thông báo nào bật lên. Tên mới được cập nhật ở mọi tab của Tool.</p>
            <Shot file="09b-ket-qua-tung-mach.webp" open={open} />
          </Step>
        </div>

        <AreaHeading icon={<BadgeCheck className={iconClass} />}>Mạch nào phải khởi động lại</AreaHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InfoCard>
            <Chip tone="ok">Đã giống mẫu</Chip>
            <p className="text-xs text-slate-400 mt-2">Cấu hình sau khi chép giống hệt cấu hình đang có. Tool không gửi gì, mạch không khởi động lại.</p>
          </InfoCard>
          <InfoCard>
            <Chip tone="ok">Xong · đã đổi tên</Chip>
            <p className="text-xs text-slate-400 mt-2">Chỉ có tên thay đổi. Tool ghi tên mới, mạch dùng tên đó ngay, không phải khởi động lại.</p>
          </InfoCard>
          <InfoCard>
            <Chip tone="ok">Xong · đã online lại</Chip>
            <p className="text-xs text-slate-400 mt-2">Có thay đổi khác. Tool ghi, khởi động lại mạch (LED tắt khoảng 10 giây) và chờ mạch online lại, tối đa 60 giây.</p>
          </InfoCard>
        </div>
        <p className="text-xs text-slate-400">
          Hiếm khi gặp <Chip tone="ok">Xong · tên chưa khớp</Chip>: mạch đã online lại nhưng báo một tên khác tên vừa đặt. Kiểm tra lại tên của mạch đó.
        </p>
      </section>

      {/* Dừng đợt, PIN */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Khi Có Mạch Gặp Sự Cố</SectionHeading>
        <AreaHeading icon={<PauseCircle className="w-4 h-4 text-rose-400" />}>Mạch không online lại: cả đợt dừng</AreaHeading>
        <p className="text-xs text-slate-400">
          Ghi xong mà sau 60 giây vẫn không thấy mạch ở IP cũ, hàng báo <Chip tone="error">Không online lại</Chip> và Tool <strong className={strong}>dừng cả đợt</strong>. Các mạch chưa tới lượt báo <Chip>Chưa gửi</Chip> và giữ nguyên cấu hình. Tool dừng vì chính cấu hình mẫu có thể là nguyên nhân: gửi tiếp thì các mạch còn lại có thể gặp cùng lỗi.
        </p>
        <Shot file="10-dung-dot.webp" open={open} />
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Kiểm tra mạch đó trước">nguồn có ổn không, mạch có vào lại WiFi không. Mạch hiện lại trên mạng thì xem cấu hình ở tab Cấu hình phần cứng.</Point>
          <Point title="Gửi tiếp cho các mạch còn lại">sửa mẫu nếu cần (ví dụ bỏ tick phần vừa gây lỗi), bỏ tick các mạch đã xong, rồi gửi lại cho các mạch báo Chưa gửi.</Point>
          <Point title="Muốn trả mạch về như cũ">dùng bản sao lưu, xem mục bên dưới.</Point>
        </ul>

        <AreaHeading icon={<KeyRound className="w-4 h-4 text-rose-400" />}>Mạch khoá Mã PIN</AreaHeading>
        <p className="text-xs text-slate-400">
          Mạch đang khoá Mã PIN không nhận cấu hình mới. Hàng báo <Chip tone="error">Đang khoá Mã PIN</Chip> và nhắc mở khoá ở tab Cấu hình phần cứng. Tool vẫn gửi tiếp cho các mạch khác. Mở khoá xong, tick lại mạch đó và gửi lại.
        </p>

        <AreaHeading icon={<Wrench className="w-4 h-4 text-rose-400" />}>Các lỗi khác</AreaHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Không đọc được mạch">Tool chưa ghi gì vào mạch. Bấm Đọc lại trên hàng, hoặc kiểm tra mạch còn online không.</Point>
          <Point title="Không sao lưu được">Tool không ghi được bản sao lưu trên máy nên cũng không ghi vào mạch. Mạch giữ nguyên.</Point>
          <Point title="Ghi lỗi">mạch chưa nhận cấu hình, gửi lại khi mạch ổn định.</Point>
        </ul>
      </section>

      {/* Sao lưu, khôi phục */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Sao Lưu Và Khôi Phục Cấu Hình Cũ</SectionHeading>
        <p className="text-xs text-slate-400">
          Ô <strong className={strong}>Sao lưu cấu hình cũ của từng mạch trước khi ghi</strong> ở cuối bước 1 bật sẵn. Trước khi ghi vào một mạch, Tool lưu cấu hình đang có của mạch đó trên máy tính, giữ <strong className={strong}>10 bản gần nhất</strong> mỗi mạch. Bản sao lưu không chứa mật khẩu WiFi.
        </p>
        <div className="space-y-3">
          <Step n={1} title="Mở bản sao lưu">
            <p>Trên thanh menu, khi đang ở tab Sao chép cấu hình, chọn <strong className={strong}>Sao chép cấu hình → 🗂 Mở bản sao lưu cấu hình…</strong>. Cũng có thể bấm <strong className={strong}>Mở bản sao lưu…</strong> ở cuối bước 1.</p>
            <Shot file="11-menu-sao-luu.webp" open={open} />
          </Step>
          <Step n={2} title="Chọn mạch và thời điểm">
            <p>Hộp chọn file mở sẵn thư mục sao lưu: mỗi mạch một thư mục mang địa chỉ IP của mạch, mỗi bản là một file có ngày giờ sao lưu trong tên, ví dụ cfg_20261126-070921.json. Chọn bản lúc trước khi chép.</p>
          </Step>
          <Step n={3} title="Bản sao lưu thành cấu hình mẫu">
            <p>Bản sao lưu được nạp như một file cfg.json mẫu. Chọn các phần cần trả lại, tick đúng mạch đó ở bước 2 rồi bấm Gửi. Khi ô sao lưu đang bật, Tool vẫn sao lưu cấu hình hiện tại trước khi ghi, nên bước khôi phục cũng hoàn tác được.</p>
            <Shot file="12-khoi-phuc.webp" open={open} narrow />
          </Step>
        </div>
        <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
          <p>
            Tên mạch không lấy theo bản sao lưu, giống như với mọi mẫu khác. Nếu đợt trước có đổi tên và bạn muốn trả lại tên cũ, gõ tên cũ vào cột <strong className={strong}>Tên mới</strong> trước khi gửi.
          </p>
        </Callout>
      </section>

      {/* Khác bản cũ */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>So Với Bản Cũ</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Chọn từng phần">bản cũ chép đè cả file cfg.json; nay mỗi mạch giữ nguyên mọi phần bạn không chọn.</Point>
          <Point title="An toàn hơn">WiFi mặc định không chép; IP tĩnh không bao giờ chép (bản cũ làm mọi mạch trùng IP); khoá OTA và Mã PIN không chép; mạch khác dòng không nhận phần LED.</Point>
          <Point title="Thấy trước, sửa trước">tóm tắt mẫu hiện ngay số cổng, GPIO, số LED, loại LED, nguồn, nút bấm. Tên trùng, tên sai báo trên hàng kèm nút sửa nhanh.</Point>
          <Point title="Gửi có kiểm soát">gửi lần lượt từng mạch, mỗi hàng hiện đang ghi, đang khởi động lại, đã online lại. Mạch không online lại thì dừng; chỉ đổi tên thì không khởi động lại; mạch đã giống mẫu thì bỏ qua.</Point>
          <Point title="Sao lưu tự động">cấu hình cũ của từng mạch được lưu trên máy, mở lại bằng menu để khôi phục.</Point>
        </ul>
      </section>

      {/* Mẹo */}
      <section className="space-y-3">
        <SectionHeading accent={ACCENT}>Mẹo Cho Thợ Lắp Đặt</SectionHeading>
        <ul className="text-xs text-slate-400 space-y-1.5">
          <Point title="Chuẩn một mạch trước">cài đặt và chạy thử kỹ mạch mẫu ở tab Cấu hình phần cứng. Mẫu sai thì mọi mạch sai theo.</Point>
          <Point title="Gửi thử một mạch">tick một mạch, gửi, xem LED chạy đúng rồi mới tick cả đội hình.</Point>
          <Point title="Giữ mẫu cho công trình sau">bấm Lưu ra file… và đặt tên file theo công trình. Lần sau chỉ cần Mở file cfg.json.</Point>
          <Point title="Tên theo vị trí lắp">Đánh số mạch đang chọn đi theo thứ tự trong bảng, không theo vị trí lắp. Cần tên khớp vị trí thì sửa tay ở cột Tên mới, rồi ghi tên lên vỏ mạch để dễ tìm khi bảo trì.</Point>
          <Point title="Không gửi giờ diễn">mạch khởi động lại làm LED tắt khoảng 10 giây và dừng show đang phát.</Point>
        </ul>
        <Callout icon={<Lightbulb className="w-5 h-5 text-emerald-400" />}>
          <p>
            Dựng show cho cả đội hình sau khi cài đặt xong? Xem bài <Link to="/post-news/tab-timecode-tool-argb-hsl/" className={link}>Tab Timecode: lập trình show ánh sáng theo nhạc</Link>.
          </p>
        </Callout>
        <p className="text-[11px] text-slate-500">Ảnh chụp từ Tool ARGB HSL v4.0.0 với dữ liệu mẫu. Tên mạch, địa chỉ IP và tên WiFi trên máy của bạn sẽ khác.</p>
      </section>

      <ArtQuote accent={ACCENT}>
        Cần hỗ trợ cài đặt nhiều mạch cho công trình? Gọi hoặc nhắn Zalo cho Happy Smart Light qua số 0784 140 494, gửi kèm ảnh chụp màn hình tab Sao chép cấu hình để được hỗ trợ nhanh hơn.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={PHOTOS}
        currentIndex={activeIndex}
        title="Ảnh tab Sao chép cấu hình"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}

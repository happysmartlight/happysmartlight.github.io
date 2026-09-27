import { Link } from "react-router-dom";
import { Cpu, Monitor, Network, TriangleAlert, CircleCheck, CircleX, Grid2x2, Cable, ListChecks, Zap, Settings2, Server, Radio, ScanSearch, RadioTower, PlugZap } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";

/** Số pixel hợp lệ cho mỗi Port Mapping khai báo trong xLights. */
const PORT_MAPPING = [
  { port: "Port 1", pixel: "1024 hoặc 1200 Pixel" },
  { port: "Port 2", pixel: "1024 hoặc 1200 Pixel" },
  { port: "Port 3", pixel: "1024 hoặc 1200 Pixel" },
  { port: "Port 4", pixel: "1024 hoặc 1200 Pixel" },
];

/** Hai cấu hình Controller hợp lệ khi khai báo thiết bị trong xLights. */
const CONTROLLER_PROFILES = [
  {
    key: "espixelstick",
    max: "4.096 LED",
    vendor: "ESPixelStick",
    model: "ESPixelStick-4X",
    variant: "ESP32",
    protocol: "DDP",
    protocolNote: "Cho hiệu ứng mượt nhất — ưu tiên chọn DDP.",
    tone: "emerald" as const,
  },
  {
    key: "falcon",
    max: "16.000 LED",
    vendor: "Falcon",
    model: "F16V2X",
    variant: "One Expansion Board",
    protocol: "ArtNet",
    protocolNote: "Bắt buộc chuyển sang ArtNet — đây là lựa chọn duy nhất khả dụng.",
    tone: "purple" as const,
  },
];

/** Thứ tự bắt buộc khi đưa thiết bị lên xLights. */
const DISCOVER_STEPS = [
  {
    title: "Xác nhận sóng đã lên",
    desc: "Kiểm tra bộ phát sóng (router / access point) đã hoạt động và phát đúng mạng dành cho hệ thống LED.",
    icon: <RadioTower className="w-4 h-4 text-neon-blue-bright shrink-0" />,
  },
  {
    title: "Cấp nguồn cho ARGB HSL",
    desc: "Chỉ sau khi sóng đã lên mới cấp nguồn cho các mạch ARGB HSL, để thiết bị kết nối được đến bộ sóng.",
    icon: <PlugZap className="w-4 h-4 text-neon-blue-bright shrink-0" />,
  },
  {
    title: "Nhấn Discover trong xLights",
    desc: "Mở tab Controller, nhấn Discover — thiết bị ARGB HSL chính hãng sẽ tự hiện ra để cấu hình Vendor, Model, Variant.",
    icon: <ScanSearch className="w-4 h-4 text-neon-blue-bright shrink-0" />,
  },
];

const CHECKLIST = [
  "ARGB HSL không bật Mode 2D",
  "Không có cấu hình 2D Mapping trên ARGB HSL",
  "PC/Laptop chạy xLights và ARGB HSL cùng lớp mạng",
  "Port Mapping trên xLights = 1024 hoặc 1200 Pixel mỗi port",
  "Kiểm tra đúng Port Mapping của xLights, không nhầm với port vật lý trên mạch",
  "Bộ phát sóng đã lên trước khi cấp nguồn cho thiết bị ARGB HSL",
  "Nhấn Discover ở tab Controller và thấy thiết bị ARGB HSL hiện ra",
  "Chọn đúng Vendor / Model / Variant và Protocol theo số LED sử dụng",
];

/** Khối minh hoạ dạng monospace — giữ nguyên khoảng trắng, cuộn ngang trên mobile. */
function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-slate-950/80 border border-white/10 overflow-x-auto">
      <pre className="p-4 font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed whitespace-pre">
        {children}
      </pre>
    </div>
  );
}

export default function ArticleXLightsNotes() {
  return (
    <ArticleLayout
      title="Lưu Ý Khi Sử Dụng xLights Với ARGB HSL — Điều Kiện Để Nhận Tín Hiệu Điều Khiển"
      metaTitle="Lưu Ý Khi Dùng xLights Với ARGB HSL | Happy Smart Light"
      description="Năm điều kiện bắt buộc để ARGB HSL nhận tín hiệu từ xLights: tắt Mode 2D và 2D Mapping, thiết bị cùng lớp mạng, Port Mapping 1024/1200 pixel mỗi port, Discover đúng thứ tự (sóng lên trước khi cấp nguồn), và chọn đúng Controller — ESPixelStick-4X (DDP) cho 4.096 LED hoặc Falcon F16V2X (ArtNet) cho 16.000 LED."
      eyebrow="HAPPY SMART LIGHT — LƯU Ý KỸ THUẬT xLIGHTS"
      bannerImg="/img/partner/partner-xlights-banner.jpg"
      accent="blue"
      path="/post-news/luu-y-khi-su-dung-xlights-voi-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      {/* Intro */}
      <Callout icon={<Zap className="w-5 h-5 text-neon-blue-bright" />}>
        <p>
          Để <strong className="text-white">ARGB HSL</strong> có thể nhận và hiển thị tín hiệu điều khiển từ{" "}
          <strong className="text-white">xLights</strong>, vui lòng kiểm tra đầy đủ <strong className="text-white">5 điều kiện</strong> dưới đây. Nếu thiếu bất kỳ điều kiện nào, xLights sẽ không Discover được thiết bị hoặc gửi dữ liệu nhưng LED không sáng.
        </p>
      </Callout>

      {/* ── 1. Mode 2D ── */}
      <section className="space-y-3">
        <SectionHeading accent="blue">
          <span className="font-mono text-neon-blue-bright mr-1">01</span> ARGB HSL Không Được Sử Dụng Mode 2D
        </SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
              <TriangleAlert className="w-4 h-4 text-red-400 shrink-0" />
              Không bật Mode 2D
            </h3>
            <p className="text-xs text-slate-400">
              ARGB HSL phải đang ở trạng thái <strong className="text-red-300">không bật Mode 2D</strong>. Khi Mode 2D đang hoạt động, thiết bị ưu tiên luồng dữ liệu nội bộ và bỏ qua tín hiệu từ xLights.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
              <Grid2x2 className="w-4 h-4 text-red-400 shrink-0" />
              Không cấu hình 2D Mapping
            </h3>
            <p className="text-xs text-slate-400">
              Thiết bị <strong className="text-red-300">không được cấu hình Mapping 2D</strong>. Nếu đã từng map ma trận 2D, cần xoá cấu hình trước khi chạy xLights.
            </p>
          </div>
        </div>

        <InfoCard>
          <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
            <Settings2 className="w-4 h-4 text-neon-blue-bright shrink-0" />
            Kiểm tra ở đâu?
          </h3>
          <p className="text-xs text-slate-400">
            Trạng thái <strong className="text-white">2D Mode</strong> và <strong className="text-white">2D Mapping</strong> có thể xem trực tiếp trên{" "}
            <Link to="/argb-hsl-tool-pc" className="text-neon-blue-bright no-underline hover:underline">Tool ARGB HSL</Link>. Nếu đang bật 2D hoặc còn Mapping 2D, hãy <strong className="text-white">tắt / xoá cấu hình 2D</strong> rồi mới sử dụng với xLights.
          </p>
        </InfoCard>
      </section>

      {/* ── 2. Cùng lớp mạng ── */}
      <section className="space-y-3">
        <SectionHeading accent="blue">
          <span className="font-mono text-neon-blue-bright mr-1">02</span> Thiết Bị Điều Khiển Phải Cùng Lớp Mạng
        </SectionHeading>

        <ArtQuote accent="blue">
          Thiết bị chạy xLights và ARGB HSL phải nằm trong <strong className="text-white">cùng một lớp mạng</strong> (Same Network / Subnet).
        </ArtQuote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard>
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4 text-neon-blue-bright shrink-0" />
              Laptop / PC chạy xLights
            </h3>
            <p className="font-mono text-xs text-slate-300">IP: 192.168.1.100</p>
          </InfoCard>
          <InfoCard>
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-neon-blue-bright shrink-0" />
              Mạch ARGB HSL
            </h3>
            <p className="font-mono text-xs text-slate-300">IP: 192.168.1.200</p>
          </InfoCard>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-2">
            <h3 className="font-semibold text-white text-xs flex items-center gap-2">
              <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              Hợp lệ — cùng lớp mạng
            </h3>
            <CodeBlock>{`192.168.1.xxx  ↔  192.168.1.xxx`}</CodeBlock>
          </div>
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 space-y-2">
            <h3 className="font-semibold text-white text-xs flex items-center gap-2">
              <CircleX className="w-4 h-4 text-red-400 shrink-0" />
              Không hợp lệ — khác lớp mạng
            </h3>
            <CodeBlock>{`192.168.1.xxx  ↔  192.168.0.xxx`}</CodeBlock>
          </div>
        </div>

        <Callout icon={<Network className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Nếu xLights <strong className="text-white">không Discover</strong> hoặc không gửi được dữ liệu đến ARGB HSL, hãy kiểm tra{" "}
            <strong className="text-white">IP Address</strong>, <strong className="text-white">Subnet Mask</strong> và{" "}
            <strong className="text-white">Network Adapter</strong> trước tiên.
          </p>
        </Callout>
      </section>

      {/* ── 3. Port Mapping ── */}
      <section className="space-y-3">
        <SectionHeading accent="blue">
          <span className="font-mono text-neon-blue-bright mr-1">03</span> Cấu Hình Port Mapping Trên xLights
        </SectionHeading>

        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
          <TriangleAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300">
            <strong className="text-amber-300">Đặc biệt lưu ý:</strong> Port Mapping trên xLights{" "}
            <strong className="text-white">không phải</strong> là port vật lý thực tế trên mạch ARGB HSL.
          </p>
        </div>

        <p className="text-sm text-slate-400">
          Trong xLights, mỗi <strong className="text-white">Port Mapping</strong> cần được khai báo theo số lượng pixel — tuỳ cấu hình hệ thống, mỗi port sử dụng <strong className="text-neon-blue-bright">1024</strong> hoặc{" "}
          <strong className="text-neon-blue-bright">1200 pixel</strong>.
        </p>

        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-900/80 font-mono text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="text-left px-4 py-2.5 font-bold">Port Mapping trên xLights</th>
                <th className="text-right px-4 py-2.5 font-bold">Số lượng Pixel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PORT_MAPPING.map((row) => (
                <tr key={row.port} className="bg-slate-900/30">
                  <td className="px-4 py-2.5 text-slate-300 flex items-center gap-2">
                    <Cable className="w-3.5 h-3.5 text-neon-blue-bright shrink-0" />
                    {row.port}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-white">{row.pixel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white text-xs">Ví dụ khai báo trong xLights</h3>
            <CodeBlock>{`xLights
 ├── Port Mapping 1 → 1024 Pixel
 ├── Port Mapping 2 → 1024 Pixel
 ├── Port Mapping 3 → 1200 Pixel
 └── Port Mapping 4 → 1200 Pixel`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-white text-xs">Không nhầm lẫn giữa</h3>
            <CodeBlock>{`PORT MAPPING trên xLights
          ≠
PORT VẬT LÝ trên mạch ARGB HSL`}</CodeBlock>
          </div>
        </div>
      </section>

      {/* ── 4. Discover thiết bị ── */}
      <section className="space-y-3">
        <SectionHeading accent="blue">
          <span className="font-mono text-neon-blue-bright mr-1">04</span> Discover Thiết Bị Trước Khi Cấu Hình
        </SectionHeading>

        <Callout icon={<ScanSearch className="w-5 h-5 text-neon-blue-bright" />}>
          <p>
            Các mạch <strong className="text-white">ARGB HSL chính hãng</strong> sẽ được{" "}
            <strong className="text-white">tự động nhận diện</strong> khi nhấn nút{" "}
            <strong className="text-white">Discover</strong> ở tab <strong className="text-white">Controller</strong> của xLights. Sau khi nhấn, các thiết bị nhà ARGB HSL hiện ra trong danh sách để người dùng cấu hình Vendor, Model, Variant…
          </p>
        </Callout>

        <ArtQuote accent="blue">
          Quy trình khi Discover: <strong className="text-white">luôn xác nhận tín hiệu sóng đã lên trước</strong> — chỉ sau khi sóng đã lên mới cấp nguồn cho các thiết bị ARGB HSL để chúng kết nối được đến bộ sóng.
        </ArtQuote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DISCOVER_STEPS.map((step, idx) => (
            <InfoCard key={step.title}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold text-neon-blue-bright bg-neon-blue-bright/10 rounded-md px-1.5 py-0.5">
                  BƯỚC {idx + 1}
                </span>
              </div>
              <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
                {step.icon}
                {step.title}
              </h3>
              <p className="text-xs text-slate-400">{step.desc}</p>
            </InfoCard>
          ))}
        </div>

        <Callout icon={<TriangleAlert className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Nếu cấp nguồn cho mạch ARGB HSL <strong className="text-white">trước khi bộ sóng lên</strong>, thiết bị sẽ không tìm thấy mạng để kết nối và{" "}
            <strong className="text-white">không xuất hiện khi Discover</strong>. Khi đó hãy bật bộ sóng, chờ sóng ổn định, cấp nguồn lại cho mạch rồi nhấn Discover một lần nữa.
          </p>
        </Callout>
      </section>

      {/* ── 5. Chọn Controller ── */}
      <section className="space-y-3">
        <SectionHeading accent="blue">
          <span className="font-mono text-neon-blue-bright mr-1">05</span> Chọn Thiết Bị Controller Trong xLights
        </SectionHeading>

        <p className="text-sm text-slate-400">
          Khi thêm Controller cho mạch ARGB HSL trong xLights, cấu hình{" "}
          <strong className="text-white">Vendor / Model / Variant</strong> và <strong className="text-white">Protocol</strong> phụ thuộc vào số lượng LED bạn cần điều khiển.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {CONTROLLER_PROFILES.map((p) => {
            const tone =
              p.tone === "emerald"
                ? { box: "bg-emerald-500/5 border-emerald-500/20", text: "text-emerald-400", chip: "bg-emerald-500/10 text-emerald-300" }
                : { box: "bg-purple-500/5 border-purple-500/20", text: "text-purple-400", chip: "bg-purple-500/10 text-purple-300" };
            return (
              <div key={p.key} className={`p-4 rounded-xl border ${tone.box} space-y-3`}>
                <h3 className="font-semibold text-white text-xs flex items-center gap-2">
                  <Server className={`w-4 h-4 ${tone.text} shrink-0`} />
                  Sử dụng tối đa <span className={tone.text}>{p.max}</span>
                </h3>

                <dl className="m-0 space-y-1.5 font-mono text-[11px]">
                  {[
                    ["Vendor", p.vendor],
                    ["Model", p.model],
                    ["Variant", p.variant],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-3">
                      <dt className="text-slate-500 uppercase tracking-wider text-[10px]">{label}</dt>
                      <dd className="m-0 text-white text-right">{value}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-3 pt-1.5 border-t border-white/5">
                    <dt className="text-slate-500 uppercase tracking-wider text-[10px]">Protocol</dt>
                    <dd className="m-0 text-right">
                      <span className={`px-2 py-0.5 rounded-md font-bold ${tone.chip}`}>{p.protocol}</span>
                    </dd>
                  </div>
                </dl>

                <p className="text-xs text-slate-400 flex items-start gap-2">
                  <Radio className={`w-3.5 h-3.5 ${tone.text} shrink-0 mt-0.5`} />
                  <span>{p.protocolNote}</span>
                </p>
              </div>
            );
          })}
        </div>

        <Callout icon={<TriangleAlert className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>
            Chọn sai Model hoặc Variant sẽ khiến xLights tính sai số kênh và LED hiển thị lệch. Với cấu hình{" "}
            <strong className="text-white">16.000 LED (Falcon F16V2X)</strong>, protocol{" "}
            <strong className="text-white">phải là ArtNet</strong> — không dùng được DDP; ngược lại ở cấu hình{" "}
            <strong className="text-white">4.096 LED (ESPixelStick-4X)</strong> hãy giữ{" "}
            <strong className="text-white">DDP</strong> để luồng dữ liệu mượt nhất.
          </p>
        </Callout>
      </section>

      {/* ── Checklist ── */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Checklist Nhanh Trước Khi Chạy xLights</SectionHeading>
        <InfoCard>
          <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-3">
            <ListChecks className="w-4 h-4 text-emerald-400 shrink-0" />
            Kiểm tra lần lượt 5 mục
          </h3>
          <ul className="space-y-2.5 list-none p-0 m-0">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-px" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <Callout icon={<Zap className="w-5 h-5 text-emerald-400" />}>
          <p>
            Sau khi tất cả điều kiện trên được đáp ứng, ARGB HSL có thể nhận tín hiệu điều khiển từ{" "}
            <strong className="text-white">xLights</strong>. Xem thêm về hệ sinh thái tương thích tại trang{" "}
            <Link to="/doi-tac/partner-xLights/" className="text-neon-blue-bright no-underline hover:underline">
              HSL × xLights
            </Link>
            .
          </p>
        </Callout>
      </section>

      {/* ── Related ── */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Tài Liệu Liên Quan</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/argb-hsl-tool-pc" className="no-underline">
            <FeatureCard
              icon={<Monitor className="w-4 h-4 text-neon-blue-bright shrink-0" />}
              title="Tool ARGB HSL (PC)"
              desc="Công cụ cấu hình trên máy tính — nơi kiểm tra trạng thái 2D Mode, 2D Mapping và thông số mạng của thiết bị."
            />
          </Link>
          <Link to="/post-news/su-dung-poi-voi-argb-hsl/" className="no-underline">
            <FeatureCard
              icon={<Cpu className="w-4 h-4 text-neon-blue-bright shrink-0" />}
              title="Hướng dẫn thiết lập POI"
              desc="Cấu hình LED, kết nối phần cứng và nạp hình ảnh POV vào đạo cụ biểu diễn bằng phần mềm ARGB HSL."
            />
          </Link>
        </div>
      </section>
    </ArticleLayout>
  );
}

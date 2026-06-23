import { Music, Wifi, Cpu, Car, Home, Headphones, Rocket, Wrench, Zap, Radio } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";

const FEATURES = [
  { icon: <Radio className="w-4 h-4 text-emerald-400 shrink-0" />, title: "Đồng bộ theo nhạc real-time", desc: "Tự động bắt beat, phát hiện giai điệu để đổi hiệu ứng ánh sáng theo từng nốt nhạc." },
  { icon: <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />, title: "Hiệu ứng thông minh", desc: "Phân tích âm thanh bằng AI để tạo hiệu ứng ánh sáng sắc nét, chính xác từng giai điệu." },
  { icon: <Zap className="w-4 h-4 text-emerald-400 shrink-0" />, title: "Hiệu suất cao", desc: "Dùng ESP32 + giao thức DDP, tốc độ phản hồi cực thấp — không lag, không giật." },
  { icon: <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />, title: "Tùy chỉnh dễ dàng", desc: "Chỉnh sửa profile, hiệu ứng, mapping LED trực quan qua giao diện web." },
];

const APPLICATIONS = [
  { icon: <Headphones className="w-4 h-4 text-teal-400 shrink-0" />, label: "LED sàn nhảy & vũ đoàn biểu diễn" },
  { icon: <Car className="w-4 h-4 text-teal-400 shrink-0" />, label: "LED theo nhạc trên xe ô tô / mô tô" },
  { icon: <Home className="w-4 h-4 text-teal-400 shrink-0" />, label: "LED ambient phòng ngủ / phòng nghe nhạc" },
  { icon: <Music className="w-4 h-4 text-teal-400 shrink-0" />, label: "Studio DJ — nhạc điện tử — party" },
];

export default function PartnerLedFx() {
  return (
    <ArticleLayout
      title="Happy Smart Light × LedFX Tech — Kết Nối Ánh Sáng, Đồng Bộ Âm Thanh"
      eyebrow="HAPPY SMART LIGHT — PARTNER × LEDFX TECH"
      description="HSL chính thức hợp tác công nghệ chiến lược cùng LedFX Tech — nền tảng điều khiển ánh sáng theo nhạc mã nguồn mở hàng đầu thế giới."
      bannerImg="/img/partner/partner-LedFX-banner.png"
      accent="emerald"
      path="/doi-tac/partner-LedFx/"
      backPath="/doi-tac/"
      backLabel="ĐỐI TÁC"
    >
      {/* Intro */}
      <Callout icon={<Music className="w-5 h-5 text-emerald-400" />}>
        <p>
          <strong className="text-white">Happy Smart Light (HSL)</strong> chính thức công bố <strong className="text-white">hợp tác công nghệ chiến lược</strong> cùng <strong className="text-white">LedFX Tech</strong> — nền tảng điều khiển ánh sáng theo nhạc mã nguồn mở hàng đầu thế giới. Mang đến trải nghiệm <strong className="text-emerald-300">LED sống động, đồng bộ âm thanh — ánh sáng — cảm xúc</strong>.
        </p>
      </Callout>

      {/* Feature Grid */}
      <section className="space-y-3">
        <SectionHeading accent="emerald">Điểm Nổi Bật Của Sự Kết Hợp</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="space-y-3">
        <SectionHeading accent="emerald">Ứng Dụng & Triển Khai</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {APPLICATIONS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-white/5">
              {icon}
              <span className="text-xs text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HSL Firmware */}
      <section className="space-y-3">
        <SectionHeading accent="emerald">HSL Phát Triển Firmware Riêng</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400">
            Firmware ESP32 độc quyền từ <strong className="text-white">Happy Smart Light</strong> cho phép nhận tín hiệu DDP từ LedFX qua WiFi cực nhanh, hỗ trợ cấu hình qua Web UI hoặc app di động, giao diện thân thiện cho người không chuyên.
          </p>
        </InfoCard>
      </section>

      {/* Roadmap */}
      <section className="space-y-3">
        <SectionHeading accent="emerald">Kế Hoạch Phát Triển</SectionHeading>
        <div className="space-y-2">
          {[
            { icon: <Rocket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />, text: "Ra mắt bộ sản phẩm LED kit đồng bộ nhạc — LedFX Ready" },
            { icon: <Rocket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />, text: "Phân phối mạch điều khiển tích hợp sẵn firmware HSL × LedFX" },
            { icon: <Rocket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />, text: "Chia sẻ tài liệu hướng dẫn tự cài LedFX + cấu hình hệ thống tại nhà" },
            { icon: <Rocket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />, text: "Tổ chức các Mini LED show thử nghiệm trong cộng đồng LED Việt" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-white/5">
              {icon}
              <span className="text-xs text-slate-300">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <ArtQuote accent="emerald">
        "Không chỉ là ánh sáng — đó là cảm xúc nhảy múa theo từng giai điệu."
      </ArtQuote>
    </ArticleLayout>
  );
}

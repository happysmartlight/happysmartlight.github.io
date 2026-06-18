import { Monitor, Code, Music, Layers, BookOpen, Cpu, Palette, Settings, Volume2, HardDrive, Wifi, Zap } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";
import TikTokEmbed from "../TikTokEmbed";

const CURRICULUM = [
  { ch: "1", title: "Giới thiệu phần mềm", desc: "Lịch sử phát triển xLights & Nutcracker, cộng đồng mã nguồn mở" },
  { ch: "2", title: "Bắt đầu nhanh (Quick Start)", desc: "Cài đặt, tạo thư mục làm việc, định nghĩa mạng điều khiển, thiết kế mô hình, tạo sequence" },
  { ch: "3", title: "Giao diện phần mềm", desc: "5 tab chính: Setup, Layout, Sequencer, FPP Connect, Scheduler" },
  { ch: "4", title: "Thiết kế mô hình đèn (Layout)", desc: "Tạo Arch, Tree, Matrix, Candy Cane — gán pixel, vị trí, hướng" },
  { ch: "5", title: "Kết nối Controller", desc: "Ánh xạ ESP32, Falcon, Kulp — thiết lập IP, universe, kênh" },
  { ch: "6", title: "Lập trình hiệu ứng (Sequencer)", desc: "Tạo hiệu ứng khớp nhạc, kéo-thả vào timeline, dùng timing marks" },
  { ch: "7", title: "Thư viện hiệu ứng", desc: "60+ hiệu ứng: Wave, Butterfly, Fan, Fireworks — multi-layer" },
  { ch: "8", title: "Bộ trộn hiệu ứng (Mixer)", desc: "Kết hợp nhiều hiệu ứng, mask vùng hiển thị, layer blending" },
  { ch: "9", title: "Quản lý nhịp & âm thanh", desc: "Timing marks, định vị lời nhạc, đoạn điệp khúc" },
  { ch: "10-13", title: "Xuất – Nhập – Backup", desc: "Xuất file ra Raspberry Pi, backup cấu hình, nhập từ cộng đồng" },
  { ch: "14-16", title: "Tính năng nâng cao", desc: "Test LED trực tiếp, DMX nâng cao, phím tắt chuyên sâu" },
];

export default function PartnerXLights() {
  return (
    <ArticleLayout
      title="HSL x xLights – Giải Pháp Hoàn Hảo Cho Trình Diễn Ánh Sáng Nghệ Thuật"
      eyebrow="HAPPY SMART LIGHT — PARTNER × xLIGHTS"
      description="Kết hợp mạch điều khiển LED ARGB HSL cùng phần mềm xLights nổi tiếng toàn cầu — bộ đôi hoàn hảo giúp biến mọi ý tưởng ánh sáng thành hiện thực."
      bannerImg="/img/service/partner-xlights-banner.jpg"
      accent="blue"
      path="/service/partner-xLights/"
      backPath="/service/"
      backLabel="DỊCH VỤ"
    >
      {/* Intro */}
      <Callout icon={<Zap className="w-5 h-5 text-neon-blue-bright" />}>
        <p>
          Hãy khám phá sự kết hợp giữa <strong className="text-white">mạch điều khiển LED ARGB do HSL thiết kế</strong> cùng phần mềm <strong className="text-white">xLights</strong> nổi tiếng toàn cầu — bộ đôi hoàn hảo giúp bạn biến mọi ý tưởng ánh sáng thành hiện thực.
        </p>
      </Callout>

      {/* Section: Hardware + Software */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Bộ Đôi Sức Mạnh</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Cpu className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="Phần cứng HSL — Chuyên LED ARGB"
            desc="Tương thích 100% WS2812, SK6812, APA102. Tối ưu cho LED nghệ thuật, sân khấu, showroom. Tích hợp Wi-Fi, DDP, E1.31, DMX."
          />
          <FeatureCard
            icon={<Monitor className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="Phần mềm xLights — Không Giới Hạn"
            desc="Đồng bộ hiệu ứng với nhạc. Giao diện kéo-thả. Hơn 60 hiệu ứng tối ưu. Xuất show chạy offline trên Raspberry Pi."
          />
        </div>
      </section>

      {/* Section: Training Overview */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Nội Dung Đào Tạo HSL × xLights</SectionHeading>
        <ArtQuote accent="blue">
          HSL cung cấp chương trình đào tạo toàn diện, giúp bạn từ <strong className="text-white">người mới</strong> đến <strong className="text-white">người làm nghề</strong> đều có thể tạo nên buổi trình diễn ánh sáng chuyên nghiệp.
        </ArtQuote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {[
            { icon: <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />, t: "Giới thiệu & Cài đặt xLights" },
            { icon: <Layers className="w-4 h-4 text-cyan-400 shrink-0" />, t: "Tạo mô hình không gian thực" },
            { icon: <Settings className="w-4 h-4 text-cyan-400 shrink-0" />, t: "Gán controller & cấu hình mạng" },
            { icon: <Music className="w-4 h-4 text-cyan-400 shrink-0" />, t: "Tạo hiệu ứng đồng bộ âm nhạc" },
            { icon: <Palette className="w-4 h-4 text-cyan-400 shrink-0" />, t: "Hiệu ứng nâng cao — trộn, mask" },
            { icon: <HardDrive className="w-4 h-4 text-cyan-400 shrink-0" />, t: "Xuất & test trên mạch HSL" },
          ].map(({ icon, t }) => (
            <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-white/5">
              {icon}
              <span className="text-xs text-slate-300">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Target Audience */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Dành Cho Ai?</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: "🎭", label: "Sân khấu, Dance crew, LED xe" },
            { emoji: "🎪", label: "Trình diễn ánh sáng sự kiện" },
            { emoji: "🔧", label: "DIY & Nghệ thuật công nghệ" },
          ].map(({ emoji, label }) => (
            <InfoCard key={label}>
              <div className="text-center">
                <span className="text-2xl">{emoji}</span>
                <p className="text-xs text-slate-300 mt-2">{label}</p>
              </div>
            </InfoCard>
          ))}
        </div>
      </section>

      {/* TikTok Demo */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Demo Trình Diễn</SectionHeading>
        <TikTokEmbed videoId="7480560793746951431" />
      </section>

      {/* Curriculum Detail */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Chi Tiết Chương Trình (16 Chương)</SectionHeading>
        <div className="space-y-2">
          {CURRICULUM.map((c) => (
            <div key={c.ch} className="flex gap-3 p-3 rounded-xl bg-slate-900/30 border border-white/5 hover:border-white/15 transition-colors">
              <span className="font-mono text-[10px] text-neon-blue-bright font-bold bg-neon-blue/10 px-2 py-1 rounded-lg shrink-0 h-fit">
                CH.{c.ch}
              </span>
              <div>
                <h4 className="text-xs font-semibold text-white">{c.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Kết Luận</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400">
            xLights là công cụ <strong className="text-white">miễn phí — mạnh mẽ — cộng đồng lớn</strong> dành cho bất kỳ ai muốn <strong className="text-white">biến ánh sáng thành nghệ thuật</strong>. HSL tự hào mang đến khóa đào tạo giúp bạn hiểu rõ cấu trúc phần mềm, tạo layout LED chuyên nghiệp, lập trình hiệu ứng đồng bộ âm nhạc, và vận hành show bằng controller thực tế.
          </p>
        </InfoCard>
        <ArtQuote accent="blue">
          HSL – Chúng tôi không chỉ bán đèn, chúng tôi <strong className="text-white">giúp bạn kể câu chuyện bằng ánh sáng</strong>.
        </ArtQuote>
      </section>
    </ArticleLayout>
  );
}

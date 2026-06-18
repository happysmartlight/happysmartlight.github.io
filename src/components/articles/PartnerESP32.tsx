import { Cpu, Wifi, Shield, Zap, Settings, Radio, Rocket, Globe, GraduationCap, Monitor } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";

const ESP32_SPECS = [
  { icon: <Cpu className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "CPU 2 nhân Xtensa LX7", desc: "Tốc độ lên đến 240MHz — đủ mạnh xử lý hàng ngàn pixel LED song song." },
  { icon: <Wifi className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "Wi-Fi + Bluetooth 5.0 BLE", desc: "Băng tần 2.4GHz kết hợp BLE cho kết nối đa dạng, ổn định." },
  { icon: <Zap className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "AI/ML Instructions", desc: "Hỗ trợ xử lý âm thanh và ánh sáng bằng AI ngay trên chip." },
  { icon: <Radio className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "DMA & RMT nâng cao", desc: "Cực kỳ lý tưởng cho điều khiển LED pixel tốc độ cao, không lag." },
  { icon: <Shield className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "Bảo mật tích hợp", desc: "Secure Boot, Flash Encryption — bảo vệ firmware khỏi sao chép." },
];

const PRODUCTS = [
  { name: "HSL-PIXEL-S3", desc: "Mạch điều khiển LED pixel 8 cổng, hỗ trợ lên đến 3000 LED", icon: <Cpu className="w-4 h-4 text-cyan-400 shrink-0" /> },
  { name: "HSL-MUSIC-SYNC", desc: "Bo đồng bộ nhạc không dây dùng LedFX + DDP", icon: <Monitor className="w-4 h-4 text-cyan-400 shrink-0" /> },
  { name: "HSL-SMARTLIGHT HUB", desc: "Bộ điều khiển ánh sáng thông minh đa vùng, hỗ trợ Home Assistant", icon: <Settings className="w-4 h-4 text-cyan-400 shrink-0" /> },
];

export default function PartnerESP32() {
  return (
    <ArticleLayout
      title="Happy Smart Light × ESP32-S3 — Nâng Tầm Phần Cứng LED Thông Minh"
      eyebrow="HAPPY SMART LIGHT — PARTNER × ESPRESSIF"
      description="HSL chính thức lựa chọn dòng ESP32-S3 của Espressif Systems để tích hợp vào toàn bộ sản phẩm điều khiển LED ARGB thế hệ mới."
      bannerImg="/img/service/partner-espressif-banner.jpg"
      accent="blue"
      path="/service/partner-ESP32/"
      backPath="/service/"
      backLabel="DỊCH VỤ"
    >
      {/* Intro */}
      <Callout icon={<Cpu className="w-5 h-5 text-neon-blue-bright" />}>
        <p>
          <strong className="text-white">Happy Smart Light (HSL)</strong> chính thức lựa chọn dòng <strong className="text-white">ESP32-S3</strong> — con chip cao cấp nhất trong dòng vi điều khiển ESP32 của <strong className="text-white">Espressif Systems</strong> — để tích hợp vào toàn bộ các sản phẩm điều khiển LED ARGB, LED PIXEL và ánh sáng thông minh thế hệ mới.
        </p>
      </Callout>

      {/* Why ESP32-S3 */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Vì Sao ESP32-S3?</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ESP32_SPECS.map((s) => (
            <FeatureCard key={s.title} icon={s.icon} title={s.title} desc={s.desc} />
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Ứng Dụng Thực Tế Trong Sản Phẩm HSL</SectionHeading>
        <div className="space-y-2">
          {[
            "Nhận dữ liệu ánh sáng theo nhạc thời gian thực từ LedFX qua DDP",
            "Phân tích tín hiệu âm thanh bằng AI (Edge AI trên chip)",
            "Kết nối WiFi/Bluetooth ổn định — điều khiển từ xa qua app/web",
            "Xuất tín hiệu LED pixel (WS2812, APA102, SK6812…) mượt, không lag",
            "Tương thích Home Assistant, MQTT, OpenHAB",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-white/5">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-xs text-slate-300">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HSL Firmware */}
      <section className="space-y-3">
        <SectionHeading accent="blue">HSL Phát Triển Firmware Riêng Cho ESP32-S3</SectionHeading>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Web UI cấu hình thông minh",
            "Hỗ trợ OTA (nâng cấp firmware từ xa)",
            "Đồng bộ LedFX, xLights, WLED, vMix…",
            "API mở — dễ tích hợp nhà thông minh",
          ].map((text) => (
            <div key={text} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-xs text-slate-300 flex items-center gap-2">
              <Settings className="w-3 h-3 text-neon-blue-bright shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Sản Phẩm Tiêu Biểu Đã Ứng Dụng ESP32-S3</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PRODUCTS.map((p) => (
            <FeatureCard key={p.name} icon={p.icon} title={p.name} desc={p.desc} />
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Tầm Nhìn Hợp Tác</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400">
            Sự kết hợp giữa <strong className="text-white">HSL</strong> và <strong className="text-white">Espressif (ESP32-S3)</strong> không chỉ nâng tầm phần cứng LED Việt, mà còn mở ra cơ hội cho người dùng:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-[11px] text-slate-400">Học — sáng tạo — phát triển sản phẩm riêng</span>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-[11px] text-slate-400">Tiếp cận chuẩn công nghệ quốc tế</span>
            </div>
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-[11px] text-slate-400">Ứng dụng trong nghệ thuật & nhà thông minh</span>
            </div>
          </div>
        </InfoCard>
      </section>

      <ArtQuote accent="blue">
        "ESP32-S3 là trái tim, còn Happy Smart Light sẽ là linh hồn cho hệ thống ánh sáng thông minh thế hệ mới."
      </ArtQuote>
    </ArticleLayout>
  );
}

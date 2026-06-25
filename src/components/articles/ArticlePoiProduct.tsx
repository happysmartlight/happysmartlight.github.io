import { useState } from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import {
  Sparkles,
  BatteryCharging,
  Wifi,
  ShieldCheck,
  Image as ImageIcon,
  Eye,
  ArrowRight,
  Music,
  Award,
  Gauge,
  Users,
  Sparkle,
  Drama,
  Wand2,
} from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";
import ArticleVideoGallery from "../ArticleVideoGallery";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";

const SITE = "https://happysmartlight.com";
const PAGE_PATH = "/post-news/dao-cu-poi-led-happy-smart-light/";

const FEATURES = [
  { icon: <Gauge className="w-4 h-4 text-neon-pink-bright shrink-0" />, title: "LED tần số cao SK9822", desc: "Module LED chuyên dụng PWM 4.7KHz, dựng hình ảnh sắc nét khi xoay tốc độ cao — không nhòe, không sọc như LED thường (WS2812/WS2812B)." },
  { icon: <Wifi className="w-4 h-4 text-neon-pink-bright shrink-0" />, title: "Đồng bộ Wifi AP nội bộ", desc: "Các gậy POI tự liên kết qua sóng Wifi AP nội bộ, đồng bộ hình ảnh và thời điểm bật/tắt chính xác giữa cả nhóm múa." },
  { icon: <BatteryCharging className="w-4 h-4 text-neon-pink-bright shrink-0" />, title: "Pin sạc Type-C 5-8 giờ", desc: "Pin Li-poly 4200mAh chống phồng, đồng hồ RTC thời gian thực, hoạt động liên tục 5-8 giờ cho một buổi biểu diễn dài." },
  { icon: <ShieldCheck className="w-4 h-4 text-neon-pink-bright shrink-0" />, title: "Vỏ Polycarbonate chống va đập", desc: "Lõi vỏ nhựa Polycarbonate chịu rơi, ném, va đập mạnh — bền bỉ cho luyện tập và lưu diễn liên tục." },
];

const SPECS = [
  { label: "Vi xử lý", value: "Cortex M4 Ultra low-power Co-processor" },
  { label: "Pin Lithium sạc", value: "Li-poly 4200mAh, sạc qua cổng Type-C, chống phồng" },
  { label: "Bộ nhớ lưu ảnh", value: "128MB — nạp sẵn hàng trăm ảnh Bitmap/logo POV" },
  { label: "Cảm biến xoay", value: "Con quay hồi chuyển IMU đo chính xác hành trình múa vẽ ảnh" },
  { label: "Khối lượng", value: "240g — tối ưu trọng tâm khi quăng, múa" },
  { label: "Giao thức đồng bộ", value: "ARGB HSL POI Sync, Wireless AP mode, xLights Timeline" },
];

const APPLICATIONS = [
  { icon: <Drama className="w-4 h-4 text-purple-300 shrink-0" />, label: "Vũ đoàn biểu diễn ánh sáng chuyên nghiệp" },
  { icon: <Users className="w-4 h-4 text-purple-300 shrink-0" />, label: "Flashmob, hoạt náo sự kiện, khai trương" },
  { icon: <Music className="w-4 h-4 text-purple-300 shrink-0" />, label: "MV ca nhạc, hậu trường quay phim hiệu ứng ánh sáng" },
  { icon: <Sparkle className="w-4 h-4 text-purple-300 shrink-0" />, label: "Lễ hội ánh sáng, countdown, team building" },
];

const FAQS = [
  {
    q: "Đạo cụ POI LED là gì?",
    a: "POI (Persistence of Image — lưu ảnh thị giác) là đạo cụ cầm tay gắn dải LED, khi xoay hoặc vẽ theo quỹ đạo sẽ \"vẽ\" ra logo, chữ hoặc hình ảnh trong không khí nhờ hiện tượng lưu ảnh trên mắt người. Đạo cụ POI LED Happy Smart Light được thiết kế chuyên dụng cho biểu diễn nghệ thuật và sự kiện.",
  },
  {
    q: "Đạo cụ POI Happy Smart Light khác gì so với gậy LED thông thường?",
    a: "Sản phẩm dùng LED tần số cao SK9822 (PWM 4.7KHz) thay vì LED phổ thông WS2812/WS2812B nên hình ảnh xoay không bị nhòe hay sọc. Ngoài ra còn có IMU đo hành trình xoay, đồng bộ Wifi AP giữa nhiều gậy và pin sạc rời chuyên dụng cho biểu diễn liên tục nhiều giờ.",
  },
  {
    q: "Pin của đạo cụ POI dùng được bao lâu?",
    a: "Pin Li-poly 4200mAh sạc qua cổng Type-C cho thời gian hoạt động liên tục khoảng 5-8 giờ mỗi lần sạc đầy, đủ cho cả buổi tập luyện và biểu diễn.",
  },
  {
    q: "Làm sao để nạp logo, hình ảnh riêng vào đạo cụ POI?",
    a: "Sử dụng phần mềm ARGB HSL Tool (miễn phí, tải về máy tính Windows): kiểm tra kết nối mạch ở Tab Cấu hình phần cứng, tick chọn mode Poi, thiết lập số lượng pixel, độ sáng rồi nạp ảnh logo trực tiếp vào mạch. Xem chi tiết từng bước trong bài hướng dẫn cấu hình POI.",
  },
  {
    q: "Giá đạo cụ POI Happy Smart Light là bao nhiêu?",
    a: "Giá bán thay đổi theo cấu hình LED, số lượng pixel mỗi mặt (tối đa 145 LED/mặt) và thời giá linh kiện tại thời điểm đặt hàng. Liên hệ Happy Smart Light qua hotline/Zalo 0784 140 494 để được tư vấn báo giá chính xác theo nhu cầu biểu diễn.",
  },
];

const GALLERY_FILES = [
  "73a2539bc3aa4cf415bb47.jpg",
  "228096405165556914446.jpg",
  "9ec3b7f727c6a898f1d750.jpg",
  "69a0c79657a7d8f981b651.jpg",
  "42680700471224202225.jpg",
  "189547626772519281042.jpg",
  "189547626772519281043.jpg",
  "12530490991406016422.jpg",
];

const GALLERY: ZoomGalleryItem[] = GALLERY_FILES.map((file, idx) => ({
  url: `/img/post-news/poi/hinh-anh-su-dung/hinh-dep/${file}`,
  label: `Đạo cụ POI Happy Smart Light #${idx + 1}`,
  alt: `Hình ảnh thực tế đạo cụ POI LED Happy Smart Light #${idx + 1}`,
}));

const PRODUCT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Đạo Cụ POI LED Happy Smart Light (Happy POI Performance Wand)",
  description: "Gậy múa LED POI cầm tay, hiển thị logo và hình ảnh POV theo chuyển động xoay, pin sạc tích hợp, đồng bộ không dây cho nhóm biểu diễn chuyên nghiệp.",
  image: [`${SITE}/img/post-news/poi/hinh-anh-su-dung/z7404784963475_e832ec45e843c34caa5bc5cd46c44111.jpg`],
  brand: { "@type": "Brand", name: "Happy Smart Light" },
  url: `${SITE}${PAGE_PATH}`,
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function ArticlePoiProduct() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  return (
    <ArticleLayout
      title="Đạo Cụ POI LED Happy Smart Light — Gậy Múa Trình Diễn Logo, Hình Ảnh Theo Chuyển Động"
      metaTitle="Đạo Cụ POI LED Happy Smart Light | Gậy Múa LED Biểu Diễn"
      description="Đạo cụ POI LED Happy Smart Light: gậy múa LED hiển thị logo, hình ảnh sống động theo chuyển động xoay, pin sạc bền bỉ, đồng bộ không dây cho cả nhóm biểu diễn."
      eyebrow="HAPPY SMART LIGHT — SẢN PHẨM ĐẠO CỤ POI"
      bannerImg="/img/post-news/poi/hinh-anh-su-dung/z7404784963475_e832ec45e843c34caa5bc5cd46c44111.jpg"
      accent="pink"
      path={PAGE_PATH}
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(PRODUCT_JSON_LD)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      </Head>

      {/* Intro */}
      <Callout icon={<Wand2 className="w-5 h-5 text-neon-pink-bright" />}>
        <p>
          <strong className="text-white">Đạo cụ POI LED Happy Smart Light</strong> là gậy múa LED cầm tay ứng dụng hiệu ứng <strong className="text-white">POI (Persistence of Image)</strong> — khi xoay hoặc vẽ theo quỹ đạo, dải LED sẽ hiển thị logo, chữ và hình ảnh sống động trong không khí. Sản phẩm được thiết kế chuyên dụng cho <strong className="text-neon-pink-bright">vũ đoàn, sự kiện và nghệ sĩ biểu diễn ánh sáng</strong> tại Việt Nam.
        </p>
      </Callout>

      {/* What is POI */}
      <section className="space-y-3">
        <SectionHeading accent="pink">POI Là Gì? Vì Sao Chọn Đạo Cụ POI Happy Smart Light</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400 leading-relaxed">
            POI là kỹ thuật trình diễn ánh sáng dựa trên hiện tượng lưu ảnh trên mắt người: dải LED chớp tắt theo từng dòng pixel cực nhanh trong lúc đạo cụ chuyển động, ghép lại thành một hình ảnh hoàn chỉnh trước mắt người xem. Đạo cụ POI của Happy Smart Light sử dụng <strong className="text-white">module LED chuyên dụng SK9822 tần số cao (PWM 4.7KHz)</strong> — khắc phục triệt để hiện tượng nhòe, sọc hình mà các loại LED phổ thông như WS2812/WS2812B gặp phải khi xoay tốc độ cao. Kết hợp cảm biến xoay IMU và giao thức đồng bộ độc quyền <strong className="text-white">ARGB HSL POI Sync</strong>, đạo cụ cho hình ảnh sắc nét, ổn định và đồng bộ chính xác giữa nhiều gậy cùng lúc trên sân khấu.
          </p>
        </InfoCard>
      </section>

      {/* Features */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Tính Năng Nổi Bật</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>

      {/* Specs */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Thông Số Kỹ Thuật</SectionHeading>
        <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5">
          {SPECS.map((spec) => (
            <div key={spec.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-3 bg-slate-900/30">
              <span className="text-[11px] font-mono text-neon-pink-bright font-bold uppercase tracking-wide sm:w-44 shrink-0">{spec.label}</span>
              <span className="text-xs text-slate-300">{spec.value}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">
          Cấu hình LED tối đa <strong className="text-slate-300">145 LED mỗi mặt</strong> đạo cụ, thiết lập qua phần mềm{" "}
          <Link to="/post-news/su-dung-poi-voi-argb-hsl/" className="text-neon-pink-bright hover:underline">
            ARGB HSL Tool
          </Link>.
        </p>
      </section>

      {/* Applications */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Ứng Dụng Thực Tế</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {APPLICATIONS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-white/5">
              {icon}
              <span className="text-xs text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Video Demo */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Video Trình Diễn Thực Tế</SectionHeading>
        <ArticleVideoGallery videos={[{ youtube: "https://www.youtube.com/watch?v=WLtPjFGXv6s", title: "Demo đạo cụ POI — Happy Smart Light" }]} columns={1} accent="pink" />
      </section>

      {/* Gallery */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Hình Ảnh Đạo Cụ POI Thực Tế</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GALLERY.map((photo, idx) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsViewerOpen(true);
              }}
              aria-label={`Xem lớn ${photo.label}`}
              className="group/poi relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/60"
            >
              <img
                src={photo.url}
                alt={photo.alt ?? photo.label}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover/poi:scale-[1.05] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/poi:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">
          Xem thêm album đầy đủ trong{" "}
          <Link to="/post-news/su-dung-poi-voi-argb-hsl/" className="text-neon-pink-bright hover:underline">
            bài hướng dẫn sử dụng tính năng POI
          </Link>.
        </p>
      </section>

      {/* CTA */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/san-pham/poi"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-neon-pink to-purple-600 text-white text-xs font-mono font-bold no-underline hover:scale-[1.02] transition-transform"
        >
          <Award className="w-4 h-4" />
          Xem Giá & Đặt Hàng
        </Link>
        <Link
          to="/post-news/su-dung-poi-voi-argb-hsl/"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs font-mono font-bold no-underline hover:border-white/25 transition-colors"
        >
          <ImageIcon className="w-4 h-4" />
          Hướng Dẫn Cấu Hình & Nạp Ảnh
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* FAQ */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Câu Hỏi Thường Gặp Về Đạo Cụ POI</SectionHeading>
        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <InfoCard key={q}>
              <h3 className="text-xs font-semibold text-white flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-neon-pink-bright shrink-0 mt-0.5" />
                {q}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{a}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <ArtQuote accent="pink">
        Đạo cụ POI Happy Smart Light — biến từng vòng xoay thành ánh sáng, biến ánh sáng thành nghệ thuật.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={GALLERY}
        currentIndex={activeIndex}
        title="Đạo cụ POI Happy Smart Light"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}

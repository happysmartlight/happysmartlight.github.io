import { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, AlertTriangle, Settings, Download, HardDrive, Lightbulb, Eye } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";
import ArticleVideoGallery from "../ArticleVideoGallery";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";
import { WINDOWS_TOOL_URL } from "../../windowsTool";
import { POI_STUDIO_URL, POI_STUDIO_SIZE } from "../../poiStudio";

const STORAGE_TABLE = [
  { pixel: "15 × 15", size: "~0.76 KB", max: "5,290 ảnh" },
  { pixel: "30 × 30", size: "~2.75 KB", max: "1,455 ảnh" },
  { pixel: "60 × 60", size: "~10.6 KB", max: "377 ảnh" },
  { pixel: "72 × 72", size: "~15.2 KB", max: "262 ảnh" },
  { pixel: "100 × 100", size: "~29.3 KB", max: "136 ảnh" },
  { pixel: "145 × 145", size: "~61.8 KB", max: "64 ảnh" },
];


const DEMO_PHOTO_FILES = [
  "12530490991406016422.jpg",
  "16306775808821168501.jpg",
  "189547626772519281042.jpg",
  "189547626772519281043.jpg",
  "228096405165556914446.jpg",
  "42680700471224202225.jpg",
  "69a0c79657a7d8f981b651.jpg",
  "73a2539bc3aa4cf415bb47.jpg",
  "7747ab723b43b41ded5252.jpg",
  "9ec3b7f727c6a898f1d750.jpg",
  "z7404349773725_2a3b6787293d82b7b047b48787acd693.jpg",
  "z7404349779794_0727a31a4acfd707e25e5562f9303932.jpg",
  "z7404349807836_1072ac7362afaa00c0ee7be44529fbff.jpg",
  "z7404349833925_3b285bae6e508827dc28fe7483f752f4.jpg",
  "z7404349861256_34441da41da3f21898c4f2a8345b3714.jpg",
  "z7404349994982_05bf18ac2bfc293b0079128f629628f8.jpg",
  "z7404350039355_e043596f5c624c46c2b85b2867d70d78.jpg",
  "z7404350039360_a4aaf6e67689cf9fea00961dd6738c4b.jpg",
];

const DEMO_PHOTOS: ZoomGalleryItem[] = DEMO_PHOTO_FILES.map((file, idx) => ({
  url: `/img/post-news/poi/hinh-anh-su-dung/hinh-dep/${file}`,
  label: `Ảnh demo POI #${idx + 1}`,
  alt: `Hình ảnh demo sử dụng tính năng POI Happy Smart Light #${idx + 1}`,
}));

const GUIDE_PHOTOS: ZoomGalleryItem[] = [
  { url: "/img/post-news/poi/LED.jpg", label: "LED chuyên dụng POI", alt: "LED chuyên dụng POI" },
  { url: "/img/products/hsl2x-pro/ARGB_HSL_2X_TOP.png", label: "Mạch ARGB HSL Controller 2X Pro", alt: "Mạch ARGB HSL Controller 2X Pro với chân P15, P16" },
  { url: "/img/post-news/poi/set-on-mode-poi.png", label: "Kiểm tra kết nối & cấu hình mode Poi", alt: "Kiểm tra kết nối & cấu hình mode Poi" },
  { url: "/img/poi-hsl-studio/poi-hsl-studio-cong-cu-poi.webp", label: "Nạp ảnh logo bằng POI HSL Studio", alt: "Giao diện Công cụ POI của POI HSL Studio: set pixel, độ sáng và nạp ảnh logo" },
  { url: "/img/poi-hsl-studio/poi-hsl-studio-gui-nhieu-anh.webp", label: "Gửi nhiều ảnh cho cả đội gậy", alt: "Hộp thoại gửi nhiều ảnh lên nhiều gậy POI của POI HSL Studio" },
];

function ZoomableImage({ src, alt, className, onClick }: { src: string; alt: string; className?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Xem lớn ${alt}`}
      className="group/zoom relative block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/60"
    >
      <img src={src} alt={alt} loading="lazy" className={className} />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Eye className="w-5 h-5 text-white" />
      </div>
    </button>
  );
}

export default function ArticlePoiGuide() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState<boolean>(false);
  const [activeGuideIndex, setActiveGuideIndex] = useState<number>(0);
  const [isGuideViewerOpen, setIsGuideViewerOpen] = useState<boolean>(false);

  const openGuidePhoto = (url: string) => {
    const index = GUIDE_PHOTOS.findIndex((photo) => photo.url === url);
    if (index < 0) return;
    setActiveGuideIndex(index);
    setIsGuideViewerOpen(true);
  };

  return (
    <ArticleLayout
      title="Hướng Dẫn Sử Dụng Tính Năng POI — Happy Smart Light"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN KỸ THUẬT POI"
      description="Hướng dẫn cấu hình LED, kết nối phần cứng và dùng app POI HSL Studio để nạp hình ảnh vào gậy POI biểu diễn."
      bannerImg="/img/post-news/poi/hinh-anh-su-dung/hinh-dep/9ec3b7f727c6a898f1d750.jpg"
      accent="pink"
      path="/post-news/su-dung-poi-voi-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      {/* Intro */}
      <Callout icon={<Lightbulb className="w-5 h-5 text-neon-pink-bright" />}>
        <p>
          Tính năng <strong className="text-white">POI (Persistence of Image)</strong> trên sản phẩm HSL cho phép hiển thị logo, chữ và hình ảnh khi đạo cụ chuyển động — giúp bài diễn trở nên nổi bật, chuyên nghiệp và ấn tượng hơn.
        </p>
      </Callout>

      {/* Hardware Requirements */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Yêu Cầu Phần Cứng</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard>
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-neon-pink-bright shrink-0" />
              LED chuyên dụng POI
            </h3>
            <p className="text-xs text-slate-400">
              Tối đa <strong className="text-neon-pink-bright">145 LED cho mỗi mặt</strong> đạo cụ POI. Bắt buộc sử dụng LED tần số cao chuyên dụng.
            </p>
            <div className="mt-2 rounded-lg overflow-hidden border border-white/10">
              <ZoomableImage src="/img/post-news/poi/LED.jpg" alt="LED chuyên dụng POI" className="w-full object-cover" onClick={() => openGuidePhoto("/img/post-news/poi/LED.jpg")} />
            </div>
          </InfoCard>
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
            <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              Không hỗ trợ LED thường
            </h3>
            <p className="text-xs text-slate-400 mb-2">
              Các loại LED sau <strong className="text-red-300">không tương thích</strong> với tính năng POI:
            </p>
            <ul className="text-xs text-slate-400 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />WS2812B
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />WS2812
              </li>
            </ul>
            <p className="text-[10px] text-red-400/70 mt-2">Sử dụng sai loại LED gây lỗi hiển thị, méo hình hoặc không đồng bộ.</p>
          </div>
        </div>
      </section>

      {/* Wiring */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Kết Nối LED Với Mạch ARGB HSL Controller 2X Pro</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard>
            <p className="text-xs text-slate-400 mb-3">Đấu nối đúng chân tín hiệu:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="font-mono text-[10px] text-neon-pink-bright font-bold bg-neon-pink/10 px-2 py-0.5 rounded">P15</span>
                <span className="text-xs text-slate-300">→ Data (Dữ liệu)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="font-mono text-[10px] text-neon-blue-bright font-bold bg-neon-blue/10 px-2 py-0.5 rounded">P16</span>
                <span className="text-xs text-slate-300">→ CLK (Clock / Xung nhịp)</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">Mạch đời trước ARGB IPEX V2.0: P17 → Data, P18 → CLK.</p>
          </InfoCard>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <ZoomableImage src="/img/products/hsl2x-pro/ARGB_HSL_2X_TOP.png" alt="Mạch ARGB HSL Controller 2X Pro với chân P15, P16" className="w-full object-contain bg-slate-900/40 p-2" onClick={() => openGuidePhoto("/img/products/hsl2x-pro/ARGB_HSL_2X_TOP.png")} />
          </div>
        </div>
      </section>

      {/* Config Steps - Condensed */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Cấu Hình LED & Chip LED</SectionHeading>
        <div className="space-y-3">
          {[
            {
              step: "1",
              title: "Kiểm tra kết nối & cấu hình mode Poi (làm 1 lần)",
              desc: "Mở phần mềm ARGB HSL Windows Tool, vào Tab \"Cấu hình phần cứng\" để kiểm tra mạch đã kết nối chưa. Nếu đã kết nối, tick chọn mode Poi và cấu hình LED như hình dưới (Loại LED APA102, GPIO Data 15, GPIO CLK 16). Bước này chỉ có trên Windows Tool — POI HSL Studio không có tab này, nhưng thanh thiết bị của nó hiện \"Quay POI: Có\" để bạn kiểm tra nhanh.",
              img: "/img/post-news/poi/set-on-mode-poi.png",
            },
            {
              step: "2",
              title: "Set pixel, độ sáng và nạp ảnh logo",
              desc: "Mở app POI HSL Studio, chọn gậy, kéo-thả ảnh logo (hoặc chọn từ Thư viện mẫu), set số lượng pixel và độ sáng rồi bấm \"Gửi ảnh này\" (hoặc \"Gửi nhiều…\" cho cả đội gậy). Tab Công cụ POI của ARGB HSL Windows Tool vẫn làm được việc này.",
              img: "/img/poi-hsl-studio/poi-hsl-studio-cong-cu-poi.webp",
            },
          ].map(({ step, title, desc, img }) => (
            <div key={step} className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-white/15 transition-colors">
              <span className="font-mono text-[10px] text-neon-pink-bright font-bold bg-neon-pink/10 px-2.5 py-1 rounded-lg shrink-0 h-fit">
                B.{step}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-white">{title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
                <div className="mt-2 rounded-lg overflow-hidden border border-white/10 max-w-xs">
                  <ZoomableImage src={img} alt={title} className="w-full object-cover" onClick={() => openGuidePhoto(img)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p><strong className="text-amber-300">Lưu ý:</strong> Cấu hình LED cho POI là cài đặt cứng. Muốn tùy chỉnh lại buộc phải <strong className="text-white">KHÔI PHỤC CÀI ĐẶT GỐC</strong>.</p>
        </Callout>
      </section>

      {/* POI HSL Studio */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Thêm Hình Ảnh Bằng POI HSL Studio</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard>
            <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li>Tải & cài app <strong className="text-white">POI HSL Studio</strong> (miễn phí, cài song song ARGB HSL Windows Tool)</li>
              <li>Bật gậy POI, để máy tính và gậy cùng mạng Wi-Fi — app tự tìm gậy</li>
              <li>Kéo-thả ảnh / logo, chỉnh số pixel LED, độ sáng, kiểu hình và tốc độ quay (RPM) — thanh dung lượng báo ngay ảnh có vừa giới hạn của mạch không</li>
              <li>Bấm <strong className="text-white">Gửi ảnh này</strong> (ghi vào ID trống kế tiếp) hoặc <strong className="text-white">Gửi nhiều…</strong> để nạp cho cả đội gậy cùng lúc</li>
            </ol>
            <p className="mt-3 text-[11px] text-amber-300/90 leading-relaxed">
              POI HSL Studio chỉ hỗ trợ <strong className="text-white">mạch ARGB HSL Controller 2X Pro, firmware build 2611050 trở lên</strong>. Mạch 2X Pro firmware cũ nâng cấp ngay trong app; mạch dòng khác dùng Tab Công cụ POI của ARGB HSL Windows Tool.
            </p>
            <a
              href={POI_STUDIO_URL}
              download
              className="mt-4 flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-neon-pink to-purple-600 text-white text-xs font-mono font-bold no-underline hover:scale-[1.02] transition-transform"
            >
              <Download className="w-4 h-4" />
              Tải POI HSL Studio (Windows · {POI_STUDIO_SIZE})
            </a>
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              <Link to="/poi-hsl-studio-pc/" className="text-neon-pink-bright hover:underline">Xem chi tiết POI HSL Studio</Link>
              {" · "}Cần cấu hình phần cứng (bước B.1)?{" "}
              <a href={WINDOWS_TOOL_URL} download className="text-neon-pink-bright hover:underline">Tải ARGB HSL Windows Tool</a>
            </p>
          </InfoCard>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <ZoomableImage src="/img/poi-hsl-studio/poi-hsl-studio-gui-nhieu-anh.webp" alt="Hộp thoại gửi nhiều ảnh lên nhiều gậy POI của POI HSL Studio" className="w-full object-cover" onClick={() => openGuidePhoto("/img/poi-hsl-studio/poi-hsl-studio-gui-nhieu-anh.webp")} />
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Video Demo Từ Nhà HSL</SectionHeading>
        <ArticleVideoGallery videos={[{ youtube: "https://www.youtube.com/watch?v=WLtPjFGXv6s", title: "Demo tính năng POI — Happy Smart Light" }]} columns={1} accent="pink" />
      </section>

      {/* Demo Photo Album */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Album Ảnh Demo Thực Tế</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {DEMO_PHOTOS.map((photo, idx) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => {
                setActivePhotoIndex(idx);
                setIsPhotoViewerOpen(true);
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
      </section>

      {/* Storage Table */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Bảng Dung Lượng & Số Ảnh Tối Đa</SectionHeading>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.04]">
                <th className="border border-white/10 px-3 py-2 text-left text-white font-semibold">Pixel POI</th>
                <th className="border border-white/10 px-3 py-2 text-right text-white font-semibold">Dung lượng</th>
                <th className="border border-white/10 px-3 py-2 text-right text-white font-semibold">Số ảnh tối đa (4MB)</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              {STORAGE_TABLE.map((row) => (
                <tr key={row.pixel} className="hover:bg-white/[0.02] transition-colors">
                  <td className="border border-white/10 px-3 py-2 font-mono">{row.pixel}</td>
                  <td className="border border-white/10 px-3 py-2 text-right">{row.size}</td>
                  <td className="border border-white/10 px-3 py-2 text-right font-semibold text-white">{row.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500">
          Bảng trên tính theo dung lượng bộ nhớ. Giới hạn thực tế mỗi gậy là <strong className="text-slate-300">59 ảnh POI</strong> (preset ID 1-59) và mỗi file ảnh tối đa <strong className="text-slate-300">63 KB</strong> (~145 pixel). Riêng POI HSL Studio trên mạch 2X Pro firmware build 2611050 trở lên được tới <strong className="text-slate-300">512 KB</strong> mỗi ảnh.
        </p>
      </section>

      {/* Preset & Tips */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Preset & Khuyến Nghị</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon={<HardDrive className="w-4 h-4 text-neon-pink-bright shrink-0" />}
            title="Tối đa 59 ảnh POI mỗi gậy"
            desc="Ảnh POI lưu ở preset ID 1-59 (mỗi preset = một ảnh). ID 60-240 dành cho kịch bản Timecode nên ảnh và Timecode không ghi đè nhau."
          />
          <FeatureCard
            icon={<Settings className="w-4 h-4 text-neon-pink-bright shrink-0" />}
            title="Khuyến nghị sử dụng"
            desc="Ưu tiên ảnh độ tương phản cao. Hạn chế ảnh chi tiết nhỏ. Đảm bảo nguồn cấp đủ dòng."
          />
        </div>
      </section>

      <ArtQuote accent="pink">
        Happy Smart Light — Giải pháp ánh sáng sáng tạo cho biểu diễn chuyên nghiệp.
      </ArtQuote>

      <ImageZoomLightbox
        open={isPhotoViewerOpen}
        items={DEMO_PHOTOS}
        currentIndex={activePhotoIndex}
        title="Album ảnh demo POI"
        onClose={() => setIsPhotoViewerOpen(false)}
        onIndexChange={setActivePhotoIndex}
      />

      <ImageZoomLightbox
        open={isGuideViewerOpen}
        items={GUIDE_PHOTOS}
        currentIndex={activeGuideIndex}
        title="Hình minh họa hướng dẫn POI"
        onClose={() => setIsGuideViewerOpen(false)}
        onIndexChange={setActiveGuideIndex}
      />
    </ArticleLayout>
  );
}

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Eye, Lightbulb, MousePointerClick, Search, Star } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, Callout, ArtQuote } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";
import { WINDOWS_TOOL_URL } from "../../windowsTool";
import { POI_STUDIO_URL } from "../../poiStudio";
import { POI_GALLERY_GROUPS, POI_GALLERY_ITEMS } from "./poiGalleryData";

const IMG = "/img/post-news/thu-vien-mau";
const ALL = "all";
const TOTAL = POI_GALLERY_ITEMS.length;
const GROUP_NAME = new Map(POI_GALLERY_GROUPS.map((group) => [group.id, group.name]));

const STEPS = [
  {
    icon: <MousePointerClick className="w-4 h-4 text-neon-pink-bright" />,
    title: "Mở Thư viện mẫu",
    desc: "Vào Công cụ POI trong Tool ARGB HSL hoặc POI HSL Studio, rồi bấm nút Thư viện mẫu ngay ở bước chọn ảnh.",
  },
  {
    icon: <Star className="w-4 h-4 text-neon-pink-bright" />,
    title: "Chọn mẫu ưng ý",
    desc: "Lọc theo nhóm hoặc gõ tên để tìm, không cần gõ dấu. Rê chuột lên mẫu để xem quay, bấm ☆ để lưu vào Yêu thích.",
  },
  {
    icon: <Eye className="w-4 h-4 text-neon-pink-bright" />,
    title: "Gửi lên gậy POI",
    desc: "Bấm vào mẫu là dùng ngay, app tự chọn kiểu hình phù hợp và giữ số pixel, tốc độ quay bạn đang đặt.",
  },
];

/** Bỏ dấu + chữ thường để gõ "hanh tinh" vẫn ra "Hành tinh". */
function fold(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
}

export default function ArticlePoiGallery() {
  const [group, setGroup] = useState<string>(ALL);
  const [query, setQuery] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  const visible = useMemo(() => {
    const words = fold(query).split(/\s+/).filter(Boolean);
    return POI_GALLERY_ITEMS.filter((item) => {
      if (group !== ALL && item.group !== group) return false;
      const name = fold(`${item.title} ${GROUP_NAME.get(item.group) ?? ""}`);
      return words.every((word) => name.includes(word));
    });
  }, [group, query]);

  const viewerItems: ZoomGalleryItem[] = useMemo(
    () => visible.map((item) => ({
      url: `${IMG}/${item.file}`,
      label: `${item.title} · ${GROUP_NAME.get(item.group) ?? ""}`,
      alt: `Mẫu ${item.title} mô phỏng khi gậy POI quay`,
    })),
    [visible],
  );

  const chips = [{ id: ALL, name: "Tất cả", count: TOTAL }, ...POI_GALLERY_GROUPS];

  return (
    <ArticleLayout
      title={`Thư Viện Mẫu POI: ${TOTAL} Hình Có Sẵn Để Dùng Ngay`}
      metaTitle={`Thư Viện ${TOTAL} Mẫu POI | Happy Smart Light`}
      eyebrow="HAPPY SMART LIGHT — THƯ VIỆN MẪU POI"
      description={`Xem trước toàn bộ ${TOTAL} ảnh mẫu có sẵn trong Công cụ POI của Tool ARGB HSL và POI HSL Studio, mô phỏng hình hiện ra khi gậy POI quay.`}
      bannerImg={`${IMG}/banner.webp`}
      accent="pink"
      path="/post-news/thu-vien-mau-poi/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-neon-pink-bright" />}>
        <p>
          Không có sẵn ảnh để diễn? Công cụ POI đã kèm <strong className="text-white">{TOTAL} mẫu</strong> chia theo nhóm, bấm một lần là dùng được. Toàn bộ hình bên dưới được vẽ bằng chính phần xem trước của app, nên bạn biết trước gậy sẽ hiện ra hình gì.
        </p>
      </Callout>

      <section className="space-y-3">
        <SectionHeading accent="pink">Dùng Mẫu Thế Nào?</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STEPS.map(({ icon, title, desc }) => (
            <InfoCard key={title}>
              <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
                <span className="shrink-0">{icon}</span>
                {title}
              </h3>
              <p className="text-xs text-slate-400">{desc}</p>
            </InfoCard>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden border border-white/10">
          <img
            src={`${IMG}/hop-thoai-thu-vien.webp`}
            alt="Hộp thoại Thư viện mẫu trong Công cụ POI"
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="space-y-3" id="toan-bo-mau">
        <SectionHeading accent="pink">{`Toàn Bộ ${TOTAL} Mẫu`}</SectionHeading>
        <p className="text-xs text-slate-400">
          Bấm vào hình để xem lớn. Hình mô phỏng gậy 72 LED quay nhanh, ngoài đời còn tuỳ số LED, tốc độ quay và độ sáng.
        </p>

        <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 focus-within:border-neon-pink/50 transition-colors">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm mẫu: lửa, mandala, hành tinh, hoàng kim..."
            aria-label="Tìm mẫu"
            className="w-full min-w-0 bg-transparent text-xs text-white placeholder:text-slate-500 outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const active = group === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setGroup(chip.id)}
                aria-pressed={active}
                className={`px-3 py-1.5 rounded-lg text-[11px] border transition-colors ${
                  active
                    ? "bg-neon-pink/15 border-neon-pink/50 text-white font-semibold"
                    : "bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                }`}
              >
                {chip.name} <span className="opacity-60">{chip.count}</span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500" aria-live="polite">Đang hiện {visible.length} mẫu</p>

        {visible.length === 0 ? (
          <InfoCard>
            <p className="text-xs text-slate-400 text-center">Không có mẫu nào khớp. Thử từ khác, ví dụ "lửa" hoặc "mandala".</p>
          </InfoCard>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {visible.map((item, index) => (
              <button
                key={item.file}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setIsViewerOpen(true);
                }}
                aria-label={`Xem lớn mẫu ${item.title}`}
                className="group/tile min-w-0 rounded-lg overflow-hidden bg-black border border-white/5 hover:border-neon-pink/50 transition-colors cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/60"
              >
                <img
                  src={`${IMG}/${item.file}`}
                  alt={`Mẫu ${item.title} mô phỏng khi gậy POI quay`}
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={320}
                  className="w-full h-auto aspect-square"
                />
                <span className="block px-1 py-1.5 text-[10px] leading-tight text-slate-400 group-hover/tile:text-white transition-colors line-clamp-2">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <SectionHeading accent="pink">Tải App Để Dùng Thư Viện</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href={POI_STUDIO_URL} className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-pink/40 transition-colors no-underline flex items-start gap-3">
            <Download className="w-4 h-4 text-neon-pink-bright shrink-0 mt-0.5" />
            <span>
              <span className="block text-xs font-semibold text-white">POI HSL Studio</span>
              <span className="block text-xs text-slate-400 mt-1">App gọn chuyên cho POI. Đủ {TOTAL} mẫu từ bản 1.3.0.</span>
            </span>
          </a>
          <a href={WINDOWS_TOOL_URL} className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-pink/40 transition-colors no-underline flex items-start gap-3">
            <Download className="w-4 h-4 text-neon-pink-bright shrink-0 mt-0.5" />
            <span>
              <span className="block text-xs font-semibold text-white">Tool ARGB HSL</span>
              <span className="block text-xs text-slate-400 mt-1">Bộ công cụ đầy đủ, có tab Công cụ POI. Đủ {TOTAL} mẫu từ bản 3.13.0.</span>
            </span>
          </a>
        </div>
        <p className="text-xs text-slate-400">
          Công cụ POI dùng cho mạch ARGB HSL Controller 2X Pro. Cách đấu LED và cài đặt lần đầu có trong{" "}
          <Link to="/post-news/su-dung-poi-voi-argb-hsl/" className="text-neon-pink-bright hover:underline">bài hướng dẫn POI</Link>.
        </p>
      </section>

      <ArtQuote accent="pink">
        Mẫu nào hợp với tiết mục của bạn nhất? Bạn vẫn có thể kéo-thả ảnh riêng vào app bất cứ lúc nào.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={viewerItems}
        currentIndex={activeIndex}
        title="Thư viện mẫu POI"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}

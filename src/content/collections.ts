import data from "./generated/collections.json";
import type { CollectionKey } from "./collections-meta";

export type { CollectionKey } from "./collections-meta";
export { COLLECTION_META, COLLECTION_KEYS } from "./collections-meta";

export interface CollectionItem {
  slug: string;
  collection: string;
  url: string;
  title: string;
  metaTitle: string;
  image: string;
  bigimg: string;
  tags: string[];
  excerpt: string;
  html: string;
  /** ISO date (yyyy-mm-dd) the article/news was published — used to sort & filter. */
  date?: string;
}

const PORTED_PARTNERS: CollectionItem[] = [
  {
    slug: "partner-xLights",
    collection: "doi-tac",
    url: "/doi-tac/partner-xLights/",
    title: "Happy Smart Light hợp tác phát triển cùng xLights Việt Nam",
    metaTitle: "xLights Partner",
    image: "/img/partner/partner-xlights-banner.jpg",
    bigimg: "/img/partner/partner-xlights-banner.jpg",
    tags: ["partner", "xLights", "training"],
    excerpt: "Happy Smart Light tự hào hợp tác cùng xLights Việt Nam mang đến giải pháp trình diễn ánh sáng chuyên nghiệp hàng đầu.",
    html: ""
  },
  {
    slug: "partner-Moonlight-dance",
    collection: "doi-tac",
    url: "/doi-tac/partner-Moonlight-dance/",
    title: "Đối tác chiến lược ánh sáng biểu diễn Moonlight Dance Studio",
    metaTitle: "Moonlight Dance Partner",
    image: "/img/partner/partner-MOONLIGHT-DANCE-STUDIO/partner-MOONLIGHT-DANCE-STUDIO.jpg",
    bigimg: "/img/partner/partner-MOONLIGHT-DANCE-STUDIO/partner-MOONLIGHT-DANCE-STUDIO-banner.jpg",
    tags: ["partner", "led-dance", "performance"],
    excerpt: "Sự kết hợp nghệ thuật nhảy múa đương đại và công nghệ ánh sáng thông minh giữa HSL và MoonLight Dance.",
    html: ""
  },
  {
    slug: "partner-LedFx",
    collection: "doi-tac",
    url: "/doi-tac/partner-LedFx/",
    title: "Đồng bộ hiệu ứng âm thanh thời gian thực cùng đối tác LedFx",
    metaTitle: "LedFx Partner",
    image: "/img/partner/partner-LedFX.png",
    bigimg: "/img/partner/partner-LedFX-banner.png",
    tags: ["partner", "LedFx", "audio-sync"],
    excerpt: "LedFx phản hồi âm thanh thời gian thực (Reactive Audio) kết hợp hệ sinh thái phần cứng ARGB HSL cực nhạy.",
    html: ""
  },
  {
    slug: "partner-anonymous",
    collection: "doi-tac",
    url: "/doi-tac/partner-anonymous/",
    title: "Đối tác giấu tên — Dự án giải trí & Bar Club ngầm cao cấp",
    metaTitle: "Secret Club Partner",
    image: "/img/partner/partner-anonymous/avatar-anonymous.jpg",
    bigimg: "/img/partner/partner-anonymous/photo-anonymous.jpg",
    tags: ["partner", "club", "secret-project"],
    excerpt: "Thi công thiết kế hệ thống ánh sáng ma trận LED độc quyền cho các Bar Club ngầm cao cấp yêu cầu bảo mật thông tin.",
    html: ""
  },
  {
    slug: "partner-ESP32",
    collection: "doi-tac",
    url: "/doi-tac/partner-ESP32/",
    title: "Hợp tác kỹ thuật sâu rộng cùng Espressif Systems (ESP32 MCU)",
    metaTitle: "Espressif Partner",
    image: "/img/partner/partner-espressif.webp",
    bigimg: "/img/partner/partner-espressif-banner.jpg",
    tags: ["partner", "ESP32", "microcontroller"],
    excerpt: "Happy Smart Light tự hào sử dụng dòng vi xử lý ESP32 của Espressif mang lại hiệu năng điều khiển LED vượt trội.",
    html: ""
  },
  {
    slug: "partner-NCTA",
    collection: "doi-tac",
    url: "/doi-tac/partner-NCTA/",
    title: "NCTA — Người Chế Tạo: Đối tác sản xuất đạo cụ biểu diễn LED",
    metaTitle: "NCTA Partner",
    image: "/img/partner/partner-ncta.jpg",
    bigimg: "/img/partner/partner-ncta-anh-1.jpg",
    tags: ["partner", "led-dance", "manufacturing"],
    excerpt: "NCTA — Người Chế Tạo chuyên sản xuất đạo cụ biểu diễn LED nghệ thuật: led dance, trống LED, cờ LED — kết hợp công nghệ ARGB của HSL.",
    html: ""
  }
];

const PORTED_POSTS: CollectionItem[] = [
  {
    slug: "trang-phuc-led-robot-dance-happy-smart-light",
    collection: "post-news",
    url: "/post-news/trang-phuc-led-robot-dance-happy-smart-light/",
    title: "Trang Phục LED Robot Dance Happy Smart Light — Người LED Biểu Diễn Ánh Sáng Đỉnh Cao",
    metaTitle: "Trang Phục LED Robot Dance | Happy Smart Light",
    image: "/img/led-props/led-man/LED-Drummes-in-Sharjah1-scaled-2.jpg",
    bigimg: "/img/led-props/led-man/Visual-Tron456.jpg",
    tags: ["led-man", "robot-dance", "trang-phuc-led", "tron-dance", "bieu-dien-anh-sang"],
    excerpt: "Khám phá trang phục LED Robot Dance Happy Smart Light — bộ giáp LED Man phát sáng đồng bộ theo nhạc, biến tấu nhịp nhàng theo từng điệu nhảy robot, ấn tượng cho mọi sân khấu và sự kiện.",
    html: "",
    date: "2026-06-20"
  },
  {
    slug: "dao-cu-poi-led-happy-smart-light",
    collection: "post-news",
    url: "/post-news/dao-cu-poi-led-happy-smart-light/",
    title: "Đạo Cụ POI LED Happy Smart Light — Gậy Múa Trình Diễn Logo, Hình Ảnh Theo Chuyển Động",
    metaTitle: "Đạo Cụ POI LED Happy Smart Light | Gậy Múa LED Biểu Diễn",
    image: "/img/post-news/poi/hinh-anh-su-dung/hinh-dep/73a2539bc3aa4cf415bb47.jpg",
    bigimg: "/img/post-news/poi/hinh-anh-su-dung/z7404784963475_e832ec45e843c34caa5bc5cd46c44111.jpg",
    tags: ["poi", "dao-cu-led", "gay-mua-led", "san-pham", "bieu-dien-nghe-thuat"],
    excerpt: "Khám phá đạo cụ POI LED Happy Smart Light — gậy múa LED hiển thị logo, hình ảnh sống động theo từng vòng xoay, pin sạc bền bỉ, đồng bộ không dây cho cả nhóm biểu diễn.",
    html: "",
    date: "2026-05-22"
  },
  {
    slug: "su-dung-poi-voi-argb-hsl",
    collection: "post-news",
    url: "/post-news/su-dung-poi-voi-argb-hsl/",
    title: "Hướng dẫn thiết lập tính năng POI với ARGB HSL",
    metaTitle: "Hướng Dẫn POI",
    image: "/img/post-news/poi/LED.jpg",
    bigimg: "/img/post-news/poi/upload-img-poi.png",
    tags: ["poi", "performance", "guide"],
    excerpt: "Hướng dẫn chi tiết cách biên tập hình ảnh hiệu ứng POV và đồng bộ tính năng múa LED POI cùng phần mềm ARGB HSL.",
    html: "",
    date: "2026-04-18"
  }
];

const typedData = data as Record<CollectionKey, CollectionItem[]>;

export const COLLECTIONS: Record<CollectionKey, CollectionItem[]> = {
  ...typedData,
  "doi-tac": [...(typedData["doi-tac"] ?? []), ...PORTED_PARTNERS],
  "post-news": [...(typedData["post-news"] ?? []), ...PORTED_POSTS],
};

export function getItem(collection: CollectionKey, slug: string): CollectionItem | undefined {
  return COLLECTIONS[collection]?.find((i) => i.slug === slug);
}

/** Newest post-news articles first (by `date`), capped at `n`. */
export function latestPosts(n = 3): CollectionItem[] {
  return [...(COLLECTIONS["post-news"] ?? [])]
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, n);
}


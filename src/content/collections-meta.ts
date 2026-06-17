// Lightweight collection metadata — NO heavy JSON import here so that modules
// loaded on every page (Footer, router entry) stay small. The article data
// (with rendered HTML) lives in ./collections and is loaded lazily.

export type CollectionKey =
  | "controller-chip"
  | "led-props"
  | "poi-tools"
  | "post-news"
  | "service";

export interface CollectionMeta {
  key: CollectionKey;
  path: string;
  title: string;
  heading: string;
  description: string;
  eyebrow: string;
}

export const COLLECTION_META: Record<CollectionKey, CollectionMeta> = {
  "controller-chip": {
    key: "controller-chip",
    path: "/controller-chip",
    title: "Mạch Điều Khiển LED ARGB — Controller HSL | Happy Smart Light",
    heading: "Mạch Điều Khiển LED ARGB",
    description:
      "Bộ mạch điều khiển LED pixel ARGB của Happy Smart Light: hỗ trợ WS2812B, WS2811, SK6812, APA102… nạp firmware dễ dàng, điều khiển hiệu ứng không giới hạn.",
    eyebrow: "CONTROLLER",
  },
  "led-props": {
    key: "led-props",
    path: "/led-props",
    title: "Đạo Cụ LED Pixel & Module — Magic LED HSL | Happy Smart Light",
    heading: "Đạo Cụ LED Pixel & Module",
    description:
      "Đạo cụ LED Pixel, LED Module, Laser Series và phụ kiện trình diễn ánh sáng của Happy Smart Light cho sân khấu, sự kiện và trang trí.",
    eyebrow: "LED PROPS",
  },
  "poi-tools": {
    key: "poi-tools",
    path: "/poi-tools",
    title: "Visual LED — Gậy POI & Hoop Biểu Diễn | Happy Smart Light",
    heading: "Visual LED — Gậy POI & Hoop",
    description:
      "Gậy LED POI, Hoop và đạo cụ visual biểu diễn ánh sáng lập trình được của Happy Smart Light dành cho nghệ sĩ trình diễn.",
    eyebrow: "VISUAL LED",
  },
  "post-news": {
    key: "post-news",
    path: "/post-news",
    title: "Tin Tức & Bài Viết — Happy Smart Light",
    heading: "Tin Tức & Bài Viết",
    description:
      "Tin tức, hướng dẫn và chia sẻ kinh nghiệm về LED ARGB, poi ánh sáng và các giải pháp chiếu sáng thông minh từ Happy Smart Light.",
    eyebrow: "POST NEWS",
  },
  service: {
    key: "service",
    path: "/service",
    title: "Dịch Vụ — Đào Tạo, Đối Tác, LED Decor | Happy Smart Light",
    heading: "Dịch Vụ Happy Smart Light",
    description:
      "Các gói dịch vụ của Happy Smart Light: tư vấn thiết kế, LED Decor, LED Dance, biển hiệu, đào tạo và hợp tác đối tác.",
    eyebrow: "SERVICE",
  },
};

export const COLLECTION_KEYS = Object.keys(COLLECTION_META) as CollectionKey[];

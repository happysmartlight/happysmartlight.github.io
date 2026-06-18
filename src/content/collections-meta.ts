// Lightweight collection metadata — NO heavy JSON import here so that modules
// loaded on every page (Footer, router entry) stay small. The article data
// (with rendered HTML) lives in ./collections and is loaded lazily.

export type CollectionKey =
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


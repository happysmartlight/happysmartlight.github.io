// Lightweight collection metadata — NO heavy JSON import here so that modules
// loaded on every page (Footer, router entry) stay small. The article data
// (with rendered HTML) lives in ./collections and is loaded lazily.

export type CollectionKey =
  | "post-news"
  | "doi-tac";

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
  "doi-tac": {
    key: "doi-tac",
    path: "/doi-tac",
    title: "Đối Tác Của Happy Smart Light — Hợp Tác & Hệ Sinh Thái LED",
    heading: "Đối Tác Của Happy Smart Light",
    description:
      "Các đối tác chiến lược và hệ sinh thái tương thích của Happy Smart Light: xLights, LedFx, Espressif, Moonlight Dance, NCTA và nhiều đơn vị đồng hành trong lĩnh vực LED nghệ thuật.",
    eyebrow: "PARTNER",
  },
};

export const COLLECTION_KEYS = Object.keys(COLLECTION_META) as CollectionKey[];


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
}

export const COLLECTIONS = data as Record<CollectionKey, CollectionItem[]>;

export function getItem(collection: CollectionKey, slug: string): CollectionItem | undefined {
  return COLLECTIONS[collection]?.find((i) => i.slug === slug);
}

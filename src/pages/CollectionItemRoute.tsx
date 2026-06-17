import { useParams, Navigate } from "react-router-dom";
import CollectionItem from "../components/CollectionItem";
import { getItem, COLLECTION_META } from "../content/collections";
import type { CollectionKey } from "../content/collections-meta";

// Exported as `Component` for lazy loading (keeps collection JSON out of main bundle).
export function Component() {
  const { collection, slug } = useParams<{ collection: string; slug: string }>();
  const isKnown = collection && collection in COLLECTION_META;
  const item = isKnown && slug ? getItem(collection as CollectionKey, slug) : undefined;

  if (!item) {
    const fallback = isKnown ? COLLECTION_META[collection as CollectionKey].path + "/" : "/";
    return <Navigate to={fallback} replace />;
  }
  return <CollectionItem item={item} />;
}

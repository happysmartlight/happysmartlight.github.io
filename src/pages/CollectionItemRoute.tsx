import { Suspense, lazy } from "react";
import { useParams, Navigate } from "react-router-dom";
import CollectionItem from "../components/CollectionItem";
import { getItem, COLLECTION_META } from "../content/collections";
import type { CollectionKey } from "../content/collections-meta";

// Hand-crafted article overrides — lazy-loaded so each page is a separate chunk.
// Key format: "collection/slug"
const CUSTOM_ARTICLES: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "service/partner-xLights": lazy(() => import("../components/articles/PartnerXLights")),
  "service/partner-Moonlight-dance": lazy(() => import("../components/articles/PartnerMoonlight")),
  "service/partner-LedFx": lazy(() => import("../components/articles/PartnerLedFx")),
  "service/partner-anonymous": lazy(() => import("../components/articles/PartnerAnonymous")),
  "service/partner-ESP32": lazy(() => import("../components/articles/PartnerESP32")),
  "service/partner-NCTA": lazy(() => import("../components/articles/PartnerNCTA")),
  "post-news/su-dung-poi-voi-argb-hsl": lazy(() => import("../components/articles/ArticlePoiGuide")),
};

// Exported as `Component` for lazy loading (keeps collection JSON out of main bundle).
export function Component() {
  const { collection, slug } = useParams<{ collection: string; slug: string }>();
  const isKnown = collection && collection in COLLECTION_META;

  // Check for a hand-crafted TSX override first
  const customKey = collection && slug ? `${collection}/${slug}` : "";
  const CustomArticle = customKey ? CUSTOM_ARTICLES[customKey] : undefined;

  if (CustomArticle) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#020204]" />}>
        <CustomArticle />
      </Suspense>
    );
  }

  // Fallback: render from generated markdown HTML
  const item = isKnown && slug ? getItem(collection as CollectionKey, slug) : undefined;

  if (!item) {
    const fallback = isKnown ? COLLECTION_META[collection as CollectionKey].path + "/" : "/";
    return <Navigate to={fallback} replace />;
  }
  return <CollectionItem item={item} />;
}

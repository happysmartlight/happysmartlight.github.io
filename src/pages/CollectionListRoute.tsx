import { useParams, Navigate } from "react-router-dom";
import CollectionList from "../components/CollectionList";
import { COLLECTION_META, type CollectionKey } from "../content/collections-meta";

// Exported as `Component` so this module can be lazy-loaded by the router,
// keeping the heavy collection JSON out of the main bundle.
export function Component() {
  const { collection } = useParams<{ collection: string }>();
  if (!collection || !(collection in COLLECTION_META)) {
    return <Navigate to="/" replace />;
  }
  return <CollectionList collection={collection as CollectionKey} />;
}

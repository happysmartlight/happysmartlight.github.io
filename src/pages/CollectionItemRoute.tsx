import { useParams, Navigate } from "react-router-dom";
import CollectionItem from "../components/CollectionItem";
import { getItem, COLLECTION_META, type CollectionKey } from "../content/collections";

export default function CollectionItemRoute({ collection }: { collection: CollectionKey }) {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getItem(collection, slug) : undefined;

  if (!item) {
    return <Navigate to={`${COLLECTION_META[collection].path}/`} replace />;
  }

  return <CollectionItem item={item} />;
}

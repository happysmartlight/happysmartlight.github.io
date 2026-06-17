import CollectionList from "../components/CollectionList";
import type { CollectionKey } from "../content/collections";

export default function CollectionListRoute({ collection }: { collection: CollectionKey }) {
  return <CollectionList collection={collection} />;
}

import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Home from "./pages/Home";
import AppDetailsRoute from "./pages/AppDetailsRoute";
import ToolDetailsRoute from "./pages/ToolDetailsRoute";
import PrivacyRoute from "./pages/PrivacyRoute";
import ProductDetailsRoute from "./pages/ProductDetailsRoute";
import CollectionListRoute from "./pages/CollectionListRoute";
import CollectionItemRoute from "./pages/CollectionItemRoute";
import { COLLECTIONS, COLLECTION_KEYS } from "./content/collections";

// Product slugs that have a (React-native) detail page.
export const PRODUCT_IDS = ["v4pro", "matrix", "car", "poi"];

// Build the Jekyll-ported collection routes (list + items), preserving old URLs.
const collectionRoutes: RouteRecord[] = COLLECTION_KEYS.flatMap((key) => [
  { path: key, element: <CollectionListRoute collection={key} /> },
  {
    path: `${key}/:slug`,
    element: <CollectionItemRoute collection={key} />,
    getStaticPaths: () => COLLECTIONS[key].map((i) => `/${key}/${i.slug}`),
  },
]);

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "ung-dung-di-dong", element: <AppDetailsRoute /> },
      { path: "cong-cu-may-tinh", element: <ToolDetailsRoute /> },
      { path: "chinh-sach-bao-mat", element: <PrivacyRoute /> },
      {
        path: "san-pham/:id",
        element: <ProductDetailsRoute />,
        getStaticPaths: () => PRODUCT_IDS.map((id) => `/san-pham/${id}`),
      },
      ...collectionRoutes,
    ],
  },
];

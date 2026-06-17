import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Home from "./pages/Home";
import AppDetailsRoute from "./pages/AppDetailsRoute";
import ToolDetailsRoute from "./pages/ToolDetailsRoute";
import PrivacyRoute from "./pages/PrivacyRoute";
import ProductDetailsRoute from "./pages/ProductDetailsRoute";
import { COLLECTION_KEYS } from "./content/collections-meta";

// Product slugs that have a (React-native) detail page.
export const PRODUCT_IDS = ["v4pro", "matrix", "hsl4x", "poi"];

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
      // Jekyll-ported collections — lazy-loaded so the article JSON is a separate
      // chunk fetched only on these pages (keeps the main bundle small).
      {
        path: ":collection",
        lazy: () => import("./pages/CollectionListRoute"),
        getStaticPaths: () => COLLECTION_KEYS.map((k) => `/${k}`),
      },
      {
        path: ":collection/:slug",
        lazy: () => import("./pages/CollectionItemRoute"),
        getStaticPaths: async () => {
          const { COLLECTIONS } = await import("./content/collections");
          return Object.values(COLLECTIONS)
            .flat()
            .map((i) => i.url);
        },
      },
    ],
  },
];

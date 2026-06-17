import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Home from "./pages/Home";
import AppDetailsRoute from "./pages/AppDetailsRoute";
import ToolDetailsRoute from "./pages/ToolDetailsRoute";
import PrivacyRoute from "./pages/PrivacyRoute";
import ProductDetailsRoute from "./pages/ProductDetailsRoute";

// Product slugs that have a detail page (used for SSG static path generation).
export const PRODUCT_IDS = ["v4pro", "matrix", "car", "poi"];

// All static paths that should be pre-rendered to HTML + listed in the sitemap.
export const STATIC_PATHS: string[] = [
  "/",
  "/ung-dung-di-dong",
  "/cong-cu-may-tinh",
  "/chinh-sach-bao-mat",
  ...PRODUCT_IDS.map((id) => `/san-pham/${id}`),
];

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
    ],
  },
];

import "./index.css";
import { ViteReactSSG } from "vite-react-ssg";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { routes } from "./routes";

// vite-react-ssg gắn một "static loader" vào MỌI route phía client: lần chuyển trang đầu tiên
// (vd. từ trang sản phẩm bấm "Giới thiệu" → /#about) nó fetch
// static-loader-data-manifest-<buildHash>.json. Mỗi lần deploy, file của build cũ bị xoá, nên
// trang còn giữ HTML cũ (GitHub Pages cache 10 phút, hoặc tab mở từ trước) nhận về trang 404 HTML
// thay vì JSON → "Unexpected token '<'..." và cả trang sập. Site không dùng loader nào (data luôn
// null) nên bỏ hẳn các loader đó.
function stripLoaders(routes: RouteObject[]): RouteObject[] {
  return routes.map((route) => {
    const { loader: _loader, ...rest } = route;
    return (route.children ? { ...rest, children: stripLoaders(route.children) } : rest) as RouteObject;
  });
}

// Chunk lazy (trang bài viết) cũng đổi hash mỗi lần deploy → tab cũ bấm sang sẽ lỗi import.
// Tải lại trang một lần để lấy bản mới (chặn vòng lặp reload trong 10s).
if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event) => {
    try {
      const last = Number(sessionStorage.getItem("hsl-preload-reload") || 0);
      if (Date.now() - last < 10_000) return;
      sessionStorage.setItem("hsl-preload-reload", String(Date.now()));
    } catch {
      // sessionStorage bị chặn → vẫn reload.
    }
    event.preventDefault();
    window.location.reload();
  });
}

export const createRoot = ViteReactSSG({
  routes,
  customCreateRouter: (dataRoutes, opts) => createBrowserRouter(stripLoaders(dataRoutes), opts),
});

import { useNavigate, useLocation, useParams, useOutletContext } from "react-router-dom";
import ProductDetailsPage from "../components/ProductDetailsPage";
import Seo from "../components/Seo";
import type { AppOutletContext } from "../Layout";

const PRODUCT_META: Record<string, { title: string; description: string }> = {
  v4pro: {
    title: "Bộ Điều Khiển ARGB HSL V4 PRO — Flagship LED Pixel | Happy Smart Light",
    description: "Bộ điều khiển LED pixel ARGB HSL V4 PRO: 2 cổng cách ly quang học, tải tối đa 4096 pixel, truyền 60FPS không rách hình. Giải pháp cao cấp cho sân khấu & nội thất.",
  },
  matrix: {
    title: "Happy Smart LED Matrix Driver Pro — Điều Khiển Ma Trận LED | Happy Smart Light",
    description: "Matrix Driver Pro — bộ điều khiển ma trận LED chuyên nghiệp của Happy Smart Light cho màn hình LED, mặt dựng và hiệu ứng pixel quy mô lớn.",
  },
  car: {
    title: "Happy Car Auto-Sync LED Controller — LED Ô Tô | Happy Smart Light",
    description: "Car Auto-Sync — bộ điều khiển LED ARGB cho xe hơi, đồng bộ ánh sáng theo nhạc và cảm biến, lắp đặt gọn gàng.",
  },
  poi: {
    title: "Happy POI Performance Wand — Gậy LED Biểu Diễn | Happy Smart Light",
    description: "POI Performance Wand — gậy LED biểu diễn nghệ thuật ánh sáng, lập trình hiệu ứng, pin bền, dành cho nghệ sĩ trình diễn poi.",
  },
};

export default function ProductDetailsRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { requestQuote } = useOutletContext<AppOutletContext>();
  const pid = id ?? "v4pro";
  const meta = PRODUCT_META[pid] ?? PRODUCT_META.v4pro;

  const onBack = () => (location.key !== "default" ? navigate(-1) : navigate("/"));

  return (
    <>
    <Seo title={meta.title} description={meta.description} path={`/san-pham/${pid}/`} />
    <ProductDetailsPage
      productId={pid}
      onBack={onBack}
      onQuoteRequested={requestQuote}
      onNavigateToProduct={(nextId) => navigate(`/san-pham/${nextId}`)}
    />
    </>
  );
}

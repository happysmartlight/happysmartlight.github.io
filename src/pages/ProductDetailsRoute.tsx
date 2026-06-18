import { useEffect } from "react";
import { useNavigate, useLocation, useParams, useOutletContext } from "react-router-dom";
import { motion } from "motion/react";
import ProductDetailsPage from "../components/ProductDetailsPage";
import Seo from "../components/Seo";
import type { AppOutletContext } from "../Layout";

const PRODUCT_META: Record<string, { title: string; description: string; image: string }> = {
  v4pro: {
    title: "Bộ Điều Khiển ARGB HSL 2X PRO — Flagship LED Pixel | Happy Smart Light",
    description: "Bộ điều khiển LED pixel ARGB HSL 2X PRO: 2 cổng cách ly quang học, tải tối đa 4096 pixel, truyền 60FPS không rách hình. PCB 4 lớp cao cấp, anten rời tầm xa, thiết kế nhỏ gọn, hỗ trợ pin LiPo/Lithium & sạc trực tiếp. Giải pháp cao cấp cho sân khấu, nội thất & mạch POI.",
    image: "/img/controller-chip/argb_IPEX_ver1.0_TOP.png",
  },
  matrix: {
    title: "Happy Smart LED Matrix Driver Pro — Điều Khiển Ma Trận LED | Happy Smart Light",
    description: "Matrix Driver Pro — bộ điều khiển ma trận LED chuyên nghiệp của Happy Smart Light cho màn hình LED, mặt dựng và hiệu ứng pixel quy mô lớn.",
    image: "/img/led-props/matrix4.jpg",
  },
  hsl4x: {
    title: "Bộ Điều Khiển ARGB Happy Smart Light 4X — Flagship LED Matrix | Happy Smart Light",
    description: "Happy Smart Light 4X: Bộ điều khiển LED ARGB công suất lớn, tối ưu 4.000-5.000 LED pixel, chuyên matrix pixel, trống led matrix, cờ led matrix. Mạch 5V điều khiển LED đa dải 5/12/24/48V, 4 cổng ra chống dội ngược, chống chập nguồn đấu nhầm cực. Bản nâng cấp X2 bộ nhớ, module ETH & thẻ nhớ SD, firmware báo nhiệt độ.",
    image: "/img/products/hsl4x/cropped_ARGB_HSL_TOP.png",
  },
  poi: {
    title: "Happy POI Performance Wand — Gậy LED Biểu Diễn | Happy Smart Light",
    description: "POI Performance Wand — gậy LED biểu diễn nghệ thuật ánh sáng, lập trình hiệu ứng, pin bền, dành cho nghệ sĩ trình diễn poi.",
    image: "/img/poi-tools/visual-poi/full-poi.jpg",
  },
};

export default function ProductDetailsRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { setThemeGlow, requestQuote } = useOutletContext<AppOutletContext>();
  const pid = id ?? "v4pro";
  const meta = PRODUCT_META[pid] ?? PRODUCT_META.v4pro;

  // Update ambient glow theme to match the product's glowColor on mount / route change
  useEffect(() => {
    const themeMap: Record<string, "pink" | "blue" | "emerald" | "amber" | "purple" | "yellow"> = {
      v4pro: "yellow",
      matrix: "blue",
      hsl4x: "purple",
      poi: "pink",
    };
    const mappedGlow = themeMap[pid] ?? "pink";
    setThemeGlow(mappedGlow);
  }, [pid, setThemeGlow]);

  const onBack = () => {
    navigate("/#products");
  };

  return (
    <motion.div
      key={pid}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Seo title={meta.title} description={meta.description} path={`/san-pham/${pid}/`} image={meta.image} />
      <ProductDetailsPage
        productId={pid}
        onBack={onBack}
        onQuoteRequested={requestQuote}
        onNavigateToProduct={(nextId) => navigate(`/san-pham/${nextId}`)}
      />
    </motion.div>
  );
}

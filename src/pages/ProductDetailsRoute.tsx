import { useEffect } from "react";
import { useNavigate, useLocation, useParams, useOutletContext } from "react-router-dom";
import { motion } from "motion/react";
import { Head } from "vite-react-ssg";
import ProductDetailsPage from "../components/ProductDetailsPage";
import Seo from "../components/Seo";
import type { AppOutletContext } from "../Layout";

const SITE = "https://happysmartlight.com";

const PRODUCT_META: Record<string, { title: string; description: string; image: string; name: string; priceVnd: number | null }> = {
  v4pro: {
    title: "Bộ Điều Khiển ARGB HSL 2X PRO — LED Pixel & POI | HSL",
    description: "Bộ điều khiển LED pixel ARGB HSL 2X PRO: 2 cổng cách ly quang học, tải 4096 pixel, 60FPS không rách hình, PCB 4 lớp, pin sạc — tối ưu cho sân khấu & mạch POI.",
    image: "/img/controller-chip/argb_IPEX_ver1.0_TOP.png",
    name: "Bộ Điều Khiển ARGB Happy Smart Light 2X PRO",
    priceVnd: 1200000,
  },
  matrix: {
    title: "LED Matrix Driver Pro — Điều Khiển Ma Trận LED | HSL",
    description: "Matrix Driver Pro — bộ điều khiển ma trận LED chuyên nghiệp của Happy Smart Light cho màn hình LED, mặt dựng và hiệu ứng pixel quy mô lớn.",
    image: "/img/led-props/matrix4.jpg",
    name: "Happy Smart LED Matrix Driver Pro",
    priceVnd: null,
  },
  hsl4x: {
    title: "Bộ Điều Khiển ARGB HSL 4X — LED Matrix Công Suất Lớn | HSL",
    description: "Happy Smart Light 4X: bộ điều khiển ARGB công suất lớn, tối ưu 4.000-5.000 LED pixel cho matrix, trống LED, cờ LED sự kiện, chống đấu nhầm cực, hỗ trợ ETH & thẻ SD.",
    image: "/img/products/hsl4x/cropped_ARGB_HSL_TOP.png",
    name: "Bộ Điều Khiển ARGB Happy Smart Light 4X",
    priceVnd: 930000,
  },
  poi: {
    title: "Happy POI Performance Wand — Gậy LED Biểu Diễn | HSL",
    description: "Happy POI Performance Wand — gậy múa LED biểu diễn POV, LED SK9822 tần số cao, pin sạc bền, đồng bộ không dây — dành cho nghệ sĩ trình diễn POI chuyên nghiệp.",
    image: "/img/poi-tools/visual-poi/full-poi.jpg",
    name: "Happy POI Performance Wand (Gậy LED Biểu Diễn)",
    priceVnd: null,
  },
};

function buildProductJsonLd(pid: string, meta: typeof PRODUCT_META[string]) {
  const url = `${SITE}/san-pham/${pid}/`;
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: meta.name,
    description: meta.description,
    image: [`${SITE}${meta.image}`],
    brand: { "@type": "Brand", name: "Happy Smart Light" },
    url,
  };
  if (meta.priceVnd) {
    json.offers = {
      "@type": "Offer",
      price: String(meta.priceVnd),
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url,
    };
  }
  return json;
}

function buildBreadcrumbJsonLd(pid: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE}/#products` },
      { "@type": "ListItem", position: 3, name, item: `${SITE}/san-pham/${pid}/` },
    ],
  };
}

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

  // Consistent with the other detail pages: go back (restores scroll) when we have
  // history, otherwise fall back to the products section on the home page.
  const onBack = () =>
    location.key !== "default" ? navigate(-1) : navigate("/#products");

  return (
    <motion.div
      key={pid}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Seo title={meta.title} description={meta.description} path={`/san-pham/${pid}/`} image={meta.image} />
      <Head>
        <script type="application/ld+json">{JSON.stringify(buildProductJsonLd(pid, meta))}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbJsonLd(pid, meta.name))}</script>
      </Head>
      <ProductDetailsPage
        productId={pid}
        onBack={onBack}
        onQuoteRequested={requestQuote}
        onNavigateToProduct={(nextId) => navigate(`/san-pham/${nextId}`)}
      />
    </motion.div>
  );
}

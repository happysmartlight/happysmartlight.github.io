import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import SoftwareDetailsPage from "../components/SoftwareDetailsPage";
import Seo from "../components/Seo";

export default function AppDetailsRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  // Go back if we have history, otherwise fall back to home (deep-link / SSG entry).
  const onBack = () => (location.key !== "default" ? navigate(-1) : navigate("/"));
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Seo
        title="Ứng Dụng Di Động ARGB HSL — Điều Khiển LED Từ Điện Thoại | Happy Smart Light"
        description="ARGB HSL — ứng dụng Android điều khiển dải LED ARGB: 300+ hiệu ứng, đồng bộ âm thanh, kết nối WiFi tức thì, bảo mật offline-first. Tải miễn phí trên Google Play."
        path="/argb-hsl-tool-mobile/"
      />
      <SoftwareDetailsPage type="app" onBack={onBack} />
    </motion.div>
  );
}

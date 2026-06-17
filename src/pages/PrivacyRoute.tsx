import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import AppPrivacyPolicy from "../components/AppPrivacyPolicy";
import Seo from "../components/Seo";

export default function PrivacyRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const onBack = () => (location.key !== "default" ? navigate(-1) : navigate("/"));
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Seo
        title="Chính Sách Bảo Mật Ứng Dụng ARGB HSL | Happy Smart Light"
        description="Chính sách bảo mật ứng dụng ARGB HSL: offline-first, không thu thập dữ liệu cá nhân, tuân thủ Google Play & COPPA."
        path="/chinh-sach-bao-mat/"
      />
      <AppPrivacyPolicy onBack={onBack} />
    </motion.div>
  );
}

import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import SoftwareDetailsPage from "../components/SoftwareDetailsPage";
import Seo from "../components/Seo";
import { POI_STUDIO_VERSION, POI_STUDIO_MAC } from "../poiStudio";

export default function PoiStudioDetailsRoute() {
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
        title={`POI HSL Studio ${POI_STUDIO_VERSION} — App Nạp Ảnh Gậy POI Cho ${POI_STUDIO_MAC ? "Windows & macOS" : "Windows"} | Happy Smart Light`}
        description={`POI HSL Studio — app ${POI_STUDIO_MAC ? "Windows / macOS" : "Windows"} cho gậy POI dùng mạch ARGB HSL Controller 2X Pro: kéo-thả ảnh hoặc chọn từ 306 ảnh mẫu, chỉnh tốc độ quay, gửi ảnh cho cả đội, lập trình Timecode theo nhạc. Tải bản ${POI_STUDIO_VERSION} cho Windows 10/11${POI_STUDIO_MAC ? " và macOS (Mac chip Apple)" : ""}.`}
        path="/poi-hsl-studio-pc/"
      />
      <SoftwareDetailsPage type="poi" onBack={onBack} />
    </motion.div>
  );
}

import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import SoftwareDetailsPage from "../components/SoftwareDetailsPage";
import Seo from "../components/Seo";
import { WINDOWS_TOOL_VERSION } from "../windowsTool";
import { MACOS_TOOL } from "../macosTool";

// Hệ điều hành ghi trong mô tả SEO: bản macOS chỉ nhắc khi manifest macOS đã có .dmg.
const PLATFORMS = MACOS_TOOL ? "Windows 10/11 và macOS (Mac chip Apple)" : "Windows 10/11";

export default function ToolDetailsRoute() {
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
        title={`Tải Tool ARGB HSL ${WINDOWS_TOOL_VERSION} — Phần Mềm Máy Tính Điều Khiển Mạch LED | Happy Smart Light`}
        description={`Tool ARGB HSL ${WINDOWS_TOOL_VERSION} miễn phí cho ${PLATFORMS}: điều khiển, cấu hình và cập nhật firmware nhiều mạch ARGB HSL, nạp ảnh POI, Matrix LED, tạo và vẽ sơ đồ LED, lập trình show ánh sáng theo nhạc với Timecode.`}
        path="/argb-hsl-tool-pc/"
        image="/img/argb-hsl-tool-pc/tool-argb-hsl-og.jpg"
      />
      <SoftwareDetailsPage type="tool" onBack={onBack} />
    </motion.div>
  );
}

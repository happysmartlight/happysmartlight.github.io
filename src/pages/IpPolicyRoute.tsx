import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import IpPolicy from "../components/IpPolicy";
import Seo from "../components/Seo";

export default function IpPolicyRoute() {
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
        title="Chính Sách Bản Quyền & Sở Hữu Trí Tuệ | Happy Smart Light"
        description="Chính sách bản quyền và sở hữu trí tuệ của Happy Smart Light cho phần cứng (PCB, schematic) và phần mềm (firmware, app, giao thức ARGB HSL độc quyền). Quy định quyền sử dụng và các hành vi bị nghiêm cấm."
        path="/chinh-sach-ban-quyen/"
      />
      <IpPolicy onBack={onBack} />
    </motion.div>
  );
}

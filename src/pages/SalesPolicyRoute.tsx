import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import SalesPolicy from "../components/SalesPolicy";
import Seo from "../components/Seo";

export default function SalesPolicyRoute() {
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
        title="Chính Sách Bán Hàng, Thanh Toán & Mua Bán | Happy Smart Light"
        description="Chính sách bán hàng, thanh toán và mua bán của Happy Smart Light: hợp đồng & đặt cọc 60-80%, hóa đơn VAT đầy đủ, hỗ trợ kỹ thuật miễn phí từ xa, và 02 tài khoản thanh toán chính thức."
        path="/chinh-sach-ban-hang/"
      />
      <SalesPolicy onBack={onBack} />
    </motion.div>
  );
}

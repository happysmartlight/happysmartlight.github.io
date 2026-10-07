import { Head } from "vite-react-ssg";
import { useNavigate, useLocation } from "react-router-dom";
import LicenseSigner from "../components/LicenseSigner";

/**
 * Route cho công cụ nội bộ ký license. URL cố tình khó đoán và đặt noindex/nofollow
 * + loại khỏi sitemap (xem scripts/gen-sitemap.mjs) để giữ ẩn như bản Jekyll gốc
 * (permalink ngẫu nhiên + sitemap:false). KHÔNG đặt link công khai ở Footer/menu.
 */
export default function LicenseSignerRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const onBack = () => (location.key !== "default" ? navigate(-1) : navigate("/"));
  return (
    <>
      <Head>
        <title>HSL License Signer</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LicenseSigner onBack={onBack} />
    </>
  );
}

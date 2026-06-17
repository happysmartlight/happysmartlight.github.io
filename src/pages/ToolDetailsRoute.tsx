import { useNavigate, useLocation } from "react-router-dom";
import SoftwareDetailsPage from "../components/SoftwareDetailsPage";
import Seo from "../components/Seo";

export default function ToolDetailsRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const onBack = () => (location.key !== "default" ? navigate(-1) : navigate("/"));
  return (
    <>
      <Seo
        title="Công Cụ Máy Tính ARGB HSL Control Tool 3.7.1 — Tải Về | Happy Smart Light"
        description="Phần mềm máy tính ARGB HSL Control Tool: nạp firmware qua COM, thiết kế layout Pixel Mapper 2D/3D, stream xLights qua Ethernet/Wi-Fi. Tải bản 3.7.1 cho Windows 10/11."
        path="/cong-cu-may-tinh/"
      />
      <SoftwareDetailsPage type="tool" onBack={onBack} />
    </>
  );
}

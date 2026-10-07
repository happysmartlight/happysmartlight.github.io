import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import Features from "../components/Features";
import Ecosystem from "../components/Ecosystem";
import InteractiveAppShowcase from "../components/InteractiveAppShowcase";
import WhyChooseUs from "../components/WhyChooseUs";
import ProjectEstimator from "../components/ProjectEstimator";
import AppAndToolSection from "../components/AppAndToolSection";
import DistributionService from "../components/DistributionService";
import PartnerMarquee from "../components/PartnerMarquee";
import type { AppOutletContext } from "../Layout";

export default function Home() {
  const navigate = useNavigate();
  const { setThemeGlow, quotedProduct, requestQuote } = useOutletContext<AppOutletContext>();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const offset = 75;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const offsetPosition = elementRect - bodyRect - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 150);
    }
  }, []);

  // In-page section scroll helper (for buttons inside home sections).
  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === "contact" ? "estimator" : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 75;
      const top = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Seo
        title="Happy Smart Light — Đèn LED ARGB Thông Minh & Bộ Điều Khiển HSL"
        description="Hệ sinh thái đèn LED ARGB thông minh do người Việt phát triển: bộ điều khiển HSL, ứng dụng di động & công cụ máy tính ARGB HSL điều khiển ma trận LED chuyên nghiệp cho trang trí, sân khấu và sự kiện."
        path="/"
      />
      <Hero onNavigate={scrollToSection} />
      <About />
      <Products
        onQuoteRequested={requestQuote}
        onViewProductDetails={(id) => navigate(`/san-pham/${id}`)}
      />
      <Features />
      <Ecosystem />
      <InteractiveAppShowcase onThemeChanged={(theme) => setThemeGlow(theme)} />
      <AppAndToolSection
        onViewPrivacy={() => navigate("/chinh-sach-bao-mat")}
        onViewAppDetails={() => navigate("/argb-hsl-tool-mobile")}
        onViewToolDetails={() => navigate("/argb-hsl-tool-pc")}
      />
      <DistributionService />
      <WhyChooseUs />
      <ProjectEstimator preFilledProduct={quotedProduct} />
      <PartnerMarquee />
    </motion.div>
  );
}

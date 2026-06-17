import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

export type ThemeGlow = "pink" | "blue" | "emerald" | "amber" | "purple";

export interface AppOutletContext {
  setThemeGlow: (theme: ThemeGlow) => void;
  quotedProduct: string;
  requestQuote: (productName: string) => void;
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [activeSection, setActiveSection] = useState("hero");
  const [quotedProduct, setQuotedProduct] = useState("");
  const [themeGlow, setThemeGlow] = useState<ThemeGlow>("pink");

  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to a section on the home page. If we are on a sub-route, go home first.
  const scrollToSection = (sectionId: string) => {
    let targetId = sectionId === "contact" ? "estimator" : sectionId;
    setActiveSection(sectionId);
    isScrollingProgrammatically.current = true;

    const doScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 75;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 1000);
      }
    };

    if (!isHome) {
      navigate("/");
      // wait for the home DOM to mount before scrolling
      setTimeout(doScroll, 80);
    } else {
      setTimeout(doScroll, 50);
    }
  };

  // Prefill the estimator with a product and jump to it (from product detail page too).
  const requestQuote = (productName: string) => {
    setQuotedProduct(productName);
    scrollToSection("estimator");
  };

  // Scrollspy — only relevant on the home page.
  useEffect(() => {
    if (!isHome) return;

    const sections = [
      "hero", "about", "products", "features",
      "ecosystem", "applications", "app-and-tool", "estimator",
    ];

    const handleScrollSpy = () => {
      if (isScrollingProgrammatically.current) return;
      const scrollPosition = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [isHome]);

  const getThemeGlowClasses = () => {
    switch (themeGlow) {
      case "pink":
        return { blob1: "bg-neon-pink-bright/10", blob2: "bg-purple-900/10" };
      case "blue":
        return { blob1: "bg-neon-blue-bright/10", blob2: "bg-cyan-950/10" };
      case "emerald":
        return { blob1: "bg-emerald-500/10", blob2: "bg-teal-950/10" };
      case "amber":
        return { blob1: "bg-amber-500/10", blob2: "bg-orange-950/10" };
      case "purple":
        return { blob1: "bg-purple-500/10", blob2: "bg-pink-900/10" };
      default:
        return { blob1: "bg-neon-pink-bright/10", blob2: "bg-neon-blue-bright/10" };
    }
  };

  const currentGlows = getThemeGlowClasses();

  const outletContext: AppOutletContext = { setThemeGlow, quotedProduct, requestQuote };

  return (
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] scroll-smooth antialiased pb-0 select-none">
      {/* Global Ambient Light Engine */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
        <div className={`absolute top-1/10 left-1/12 w-[550px] h-[550px] rounded-full blur-[160px] transition-colors duration-1000 ${currentGlows.blob1}`} />
        <div className={`absolute bottom-1/10 right-1/12 w-[550px] h-[550px] rounded-full blur-[160px] transition-colors duration-1000 ${currentGlows.blob2}`} />
      </div>
      <div className="fixed inset-0 bg-radial-at-t from-transparent via-transparent to-black/35 pointer-events-none -z-10" />

      <Header activeSection={isHome ? activeSection : ""} onNavigate={scrollToSection} />

      <Outlet context={outletContext} />

      <Footer
        onNavigate={scrollToSection}
        onViewPrivacy={() => navigate("/chinh-sach-bao-mat")}
      />

      <FloatingActions />
    </div>
  );
}

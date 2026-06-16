import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Features from "./components/Features";
import Ecosystem from "./components/Ecosystem";
import InteractiveAppShowcase from "./components/InteractiveAppShowcase";
import WhyChooseUs from "./components/WhyChooseUs";
import ProjectEstimator from "./components/ProjectEstimator";
import Footer from "./components/Footer";
import AppAndToolSection from "./components/AppAndToolSection";
import DistributionService from "./components/DistributionService";
import ProductDetailsPage from "./components/ProductDetailsPage";
import AppPrivacyPolicy from "./components/AppPrivacyPolicy";
import FloatingActions from "./components/FloatingActions";

type ThemeGlow = "pink" | "blue" | "emerald" | "amber" | "purple";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [quotedProduct, setQuotedProduct] = useState("");
  const [themeGlow, setThemeGlow] = useState<ThemeGlow>("pink");
  const [activeDetailedProductId, setActiveDetailedProductId] = useState<string | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [savedScrollPos, setSavedScrollPos] = useState(0);

  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenProductDetails = (id: string) => {
    setSavedScrollPos(window.scrollY);
    setActiveDetailedProductId(id);
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 50);
  };

  const handleCloseProductDetails = () => {
    setActiveDetailedProductId(null);
    window.scrollTo({ top: savedScrollPos, behavior: "instant" });
    setTimeout(() => window.scrollTo({ top: savedScrollPos, behavior: "instant" }), 50);
  };

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    if (activeDetailedProductId !== null) {
      setActiveDetailedProductId(null);
    }
    if (showPrivacyPolicy) {
      setShowPrivacyPolicy(false);
    }
    setActiveSection(sectionId);
    isScrollingProgrammatically.current = true;
    
    // Redirect logical links
    let targetId = sectionId;
    if (sectionId === "contact") {
      targetId = "estimator";
    }

    // Delay scroll slightly to allow DOM to re-render in case we were on a sub-page
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 75; // header padding offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // re-enable scrollspy after scroll roughly finishes
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 1000); // adjust time as needed
      }
    }, 50);
  };

  // Pre-fill specifications downstream when quote requested
  const handleQuoteRequested = (productName: string) => {
    setQuotedProduct(productName);
    handleNavigate("estimator");
  };

  // Scrollspy to detect active visual viewports
  useEffect(() => {
    const sections = [
      { id: "hero", listId: "hero" },
      { id: "about", listId: "about" },
      { id: "products", listId: "products" },
      { id: "features", listId: "features" },
      { id: "ecosystem", listId: "ecosystem" },
      { id: "applications", listId: "applications" },
      { id: "estimator", listId: "estimator" },
    ];

    const handleScrollSpy = () => {
      if (isScrollingProgrammatically.current) return;
      
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.listId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Determine dynamic classes based on selected theme
  const getThemeGlowClasses = () => {
    switch (themeGlow) {
      case "pink":
        return {
          blob1: "bg-neon-pink-bright/10",
          blob2: "bg-purple-900/10",
        };
      case "blue":
        return {
          blob1: "bg-neon-blue-bright/10",
          blob2: "bg-cyan-950/10",
        };
      case "emerald":
        return {
          blob1: "bg-emerald-500/10",
          blob2: "bg-teal-950/10",
        };
      case "amber":
        return {
          blob1: "bg-amber-500/10",
          blob2: "bg-orange-950/10",
        };
      case "purple":
        return {
          blob1: "bg-purple-500/10",
          blob2: "bg-pink-900/10",
        };
      default:
        return {
          blob1: "bg-neon-pink-bright/10",
          blob2: "bg-neon-blue-bright/10",
        };
    }
  };

  const currentGlows = getThemeGlowClasses();

  return (
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] scroll-smooth antialiased pb-0 select-none">
      
      {/* 1. Global Ambient Light Engine Layer (clipped to viewport to avoid horizontal overflow) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
        <div className={`absolute top-1/10 left-1/12 w-[550px] h-[550px] rounded-full blur-[160px] transition-colors duration-1000 ${currentGlows.blob1}`} />
        <div className={`absolute bottom-1/10 right-1/12 w-[550px] h-[550px] rounded-full blur-[160px] transition-colors duration-1000 ${currentGlows.blob2}`} />
      </div>
      
      {/* Fixed global subtle scanning line overlay for cyber/neon theme */}
      <div className="fixed inset-0 bg-radial-at-t from-transparent via-transparent to-black/35 pointer-events-none -z-10" />

      {/* 2. Responsive Glassmorphic Navbar Header */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {showPrivacyPolicy ? (
        <AppPrivacyPolicy 
          onBack={() => {
            setShowPrivacyPolicy(false);
            window.scrollTo({ top: 0, behavior: "instant" });
          }} 
        />
      ) : activeDetailedProductId !== null ? (
        <ProductDetailsPage 
          productId={activeDetailedProductId} 
          onBack={handleCloseProductDetails} 
          onQuoteRequested={handleQuoteRequested}
          onNavigateToProduct={(id) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveDetailedProductId(id);
          }}
        />
      ) : (
        <>
          {/* 3. Hero Section & LED Matrix Simulator */}
          <Hero onNavigate={handleNavigate} />

          {/* 4. Brand Bento specifications & Story intro */}
          <About />

          {/* 5. Core Smart controllers directory */}
          <Products onQuoteRequested={handleQuoteRequested} onViewProductDetails={handleOpenProductDetails} />

          {/* 6. Technical capabilities list */}
          <Features />

          {/* 7. Interactive protocol & data packet flow vector canvas */}
          <Ecosystem />

          {/* 8. Scenario layouts with background ambient triggers */}
          <InteractiveAppShowcase onThemeChanged={(theme) => setThemeGlow(theme)} />

          {/* App and software utility downloads */}
          <AppAndToolSection onViewPrivacy={() => {
            setShowPrivacyPolicy(true);
            window.scrollTo({ top: 0, behavior: "instant" });
          }} />

          {/* Chip and semiconductor authorized partnership distribution */}
          <DistributionService />

          {/* 9. Brand superiority highlight points */}
          <WhyChooseUs />

          {/* 10. Direct order & calculator segment */}
          <ProjectEstimator preFilledProduct={quotedProduct} />
        </>
      )}

      {/* 11. Support footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onViewPrivacy={() => {
          setShowPrivacyPolicy(true);
          window.scrollTo({ top: 0, behavior: "instant" });
        }} 
      />
      
      {/* Floating shortcut buttons */}
      <FloatingActions />
    </div>
  );
}


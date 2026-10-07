import React, { useState, useEffect, useRef } from "react";
import { useOutlet, useNavigate, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import CustomCursor from "./components/CustomCursor";

export type ThemeGlow = "pink" | "blue" | "emerald" | "amber" | "purple" | "yellow";

export interface AppOutletContext {
  setThemeGlow: (theme: ThemeGlow) => void;
  quotedProduct: string;
  requestQuote: (productName: string) => void;
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const isHome = location.pathname === "/";

  const [activeSection, setActiveSection] = useState("hero");
  const [quotedProduct, setQuotedProduct] = useState("");
  const [themeGlow, setThemeGlow] = useState<ThemeGlow>("pink");

  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Per-history-entry scroll positions (keyed by location.key) for back/forward restore.
  const scrollPositions = useRef<Map<string, number>>(new Map());
  // What the next page should do once the outgoing page finishes animating out.
  const pendingRestore = useRef<{ key: string; type: "pop" | "fresh"; hash: string } | null>(null);

  // Scroll to a section on the home page. If we are on a sub-route, navigate home
  // with a #hash and let the Home page perform the scroll once it has mounted
  // (reliable despite the AnimatePresence mount delay).
  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === "contact" ? "estimator" : sectionId;
    setActiveSection(sectionId);

    if (!isHome) {
      navigate(`/#${targetId}`);
      return;
    }

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
    setTimeout(doScroll, 50);
  };

  // Prefill the estimator with a product and jump to it (from product detail page too).
  const requestQuote = (productName: string) => {
    setQuotedProduct(productName);
    scrollToSection("estimator");
  };

  // Manual scroll management. Native restoration is unreliable here because
  // AnimatePresence (mode="wait") delays mounting the new page until the old one
  // finishes exiting — so the browser would restore against the wrong (old) DOM.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Remember the scroll position of each visited history entry (by location.key).
  useEffect(() => {
    const key = location.key;
    let ticking = false;
    const save = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        scrollPositions.current.set(key, window.scrollY);
      });
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      // Capture the final position right before this entry is left behind.
      scrollPositions.current.set(key, window.scrollY);
      window.removeEventListener("scroll", save);
    };
  }, [location.key]);

  // Decide where the next page should land — applied later in onExitComplete so the
  // outgoing page isn't disturbed while it animates out.
  useEffect(() => {
    pendingRestore.current = isScrollingProgrammatically.current
      ? null
      : { key: location.key, type: navigationType === "POP" ? "pop" : "fresh", hash: location.hash };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // Retry scrolling until the (possibly lazy / late-mounted) page is tall enough.
  const scrollWithRetry = (top: number) => {
    let frame = 0;
    const attempt = () => {
      window.scrollTo(0, top);
      if (Math.abs(window.scrollY - top) > 2 && frame++ < 40) {
        requestAnimationFrame(attempt);
      }
    };
    requestAnimationFrame(attempt);
  };

  // Run once the previous page has finished animating out (page is now mounting).
  const applyScrollRestore = () => {
    const p = pendingRestore.current;
    pendingRestore.current = null;
    if (!p) return;
    // Fresh navigation to a #hash anchor is handled by the destination page itself.
    if (p.type === "fresh" && p.hash) return;
    const top = p.type === "pop" ? scrollPositions.current.get(p.key) ?? 0 : 0;
    scrollWithRetry(top);
  };

  // Scrollspy — only relevant on the home page.
  useEffect(() => {
    if (!isHome) return;

    const sections = [
      "hero", "about", "products", "features",
      "ecosystem", "applications", "app-and-tool", "estimator",
    ];

    let ticking = false;
    const update = () => {
      ticking = false;
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

    // Throttle the layout-reading work to once per animation frame.
    const handleScrollSpy = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
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
      case "yellow":
        return { blob1: "bg-neon-yellow-bright/10", blob2: "bg-amber-950/10" };
      case "purple":
        return { blob1: "bg-purple-500/10", blob2: "bg-pink-900/10" };
      default:
        return { blob1: "bg-neon-pink-bright/10", blob2: "bg-neon-blue-bright/10" };
    }
  };

  const currentGlows = getThemeGlowClasses();

  const outletContext: AppOutletContext = { setThemeGlow, quotedProduct, requestQuote };
  const outlet = useOutlet(outletContext);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] antialiased pb-0 select-none">
      {/* Custom Theme-Responsive Cursor */}
      <CustomCursor themeGlow={themeGlow} />

      {/* Global Ambient Light Engine (hidden on mobile — heavy blur causes scroll jank) */}
      <div className="hidden md:block fixed inset-0 overflow-hidden pointer-events-none -z-20">
        <div className={`absolute top-1/10 left-1/12 w-[550px] h-[550px] rounded-full blur-[160px] transition-colors duration-1000 ${currentGlows.blob1}`} />
        <div className={`absolute bottom-1/10 right-1/12 w-[550px] h-[550px] rounded-full blur-[160px] transition-colors duration-1000 ${currentGlows.blob2}`} />
      </div>
      <div className="fixed inset-0 bg-radial-at-t from-transparent via-transparent to-black/35 pointer-events-none -z-10" />

      <Header activeSection={isHome ? activeSection : ""} onNavigate={scrollToSection} />

      <AnimatePresence mode="wait" onExitComplete={applyScrollRestore}>
        {outlet && React.cloneElement(outlet, { key: location.pathname })}
      </AnimatePresence>

      <Footer onNavigate={scrollToSection} />

      <FloatingActions themeGlow={themeGlow} />
    </div>
    </MotionConfig>
  );
}

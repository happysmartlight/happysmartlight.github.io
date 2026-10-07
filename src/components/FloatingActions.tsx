import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeGlow } from "../Layout";

interface FloatingActionsProps {
  themeGlow: ThemeGlow;
}

const themeColorStyles: Record<
  ThemeGlow,
  {
    glowClass: string;
    buttonClass: string;
  }
> = {
  pink: {
    glowClass:
      "shadow-[0_0_15px_rgba(255,45,149,0.35)] hover:shadow-[0_0_25px_rgba(255,45,149,0.7)]",
    buttonClass:
      "text-[#ff2d95] border-[#ff2d95]/30 hover:bg-[#ff2d95] hover:text-slate-950 hover:border-transparent",
  },
  blue: {
    glowClass:
      "shadow-[0_0_15px_rgba(0,229,255,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)]",
    buttonClass:
      "text-[#00e5ff] border-[#00e5ff]/30 hover:bg-[#00e5ff] hover:text-slate-950 hover:border-transparent",
  },
  emerald: {
    glowClass:
      "shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]",
    buttonClass:
      "text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981] hover:text-slate-950 hover:border-transparent",
  },
  amber: {
    glowClass:
      "shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:shadow-[0_0_25px_rgba(245,158,11,0.7)]",
    buttonClass:
      "text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b] hover:text-slate-950 hover:border-transparent",
  },
  yellow: {
    glowClass:
      "shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:shadow-[0_0_25px_rgba(245,158,11,0.7)]",
    buttonClass:
      "text-[#fbbf24] border-[#fbbf24]/30 hover:bg-[#fbbf24] hover:text-slate-950 hover:border-transparent",
  },
  purple: {
    glowClass:
      "shadow-[0_0_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]",
    buttonClass:
      "text-[#a855f7] border-[#a855f7]/30 hover:bg-[#a855f7] hover:text-slate-950 hover:border-transparent",
  },
};

export default function FloatingActions({ themeGlow }: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of scroll-to-top based on scroll position
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const styles = themeColorStyles[themeGlow] || themeColorStyles.pink;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">

      {/* Scroll to Top Button (Bottom Right, above Zalo) */}
      <div className="absolute bottom-[90px] right-[20px] pointer-events-none flex flex-col gap-3">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className={`pointer-events-auto flex items-center justify-center w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] rounded-full bg-slate-950/80 backdrop-blur-md border transition-all duration-300 cursor-pointer ${styles.buttonClass} ${styles.glowClass}`}
              aria-label="Scroll to top"
              id="btn-scroll-top"
            >
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

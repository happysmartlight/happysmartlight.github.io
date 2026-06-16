import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of scroll-to-top based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Call Button (Bottom Left, Below Zalo) */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-none flex flex-col gap-3">
        <a
          href="tel:+84784140494"
          className="pointer-events-auto flex items-center justify-center w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] rounded-full bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:bg-emerald-400 hover:scale-110 transition-all duration-300"
          aria-label="Call Support"
          id="btn-call-support"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        </a>
      </div>

      {/* Scroll to Top Button (Bottom Right, above Zalo) */}
      <div className="absolute bottom-[90px] right-[20px] pointer-events-none flex flex-col gap-3">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              onClick={scrollToTop}
              className="pointer-events-auto flex items-center justify-center w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] rounded-full bg-slate-800 border border-white/10 text-white shadow-lg shadow-black/50 hover:bg-slate-700 hover:scale-110 transition-all duration-300 cursor-pointer"
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

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ThemeGlow } from "../Layout";

interface CustomCursorProps {
  themeGlow: ThemeGlow;
}

const themeColors: Record<ThemeGlow, string> = {
  pink: "#ff2d95",
  blue: "#00e5ff",
  emerald: "#10b981",
  amber: "#f59e0b",
  yellow: "#fbbf24",
  purple: "#a855f7",
};

export default function CustomCursor({ themeGlow }: CustomCursorProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Moderate spring: trails smoothly behind the dot without oscillating in circles when idle.
  // stiffness 300 + damping 28 + mass 0.5 = quick catch-up, minimal overshoot, no looping.
  const ringX = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    // 1. Detect if touch device (no hover capabilities)
    const checkDevice = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(hasTouch);

      if (!hasTouch) {
        document.documentElement.classList.add("custom-cursor-enabled");
      }
    };

    checkDevice();

    // 2. Track mouse position & visibility
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // 3. Delegate mouseover to detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer, .interactive-hover"
      );

      setIsHovered(!!interactiveEl);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // If mobile, don't render anything
  if (isMobile) return null;

  const themeColor = themeColors[themeGlow] || themeColors.pink;

  // GPU-accelerated scale transforms (no width/height/margin layout reflows).
  // Base ring = 32px (w-8 h-8). Scale changes perceived size without triggering layout.
  const ringVariants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(0, 0, 0, 0)",
      opacity: isVisible ? 0.9 : 0,
    },
    hover: {
      scale: 1.75, // 32→56px perceived
      backgroundColor: `${themeColor}18`, // ~9% fill
      opacity: isVisible ? 1 : 0,
    },
    click: {
      scale: 0.75, // 32→24px perceived
      backgroundColor: `${themeColor}33`, // ~20% fill
      opacity: isVisible ? 1 : 0,
    },
  };

  const dotVariants = {
    default: {
      scale: 1,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      scale: 0.6,
      opacity: isVisible ? 0.75 : 0,
    },
    click: {
      scale: 1.5,
      opacity: isVisible ? 1 : 0,
    },
  };

  return (
    <>
      {/* Outer Ring — 32px base, border-2 (2px) for visibility on dark backgrounds */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-2 pointer-events-none z-[9999] will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          borderColor: themeColor,
          boxShadow: isHovered
            ? `0 0 18px ${themeColor}55, inset 0 0 12px ${themeColor}30`
            : `0 0 8px ${themeColor}30`,
        }}
        variants={ringVariants}
        animate={isClicked ? "click" : isHovered ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.5 }}
      />

      {/* Inner Dot — 8px base, solid fill + bright neon glow */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: themeColor,
          boxShadow: `0 0 10px ${themeColor}, 0 0 22px ${themeColor}80`,
        }}
        variants={dotVariants}
        animate={isClicked ? "click" : isHovered ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
      />
    </>
  );
}


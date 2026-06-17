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
  purple: "#a855f7",
};

export default function CustomCursor({ themeGlow }: CustomCursorProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring spring physics for the trailing liquid effect
  const ringX = useSpring(cursorX, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 220, damping: 26, mass: 0.6 });

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

    window.addEventListener("mousemove", handleMouseMove);
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

  // Custom animations for components via Framer Motion Variants
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      marginLeft: -16,
      marginTop: -16,
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderWidth: 1.5,
      opacity: isVisible ? 0.85 : 0,
    },
    hover: {
      width: 56,
      height: 56,
      marginLeft: -28,
      marginTop: -28,
      backgroundColor: `${themeColor}15`, // ~8% opacity
      borderWidth: 1.5,
      opacity: isVisible ? 1 : 0,
    },
    click: {
      width: 24,
      height: 24,
      marginLeft: -12,
      marginTop: -12,
      backgroundColor: `${themeColor}33`, // ~20% opacity
      borderWidth: 2,
      opacity: isVisible ? 1 : 0,
    },
  };

  const dotVariants = {
    default: {
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -4,
      scale: 1,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -4,
      scale: 0.5,
      opacity: isVisible ? 0.7 : 0,
    },
    click: {
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -4,
      scale: 1.6,
      opacity: isVisible ? 1 : 0,
    },
  };

  return (
    <>
      {/* Outer Ring (smooth liquid lag) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          borderColor: themeColor,
          boxShadow: isHovered
            ? `0 0 15px ${themeColor}4d, inset 0 0 10px ${themeColor}26`
            : `0 0 8px ${themeColor}26`,
        }}
        variants={ringVariants}
        animate={isClicked ? "click" : isHovered ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.6 }}
      />

      {/* Inner Dot (instant response) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: themeColor,
          boxShadow: `0 0 10px ${themeColor}, 0 0 20px ${themeColor}80`,
        }}
        variants={dotVariants}
        animate={isClicked ? "click" : isHovered ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
      />
    </>
  );
}

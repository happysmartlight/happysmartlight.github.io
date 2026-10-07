import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";
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

  // Position follows the pointer instantly (no spring) so the cursor never lags
  // behind. Only the visual flair (scale/rotate) is animated.
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(hasTouch);
      if (!hasTouch) document.documentElement.classList.add("custom-cursor-enabled");
    };
    checkDevice();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

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

  if (isMobile) return null;

  const c = themeColors[themeGlow] || themeColors.pink;
  const state = isClicked ? "click" : isHovered ? "hover" : "default";

  // Four corner brackets forming a focus/target reticle around the pointer.
  // Expanding outward = clearer hover affordance; positional follow stays instant.
  const corner = "absolute w-2 h-2";
  const cornerStyle = { borderColor: c } as React.CSSProperties;

  const frameVariants = {
    default: { scale: 1, rotate: 0, opacity: isVisible ? 0.85 : 0 },
    hover: { scale: 1.7, rotate: 45, opacity: isVisible ? 1 : 0 },
    click: { scale: 0.7, rotate: 0, opacity: isVisible ? 1 : 0 },
  };
  const dotVariants = {
    default: { scale: 1, opacity: isVisible ? 1 : 0 },
    hover: { scale: 0.5, opacity: isVisible ? 0.9 : 0 },
    click: { scale: 2.2, opacity: isVisible ? 1 : 0 },
  };
  const spring = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.4 };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
      style={{ x: cursorX, y: cursorY }}
    >
      {/* Soft glow halo — depth + visibility on busy backgrounds, no positional lag */}
      <div
        className="absolute rounded-full"
        style={{
          width: 30,
          height: 30,
          marginLeft: -15,
          marginTop: -15,
          background: `radial-gradient(circle, ${c}40 0%, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Reticle frame: 24px box with 4 L-shaped corner brackets */}
      <motion.div
        className="absolute"
        style={{ width: 24, height: 24, marginLeft: -12, marginTop: -12 }}
        variants={frameVariants}
        animate={state}
        transition={spring}
      >
        <span className={`${corner} top-0 left-0 border-t-2 border-l-2`} style={cornerStyle} />
        <span className={`${corner} top-0 right-0 border-t-2 border-r-2`} style={cornerStyle} />
        <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} style={cornerStyle} />
        <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} style={cornerStyle} />
      </motion.div>

      {/* Bright center core — the always-easy-to-see anchor */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          backgroundColor: c,
          boxShadow: `0 0 8px ${c}, 0 0 16px ${c}90`,
        }}
        variants={dotVariants}
        animate={state}
        transition={spring}
      />
    </motion.div>
  );
}

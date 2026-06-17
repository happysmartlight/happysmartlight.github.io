import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + whether the element is in (or near) the viewport.
 * Defaults to `true` so content animates before the observer attaches and
 * during SSR. Use it to pause animations/timers while off-screen.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options ?? { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

/** Tracks the user's "reduce motion" OS setting (SSR-safe). */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

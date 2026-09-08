"use client";

import * as React from "react";

type Options = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

/**
 * Reports when an element enters the viewport. Defaults to firing once, slightly
 * before the element is fully on screen so animations feel anticipatory.
 * Falls back to "in view" when IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement>({
  rootMargin = "0px 0px -8% 0px",
  threshold = 0.2,
  once = true,
}: Options = {}) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView] as const;
}

/** True when the user has asked for reduced motion. Always false during SSR. */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

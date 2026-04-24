"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const reelTextRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const glitchTlRef = useRef<gsap.core.Timeline | null>(null);

  const formatPercent = (val: number): string => {
    const clamped = Math.min(Math.floor(val), 100);
    return String(clamped).padStart(3, "0");
  };

  const runExitAnimation = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    if (glitchTlRef.current) {
      glitchTlRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tlRef.current = tl;

    // Dramatic cinematic exit
    tl.to(percentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        reelTextRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        cornersRef.current,
        {
          opacity: 0,
          scale: 1.2,
          duration: 0.4,
          ease: "power2.in",
        },
        "<0.1"
      )
      .to(titleRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      })
      .to(
        progressBarRef.current,
        {
          scaleX: 0,
          transformOrigin: "center",
          duration: 0.4,
          ease: "power2.in",
        },
        "<0.1"
      )
      .to(containerRef.current, {
        clipPath: "inset(50% 0% 50% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
  }, [onComplete]);

  useEffect(() => {
    // Glitch animation on title
    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    glitchTlRef.current = glitchTl;

    glitchTl
      .to(titleRef.current, {
        skewX: 4,
        x: -3,
        duration: 0.05,
        ease: "steps(1)",
      })
      .to(titleRef.current, {
        skewX: 0,
        x: 2,
        duration: 0.05,
        ease: "steps(1)",
      })
      .to(titleRef.current, {
        skewX: -2,
        x: 0,
        duration: 0.05,
        ease: "steps(1)",
      })
      .to(titleRef.current, {
        skewX: 0,
        x: 0,
        duration: 0.05,
        ease: "steps(1)",
      })
      .to(titleRef.current, {
        opacity: 0.7,
        duration: 0.03,
      })
      .to(titleRef.current, {
        opacity: 1,
        duration: 0.03,
      });

    // Reel text blink
    gsap.to(reelTextRef.current, {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "steps(2)",
    });

    // Grain flicker
    gsap.to(grainRef.current, {
      opacity: 0.06,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    // Progress simulation
    const startTime = performance.now();

    const tick = (now: number) => {
      if (completedRef.current) return;

      const elapsed = now - startTime;
      const current = progressRef.current;

      let increment: number;
      if (current < 30) {
        increment = 0.8 + Math.random() * 0.5;
      } else if (current < 60) {
        increment = 0.4 + Math.random() * 0.3;
      } else if (current < 85) {
        increment = 0.15 + Math.random() * 0.15;
      } else if (current < 95) {
        increment = 0.05 + Math.random() * 0.05;
      } else {
        increment = 0.02;
      }

      // After 1.5s and document ready, rush to 100
      if (
        elapsed > 1500 &&
        typeof document !== "undefined" &&
        document.readyState === "complete" &&
        current >= 85
      ) {
        increment = 2;
      }

      progressRef.current = Math.min(current + increment, 100);

      // Update DOM directly for performance
      if (percentRef.current) {
        percentRef.current.textContent = formatPercent(progressRef.current) + "%";
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressRef.current}%`;
      }

      if (progressRef.current >= 100) {
        runExitAnimation();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // Also listen for document ready
    const checkReady = () => {
      if (document.readyState === "complete" && progressRef.current < 85) {
        progressRef.current = 85;
      }
    };
    window.addEventListener("load", checkReady);

    const titleEl = titleRef.current;
    const reelEl = reelTextRef.current;
    const grainEl = grainRef.current;

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("load", checkReady);
      if (tlRef.current) tlRef.current.kill();
      if (glitchTlRef.current) glitchTlRef.current.kill();
      gsap.killTweensOf([titleEl, reelEl, grainEl]);
    };
  }, [runExitAnimation]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 99999,
        backgroundColor: "#0a0a0a",
        clipPath: "inset(0% 0% 0% 0%)",
      }}
    >
      {/* Film grain overlay */}
      <div
        ref={grainRef}
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Frame corner decorations */}
      <div ref={cornersRef} className="pointer-events-none absolute inset-0">
        {/* Top-left */}
        <div className="absolute top-6 left-6">
          <div
            className="absolute top-0 left-0"
            style={{ width: "40px", height: "1px", backgroundColor: "#f0ede8" }}
          />
          <div
            className="absolute top-0 left-0"
            style={{ width: "1px", height: "40px", backgroundColor: "#f0ede8" }}
          />
        </div>
        {/* Top-right */}
        <div className="absolute top-6 right-6">
          <div
            className="absolute top-0 right-0"
            style={{ width: "40px", height: "1px", backgroundColor: "#f0ede8" }}
          />
          <div
            className="absolute top-0 right-0"
            style={{ width: "1px", height: "40px", backgroundColor: "#f0ede8" }}
          />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-6 left-6">
          <div
            className="absolute bottom-0 left-0"
            style={{ width: "40px", height: "1px", backgroundColor: "#f0ede8" }}
          />
          <div
            className="absolute bottom-0 left-0"
            style={{ width: "1px", height: "40px", backgroundColor: "#f0ede8" }}
          />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-6 right-6">
          <div
            className="absolute bottom-0 right-0"
            style={{ width: "40px", height: "1px", backgroundColor: "#f0ede8" }}
          />
          <div
            className="absolute bottom-0 right-0"
            style={{ width: "1px", height: "40px", backgroundColor: "#f0ede8" }}
          />
        </div>
      </div>

      {/* LOADING REEL... text - top left */}
      <div
        ref={reelTextRef}
        className="absolute top-10 left-10"
        style={{
          color: "#f0ede8",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          opacity: 0.8,
        }}
      >
        Loading Reel...
      </div>

      {/* Center title */}
      <div
        ref={titleRef}
        className="hero-title select-none"
        style={{
          color: "#f0ede8",
          fontSize: "clamp(3rem, 10vw, 8rem)",
          letterSpacing: "0.08em",
          lineHeight: 1,
          willChange: "transform, opacity",
        }}
      >
        Hello
      </div>

      {/* Film counter percentage - bottom right */}
      <span
        ref={percentRef}
        className="absolute bottom-10 right-10"
        style={{
          color: "#f0ede8",
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          letterSpacing: "0.1em",
          fontVariantNumeric: "tabular-nums",
          opacity: 0.9,
        }}
      >
        000%
      </span>

      {/* Progress bar - bottom */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "2px", backgroundColor: "rgba(240, 237, 232, 0.1)" }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "0%",
            backgroundColor: "#f0ede8",
            willChange: "width",
          }}
        />
      </div>

      {/* Skip button */}
      <button
        onClick={runExitAnimation}
        className="absolute bottom-10 left-10"
        style={{
          color: "rgba(240, 237, 232, 0.3)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240, 237, 232, 0.8)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240, 237, 232, 0.3)")}
      >
        SKIP →
      </button>
    </div>
  );
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
  pauseOnHover?: boolean
  variant?: "default" | "subtle"
}

export function Marquee({
  children,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  variant = "default",
  className,
  ...props
}: MarqueeProps) {
  const durations = { slow: "40s", normal: "25s", fast: "15s" }
  const dur = durations[speed]
  const dir = direction === "right" ? "reverse" : "normal"

  return (
    <div
      data-slot="tron-marquee"
      className={cn(
        "relative overflow-hidden",
        variant === "default"
          ? "rounded border border-primary/20 bg-card/80 py-3 backdrop-blur-sm"
          : "py-2",
        pauseOnHover && "hover:[&_.marquee-track]:pause",
        className
      )}
      {...props}
    >
      {variant === "default" && (
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
      )}

      <div className="relative h-4 overflow-hidden sm:h-5">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="marquee-track absolute inset-y-0 flex shrink-0 items-center gap-4 pr-4 sm:gap-8 sm:pr-8"
            style={{
              animation: `marqueeScroll ${dur} linear infinite`,
              animationDirection: dir,
              left: copy === 0 ? "0" : "100%",
            }}
          >
            {children}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 2rem)); }
        }
        .marquee-track.pause {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Fade edges */}
      <div className={cn(
        "pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r to-transparent sm:w-12",
        variant === "default" ? "from-card/80" : "from-background"
      )} />
      <div className={cn(
        "pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l to-transparent sm:w-12",
        variant === "default" ? "from-card/80" : "from-background"
      )} />
    </div>
  )
}

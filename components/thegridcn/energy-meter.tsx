"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useInView, usePrefersReducedMotion } from "@/lib/use-in-view"

interface EnergyMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  segments?: number
  label?: string
  orientation?: "horizontal" | "vertical"
  showValue?: boolean
}

function getVariant(value: number) {
  if (value < 30) return "critical"
  if (value <= 60) return "warning"
  return "primary"
}

const variantColors = {
  primary: {
    filled: "bg-primary shadow-[0_0_8px_var(--primary)]",
    text: "text-primary",
  },
  warning: {
    filled: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    text: "text-amber-500",
  },
  critical: {
    filled: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    text: "text-red-500",
  },
}

export function EnergyMeter({
  value,
  segments = 10,
  label,
  orientation = "horizontal",
  showValue = false,
  className,
  ...props
}: EnergyMeterProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const filledCount = Math.round((clamped / 100) * segments)
  const variant = getVariant(clamped)
  const colors = variantColors[variant]
  const isVertical = orientation === "vertical"

  // Render full on the server; on the client, empty while off-screen and fill
  // segment-by-segment once the meter scrolls into view (skipped under reduced motion).
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduce = usePrefersReducedMotion()
  const [visibleCount, setVisibleCount] = React.useState(filledCount)
  const [displayPercent, setDisplayPercent] = React.useState(clamped)

  React.useEffect(() => {
    if (reduce) { setVisibleCount(filledCount); setDisplayPercent(clamped); return }
    if (!inView) { setVisibleCount(0); setDisplayPercent(0); return }

    let current = 0
    const interval = window.setInterval(() => {
      current++
      setVisibleCount(current)
      if (current >= filledCount) window.clearInterval(interval)
    }, 60)

    let raf = 0
    const duration = filledCount * 60 + 100
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayPercent(Math.round(clamped * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { window.clearInterval(interval); cancelAnimationFrame(raf) }
  }, [clamped, filledCount, inView, reduce])

  return (
    <div
      ref={ref}
      data-slot="tron-energy-meter"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-3 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Label + Value header */}
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/80 sm:text-[11px]">
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn("font-mono text-sm font-bold tabular-nums", colors.text)}>
              {displayPercent}%
            </span>
          )}
        </div>
      )}

      {/* Segments */}
      <div
        aria-hidden="true"
        className={cn(
          "flex gap-1",
          isVertical && "flex-col-reverse items-center"
        )}
      >
        {Array.from({ length: segments }, (_, i) => {
          const isFilled = i < visibleCount
          const isLast = i === visibleCount - 1
          return (
            <div
              key={i}
              className={cn(
                "rounded-sm transition-[background-color,box-shadow,transform]",
                isVertical ? "h-2 w-full" : "h-6 flex-1",
                isFilled
                  ? cn(colors.filled, "duration-150")
                  : "bg-foreground/10 duration-300",
                isFilled && variant === "critical" && "animate-pulse",
                isLast && "scale-y-110"
              )}
            />
          )
        })}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}

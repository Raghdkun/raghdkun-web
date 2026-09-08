"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useInView, usePrefersReducedMotion } from "@/lib/use-in-view"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: "default" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg"
  animated?: boolean
  striped?: boolean
}

const variantColors: Record<string, { bar: string; glow: string }> = {
  default: { bar: "bg-primary", glow: "shadow-[0_0_8px_var(--primary)]" },
  success: { bar: "bg-emerald-500", glow: "shadow-[0_0_8px_rgba(16,185,129,0.5)]" },
  warning: { bar: "bg-amber-500", glow: "shadow-[0_0_8px_rgba(245,158,11,0.5)]" },
  danger: { bar: "bg-red-500", glow: "shadow-[0_0_8px_rgba(239,68,68,0.5)]" },
}

const sizeConfig: Record<string, { track: string; text: string }> = {
  sm: { track: "h-1.5", text: "text-[10px]" },
  md: { track: "h-2.5", text: "text-[10px] sm:text-[11px]" },
  lg: { track: "h-4", text: "text-xs" },
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = "default",
  size = "md",
  animated = true,
  striped = false,
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)
  const colors = variantColors[variant]
  const sizeC = sizeConfig[size]

  // Server-render the final width so the bar is meaningful without JS / with reduced motion.
  // On the client, collapse to 0 while off-screen and fill once the bar scrolls into view.
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduce = usePrefersReducedMotion()
  const [displayPct, setDisplayPct] = React.useState(pct)

  React.useEffect(() => {
    if (!animated || reduce) { setDisplayPct(pct); return }
    if (!inView) { setDisplayPct(0); return }
    let raf = 0
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplayPct(pct * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [pct, animated, reduce, inView])

  return (
    <div
      ref={ref}
      data-slot="tron-progress-bar"
      className={cn("relative", className)}
      {...props}
    >
      {/* Label row */}
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between gap-3">
          {label && (
            <span className={cn("font-mono uppercase tracking-widest text-foreground/60", sizeC.text)}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn("font-mono tabular-nums text-foreground/70", sizeC.text)}>
              {Math.round(displayPct)}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        className={cn(
          "relative overflow-hidden rounded-sm bg-foreground/10",
          sizeC.track
        )}
      >
        {/* Fill */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-sm transition-none",
            colors.bar, colors.glow
          )}
          style={{ width: `${displayPct}%` }}
        >
          {/* Stripe overlay */}
          {striped && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px)",
                animation: animated ? "progressStripe 0.8s linear infinite" : undefined,
              }}
            />
          )}

          {/* Leading edge glow */}
          <div className={cn(
            "absolute right-0 top-0 h-full w-2",
            "bg-gradient-to-l from-white/30 to-transparent"
          )} />
        </div>

        {/* Scanline */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.05)_1px,rgba(0,0,0,0.05)_2px)]" />
      </div>

      <style jsx>{`
        @keyframes progressStripe {
          0% { background-position: 0 0; }
          100% { background-position: 16px 0; }
        }
      `}</style>
    </div>
  )
}

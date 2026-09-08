"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BentoGridItem {
  title: string
  description?: string
  icon?: React.ReactNode
  span?: "1x1" | "2x1" | "1x2" | "2x2"
  variant?: "default" | "highlight"
}

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BentoGridItem[]
  columns?: 2 | 3 | 4
}

const spanMap: Record<string, string> = {
  "1x1": "",
  "2x1": "sm:col-span-2",
  "1x2": "sm:row-span-2",
  "2x2": "sm:col-span-2 sm:row-span-2",
}

const colsMap: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
}

/**
 * Entrance motion is owned by the page-level ScrollTrigger reveal (data-reveal),
 * so the grid itself is always rendered visible: no mount-time stagger that would
 * run off-screen, and nothing is hidden for no-JS or reduced-motion users.
 */
export function BentoGrid({
  items,
  columns = 3,
  className,
  ...props
}: BentoGridProps) {
  return (
    <div
      data-slot="tron-bento-grid"
      className={cn(
        "grid grid-cols-1 gap-3",
        colsMap[columns],
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "group relative overflow-hidden rounded border bg-card/80 p-5 transition-[border-color,box-shadow] duration-300",
            item.variant === "highlight"
              ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.06)]"
              : "border-primary/20 hover:border-primary/40",
            spanMap[item.span || "1x1"]
          )}
        >
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

          {/* Hover glow sweep */}
          <div className="pointer-events-none absolute -inset-px rounded opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent"
              style={{ animation: "bentoSweep 2s ease-in-out infinite" }}
            />
          </div>

          <div className="relative">
            {item.icon && (
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary/80">
                {item.icon}
              </div>
            )}
            <h3 className="font-mono text-sm font-medium uppercase tracking-wider text-foreground/90">
              {item.title}
            </h3>
            {item.description && (
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/55">
                {item.description}
              </p>
            )}
          </div>

          {/* Corner decorations */}
          <div className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-primary/40 transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
          <div className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-primary/40 transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary/40 transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary/40 transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
        </div>
      ))}

      <style jsx>{`
        @keyframes bentoSweep {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

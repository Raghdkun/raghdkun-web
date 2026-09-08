"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  selected?: boolean
  onRemove?: () => void
  variant?: "default" | "success" | "warning" | "danger"
  size?: "sm" | "md"
  disabled?: boolean
}

/**
 * Renders as a <button> only when it is actually interactive (onClick / onRemove);
 * otherwise a <span>, so static tags don't announce as buttons to assistive tech.
 */
export function Chip({
  selected = false,
  onRemove,
  variant = "default",
  size = "sm",
  disabled = false,
  className,
  children,
  onClick,
  ...props
}: ChipProps) {
  const variants: Record<string, { base: string; active: string }> = {
    default: {
      base: "border-primary/20 text-foreground/55 hover:border-primary/40 hover:text-foreground/80",
      active: "border-primary/50 bg-primary/10 text-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.15)]",
    },
    success: {
      base: "border-emerald-500/20 text-foreground/55 hover:border-emerald-500/40 hover:text-emerald-400/80",
      active: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    },
    warning: {
      base: "border-amber-500/20 text-foreground/55 hover:border-amber-500/40 hover:text-amber-400/80",
      active: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    },
    danger: {
      base: "border-red-500/20 text-foreground/55 hover:border-red-500/40 hover:text-red-400/80",
      active: "border-red-500/40 bg-red-500/10 text-red-400",
    },
  }

  const v = variants[variant]
  const interactive = Boolean(onClick || onRemove)
  const Comp: React.ElementType = interactive ? "button" : "span"

  return (
    <Comp
      {...(interactive ? { type: "button", disabled, onClick } : {})}
      data-slot="tron-chip"
      data-selected={selected ? "true" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-widest transition-[color,border-color,background-color] duration-200",
        size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]",
        interactive && "press min-h-8 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        disabled && "cursor-not-allowed opacity-40",
        selected ? v.active : v.base,
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove"
          onClick={(e: React.MouseEvent) => { e.stopPropagation(); onRemove() }}
          onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter") { e.stopPropagation(); onRemove() } }}
          className="ml-0.5 flex h-3 w-3 items-center justify-center rounded-full hover:bg-foreground/10"
        >
          <svg width="5" height="5" viewBox="0 0 5 5" fill="none" aria-hidden="true">
            <path d="M0.5 0.5l4 4M4.5 0.5l-4 4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </span>
      )}
    </Comp>
  )
}

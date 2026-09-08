"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Action = { label: string; href?: string; onClick?: () => void }

interface CTABannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  primaryAction?: Action
  secondaryAction?: Action
  variant?: "default" | "highlight"
}

function ActionButton({ action, primary }: { action: Action; primary?: boolean }) {
  const className = cn(
    "press inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded px-6 font-mono text-xs uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:w-auto",
    primary
      ? "border border-primary bg-primary text-primary-foreground shadow-[0_0_16px_rgba(var(--primary-rgb),0.25)] hover:bg-primary/90"
      : "border border-primary/30 text-foreground/70 hover:border-primary/50 hover:text-primary"
  )
  if (action.href) {
    const external = action.href.startsWith("http")
    return (
      <a
        href={action.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {action.label}
      </a>
    )
  }
  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  )
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "default",
  className,
  ...props
}: CTABannerProps) {
  return (
    <div
      data-slot="tron-cta-banner"
      className={cn(
        "group relative overflow-hidden rounded border bg-card/80 px-5 py-8 text-center backdrop-blur-sm sm:px-8 sm:py-10",
        variant === "highlight"
          ? "border-primary/50 shadow-[0_0_40px_rgba(var(--primary-rgb),0.08)]"
          : "border-primary/20",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Animated top border glow (transform-only, GPU friendly) */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px overflow-hidden">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ animation: "ctaSweep 4s ease-in-out infinite" }}
        />
      </div>

      <style jsx>{`
        @keyframes ctaSweep {
          0%, 100% { transform: translateX(-30%); }
          50% { transform: translateX(230%); }
        }
      `}</style>

      {/* Content */}
      <div className="relative">
        <h3 className="font-display text-xl font-bold uppercase tracking-wider text-foreground sm:text-2xl">
          {title}
        </h3>
        {description && (
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/65">
            {description}
          </p>
        )}

        {/* Actions: full-width stacked on phones, inline from sm */}
        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            {primaryAction && <ActionButton action={primaryAction} primary />}
            {secondaryAction && <ActionButton action={secondaryAction} />}
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/40" />
    </div>
  )
}

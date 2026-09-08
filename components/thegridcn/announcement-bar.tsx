"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  action?: { label: string; href?: string; onClick?: () => void }
  variant?: "default" | "highlight" | "warning"
  dismissible?: boolean
  dismissLabel?: string
  icon?: React.ReactNode
}

export function AnnouncementBar({
  text,
  action,
  variant = "default",
  dismissible = true,
  dismissLabel = "Dismiss",
  icon,
  className,
  ...props
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) return null

  const actionClass = cn(
    "press inline-flex min-h-8 shrink-0 cursor-pointer items-center rounded border px-2.5 text-[10px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
    variant === "warning"
      ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
      : "border-primary/40 text-primary hover:bg-primary/10"
  )

  return (
    <div
      data-slot="tron-announcement-bar"
      className={cn(
        "relative flex items-center justify-center overflow-hidden px-4 py-2 font-mono text-[11px] sm:text-xs",
        // Reserve room for the dismiss control so it never overlaps the action on narrow screens
        dismissible && "pe-12",
        variant === "default" && "border-b border-primary/30 bg-primary/5 text-foreground/80",
        variant === "highlight" && "border-b border-primary/50 bg-primary/10 text-primary",
        variant === "warning" && "border-b border-amber-500/30 bg-amber-500/5 text-amber-400/90",
        className
      )}
      {...props}
    >
      {/* Scanline */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Animated border glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px">
        <div
          className={cn(
            "h-full w-1/4 bg-gradient-to-r from-transparent to-transparent",
            variant === "warning" ? "via-amber-500/40" : "via-primary/40"
          )}
          style={{ animation: "announceSweep 5s ease-in-out infinite" }}
        />
      </div>

      <style jsx>{`
        @keyframes announceSweep {
          0%, 100% { transform: translateX(-40%); }
          50% { transform: translateX(340%); }
        }
      `}</style>

      <div className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
        {icon && <span className="hidden shrink-0 sm:inline-flex">{icon}</span>}
        <span className="text-center tracking-wide">{text}</span>
        {action && (
          action.href ? (
            <a
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={actionClass}
            >
              {action.label}
            </a>
          ) : (
            <button type="button" onClick={action.onClick} className={actionClass}>
              {action.label}
            </button>
          )
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={() => setDismissed(true)}
          className="absolute end-1 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-foreground/40 transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

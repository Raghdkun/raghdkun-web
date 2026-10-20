import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/projects";

const TONE: Record<ProjectStatus, { dot: string; text: string; border: string; pulse?: boolean }> = {
  live: { dot: "bg-primary", text: "text-foreground/85", border: "border-primary/40", pulse: true },
  building: { dot: "bg-amber-400", text: "text-amber-300", border: "border-amber-500/40", pulse: true },
  shipped: { dot: "bg-primary", text: "text-foreground/85", border: "border-primary/40" },
  "open-source": { dot: "bg-emerald-400", text: "text-emerald-300", border: "border-emerald-500/40" },
};

export function StatusBadge({ status, label, className }: { status: ProjectStatus; label: string; className?: string }) {
  const tone = TONE[status];
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded border bg-background/80 px-2 font-mono text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em]",
        tone.border,
        tone.text,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", tone.dot, tone.pulse && "animate-pulse")} />
      {label}
    </span>
  );
}

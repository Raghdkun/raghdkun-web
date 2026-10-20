"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { PROJECTS, type ProjectKind } from "@/lib/projects";
import { useLanguage } from "@/app/lib/i18n";
import { Chip } from "@/components/thegridcn/chip";
import { FeaturedProject } from "./featured-project";
import { ProjectCard } from "./project-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Column spans on a 6-column desktop grid so every row closes, whatever the count. */
function spansFor(n: number): string[] {
  const s2 = "lg:col-span-2";
  const s3 = "lg:col-span-3";
  const s6 = "lg:col-span-6";
  if (n === 1) return [s6];
  if (n === 2 || n === 4) return Array(n).fill(s3);
  if (n === 5) return [s3, s3, s2, s2, s2];
  return Array(n).fill(s2);
}

export function ProjectsShowcase({ limit }: { limit?: number }) {
  const { t } = useLanguage();
  const [filter, setFilter] = React.useState<"all" | ProjectKind>("all");
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  const kinds = React.useMemo(() => Array.from(new Set(PROJECTS.map((p) => p.kind))), []);
  const list = PROJECTS.filter((p) => filter === "all" || p.kind === filter).slice(0, limit);
  const featured = list.find((p) => p.featured);
  const rest = list.filter((p) => p !== featured);
  const spans = spansFor(rest.length);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rtl = document.documentElement.dir === "rtl";
      ScrollTrigger.batch("[data-card-reveal]", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 14, clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
            { y: 0, clipPath: "inset(0 0 0 0)", duration: 0.75, ease: "power2.out", stagger: 0.07, overwrite: "auto" },
          ),
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      {kinds.length > 1 && (
        <div role="group" aria-label={t.projects.filterLabel} className="mb-6 flex flex-wrap gap-2">
          {(["all", ...kinds] as Array<"all" | ProjectKind>).map((f) => (
            <Chip key={f} size="md" selected={filter === f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {t.projects.filters[f]}
            </Chip>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {featured && <FeaturedProject project={featured} />}

        {rest.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {rest.map((p, i) => (
              <ProjectCard key={p.slug} project={p} className={`${spans[i]} md:max-lg:last:odd:col-span-2`} />
            ))}
          </div>
        )}

        {list.length === 0 && (
          <p className="rounded border border-dashed border-primary/30 p-8 text-center font-mono text-xs uppercase tracking-widest text-foreground/60">
            {t.projects.empty}
          </p>
        )}
      </div>
    </div>
  );
}

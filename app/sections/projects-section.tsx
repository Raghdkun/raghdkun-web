"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PROJECTS } from "@/lib/projects";
import { Divider } from "@/components/thegridcn/divider";
import { ProjectsShowcase } from "@/components/projects/projects-showcase";
import { useLanguage } from "../lib/i18n";

/** Landing-page projects section: a curated showcase; the full list lives at /projects. */
const LIMIT = 6;

export function ProjectsSection() {
  const { locale, t } = useLanguage();

  return (
    <section id="projects" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-scan>
          <Divider label={t.projects.divider} variant="glow" />
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              key={`projects-${locale}`}
              data-decode
              className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl"
            >
              {t.projects.title} <span className="text-primary">{t.projects.titleAccent}</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-foreground/60 sm:text-sm">{t.projects.intro}</p>
          </div>
          {PROJECTS.length > LIMIT && (
            <Link
              href="/projects"
              className="inline-flex min-h-10 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              {t.projects.viewAll}
              <ArrowUpRight className="size-3.5 rtl:-scale-x-100" strokeWidth={1.75} />
            </Link>
          )}
        </div>

        <div className="mt-10">
          <ProjectsShowcase limit={LIMIT} />
        </div>
      </div>
    </section>
  );
}

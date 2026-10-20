"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { useLanguage } from "@/app/lib/i18n";
import { Button } from "@/components/ui/button";
import { ShowcaseComposition } from "./showcase-composition";
import { StatusBadge } from "./status";

export function FeaturedProject({ project }: { project: Project }) {
  const { locale, t } = useLanguage();

  return (
    <article
      data-card-reveal
      className="relative overflow-hidden rounded border border-primary/50 bg-card/70"
    >
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
      <div aria-hidden className="pointer-events-none absolute -top-24 start-1/3 size-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.2fr] lg:gap-12 lg:p-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-6 items-center rounded border border-primary/50 bg-primary/15 px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {t.projects.featured}
            </span>
            <span className="inline-flex h-6 items-center rounded border border-primary/30 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/70">
              {t.projects.kinds[project.kind]}
            </span>
            <StatusBadge status={project.status} label={t.projects.statuses[project.status]} />
          </div>

          <h3 className="mt-5 font-display text-4xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-5xl">
            {project.title}
            {project.titleAr && <span className="ms-3 text-primary">{project.titleAr}</span>}
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">{project.tagline[locale]}</p>
          <p className="mt-5 max-w-[55ch] text-sm leading-relaxed text-foreground/75 sm:text-base">{project.summary[locale]}</p>

          {project.facts && (
            <dl className="mt-6 grid grid-cols-3 gap-2">
              {project.facts.map((f) => (
                <div key={f.value + f.label.en} className="rounded border border-primary/20 bg-background/50 p-3">
                  <dd className="tabular font-display text-2xl font-bold text-primary">{f.value}</dd>
                  <dt className="mt-1 text-[10px] leading-snug text-foreground/60">{f.label[locale]}</dt>
                </div>
              ))}
            </dl>
          )}

          <ul aria-label={t.projects.sections.stack} className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 8).map((s) => (
              <li key={s} className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/projects/${project.slug}`}>
                {t.projects.viewCase}
                <span className="sr-only"> — {project.title}</span>
                <ArrowUpRight className="size-4 rtl:-scale-x-100" strokeWidth={1.75} />
              </Link>
            </Button>
          </div>
        </div>

        <ShowcaseComposition project={project} priority sizes="(min-width: 1024px) 52vw, 100vw" />
      </div>
    </article>
  );
}

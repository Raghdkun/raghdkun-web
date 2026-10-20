"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";
import { useLanguage } from "@/app/lib/i18n";
import { BrowserFrame, PhoneFrame } from "./device-frame";
import { StatusBadge } from "./status";

/** Artwork that "peeks" up from the bottom of a card; phones for mobile apps, a page for the rest. */
function CardMedia({ project }: { project: Project }) {
  const { locale } = useLanguage();
  const phones = project.showcase?.phones ?? [];
  const useful = project.kind === "mobile" && phones.length > 0;

  return (
    <div
      dir="ltr"
      className="relative aspect-[16/10] overflow-hidden border-b border-primary/20 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_70%)]"
    >
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
      {useful ? (
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-[4%] px-[14%]">
          {phones.slice(0, 2).map((img, i) => (
            <div
              key={img.src}
              className={cn(
                "w-[44%] translate-y-[22%] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:translate-y-[14%]",
                i === 0 && "translate-y-[30%] group-hover/card:translate-y-[22%]",
              )}
            >
              <PhoneFrame image={img} locale={locale} sizes="(min-width: 1024px) 14vw, 30vw" />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-x-[7%] top-[9%] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1">
          <BrowserFrame
            image={project.showcase?.desktop ?? project.cover}
            locale={locale}
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
            label={project.links.find((l) => l.kind === "live")?.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            crop="16 / 11"
          />
        </div>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card/90 to-transparent" />
    </div>
  );
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const { locale, t } = useLanguage();
  const live = project.links.find((l) => l.kind === "live");
  const repo = project.links.find((l) => l.kind === "repo");
  const external = live ?? repo;

  return (
    <article
      data-card-reveal
      className={cn(
        "group/card relative flex min-w-0 flex-col overflow-hidden rounded border border-primary/20 bg-card/80 transition-[border-color,box-shadow] duration-300 focus-within:border-primary/60 hover:border-primary/50",
        className,
      )}
    >
      <CardMedia project={project} />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex h-6 items-center rounded border border-primary/30 bg-primary/10 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
            {t.projects.kinds[project.kind]}
          </span>
          <StatusBadge status={project.status} label={t.projects.statuses[project.status]} />
        </div>

        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
          {/* Stretched link: the whole card opens the case study */}
          <Link
            href={`/projects/${project.slug}`}
            className="outline-none after:absolute after:inset-0 after:z-0 focus-visible:after:ring-2 focus-visible:after:ring-primary"
          >
            {project.title}
            {project.titleAr && locale === "ar" && <span className="ms-2 text-foreground/60">{project.titleAr}</span>}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">{project.tagline[locale]}</p>
        <p className="mt-3 line-clamp-3 max-w-[60ch] text-sm leading-relaxed text-foreground/72">{project.summary[locale]}</p>

        <ul aria-label={t.projects.sections.stack} className="mb-5 mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s} className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70">
              {s}
            </li>
          ))}
          {project.stack.length > 5 && (
            <li className="px-1 py-0.5 font-mono text-[10px] tracking-wider text-foreground/45">+{project.stack.length - 5}</li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-primary/10 pt-4 font-mono text-[10px] uppercase tracking-[0.25em]">
          <span className="inline-flex items-center gap-1 text-primary">
            {t.projects.viewCase}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 rtl:-scale-x-100" strokeWidth={1.75} />
          </span>
          {external && (
            <a
              href={external.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-8 items-center rounded px-1 text-foreground/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              {external.kind === "live" ? t.projects.openLive : t.projects.openRepo}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

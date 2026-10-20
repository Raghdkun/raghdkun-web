"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { useLanguage } from "@/app/lib/i18n";
import { WHATSAPP_URL } from "@/app/lib/site";
import { Button } from "@/components/ui/button";
import { CTABanner } from "@/components/thegridcn/cta-banner";
import { Divider } from "@/components/thegridcn/divider";
import { Github } from "@/app/components/icons";
import { Gallery } from "./gallery";
import { ShowcaseComposition } from "./showcase-composition";
import { StatusBadge } from "./status";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{children}</h2>;
}

export function ProjectDetail({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  const { locale, t } = useLanguage();
  const live = project.links.find((l) => l.kind === "live");
  const repo = project.links.find((l) => l.kind === "repo");

  return (
    <main id="main-content" className="relative">
      {/* ───────── Header ───────── */}
      <section className="relative overflow-hidden border-b border-primary/15">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8">
          <Link
            href="/projects"
            className="reveal-in inline-flex min-h-10 items-center gap-2 rounded font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <ArrowLeft className="size-3.5 rtl:rotate-180" strokeWidth={1.75} />
            {t.projects.back}
          </Link>

          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div className="min-w-0">
              <div className="reveal-in flex flex-wrap items-center gap-2" style={{ ["--d" as string]: "60ms" }}>
                <span className="inline-flex h-6 items-center rounded border border-primary/30 bg-primary/10 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  {t.projects.kinds[project.kind]}
                </span>
                <StatusBadge status={project.status} label={t.projects.statuses[project.status]} />
              </div>

              <h1
                className="reveal-in mt-5 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                style={{ ["--d" as string]: "120ms" }}
              >
                {project.title}
                {project.titleAr && <span className="ms-3 text-primary">{project.titleAr}</span>}
              </h1>
              <p className="reveal-in mt-3 font-mono text-xs uppercase tracking-[0.22em] text-primary" style={{ ["--d" as string]: "180ms" }}>
                {project.tagline[locale]}
              </p>
              <p className="reveal-in mt-5 max-w-[58ch] text-base leading-relaxed text-foreground/75" style={{ ["--d" as string]: "240ms" }}>
                {project.summary[locale]}
              </p>

              {(live || repo) && (
                <div className="reveal-in mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ ["--d" as string]: "300ms" }}>
                  {live && (
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <a href={live.url} target="_blank" rel="noopener noreferrer">
                        {t.projects.openLive} <ArrowUpRight className="size-4 rtl:-scale-x-100" strokeWidth={1.75} />
                      </a>
                    </Button>
                  )}
                  {repo && (
                    <Button asChild size="lg" variant="outline" className="w-full border-primary/40 sm:w-auto">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        <Github className="size-4" /> {t.projects.openRepo}
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            <dl className="reveal-in grid grid-cols-2 gap-px overflow-hidden rounded border border-primary/25 bg-primary/20" style={{ ["--d" as string]: "180ms" }}>
              {(
                [
                  [t.projects.meta.role, project.role[locale]],
                  project.year ? [t.projects.meta.year, project.year] : null,
                  [t.projects.meta.status, t.projects.statuses[project.status]],
                  [t.projects.meta.type, t.projects.kinds[project.kind]],
                ].filter(Boolean) as string[][]
              ).map(([k, v]) => (
                <div key={k} className="bg-card/90 p-4 last:odd:col-span-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">{k}</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-foreground/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───────── Hero art ───────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="reveal-view mx-auto max-w-5xl">
          <ShowcaseComposition project={project} priority sizes="(min-width: 1024px) 960px, 100vw" />
        </div>
      </section>

      {/* ───────── Overview + facts ───────── */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
        <Divider label={t.projects.sections.overview} variant="glow" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div className="reveal-view space-y-5">
            {project.description.map((p, i) => (
              <p key={i} className="max-w-[68ch] text-base leading-relaxed text-foreground/78">
                {p[locale]}
              </p>
            ))}
          </div>

          <aside className="reveal-view space-y-6">
            {project.facts && (
              <dl className="grid grid-cols-3 gap-2">
                {project.facts.map((f) => (
                  <div key={f.value + f.label.en} className="rounded border border-primary/20 bg-card/60 p-3">
                    <dd className="tabular font-display text-2xl font-bold text-primary">{f.value}</dd>
                    <dt className="mt-1 text-[10px] leading-snug text-foreground/60">{f.label[locale]}</dt>
                  </div>
                ))}
              </dl>
            )}
            <div>
              <SectionLabel>{t.projects.sections.stack}</SectionLabel>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="rounded border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/75">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ───────── Highlights ───────── */}
      {project.highlights.length > 0 && (
        <section className="border-y border-primary/10 bg-card/25">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <SectionLabel>{t.projects.sections.highlights}</SectionLabel>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {project.highlights.map((g) => (
                <div key={g.title.en} className="reveal-view relative rounded border border-primary/25 bg-card/70 p-5 sm:p-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">{g.title[locale]}</h3>
                  <ul className="mt-4 space-y-3">
                    {g.items.map((it) => (
                      <li key={it.en} className="flex gap-2.5 text-sm leading-relaxed text-foreground/72">
                        <span aria-hidden className="mt-1 shrink-0 text-primary rtl:-scale-x-100">▸</span>
                        <span>{it[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── Gallery ───────── */}
      {project.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <SectionLabel>{t.projects.sections.gallery}</SectionLabel>
          <div className="mt-6">
            <Gallery groups={project.gallery} />
          </div>
        </section>
      )}

      {/* ───────── Prev / next ───────── */}
      {prev && next && prev !== project && (
        <nav aria-label="Projects" className="mx-auto grid max-w-7xl gap-px overflow-hidden border-y border-primary/15 bg-primary/15 sm:grid-cols-2">
          {[
            { p: prev, label: t.projects.prev, dir: "prev" as const },
            { p: next, label: t.projects.next, dir: "next" as const },
          ].map(({ p, label, dir }) => (
            <Link
              key={dir}
              href={`/projects/${p.slug}`}
              className="group flex min-h-24 items-center justify-between gap-4 bg-background p-5 transition-colors hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/60 sm:p-6"
            >
              {dir === "prev" && <ArrowLeft className="size-4 shrink-0 text-primary transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" strokeWidth={1.5} />}
              <span className={dir === "next" ? "ms-auto text-end" : ""}>
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">{label}</span>
                <span className="mt-1 block font-display text-xl font-bold uppercase tracking-wide text-foreground">{p.title}</span>
              </span>
              {dir === "next" && <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={1.5} />}
            </Link>
          ))}
        </nav>
      )}

      {/* ───────── CTA ───────── */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <CTABanner
          title={t.projects.ctaTitle}
          description={t.projects.ctaDesc}
          variant="highlight"
          primaryAction={{ label: t.contact.ctaPrimary, href: WHATSAPP_URL }}
          secondaryAction={{ label: t.projects.back, href: "/projects" }}
        />
      </section>
    </main>
  );
}

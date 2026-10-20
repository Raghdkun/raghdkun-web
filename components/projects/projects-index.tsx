"use client";

import { Divider } from "@/components/thegridcn/divider";
import { useLanguage } from "@/app/lib/i18n";
import { ProjectsShowcase } from "./projects-showcase";

export function ProjectsIndex() {
  const { t } = useLanguage();
  return (
    <main id="main-content" className="relative">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-96 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8">
        <Divider label={t.projects.divider} variant="glow" />
        <h1 className="reveal-in mt-8 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl">
          {t.projects.title} <span className="text-primary">{t.projects.titleAccent}</span>
        </h1>
        <p className="reveal-in mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base" style={{ ["--d" as string]: "80ms" }}>
          {t.projects.intro}
        </p>
        <div className="mt-10">
          <ProjectsShowcase />
        </div>
      </div>
    </main>
  );
}

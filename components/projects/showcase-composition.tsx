"use client";

import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";
import { useLanguage } from "@/app/lib/i18n";
import { BrowserFrame, PhoneFrame } from "./device-frame";

/**
 * Hero art for a project: a desktop screenshot with phone screens overlapping it,
 * a fanned phone row, or a lone browser frame, depending on the assets available.
 * Rotations and overlaps only apply from `md` up; below that it stacks cleanly.
 * Positioned physically (dir="ltr") so the artwork never mirrors in Arabic.
 */
export function ShowcaseComposition({
  project,
  priority,
  sizes = "(min-width: 1024px) 55vw, 100vw",
  className,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const { locale } = useLanguage();
  const phones = project.showcase?.phones ?? [];
  const desktop = project.showcase?.desktop;
  const host = project.links.find((l) => l.kind === "live")?.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (desktop && phones.length > 0) {
    return (
      <div dir="ltr" className={cn("relative aspect-[5/4] w-full", className)}>
        <div className="absolute right-0 top-0 w-[86%]">
          <BrowserFrame image={desktop} locale={locale} sizes={sizes} priority={priority} label={host} />
        </div>
        {phones.slice(0, 3).map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "absolute bottom-0 w-[24%] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
              i === 0 && "left-0 z-10 md:-rotate-2 md:hover:-translate-y-1",
              i === 1 && "left-[24%] z-20 -translate-y-[6%] md:hover:-translate-y-[9%]",
              i === 2 && "left-[48%] z-10 md:rotate-2 md:hover:-translate-y-1",
            )}
          >
            <PhoneFrame image={img} locale={locale} sizes="(min-width: 1024px) 14vw, 26vw" priority={priority && i === 1} />
          </div>
        ))}
      </div>
    );
  }

  if (phones.length > 0) {
    return (
      <div dir="ltr" className={cn("relative mx-auto flex w-full max-w-xl items-end justify-center gap-[3%]", className)}>
        {phones.slice(0, 3).map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "w-[30%] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
              phones.length === 3 && i === 1 && "-translate-y-[8%]",
            )}
          >
            <PhoneFrame image={img} locale={locale} sizes="(min-width: 1024px) 16vw, 30vw" priority={priority && i === 0} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div dir="ltr" className={cn("w-full", className)}>
      <BrowserFrame image={desktop ?? project.cover} locale={locale} sizes={sizes} priority={priority} label={host} />
    </div>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GalleryGroup } from "@/lib/projects";
import { useLanguage } from "@/app/lib/i18n";
import { PhoneFrame } from "./device-frame";

type Locale = "en" | "ar";

function Lightbox({
  group,
  index,
  setIndex,
  onClose,
}: {
  group: GalleryGroup;
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const { locale, t } = useLanguage();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const total = group.images.length;
  const img = group.images[index];
  const rtl = locale === "ar";

  React.useEffect(() => {
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  }, []);

  const go = React.useCallback(
    (delta: number) => setIndex((index + delta + total) % total),
    [index, total, setIndex],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Arrow keys follow what is on screen: in RTL the "next" button is on the left.
    if (e.key === "ArrowRight") go(rtl ? -1 : 1);
    if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
  };

  const btn =
    "press inline-flex size-11 cursor-pointer items-center justify-center rounded border border-primary/40 bg-background/80 text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label={img.alt[locale as Locale]}
      className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-foreground backdrop:bg-background/92 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
            <span className="tabular text-primary">
              {t.projects.lightbox.counter.replace("{n}", String(index + 1)).replace("{total}", String(total))}
            </span>
            <span className="mx-2 text-foreground/30">/</span>
            {img.alt[locale as Locale]}
          </p>
          <button type="button" onClick={onClose} aria-label={t.projects.lightbox.close} className={btn}>
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <div data-lenis-prevent className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto px-4 pb-4 sm:px-16">
          {total > 1 && (
            <button type="button" onClick={() => go(-1)} aria-label={t.projects.lightbox.prev} className={cn(btn, "absolute start-2 top-1/2 z-10 -translate-y-1/2 sm:start-4")}>
              <ChevronLeft className="size-4 rtl:rotate-180" strokeWidth={1.5} />
            </button>
          )}
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt[locale as Locale]}
            width={img.w}
            height={img.h}
            sizes="(min-width: 1280px) 1100px, 92vw"
            className={cn(
              "h-auto w-auto rounded border border-primary/30 bg-card",
              group.layout === "phone" ? "max-h-[calc(100dvh-7rem)]" : "max-h-[calc(100dvh-7rem)] max-w-full object-contain",
            )}
          />
          {total > 1 && (
            <button type="button" onClick={() => go(1)} aria-label={t.projects.lightbox.next} className={cn(btn, "absolute end-2 top-1/2 z-10 -translate-y-1/2 sm:end-4")}>
              <ChevronRight className="size-4 rtl:rotate-180" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function Gallery({ groups }: { groups: GalleryGroup[] }) {
  const { locale, t } = useLanguage();
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState<number | null>(null);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const group = groups[active];

  const onTabKey = (e: React.KeyboardEvent) => {
    const rtl = locale === "ar";
    let next = active;
    if (e.key === "ArrowRight") next = active + (rtl ? -1 : 1);
    else if (e.key === "ArrowLeft") next = active + (rtl ? 1 : -1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = groups.length - 1;
    else return;
    e.preventDefault();
    next = (next + groups.length) % groups.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {groups.length > 1 && (
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div role="tablist" aria-label={t.projects.sections.gallery} onKeyDown={onTabKey} className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {groups.map((g, i) => (
              <button
                key={g.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                type="button"
                id={`tab-${g.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${g.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "press inline-flex min-h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded border px-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                  i === active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-primary/20 text-foreground/60 hover:border-primary/40 hover:text-foreground/85",
                )}
              >
                {g.label[locale]}
                <span className="tabular text-[10px] text-foreground/40">{g.images.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`} className="mt-6">
        <ul
          className={cn(
            "grid gap-4",
            group.layout === "phone" && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
            group.layout === "desktop" && "grid-cols-1 md:grid-cols-2",
            group.layout === "collage" && "grid-cols-1 md:grid-cols-2",
          )}
        >
          {group.images.map((img, i) => (
            <li key={img.src} className={cn(group.layout === "collage" && i === 0 && "md:col-span-2")}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${t.projects.lightbox.open}: ${img.alt[locale]}`}
                className="group/shot block w-full cursor-pointer text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                {group.layout === "phone" ? (
                  <PhoneFrame
                    image={img}
                    locale={locale}
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                    className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/shot:-translate-y-1"
                  />
                ) : (
                  <div className="relative overflow-hidden rounded border border-primary/25 bg-card transition-[border-color] duration-300 group-hover/shot:border-primary/60">
                    <div
                      className="relative"
                      style={{ aspectRatio: group.layout === "desktop" ? "16 / 10" : `${img.w} / ${img.h}` }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt[locale]}
                        fill
                        sizes="(min-width: 768px) 46vw, 92vw"
                        loading="lazy"
                        className={cn("object-cover", group.layout === "desktop" && "object-top")}
                      />
                    </div>
                  </div>
                )}
                <span className="mt-2 block font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-foreground/55 group-hover/shot:text-foreground/80">
                  {img.alt[locale]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && <Lightbox group={group} index={open} setIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}

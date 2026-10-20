import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/lib/projects";

type Locale = "en" | "ar";

/** A phone screenshot inside a thin machined bezel. Aspect ratio comes from the image. */
export function PhoneFrame({
  image,
  locale,
  sizes,
  priority,
  className,
}: {
  image: ImageAsset;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[1.6rem] border border-primary/35 bg-background p-[5px] shadow-[0_24px_60px_-24px_rgba(var(--primary-rgb),0.45)]",
        className,
      )}
    >
      <div
        className="relative overflow-hidden rounded-[1.25rem] bg-card"
        style={{ aspectRatio: `${image.w} / ${image.h}` }}
      >
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}

/**
 * A desktop screenshot under a minimal browser bar. With `crop`, the image is clipped to a
 * fixed ratio and anchored to the top, which is how cards "peek" a page from below.
 */
export function BrowserFrame({
  image,
  locale,
  sizes,
  priority,
  crop,
  label,
  className,
}: {
  image: ImageAsset;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  crop?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-primary/30 bg-card shadow-[0_24px_60px_-28px_rgba(var(--primary-rgb),0.5)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-primary/20 bg-background/80 px-3 py-2" aria-hidden="true">
        <span className="size-2 rounded-full bg-foreground/20" />
        <span className="size-2 rounded-full bg-foreground/20" />
        <span className="size-2 rounded-full bg-foreground/20" />
        {label && (
          <span dir="ltr" className="ms-3 truncate rounded bg-foreground/5 px-2 py-0.5 font-mono text-[10px] tracking-wide text-foreground/50">
            {label}
          </span>
        )}
      </div>
      <div className="relative" style={{ aspectRatio: crop ?? `${image.w} / ${image.h}` }}>
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

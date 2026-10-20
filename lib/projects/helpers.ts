import type { ImageAsset, L } from "./types";

/**
 * Site screenshots are captured at 1440×900 / 390×844 (2×) and stored as
 * 1800×1125 desktop and 640×1386 mobile WebP files in public/projects/<slug>/.
 */
export function shot(slug: string, name: string, kind: "desktop" | "mobile", alt: L): ImageAsset {
  return {
    src: `/projects/${slug}/${kind}-${name}.webp`,
    w: kind === "desktop" ? 1800 : 640,
    h: kind === "desktop" ? 1125 : 1386,
    alt,
  };
}

/** Simulator screenshots (iPhone 17 Pro, 1206×2622) stored at 640×1392. */
export function appShot(slug: string, name: string, alt: L): ImageAsset {
  return { src: `/projects/${slug}/${name}.webp`, w: 640, h: 1392, alt };
}

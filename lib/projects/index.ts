import type { L, Project } from "./types";
import { doghri } from "./doghri";
import { trucking360 } from "./trucking360";
import { arthena } from "./arthena";
import { gosimple } from "./gosimple";
import { wavlet } from "./wavlet";

export type { L, Project, ProjectKind, ProjectStatus } from "./types";
export type { GalleryGroup, ImageAsset, Highlight } from "./types";

/** Order here is the order on the site. */
export const PROJECTS: Project[] = [doghri, trucking360, arthena, gosimple, wavlet];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/** Pick the string for the active language. */
export const tr = (l: L, locale: "en" | "ar") => l[locale];

export function neighbours(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i < 0 || PROJECTS.length < 2) return { prev: undefined, next: undefined };
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}

/** A string in both site languages. */
export type L = { en: string; ar: string };

export type ProjectKind = "mobile" | "web" | "platform";
export type ProjectStatus = "live" | "building" | "shipped" | "open-source";

export type ImageAsset = {
  src: string;
  w: number;
  h: number;
  alt: L;
};

export type GalleryGroup = {
  id: string;
  label: L;
  /** phone = portrait screens, desktop = wide screens, collage = pre-composed wide art */
  layout: "phone" | "desktop" | "collage";
  images: ImageAsset[];
};

export type Highlight = { title: L; items: L[] };

export type Project = {
  slug: string;
  title: string;
  /** Arabic display name, when the product has one */
  titleAr?: string;
  kind: ProjectKind;
  /** Omit when unknown; the case study then hides the Year cell. */
  year?: string;
  status: ProjectStatus;
  role: L;
  tagline: L;
  /** One or two sentences, used on cards */
  summary: L;
  /** Case-study paragraphs */
  description: L[];
  highlights: Highlight[];
  /** Short facts shown as a stat row (value + label) */
  facts?: { value: string; label: L }[];
  stack: string[];
  links: { label: L; url: string; kind: "live" | "repo" }[];
  cover: ImageAsset;
  /** Used by the featured showcase composition on the landing page */
  showcase?: { phones: ImageAsset[]; desktop?: ImageAsset };
  gallery: GalleryGroup[];
  featured?: boolean;
};

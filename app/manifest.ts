import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raghdkun — Fullstack Developer",
    short_name: "Raghdkun",
    description:
      "Fullstack developer building polished web, mobile and AI-powered interfaces. React, Next.js, Laravel, Flutter, n8n & Dify.",
    start_url: "/",
    display: "standalone",
    background_color: "#070b1a",
    theme_color: "#070b1a",
    lang: "en",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}

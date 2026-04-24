import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const BASE_URL = "https://raghdkun.dev";

function discoverRoutes(dir: string, prefix = ""): string[] {
  const routes: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    if (entry.name === "components" || entry.name === "api") continue;

    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const segment = entry.name.startsWith("(")
        ? prefix
        : `${prefix}/${entry.name}`;

      const children = readdirSync(fullPath);
      const hasPage = children.some((f) => /^page\.(tsx?|jsx?|mdx?)$/.test(f));

      if (hasPage) routes.push(segment || "/");
      routes.push(...discoverRoutes(fullPath, segment));
    }
  }

  return routes;
}

function getLastModified(dir: string, route: string): Date {
  const segments = route === "/" ? [] : route.split("/").filter(Boolean);
  let target = dir;
  for (const seg of segments) target = join(target, seg);

  try {
    const files = readdirSync(target);
    const pageFile = files.find((f) => /^page\.(tsx?|jsx?|mdx?)$/.test(f));
    if (pageFile) return statSync(join(target, pageFile)).mtime;
  } catch {
    /* fallback below */
  }
  return new Date();
}

function priority(route: string): number {
  if (route === "/") return 1.0;
  const depth = route.split("/").filter(Boolean).length;
  return Math.max(0.3, 1.0 - depth * 0.2);
}

function changeFrequency(
  route: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route === "/") return "weekly";
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = join(process.cwd(), "app");
  const routes = discoverRoutes(appDir);

  if (!routes.includes("/")) routes.unshift("/");

  return routes.map((route) => ({
    url: `${BASE_URL}${route === "/" ? "" : route}`,
    lastModified: getLastModified(appDir, route),
    changeFrequency: changeFrequency(route),
    priority: priority(route),
  }));
}

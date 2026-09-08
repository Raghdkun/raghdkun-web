// Captures 1440x900 hero screenshots of the live projects into public/images/projects.
// Usage: pnpm capture            (all)   |   pnpm capture zahratalhayat b-dashboard   (subset)
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const outputDir = path.resolve(process.cwd(), "public", "images", "projects");

const targets = [
  { name: "trucking360", url: "https://trucking360solutions.com/" },
  { name: "gosimple", url: "https://gosimple.io/" },
  { name: "cleave", url: "https://cleave.raghdkun.tech/" },
  { name: "b-dashboard", url: "https://b-dashboard-five.vercel.app/" },
  { name: "zahratalhayat", url: "https://zahratalhayat.online/" },
];

const only = new Set(process.argv.slice(2));
const selected = only.size ? targets.filter((t) => only.has(t.name)) : targets;

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
});

for (const t of selected) {
  const page = await context.newPage();
  try {
    console.log(`→ ${t.name}: ${t.url}`);
    // "load" rather than "networkidle": sites with analytics beacons or long-polling never go idle.
    await page.goto(t.url, { waitUntil: "load", timeout: 45_000 });
    await page.waitForTimeout(3000);
    const file = path.join(outputDir, `${t.name}.jpg`);
    await page.screenshot({ path: file, type: "jpeg", quality: 82, fullPage: false });
    console.log(`  ✓ saved ${path.relative(process.cwd(), file)}`);
  } catch (err) {
    console.error(`  ✗ ${t.name} failed:`, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("done");

import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const outputDir = path.resolve(process.cwd(), "public", "images", "projects");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const targets = [
  { name: "trucking360", url: "https://trucking360solutions.com/" },
  { name: "cleave", url: "https://cleave.raghdkun.tech/" },
  { name: "zahratalhayat", url: "https://zahratalhayat.online/" },
  { name: "gosimple", url: "https://gosimple.io/" },
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chromePath,
  defaultViewport: { width: 1440, height: 900 },
  args: ["--no-sandbox"],
});

for (const t of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  try {
    console.log(`→ ${t.name}: ${t.url}`);
    await page.goto(t.url, { waitUntil: "networkidle2", timeout: 30_000 });
    await new Promise((r) => setTimeout(r, 1500));
    const file = path.join(outputDir, `${t.name}.jpg`);
    await page.screenshot({
      path: file,
      type: "jpeg",
      quality: 82,
      fullPage: false,
    });
    console.log(`  ✓ saved ${file}`);
  } catch (err) {
    console.error(`  ✗ ${t.name} failed:`, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("done");

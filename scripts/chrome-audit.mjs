import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const baseUrl = process.env.AUDIT_URL || "http://127.0.0.1:3000";
const outputDir = path.resolve(process.cwd(), "tmp", "chrome-audit");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "tablet", width: 768, height: 1024, isMobile: true },
  { name: "desktop", width: 1440, height: 1600, isMobile: false },
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chromePath,
  defaultViewport: null,
  args: ["--no-sandbox"],
});

const run = async () => {
  const report = [];

  for (const viewport of viewports) {
    const page = await browser.newPage();
    const consoleMessages = [];

    page.on("console", (msg) => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });

    await page.setViewport(viewport);
    await page.goto(baseUrl, { waitUntil: "networkidle2" });
    await page.waitForSelector("#hero", { timeout: 10000 });
    await page.waitForFunction(
      () => {
        const heroHeading = document.querySelector("#hero h1");
        return !!heroHeading && /RAGHDKUN/i.test(heroHeading.textContent || "");
      },
      { timeout: 15000 }
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "instant" })
    );
    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}-top.png`),
      fullPage: false,
    });

    await page.evaluate(() =>
      document
        .querySelector("#projects")
        ?.scrollIntoView({ block: "start", behavior: "instant" })
    );
    await page.waitForFunction(() => window.scrollY > 0, { timeout: 5000 });
    await new Promise((resolve) => setTimeout(resolve, 700));
    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}-projects.png`),
      fullPage: false,
    });

    await page.evaluate(() =>
      document
        .querySelector("#contact")
        ?.scrollIntoView({ block: "start", behavior: "instant" })
    );
    await new Promise((resolve) => setTimeout(resolve, 700));
    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}-contact.png`),
      fullPage: false,
    });

    const pageAudit = await page.evaluate(() => {
      const selectors = [
        "nav",
        "#hero",
        "#about",
        "#skills",
        "#projects",
        "#contact",
        "footer",
      ];

      const sections = selectors.map((selector) => {
        const element = document.querySelector(selector);
        if (!element) {
          return { selector, missing: true };
        }
        const rect = element.getBoundingClientRect();
        return {
          selector,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top + window.scrollY),
        };
      });

      const overflowNodes = [...document.querySelectorAll("body *")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.right > window.innerWidth + 1 || rect.left < -1) {
            const text = (element.textContent || "").trim().slice(0, 80);
            return {
              tag: element.tagName,
              className: element.className,
              id: element.id,
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              text,
            };
          }
          return null;
        })
        .filter(Boolean)
        .slice(0, 20);

      const mobileMenu = document.querySelector(".mobile-menu");
      const heroTitle = document.querySelector("h1");

      return {
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollWidth: document.documentElement.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight,
        },
        sections,
        overflowNodes,
        heroTitle: heroTitle
          ? heroTitle.getBoundingClientRect().height
          : null,
        mobileMenuClosed: mobileMenu
          ? getComputedStyle(mobileMenu).pointerEvents
          : null,
      };
    });

    report.push({
      name: viewport.name,
      consoleMessages,
      ...pageAudit,
    });

    await page.close();
  }

  await fs.writeFile(
    path.join(outputDir, "report.json"),
    JSON.stringify(report, null, 2)
  );
};

try {
  await run();
} finally {
  await browser.close();
}

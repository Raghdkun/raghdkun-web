import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, mobileNav: true },
  { name: "tablet", width: 834, height: 1112, mobileNav: false },
  { name: "desktop", width: 1440, height: 1000, mobileNav: false },
] as const;

for (const viewport of VIEWPORTS) {
  test(`${viewport.name} keeps the landing page responsive`, async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await expect(page.locator("#hero")).toBeVisible();

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-project-card]"));

      return {
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        overflowingCards: cards.filter((card) => {
          const rect = card.getBoundingClientRect();
          return rect.left < -1 || rect.right > doc.clientWidth + 1;
        }).length,
      };
    });

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
    expect(metrics.overflowingCards).toBe(0);
    await expect(page.locator("#projects")).toContainText(/Doghri/i);
    await expect(page.locator("footer")).toContainText(String(new Date().getFullYear()));

    if (viewport.mobileNav) {
      const menuButton = page.locator("header button[aria-expanded]");
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      const mobileNav = page.locator("header nav").last();
      await expect(mobileNav.getByRole("link", { name: /03 \/\/ CONTACT/i })).toBeVisible();
      await expect(mobileNav.getByRole("link", { name: /GET IN TOUCH/i })).toBeVisible();
    } else {
      await expect(page.getByRole("navigation", { name: /primary/i })).toBeVisible();
      await expect(page.locator("header button[aria-expanded]")).toBeHidden();
    }

    expect(consoleErrors).toEqual([]);
  });
}

test("reduced motion keeps content accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  for (const selector of ["#hero", "#about", "#projects", "#contact"]) {
    await expect(page.locator(selector)).toBeVisible();
  }

  const hiddenRevealCount = await page.evaluate(() => {
    return Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-card-reveal], [data-hero-fade], [data-decode]"))
      .filter((el) => getComputedStyle(el).opacity === "0")
      .length;
  });

  expect(hiddenRevealCount).toBe(0);
});
import { expect, test } from "@playwright/test";

test.describe("Projects", () => {
  test("index lists the projects and links to each case study", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/work/i);
    await expect(page.getByRole("link", { name: /doghri/i }).first()).toBeVisible();
  });

  test("case study shows overview, highlights and a working gallery lightbox", async ({ page }) => {
    await page.goto("/projects/doghri");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Doghri/i);
    await expect(page.getByText(/Laravel 13/).first()).toBeVisible();

    const tabs = page.getByRole("tab");
    expect(await tabs.count()).toBeGreaterThan(3);
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

    await page.getByRole("tabpanel").getByRole("button").first().click();
    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText(/image 2 of/i);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("Arabic case study is RTL and shows Arabic copy", async ({ page }) => {
    await page.goto("/projects/doghri");
    await page.getByRole("button", { name: /Switch to Arabic/i }).first().click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("دُغري");
    await expect(page.getByText("تطبيق نقل ذكي لسوريا")).toBeVisible();
  });

  test("unknown project slug returns the branded 404", async ({ page }) => {
    const res = await page.goto("/projects/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/page not found/i)).toBeVisible();
  });
});

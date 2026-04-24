import { test, expect } from "@playwright/test";

test.describe("RAGHDKUN landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero with brand heading", async ({ page }) => {
    await expect(page).toHaveTitle(/Raghdkun/i);
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero.getByRole("heading", { level: 1 })).toContainText(
      /RAGHDKUN/i,
    );
  });

  test("renders all primary sections", async ({ page }) => {
    for (const id of ["#hero", "#about", "#skills", "#projects", "#contact"]) {
      await expect(page.locator(id)).toBeVisible();
    }
  });

  test("announcement bar is present", async ({ page }) => {
    await expect(
      page.getByText(/AS SUWAYDA|PART-TIME|FREELANCE/i).first(),
    ).toBeVisible();
  });

  test("skills section exposes progress bars", async ({ page }) => {
    const skills = page.locator("#skills");
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toContainText(/REACT|TYPESCRIPT/i);
  });

  test("projects section lists real projects", async ({ page }) => {
    const projects = page.locator("#projects");
    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toContainText(/Trucking360/i);
    await expect(projects).toContainText(/GoSimple/i);
    await expect(projects).toContainText(/Wavlet/i);
  });

  test("contact section shows whatsapp + instagram + email + github", async ({ page }) => {
    const contact = page.locator("#contact");
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toContainText("+963 958 743 823");
    await expect(contact).toContainText(/@raghdkun/i);
    await expect(contact).toContainText("raghdkun@gmail.com");
    await expect(contact).toContainText(/Raghdkun/i);
  });

  test("footer renders current year", async ({ page }) => {
    const year = String(new Date().getFullYear());
    await expect(page.locator("footer")).toContainText(year);
  });

  test("nav anchors scroll to targets", async ({ page }) => {
    await page.getByRole("link", { name: /03 \/\/ PROJECTS/i }).first().click();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("skip-nav link exists for a11y", async ({ page }) => {
    await expect(page.locator("a.skip-nav")).toHaveCount(1);
  });
});

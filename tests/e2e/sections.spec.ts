import { test, expect } from "@playwright/test";

// The Skills section is temporarily disabled (see app/page.tsx); its assertion is
// commented below so it can be restored with the section.

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
    for (const id of ["#hero", "#about", "#projects", "#contact"]) {
      await expect(page.locator(id)).toBeVisible();
    }
    await expect(page.locator("#skills")).toHaveCount(0);
  });

  test("announcement bar is present", async ({ page }) => {
    await expect(
      page.getByText(/AS SUWAYDA|PART-TIME|FREELANCE/i).first(),
    ).toBeVisible();
  });

  test("about section lists the expanded capabilities", async ({ page }) => {
    const about = page.locator("#about");
    await about.scrollIntoViewIfNeeded();
    for (const cap of [/TECH MANAGEMENT/i, /IT SOLUTIONS/i, /DEVOPS/i]) {
      await expect(about).toContainText(cap);
    }
  });

  // test("skills section exposes progress bars", async ({ page }) => {
  //   const skills = page.locator("#skills");
  //   await skills.scrollIntoViewIfNeeded();
  //   await expect(skills).toContainText(/REACT|TYPESCRIPT/i);
  // });

  test("projects section links to the Doghri case study", async ({ page }) => {
    const projects = page.locator("#projects");
    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toContainText(/Doghri/i);
    await projects.getByRole("link", { name: /doghri/i }).first().click();
    await expect(page).toHaveURL(/\/projects\/doghri$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Doghri/i);
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
    await page.getByRole("link", { name: /03 \/\/ CONTACT/i }).first().click();
    await expect(page).toHaveURL(/#contact$/);
  });

  test("locale toggle switches to Arabic RTL and keeps the brand name Latin", async ({ page }) => {
    await page.getByRole("button", { name: /Switch to Arabic/i }).first().click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    // The hero title is a Latin brand isolated with dir="ltr": letters must not reverse.
    const title = page.locator("[data-hero-title]");
    await expect(title).toHaveAttribute("dir", "ltr");
    await expect(title).toHaveText(/RAGHDKUN/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/مطوّر/);
  });

  test("skip-nav link exists for a11y", async ({ page }) => {
    await expect(page.locator("a.skip-nav")).toHaveCount(1);
  });
});

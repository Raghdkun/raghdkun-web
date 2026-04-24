import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const offenders = await page.evaluate(() => {
    const results = [];
    const scrollWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;

    if (scrollWidth > viewportWidth) {
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > viewportWidth || rect.left < 0) {
          results.push({
            tag: el.tagName.toLowerCase(),
            class: el.className,
            left: rect.left,
            right: rect.right,
            text: el.innerText ? el.innerText.substring(0, 30).replace(/\n/g, ' ') : ''
          });
        }
      }
    }
    return results.slice(0, 20);
  });

  console.log(JSON.stringify(offenders, null, 2));
  await browser.close();
})();

import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });

  await page.goto('http://localhost:3000');
  
  // Wait for the page to be stable
  await page.waitForLoadState('networkidle');

  const result = await page.evaluate(() => {
    const clientWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const overflowingElements = [];

    // Simple heuristic to find overflowing elements
    const allElements = document.querySelectorAll('*');
    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      if (rect.right > clientWidth || rect.left < 0) {
        overflowingElements.push({
          tag: el.tagName.toLowerCase(),
          class: el.className,
          left: rect.left,
          right: rect.right,
          textExcerpt: el.innerText ? el.innerText.substring(0, 30).replace(/\n/g, ' ') : ''
        });
      }
      if (overflowingElements.length >= 10) break;
    }

    return {
      clientWidth,
      scrollWidth,
      overflowingElements
    };
  });

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();

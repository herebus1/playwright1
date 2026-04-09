import { test, expect } from '@playwright/test';

test('open and validate a page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const pageTitle = await page.title();
  expect(pageTitle).toBe("BookStore");
});
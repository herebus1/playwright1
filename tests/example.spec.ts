import { test, expect } from '@playwright/test';

test('New test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.locator('input[id="cb1-edit"]').fill('Iphone');
  await page.keyboard.press('Enter');
  await expect(page.locator('//ol[contains(@class, \"ui-search-layout")]')).toBeVisible();
  await page.pause();
});
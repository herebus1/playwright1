import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/login_page';

test('Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.checkLogin();
    //await page.screenshot({ path: 'H:/Documentos/Automation/playwright/playwright1/screenshots/purchase.png' });
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


    const items = await page.locator('#inventory_container .inventory_item').all();
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const itemName = await randomItem.locator('.inventory_item_name').innerText();
    const itemDesc = await randomItem.locator('.inventory_item_desc').innerText();
    const itemPrice = await randomItem.locator('.inventory_item_price').innerText();
    console.log(`Item Name: ${itemName}, Item Description: ${itemDesc}, Item Price: ${itemPrice}`);
    await randomItem.getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
    const cartItemName = await page.locator('.inventory_item_name').innerText();
    const cartItemDesc = await page.locator('.inventory_item_desc').innerText();
    const cartItemPrice = await page.locator('.inventory_item_price').innerText();
    expect(cartItemName).toEqual(itemName);
    expect(cartItemDesc).toEqual(itemDesc);
    expect(cartItemPrice).toEqual(itemPrice);
    //await page.pause();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();

    const checkoutItemName = await page.locator('.inventory_item_name').innerText();
    const checkoutItemDesc = await page.locator('.inventory_item_desc').innerText();
    const checkoutItemPrice = await page.locator('.inventory_item_price').innerText();
    expect(checkoutItemName).toEqual(itemName);
    expect(checkoutItemDesc).toEqual(itemDesc);
    expect(checkoutItemPrice).toEqual(itemPrice);
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});
import { test as setup, expect } from "@playwright/test";
import { LoginPage } from './pageobjects/login_page';

const authfile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.checkLogin();
    await page.context().storageState({ path: authfile })
});

import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly shoppingCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.shoppingCart = page.locator('.shopping_cart_link');
    }

    async fillUsername(username: string) {
        await this.username.fill(username);
    }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async checkLogin() {
        await expect(this.shoppingCart).toBeVisible();
    }
}
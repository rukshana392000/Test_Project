import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly usernameTxt: Locator;
  readonly passwordTxt: Locator;
  readonly loginBtn: Locator;
  readonly logo: Locator;
  readonly errorMessage: Locator;
  readonly productsTitle: Locator;
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    this.usernameTxt = page.getByPlaceholder('Username');
    this.passwordTxt = page.getByPlaceholder('Password');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.logo = page.getByText('Swag Labs');
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsTitle = page.getByText('Products');
  }

  async goto() {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
      throw new Error('BASE_URL is missing. Check your .env file.');
    }

    await this.page.goto(baseURL);
  }

  async login(username: string, password: string) {
    await this.usernameTxt.fill(username);
    await this.passwordTxt.fill(password);
    await this.loginBtn.click();
  }
}
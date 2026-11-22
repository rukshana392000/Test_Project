import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login_functionality';

test.describe('Login functionality', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Login page display', async ({ page }) => {
        
        await expect(loginPage.logo).toBeVisible();
        await expect(loginPage.usernameTxt).toBeVisible();
        await expect(loginPage.passwordTxt).toBeVisible();
        await expect(loginPage.loginBtn).toBeVisible();
    });

    test('Test Valid Login Functionality', async ({ page }) => {
        
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.getByText('Products')).toBeVisible();
    });

    test("Test Invalid username", async ({ page }) => {
        
        await loginPage.login('invalid_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test("Test Invalid password", async ({ page }) => {
        
        await loginPage.login('standard_user', 'invalid_password');
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test("Test invalid username and password", async ({ page }) => {
        
        await loginPage.login('invalid_user', 'invalid_password');
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test("Test empty username and password", async ({ page }) => {
        
        await loginPage.login('', '');
        await expect(loginPage.errorMessage).toBeVisible();
    });
});


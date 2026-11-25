import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login_functionality';

test.describe('Login functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Test_001', async () => {
        await expect(loginPage.logo).toBeVisible();
        await expect(loginPage.usernameTxt).toBeVisible();
        await expect(loginPage.usernameTxt).toBeEnabled();
        await expect(loginPage.passwordTxt).toBeVisible();
        await expect(loginPage.passwordTxt).toBeEnabled();
        await expect(loginPage.loginBtn).toBeVisible();
        await expect(loginPage.loginBtn).toBeEnabled();
    });

    test('Test_002', async () => {
        await expect(loginPage.passwordTxt).toHaveAttribute('type', 'password');
    });

    test('Test_003', async () => {
        await loginPage.login('', '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    });

    test('Test_004', async () => {
        await loginPage.login('', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    });

    test('Test_005', async () => {
        await loginPage.login('standard_user', '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    });

    test('Test_006', async () => {
        await loginPage.login('invalid_user', 'invalid_password');
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('Test_007', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Test_008', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(loginPage.productsTitle).toBeVisible();
    });

    test('Test_009', async ({ page }) => {
        await loginPage.usernameTxt.fill('standard_user');
        await loginPage.passwordTxt.fill('secret_sauce');
        await loginPage.passwordTxt.press('Enter');

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(loginPage.productsTitle).toBeVisible();
    });

    test('Test_010', async ({ page }) => {
        const inventoryUrl = new URL('/inventory.html', page.url()).toString();
        await page.goto(inventoryUrl);

        await expect(loginPage.usernameTxt).toBeVisible();
        await expect(page).not.toHaveURL(/inventory\.html/);
    });

    test('Test_011', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(loginPage.productsTitle).toBeVisible();

        await loginPage.menuButton.click();
        await loginPage.logoutLink.click();

        await expect(loginPage.usernameTxt).toBeVisible();
        await expect(page).not.toHaveURL(/inventory\.html/);
    });

    test('Test Invalid username', async () => {
        await loginPage.login('invalid_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('Test Invalid password', async () => {
        await loginPage.login('standard_user', 'invalid_password');
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('Test_012', async () => {
        await loginPage.login('', '');
        await expect(loginPage.errorMessage).toBeVisible();

        await loginPage.errorCloseButton.click();
        await expect(loginPage.errorMessage).toBeHidden();
    });
});


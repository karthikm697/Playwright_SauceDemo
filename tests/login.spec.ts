import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import loginData from '../data/login.data.json';

// Env vars win when set (locally via .env, in CI via a pipeline variable),
// falling back to the committed demo credentials otherwise. This is the same
// pattern you'd use for real secrets — just backed by Azure Key Vault /
// pipeline variables instead of a committed JSON file.
const username = process.env.TEST_USERNAME || loginData.username;
const password = process.env.TEST_PASSWORD || loginData.password;

test.describe('Login Page', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goTo('/');
    });

    // @smoke: fast, high-value checks that gate every PR. Keep this tag on
    // only the handful of tests that must never break, not the whole suite.
    test('should display the login page @smoke', async () => {
        await homePage.expectLoginPage();
    });

    test('should show an error when username is missing', async () => {
        await homePage.loginWithoutUsername(password);
        await homePage.clickLoginButton();

        await expect(homePage.locatorAlertError).toBeVisible();
    });

    test('should show an error when password is missing', async () => {
        await homePage.loginWithoutPassword(username);
        await homePage.clickLoginButton();

        await expect(homePage.locatorAlertError).toBeVisible();
    });

    test('should show an error with invalid credentials', async () => {
        await homePage.fillLoginForm('invalid_user', 'wrong_password');
        await homePage.clickLoginButton();

        await expect(homePage.locatorAlertError).toBeVisible();
    });

    test('should not show an error before submitting the form', async () => {
        await homePage.fillLoginForm(username, password);

        await expect(homePage.locatorAlertError).not.toBeVisible();
    });

    test('should log in successfully with valid credentials @smoke', async ({ page }) => {
        await homePage.fillLoginForm(username, password);
        await homePage.clickLoginButton();

        await expect(page).toHaveURL('/inventory.html');
    });

    test('visual regression - login page', async () => {
        await homePage.expectScreenshot('login-page');
    });
});
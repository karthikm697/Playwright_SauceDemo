import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import loginData from '../data/login.data.json'; // FIX: this file existed but was never imported/used

test.describe('Login Page', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goTo('/');
    });

    test('should display the login page', async () => {
        await homePage.expectLoginPage();
    });

    test('should show an error when username is missing', async () => {
        await homePage.loginWithoutUsername(loginData.password);
        await homePage.clickLoginButton();

        await expect(homePage.locatorAlertError).toBeVisible();
    });

    test('should show an error when password is missing', async () => {
        await homePage.loginWithoutPassword(loginData.username);
        await homePage.clickLoginButton();

        await expect(homePage.locatorAlertError).toBeVisible();
    });

    test('should show an error with invalid credentials', async () => {
        await homePage.fillLoginForm('invalid_user', 'wrong_password');
        await homePage.clickLoginButton();

        await expect(homePage.locatorAlertError).toBeVisible();
    });

    test('should not show an error before submitting the form', async () => {
        await homePage.fillLoginForm(loginData.username, loginData.password);

        await expect(homePage.locatorAlertError).not.toBeVisible();
    });

    test('should log in successfully with valid credentials', async ({ page }) => {
        await homePage.fillLoginForm(loginData.username, loginData.password);
        await homePage.clickLoginButton();

        // FIX: was `not.toHaveURL('/')`, which would also pass on an unrelated
        // redirect/error. Assert the actual post-login page instead.
        await expect(page).toHaveURL('/inventory.html');
    });

    test('visual regression - login page', async () => {
        // FIX: dropped the arbitrary waitFor(500) — Playwright's goto() already
        // waits for the load event, and toHaveScreenshot() has its own retry/wait
        // logic, so a fixed timeout here only adds flakiness risk, not stability.
        await homePage.expectScreenshot('login-page');
    });
});
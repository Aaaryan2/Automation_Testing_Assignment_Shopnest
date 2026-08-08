const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { SecureAreaPage } = require('../../pages/SecureAreaPage');
const { VALID_USER, INVALID_USER } = require('../../utils/testData');

test.describe('Form Authentication - Login', () => {
  test('valid credentials redirect to the secure area', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const secureAreaPage = new SecureAreaPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);

    await expect(page).toHaveURL(/\/secure$/);
    expect(await loginPage.getFlashText()).toContain('You logged into a secure area');
    expect(await secureAreaPage.isLoaded()).toBeTruthy();
  });

  test('invalid credentials show an error and stay on the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(INVALID_USER.username, INVALID_USER.password);

    await expect(page).toHaveURL(/\/login$/);
    expect(await loginPage.getFlashText()).toContain('Your username is invalid');
  });

  test('empty username and password trigger validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(page).toHaveURL(/\/login$/);
    expect(await loginPage.getFlashText()).toContain('Your username is invalid');
  });
});

test.describe('Form Authentication - Logout', () => {
  test('logout returns the user to the login page with a confirmation message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const secureAreaPage = new SecureAreaPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(page).toHaveURL(/\/secure$/);

    await secureAreaPage.logout();

    await expect(page).toHaveURL(/\/login$/);
    expect(await loginPage.getFlashText()).toContain('You logged out of the secure area');
  });
});

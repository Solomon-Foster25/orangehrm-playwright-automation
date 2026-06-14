import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Authentication test

test.describe('Authentication', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Test log in functionality with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Test incorrect username with error', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('Admit', 'admin123');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Invalid credentials');
    });

    test('Test incorrect password with error', async ({page}) => {
        const loginPage = new LoginPage(page);        
        await loginPage.goto();
        await loginPage.login('Admin', 'admin122');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Invalid credentials');
    });

    test('Test entering username only', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('Admin', '');
        await expect(loginPage.requiredMessage).toBeVisible();
        await expect(loginPage.requiredMessage).toContainText('Required');
    });

    test('Test entering password only', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('', 'admin123');
        await expect(loginPage.requiredMessage).toBeVisible();
        await expect(loginPage.requiredMessage).toContainText('Required');
    });

    test('Test empty fields', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('','');
        await expect(loginPage.requiredMessage).toHaveCount(2);
        await expect(loginPage.requiredMessage).toContainText(['Required', 'Required']);
    });

    test('Test trailing whitespace on username', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('Admin ', 'admin123');
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Test SQL injection', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("' OR '1'= '1", 'admin123');
        await expect(page).not.toHaveURL(/dashboard/);
        await expect(loginPage.errorMessage).toBeVisible();
    });
});
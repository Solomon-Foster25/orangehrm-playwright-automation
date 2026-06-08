import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('valid login lands on dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL(/dashboard/);
});
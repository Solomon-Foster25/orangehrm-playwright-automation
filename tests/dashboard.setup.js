import {test, expect} from '@playwright/test';
import {DashboardPage} from '../pages/DashboardPage';

test.describe('Dashboard', () => {
    test('Dashboard loads after login', async ({page}) => {
        await page.goto('/web/index.php/dashboard/index');
        const dashboard = new DashboardPage(page);
        await expect(dashboard.dashboardTitle).toBeVisible();
    });

});

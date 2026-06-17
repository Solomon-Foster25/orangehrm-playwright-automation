import {test, expect} from '@playwright/test';
import {DashboardPage} from '../pages/DashboardPage';

test.describe('Dashboard', () => {
    test('Dashboard loads after login', async ({page}) => {
        await page.goto('/web/index.php/dashboard/index');
        const dashboard = new DashboardPage(page);
        await expect(dashboard.dashboardTitle).toBeVisible();
    });
    const widgets = [
        { name: 'Time at Work', locator: (d) => d.timeAtWork },
        { name: 'My Actions', locator: (d) => d.myActions },
        { name: 'Quick Launch', locator: (d) => d.quickLaunch },
        { name: 'Buzz Latest Posts', locator: (d) => d.latestPosts },
    ]

    for (const widget of widgets) {
        test(`Widget "${widget.name}" is visible`, async ({ page }) => {
            await page.goto('/web/index.php/dashboard/index');
            const dashboard = new DashboardPage(page);
            await expect(widget.locator(dashboard)).toBeVisible();     
        });
    };
});

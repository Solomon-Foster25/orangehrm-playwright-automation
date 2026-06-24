import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    readonly dashboardTitle: Locator;
    readonly timeAtWork: Locator;
    readonly myActions: Locator;
    readonly latestPosts: Locator;
    readonly quickLaunch: Locator;
    readonly employeesOnLeave: Locator;
    readonly employeeDistributionSubUnit: Locator;
    readonly employeeDistributionLocation: Locator;

    constructor(page: Page) {
        super(page);

        this.dashboardTitle = page.getByRole('heading', { name: 'Dashboard' });
        this.timeAtWork = page.getByText('Time at Work');
        this.myActions = page.getByText('My Actions');
        this.latestPosts = page.getByText('Buzz Latest Posts');
        this.quickLaunch = page.getByText('Quick Launch');
        this.employeesOnLeave = page.getByText('Employees on Leave Today');
        this.employeeDistributionSubUnit = page.getByText('Employee Distribution by Sub Unit');
        this.employeeDistributionLocation = page.getByText('Employee Distribution by Location');
    }

    async goto(): Promise<void> {
        await this.navigate('/web/index.php/dashboard/index');
        await this.waitForSpinner();
    }
}

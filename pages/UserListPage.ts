import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class UserListPage extends BasePage {
    readonly usernameInput: Locator;
    readonly userRole: Locator;
    readonly employeeName: Locator;
    readonly status: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameInput = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
        this.userRole = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' });
        this.status = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    async goto(): Promise<void> {
        await this.navigate('/web/index.php/admin/viewSystemUsers');
        await this.waitForSpinner();
    }

    async selectRole(role: string): Promise<void> {
        await this.userRole.click();
        await this.page.getByRole('option', { name: role }).click();
    }

    async selectStatus(status: string): Promise<void> {
        await this.status.click();
        await this.page.getByRole('option', { name: status }).click();
    }

    async searchUser(username: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.searchButton.click();
        await this.waitForSpinner();
    }
}

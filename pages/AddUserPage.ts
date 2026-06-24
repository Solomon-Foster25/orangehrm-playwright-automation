import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddUserPage extends BasePage {
    readonly userRole: Locator;
    readonly employeeName: Locator;
    readonly status: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPassword: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);

        this.userRole = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' });
        this.status = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
        this.usernameInput = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
        this.passwordInput = page.locator('input[type="password"]').first();
        this.confirmPassword = page.locator('input[type="password"]').nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async goto(): Promise<void> {
        await this.navigate('/web/index.php/admin/saveSystemUser');
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

    async selectEmployee(employee: string): Promise<void> {
        await this.employeeName.fill(employee);
        // Wait for the autocomplete to finish loading before selecting, so the
        // option is present on slower (CI / Firefox) runs instead of being missed.
        await this.page.getByText('Searching...').waitFor({ state: 'hidden' }).catch(() => {});
        await this.page.getByRole('option', { name: employee }).first().click();
    }

    async addUser(
        role: string,
        employee: string,
        status: string,
        username: string,
        password: string,
        confPassword: string,
    ): Promise<void> {
        await this.selectRole(role);
        await this.selectEmployee(employee);
        await this.selectStatus(status);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPassword.fill(confPassword);
        await this.saveButton.click();
        await this.waitForSpinner();
    }
}

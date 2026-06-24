import { BasePage } from "./BasePage";

export class UserListPage extends BasePage { 

    constructor(page) {
        super(page);

        this.usernameInput = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
        this.userRole = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' });
        this.status = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }   

    async goto() {
        await this.navigate('/web/index.php/admin/viewSystemUsers');
        await this.waitForSpinner();
    }

     async selectRole(role) {
        await this.userRole.click();
        await this.page.getByRole('option', { name: role }).click();
    }

    async selectStatus(status) {
        await this.status.click();
        await this.page.getByRole('option', { name: status }).click();
    }

    async searchUser(username) {
        await this.usernameInput.fill(username);
        await this.searchButton.click();
        await this.waitForSpinner();
    }
}
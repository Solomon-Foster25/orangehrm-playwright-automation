import { BasePage } from "./BasePage";

export class AddUserPage extends BasePage {
    
    constructor(page) {
        super(page);

        this.userRole = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');        
        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' });
        this.status = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
        this.usernameInput = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
        this.passwordInput = page.locator('input[type="password"]').first();
        this.confirmPassword = page.locator('input[type="password"]').nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async goto() {
        await this.navigate('/web/index.php/admin/saveSystemUser');
    }

    async selectRole(role) {
        await this.userRole.click();
        await this.page.getByRole('option', { name: role }).click();
    }

    async selectStatus(status) {
        await this.status.click();
        await this.page.getByRole('option', { name: status }).click();
    }

    async addUser(role, employee, status, username, password, confPassword) {
        await this.selectRole(role);
        await this.employeeName.fill(employee);
        await this.page.getByRole('option', { name: employee}).first().click({ timeout: 3000 }).catch(() => {});
        await this.selectStatus(status);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPassword.fill(confPassword);
        await this.saveButton.click();
        await this.waitForSpinner();
    }


}
    
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddEmployeePage extends BasePage {
    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;
    readonly employeeId: Locator;
    readonly saveButton: Locator;
    readonly requiredMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.middleName = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.employeeId = page.getByRole('textbox').nth(4);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.requiredMessage = page.getByText('Required', { exact: true });
    }

    async goto(): Promise<void> {
        await this.navigate('/web/index.php/pim/addEmployee');
        await this.waitForSpinner();
    }

    async addEmployee(first: string, last: string, middle = '', id: string | null = null): Promise<void> {
        await this.firstName.fill(first);
        if (middle) await this.middleName.fill(middle);
        await this.lastName.fill(last);
        if (id) {
            await this.employeeId.fill(id);
        }
        await this.saveButton.click();
    }
}

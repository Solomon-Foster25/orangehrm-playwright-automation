import { BasePage } from "./BasePage";

export class AddEmployeePage extends BasePage {

    constructor(page) {
        super(page);

        this.firstName = page.getByRole('textbox', {name: 'First Name'});
        this.middleName = page.getByRole('textbox', {name: 'Middle Name'});
        this.lastName = page.getByRole('textbox', {name: 'Last Name'});
        this.employeeId = page.getByRole('textbox').nth(4);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.requiredMessage = page.getByText('Required', { exact: true });
    }

    async goto() {
        await this.navigate('/web/index.php/pim/addEmployee');
        await this.waitForSpinner();
    };

    async addEmployee(first, last, middle = '', id = null) {
        await this.firstName.fill(first);
        if (middle) await this.middleName.fill(middle);
        await this.lastName.fill(last);
        if (id) {
            await this.employeeId.fill(id);
        }
        await this.saveButton.click();
    }

} 

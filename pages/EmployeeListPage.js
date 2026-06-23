import { BasePage } from "./BasePage";

export class EmployeeListPage extends BasePage {

    constructor(page) {
        super(page);
        
        this.searchByName = page.getByRole('textbox', { name: 'Type for hints...' }).first();
        this.employeeID = page.getByRole('textbox').nth(2);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.resultsTable = page.getByRole('table');
        this.resultsRow = page.getByRole('row');
        this.noRecordsFound = page.getByText('No Records Found');
        this.addButton = page.getByRole('button', { name: 'Add'});
    }

    async goto() {
        await this.navigate('/web/index.php/pim/viewEmployeeList');
        await this.waitForSpinner();
    };

    async searchName(name) {
        await this.searchByName.fill(name);
        await this.page.getByText('Searching...').waitFor({ state: 'hidden' }).catch(() => {});
        const option = this.page.getByRole('option', { name });
        await option.click({ timeout: 2000 }).catch(() => {});
        await this.page.keyboard.press('Escape').catch(() => {});
        await this.searchButton.click();
        await this.waitForSpinner();
    };

    async searchById(id) {
        await this.employeeID.fill(id);
        await this.searchButton.click();
    };

    resultRowContaining(text) {
        return this.resultsRow.filter({ hasText: text });
    };       
}
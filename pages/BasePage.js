export class BasePage {
     // Initialize locators in constructor

    constructor(page) {
        this.page = page;
    };

    async navigate(path) {
        await this.page.goto(path);
    };

    async waitForSpinner() {
        const spinner = this.page.locator('.oxd-loading-spinner');
        // wait for it to show (briefly), then wait for it to go away
        await spinner.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
        await spinner.waitFor({ state: 'hidden' }).catch(() => {});
    }
}
import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async waitForSpinner(): Promise<void> {
        const spinner: Locator = this.page.locator('.oxd-loading-spinner');
        // Wait for it to appear (briefly), then wait for it to disappear.
        await spinner.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
        await spinner.waitFor({ state: 'hidden' }).catch(() => {});
    }
}

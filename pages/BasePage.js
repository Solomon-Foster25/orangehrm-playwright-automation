export class BasePage {
     // Initialize locators in constructor

    constructor(page) {
        this.page = page;
    };

    async navigate(path) {
        await this.page.goto(path);
    };
}
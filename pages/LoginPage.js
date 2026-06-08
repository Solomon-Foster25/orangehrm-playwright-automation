import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    // Initialize locators in constructor

    constructor(page) {
        super(page); // Initializes page
        this.usernameInput = page.getByPlaceholder('Username'); // Locates username
        this.passwordInput = page.getByPlaceholder('Password'); // Locates password
        this.loginButton = page.getByRole('button', {name: 'Login'}); // Locates login button
        this.forgotButton = page.getByText('Forgot your password?'); // Locates forgot your password
        
    }

    // Navigate to login page

    async goto() {
        await this.navigate('/web/index.php/auth/login'); 
    }

    // Fill in credentials and submit the form

    async login(username, password) {
        await this.usernameInput.fill(username); // Fills username
        await this.passwordInput.fill(password); // Fills password
        await this.loginButton.click(); // CLicks login button
    };

    // Goes to Forgot password

    async forgotPassword() {
        await this.forgotButton.click(); // Forgot password button
    };

};
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Invalid credentials');
        this.requiredMessage = page.getByText('Required');
    }
 
    async goto() {
        await this.navigate('/web/index.php/auth/login');
    }
 
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
};
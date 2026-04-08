import { Locator, test, Page } from "@playwright/test";

class SignInForm {
    private readonly page: Page;
    public readonly emailField: Locator;
    public readonly passwordField: Locator;
    public readonly loginButton: Locator; 
    
    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator("#signinEmail");
        this.passwordField = this.page.locator("#signinPassword");
        this.loginButton = this.page.getByRole('button', { name: 'Login' })
}

    async signIn(email:string, password:string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}

export default SignInForm;
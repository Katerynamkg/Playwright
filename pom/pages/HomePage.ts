import { Locator, Page } from "@playwright/test";

class HomePage {
  private readonly page: Page;
  public readonly signUpButton: Locator;
  public readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.locator(".btn-primary", { hasText: "Sign up" });
    this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
  }
  async open() {
    await this.page.goto("/");
  }

  async openSignUpForm() {
    await this.signUpButton.click();
  }
  async openSignInForm() {
    await this.signInButton.click();
  } 
}

export default HomePage
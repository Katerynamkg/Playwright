import { Locator, Page } from "@playwright/test";

class SignUpForm {
  public readonly page: Page;
  public readonly nameField: Locator;
  public readonly lastNameField: Locator;
  public readonly emailField: Locator;
  public readonly passwordField: Locator;
  public readonly reEnterPassword: Locator;
  public readonly nameError: Locator;
  public readonly lastNameError: Locator;
  public readonly emailError: Locator;
  public readonly passwordFieldError: Locator;
  public readonly rePasswordFieldError: Locator;
  public readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameField = this.page.locator("#signupName");
    this.lastNameField = this.page.locator("#signupLastName");
    this.emailField = this.page.locator("#signupEmail");
    this.passwordField = this.page.locator("#signupPassword");
    this.reEnterPassword = this.page.locator("#signupRepeatPassword");
    this.nameError = this.page.locator(
      ".form-group:has(#signupName) .invalid-feedback",
    );
    this.lastNameError = this.page.locator(
      ".form-group:has(#signupLastName) .invalid-feedback",
    );
    this.emailError = this.page.locator(
      ".form-group:has(#signupEmail) .invalid-feedback",
    );
    this.passwordFieldError = this.page.locator(
      ".form-group:has(#signupPassword) .invalid-feedback",
    );
    this.rePasswordFieldError = this.page.locator(
      ".form-group:has(#signupRepeatPassword) .invalid-feedback",
    );
    this.registerButton = this.page.locator("button.btn-primary", {
      hasText: "Register",
    });
  }
}

export default SignUpForm;

import { Locator, Page } from "@playwright/test";

class HomePage {
  private readonly page: Page;
  public readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.locator(".btn-primary", { hasText: "Sign up" });
  }
}

export default HomePage
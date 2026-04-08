import { test } from "@playwright/test";


test.describe("Sign up test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".header_signin").click();
  });
  test("Successful sign up", async ({ page }) => {
    await page.goto("/");
    await page.locator("h1").highlight();
  });

  //   test("Filter", asynk({ page }) => {
  //     await page.locator('button').filter({hasText: 'contacts'}).highlight()
  //   });
});

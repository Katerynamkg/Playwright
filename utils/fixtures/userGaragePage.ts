import { test as base, expect,  } from "@playwright/test";
import GaragePage from "../../pom/pages/GaragePage";

type Pages = {
  userGaragePage: GaragePage;
};
export const test = base.extend<Pages>({
    page: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './test-data/states/auth-state.json',
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
  
  
  
  userGaragePage: async ({ page }, use) => {
    const userGaragePage = new GaragePage(page);
    await page.goto('/panel/garage');
    await use(userGaragePage);
  },
});

export { expect } from '@playwright/test';
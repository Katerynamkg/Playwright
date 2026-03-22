import { test as base, expect,  } from "@playwright/test";
import GaragePage from "../../pom/pages/GaragePage";

type Pages = {
  userGaragePage: GaragePage;
};
export const test = base.extend<Pages>({
  userGaragePage: async ({ page }, use) => {
    const userGaragePage = new GaragePage(page);
    await page.goto('/panel/garage');
    await use(userGaragePage);
  },
});

export { expect } from '@playwright/test';
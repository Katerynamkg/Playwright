import { test, expect } from '../utils/fixtures/userGaragePage';

test('Mock profile data', async ({ page }) => {
  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          name: 'Kate',
          lastName: 'QA'
        }
      })
    });
  });

  await page.goto('/panel/profile');

  await expect(page.locator('.profile_name')).toHaveText('Kate QA');
});

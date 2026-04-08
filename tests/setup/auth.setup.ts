import { test, expect } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';

test.describe('Auth setup', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);

    await homePage.open();
    await homePage.openSignInForm();
    })

    test('Login and save storage state', async ({ page }) => {
        await signInForm.signIn(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add Car' })).toBeVisible();
        await page.context().storageState({ path: '././test-data/states/auth-state.json' });
    


});
})



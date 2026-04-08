import { Locator, expect } from "@playwright/test";
import GaragePage from "../pom/pages/GaragePage";
import AddCarForm from "../pom/forms/AddCarForm";
import { test }  from "../utils/fixtures/userGaragePage";
import EditCarForm from "../pom/forms/EditCarForm";



test.describe('Garage page', ()=>{
    test.use({ storageState: './test-data/states/auth-state.json' });

    test('Add car', async ({userGaragePage})=>{
        const form = await userGaragePage.openAddCarForm();
        await form.addCar('Fiat', 'Panda', '15000');
        await form.clickAddButton();
        await expect(userGaragePage.carName.first()).toHaveText('Fiat Panda');
        
    })
    test('Add car with empty mileage', async ({userGaragePage})=>{
        const form = await userGaragePage.openAddCarForm();
        await form.addCar('Fiat', 'Panda', '');
        await form.mileageField.focus();
        await form.mileageField.blur();
        await expect(form.mileageError).toHaveText('Mileage cost required');
        await expect(form.addButton).toBeDisabled();  
    })

    test('Remove car', async ({userGaragePage})=>{
        const form = await userGaragePage.openEditCarForm();
        await form.clickRemoveButton();
        await userGaragePage.removeCarButtonApproval.click();
        await userGaragePage.isCarRemoved();
        expect(userGaragePage.page.getByText('Car removed')).toBeVisible();
   })
    

})
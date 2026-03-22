import { Locator, Page } from "@playwright/test";

class AddCarForm {
  public readonly page: Page;
  public readonly brandDropdown: Locator;
  public readonly modelDropdown: Locator;
  public readonly mileageField: Locator;
  public readonly addButton: Locator;
  public readonly mileageError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandDropdown = this.page.locator("#addCarBrand");
    this.modelDropdown = this.page.locator("#addCarModel");
    this.mileageField = this.page.locator("#addCarMileage");
    this.addButton = this.page.getByRole("button", { name: "Add" });
    this.mileageError = this.page.locator(
      'label[for="addCarMileage"] ~ .invalid-feedback',
    );
  }

  async addCar(brand: string, model: string, mileage: string) {
    await this.brandDropdown.selectOption(brand);
    await this.modelDropdown.selectOption(model);
    await this.mileageField.fill(mileage);
  }
  async clickAddButton() {
    await this.addButton.click();
  }
}

export default AddCarForm;

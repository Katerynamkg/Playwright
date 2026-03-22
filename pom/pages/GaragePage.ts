import { Locator, Page } from "@playwright/test";
import AddCarForm from "../forms/AddCarForm";
import EditCarForm from '../forms/EditCarForm';

class GaragePage {
  public readonly page: Page;
  public readonly addCarButton: Locator;
  public readonly carName: Locator;
  public readonly editCarButton: Locator;
  public readonly carRemoved: Locator;
  public readonly removeCarButtonApproval: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.addCarButton = this.page.getByRole("button", { name: "Add Car" });
    this.carName = this.page.locator("p.car_name");
    this.editCarButton = this.page.locator("span.icon-edit");
    this.carRemoved = this.page.getByText("Car removed");
    this.removeCarButtonApproval = this.page.getByRole("button", { name: "Remove" });

  }

  async open() {
    await this.page.goto("panel/garage");
  }

  async openAddCarForm() {
    await this.addCarButton.click();
    return new AddCarForm(this.page);
  }

  async openEditCarForm() {
    await this.editCarButton.first().click();
    return new EditCarForm(this.page);
  }

  async isCarRemoved() {
    return await this.removeCarButtonApproval.isVisible();
  }


}

export default GaragePage;

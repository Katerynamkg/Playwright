import { Locator, Page } from "@playwright/test";

class EditCarForm {
  public readonly page: Page;
  public readonly removeCarButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.removeCarButton = this.page.locator("button.btn-outline-danger");
   
  }

  async clickRemoveButton() {
    await this.removeCarButton.click();
  }

  
}

export default EditCarForm;

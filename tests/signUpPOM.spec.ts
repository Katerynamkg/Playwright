import { Locator, test, expect } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import SignUpForm from "../pom/forms/SignUpForm";
require('dotenv').config();

test.describe("Sign Up form", () => {
  let homePage: HomePage;
  let signUpForm: SignUpForm;
  let mail: string;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    await page.goto("/");
    await homePage.signUpButton.click();
    mail = `AQAtest-mail1+${Date.now()}@yopmail.com`;
  });

test.describe("Field Name validation", () => {
  test("Empty name field", async () => {
    await signUpForm.nameField.fill("");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameError).toHaveText("Name required"); //test failed because of mistakes in error message
  });
  test("Name with spaces", async () => {
    await signUpForm.nameField.fill("   ");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameError).toHaveText("Name is invalid"); //test failed because of mistakes string is not trimmed
  });
  test("Wrong data - digit", async () => {
    await signUpForm.nameField.fill("123456");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameError).not.toBeVisible(); //test failed because of name field does noe accept the numbers, but should
  });

  test("Wrong data - cyrillic", async () => {
    await signUpForm.nameField.fill("Кпроар");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameError).toHaveText("Name is invalid");
  });
  test("Too long name", async () => {
    await signUpForm.nameField.fill("Qwertyuiopoiuytrewqwe");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameError).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });
  test("Too short name", async () => {
    await signUpForm.nameField.fill("Q");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameError).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });
  test("Border color", async () => {
    await signUpForm.nameField.fill("Q");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Valid name", async () => {
    await signUpForm.nameField.fill("Testname");
    await signUpForm.nameField.blur();
    await expect(signUpForm.nameError).not.toBeVisible();
  });
});

test.describe("Field Last name validation", () => {
  test("Empty last name field", async () => {
    await signUpForm.lastNameField.fill("");
    await signUpForm.lastNameField.blur();
    await expect(signUpForm.lastNameError).toHaveText("Last name required"); //test failed because of mistakes in error message
  });

  test("Wrong data - digit", async () => {
    await signUpForm.lastNameField.fill("123456");
    await signUpForm.lastNameField.blur();
    await expect(signUpForm.lastNameError).toHaveText("Last name is invalid");
  });

  test("111Wrong data - cyrillic", async () => {
    await signUpForm.lastNameField.fill("Кпроар");
    await signUpForm.lastNameField.blur();
    await expect(signUpForm.lastNameError).toHaveText("Last name is invalid");
  });
  test("Too long last name", async () => {
    await signUpForm.lastNameField.fill("Qwertyuiopoiuytrewqwe");
    await signUpForm.lastNameField.blur();
    await expect(signUpForm.lastNameError).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });
  test("Too short last name", async () => {
    await signUpForm.lastNameField.fill("Q");
    await signUpForm.lastNameField.blur();
    await expect(signUpForm.lastNameError).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });
  test("Border color", async () => {
    await signUpForm.lastNameField.fill("Q");
    await signUpForm.lastNameField.blur();
    await expect(signUpForm.lastNameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Valid last name", async () => {
    await signUpForm.lastNameField.fill("TestLastname");
    await signUpForm.lastNameField.blur();
    await expect(signUpForm.lastNameError).not.toBeVisible();
  });
});
test.describe("Email validation", () => {
  test("Email without @", async () => {
    await signUpForm.emailField.focus();
    await signUpForm.emailField.blur();
    await expect(signUpForm.emailError).toHaveText("Email required");
  });

  test("Email without domain", async () => {
    await signUpForm.emailField.fill("test-mail1@yopmail");
    await signUpForm.emailField.blur();
    await expect(signUpForm.emailError).toBeVisible();
    await expect(signUpForm.emailError).toHaveText("Email is incorrect");
  });
  test("Border color", async () => {
    await signUpForm.emailField.focus();
    await signUpForm.emailField.blur();
    await expect(signUpForm.emailField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Valid Email", async () => {
    await signUpForm.emailField.fill(mail);
    await signUpForm.emailField.blur();
    await expect(signUpForm.emailError).not.toBeVisible();
  });
});

test.describe("Password validation", () => {
  test("Too short password", async () => {
    await signUpForm.passwordField.fill("a");
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordFieldError).toBeVisible();
    await expect(signUpForm.passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });

  test("Too long password", async () => {
    await signUpForm.passwordField.fill("Qwerty1234567891");
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordFieldError).toBeVisible();
    await expect(signUpForm.passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without integer", async () => {
    await signUpForm.passwordField.fill("Qwertyui");
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordFieldError).toBeVisible();
    await expect(signUpForm.passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without capital letter", async () => {
    await signUpForm.passwordField.fill("qwerty12345678");
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordFieldError).toBeVisible();
    await expect(signUpForm.passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without small letter", async () => {
    await signUpForm.passwordField.fill("QWERTYUI1");
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordFieldError).toBeVisible();
    await expect(signUpForm.passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without letter", async () => {
    await signUpForm.passwordField.fill("12345678");
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordFieldError).toBeVisible();
    await expect(signUpForm.passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Border color", async () => {
    await signUpForm.passwordField.focus();
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Valid password", async () => {
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.passwordField.blur();
    await expect(signUpForm.passwordFieldError).not.toBeVisible();
  });
});

test.describe("Re-enter password", () => {
  test("Empty re-password field", async () => {
    await signUpForm.reEnterPassword.focus();
    await signUpForm.reEnterPassword.blur();
    await expect(signUpForm.rePasswordFieldError).toHaveText("Re-enter password required");
  });
  test("Re-password does not match", async () => {
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty12");
    await signUpForm.reEnterPassword.blur();
    await expect(signUpForm.rePasswordFieldError).toHaveText("Passwords do not match");
  });
  test("Border color", async () => {
    await signUpForm.reEnterPassword.focus();
    await signUpForm.reEnterPassword.blur();
    await expect(signUpForm.reEnterPassword).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Passwords match", async () => {
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty123");
    await signUpForm.reEnterPassword.blur();
    await expect(signUpForm.reEnterPassword).not.toBeVisible();
  });
});

test.describe("Registration button", () => {
  test("Register button should be disabled when all fields are empty", async () => {
    await expect(signUpForm.registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Name is invalid", async () => {
    await signUpForm.nameField.fill("й");
    await signUpForm.lastNameField.fill("Lastname");
    await signUpForm.emailField.fill(mail);
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty123");
    await expect(signUpForm.registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Last name is invalid", async () => {
    await signUpForm.nameField.fill("TestName");
    await signUpForm.lastNameField.fill("q");
    await signUpForm.emailField.fill(mail);
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty123");
    await expect(signUpForm.registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Email is invalid", async () => {
    await signUpForm.nameField.fill("TestName");
    await signUpForm.lastNameField.fill("Lastname");
    await signUpForm.emailField.fill("AQAtest-mail1yopmail.com");
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty123");
    await expect(signUpForm.registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Password is invalid", async () => {
    await signUpForm.nameField.fill("TestName");
    await signUpForm.lastNameField.fill("Lastname");
    await signUpForm.emailField.fill(mail);
    await signUpForm.passwordField.fill("Qwerty");
    await signUpForm.reEnterPassword.fill("Qwerty");
    await expect(signUpForm.registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Re-enter password is invalid", async () => {
    await signUpForm.nameField.fill("TestName");
    await signUpForm.lastNameField.fill("Lastname");
    await signUpForm.emailField.fill(mail);
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty12");
    await expect(signUpForm.registerButton).toBeDisabled();
  });
  test("Register button should be enable when valid data entered", async () => {
    await signUpForm.nameField.fill("TestName");
    await signUpForm.lastNameField.fill("Lastname");
    await signUpForm.emailField.fill(mail);
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty123");
    await expect(signUpForm.registerButton).toBeEnabled();
  });
});

test.describe("Success registration", () => {
  test("Success user registration", async ({ page }) => {
    await signUpForm.nameField.fill("TestName");
    await signUpForm.lastNameField.fill("Lastname");
    await signUpForm.emailField.fill(mail);
    await signUpForm.passwordField.fill("Qwerty123");
    await signUpForm.reEnterPassword.fill("Qwerty123");
    await signUpForm.registerButton.click();
    await expect(page.getByRole("heading", { name: "Garage" })).toBeVisible();
  });
});


});







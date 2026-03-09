import { Locator, test, expect } from "@playwright/test";

let nameField: Locator;
let lastNameField: Locator;
let emailField: Locator;
let passwordField: Locator;
let reEnterPassword: Locator;
let nameError: Locator;
let lastNameError: Locator;
let emailError: Locator;
let passwordFieldError: Locator;
let rePasswordFieldError: Locator;
let registerButton: Locator;
let mail: string;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator(".btn-primary", { hasText: "Sign up" }).click();
  nameField = page.locator("#signupName");
  lastNameField = page.locator("#signupLastName");
  emailField = page.locator("#signupEmail");
  passwordField = page.locator("#signupPassword");
  reEnterPassword = page.locator("#signupRepeatPassword");
  nameError = page.locator(".form-group:has(#signupName) .invalid-feedback");
  lastNameError = page.locator(
    ".form-group:has(#signupLastName) .invalid-feedback",
  );
  emailError = page.locator(".form-group:has(#signupEmail) .invalid-feedback");
  passwordFieldError = page.locator(
    ".form-group:has(#signupPassword) .invalid-feedback",
  );
  rePasswordFieldError = page.locator(
    ".form-group:has(#signupRepeatPassword) .invalid-feedback",
  );
  registerButton = page.locator("button.btn-primary", { hasText: "Register" });
  mail = `AQAtest-mail1+${Date.now()}@yopmail.com`;
});
test.describe("Field Name validation", () => {
  test("Empty name field", async () => {
    await nameField.fill("");
    await nameField.blur();
    await expect(nameError).toHaveText("Name is required"); //test failed because of mistakes in error message
  });
  test("Name with spaces", async () => {
    await nameField.fill("   ");
    await nameField.blur();
    await expect(nameError).toHaveText("Name is invalid"); //test failed because of mistakes string is not trimmed
  });
  test("Wrong data - digit", async () => {
    await nameField.fill("123456");
    await nameField.blur();
    await expect(nameError).not.toBeVisible(); //test failed because of name field does noe accept the numbers, but should
  });

  test("Wrong data - cyrillic", async () => {
    await nameField.fill("Кпроар");
    await nameField.blur();
    await expect(nameError).toHaveText("Name is invalid");
  });
  test("Too long name", async () => {
    await nameField.fill("Qwertyuiopoiuytrewqwe");
    await nameField.blur();
    await expect(nameError).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });
  test("Too short name", async () => {
    await nameField.fill("Q");
    await nameField.blur();
    await expect(nameError).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });
  test("Border color", async () => {
    await nameField.fill("Q");
    await nameField.blur();
    await expect(nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Valid name", async () => {
    await nameField.fill("Testname");
    await nameField.blur();
    await expect(nameError).not.toBeVisible();
  });
});

test.describe("Field Last name validation", () => {
  test("Empty last name field", async () => {
    await lastNameField.fill("");
    await lastNameField.blur();
    await expect(lastNameError).toHaveText("Last name required"); //test failed because of mistakes in error message
  });

  test("Wrong data - digit", async () => {
    await lastNameField.fill("123456");
    await lastNameField.blur();
    await expect(lastNameError).toHaveText("Last name is invalid");
  });

  test("111Wrong data - cyrillic", async () => {
    await lastNameField.fill("Кпроар");
    await lastNameField.blur();
    await expect(lastNameError).toHaveText("Last name is invalid");
  });
  test("Too long last name", async () => {
    await lastNameField.fill("Qwertyuiopoiuytrewqwe");
    await lastNameField.blur();
    await expect(lastNameError).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });
  test("Too short last name", async () => {
    await lastNameField.fill("Q");
    await lastNameField.blur();
    await expect(lastNameError).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });
  test("Border color", async () => {
    await lastNameField.fill("Q");
    await lastNameField.blur();
    await expect(lastNameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Valid last name", async () => {
    await lastNameField.fill("TestLastname");
    await lastNameField.blur();
    await expect(lastNameError).not.toBeVisible();
  });
});

test.describe("Email validation", () => {
  test("Email without @", async () => {
    await emailField.focus();
    await emailField.blur();
    await expect(emailError).toHaveText("Email required");
  });

  test("Email without domain", async () => {
    await emailField.fill("test-mail1@yopmail");
    await emailField.blur();
    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText("Email is incorrect");
  });
  test("Border color", async () => {
    await emailField.focus();
    await emailField.blur();
    await expect(emailField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Valid Email", async () => {
    await emailField.fill(mail);
    await emailField.blur();
    await expect(emailError).not.toBeVisible();
  });
});

test.describe("Password validation", () => {
  test("Too short password", async () => {
    await passwordField.fill("a");
    await passwordField.blur();
    await expect(passwordFieldError).toBeVisible();
    await expect(passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });

  test("Too long password", async () => {
    await passwordField.fill("Qwerty1234567891");
    await passwordField.blur();
    await expect(passwordFieldError).toBeVisible();
    await expect(passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without integer", async () => {
    await passwordField.fill("Qwertyui");
    await passwordField.blur();
    await expect(passwordFieldError).toBeVisible();
    await expect(passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without capital letter", async () => {
    await passwordField.fill("qwerty12345678");
    await passwordField.blur();
    await expect(passwordFieldError).toBeVisible();
    await expect(passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without small letter", async () => {
    await passwordField.fill("QWERTYUI1");
    await passwordField.blur();
    await expect(passwordFieldError).toBeVisible();
    await expect(passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Password without letter", async () => {
    await passwordField.fill("12345678");
    await passwordField.blur();
    await expect(passwordFieldError).toBeVisible();
    await expect(passwordFieldError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });
  test("Border color", async () => {
    await passwordField.focus();
    await passwordField.blur();
    await expect(passwordField).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  test("Valid password", async () => {
    await passwordField.fill("Qwerty123");
    await passwordField.blur();
    await expect(passwordFieldError).not.toBeVisible();
  });
});

test.describe("Re-enter password", () => {
  test("Empty re-password field", async () => {
    await reEnterPassword.focus();
    await reEnterPassword.blur();
    await expect(rePasswordFieldError).toHaveText("Re-enter password required");
  });
  test("Re-password does not match", async () => {
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty12");
    await reEnterPassword.blur();
    await expect(rePasswordFieldError).toHaveText("Passwords do not match");
  });
  test("Border color", async () => {
    await reEnterPassword.focus();
    await reEnterPassword.blur();
    await expect(reEnterPassword).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  test("Passwords match", async () => {
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty123");
    await reEnterPassword.blur();
    await expect(reEnterPassword).not.toBeVisible();
  });
});

test.describe("Registration button", () => {
  test("Register button should be disabled when all fields are empty", async () => {
    await expect(registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Name is invalid", async () => {
    await nameField.fill("й");
    await lastNameField.fill("Lastname");
    await emailField.fill(mail);
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty123");
    await expect(registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Last name is invalid", async () => {
    await nameField.fill("TestName");
    await lastNameField.fill("q");
    await emailField.fill(mail);
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty123");
    await expect(registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Email is invalid", async () => {
    await nameField.fill("TestName");
    await lastNameField.fill("Lastname");
    await emailField.fill("AQAtest-mail1yopmail.com");
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty123");
    await expect(registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Password is invalid", async () => {
    await nameField.fill("TestName");
    await lastNameField.fill("Lastname");
    await emailField.fill(mail);
    await passwordField.fill("Qwerty");
    await reEnterPassword.fill("Qwerty");
    await expect(registerButton).toBeDisabled();
  });
  test("Register button should be disabled when Re-enter password is invalid", async () => {
    await nameField.fill("TestName");
    await lastNameField.fill("Lastname");
    await emailField.fill(mail);
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty12");
    await expect(registerButton).toBeDisabled();
  });
  test("Register button should be enable when valid data entered", async () => {
    await nameField.fill("TestName");
    await lastNameField.fill("Lastname");
    await emailField.fill(mail);
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty123");
    await expect(registerButton).toBeEnabled();
  });
});

test.describe("Success registration", () => {
  test("Success user registration", async ({ page }) => {
    await nameField.fill("TestName");
    await lastNameField.fill("Lastname");
    await emailField.fill(mail);
    await passwordField.fill("Qwerty123");
    await reEnterPassword.fill("Qwerty123");
    await registerButton.click();
    await expect(page.getByRole('heading', {name: 'Garage'})).toBeVisible();
  });
});

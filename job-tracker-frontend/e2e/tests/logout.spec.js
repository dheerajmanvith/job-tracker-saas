import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { testUser } from "../test-data/user";


test("user can logout", async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    testUser.email,
    testUser.password
  );

  await page.getByRole("button", {
    name: /logout/i
  }).click();

  await expect(page).toHaveURL("/");

});
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { testUser } from "../test-data/user";


test.describe("Update Application Status", () => {

  test("should update the first application's status", async ({ page }) => {

    const loginPage = new LoginPage(page);


    await loginPage.goto();


    await loginPage.login(
      testUser.email,
      testUser.password
    );


    await page.goto("/applications");

    await page.waitForLoadState("networkidle");


    const table = page.locator("table");

    await expect(table).toBeVisible({
      timeout: 10000
    });


    const statusSelect = table
      .locator("tbody tr")
      .first()
      .locator("select");


    await expect(statusSelect)
      .toBeVisible({ timeout: 10000 });


    await statusSelect.selectOption(
      "INTERVIEW"
    );


    await expect(statusSelect)
      .toHaveValue(
        "INTERVIEW"
      );

  });

});
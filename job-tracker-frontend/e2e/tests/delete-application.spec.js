import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { ApplicationPage } from "../pages/ApplicationPage";
import { testUser } from "../test-data/user";


test.describe(
  "Delete Application",
  () => {


    test(
      "should delete first application",
      async ({ page }) => {


        const loginPage =
          new LoginPage(page);


        const applicationPage =
          new ApplicationPage(page);



        await loginPage.goto();



        await loginPage.login(
          testUser.email,
          testUser.password
        );



        await page.goto(
          "/applications"
        );

        await page.waitForLoadState(
          "networkidle"
        );



        const table =
          page.locator("table").first();



        await expect(
          table
        ).toBeVisible();



        const firstRow =
          table.locator(
            "tbody tr"
          ).first();



        await expect(
          firstRow
        ).toBeVisible();


        // Capture identifying text of the row being deleted,
        // since "first row" is a moving target after deletion
        const deletedRowText =
          await firstRow.textContent();



        await applicationPage.deleteFirstApplication();



        await expect(
          page.getByText(
            deletedRowText,
            { exact: true }
          )
        ).not.toBeVisible();



      }
    );


  }
);
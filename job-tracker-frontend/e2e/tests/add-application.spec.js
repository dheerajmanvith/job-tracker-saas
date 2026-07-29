import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { ApplicationPage } from "../pages/ApplicationPage";

import { testUser } from "../test-data/user";


test.describe("Applications", () => {


  test("should add a new job application", async ({ page }) => {


    const loginPage = new LoginPage(page);

    const applicationPage = new ApplicationPage(page);



    const company = `OpenAI-${Date.now()}`;



    // Open login page
    await loginPage.goto();



    // Login
    await loginPage.login(
      testUser.email,
      testUser.password
    );



    // Open applications page
    await applicationPage.goto();



    // Add application
    await applicationPage.addApplication(

      company,

      "Software Engineer",

      "APPLIED",

      "Created by Playwright",

      "2026-07-29"

    );



    // Verify created
    await applicationPage.verifyApplicationCreated();



    await expect(
      page.getByText(company)
    ).toBeVisible();


  });


});
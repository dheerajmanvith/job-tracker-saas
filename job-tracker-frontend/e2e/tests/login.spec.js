import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";


test("should login successfully", async ({page})=>{


const loginPage = new LoginPage(page);


await loginPage.goto();


await loginPage.login(
  "dheeraj1816@gmail.com",
  "123456"
);



await expect(page)
  .toHaveURL(
    /dashboard/
  );


});
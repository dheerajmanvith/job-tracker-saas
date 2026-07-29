import { test, expect } from "@playwright/test";


test("redirect unauthenticated user", async ({ page }) => {

  await page.goto("/dashboard");

  await expect(page).toHaveURL("/");

});
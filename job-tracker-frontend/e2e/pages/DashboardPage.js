import { expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.dashboardHeading = page.getByRole("heading", {
      name: /dashboard/i,
    });
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);

    await expect(this.dashboardHeading).toBeVisible();
  }
}
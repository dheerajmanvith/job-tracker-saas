import { expect } from "@playwright/test";


export class ApplicationPage {


    constructor(page){

        this.page = page;

        this.table =
            page.getByTestId(
                "application-table"
            );

        this.rows =
            page.getByTestId(
                "application-row"
            );

        this.deleteButton =
            page.getByTestId(
                "delete-button"
            );

        this.companyInput =
            page.getByLabel(/company/i);

        this.roleInput =
            page.getByLabel(/role/i);

        this.statusSelect =
            page.locator("select[name='status']");

        this.appliedDateInput =
            page.getByLabel(/applied date/i);

        this.notesInput =
            page.locator("textarea[name='notes']");

        this.submitButton =
            page.getByRole(
                "button",
                { name: /add application/i }
            );

    }


    async goto(){

        await this.page.goto(
            "/applications"
        );

        await this.page.waitForLoadState(
            "networkidle"
        );

        await expect(
            this.table
        ).toBeVisible();

    }


    async addApplication(
        company,
        role,
        status,
        notes,
        appliedDate
    ){

        await this.page.goto("/add");

        await this.page.waitForLoadState(
            "networkidle"
        );

        await this.companyInput.fill(company);
        await this.roleInput.fill(role);

        if (status) {
            await this.statusSelect.selectOption(status);
        }

        await this.appliedDateInput.fill(
            appliedDate || new Date().toISOString().split("T")[0]
        );

        if (notes) {
            await this.notesInput.fill(notes);
        }

        this.page.once(
            "dialog",
            dialog => dialog.accept()
        );

        await this.submitButton.click();

        await this.page.waitForURL(
            "**/applications"
        );

        await this.page.waitForLoadState(
            "networkidle"
        );

    }


    async verifyApplicationCreated(){

        await expect(
            this.table
        ).toBeVisible();

    }


    async deleteFirstApplication(){

        const firstRow =
            this.rows.first();

        await expect(
            firstRow
        ).toBeVisible();

        const deleteButton =
            firstRow.getByTestId(
                "delete-button"
            );

        this.page.once(
            "dialog",
            dialog => dialog.accept()
        );

        await deleteButton.click();

        await this.page.waitForTimeout(
            1000
        );

    }


}
import { expect } from "@playwright/test";


export class LoginPage {


    constructor(page){

        this.page = page;


        this.emailInput =
            page.getByRole(
                "textbox",
                {
                    name:/email/i
                }
            );


        this.passwordInput =
            page.getByRole(
                "textbox",
                {
                    name:/password/i
                }
            );


        this.loginButton =
            page.getByRole(
                "button",
                {
                    name:/login/i
                }
            );


        this.dashboard =
            page.getByRole(
                "heading",
                {
                    name:"Dashboard"
                }
            );

    }




    async goto(){


        await this.page.goto("/");


        await this.page.waitForLoadState(
            "networkidle"
        );


    }




    async login(
        email,
        password
    ){


        await this.emailInput.fill(
            email
        );


        await this.passwordInput.fill(
            password
        );



        await this.loginButton.click();



        await expect(
            this.dashboard
        ).toBeVisible({

            timeout:15000

        });



    }





    async verifyLoginPage(){


        await expect(
            this.emailInput
        ).toBeVisible();



        await expect(
            this.passwordInput
        ).toBeVisible();


    }


}
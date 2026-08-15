export class CheckoutStepOnePage {

    constructor(page){
        this.page = page;
        this.name = page.locator('[data-test="firstName"]');
        this.surname = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continue = page.locator('[data-test="continue"]');
        this.error = page.locator('.error-message-container');
    }

    async fillUserInfo(firstName, lastName, postalCode){
        await this.name.fill(firstName);
        await this.surname.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async clickContinue(){
        await this.continue.click();
    }

    async getErrorMessage(){
        return await this.error.textContent();
    }
}
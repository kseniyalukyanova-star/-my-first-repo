export class CheckoutCompletePage{
    constructor(page){
        this.page = page;
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.BackHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage(){
        return await this.completeHeader.textContent();
    }
}
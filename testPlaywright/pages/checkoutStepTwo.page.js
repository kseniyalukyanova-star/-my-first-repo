export class CheckoutStepTwoPage {

    constructor(page){
        this.page = page;
        this.itenInfo = page.locator('[data-test="payment-info-value"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finish = page.locator('[data-test="finish"]');
    }

    async finishCheckout(){
        await this.finish.click();
    }
}
export class CartPage {

    constructor(page){
        this.page = page;
        this.cardList = page.locator('[data-test="cart-list"]');
        this.cardItemName = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

async goToCheckout(){
    await this.checkoutButton.click();
}

async continueShopping(){
    await this.continueShoppingButton.click();
}

async getCartName(){
   return await this.cardItemName.textContent();
}

}
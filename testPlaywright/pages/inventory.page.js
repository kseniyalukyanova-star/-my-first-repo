export class InventoryPage {

constructor(page){
    this.page = page;
    this.headerAppLogo = page.locator('[data-test="title"]');
    this.iconBasket = page.locator('[data-test = "shopping-cart-link"]');
    this.itemList = page.locator('[data-test="product-sort-container"]');
    this.buttonAddToCart = page.locator('[data-test^="add-to-cart"]');
}

async sortByPriceHighToLow(){
    await this.itemList.selectOption('hilo');
}

async addItemToCart(itemName){
    await this.buttonAddToCart.first().click();
}

async openCart(){
    await this.iconBasket.click()
}

async getTitle(){
   return await this.headerAppLogo.textContent()
}

}
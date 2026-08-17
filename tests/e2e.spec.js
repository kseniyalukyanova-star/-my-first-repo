import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutStepOnePage } from '../pages/checkoutStepOne.page.js';
import { CheckoutStepTwoPage } from '../pages/checkoutStepTwo.page.js';
import { CheckoutCompletePage } from '../pages/checkoutComplete.page.js';

test('E2E сценарий покупки самого дорогого товара', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    const title = await inventoryPage.getTitle();
    expect(title).toBe('Products');

    await inventoryPage.sortByPriceHighToLow();

    await inventoryPage.addItemToCart();

    await inventoryPage.openCart();

    const itemName = await cartPage.getCartName();
    expect(itemName).toContain('Fleece Jacket');

    await cartPage.goToCheckout();

    await checkoutStepOne.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOne.clickContinue();

    await checkoutStepTwo.finishCheckout();

    const message = await checkoutComplete.getCompletionMessage();
    expect(message).toContain('Thank you for your order!');
})
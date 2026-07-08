const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.getByRole('button', { name: 'Login' });
    const cardTitles = page.locator('.card-body b');

    await userName.type('rahulborchate11@gmail.com');
    await password.fill('Aloha@123');
    await loginButton.click();

    await cardTitles.first().waitFor();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('First Playwright Test', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');

    //Locators
    const products = page.locator('.card-body');
    const cardTitles = page.locator('.card-body b');
    const itemList = page.locator('div.cart li');
    const cartButton = page.locator('[routerlink*="cart"]');
    const countryInput = page.locator("[placeholder='Select Country']");
    const checkOutButton = page.locator("text=Checkout");
    const userLabel = page.locator(".details__user [type='text']").first();
    const creditCardInput = page.locator(".form__cc input[type='text']");
    const placeOrderButton = page.locator(".action__submit");
    const thankYouMessage = page.locator(".hero-primary");
    const orderId = page.locator("label.ng-star-inserted");
    const myOrdersHistoryLink = page.locator("label[routerlink='/dashboard/myorders']");

    //Wait for the card titles to be visible before proceeding
    await cardTitles.first().waitFor();

    console.log(await cardTitles.allTextContents());
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === 'ZARA COAT 3') {
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }

    await cartButton.click();
    await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkOutButton.click();
    await creditCardInput.first().fill("1234 5678 9012 3456");
    await creditCardInput.nth(1).fill("123");
    await creditCardInput.nth(2).fill("Rahul Borchate");
    await countryInput.type('Ind', { delay: 200 });
    await page.locator("section.ta-results button").first().waitFor();
    const dropdownValues = page.locator("section.ta-results button");
    const dropdownCount = await dropdownValues.count();
    for (let i = 0; i < dropdownCount; i++) {
        const text = await dropdownValues.nth(i).textContent();
        if (text.trim() === "India") {
            await dropdownValues.nth(i).click();
            break;
        }
    }
    expect(await userLabel.textContent()).toContain("rahulborchate11@gmail.com");
    await placeOrderButton.click();

    await thankYouMessage.waitFor();
    expect(await thankYouMessage.textContent()).toContain(" Thankyou for the order. ");
    const orderIdText = await orderId.textContent();
    console.log("Order ID: " + orderIdText);
    await myOrdersHistoryLink.click();
    await page.locator("tbody tr").first().waitFor();
    const orderRows = page.locator("tbody tr");
    const orderRowsCount = await orderRows.count();
    console.log("Order Rows Count: " + orderRowsCount);
    for (let i = 0; i < orderRowsCount; i++) {
        const rowOrderId = await orderRows.nth(i).locator("th").nth(0).textContent();
        console.log("Row Order ID: " + rowOrderId);
        if (orderIdText.includes(rowOrderId)) {
            await orderRows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderSummaryOrderId = await page.locator("div.email-container .-main").textContent();
    expect(await orderIdText.includes(orderSummaryOrderId));
    // await page.pause(100);
});

test('Playwright Test 2', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');

    //Locators
    const products = page.locator('.card-body');
    const cardTitles = page.locator('.card-body b');
    const cartButton = page.locator('[routerlink*="cart"]');

    //Wait for the card titles to be visible before proceeding
    await cardTitles.first().waitFor();

    console.log(await cardTitles.allTextContents());
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === 'ZARA COAT 3') {
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }

    await cartButton.click();
    await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
});

const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "rahulborchate11@gmail.com", userPassword: "Aloha@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place the order', async ({ page }) => {
    //Locators
    const myOrdersHistoryLink = page.getByRole('button', { name: 'ORDERS' });

    //Set the token in local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    //Go to the page
    await page.goto('https://rahulshettyacademy.com/client/');

    //Click on the Orders link
    await myOrdersHistoryLink.click();
    await page.locator("tbody tr").first().waitFor();
    const orderRows = page.locator("tbody tr");
    const orderRowsCount = await orderRows.count();
    console.log("Order Rows Count: " + orderRowsCount);

    for (let i = 0; i < orderRowsCount; i++) {
        const rowOrderId = await orderRows.nth(i).locator("th").nth(0).textContent();
        console.log("Row Order ID: " + rowOrderId);
        if (response.orderId === rowOrderId) {
            await orderRows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderSummaryOrderId = await page.locator("div.email-container .-main").textContent();
    expect(await response.orderId.includes(orderSummaryOrderId));
});
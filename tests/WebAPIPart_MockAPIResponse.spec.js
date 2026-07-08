const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "rahulborchate11@gmail.com", userPassword: "Aloha@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePlayloadNoOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Test mock API response', async ({ page }) => {
    //Locators
    const myOrdersHistoryLink = page.getByRole('button', { name: 'ORDERS' });

    //Set the token in local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    //Go to the page
    await page.goto('https://rahulshettyacademy.com/client/');

    //Mock API response: API actual response-> mock playwirght fake response -> browser->render data on UI using fake response

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePlayloadNoOrders);
            route.fulfill({
                response,
                body
            })
        })

    //Click on the Orders link
    await myOrdersHistoryLink.click();
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.locator('.mt-4').isVisible();
    console.log(await page.locator('.mt-4').textContent());
});
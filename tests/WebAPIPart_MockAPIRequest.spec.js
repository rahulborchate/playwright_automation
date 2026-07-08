const { test, expect} = require('@playwright/test');

test.only('Test mock API request', async ({ page }) => {

    //Locators
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    const cardTitles = page.locator('.card-body');
    const ordersButton = page.getByRole('button', { name: 'ORDERS' });
    const orderRows = page.getByRole('button', { name: 'View' });

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await userName.fill('rahulborchate11@gmail.com');
    await password.fill('Aloha@123');
    await loginButton.click();
    await cardTitles.first().waitFor();
    await ordersButton.click();
    await orderRows.first().waitFor();

    //Mock API response: API actual request-> mock playwirght fake request -> browser->render data on UI using fake response

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"
        }));

    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*");
    await orderRows.first().click();
    expect(await page.getByText('You are not authorize to view').isVisible());
});
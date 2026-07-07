const {test, expect}= require('@playwright/test');

test('First Playwright Test', async ({page}) => 
    { 
    //Locators
    const products = page.locator('.card-body');
    const userName = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const signInButton = page.getByRole('button', { name: 'Login' });
    const lofinButton= page.getByRole('button', { name: 'Login' });
    const cardTitles = page.locator('.card-body b');
    const itemList = page.locator('div.cart li');
    const cartButton = page.locator('[routerlink*="cart"]');
    const countryInput = page.locator("[placeholder='Select Country']");
    const checkOutButton = page.getByRole('button', { name: 'Checkout' });
    const userLabel = page.locator(".details__user [type='text']").first();
    const creditCardInput = page.locator(".form__cc input[type='text']");
    const placeOrderButton = page.getByText("Place Order");
    const thankYouMessage = page.locator(".hero-primary");
    const orderId = page.locator("label.ng-star-inserted");
    const myOrdersHistoryLink = page.locator("label[routerlink='/dashboard/myorders']");


    //Navigate to the URL   
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    //Type method is used to type the text in the input field
    await userName.type('rahulborchate11@gmail.com');
    //Fill method is used to fill the input field with the text
    await password.fill('Aloha@123');
    await signInButton.click();

    //Wait for the network to be idle before proceeding
    await page.waitForLoadState('networkidle');

    await page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' }).getByRole('button', { name: 'Add To Cart' }).click();

    await cartButton.click();

    await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await checkOutButton.click();

    await creditCardInput.first().fill("1234 5678 9012 3456");
    await creditCardInput.nth(1).fill("123");
    await creditCardInput.nth(2).fill("Rahul Borchate");
    await page.locator("[placeholder='Select Country']").pressSequentially('Ind', {delay:200});
    await page.getByRole('button', { name: 'India' }).nth(1).click();

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
         for(let i=0; i<orderRowsCount; i++){
            const rowOrderId = await orderRows.nth(i).locator("th").nth(0).textContent();
            console.log("Row Order ID: " + rowOrderId);
            if(orderIdText.includes(rowOrderId)){
                await orderRows.nth(i).locator("button").first().click();
                break;
            }
    }
    const orderSummaryOrderId = await page.locator("div.email-container .-main").textContent();
    expect(await orderIdText.includes(orderSummaryOrderId));
    // await page.pause(100);
});
    
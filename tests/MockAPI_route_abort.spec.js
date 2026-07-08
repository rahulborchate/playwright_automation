const { test, expect } = require('@playwright/test');
const { request } = require('node:https');

test('Verify API mock with abort', async ({ page }) => {

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signInButton = page.locator('#signInBtn');
    const errorMessage = page.locator('[style*="block"]');
    const cardTitles = page.locator('.card-body a');

    //it should block the css to load in browser
    page.route('**/*.css', route => route.abort()); 

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.type('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');

    //it should block the all images to load in browser
    page.route('**/*.{png,jpg,jpeg}', route => route.abort()); 

    await signInButton.click();

    //it should print the all request url in console
    page.on("request", request => console.log("Request URL: "+request.url()));

    //it should print the all response url in console
    page.on("response", response => console.log("Response URL:"+response.url()+" "+response.status()+" "+response.statusText() ));

    console.log(await cardTitles.first().textContent());
    await expect(cardTitles.nth(0)).toContainText('iphone X');
}
);
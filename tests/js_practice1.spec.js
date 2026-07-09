const {test, expect}=require("@playwright/test");

test.only("Amazon search", async ({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.getByPlaceholder("Search Amazon.in").fill("Yoga mat");
    await page.locator("#nav-search-submit-button").click();
    

});
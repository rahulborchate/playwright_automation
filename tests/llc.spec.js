const { test, expect } = require('@playwright/test');

test('Special locator Playwright Test', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('form input[name="name"]').fill("Rahul Borchate");
    await page.getByPlaceholder("Password").fill("Aloha@123");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add' }).click();
});
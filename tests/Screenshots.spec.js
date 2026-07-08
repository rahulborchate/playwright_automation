const { test, expect } = require('@playwright/test');

test('Test page and locator based screenshots', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.locator('#displayed-text').isVisible();

    // Take a screenshot of the specific element and save it to the specified path
    await page.locator('#displayed-text').screenshot({ path: 'tests/screenshots/displayed-text.png' });

    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    // Take a screenshot of the entire page and save it to the specified path
    await page.screenshot({ path: 'tests/screenshots/screencast.png'});

    await page.locator('#show-textbox').click();
});

test.only('Visual testing - Verify screenshots', async ({ page }) => {
    await page.goto('https://www.google.com');
    expect(await page.screenshot()).toMatchSnapshot('google-homepage.png');
});

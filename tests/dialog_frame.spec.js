const { test, expect } = require('@playwright/test');

test('More Validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page).toHaveTitle('Practice Page');
  // await page.goto('https://www.google.com');
  // await expect(page).toHaveTitle('Google');
  // page.goBack();
  // await page.waitForLoadState('networkidle');
  // await expect(page).toHaveTitle('Practice Page');
  // page.goForward();
  // await expect(page).toHaveTitle('Google');
  await page.locator('#displayed-text').isVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
  await page.locator('#show-textbox').click();
  await page.locator('#displayed-text').isVisible();
  await page.getByRole('button', { name: 'Alert' }).click();
  page.on('dialog', dialog => accept(dialog));

  const iframe = await page.frameLocator('#courses-iframe');
  await iframe.locator("li a[href*=lifetime-access]:visible").click();
  const text = await iframe.locator(".text h2").textContent();
  console.log(text.split(" ")[1]);
  // await page.pause(100);
});

const { test, expect } = require('@playwright/test');

test('First Playwright Test', async ({ page }) => {

  //Locators
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const signInButton = page.locator('#signInBtn');
  const errorMessage = page.locator('[style*="block"]');
  const cardTitles = page.locator('.card-body a');

  //Navigate to the URL   
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  //Take a screenshot of the page and save it as screenshot.png
  await page.screenshot({ path: 'screenshot.png' });

  //Print the title of the page in console
  console.log(await page.title());

  //Assertion to check if the title of the page is correct
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

  //Type method is used to type the text in the input field
  await userName.type('rahulshetty');
  //Fill method is used to fill the input field with the text
  await password.fill('rahulshetty');

  //Click on SignIn button
  await signInButton.click();

  //Get the text of the error message and print it in console
  console.log(await errorMessage.textContent());

  //Assertion to check if the error message is displayed
  await expect(errorMessage).toContainText('Incorrect username/password.');

  await userName.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');
  await signInButton.click();

  console.log(await cardTitles.first().textContent());
  await expect(cardTitles.nth(0)).toContainText('iphone X');

  //Get the text of all the card titles and print it in console
  console.log(await cardTitles.allTextContents());
}
);

test('UI Controls', async ({ page }) => {

  //Navigate to the URL   
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  //Locators
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const dropDown = page.locator('select.form-control');
  const radioButton = page.locator('span.radiotextsty');
  const okayBtn = page.locator('#okayBtn');
  const checkBox = page.locator('#terms');
  const documentLink = page.locator('a[href*="documents-request"]');

  await userName.type('rahulshetty');
  await password.fill('rahulshetty');
  //Select the option from the dropdown
  await dropDown.selectOption('consult');

  await radioButton.last().click();
  await okayBtn.click();
  //Assertion to check if the radio button is selected
  expect(await radioButton.last().isChecked()).toBeTruthy();

  await checkBox.check();
  //Assertion to check if the checkbox is checked
  expect(await checkBox.isChecked()).toBeTruthy();

  await checkBox.uncheck();
  //Assertion to check if the checkbox is unchecked
  expect(await checkBox.isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
  // await page.pause(10000);

}
);

test('Child Windows Handling', async ({ page, context }) => {

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator('a[href*="documents-request"]');
  const userName = page.locator('#username');
  const signInButton = page.locator('#signInBtn');

  // Start waiting for the popup/page before clicking
  const [childPage] = await Promise.all([
    context.waitForEvent('page'), // Or page.waitForEvent('popup' or 'page')
    documentLink.click(), // Action that opens the child window
  ]);

  const text = await childPage.locator('p.red').textContent();
  const user = text.split('@')[1].split(' ')[0];
  console.log(user);

  await userName.fill("");
  await userName.fill(user);
  await expect(userName).toHaveValue(user);

  await signInButton.click();

  // await page.pause(10000);
});


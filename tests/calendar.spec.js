const {test, expect} = require("@playwright/test");

test("Calendar Test",async ({page}) => {
const day ="15";
const month ="May";
const year ="2024";

page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator("div.react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.getByText(month).click();
await page.locator('.react-calendar__month-view__days button:has-text("' + day + '")').click();

const selectedDate = await page.locator("div.react-date-picker__inputGroup input").nth(0).getAttribute("value");
console.log("Selected Date: " + selectedDate);


await expect(selectedDate).toBe("" + year + "-" + "05" + "-" + day);
// await page.pause(1000);
});
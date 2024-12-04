const { test, expect } = require('@playwright/test');
const testData = require('../testData.json');

test.describe('Dynamic Tests for Asana Demo App', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

    // Login to the application
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Verify successful login
    //await page.waitForSelector('text=Dashboard');
  });

  for (const data of testData) {
    test(`Test Case ${data.testCase}: Verify task "${data.task}" in "${data.application}"`, async ({ page }) => {
      // Navigate to the application section
      //await page.click(`text=${data.application}`);
      await page.click(`button:has-text("${data.application}")`);

      
      // Verify task details
      const taskSelector = `text=${data.task}`;
      await expect(page.locator(taskSelector)).toBeVisible();
      
      // Verify column placement

      const columnSelector = `div:has-text("${data.column}") >> text=${data.task}`;
      await expect(page.locator(columnSelector)).toBeVisible();
      const parentSelector = page.locator(taskSelector).locator('..');
      for (const tag of data.tags) {
        const tagSelector = parentSelector.locator(`xpath=//span[contains(text(), "${tag}")]`);
        await expect(tagSelector).toBeVisible();
      }
    });
  }
});

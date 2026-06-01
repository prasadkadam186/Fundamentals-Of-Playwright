import { test } from '@playwright/test'
import path from 'path'
import { readCSV } from './csv-reader';

test.describe(() => {
    test.beforeEach(({ page }) => {
        page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter')
    })
    test('Read CSV File', async ({ page}) => {
        const csvFilePath = path.join(__dirname, 'loginData.csv');
        const testData = await readCSV(csvFilePath);
        for (let data of testData) {
            await test.step(`Test execution for ${data.description}`, async ({  }) => {
                await page.getByPlaceholder('student@thetestingacademy.com').fill(data.username)
                await page.getByPlaceholder('Enter your password').fill(data.password)
                await page.locator('//input[@name="remember"]').click();
                await page.waitForTimeout(4000)
                await page.getByText('Login to Practice Account').click()
            })
        }
    })
})
import { test } from '@playwright/test'
import { readYAML } from './yaml-reader'
import path from 'path'
test.describe(() => {
    test.beforeEach(({ page }) => {
        page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter', { waitUntil: 'load' })
    })

    test('Data Driven with YAML File', async ({ page }) => {
        const yamlFilePath = path.join(__dirname, 'login.yaml');
        const testData = readYAML(yamlFilePath);
        for (let data of testData) {
            await test.step(`Executing ... ${data.description}`, async () => {
                await page.getByPlaceholder('student@thetestingacademy.com').pressSequentially(data.username, { delay: 200 })
                await page.getByPlaceholder('Enter your password').pressSequentially(data.password, { delay: 200 })
                await page.locator('//input[@name="remember"]').click();
                await page.waitForTimeout(4000)
                await page.getByText('Login to Practice Account').click()
            })
        }
    })
})
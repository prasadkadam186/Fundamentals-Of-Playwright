import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'

test('Data Driven with the help of faker', async ({ page }) => {
    const username = faker.internet.email();
    const password = faker.internet.password();
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    await page.getByPlaceholder('student@thetestingacademy.com').pressSequentially(username, { delay: 200 })
    await page.getByPlaceholder('Enter your password').pressSequentially(password, { delay: 200 })
    await page.locator('//input[@name="remember"]').click();
    await page.waitForTimeout(4000)
    await page.getByText('Login to Practice Account').click()
})
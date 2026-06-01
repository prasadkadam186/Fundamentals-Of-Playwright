import {expect, test} from '@playwright/test'

const baseUrl= 'https://app.vwo.com/#/login'
test.describe('Use of all Locators in one test : ' , ()=>{
    test('Locators : ' , async ({page})=>{
        await page.goto(baseUrl);
        await expect(page).toHaveTitle('Login - VWO')
        await page.locator('#login-username').pressSequentially('test@yopmail.com', {delay : 200});
        await page.locator('//input[@name="password"]').first().fill('Password1$')
        await page.waitForTimeout(3000)
        await page.close()
    })
})
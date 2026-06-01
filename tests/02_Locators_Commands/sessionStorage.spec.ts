import {test,ChromiumBrowser, BrowserContext, Page, chromium, expect} from '@playwright/test'

test('Session Stroage Example', async ({})=>{
    await sessionStoragedemo()
})

async function sessionStoragedemo(){
    const browser = await chromium.launch();
    const context=await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://app.vwo.com/#/login')
    await expect(page).toHaveTitle('Login - VWO')
    await page.getByPlaceholder('Enter email ID').first().pressSequentially('opg73@singleuseemail.site', {delay : 200})
    await page.locator('//input[@name="password"]').first().fill('Wingify@4321')
    await page.locator('#js-login-btn').click()
    await page.waitForTimeout(5000);
    await context.storageState({
        path : "./user-session.json"
    })
    await page.waitForTimeout(2000);
    await page.close();
    await context.close()
    await browser.close()
}
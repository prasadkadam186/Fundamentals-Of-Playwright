import {test,expect} from '@playwright/test'

test.use({
    storageState : './user-session.json'
})

test('Navigating to the dashboard without login : ', async ({page})=>{
    await page.goto("https://app.vwo.com/#/dashboard/get-started?accountId=1227004");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded — no login needed ✅");
    await page.waitForTimeout(3000);
})
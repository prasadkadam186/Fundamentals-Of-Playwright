import {test} from '@playwright/test'

test('Seach Via name', async ({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/webtable')
    await page.locator('#employee-search').click()
    await page.locator('#employee-search').pressSequentially('Rohan.Mehta', {delay : 200});
    await page.waitForTimeout(3000)
    await page.locator(`//td[text()='Rohan.Mehta']/preceding-sibling::td//input`).click()
    await page.waitForTimeout(3000)
    await page.close()

})
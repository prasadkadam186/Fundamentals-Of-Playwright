import {expect, test} from '@playwright/test'

test.skip('Multiple Elements handlings : ', async ({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter')
    let title_page=await page.locator('#page-title').first()
    await expect(title_page).toContainText('Master')
    let optionAvailable : string[] = await page.locator('a.list-group-item').allInnerTexts();
    console.log(optionAvailable);
    for(let val of optionAvailable){
        if(val === 'Register'){
            await page.getByText(val).click();
            break;
        }
    }
    await page.waitForTimeout(5000);
})

test('Using the multiple options from menu ', async ({page})=>{
    await page.goto('https://playwright.dev/')
    let title=page.locator('//h1[@class="hero__title heroTitle_ohkl"]')
    await expect(title).toBeVisible();
    let menuOptionList : string[] = await page.locator(`//div[@class="navbar__inner"]//a[@class='navbar__item navbar__link']`).allInnerTexts();
    for(let itemValue of menuOptionList){
        if(itemValue === 'MCP'){
            await page.getByText(itemValue).first().click();
            break;
        }
    }
    await page.waitForTimeout(5000)
})
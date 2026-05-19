import {expect, test} from '@playwright/test'

test('Handling the dynamic dropdowns : ', async ({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns');
    await page.locator('#lang-trigger').click();
    await page.getByText('Python', {exact : true}).click()
    await page.waitForTimeout(3000)
    await page.getByTestId('dropdown-framework').click()
    await page.getByText('Next').nth(1).click()
    await page.waitForTimeout(3000)
    await page.getByTestId('dropdown-experience').click()
    await page.getByText('Mid-level (4-6 years)').first().click()
    await page.waitForTimeout(2000)
    await page.getByRole('button', {name : 'Save selection'}).click()
    let result = await page.locator('#dropdown-output').allInnerTexts();
    console.log(result);
    expect(result).toBeTruthy()
})
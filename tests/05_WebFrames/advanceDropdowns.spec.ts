import {expect, test} from '@playwright/test'

test.describe('Advance Select dropdowns : ', ()=>{
    test('Part 1 :', async ({page})=>{
        await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes')
        await page.getByTestId('rs-single-input').click()
        await page.getByTestId('rs-single-input').pressSequentially('Play', {delay : 200})
        await page.locator('.tta-rs__menu-list .tta-rs__option').first().click()
        await page.waitForTimeout(2000)

        // First Type and then select
        await page.getByTestId('rs-multi-input').click()
        await page.getByTestId('rs-multi-input').pressSequentially('JUnit', {delay : 200})
        await page.getByText('JUnit').click();
        await page.getByTestId('rs-multi-input').pressSequentially('Jest', {delay : 200})
        await page.getByText('Jest').click()
        await page.keyboard.press('Escape')
        await page.waitForTimeout(3000)
    })

    test('Dealing with different types of dropdowns : ', async ({page})=>{
        await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes')
        await page.getByTestId('rs-single-input').click()
        await page.getByTestId('rs-single-input').pressSequentially('Cypress', {delay : 200})
        await page.getByRole('option', {name : 'Cypress'}).click()
        let res=await page.locator('.tta-rs__single-value').first().innerText()
        expect(res).toBe('Cypress')
    
        // Multi selects at a time

        let multiSelect=page.getByTestId('rs-multi-input')
        for(let name of ['Playwright', 'Pytest', 'TestNG']){
            await multiSelect.click();
            await page.getByRole('option', {name}).click()
        }
        await page.waitForTimeout(3000);
        await page.locator(`//button[@class='tta-rs__multi-value__remove']`).first().click()
        await page.waitForTimeout(3000);
        await page.locator(`//h2[text()='② Multi — chips with remove']`).click()

        // Type and Enter 

        await page.getByTestId('rs-creatable-input').click()
        await page.getByTestId('rs-creatable-input').pressSequentially('api')
        await page.keyboard.press('Enter');
        let resText= await page.locator('//span[@data-value="api"]').innerText();
        expect(resText).toBe('api')
    })
})
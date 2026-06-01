import {test, Page, expect} from '@playwright/test'

test.describe('02 Varify the url', ()=>{
    const url = 'https://app.vwo.com/#/login'
    test('Varify the url', async ({page})=>{
        await page.goto(url)
        await expect(page).toHaveURL('https://app.vwo.com/#/login')
        // To check the image is visible or not
        const image=page.locator('//img[@alt="VWO"]')
        await expect(image).toBeVisible()
        await page.waitForTimeout(3000)
    })

    // To skip the test cases
    test.skip('To Skip the test case', async ()=>{
        console.log("This test case will be skiped");
    })

    // test.only('To execute only test case : ',async ()=>{
    //      console.log("only this test case will be executed");
    // })

//     test.fail('Intensionally fail the test case : ', async()=>{
//     // intentionally empty
// })


})
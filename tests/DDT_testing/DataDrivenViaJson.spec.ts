import {Locator, test} from '@playwright/test';
import loginData from '../DDT_testing/loginData.json'
test.describe('Data Driven testing via JSON', ()=>{
    test.beforeEach(async ({page})=>{
        console.log('Exection Started')
        await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter')
    })
    for(let data of loginData){
        test(`Executing Test Synerio : ${data.description}`, async ({page})=>{
            const username_Locator : Locator = page.getByPlaceholder('student@thetestingacademy.com');
            const password_Locator : Locator = page.getByPlaceholder('Enter your password'); 
            const loginButton_Locator : Locator = page.getByText('Login to Practice Account');
            await username_Locator.clear();
            await username_Locator.pressSequentially(data.username, {delay : 300})
            await password_Locator.clear();
            await password_Locator.pressSequentially(data.password, {delay : 300})
            await page.waitForTimeout(4000);
            await loginButton_Locator.click()
            await page.close()
        })
    }

})
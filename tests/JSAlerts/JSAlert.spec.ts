import test, { expect } from '@playwright/test'

test.describe('TO Handle the JS Alerts', ()=>{
    test.beforeEach('Navigate to the URL : ', async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    })
    test(('Case 1 : Alert '), async ({page})=>{
        page.once('dialog', async dialog=>{
            console.log(`Dialog Message : ${dialog.message()}`);
            console.log(`Dialog Message : ${dialog.type()}`);
            await page.waitForTimeout(3000)
            await dialog.accept()
        })
        await page.getByText('Click for JS Alert',{exact : true}).click()
    })

    test('Confirmation box', async ({page})=>{
        page.once('dialog', async dialog=>{
            console.log(`Dialog Message : ${dialog.message()}`);
            console.log(`Dialog Message : ${dialog.type()}`);
            await dialog.dismiss()
        })
        await page.getByText('Click for JS Confirm', {exact : true}).click()
    })

    test('Prompt Box : ', async ({page})=>{
        const message = "Prasad Kadam";
        page.once('dialog', async dialog=>{
            
            console.log(`Dialog message : ${dialog.message()}`);
            console.log(`Dialog message : ${dialog.type()}`);
            await dialog.accept(message)
        })
        await page.getByText('Click for JS Prompt', {exact : true}).click()
        await page.waitForTimeout(3000)
        await expect(page.locator('#result')).toHaveText(`You entered: ${message}`)
    })
})
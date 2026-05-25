import {expect, Locator, test} from '@playwright/test'
test.describe('Keyboard Actions: ', ()=>{
    test('Keyboard Actions', async ({page})=>{
        await page.goto('https://www.toptal.com/developers/keycode')
        await page.keyboard.press('A');
        await page.screenshot({path : 'A.png'})
        await page.keyboard.press('Shift+O')
        await page.screenshot({path : 'B.png'})
    })

    test('Mouse Hovering : ', async ({page})=>{
        await page.goto('https://www.spicejet.com/')
        await page.getByText('SpiceClub', {exact : true}).first().hover();
        let allOptions = await page.locator(`(//div[@class='css-1dbjc4n r-150rngu r-eqz5dr r-16y2uox r-1wbh5a2 r-11yh6sk r-1rnoaur r-1sncvnh'])[2]//a`).allInnerTexts();
        console.log('All Options : ',allOptions);
        await page.getByText('Our Program', {exact : true}).click();
        await page.waitForTimeout(4000)
    })

    test('Drag and drop : ', async ({page})=>{
        await page.goto('https://the-internet.herokuapp.com/drag_and_drop')
        let columnA= page.locator('#column-a')
        let columnB= page.locator('#column-b')
        await expect(columnA).toHaveText('A');
        await expect(columnB).toHaveText('B');
        await columnA.dragTo(columnB)
        await expect(columnA).toHaveText('B');
        await expect(columnB).toHaveText('A');
    })

    test('Advance Drag and drop : ', async ({page})=>{
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/dnd')
        let source : Locator = page.locator('#card-write-spec');
        const sBox = (await source.boundingBox())!;
        let target : Locator = page.locator('[data-status="review"]');
        const tBox = (await target.boundingBox())!;
        await page.mouse.move(sBox.x + sBox?.width/2, sBox.y + sBox?.height/2)
        await page.mouse.down();
        await page.mouse.move(tBox.x + tBox?.width/2, tBox.y + tBox?.height /2, {steps : 10})
        await page.mouse.up()
        await page.waitForTimeout(3000)
    })

    test.only('Right Click option : ', async ({page})=>{
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/context-menu');
        await page.getByTestId('ctx-target').first().click({button : 'right'});
        let allOPtion : string[] = await page.locator(`//ul[@id="ctx-menu"]//li//span[1]`).allInnerTexts();
        console.log(allOPtion);
        await page.getByText('Copy', {exact : true}).first().click()
        await page.waitForTimeout(3000)
        
    })
})
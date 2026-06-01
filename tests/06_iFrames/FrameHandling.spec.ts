import {FrameLocator, test} from '@playwright/test'

test.skip('Iframe Handling : ', async ({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/frames/')
    let frameLocator : FrameLocator = page.frameLocator('#frame-one');
    await frameLocator.getByPlaceholder('e.g. Test Automation').pressSequentially('Tata Punch', {delay : 200});
    await frameLocator.locator('#RESULT_TextField-2').fill("Prasad Kadam")
    await frameLocator.locator('//input[@name="regNumber"]').fill("5845")
    await frameLocator.locator('#RESULT_RadioButton-1').selectOption('Sedan')
    await frameLocator.locator('//input[@name="year"]').fill("2023")
    await frameLocator.locator('//textarea[@name="notes"]').fill('Good in State');
    await page.waitForTimeout(5000)
})


test('Nested IFrame Handling : ', async ({page})=>{
    await page.goto('https://selectorshub.com/iframe-scenario/')
    const frame1 : FrameLocator = page.frameLocator('#pact1').first();
    const frame2 : FrameLocator = frame1.frameLocator('#pact2')
    const frame3 : FrameLocator = frame2.frameLocator('#pact3')
    await frame1.locator('#inp_val').pressSequentially('Aishwrya Ray', {delay : 200})
    await frame2.locator('#jex').pressSequentially('No one', {delay : 200})
    await frame3.locator('#glaf').pressSequentially('Yes its here', {delay : 200})
    await page.waitForTimeout(2000)

})


/**
 * {
 *  
 * 
 * }
 * 
 * 
 * 
 * 
 */
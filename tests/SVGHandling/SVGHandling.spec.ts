import {expect, test} from '@playwright/test'

test.describe('SVG Hadlin : ', ()=>{
    const url = 'https://app.thetestingacademy.com/playwright/widgets/svg'
    const SimpleMaps = "https://simplemaps.com/svg/country/in";
    test.beforeEach('Navigate to url : ', async ({page})=>{
        // await page.goto(url)
        await page.goto(SimpleMaps)
    })

    test('SVG Handling Red Circle :', async ({page})=>{
        await page.getByTestId('shape-circle-red').click();
        let output=await page.locator('#shapes-output').innerText();
        console.log(output);
        expect(output).toContain('Red circle')  
    })

    test('Triangle shape SVG Handling : ', async ({page})=>{
        await page.getByTestId('shape-triangle-mint').click();
        const output=await page.locator('#shapes-output').innerText();
        await expect(output).toContain('Mint triangle')
    })

    test.only("Generate the list of all states", async ({ page }) => {
        const states = await page
            .locator(
                `//div[@id='admin1_map_inner']//*[name()='svg']//*[name()='text' and contains(@class,'sm_label')]`,
            )
            .allTextContents();

        // Printing all 36 states and clicking on UP
        for (const state of states) {
            if (state.trim() === "Uttar Pradesh") {
                await page
                    .locator(`//*[name()='path' and contains(@class,'INUP')]`)
                    .click();
            }
        }
    });
})
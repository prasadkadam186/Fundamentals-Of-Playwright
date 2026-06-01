import {test} from '@playwright/test'

test.describe('Web Tables Handling : ', ()=>{
    const url='https://awesomeqa.com/webtable.html'
    const first='//table//tbody//tr['
    const middle=']//td['
    const last =']'
    test('Find the country and Company of Francisco Chang ', async ({page})=>{
        await page.goto(url);
        const rowCount = await page.locator('//table//tbody//tr').count()
        const columnCount = await page.locator('//table//tbody//tr[2]//td').count()
        for(let i =2 ; i<=rowCount; i++){
            for (let j=1;j<=columnCount; j++){
                let dynamicPath = `${first}${i}${middle}${j}${last}`
                let data = await page.locator(dynamicPath).innerText();
                if(data === 'Francisco Chang'){
                    let company=await page.locator(`${dynamicPath}//preceding-sibling::td`).innerText()
                    let country=await page.locator(`${dynamicPath}//following-sibling::td`).innerText()
                    console.log(`
                            Person Name : ${data}
                            Company : ${company}
                            Country : ${country}
                        `);
                }
            }
        }

    })
})
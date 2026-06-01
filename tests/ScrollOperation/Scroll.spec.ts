import {expect, test} from '@playwright/test'

test.describe('Scroll Operations :', ()=>{
    test.beforeEach('', async ({page}) => {
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll')
    })
    test('Scroll Event', async ({page}) => {
        await page.getByTestId('section-deep').scrollIntoViewIfNeeded();
        await page.waitForTimeout(3000)
    })

    test('TO handle the lazy scrolling list ', async ({page}) => {
        await page.getByText('Lazy-loaded list').scrollIntoViewIfNeeded()
        await page.waitForTimeout(3000)
        const list = page.locator('//ul[@class="lazy-list"]//li') 
        const initialCount=await list.count();
        console.log('Count',initialCount);
        
        await list.last().scrollIntoViewIfNeeded();
        

        await expect.poll(async () => list.count(), {
            message : 'expected lazy list to load more item',
            timeout : 10000
        }).toBeGreaterThan(initialCount)
    })


})
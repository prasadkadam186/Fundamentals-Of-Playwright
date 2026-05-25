import {test} from '@playwright/test'

test.describe('Download the file ', ()=>{
    test.beforeEach('Navigate to : ', async ({page}) => {
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/upload-download')     
    })
    test('File Downloading Example : ', async ({page}) => {
        const [staticDownload] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-text').click()
        ])
        await staticDownload.saveAs('out/'+staticDownload.suggestedFilename())
    })
})
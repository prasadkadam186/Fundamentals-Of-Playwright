import { test } from '@playwright/test'
// import path from 'path';

test.describe('File Handling and their operations : ', ()=>{
    test.beforeEach('Navigate to URL : ', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
    })

    test('Upload the single file : ', async ({page}) => {

        // const filePath = path.resolve(__dirname, 'testData.txt');

        // await page.locator('#file-upload').setInputFiles(filePath);

    })
})
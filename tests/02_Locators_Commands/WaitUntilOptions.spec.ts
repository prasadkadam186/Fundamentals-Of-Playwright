import {test} from '@playwright/test'

test('Different Ways to use the wait until : ', async ({page})=>{
    const baseUrl = 'https://app.vwo.com/#/login'
    const doc ='https://playwright.dev/'

    // Purpose : Default wait : wait to load all the things like image, css, scripts
    await page.goto(baseUrl, {waitUntil : 'load'})

    // 
    await page.goto(baseUrl, {waitUntil : 'commit'})

    // wait for html to be parsed
    await page.goto(baseUrl, {waitUntil : 'domcontentloaded'})

    // slowest : wait until all the network activity get stop
    await page.goto(baseUrl, {waitUntil : 'networkidle'})

    // Give the extra information to server that is user came from google
    await page.goto(doc , {referer : 'https://www.google.com/?zx=1778937278769'})
})


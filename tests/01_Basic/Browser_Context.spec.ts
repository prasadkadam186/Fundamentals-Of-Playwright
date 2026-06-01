import {test,chromium, BrowserContext, Page, Browser, expect} from "@playwright/test"


test('To Create the context : ', async ()=>{
    // await createBrowserContext()
    // await multiContext()

    await multiPage()
})


async function createBrowserContext(){
    // Browser : It's the heaviest, most expensive thing to create
    let browser : Browser = await chromium.launch()

    //  Context has its OWN cookies, sessions, localStorage — **completely isolated from other contexts**
    let context : BrowserContext = await browser.newContext();
    // Page = a single tab inside a context
    let page : Page = await context.newPage();
    await page.goto("https://app.vwo.com/#/login")
    await page.waitForTimeout(3000)
    await expect(page).toHaveTitle('Login - VWO')


    await page.close();
    await context.close();
    await browser.close()
}

async function multiContext() {
    let browser : Browser = await chromium.launch();

    // Admin Context : having seperate cookies, session etc...
    let adminContext : BrowserContext = await browser.newContext();
    let adminPage : Page =await adminContext.newPage();
    await adminPage.goto('https://app.vwo.com/#/login')
    await expect(adminPage).toHaveTitle('Login - VWO')
    await adminPage.close();
    await adminContext.close()

    // Second context : 
    let viewContext=await browser.newContext()
    let viewPage=await viewContext.newPage();
    await viewPage.goto("https://playwright.dev/")
    await viewPage.close();
    await viewContext.close();
    await browser.close()
}


async function multiPage()
{
    let browser : Browser = await chromium.launch();

    let context : BrowserContext = await browser.newContext()

    let page1 : Page = await context.newPage()
    await page1.goto('https://playwright.dev/')
    await page1.waitForTimeout(2000)
    await page1.close()
    let page2 : Page = await context.newPage();
    await page2.goto('https://app.vwo.com/#/login')
    await page2.waitForTimeout(2000)
    await page2.close();
    await context.close();
    await browser.close()


}


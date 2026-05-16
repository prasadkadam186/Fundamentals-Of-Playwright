import {test, Page, expect} from "@playwright/test"

test.describe("Varify the title og the page : ", ()=>{
    const url = "https://app.vwo.com/#/login"
    test("First Test Scripts", async ({page})=>{
        await page.goto(url)
        await expect(page).toHaveTitle('Login - VWO')
        await page.waitForTimeout(5000)
    })
})
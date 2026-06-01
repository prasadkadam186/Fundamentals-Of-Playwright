import {expect, Locator, test} from '@playwright/test'

test.describe('Basic Value based assertion : ', ()=>{
    test.beforeEach(async () => {
       console.log(`Before Each called : set up `);
    })
    test.afterEach(async () => {
        console.log(`After Each called : Tear down`);
    })
    const url='https://app.thetestingacademy.com/playwright/multiple_element_filter'
    test('Playwright Value based Assertion : ', async ({page}) => {
         expect(true).toBeTruthy()
         expect(false).toBeFalsy()
         expect(5).toBeGreaterThan(2);
         expect([1,2,3]).not.toBe([2,1,3]);
         expect(null).toBeNull()
         expect({name : 'Prasad', age : 26}).toEqual({name : 'Prasad', age : 26})
    })

    test('Locator based assertion : ', async ({page}) => {
        await page.goto(url) 
        const title=await page.locator('#page-title').innerText();
        expect(title).toContain('on a real login UI')
        const email_InputField=page.getByPlaceholder('student@thetestingacademy.com', {exact : true})
        expect(email_InputField).toHaveAttribute('type', 'email')
        expect(email_InputField).toHaveId('email')
        // Below is the soft assertion : continue and raise the error
        expect.soft(email_InputField).toHaveAttribute('placeholder', 'student@thetestingacademy.com')
    })

    test('Title and URL Based assertion', async ({page}) => {
        const url='https://app.thetestingacademy.com/playwright/widgets/calendar'
        await page.goto(url)
        await expect(page).toHaveTitle('Calendar Date Picker — The Testing Academy')
        await expect(page).toHaveURL(/calendar/)
        expect(url).toContain('thetestingacademy')
    })

    test('visible, disable, checked, unchckeck type assertion : ', async ({page}) => {
        const url='https://app.thetestingacademy.com/playwright/tables/practice.html'
        await page.goto(url)
        let title=await page.locator('#page-title').innerText()
        let gender_radioButton : Locator=page.getByTestId('gender-male')
        let firstName_field : Locator = page.getByTestId('first-name')
        let save_ProfileButton : Locator = page.getByTestId('profile-submit')
        expect(title).toBe('QA Profile Form practice')
        await expect(gender_radioButton).toBeVisible()
        await expect(firstName_field).toBeEditable()
        await expect(save_ProfileButton).toBeVisible()
    })

})
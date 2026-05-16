import test, {} from '@playwright/test'

test('Cookies Handling : ', async ({page, context})=>{
    await page.goto('https://app.vwo.com/#/login');
    let cookies = await context.cookies()

    await context.addCookies([
        {
            name : 'vwoCookies',
            value : 'eyJ1c2VySWQiOiIxNzExNTQzIiwiYW',
            domain : 'admin',
            path : '/home'
        },
        {
           name: "user_role",
            value: "admin",
            domain: "app.com",
            path: "/"
        }
    ])

    console.log(cookies);
    
})
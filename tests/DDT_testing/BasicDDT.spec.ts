import {Locator, test} from '@playwright/test'

test.describe('Basic DDT Testing by internal : ', () => {
    const url='https://app.thetestingacademy.com/playwright/multiple_element_filter';
    const loginData =[
        {
            'description' : 'Valid credientials', 
            'username' : 'admin@gmail.com',
            'password' : 'admin123',
            'expectedUrl' : '/admin/',
            'shouldPass' : true,
        },
         {
            'description' : 'Empty username', 
            'username' : '',
            'password' : 'admin123',
            'expectedUrl' : '/admin/',
            'shouldPass' : false,
        },
         {
            'description' : 'Empty password', 
            'username' : 'admin@gmail.com',
            'password' : '',
            'expectedUrl' : '/admin/',
            'shouldPass' : false,
        },
         {
            'description' : 'Empty username and password', 
            'username' : '',
            'password' : '',
            'expectedUrl' : '/admin/',
            'shouldPass' : false,
        },
    ]
    test.beforeEach('Navigate to URL',async ({page})=>{
        await page.goto(url);
    })
    for(let data of loginData){
        test(`Running Test Case of synerio : ${data.description} `, async ({page}) => {
            let username_FieldLocator: Locator = page.getByPlaceholder('student@thetestingacademy.com')
            let password_FieldLocator: Locator = page.getByPlaceholder('Enter your password')
            let login_to_button : Locator = page.getByText('Login to Practice Account', {exact : true})
            await username_FieldLocator.clear();
            await username_FieldLocator.pressSequentially(data.username, {delay : 100})
            await password_FieldLocator.clear();
            await password_FieldLocator.pressSequentially(data.password, {delay : 100})
            await login_to_button.click();
        })
    }
    
})
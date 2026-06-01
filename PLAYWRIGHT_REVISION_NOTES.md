# 🎭 Playwright Quick Revision

## Structure & Hooks
```ts
test.describe('suite', () => {
  test.beforeAll/afterAll(async () => {});
  test.beforeEach/afterEach(async ({ page }) => {});
  test('name', async ({ page }) => {});
});
test.skip() / test.only() / test.fail();
test.use({ storageState: './user-session.json' });
await test.step('label', async () => {});   // group steps
```

## Basics
```ts
await page.goto(url);
await page.goto(url, { waitUntil: 'load' });    // load | domcontentloaded | commit | networkidle
await page.waitForTimeout(3000);                // ⚠️ hard wait, avoid
await page.close();
```

## Browser → Context → Page
```ts
const browser = await chromium.launch();        // heaviest
const context = await browser.newContext();      // isolated session (cookies/storage)
const page = await context.newPage();            // a tab
// teardown reverse: page → context → browser
```

## Locators  (priority: role → testId → text/placeholder → css → xpath)
```ts
page.locator('#id / .class / //xpath');
page.getByRole('button', { name: 'Save' });
page.getByText('Login', { exact: true });
page.getByPlaceholder('email');  page.getByLabel('x');  page.getByTestId('id');
.first() / .last() / .nth(1)
```

## Actions
```ts
await loc.fill('x');                              // instant
await loc.pressSequentially('x', { delay: 200 }); // type slowly
await loc.clear();
await loc.click();  await loc.click({ button: 'right' });  await loc.dblclick();  await loc.hover();
await loc.check();  await loc.uncheck();  await loc.selectOption('val');  // native <select>
await loc.innerText();  await loc.allInnerTexts();  await loc.count();  await loc.getAttribute('href');
await page.keyboard.press('Enter' | 'Escape' | 'Shift+O');
await page.screenshot({ path: 'a.png' });
```

## Assertions  (await = auto-retry; no await = instant value)
```ts
expect(val).toBeTruthy/toBeFalsy/toBeNull();
expect(5).toBeGreaterThan(2);
expect('hi world').toContain('world');
expect(obj).toEqual(obj2);   expect(x).not.toBe(y);

await expect(loc).toBeVisible/toBeHidden/toBeEditable/toBeEnabled/toBeChecked();
await expect(loc).toHaveText/toContainText('x');
await expect(loc).toHaveAttribute('type','email');  toHaveValue('x');  toHaveCount(3);
await expect(page).toHaveTitle('T');  toHaveURL(/regex/);
expect.soft(loc).toHaveText('x');     // continue after fail
await expect.poll(() => loc.count(), { timeout: 10000 }).toBeGreaterThan(n);
```

## Multiple Elements / Tables
```ts
const items = await page.locator('a.item').allInnerTexts();
for (const v of items) { if (v === 'X') { await page.getByText(v).click(); break; } }

// table: build dynamic xpath with count()
const rows = await page.locator('//table//tbody//tr').count();
const cell = `//table//tbody//tr[${i}]//td[${j}]`;
`${cell}//preceding-sibling::td`  // left cell
`${cell}//following-sibling::td`  // right cell
```

## Dropdowns
```ts
await loc.selectOption('Sedan');                 // native
// type-and-select:
await page.getByTestId('input').pressSequentially('Cypress');
await page.getByRole('option', { name: 'Cypress' }).click();
// multi: loop click input + option;  creatable: type + keyboard.press('Enter')
```

## iFrames
```ts
const f = page.frameLocator('#frame-one');
await f.locator('#x').fill('v');
// nested: page.frameLocator('#a').frameLocator('#b').locator('#c')
```

## Dialogs / Alerts  (register BEFORE the click)
```ts
page.once('dialog', async d => { d.message(); d.type(); await d.accept(); });  // or d.dismiss() / d.accept('text')
await page.getByText('Click for JS Alert').click();
```

## Mouse / Drag & Drop
```ts
await source.dragTo(target);                     // simple
// manual (HTML5): boundingBox() → mouse.move → down → move({steps:10}) → up
await loc.click({ button: 'right' });            // right-click
```

## Scroll
```ts
await loc.scrollIntoViewIfNeeded();
// lazy list: scroll last, poll count grows
await expect.poll(() => list.count(), { timeout: 10000 }).toBeGreaterThan(initial);
```

## SVG  (use name() in xpath)
```ts
page.locator(`//*[name()='svg']//*[name()='text']`).allTextContents();
page.locator(`//*[name()='path' and contains(@class,'INUP')]`).click();
```

## Download / Upload
```ts
const [dl] = await Promise.all([ page.waitForEvent('download'), btn.click() ]);
await dl.saveAs('out/' + dl.suggestedFilename());
await page.locator('#file-upload').setInputFiles(path);   // [] to clear, [a,b] for many
```

## Cookies & Session
```ts
const cookies = await context.cookies();
await context.addCookies([{ name, value, domain, path }]);
await context.storageState({ path: './user-session.json' });  // save login
test.use({ storageState: './user-session.json' });            // reuse → skip login
```

## Data Driven Testing
```ts
for (const data of dataArray) {          // inline / JSON import / CSV / YAML
  test(`Scenario: ${data.description}`, async ({ page }) => { ... });
}
import data from './loginData.json';                 // JSON
const data = await readCSV(path);  // csv-parser
const data = readYAML(path);       // js-yaml
faker.internet.email() / faker.internet.password();  // random data
```

## Config / CLI
```ts
defineConfig({ testDir, retries, workers, reporter: 'html', use: { trace: 'on-first-retry' }, projects: [...] });
```
```bash
npx playwright test [-g "title"] [--headed] [--debug] [--project=chromium]
npx playwright show-report
npx playwright codegen <url>
```

---
# ➕ Extras (commonly asked — not in current tests)

## Locator Filtering
```ts
page.locator('li').filter({ hasText: 'Active' });
page.locator('li').filter({ has: page.locator('.icon') });
page.getByRole('row').filter({ hasText: 'Prasad' }).getByRole('button');
```

## Custom Timeouts
```ts
await loc.click({ timeout: 5000 });
await expect(loc).toBeVisible({ timeout: 10000 });
test.setTimeout(60000);          // per test
// config: timeout (per test) + expect: { timeout } (per assertion)
```

## Parallel / Serial
```ts
test.describe.configure({ mode: 'parallel' });  // or 'serial' (stop on first fail)
fullyParallel: true,             // in config
```

## Tags & Annotations
```ts
test('login @smoke @regression', async ({ page }) => {});
// run: npx playwright test --grep @smoke
test.info().annotations.push({ type: 'issue', description: 'JIRA-123' });
```

## Network Mocking / Interception
```ts
await page.route('**/api/users', route =>
  route.fulfill({ status: 200, body: JSON.stringify({ id: 1 }) }));
await page.route('**/*.png', route => route.abort());      // block images
const resp = await page.waitForResponse('**/api/login');   // wait for API
```

## API Testing  (request fixture)
```ts
test('api', async ({ request }) => {
  const res = await request.post('/api/login', { data: { user: 'x' } });
  expect(res.status()).toBe(200);
  const body = await res.json();
});
```

## Page Object Model (POM)
```ts
// login.page.ts
export class LoginPage {
  constructor(private page: Page) {}
  user = () => this.page.getByPlaceholder('email');
  async login(u: string, p: string) {
    await this.user().fill(u);
    await this.page.getByText('Login').click();
  }
}
// test: const login = new LoginPage(page); await login.login('a','b');
```

## Debug / Trace
```bash
npx playwright test --debug          # Playwright Inspector (step through)
npx playwright test --ui             # UI mode (time-travel, watch)
npx playwright show-trace trace.zip  # open a trace file
PWDEBUG=1 npx playwright test         # pause + inspector
```

---
# 🚀 Advanced

## Custom Fixtures  (extend base test)
```ts
import { test as base } from '@playwright/test';
export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await use(lp);            // value handed to the test
    // teardown after use()
  },
});
// usage: test('x', async ({ loginPage }) => { ... });
```

## Global Setup / Auth Project  (login once, reuse everywhere)
```ts
// auth.setup.ts
import { test as setup } from '@playwright/test';
setup('authenticate', async ({ page }) => {
  await page.goto('/login'); /* ...login... */
  await page.context().storageState({ path: 'auth.json' });
});
// config:
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  { name: 'chromium', dependencies: ['setup'], use: { storageState: 'auth.json' } },
]
```

## Auto-waiting & Locator Handles
```ts
const loc = page.getByRole('button');     // lazy — re-queried each action
const handle = await loc.elementHandle(); // ⚠️ static snapshot, avoid
await loc.waitFor({ state: 'visible' });   // visible|hidden|attached|detached
await page.waitForLoadState('networkidle');
await page.waitForURL('**/dashboard');
await page.waitForFunction(() => window.dataLoaded === true);
```

## Run JS in the Browser  (evaluate)
```ts
const title = await page.evaluate(() => document.title);
await page.evaluate(([a, b]) => a + b, [1, 2]);           // pass args
const text = await loc.evaluate(el => el.textContent);   // on a locator
await page.addInitScript(() => { window.localStorage.setItem('k', 'v'); });
```

## Advanced Assertions
```ts
await expect(loc).toHaveScreenshot('btn.png');   // visual regression
await expect(loc).toHaveCSS('color', 'rgb(0,0,0)');
await expect(loc).toHaveClass(/active/);
await expect(page).toHaveScreenshot();           // full page
await expect(async () => { /* retried */ }).toPass({ timeout: 10000 });
```

## Multiple Tabs / Popups
```ts
const [popup] = await Promise.all([
  context.waitForEvent('page'),    // new tab/window
  page.getByText('Open').click(),
]);
await popup.waitForLoadState();
await popup.getByText('x').click();
```

## Reuse / Modify Network
```ts
await page.route('**/api/**', async route => {
  const res = await route.fetch();               // let it hit server
  const json = await res.json();
  json.role = 'admin';                            // tamper response
  await route.fulfill({ response: res, json });
});
await page.unroute('**/api/**');                  // remove handler
```

## Reporters & CI
```ts
reporter: [['html'], ['list'], ['junit', { outputFile: 'results.xml' }], ['json', {...}]];
// blob (for sharding/merge), allure (3rd-party)
```
```bash
npx playwright test --shard=1/3        # split across machines
npx playwright merge-reports ./blob
npx playwright test --repeat-each=3 --retries=2
```

## Misc Power Tools
```ts
await page.emulateMedia({ colorScheme: 'dark' });
await page.setViewportSize({ width: 1280, height: 720 });
await context.grantPermissions(['geolocation']);
await context.setGeolocation({ latitude: 19.07, longitude: 72.87 });
await page.pdf({ path: 'page.pdf' });             // chromium headless only
const browser = await chromium.launch({ slowMo: 500, headless: false });
```

---
## 🧠 Golden Rules
- `await expect(locator)` auto-waits; `expect(value)` does not.
- Register dialog handler **before** the click that triggers it.
- Reach iframe elements **only** through `frameLocator`.
- Prefer `getByRole` / `getByTestId`; avoid `waitForTimeout`.

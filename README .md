## Table of Contents

1. [Playwright Test Runner Methods](#playwright-test-methods)
2. [Hooks](#hooks)
3. [storage state](#storagestate)
4. [Persistent Context](#persistent-context)
5. [Code Gen](#code-gen)
## Playwright Test Runner Methods

Playwright provides a variety of test runner methods that allow developers to control the execution flow of tests. These methods include options for running specific tests, skipping tests, grouping tests, and managing setup and teardown logic.

### 1. `only`

- **Description**: Runs a specific test or describe block exclusively. When marked with `only`, all other tests will be ignored.
- **Use Case**: Useful for focusing on a specific test or suite during debugging or development.
- **Example**:
  ```javascript
  test.only('should display login page', async ({ page }) => {
      await page.goto('https://example.com/login');
      // Assertions here
  });
  ```

### 2. `skip`

- **Description**: Skips a specific test or describe block without running it. Skipped tests will appear as "skipped" in the test results.
- **Use Case**: Useful when a test is not relevant in a certain environment or is temporarily not needed.
- **Example**:
  ```javascript
  test.skip('should not run this test', async ({ page }) => {
      await page.goto('https://example.com');
      // This test will be skipped
  });
  ```

### 3. `fixme`

- **Description**: Marks a test or describe block as needing a fix. The test is skipped and reported as "fixme," indicating it requires attention.
- **Use Case**: Useful for tracking incomplete or currently failing tests that need to be addressed.
- **Example**:
  ```javascript
  test.fixme('should fix this test later', async ({ page }) => {
      await page.goto('https://example.com');
      // This test will be skipped and marked as fixme
  });
  ```

### 4. `fail`

- **Description**: Marks a test as expected to fail. If the test fails, it is reported as "expected to fail." If the test passes, it is reported as an unexpected success.
- **Use Case**: Useful for tracking known issues that are expected to fail until they are resolved.
- **Example**:
  ```javascript
  test.fail('should fail due to a known bug', async ({ page }) => {
      await page.goto('https://example.com');
      // Assertions that are expected to fail
  });
  ```

### 5. `describe`

- **Description**: Groups related tests together into a test suite. It helps in organizing tests by feature, functionality, or module.
- **Use Case**: Useful for grouping and managing related tests.
- **Example**:
  ```javascript
  describe('Login Tests', () => {
      test('should display login page', async ({ page }) => {
          await page.goto('https://example.com/login');
          // Assertions here
      });

      test('should login with valid credentials', async ({ page }) => {
          await page.goto('https://example.com/login');
          await page.fill('#username', 'user');
          await page.fill('#password', 'password');
          await page.click('#loginButton');
          // Assertions here
      });
  });

-**sub Configuration**:
 ```javascript
   test.describe.parallel(``,async()=>{
   test('test with steps', async ({ page }) => {    
          await page.goto('https://example.com/login');
      });
   test('Step 2: Log in', async () => {
          await page.fill('#username', 'user');
          await page.fill('#password', 'password');
          await page.click('#loginButton');
      });
  });
- **Modes of execution**:
   **Description**: Groups related tests together into a test suite.and inject dependency or to run parallel.

- **Example**:
  ```javascript
  describe('Login Tests', () => {
  test.describe.configure({mode:"parallel",retries=1})
      test('should display login page', async ({ page }) => {
          await page.goto('https://example.com/login');
          // Assertions here
      });

      test('should login with valid credentials', async ({ page }) => {
          await page.goto('https://example.com/login');
          await page.fill('#username', 'user');
          await page.fill('#password', 'password');
          await page.click('#loginButton');
          // Assertions here
      });
  });

  ```

### 6. `test.step`

- **Description**: Allows breaking down a single test into multiple steps for better organization and reporting.
- **Use Case**: Useful for making tests more readable and structured by clearly defining steps within a single test.
- **Example**:
  ```javascript
  test('test with steps', async ({ page }) => {
      await test.step('Step 1: Go to the login page', async () => {
          await page.goto('https://example.com/login');
      });
      await test.step('Step 2: Log in', async () => {
          await page.fill('#username', 'user');
          await page.fill('#password', 'password');
          await page.click('#loginButton');
      });
  });

  ```
## Hooks

### Overview
- Hooks are special methods in Playwright that are used to set up and tear down test environments.

### Types of Hooks
- **`beforeAll`**: Runs once before all tests in a file.
- **`afterAll`**: Runs once after all tests in a file.
- **`beforeEach`**: Runs before each test.
- **`afterEach`**: Runs after each test.

### Use Cases
- **Setup/Teardown**: Use hooks to initialize and clean up resources (e.g., launching browsers, closing databases).
- **Data Preparation**: Use hooks to prepare test data or reset application state before each test.



## Storage State Using test.use()

Playwright provides the `test.use()` function to manage browser contexts and their state across tests. This is particularly useful for scenarios where you want to maintain certain states, such as logged-in sessions, across multiple tests.

##  Use Cases
Logging in once and testing multiple protected pages.
Sharing the same state across test suites in CI/CD pipelines.
Simulating authenticated and unauthenticated users in tests.

### Example

```javascript
test(`StorageState`,async({page})=>{
 await page.goto("http://leaftaps.com/opentaps/control/login")
    await page.locator("#username").fill("demoSalesManager")
    await page.fill("#password","crmsfa")
    await page.click(".decorativeSubmit") 
     await page.context().storageState({path:"state.json"})
})
 
test.use({ storageState: 'state.json' });

test('Logged-In User Test', async ({ page }) => {
  // Your test code here
});

test('Another Test', async ({ page }) => {
  // Your test code here
});
  ```


## Persistent Context

To launch a persistent context, which is useful for scenarios where you need to maintain the same browser state across multiple sessions, you can use the `launchPersistentContext` method.

### Example

```javascript
import { chromium } from 'playwright';

(async () => {
  const userDataDir = './user-data-dir';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 720 }
  });

  const page = await browserContext.newPage();
  await page.goto('http://www.leaftaps.com/opentaps');
  // Perform actions on the page

  // Close the context and browser when done
  await browserContext.close();
})();

```
## Code Gen

### Description
Playwright offers a code generation tool that records your browser interactions and generates code based on those actions. This can help in quickly creating test scripts by simply performing the desired actions in a browser.

### Use Case
Code generation is useful for quickly scaffolding test scripts, especially for complex user interactions. It helps in reducing the time and effort required to write initial test scripts from scratch.

### Example
Run the following command to start the code generator:
bash
npx playwright codegen https://www.amazon.in

This will open a browser where you can perform actions. Playwright will generate the corresponding code in real-time.

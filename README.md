# asana-automation

## **Introduction**
The task involved creating a Playwright-driven test suite for a demo web application. The main objective was to implement data-driven testing to minimize code duplication and improve scalability. Test scenarios were dynamically generated using a JSON object, which allowed for flexible and clean test case management. The suite aimed to validate tasks in different columns and their associated tags for both web and mobile applications.

---

## **Implementation Details**
The solution was structured into several key components:

### 1. **Data-Driven Test Approach**
- A `testData.json` file was created to store the test cases. Each entry contained details about the task, column, and tags for dynamic execution.

### 2. **Login Automation**
- Login functionality was automated to reuse across all test cases. Credentials and application URL were provided as constants to ensure maintainability.

### 3. **Dynamic Test Case Execution**
- The test suite iterated over the JSON data to create test cases dynamically.
- For each test case:
  - Logged into the app.
  - Navigated to the specified application section.
  - Verified the task’s presence, column placement, and tags.

### 4. **Improved Locator Strategy**
- Leveraged `locator` and `XPath` to target parent elements and child tags accurately.
- Used `:has-text()` for locating elements dynamically based on their text content.

### 5. **Code Reusability**
- Common functionality, like parent-child navigation and tag validation, was modularized for easier updates.

---

## **Challenges and Solutions**

### 1. **Challenge: Locating Tags in the Same Level as Tasks**
- **Issue**: Initial locators targeted `text=${data.task}` directly, causing conflicts since tags were sibling elements.
- **Solution**: Used `locator('..')` to navigate to the parent element of the task and then applied `XPath` to locate the tag elements precisely.

### 2. **Challenge: Ensuring Robust Element Selection**
- **Issue**: Variations in DOM structure could lead to fragile selectors.
- **Solution**: Employed Playwright's `:has-text()` and `contains()` to build resilient and dynamic selectors.

### 3. **Challenge: Dynamic Iteration Over Multiple Tags**
- **Issue**: Testing multiple tags per task required a reliable loop mechanism.
- **Solution**: Iterated over the `tags` array for each task, dynamically building and validating selectors for every tag.

---

## **Results**

### **Test Run Outcomes**
- All test cases executed successfully on the demo application.
- Tasks and associated tags were correctly verified in their respective columns.

### **Failures Noted**
- A minor delay in rendering tags led to intermittent failures in earlier runs.
- Resolved by adding `await page.waitForSelector()` to ensure elements were fully loaded before validation.

---

## **Recommendations**

### 1. **Enhancements to Application Features**
- **Improved Task Metadata**: Add unique identifiers (e.g., `data-task-id`) to each task and tag element to make locators more precise and efficient.
- **Consistent DOM Structure**: Ensure uniformity in HTML structure for easier test automation.

### 2. **Testing Improvements**
- **Parallel Test Execution**: Leverage Playwright's built-in parallelism to speed up test execution, especially as the number of test cases grows.
- **Visual Testing**: Integrate visual testing tools (e.g., Percy) to catch UI inconsistencies.
- **Error Logging**: Enhance reporting to capture detailed logs for failures, including screenshots and console errors.

### 3. **Scalability Suggestions**
- Modularize common test components like login, navigation, and validation for reuse across different suites.
- Automate JSON data generation using a script for easier scaling as test scenarios evolve.

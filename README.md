# OrangeHRM Playwright Automation

[![Playwright Tests](https://github.com/Solomon-Foster25/orangehrm-playwright-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Solomon-Foster25/orangehrm-playwright-automation/actions/workflows/playwright.yml)

End-to-end and API test automation for the [OrangeHRM](https://opensource-demo.orangehrmlive.com) open-source demo, built with Playwright and TypeScript. The suite covers authentication, core HR workflows, and the REST API — running cross-browser on every push via GitHub Actions.

## Highlights

- **UI automation** across four modules using the Page Object Model
- **API testing** with full CRUD coverage using Playwright's request context
- **API + UI integration** — an employee created via the API is verified through the UI
- **Cross-browser** execution on Chromium, Firefox, and WebKit
- **CI/CD** with GitHub Actions on every push and pull request
- **Reporting** via Playwright HTML and Allure reports, published as CI artifacts
- **Session reuse** with Playwright's storageState to avoid redundant logins

## Test Coverage

**Authentication** — valid login, invalid credentials, empty-field validation, and a SQL-injection rejection case.

**Dashboard** — data-driven verification that key dashboard widgets render after login.

**PIM (employee management)** — add employee, search by name and ID, required-field validation, and non-existent-employee handling.

**Admin (user management)** — add user, search, required-field validation, and password-mismatch validation.

**API** — GET (list, by ID), POST (create with persistence check), PUT (update), DELETE (with verification), and negative cases for invalid data and non-existent resources, plus the API + UI integration test.

## Tech Stack

Playwright, TypeScript, Page Object Model, GitHub Actions, Allure Reporting. Tests run against the live OrangeHRM open-source demo.

## Architecture

Page objects live in `/pages` and extend a shared `BasePage` for common helpers. Tests are organized by module under `/tests`. Authentication is handled once by a setup project (`auth.setup.ts`) that logs in and saves the session, which all other suites reuse via storageState. The login suite explicitly opts out of the saved session so it can test the login flow from a logged-out state.

```
orangehrm-playwright-automation/
    pages/
        BasePage.ts
        LoginPage.ts
        DashboardPage.ts
        EmployeeListPage.ts
        AddEmployeePage.ts
        UserListPage.ts
        AddUserPage.ts
    tests/
        auth.setup.ts
        login.spec.ts
        dashboard.spec.ts
        pim.spec.ts
        admin.spec.ts
        api.spec.ts
    .github/
        workflows/
            playwright.yml
    playwright.config.ts
    TEST_PLAN.md
    README.md
```

## Getting Started

Install dependencies and browsers:

```
npm ci
npx playwright install --with-deps
```

Run the full suite:

```
npx playwright test
```

Run a single suite:

```
npx playwright test pim.spec.ts
```

Run against one browser:

```
npx playwright test --project=chromium
```

View the HTML report:

```
npx playwright show-report
```

Generate and open the Allure report:

```
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## Engineering Notes

The suite targets a shared public demo, which surfaced real-world automation challenges: brittle auto-generated selectors handled with role-, label-, and attribute-based locators; an autocomplete search field requiring explicit handling of its async loading state; and cross-browser timing races (notably on Firefox) resolved with Playwright's web-first assertions and targeted waits rather than fixed delays. These, along with notable API behaviors and scoping decisions, are documented in [TEST_PLAN.md](./TEST_PLAN.md).

## Test Plan

See [TEST_PLAN.md](./TEST_PLAN.md) for scope, test strategy, risk areas, and exploratory findings.

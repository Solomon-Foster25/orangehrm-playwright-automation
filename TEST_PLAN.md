# Test Plan — OrangeHRM Playwright Automation

## 1. Overview

This project is an end-to-end test automation suite for the OrangeHRM open-source
demo application (https://opensource-demo.orangehrmlive.com), built with Playwright
and JavaScript.

The goal is to demonstrate a maintainable, professional-grade automated test suite
covering authentication, core HR workflows, and cross-browser reliability.

> **Note:** The target is a public demo instance. Data resets periodically, so tests
> are designed not to rely on persistent data between runs.

---

## 2. Scope

### In scope
- **Authentication** — login, validation, and error handling
- **Dashboard** — widget rendering and navigation
- **PIM** — employee management (add, edit, search)
- **Admin** — user management and roles/permissions
- **Leave** — applying for and managing leave

### Out of scope (and why)
- **Recruitment, Performance, Time modules** — excluded to keep the suite focused on
  the modules with the richest forms and validation, where automated coverage adds the
  most value.
- **Load / performance testing** — out of scope for a functional automation project.

---

## 3. Test Approach

- **Page Object Model (POM)** — interactions and locators live in page classes;
  assertions live in test files.
- **Data-driven testing** — repeated cases (e.g. dashboard widgets, login variations)
  are parametrized rather than copy-pasted.
- **Authentication reuse** — `storageState` logs in once during setup and reuses the
  session, so non-auth tests start already authenticated.
- **Cross-browser** — tests run on Chromium, Firefox, and WebKit.
- **Web-first assertions** — auto-waiting assertions (`expect(locator).toBeVisible()`)
  are used instead of instant checks to avoid race conditions.

---

## 4. Risk Areas & Known Challenges

- **Demo data resets** — the public demo resets periodically; tests must set up their
  own data and cannot assume records persist between runs.
- **Brittle auto-generated CSS** — OrangeHRM uses dynamic `oxd-` prefixed class names.
  Locators favor role / text / placeholder over CSS classes for stability.
- **Elements lacking accessible names** — e.g. the attendance ("Time at Work") widget
  body has no accessible name. In a real codebase, a `data-testid` would be requested.
- **Cross-browser timing / flakiness** — Initial negative login tests passed on some
  browsers and failed on others. Root cause: non-waiting visibility checks
  (`isVisible()`) created a race condition where the assertion ran before the error
  message rendered. Resolved by switching to Playwright's auto-waiting web-first
  assertions, which eliminated the flakiness across all three browsers.

---

## 5. Test Coverage Summary

| Suite          | Area                          | Test Cases | Status        |
|----------------|-------------------------------|-----------:|---------------|
| login.spec.js  | Authentication                | 8          | Complete      |
| dashboard.spec.js | Dashboard widgets          | TBD        | Not started   |
| pim.spec.js    | Employee management           | TBD        | Not started   |
| admin.spec.js  | User management & roles       | TBD        | Not started   |
| leave.spec.js  | Leave management              | TBD        | Not started   |

---

## 6. Exploratory Findings

Document anything notable discovered while testing — unexpected behavior, bugs, or
quirks worth recording.

- _(Example placeholder)_ Login field case-sensitivity / whitespace handling: TBD —
  record actual OrangeHRM behavior once the case-sensitivity test (auth case 8) is run.
- Username trailing-whitespace trimming — The login username field trims trailing whitespace before authenticating; 'Admin ' (with a trailing space) successfully logs in as 'Admin'. Confirmed by running the test rather than assumed. Expected results for the whitespace test case were set based on this observed behavior.
---

## 7. Test Environment

- **Application:** OrangeHRM open-source demo
- **URL:** https://opensource-demo.orangehrmlive.com
- **Browsers:** Chromium, Firefox, WebKit
- **Framework:** Playwright (JavaScript)
- **CI:** GitHub Actions
- **Reporting:** Allure / Playwright HTML report
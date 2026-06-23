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
- **Leave module** — Excluded because the public demo user has no leave entitlements configured ("No Leave Types with Leave Balance"), so the apply-leave form does not render and cannot be validated. Configuring entitlements would not persist reliably across demo resets, making such tests fragile. Validation testing is already demonstrated in the PIM and Admin suites.
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
- **Data-dependent Widgets** - The "Employees on Leave Today," "Employee Distribution by Sub Unit," and "Employee Distribution by Location" widgets are excluded from the visibility suite because they only render when corresponding data exists. On the public demo (which resets periodically), asserting their presence would produce intermittent failures unrelated to actual defects.
- **Brittle locators** - OrangeHRM has brittle locators on some of its pages --- notably the Employee ID inputs on the PIM pages, using 'nth(n)' index locators which could cause complications. If any potential fields are added, this would move the input's location away from that exact index number and causing the wrong input to be selected.
- **Transient toast notifications** — Success confirmation toasts (e.g. "Successfully Saved" on user creation) auto-dismiss after a few seconds and proved flaky to assert against, failing intermittently on Firefox due to slower form-fill timing. Resolved by asserting on durable post-action state (navigation / record presence) rather than the transient toast. This mirrors the earlier auth-suite flakiness and reflects a consistent principle: assert on persistent state, not fleeting UI.
- **Locator challenges in Admin module** — The add-user form required several non-standard locator strategies because the app lacks test-friendly attributes: custom `oxd-select` dropdowns (not native selects) require click-to-open then option-select; password fields have no accessible name and are located by `input[type="password"]`; dropdowns are located by their label group rather than placeholder text, because the "-- Select --" placeholder count changes as the form is filled.
- **API authentication enforcement** — Investigated whether the API enforces authentication. The public demo's read endpoints return data without authentication, and unauthenticated write attempts returned inconsistent statuses across browsers (200 on Chromium, 422 on others) rather than a clean auth rejection. Concluded the public demo does not enforce API auth in a reliably testable way; a meaningful unauthenticated-rejection test was therefore not included. In a production instance, this would be a priority security test.
---

## 5. Test Coverage Summary

| Suite          | Area                          | Test Cases | Status        |
|----------------|-------------------------------|-----------:|---------------|
| login.spec.js  | Authentication                | 8          | Complete      |
| dashboard.spec.js | Dashboard widgets          | 5          | Complete      |
| pim.spec.js    | Employee management           | 5          | Complete      |
| admin.spec.js  | User management & roles       | 5          | Complete      |
| leave.spec.js  | Leave management              | TBD        | Excluded  |

---

## 6. Exploratory Findings

Document anything notable discovered while testing — unexpected behavior, bugs, or
quirks worth recording.

- Username trailing-whitespace trimming — The login username field trims trailing whitespace before authenticating; 'Admin ' (with a trailing space) successfully logs in as 'Admin'. Confirmed by running the test rather than assumed. Expected results for the whitespace test case were set based on this observed behavior.
- PIM employee name search is an autocomplete; tests type the name, wait for the suggestion dropdown, and select the matching option before searching — mirroring real user interaction.
- The "No Records Found" state surfaces both a table message and a transient toast
---

## 7. Test Environment

- **Application:** OrangeHRM open-source demo
- **URL:** https://opensource-demo.orangehrmlive.com
- **Browsers:** Chromium, Firefox, WebKit
- **Framework:** Playwright (JavaScript)
- **CI:** GitHub Actions
- **Reporting:** Allure / Playwright HTML report
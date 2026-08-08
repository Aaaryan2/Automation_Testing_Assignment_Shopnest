# Design Decisions

Written like a PR description — the "why" behind the framework, for whoever
picks this up next.

## Framework and language

**Playwright Test, JavaScript, single framework for both API and UI.**

- One test runner for Task 1 and Task 2 means one `npm install`, one config
  file, one reporter, and one CI job — fewer moving parts for a reviewer to
  clone and run in under 5 minutes, which the brief calls out explicitly.
- Playwright's `request` fixture is a full-featured HTTP client (headers, JSON
  body handling, status/response assertions) — no need for a second library
  like Axios or Supertest just for Task 1.
- Built-in auto-waiting, actionability checks, and the trace viewer make the
  Dynamic Controls task (async DOM update after a click) straightforward to
  get right without hand-rolled `sleep()` calls — I wait on the loading
  spinner's visible → hidden lifecycle instead of a fixed delay.
- JavaScript over TypeScript: this repo has zero build/compile step, which
  keeps "clone → install → run" fast and removes a class of CI-only
  compilation failures. TypeScript would be a low-effort follow-up (see
  "What I'd improve" below) since Playwright supports it out of the box.
- Two Playwright **projects** (`api`, `ui-chromium`) share one config instead
  of two separate configs, since they only differ in `baseURL` and headers.

## Page Object Model (Task 2)

Each `the-internet.herokuapp.com` page under test gets its own class in
`pages/`, holding locators and user-facing actions (`login()`,
`toggleCheckbox()`, `uploadFile()`). Tests read like a script of intent and
never touch a CSS selector directly — if a locator changes, there's exactly
one place to fix it.

`SecureAreaPage` is a separate object from `LoginPage` even though they're
visited back-to-back, because they represent different pages/states with
their own elements (secure-area heading + logout vs. login form + flash
message). Keeping them separate avoids one bloated "auth page" object as more
scenarios get added.

## Test data and environment configuration

- UI credentials live in `utils/testData.js` as a single source of truth —
  no string literals duplicated across spec files. These are the credentials
  published on the target page itself, not a real secret.
- API auth: reqres.in's 2025 relaunch added a mandatory `x-api-key` header on
  `/api/*` (this wasn't the case when reqres.in was originally a fully open
  fake API, and isn't mentioned in the assignment brief — noting the
  deviation here). The suite defaults to the public demo key
  `reqres-free-v1`, wired in via `playwright.config.js` so no test file
  hardcodes it. It's overridable with a `REQRES_API_KEY` environment variable
  / GitHub secret, so swapping in a personal key or the real ShopNest API key
  later is a one-line change, not a refactor.
- No `.env` file is committed (see `.gitignore`) — config flows in through
  environment variables, which is what CI and a future staging setup would
  use anyway.

## Test independence

Every API test builds its own request and doesn't depend on state from
another test file (e.g., the PUT and DELETE tests target a fixed demo user
ID, `2`, which reqres.in always accepts regardless of prior calls — there's
no real persistence to leak between tests). UI tests each start from
`goto()` on their own page rather than assuming a prior test's browser state.

## What I'd add or improve with more time

- **TypeScript** for compile-time safety on page objects and API response
  shapes.
- **Data-driven tests for the actual ShopNest rules** the assignment
  describes but the demo targets can't exercise: PIN code must be exactly 6
  digits, quantity bounds of 1–10 per cart item, COD disabled at/above
  Rs. 5,000, only one promo code active at a time, expired-code error
  handling. I'd write these against the real Checkout 2.0 API/UI using the
  same POM and fixture patterns already in place here.
- **Allure report** instead of/alongside the Playwright HTML reporter for
  richer history and trend views across CI runs.
- **API schema validation via a JSON Schema library** (e.g. `ajv`) instead of
  field-by-field `expect()` assertions, so schema drift fails fast with a
  clearer diff.
- **Parallel sharding** in CI (`--shard`) once the suite grows large enough
  that a single worker becomes the bottleneck.
- **Accessibility checks** (axe-core) on the checkout pages, since this is a
  customer-facing purchase flow.
- **Visual regression** on the Order Confirmation and Cart Review screens,
  where a silent CSS regression is easy to miss with functional assertions
  alone.

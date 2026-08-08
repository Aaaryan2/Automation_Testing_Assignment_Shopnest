# ShopNest Checkout 2.0 — Automation QA Suite

Assignment 02 — Automation QA. This is the foundation automation framework for
ShopNest's Checkout 2.0 rebuild: an API suite and a UI suite (Page Object Model)
built against public demo targets, ready to be pointed at the real ShopNest
backend and frontend once staging is available.

- **API target:** `https://reqres.in` (stand-in for the ShopNest backend)
- **UI target:** `https://the-internet.herokuapp.com` (stand-in for the Checkout 2.0 frontend)
- **Framework:** [Playwright Test](https://playwright.dev/) (JavaScript) for both API and UI
- **Design pattern:** Page Object Model for all UI interactions

See [`DECISIONS.md`](./DECISIONS.md) for the reasoning behind these choices.

## Prerequisites

- Node.js 18 or later
- npm

## Setup

```bash
git clone <your-repo-url>
cd Automation-Testing-Assignment
npm install
npx playwright install --with-deps chromium
```

## Running the tests

```bash
# Everything (API + UI)
npm test

# API suite only
npm run test:api

# UI suite only
npm run test:ui

# UI suite with a visible browser (debugging)
npm run test:headed

# Open the last HTML report
npm run report
```

A full run (`npm test`) completes in well under 5 minutes on a clean clone —
this repo has no build step and no external services to provision.

## Project structure

```
shopnest-automation-qa/
├── .github/workflows/ci.yml   # GitHub Actions pipeline
├── playwright.config.js       # api + ui-chromium projects, reporters, retries
├── pages/                     # Page Objects (UI suite)
│   ├── LoginPage.js
│   ├── SecureAreaPage.js
│   ├── DynamicControlsPage.js
│   └── FileUploadPage.js
├── tests/
│   ├── api/                   # Task 1 — register, login, get, put, delete
│   └── ui/                    # Task 2 — login, dynamic controls, file upload
├── fixtures/                  # Static test files (e.g. upload fixture)
├── utils/testData.js          # Shared test data / credentials
└── DECISIONS.md
```

## API key note (reqres.in)

reqres.in now requires an `x-api-key` header on every `/api/*` request. The
suite defaults to the public demo key `reqres-free-v1`, set in
`playwright.config.js`. If that key ever gets rate-limited, sign up for a free
key at `app.reqres.in` and either:

- export it locally: `REQRES_API_KEY=your_key npm run test:api`, or
- add it as a repository secret named `REQRES_API_KEY` for CI.

## CI

Every push and PR to `main` runs the full suite via GitHub Actions
(`.github/workflows/ci.yml`) and uploads the HTML report as a build artifact,
downloadable from the workflow run summary.

## Reports

Playwright's built-in HTML reporter runs automatically (`npm test`) and writes
to `playwright-report/`. Open the last report with `npm run report`.

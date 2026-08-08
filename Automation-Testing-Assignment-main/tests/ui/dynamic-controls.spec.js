const { test, expect } = require('@playwright/test');
const { DynamicControlsPage } = require('../../pages/DynamicControlsPage');

test.describe('Dynamic Controls - Checkbox remove/add', () => {
  test('removing then re-adding the checkbox waits for the async DOM update', async ({ page }) => {
    const dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.goto();

    await expect(dynamicControlsPage.checkbox).toBeVisible();

    // Remove
    await dynamicControlsPage.toggleCheckbox();
<<<<<<< HEAD
    expect(await dynamicControlsPage.getCheckboxMessageText()).toContain("It's gone");
    await expect(dynamicControlsPage.checkbox).toHaveCount(0);
=======
    expect(await dynamicControlsPage.getMessageText()).toContain("It's gone!");
    await expect(dynamicControlsPage.checkbox).toBeDisabled();
>>>>>>> 53b00b58432e7eab7c975d5038e81b90c3ba4f41

    // Add back
    await dynamicControlsPage.toggleCheckbox();
    expect(await dynamicControlsPage.getCheckboxMessageText()).toContain("It's back");
    await expect(dynamicControlsPage.checkbox).toBeVisible();
  });
});

test.describe('Dynamic Controls - Input enable/disable', () => {
  test('enabling then disabling the text field waits for the async DOM update', async ({ page }) => {
    const dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.goto();

    await expect(dynamicControlsPage.textInput).toBeDisabled();

    // Enable
    await dynamicControlsPage.toggleInput();
    expect(await dynamicControlsPage.getInputMessageText()).toContain("It's enabled");
    await expect(dynamicControlsPage.textInput).toBeEnabled();

    // Disable
    await dynamicControlsPage.toggleInput();
    expect(await dynamicControlsPage.getInputMessageText()).toContain("It's disabled");
    await expect(dynamicControlsPage.textInput).toBeDisabled();
  });
});

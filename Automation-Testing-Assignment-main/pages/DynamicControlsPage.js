class DynamicControlsPage {
  constructor(page) {
    this.page = page;

    // This page renders duplicate elements with the same ids (a known quirk),
    // so every locator here is pinned to .first() to avoid Playwright's
    // strict-mode violation on ambiguous matches.

    // "Remove/add" widget - toggles the checkbox itself in and out of the DOM.
    this.checkboxContainer = page.locator('#checkbox-example').first();
    this.checkbox = this.checkboxContainer.locator('input[type="checkbox"]').first();
    this.checkboxButton = this.checkboxContainer.locator('button').first();
    this.checkboxLoadingSpinner = this.checkboxContainer.locator('#loading').first();
    this.checkboxMessage = this.checkboxContainer.locator('#message').first();

    // "Enable/disable" widget - toggles a text input's disabled state.
    this.inputContainer = page.locator('#input-example').first();
    this.textInput = this.inputContainer.locator('input[type="text"]').first();
    this.inputButton = this.inputContainer.locator('button').first();
    this.inputLoadingSpinner = this.inputContainer.locator('#loading').first();
    this.inputMessage = this.inputContainer.locator('#message').first();
  }

  async goto() {
    await this.page.goto('/dynamic_controls');
  }

  /**
   * Each widget has its own loading spinner with a ~5s async delay before the
   * DOM settles. We wait on that spinner's visible -> hidden lifecycle instead
   * of a hard sleep.
   */
  async _waitForAsyncUpdate(loadingSpinner) {
    await loadingSpinner.waitFor({ state: 'visible' });
    await loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async toggleCheckbox() {
    await this.checkboxButton.click();
    await this._waitForAsyncUpdate(this.checkboxLoadingSpinner);
  }

  async toggleInput() {
    await this.inputButton.click();
    await this._waitForAsyncUpdate(this.inputLoadingSpinner);
  }

  async getCheckboxMessageText() {
    await this.checkboxMessage.waitFor({ state: 'visible' });
    const text = await this.checkboxMessage.textContent();
    return text ? text.trim() : '';
  }

  async getInputMessageText() {
    await this.inputMessage.waitFor({ state: 'visible' });
    const text = await this.inputMessage.textContent();
    return text ? text.trim() : '';
  }
}

module.exports = { DynamicControlsPage };
class SecureAreaPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator('h2');
    this.flashMessage = page.locator('#flash');
    this.logoutButton = page.locator('a.button.secondary.radius');
  }

  async isLoaded() {
    await this.heading.waitFor({ state: 'visible' });
    return this.page.url().includes('/secure');
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { SecureAreaPage };

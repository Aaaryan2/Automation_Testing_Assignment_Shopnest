class FileUploadPage {
  constructor(page) {
    this.page = page;
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.successHeading = page.locator('h3');
    this.uploadedFileName = page.locator('#uploaded-files');
  }

  async goto() {
    await this.page.goto('/upload');
  }

  async uploadFile(filePath) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  async getSuccessHeading() {
    const text = await this.successHeading.textContent();
    return text ? text.trim() : '';
  }

  async getUploadedFileName() {
    const text = await this.uploadedFileName.textContent();
    return text ? text.trim() : '';
  }
}

module.exports = { FileUploadPage };

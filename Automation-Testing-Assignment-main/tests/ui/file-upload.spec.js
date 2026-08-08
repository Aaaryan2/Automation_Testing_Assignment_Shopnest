const path = require('path');
const { test, expect } = require('@playwright/test');
const { FileUploadPage } = require('../../pages/FileUploadPage');

test.describe('File Upload', () => {
  test('uploading a file shows the success confirmation with the file name', async ({ page }) => {
    const fileUploadPage = new FileUploadPage(page);
    const filePath = path.join(__dirname, '../../fixtures/sample-upload.txt');

    await fileUploadPage.goto();
    await fileUploadPage.uploadFile(filePath);

    await expect(page).toHaveURL(/\/upload$/);
    expect(await fileUploadPage.getSuccessHeading()).toContain('File Uploaded!');
    expect(await fileUploadPage.getUploadedFileName()).toContain('sample-upload.txt');
  });
});

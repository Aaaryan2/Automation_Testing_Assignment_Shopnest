const { test, expect } = require('@playwright/test');

test.describe('DELETE /api/users/2', () => {
  test('deletes a user and returns 204 with an empty response body', async ({ request }) => {
    const response = await request.delete('/api/users/2');

    expect(response.status()).toBe(204);
    const body = await response.text();
    expect(body).toBe('');
  });
});

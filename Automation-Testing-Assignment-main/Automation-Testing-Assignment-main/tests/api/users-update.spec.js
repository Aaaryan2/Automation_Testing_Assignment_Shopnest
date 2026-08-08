const { test, expect } = require('@playwright/test');

test.describe('PUT /api/users/2', () => {
  test('updates a user record and returns all fields correctly', async ({ request }) => {
    const payload = { name: 'Priya Sharma', job: 'QA Automation Engineer' };

    const response = await request.put('/api/users/2', { data: payload });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('updatedAt');
    expect(typeof body.updatedAt).toBe('string');
    expect(new Date(body.updatedAt).toString()).not.toBe('Invalid Date');
  });
});

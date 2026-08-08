const { test, expect } = require('@playwright/test');

test.describe('GET /api/users?page=2', () => {
  test('response matches expected schema and field data types', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.page).toBe(2);
    expect(typeof body.per_page).toBe('number');
    expect(typeof body.total).toBe('number');
    expect(typeof body.total_pages).toBe('number');
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);

    for (const user of body.data) {
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
      expect(typeof user.avatar).toBe('string');
      expect(user.avatar).toMatch(/^https?:\/\//);
    }

    expect(body.support).toHaveProperty('url');
    expect(body.support).toHaveProperty('text');
  });
});

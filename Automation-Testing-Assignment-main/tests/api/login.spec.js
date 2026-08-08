const { test, expect } = require('@playwright/test');

test.describe('POST /api/login', () => {
  test('successful login returns 200 with a token', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('missing password returns 400 with an error message', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: { email: 'eve.holt@reqres.in' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();

    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Missing password');
  });
});

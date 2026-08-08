const { test, expect } = require('@playwright/test');

test.describe('POST /api/register', () => {
  test('valid registration returns 200 with an id and token', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: { email: 'eve.holt@reqres.in', password: 'pistol' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');
    expect(typeof body.id).toBe('number');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('missing password returns 400 with an error message', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: { email: 'eve.holt@reqres.in' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();

    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Missing password');
  });

  test('missing email returns 400 with an error message', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: { password: 'pistol' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();

    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Missing email or username');
  });
});

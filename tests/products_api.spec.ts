import { test, expect } from '@playwright/test';

test('list of products', async ({ request }) => {
  const response = await request.get('https://fakestoreapi.com/products');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const products = await response.json();

  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
  expect(products[0]).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    price: expect.any(Number),
    category: expect.any(String),
    image: expect.any(String),
    rating: expect.objectContaining({
      rate: expect.any(Number),
      count: expect.any(Number),
    }),
  });

  console.log(`Products returned: ${products.length}`);
  for(let i=0; i<products.length; i++) {
    console.log(`Product ${i + 1}:`, JSON.stringify(products[i], null, 2));
  }
});

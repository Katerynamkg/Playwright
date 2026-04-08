import { test, expect } from "../utils/fixtures/apiClient.ts";

test.describe('Cars API', () => {

  test('Create car - positive', async ({ apiClient }) => {
    const response = await apiClient.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 1000
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.data.carBrandId).toBe(1);
  });
  test('Create car - without mileage', async ({ apiClient }) => {
  const response = await apiClient.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1
    }
  });

  expect(response.status()).toBe(400);
});

});
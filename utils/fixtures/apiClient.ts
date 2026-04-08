import { test as base, request, APIRequestContext } from '@playwright/test';

type ApiFixtures = {
  apiClient: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: 'https://qauto.forstudy.space',
      storageState: './test-data/states/auth-state.json',
    });

    await use(apiContext);
    await apiContext.dispose();
  },
});

export { expect } from '@playwright/test';
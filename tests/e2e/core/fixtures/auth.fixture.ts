import { expect, test as base } from '@playwright/test';

const AUTH_SESSION_STORAGE_KEY = 'auth-session';

export const test = base.extend({
  page: async ({ page }, runPageFixture) => {
    await page.addInitScript((storageKey) => {
      window.localStorage.removeItem(storageKey);
    }, AUTH_SESSION_STORAGE_KEY);

    await runPageFixture(page);
  },
});

export { expect };

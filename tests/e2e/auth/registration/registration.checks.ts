import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

import { authRoutes } from '../../core/helpers/route.helper';

export const expectAppPageOpened = async (page: Page) => {
  await expect(page).toHaveURL(new RegExp(`${authRoutes.app}$`));
  await expect(page.getByRole('heading', { name: 'Вы залогинены' })).toBeVisible();
};

export const expectRegistrationError = async (page: Page, text: string) => {
  await expect(page.getByRole('alert').filter({ hasText: text })).toHaveCount(1);
};

export const expectRegistrationPasswordError = async (page: Page, text: string) => {
  await expect(page.getByRole('alert').filter({ hasText: text })).toHaveCount(2);
};

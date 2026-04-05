import type { Page } from '@playwright/test';

import { authRoutes, openRoute } from '../../core/helpers/route.helper';

export const openForgotPasswordPage = async (page: Page) => {
  await openRoute(page, authRoutes.forgotPassword);
};

export const fillForgotPasswordForm = async (page: Page, email: string) => {
  await page.getByLabel('E-mail').fill(email);
};

export const submitForgotPasswordForm = async (page: Page) => {
  await page.getByRole('button', { name: 'Восстановить пароль' }).click();
};

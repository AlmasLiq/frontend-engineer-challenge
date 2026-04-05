import type { Page } from '@playwright/test';

import { authRoutes, openRoute } from '../../core/helpers/route.helper';
import type { LoginCredentials } from '../../core/types/auth.types';

export const openLoginPage = async (page: Page) => {
  await openRoute(page, authRoutes.login);
};

export const fillLoginForm = async (page: Page, data: LoginCredentials) => {
  await page.getByLabel('E-mail').fill(data.email);
  await page.getByLabel('Пароль').fill(data.password);
};

export const submitLoginForm = async (page: Page) => {
  await page.getByRole('button', { name: 'Войти' }).click();
};

import type { Page } from '@playwright/test';

import { authRoutes, openRoute } from '../../core/helpers/route.helper';
import type { RegistrationData } from '../../core/types/auth.types';

export const openRegistrationPage = async (page: Page) => {
  await openRoute(page, authRoutes.register);
};

export const fillRegistrationForm = async (page: Page, data: RegistrationData) => {
  await page.getByLabel('E-mail', { exact: true }).fill(data.email);
  await page.getByLabel('Пароль', { exact: true }).fill(data.password);
  await page.getByLabel('Повторите пароль', { exact: true }).fill(data.confirmPassword);
};

export const submitRegistrationForm = async (page: Page) => {
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
};

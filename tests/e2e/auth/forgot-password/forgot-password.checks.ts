import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export const expectForgotPasswordError = async (page: Page, text: string) => {
  await expect(page.getByRole('alert').filter({ hasText: text })).toHaveCount(1);
};

export const expectForgotPasswordSuccess = async (page: Page) => {
  await expect(
    page.getByRole('heading', { name: 'Проверьте свою почту' }),
  ).toBeVisible();
  await expect(page.getByText('Мы отправили на почту письмо с ссылкой для восстановления пароля')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Назад в авторизацию' })).toBeVisible();
};

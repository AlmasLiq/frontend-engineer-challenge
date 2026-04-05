import type { Page } from '@playwright/test';

export const authRoutes = {
  app: '/app',
  forgotPassword: '/forgot-password',
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
} as const;

export const openRoute = async (page: Page, route: string) => {
  await page.goto(route);
};

import {
  fillForgotPasswordForm,
  openForgotPasswordPage,
  submitForgotPasswordForm,
} from './forgot-password.actions';
import {
  expectForgotPasswordError,
  expectForgotPasswordSuccess,
} from './forgot-password.checks';
import {
  mockForgotPasswordSuccess,
  mockForgotPasswordTooManyAttempts,
  mockForgotPasswordUnknownError,
  validForgotPasswordEmail,
} from './forgot-password.mocks';
import { AuthUiErrorMessage } from '../../core/enums/auth-errors.enum';
import { test } from '../../core/fixtures/auth.fixture';

test.describe('Forgot password', () => {
  test('Forgot password: submit email and show success state', async ({ page }) => {
    await mockForgotPasswordSuccess(page);

    await openForgotPasswordPage(page);
    await fillForgotPasswordForm(page, validForgotPasswordEmail);
    await submitForgotPasswordForm(page);

    await expectForgotPasswordSuccess(page);
  });

  test('Forgot password: show rate limit error after too many attempts', async ({ page }) => {
    await mockForgotPasswordTooManyAttempts(page);

    await openForgotPasswordPage(page);
    await fillForgotPasswordForm(page, validForgotPasswordEmail);
    await submitForgotPasswordForm(page);

    await expectForgotPasswordError(page, AuthUiErrorMessage.ForgotPasswordTooManyAttempts);
  });

  test('Forgot password: show fallback when backend returns unknown error', async ({ page }) => {
    await mockForgotPasswordUnknownError(page);

    await openForgotPasswordPage(page);
    await fillForgotPasswordForm(page, validForgotPasswordEmail);
    await submitForgotPasswordForm(page);

    await expectForgotPasswordError(page, AuthUiErrorMessage.Unknown);
  });
});

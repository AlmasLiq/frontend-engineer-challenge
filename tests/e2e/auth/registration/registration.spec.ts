import { fillRegistrationForm, openRegistrationPage, submitRegistrationForm } from './registration.actions';
import {
  expectAppPageOpened,
  expectRegistrationError,
  expectRegistrationPasswordError,
} from './registration.checks';
import {
  mockRegistrationEmailTaken,
  mockRegistrationInvalidEmail,
  mockRegistrationInvalidPassword,
  mockRegistrationSuccess,
  mockRegistrationTooManyAttempts,
  mockRegistrationUnknownError,
  validRegistrationData,
} from './registration.mocks';
import { AuthUiErrorMessage } from '../../core/enums/auth-errors.enum';
import { test } from '../../core/fixtures/auth.fixture';

test.describe('Registration', () => {
  test('Registration: submit valid data, login user, and redirect to app', async ({ page }) => {
    await mockRegistrationSuccess(page);

    await openRegistrationPage(page);
    await fillRegistrationForm(page, validRegistrationData);
    await submitRegistrationForm(page);

    await expectAppPageOpened(page);
  });

  test('Registration: show email error when email is already taken', async ({ page }) => {
    await mockRegistrationEmailTaken(page);

    await openRegistrationPage(page);
    await fillRegistrationForm(page, validRegistrationData);
    await submitRegistrationForm(page);

    await expectRegistrationError(page, AuthUiErrorMessage.RegisterEmailAlreadyTaken);
  });

  test('Registration: show email error when backend rejects email', async ({ page }) => {
    await mockRegistrationInvalidEmail(page);

    await openRegistrationPage(page);
    await fillRegistrationForm(page, validRegistrationData);
    await submitRegistrationForm(page);

    await expectRegistrationError(page, AuthUiErrorMessage.RegisterInvalidEmail);
  });

  test('Registration: show password errors when backend rejects password', async ({ page }) => {
    await mockRegistrationInvalidPassword(page);

    await openRegistrationPage(page);
    await fillRegistrationForm(page, validRegistrationData);
    await submitRegistrationForm(page);

    await expectRegistrationPasswordError(page, AuthUiErrorMessage.RegisterInvalidPassword);
  });

  test('Registration: show rate limit error after too many attempts', async ({ page }) => {
    await mockRegistrationTooManyAttempts(page);

    await openRegistrationPage(page);
    await fillRegistrationForm(page, validRegistrationData);
    await submitRegistrationForm(page);

    await expectRegistrationError(page, AuthUiErrorMessage.RegisterTooManyAttempts);
  });

  test('Registration: show fallback when backend returns unknown error', async ({ page }) => {
    await mockRegistrationUnknownError(page);

    await openRegistrationPage(page);
    await fillRegistrationForm(page, validRegistrationData);
    await submitRegistrationForm(page);

    await expectRegistrationError(page, AuthUiErrorMessage.Unknown);
  });
});

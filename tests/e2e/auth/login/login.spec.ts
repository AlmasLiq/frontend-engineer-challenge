import { fillLoginForm, openLoginPage, submitLoginForm } from './login.actions';
import { expectAppPageOpened, expectLoginError } from './login.checks';
import {
  mockLoginInactiveAccount,
  mockLoginInvalidCredentials,
  mockLoginSuccess,
  mockLoginTooManyAttempts,
  mockLoginUnknownError,
  validLoginData,
} from './login.mocks';
import { AuthUiErrorMessage } from '../../core/enums/auth-errors.enum';
import { test } from '../../core/fixtures/auth.fixture';

test.describe('Login', () => {
  test('Login: submit valid credentials and redirect to app', async ({ page }) => {
    await mockLoginSuccess(page);

    await openLoginPage(page);
    await fillLoginForm(page, validLoginData);
    await submitLoginForm(page);

    await expectAppPageOpened(page);
  });

  test('Login: show error when credentials are invalid', async ({ page }) => {
    await mockLoginInvalidCredentials(page);

    await openLoginPage(page);
    await fillLoginForm(page, validLoginData);
    await submitLoginForm(page);

    await expectLoginError(page, AuthUiErrorMessage.LoginInvalidCredentials);
  });

  test('Login: show error when account is not active', async ({ page }) => {
    await mockLoginInactiveAccount(page);

    await openLoginPage(page);
    await fillLoginForm(page, validLoginData);
    await submitLoginForm(page);

    await expectLoginError(page, AuthUiErrorMessage.LoginInactiveAccount);
  });

  test('Login: show rate limit error after too many attempts', async ({ page }) => {
    await mockLoginTooManyAttempts(page);

    await openLoginPage(page);
    await fillLoginForm(page, validLoginData);
    await submitLoginForm(page);

    await expectLoginError(page, AuthUiErrorMessage.LoginTooManyAttempts);
  });

  test('Login: show fallback when backend returns unknown error', async ({ page }) => {
    await mockLoginUnknownError(page);

    await openLoginPage(page);
    await fillLoginForm(page, validLoginData);
    await submitLoginForm(page);

    await expectLoginError(page, AuthUiErrorMessage.Unknown);
  });
});

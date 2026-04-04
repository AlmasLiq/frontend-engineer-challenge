import { getApiErrorMessage } from '@/shared/api/error';

export type AuthApiErrorField =
  | 'root'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'newPassword'
  | 'token';

export type AuthApiErrorEntry = {
  field: AuthApiErrorField;
  message: string;
};

type AuthApiErrorFlow = 'login' | 'register' | 'forgotPassword' | 'resetPassword';

const authApiErrorFallbackMessageMap: Record<AuthApiErrorFlow, string> = {
  forgotPassword: 'Не удалось запросить сброс пароля.',
  login: 'Не удалось войти. Попробуйте еще раз.',
  register: 'Не удалось завершить регистрацию.',
  resetPassword: 'Не удалось обновить пароль.',
};

export const mapAuthApiError = (
  flow: AuthApiErrorFlow,
  error: unknown,
): AuthApiErrorEntry[] => {
  const message = getApiErrorMessage(error, authApiErrorFallbackMessageMap[flow]);

  switch (flow) {
    case 'login':
      if (message === 'invalid credentials') {
        return [{ field: 'root', message: 'Неверный e-mail или пароль.' }];
      }

      if (message === 'account is not active') {
        return [{ field: 'root', message: 'Аккаунт недоступен для входа.' }];
      }

      if (message === 'too many login attempts, please try again later') {
        return [{ field: 'root', message: 'Слишком много попыток входа. Попробуйте позже.' }];
      }

      return [{ field: 'root', message }];

    case 'register':
      if (message === 'email already registered') {
        return [{ field: 'email', message: 'Данный адрес почты занят.' }];
      }

      if (message.startsWith('invalid email:')) {
        return [{ field: 'email', message: 'Недопустимый адрес' }];
      }

      if (message.startsWith('invalid password:')) {
        return [
          { field: 'password', message: 'Пароль не соответствует требованиям.' },
          { field: 'confirmPassword', message: 'Пароль не соответствует требованиям.' },
        ];
      }

      if (message === 'too many registration attempts, please try again later') {
        return [{ field: 'root', message: 'Слишком много попыток регистрации. Попробуйте позже.' }];
      }

      return [{ field: 'root', message }];

    case 'forgotPassword':
      return [{ field: 'root', message }];

    case 'resetPassword':
      if (message.startsWith('invalid email:')) {
        return [{ field: 'email', message: 'Недопустимый адрес' }];
      }

      if (message.startsWith('invalid password:')) {
        return [{ field: 'newPassword', message: 'Пароль не соответствует требованиям.' }];
      }

      return [{ field: 'root', message }];
  }
};

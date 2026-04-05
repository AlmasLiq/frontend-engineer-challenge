import { getApiErrorMessage } from '@/shared/api/error';

type AuthApiErrorFieldMap = {
  forgotPassword: 'email';
  login: 'password';
  register: 'email' | 'password' | 'confirmPassword';
  resetPassword: 'newPassword' | 'confirmPassword';
};

type AuthApiErrorFlow = keyof AuthApiErrorFieldMap;

export type AuthApiErrorEntry<TField extends string = string> = {
  field: TField;
  message: string;
};

const authApiErrorFallbackMessageMap: Record<AuthApiErrorFlow, string> = {
  forgotPassword: 'Не удалось запросить сброс пароля.',
  login: 'Не удалось войти. Попробуйте еще раз.',
  register: 'Не удалось завершить регистрацию.',
  resetPassword: 'Не удалось обновить пароль.',
};

export const mapAuthApiError = <TFlow extends AuthApiErrorFlow>(
  flow: TFlow,
  error: unknown,
): AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[] => {
  const message = getApiErrorMessage(error, authApiErrorFallbackMessageMap[flow]);

  switch (flow) {
    case 'login':
      if (message === 'invalid credentials') {
        return [{ field: 'password', message: 'Введены неправильные данные' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      if (message === 'account is not active') {
        return [{ field: 'password', message: 'Аккаунт недоступен для входа.' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      if (message === 'too many login attempts, please try again later') {
        return [{ field: 'password', message: 'Слишком много попыток входа. Попробуйте позже.' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      return [{ field: 'password', message }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];

    case 'register':
      if (message === 'email already registered') {
        return [{ field: 'email', message: 'Данный адрес уже занят.' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      if (message.startsWith('invalid email:')) {
        return [{ field: 'email', message: 'Недопустимый адрес почты' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      if (message.startsWith('invalid password:')) {
        return [
          { field: 'password', message: 'Пароль не соответствует требованиям.' },
          { field: 'confirmPassword', message: 'Пароль не соответствует требованиям.' },
        ] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      if (message === 'too many registration attempts, please try again later') {
        return [{ field: 'email', message: 'Слишком много попыток регистрации. Попробуйте позже.' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      return [{ field: 'email', message }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];

    case 'forgotPassword':
      if (message === 'too many reset attempts, please try again later') {
        return [{ field: 'email', message: 'Слишком много попыток восстановления. Попробуйте позже.' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      return [{ field: 'email', message }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];

    case 'resetPassword':
      if (message.startsWith('invalid password:')) {
        return [{ field: 'newPassword', message: 'Пароль не соответствует требованиям.' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      if (
        message.includes('invalid reset token') ||
        message.includes('expired or already used') ||
        message.includes('no reset token issued') ||
        message === 'invalid reset request'
      ) {
        return [{ field: 'newPassword', message: 'Ссылка для восстановления недействительна.' }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
      }

      return [{ field: 'newPassword', message }] as AuthApiErrorEntry<AuthApiErrorFieldMap[TFlow]>[];
  }

  return (() => {
    throw new Error(`Unexpected auth flow: ${String(flow)}`);
  })();
};

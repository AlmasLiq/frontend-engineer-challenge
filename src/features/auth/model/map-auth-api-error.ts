import { getApiErrorMessage } from '@/shared/api/error';

type AuthApiErrorFlow = 'forgotPassword' | 'login' | 'register' | 'resetPassword';

export type AuthApiErrorEntry = {
  field: string;
  message: string;
};

const unknownAuthApiErrorMessage = 'Что-то пошло не так. Попробуйте еще раз.';

const authApiErrorFieldMap: Record<AuthApiErrorFlow, string> = {
  forgotPassword: 'email',
  login: 'password',
  register: 'email',
  resetPassword: 'newPassword',
};

export const mapAuthApiError = (
  flow: AuthApiErrorFlow,
  error: unknown,
): AuthApiErrorEntry[] => {
  const message = getApiErrorMessage(error, '');

  switch (flow) {
    case 'login':
      if (message === 'invalid credentials') {
        return [{ field: 'password', message: 'Введены неправильные данные' }];
      }

      if (message === 'account is not active') {
        return [{ field: 'password', message: 'Аккаунт недоступен для входа.' }];
      }

      if (message === 'too many login attempts, please try again later') {
        return [{ field: 'password', message: 'Слишком много попыток входа. Попробуйте позже.' }];
      }

      break;

    case 'register':
      if (message === 'email already registered') {
        return [{ field: 'email', message: 'Данный адрес уже занят.' }];
      }

      if (message.startsWith('invalid email:')) {
        return [{ field: 'email', message: 'Недопустимый адрес почты' }];
      }

      if (message.startsWith('invalid password:')) {
        return [
          { field: 'password', message: 'Пароль не соответствует требованиям.' },
          { field: 'confirmPassword', message: 'Пароль не соответствует требованиям.' },
        ];
      }

      if (message === 'too many registration attempts, please try again later') {
        return [{ field: 'email', message: 'Слишком много попыток регистрации. Попробуйте позже.' }];
      }

      break;

    case 'forgotPassword':
      if (message === 'too many reset attempts, please try again later') {
        return [{ field: 'email', message: 'Слишком много попыток восстановления. Попробуйте позже.' }];
      }

      break;

    case 'resetPassword':
      if (message.startsWith('invalid password:')) {
        return [{ field: 'newPassword', message: 'Пароль не соответствует требованиям.' }];
      }

      if (
        message.includes('invalid reset token') ||
        message.includes('expired or already used') ||
        message.includes('no reset token issued') ||
        message === 'invalid reset request'
      ) {
        return [{ field: 'newPassword', message: 'Ссылка для восстановления недействительна.' }];
      }

      break;
  }

  return [{ field: authApiErrorFieldMap[flow], message: unknownAuthApiErrorMessage }];
};

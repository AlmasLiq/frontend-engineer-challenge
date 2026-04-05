export enum AuthApiErrorCode {
  AccountIsNotActive = 'account is not active',
  EmailAlreadyRegistered = 'email already registered',
  InvalidCredentials = 'invalid credentials',
  InvalidEmail = 'invalid email:',
  InvalidPassword = 'invalid password:',
  TooManyLoginAttempts = 'too many login attempts, please try again later',
  TooManyRegistrationAttempts = 'too many registration attempts, please try again later',
  TooManyResetAttempts = 'too many reset attempts, please try again later',
  Unknown = 'unknown auth error',
}

export enum AuthUiErrorMessage {
  LoginInvalidCredentials = 'Введены неправильные данные',
  LoginInactiveAccount = 'Аккаунт недоступен для входа.',
  LoginTooManyAttempts = 'Слишком много попыток входа. Попробуйте позже.',
  RegisterEmailAlreadyTaken = 'Данный адрес уже занят.',
  RegisterInvalidEmail = 'Недопустимый адрес почты',
  RegisterInvalidPassword = 'Пароль не соответствует требованиям.',
  RegisterTooManyAttempts = 'Слишком много попыток регистрации. Попробуйте позже.',
  ForgotPasswordTooManyAttempts = 'Слишком много попыток восстановления. Попробуйте позже.',
  Unknown = 'Что-то пошло не так. Попробуйте еще раз.',
}

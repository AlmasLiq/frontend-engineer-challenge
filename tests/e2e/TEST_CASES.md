# E2E Test Cases

Этот файл описывает текущий e2e-набор для auth flow в `frontend-engineer-challenge`.

## Scope

Покрываются только три пользовательских сценария:

- `login`
- `registration`
- `forgot-password`

Все e2e-тесты используют mocked GraphQL и проверяют поведение frontend-приложения при успешных и ошибочных ответах backend.

## Login

Spec: [auth/login/login.spec.ts](./auth/login/login.spec.ts)

### `Login: submit valid credentials and redirect to app`

Что проверяет:

- пользователь открывает `/login`
- вводит валидные `email` и `password`
- отправляет форму
- frontend сохраняет сессию и переводит пользователя на `/app`

Ожидаемый результат:

- открывается страница приложения
- виден заголовок `Вы залогинены`

### `Login: show error when credentials are invalid`

Что проверяет:

- пользователь отправляет валидно заполненную форму логина
- backend возвращает ошибку `invalid credentials`

Ожидаемый результат:

- на форме показывается сообщение `Введены неправильные данные`

### `Login: show error when account is not active`

Что проверяет:

- пользователь отправляет форму логина
- backend возвращает ошибку `account is not active`

Ожидаемый результат:

- на форме показывается сообщение `Аккаунт недоступен для входа.`

### `Login: show rate limit error after too many attempts`

Что проверяет:

- пользователь отправляет форму логина
- backend возвращает ошибку `too many login attempts, please try again later`

Ожидаемый результат:

- на форме показывается сообщение `Слишком много попыток входа. Попробуйте позже.`

### `Login: show fallback when backend returns unknown error`

Что проверяет:

- пользователь отправляет форму логина
- backend возвращает неизвестную ошибку

Ожидаемый результат:

- на форме показывается fallback-сообщение `Что-то пошло не так. Попробуйте еще раз.`

## Registration

Spec: [auth/registration/registration.spec.ts](./auth/registration/registration.spec.ts)

### `Registration: submit valid data, login user, and redirect to app`

Что проверяет:

- пользователь открывает `/register`
- вводит валидные `email`, `password`, `confirmPassword`
- отправляет форму
- backend успешно регистрирует пользователя
- после регистрации frontend логинит пользователя
- пользователь переводится на `/app`

Ожидаемый результат:

- открывается страница приложения
- виден заголовок `Вы залогинены`

### `Registration: show email error when email is already taken`

Что проверяет:

- пользователь отправляет форму регистрации
- backend возвращает ошибку `email already registered`

Ожидаемый результат:

- на поле `email` показывается сообщение `Данный адрес уже занят.`

### `Registration: show email error when backend rejects email`

Что проверяет:

- пользователь отправляет форму регистрации
- backend возвращает ошибку вида `invalid email: ...`

Ожидаемый результат:

- на поле `email` показывается сообщение `Недопустимый адрес почты`

### `Registration: show password errors when backend rejects password`

Что проверяет:

- пользователь отправляет форму регистрации
- backend возвращает ошибку вида `invalid password: ...`

Ожидаемый результат:

- сообщение `Пароль не соответствует требованиям.` показывается для поля `password`
- это же сообщение показывается для поля `confirmPassword`

### `Registration: show rate limit error after too many attempts`

Что проверяет:

- пользователь отправляет форму регистрации
- backend возвращает ошибку `too many registration attempts, please try again later`

Ожидаемый результат:

- на форме показывается сообщение `Слишком много попыток регистрации. Попробуйте позже.`

### `Registration: show fallback when backend returns unknown error`

Что проверяет:

- пользователь отправляет форму регистрации
- backend возвращает неизвестную ошибку

Ожидаемый результат:

- на форме показывается fallback-сообщение `Что-то пошло не так. Попробуйте еще раз.`

## Forgot Password

Spec: [auth/forgot-password/forgot-password.spec.ts](./auth/forgot-password/forgot-password.spec.ts)

### `Forgot password: submit email and show success state`

Что проверяет:

- пользователь открывает `/forgot-password`
- вводит email
- отправляет форму
- backend успешно создаёт reset request

Ожидаемый результат:

- появляется success state
- виден заголовок `Проверьте свою почту`
- виден текст про письмо для восстановления пароля
- видна ссылка `Назад в авторизацию`

Примечание:

- страница дополнительно умеет делать auto-redirect на `/reset-password`
- этот тест фиксирует именно success state как основной happy path

### `Forgot password: show rate limit error after too many attempts`

Что проверяет:

- пользователь отправляет форму восстановления
- backend возвращает ошибку `too many reset attempts, please try again later`

Ожидаемый результат:

- на форме показывается сообщение `Слишком много попыток восстановления. Попробуйте позже.`

### `Forgot password: show fallback when backend returns unknown error`

Что проверяет:

- пользователь отправляет форму восстановления
- backend возвращает неизвестную ошибку

Ожидаемый результат:

- на форме показывается fallback-сообщение `Что-то пошло не так. Попробуйте еще раз.`

## Current Total

- `login`: 5 тестов
- `registration`: 6 тестов
- `forgot-password`: 3 теста
- всего: 14 e2e-тестов

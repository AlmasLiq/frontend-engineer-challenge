# E2E Test Architecture

## Goal

Сделать e2e только для auth-флоу.

Набор делим на 3 сценария:

- `login`
- `registration`
- `forgot-password`

Для каждого сценария покрываем:

- рабочий happy path
- основные error cases

## Main Principle

Тест должен читаться как сценарий пользователя, а не как набор низкоуровневых Playwright-команд.

Внутри spec я хочу видеть вызовы уровня:

```ts
test('Login: submit valid credentials and redirect to app', async ({ page }) => {
  await openLoginPage(page)
  await fillLoginForm(page, validLoginData)
  await submitLoginForm(page)

  await expectAppPageOpened(page)
})
```

А не длинную простыню из `locator`, `click`, `fill`, `textContent`.

## Proposed Structure

```text
tests/
  e2e/
    architecture/
      README.md
    core/
      enums/
        auth-errors.enum.ts
      helpers/
        graphql.helper.ts
        route.helper.ts
      fixtures/
        auth.fixture.ts
      types/
        auth.types.ts
    auth/
      login/
        login.spec.ts
        login.actions.ts
        login.checks.ts
        login.mocks.ts
      registration/
        registration.spec.ts
        registration.actions.ts
        registration.checks.ts
        registration.mocks.ts
      forgot-password/
        forgot-password.spec.ts
        forgot-password.actions.ts
        forgot-password.checks.ts
        forgot-password.mocks.ts
```

## Separation Of Responsibility

## `core/`

Тут лежит только то, что реально общее между несколькими auth-сценариями.

Например:

- enum-ы
- shared types
- общие Playwright helpers
- route interception helpers
- общие fixture-утилиты

Тут не должно быть login-specific / registration-specific / forgot-password-specific действий и проверок.

То есть `core` не знает ничего про конкретный сценарий, кроме самых общих вещей.

## `auth/login/`

Тут лежит все, что относится только к логину:

- `login.spec.ts`
- `login.actions.ts`
- `login.checks.ts`
- `login.mocks.ts`

## `auth/registration/`

Тут лежит все, что относится только к регистрации:

- `registration.spec.ts`
- `registration.actions.ts`
- `registration.checks.ts`
- `registration.mocks.ts`

## `auth/forgot-password/`

Тут лежит все, что относится только к восстановлению пароля:

- `forgot-password.spec.ts`
- `forgot-password.actions.ts`
- `forgot-password.checks.ts`
- `forgot-password.mocks.ts`

## Why I Want It This Way

Если разработчик открывает папку сценария, он сразу видит весь комплект рядом:

- сценарии
- действия
- проверки
- моки

И ему не нужно прыгать между абстрактными слоями по всей директории.

При этом общий код не размазывается по сценариям, а лежит в `core`.

## Actions

`actions` это только действия пользователя.

Примеры для `login.actions.ts`:

- `openLoginPage(page)`
- `fillLoginForm(page, data)`
- `submitLoginForm(page)`

Примеры для `registration.actions.ts`:

- `openRegistrationPage(page)`
- `fillRegistrationForm(page, data)`
- `submitRegistrationForm(page)`

Примеры для `forgot-password.actions.ts`:

- `openForgotPasswordPage(page)`
- `fillForgotPasswordForm(page, email)`
- `submitForgotPasswordForm(page)`

В `actions` не должно быть assertions.

## Checks

`checks` это только проверки.

Примеры для `login.checks.ts`:

- `expectLoginError(page, text)`
- `expectLoginSubmitDisabled(page)`
- `expectAppPageOpened(page)`

Примеры для `registration.checks.ts`:

- `expectRegistrationError(page, text)`
- `expectRegistrationPasswordError(page, text)`
- `expectRegistrationSubmitDisabled(page)`

Примеры для `forgot-password.checks.ts`:

- `expectForgotPasswordError(page, text)`
- `expectForgotPasswordSuccess(page)`

В `checks` не должно быть действий.

## Mocks

`mocks` тоже лежат рядом со сценарием, если они сценарно-специфичны.

Например:

- `login.mocks.ts`
- `registration.mocks.ts`
- `forgot-password.mocks.ts`

Если позже появится полностью общий GraphQL helper, он остается в `core/helpers/`, но сценарные моки я бы все равно держал рядом со сценарием, чтобы было проще читать и поддерживать.

## Test Design Rules

### 1. Spec reads like a scenario

Пример:

```ts
test('Registration: show email error when email is already taken', async ({ page }) => {
  await mockRegistrationEmailTaken(page)

  await openRegistrationPage(page)
  await fillRegistrationForm(page, validRegistrationData)
  await submitRegistrationForm(page)

  await expectRegistrationError(page, 'Данный адрес уже занят.')
})
```

### 2. No mixed helpers

Не делать функции, которые одновременно:

- кликают
- ждут
- ассертят

Если функция делает действие, это `action`.
Если функция проверяет результат, это `check`.

### 3. Core only for shared code

Если код нужен только `login`, он не должен жить в `core`.

Если код нужен нескольким сценариям, тогда да, выносим в `core`.

## Scenarios

## 1. Login

### Happy path

- пользователь открывает `/login`
- вводит валидные credentials
- отправляет форму
- приложение редиректит на `/app`

### Error cases

- `invalid credentials`
- `account is not active`
- `too many login attempts, please try again later`
- unknown error fallback

## 2. Registration

### Happy path

- пользователь открывает `/register`
- вводит валидные данные
- отправляет форму
- регистрация проходит успешно
- приложение логинит пользователя и редиректит на `/app`

### Error cases

- `email already registered`
- `invalid email`
- `invalid password`
- `too many registration attempts, please try again later`
- unknown error fallback

## 3. Forgot Password

### Happy path

- пользователь открывает `/forgot-password`
- вводит email
- отправляет форму
- видит success state

Если текущая реализация оставляет auto-redirect на reset-password, это можно проверять отдельным тестом, но базовым happy path я считаю именно success state.

### Error cases

- `too many reset attempts, please try again later`
- unknown error fallback

## Mocking Strategy

Основной e2e suite я предлагаю строить на mocked GraphQL.

Причина:

- стабильнее
- меньше flaky
- проще воспроизводить ошибки
- лучше покрывает frontend handling

При этом техническая база для route interception лежит в `core/helpers/`, а сами сценарные mock functions лежат рядом с соответствующим сценарием.

## What I Want In Specs

Я хочу, чтобы разработчик открывал spec и видел сценарий.

Пример:

```ts
test('Forgot password: show fallback when backend returns unknown error', async ({ page }) => {
  await mockForgotPasswordUnknownError(page)

  await openForgotPasswordPage(page)
  await fillForgotPasswordForm(page, 'user@example.com')
  await submitForgotPasswordForm(page)

  await expectForgotPasswordError(page, 'Что-то пошло не так. Попробуйте еще раз.')
})
```

То есть из теста сразу понятно:

- какой продуктовый кейс идет
- какие действия делает пользователь
- что считаем корректным результатом

## Non-goals

На этом этапе я не предлагаю:

- отдельный smoke layer
- общий actions/checks слой для всех сценариев
- сложный page object framework
- screenshot regression tests
- большой shared framework
- полный e2e suite на реальном backend

## Open Questions

1. Для `forgot-password` happy path фиксируем только success state или еще и auto-redirect?
2. Unknown fallback тестируем во всех трех сценариях или достаточно по одному кейсу на каждый spec-файл?
3. Нужен ли общий набор `valid payloads` в `core`, или держим тестовые данные рядом с каждым сценарием?

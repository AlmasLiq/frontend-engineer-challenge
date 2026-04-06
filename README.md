# Honest Opinion
Учитывая специфику вакансии, и ее описания, думаю уместным будет тут описать проект и его структуру мне в вольной форме,
вместо очередного AI-generated ридми. Но для полноты я таковой тоже прикреплю.
Проект имеет дефолтный современный стек в эко-системе React. Выбран он в пользу того, что у меня наибольшая экспертиза
в нем. Учитывая специфику приложение, и того, что это пока что простой аутх флоу, Next для меня кажется сильным
овер-инжениренгом для такой задачи, поэтому выбор остановился на просто React. Танстак как удобный способ коммуникации
с беком. Учитывая опять же маленькие масштабы проекта я сделал выбор в пользу него вместо Apollo GraphQL.
Без какого-либо глобального стейт менеджера, всего предоставляемого Реактом и Танстаком хватает для удобного менеджинга.
Все это покрывается FSD. Для такого микро-проекта я думаю это оверхед, но он очень удобен в будущем масштабировании
для четкого разграничивания слоев приложение, а не "размазывания" логики по всему проекту. +Его стандарты дают
быстрый вход в контекст проекта новым разрабам. Для тестирования покрыл e2e тестами. В идеале дальше добавить юнит тесты
Хотел бы добавить, что тестовое интересное, ибо как я понимаю проверяет не просто кто лучше напишет аутх модуль, а как
лучше всего задать фундамент проекта с будущим масштабированием. Вообщем лайк. Везде бы такие штуки, и качество специалистов
только росло бы. Надеюсь свяжитесь со мной :)

# Frontend Engineer Challenge

Frontend для auth-flow на основе дизайна Orbitto Service. В текущей версии реализованы 4 связанных сценария:

- регистрация
- авторизация
- восстановление пароля
- установка нового пароля по `email + token`

После успешного логина или регистрации пользователь попадает на `/app`. Сейчас это placeholder-страница, потому что фокус задачи ограничен auth-частью.

## Что внутри

- `login`
- `register`
- `forgot-password`
- `reset-password`
- обработка типовых backend-ошибок и fallback-сообщений
- адаптивный auth-layout для mobile и desktop
- минимальный unit smoke-test для layout
- e2e покрытие ключевых auth-сценариев

## Стек

- React 19
- TypeScript
- Vite
- React Router 7
- TanStack Query
- React Hook Form
- Zod
- GraphQL Request
- GraphQL Code Generator
- Tailwind CSS v4
- Vitest + Testing Library
- Playwright

## Запуск проекта

Нужны `Node.js 20+`, `npm 10+` и запущенный backend.

### Быстрый старт

```bash
npm install
npm run codegen
npm run dev
```

### Переменные окружения

По умолчанию frontend ходит в `http://localhost:8080/graphql`, поэтому `.env` можно не создавать, если backend запущен на этом адресе.

Если backend поднят на другом URL, создайте `.env`:

```env
VITE_API_URL=http://localhost:8080/graphql
```

### Команды

```bash
npm run codegen
npm run build
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
```

### Как запускать

1. Запустите backend.
2. Выполните `npm install`.
3. Выполните `npm run codegen`.
4. Выполните `npm run dev`.

## Ссылка на backend

- upstream backend challenge: [atls-academy/engineer-challenge](https://github.com/atls-academy/engineer-challenge)
- выбранный backend fork: [telman03/engineer-challenge](https://github.com/telman03/engineer-challenge)

Frontend ожидает GraphQL endpoint по адресу `http://localhost:8080/graphql`, что совпадает с локальным запуском выбранного backend fork.

## Backend-контракты и предположения

Frontend интегрирован через GraphQL-документы в `src/shared/api/graphql/operations`.

### Используемые операции

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
    user {
      id
      email
      status
    }
  }
}

mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    id
    email
    status
  }
}

mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(email: $email) {
    success
    token
  }
}

mutation ResetPassword($email: String!, $token: String!, $newPassword: String!) {
  resetPassword(email: $email, token: $token, newPassword: $newPassword)
}

query Me {
  me {
    id
    email
    status
  }
}
```

### Зафиксированные предположения

1. `login` возвращает `accessToken`, `refreshToken` и объект `user`.
2. `register` не логинит автоматически, поэтому frontend после успешной регистрации делает отдельный `login`.
3. `requestPasswordReset` в dev/demo-режиме возвращает `token`, чтобы фронт мог перевести пользователя на `/reset-password` без реальной почты.
4. Если `requestPasswordReset` вернул пустой `token`, frontend трактует это как отсутствие аккаунта с таким email.
5. `reset-password` экран ожидает `email` и `token` в query string.
6. Ошибки backend приходят в `errors[].message`, и именно текст сообщения используется для маппинга в UI.

### Обрабатываемые backend-ошибки

- `invalid credentials`
- `account is not active`
- `too many login attempts, please try again later`
- `email already registered`
- `invalid email: ...`
- `invalid password: ...`
- `too many registration attempts, please try again later`
- `too many reset attempts, please try again later`
- `invalid reset token`
- `expired or already used`
- `no reset token issued`
- `invalid reset request`

## Архитектура frontend

Использована слоистая структура с явным разделением ответственности:

```text
src/
  app/        # bootstrap, провайдеры, глобальные стили
  pages/      # route-level страницы и layout-оболочки
  features/   # пользовательские сценарии auth
  entities/   # session/viewer модели
  shared/     # ui-kit, api client, env, utils, assets
tests/
  e2e/        # сценарные e2e тесты
```

### Почему так

- `pages` отвечают за композицию экрана и роутинг.
- `features/auth/*` содержат форму, локальную валидацию, submit-логику и интеграцию с API для конкретного сценария.
- `entities/session` хранит модель сессии и работу с `localStorage`.
- `shared/api` инкапсулирует GraphQL client, error parsing и generated типы.
- `shared/ui` содержит переиспользуемые примитивы (`Button`, `Input`, `Logo`, `FormMessage`).

Это позволяет не складывать всё в абстрактные `components/` и `services/`, а держать код ближе к бизнес-сценарию.

## Реализованные UX-состояния

### Login

- client-side валидация email и пустого пароля
- disabled submit во время отправки
- ошибки backend на поле пароля
- redirect на `/app` после успеха

### Register

- client-side проверки email
- проверка совпадения паролей
- минимальная длина пароля на фронте
- обработка backend-ошибок email/password/rate limit
- автоматический login после успешной регистрации

### Forgot password

- валидация email
- success-state после запроса
- автоматический redirect на `/reset-password` через `2.5s`, если backend вернул token
- fallback для rate limit и unknown error

### Reset password

- проверка `newPassword` и `confirmPassword`
- валидация query params `email` и `token`
- success message после изменения пароля
- ссылка обратно на `/login`

## Сессия и защита роутов

- сессия хранится в `localStorage` под ключом `auth-session`
- если JSON в storage битый, запись удаляется
- `RedirectIfAuthenticated` не пускает авторизованного пользователя обратно на auth-страницы
- `RequireAuth` защищает `/app`

Текущий trade-off: защита роутов строится на наличии локальной сессии, а не на проверке `me` при старте приложения. Это быстрее и проще для тестового auth-flow, но в production я бы добавил bootstrap-запрос пользователя и стратегию refresh token.

## Доступность и UX-надёжность

- у полей есть label, даже если он визуально скрыт
- ошибки полей проброшены через `aria-invalid`, `aria-errormessage`, `role="alert"`
- success states используют `aria-live` / `role="status"`
- у интерактивных элементов есть `focus-visible` состояния
- кнопки блокируются на `isSubmitting`, что убирает повторные сабмиты в рамках одной формы

## Тесты

### E2E

Покрытие находится в `tests/e2e` и организовано по сценариям:

- `auth/login`
- `auth/registration`
- `auth/forgot-password`

Для каждого сценария тесты разделены на:

- `*.spec.ts` — продуктовый сценарий
- `*.actions.ts` — действия пользователя
- `*.checks.ts` — проверки
- `*.mocks.ts` — сценарные GraphQL моки

### Что покрыто e2e

- login happy path
- login invalid credentials
- login inactive account
- login rate limit
- login unknown error fallback
- registration happy path
- registration email already taken
- registration invalid email
- registration invalid password
- registration rate limit
- registration unknown error fallback
- forgot-password happy path
- forgot-password rate limit
- forgot-password unknown error fallback

### Как запускать тесты

```bash
npm run test
npm run test:e2e
```


### Почему TanStack Query только для mutations

Auth-задача почти полностью mutation-driven. В текущем объёме это даёт:

- единый контроль `loading/error/success`
- отключённый retry для мутаций, чтобы не создавать повторные auth-запросы
- возможность потом без перелома архитектуры добавить `me`, refresh и invalidation

### Почему typed GraphQL через codegen

- операции лежат рядом с проектом, а не строками в коде
- типы запроса/ответа генерируются из схемы
- изменение backend-контракта быстрее ловится на compile-time

## Trade-offs

1. `/app` пока оставлен placeholder-страницей, потому что задача ограничена auth-flow.
2. Сессия хранится в `localStorage` без refresh-механики и без silent re-auth.
3. Маппинг ошибок завязан на текст `message`, а не на стабильные коды. Для challenge это допустимо, но для production хрупко.
4. E2E построены на mocked GraphQL, а не на живом backend. Это повышает стабильность набора, но не заменяет контрактный smoke against real API.
5. `forgot-password` использует токен из ответа backend и редиректит сразу в reset flow. Это удобно для демо, но в реальном продукте чаще используется письмо.

## Что сделал бы следующим шагом для production

1. Добавил bootstrap `me` query, refresh token flow и logout.
2. Перевёл ошибки backend на коды, а не на сравнение строк.
3. Добавил интеграционные/contract тесты против реального backend.
4. Добавил telemetry: Sentry, request tracing, логирование auth-failures.
5. Вынес бы auth session в отдельный store/provider с политикой истечения токена.
6. Закрыл бы race conditions через abort/cancel strategy для устаревших запросов.
7. Добавил бы Storybook или отдельный UI-kit слой для auth-компонентов.

## Demo / screencast

- demo URL: не приложен в репозитории
- screencast URL: не приложен в репозитории

## Структура репозитория

```text
src/
  app/
  entities/
  features/
    auth/
      forgot-password/
      login/
      register/
      reset-password/
  pages/
    app/
    auth/
  shared/
    api/
    assets/
    config/
    lib/
    ui/
tests/
  e2e/
```

## Итог


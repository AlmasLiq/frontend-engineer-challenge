import type { Page } from '@playwright/test';

import {
  AuthApiErrorCode,
} from '../../core/enums/auth-errors.enum';
import { graphqlError, graphqlSuccess, mockGraphqlOperations } from '../../core/helpers/graphql.helper';
import type { LoginCredentials } from '../../core/types/auth.types';

export const validLoginData: LoginCredentials = {
  email: 'user@example.com',
  password: 'Password123!',
};

const buildLoginSuccessResponse = (email: string) =>
  graphqlSuccess({
    login: {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: {
        email,
        id: 'user-1',
        status: 'ACTIVE',
      },
    },
  });

export const mockLoginSuccess = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: ({ variables }) => buildLoginSuccessResponse(String(variables.email ?? validLoginData.email)),
      operationName: 'Login',
    },
  ]);
};

export const mockLoginInvalidCredentials = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.InvalidCredentials),
      operationName: 'Login',
    },
  ]);
};

export const mockLoginInactiveAccount = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.AccountIsNotActive),
      operationName: 'Login',
    },
  ]);
};

export const mockLoginTooManyAttempts = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.TooManyLoginAttempts),
      operationName: 'Login',
    },
  ]);
};

export const mockLoginUnknownError = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.Unknown),
      operationName: 'Login',
    },
  ]);
};

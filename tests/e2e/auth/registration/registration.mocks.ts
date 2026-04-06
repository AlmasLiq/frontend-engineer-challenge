import type { Page } from '@playwright/test';

import { AuthApiErrorCode } from '../../core/enums/auth-errors.enum';
import { graphqlError, graphqlSuccess, mockGraphqlOperations } from '../../core/helpers/graphql.helper';
import type { RegistrationData } from '../../core/types/auth.types';

export const validRegistrationData: RegistrationData = {
  confirmPassword: 'Password123!',
  email: 'new-user@example.com',
  password: 'Password123!',
};

const getEmailVariable = (variables: Record<string, unknown>): string => {
  const email = variables.email;

  return typeof email === 'string' ? email : validRegistrationData.email;
};

export const mockRegistrationSuccess = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: ({ variables }) =>
        graphqlSuccess({
          register: {
            email: getEmailVariable(variables),
            id: 'user-2',
            status: 'ACTIVE',
          },
        }),
      operationName: 'Register',
    },
    {
      handle: ({ variables }) =>
        graphqlSuccess({
          login: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            user: {
              email: getEmailVariable(variables),
              id: 'user-2',
              status: 'ACTIVE',
            },
          },
        }),
      operationName: 'Login',
    },
  ]);
};

export const mockRegistrationEmailTaken = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.EmailAlreadyRegistered),
      operationName: 'Register',
    },
  ]);
};

export const mockRegistrationInvalidEmail = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(`${AuthApiErrorCode.InvalidEmail} malformed email address`),
      operationName: 'Register',
    },
  ]);
};

export const mockRegistrationInvalidPassword = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(`${AuthApiErrorCode.InvalidPassword} password is too weak`),
      operationName: 'Register',
    },
  ]);
};

export const mockRegistrationTooManyAttempts = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.TooManyRegistrationAttempts),
      operationName: 'Register',
    },
  ]);
};

export const mockRegistrationUnknownError = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.Unknown),
      operationName: 'Register',
    },
  ]);
};

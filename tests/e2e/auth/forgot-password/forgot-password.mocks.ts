import type { Page } from '@playwright/test';

import { AuthApiErrorCode } from '../../core/enums/auth-errors.enum';
import { graphqlError, graphqlSuccess, mockGraphqlOperations } from '../../core/helpers/graphql.helper';

export const validForgotPasswordEmail = 'user@example.com';

export const mockForgotPasswordSuccess = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () =>
        graphqlSuccess({
          requestPasswordReset: {
            success: true,
            token: 'reset-token',
          },
        }),
      operationName: 'RequestPasswordReset',
    },
  ]);
};

export const mockForgotPasswordTooManyAttempts = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.TooManyResetAttempts),
      operationName: 'RequestPasswordReset',
    },
  ]);
};

export const mockForgotPasswordUnknownError = async (page: Page) => {
  await mockGraphqlOperations(page, [
    {
      handle: () => graphqlError(AuthApiErrorCode.Unknown),
      operationName: 'RequestPasswordReset',
    },
  ]);
};

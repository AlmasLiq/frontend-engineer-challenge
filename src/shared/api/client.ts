import { GraphQLClient } from 'graphql-request';

import { env } from '@/shared/config/env';

export const createGraphqlClient = (token?: string) =>
  new GraphQLClient(env.VITE_API_URL, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

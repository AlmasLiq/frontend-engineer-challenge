import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
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

type ExecuteGraphqlOptions = {
  token?: string;
};

export const executeGraphql = async <TData, TVariables extends object>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  options?: ExecuteGraphqlOptions,
): Promise<TData> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return createGraphqlClient(options?.token).request({
    document,
    variables,
  });
};

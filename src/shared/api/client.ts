import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { Variables } from 'graphql-request';
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

export const executeGraphql = async <TData, TVariables extends Variables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  options?: ExecuteGraphqlOptions,
) =>
  createGraphqlClient(options?.token).request<TData, TVariables>(
    document,
    variables,
  );

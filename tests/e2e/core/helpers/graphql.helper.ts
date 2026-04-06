import type { Page, Route } from '@playwright/test';

type GraphqlRequestBody = {
  operationName?: string;
  query?: string;
  variables?: Record<string, unknown>;
};

type GraphqlErrorPayload = {
  message: string;
};

export type GraphqlMockResponse = {
  data?: Record<string, unknown>;
  errors?: GraphqlErrorPayload[];
};

type GraphqlOperationMock = {
  handle: (context: { variables: Record<string, unknown> }) => GraphqlMockResponse | Promise<GraphqlMockResponse>;
  operationName: string;
  times?: number;
};

const GRAPHQL_URL_PATTERN = '**/graphql';

const parseGraphqlRequestBody = (route: Route): GraphqlRequestBody => {
  const payload: unknown = route.request().postDataJSON();

  if (!payload || typeof payload !== 'object') {
    return {};
  }

  return payload as GraphqlRequestBody;
};

const matchesOperation = (body: GraphqlRequestBody, operationName: string) =>
  body.operationName === operationName || body.query?.includes(operationName) === true;

export const graphqlSuccess = (data: Record<string, unknown>): GraphqlMockResponse => ({
  data,
});

export const graphqlError = (message: string): GraphqlMockResponse => ({
  errors: [{ message }],
});

export const mockGraphqlOperations = async (page: Page, mocks: GraphqlOperationMock[]) => {
  const pendingMocks = mocks.map((mock) => ({
    ...mock,
    times: mock.times ?? 1,
  }));

  await page.route(GRAPHQL_URL_PATTERN, async (route) => {
    const body = parseGraphqlRequestBody(route);
    const matchedMock = pendingMocks.find((mock) => matchesOperation(body, mock.operationName));

    if (!matchedMock) {
      await route.fulfill({
        body: JSON.stringify(graphqlError(`Unhandled GraphQL operation: ${body.operationName ?? 'unknown'}`)),
        contentType: 'application/json',
        status: 200,
      });
      return;
    }

    matchedMock.times -= 1;

    if (matchedMock.times <= 0) {
      const matchedMockIndex = pendingMocks.indexOf(matchedMock);
      pendingMocks.splice(matchedMockIndex, 1);
    }

    const response = await matchedMock.handle({
      variables: body.variables ?? {},
    });

    await route.fulfill({
      body: JSON.stringify(response),
      contentType: 'application/json',
      status: 200,
    });
  });
};

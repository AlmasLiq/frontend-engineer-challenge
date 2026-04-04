import { ClientError } from 'graphql-request';

export const getApiErrorMessages = (error: unknown): string[] => {
  if (error instanceof ClientError) {
    const messages = error.response.errors?.map(({ message }) => message).filter(Boolean);

    return messages && messages.length > 0 ? messages : [error.message];
  }

  if (error instanceof Error) {
    return [error.message];
  }

  return ['Не удалось выполнить запрос.'];
};

export const getApiErrorMessage = (error: unknown, fallback: string): string =>
  getApiErrorMessages(error)[0] ?? fallback;

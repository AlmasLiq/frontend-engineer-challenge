import { http, HttpResponse } from 'msw';

import { env } from '@/shared/config/env';

export const handlers = [
  http.post(env.VITE_API_URL, async () =>
    HttpResponse.json({
      data: {
        me: null,
      },
    }),
  ),
];

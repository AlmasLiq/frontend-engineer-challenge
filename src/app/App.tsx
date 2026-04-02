import { AppRouter } from '@/app/providers/router';
import { QueryProvider } from '@/app/providers/query-provider';

export const App = () => (
  <QueryProvider>
    <AppRouter />
  </QueryProvider>
);

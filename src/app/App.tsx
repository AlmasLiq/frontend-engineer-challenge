import { QueryProvider } from '@/app/providers/query-provider';
import { AppRouter } from '@/app/providers/router';

export const App = () => (
  <QueryProvider>
    <AppRouter />
  </QueryProvider>
);

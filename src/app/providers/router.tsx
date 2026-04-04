import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { getAuthSession } from '@/entities/session/model/session';
import { AppPlaceholderPage } from '@/pages/app/ui/AppPlaceholderPage';
import { AuthLayout } from '@/pages/auth/ui/AuthLayout';
import { ForgotPasswordPage } from '@/pages/auth/ui/ForgotPasswordPage';
import { LoginPage } from '@/pages/auth/ui/LoginPage';
import { RegisterPage } from '@/pages/auth/ui/RegisterPage';
import { ResetPasswordPage } from '@/pages/auth/ui/ResetPasswordPage';

const RedirectIfAuthenticated = () =>
  getAuthSession() ? <Navigate to="/app" replace /> : <Outlet />;

const RequireAuth = () => (getAuthSession() ? <Outlet /> : <Navigate to="/login" replace />);

const router = createBrowserRouter([
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/login" replace />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/app',
        element: <AppPlaceholderPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

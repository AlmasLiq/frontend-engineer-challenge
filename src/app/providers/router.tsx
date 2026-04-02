import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AuthLayout } from '@/pages/auth/ui/AuthLayout';
import { ForgotPasswordPage } from '@/pages/auth/ui/ForgotPasswordPage';
import { LoginPage } from '@/pages/auth/ui/LoginPage';
import { RegisterPage } from '@/pages/auth/ui/RegisterPage';
import { ResetPasswordPage } from '@/pages/auth/ui/ResetPasswordPage';

const router = createBrowserRouter([
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
]);

export const AppRouter = () => <RouterProvider router={router} />;

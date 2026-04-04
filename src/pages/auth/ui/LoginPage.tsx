import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import { AuthPageShell } from '@/pages/auth/ui/AuthPageShell';

export const LoginPage = () => (
  <AuthPageShell title="Войти в систему">
    <LoginForm />
  </AuthPageShell>
);

import { RegisterForm } from '@/features/auth/register/ui/RegisterForm';
import { AuthPageShell } from '@/pages/auth/ui/AuthPageShell';

export const RegisterPage = () => (
  <AuthPageShell title="Регистрация в системе">
    <RegisterForm />
  </AuthPageShell>
);

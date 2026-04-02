import { Link } from 'react-router-dom';

import { RegisterForm } from '@/features/auth/register/ui/RegisterForm';
import { AuthPageShell } from '@/pages/auth/ui/AuthPageShell';

export const RegisterPage = () => (
  <AuthPageShell
    eyebrow="Register"
    title="Create your account"
    description="Skeleton page for registration with validation and UI primitives already connected."
  >
    <RegisterForm />
    <p className="text-sm text-app-muted">
      Already registered? <Link className="font-medium text-app-foreground" to="/login">Sign in</Link>
    </p>
  </AuthPageShell>
);

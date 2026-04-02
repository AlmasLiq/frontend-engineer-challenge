import { Link } from 'react-router-dom';

import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import { AuthPageShell } from '@/pages/auth/ui/AuthPageShell';

export const LoginPage = () => (
  <AuthPageShell
    eyebrow="Login"
    title="Sign in to continue"
    description="Skeleton page for the login flow. Wire the mutation and token handling next."
  >
    <LoginForm />
    <p className="text-sm text-app-muted">
      No account yet? <Link className="font-medium text-app-foreground" to="/register">Create one</Link>
    </p>
  </AuthPageShell>
);

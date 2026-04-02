import { Link } from 'react-router-dom';

import { ForgotPasswordForm } from '@/features/auth/forgot-password/ui/ForgotPasswordForm';
import { AuthPageShell } from '@/pages/auth/ui/AuthPageShell';

export const ForgotPasswordPage = () => (
  <AuthPageShell
    eyebrow="Password reset"
    title="Request a reset link"
    description="Use this page for the first half of the reset flow and anti-enumeration handling."
  >
    <ForgotPasswordForm />
    <p className="text-sm text-app-muted">
      Remembered it? <Link className="font-medium text-app-foreground" to="/login">Back to login</Link>
    </p>
  </AuthPageShell>
);

import { Link } from 'react-router-dom';

import { ResetPasswordForm } from '@/features/auth/reset-password/ui/ResetPasswordForm';
import { AuthPageShell } from '@/pages/auth/ui/AuthPageShell';

export const ResetPasswordPage = () => (
  <AuthPageShell
    eyebrow="Apply token"
    title="Set a new password"
    description="Final step of the reset flow. Connect token, email, and password mutation here."
  >
    <ResetPasswordForm />
    <p className="text-sm text-app-muted">
      Need a new token?{' '}
      <Link className="font-medium text-app-foreground" to="/forgot-password">
        Request password reset
      </Link>
    </p>
  </AuthPageShell>
);

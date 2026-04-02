import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/features/auth/reset-password/model/schema';
import { Button } from '@/shared/ui/button';
import { FormMessage } from '@/shared/ui/form-message';
import { Input } from '@/shared/ui/input';

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      token: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit(async () => undefined)}>
      <FormMessage>Ready for token-based password reset mutation and backend error mapping.</FormMessage>
      <Input autoComplete="email" label="Email" placeholder="name@example.com" {...register('email')} error={errors.email?.message} />
      <Input label="Token" placeholder="Paste reset token" {...register('token')} error={errors.token?.message} />
      <Input
        autoComplete="new-password"
        label="New password"
        placeholder="Enter a new password"
        type="password"
        {...register('newPassword')}
        error={errors.newPassword?.message}
      />
      <Input
        autoComplete="new-password"
        label="Confirm new password"
        placeholder="Repeat your password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <Button className="w-full" disabled={isSubmitting} type="submit">
        Update password
      </Button>
    </form>
  );
};

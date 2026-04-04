import { useResetPasswordForm } from '@/features/auth/reset-password/model/use-reset-password-form';
import { Button } from '@/shared/ui/button';
import { FormMessage } from '@/shared/ui/form-message';
import { Input } from '@/shared/ui/input';

export const ResetPasswordForm = () => {
  const {
    form: {
      formState: { errors, isSubmitting },
      register,
    },
    handleFormSubmit,
    successMessage,
  } = useResetPasswordForm();

  return (
    <form className="space-y-5" onSubmit={handleFormSubmit}>
      {errors.root?.message ? <FormMessage tone="error">{errors.root.message}</FormMessage> : null}
      {successMessage ? <FormMessage tone="success">{successMessage}</FormMessage> : null}

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

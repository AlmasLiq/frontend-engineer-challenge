import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/forgot-password/model/schema';
import { Button } from '@/shared/ui/button';
import { FormMessage } from '@/shared/ui/form-message';
import { Input } from '@/shared/ui/input';

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit(async () => undefined)}>
      <FormMessage>This placeholder is ready for anti-enumeration UX and reset token display in dev mode.</FormMessage>
      <Input autoComplete="email" label="Email" placeholder="name@example.com" {...register('email')} error={errors.email?.message} />
      <Button className="w-full" disabled={isSubmitting} type="submit">
        Request reset
      </Button>
    </form>
  );
};

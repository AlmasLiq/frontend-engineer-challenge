import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { registerSchema, type RegisterFormValues } from '@/features/auth/register/model/schema';
import { Button } from '@/shared/ui/button';
import { FormMessage } from '@/shared/ui/form-message';
import { Input } from '@/shared/ui/input';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit(async () => undefined)}>
      <FormMessage>Prepared for register and auto-login flow from the backend challenge.</FormMessage>
      <Input autoComplete="email" label="Email" placeholder="name@example.com" {...register('email')} error={errors.email?.message} />
      <Input
        autoComplete="new-password"
        label="Password"
        placeholder="Create a password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        autoComplete="new-password"
        label="Confirm password"
        placeholder="Repeat your password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <Button className="w-full" disabled={isSubmitting} type="submit">
        Create account
      </Button>
    </form>
  );
};

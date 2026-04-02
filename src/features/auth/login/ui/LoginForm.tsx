import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { loginSchema, type LoginFormValues } from '@/features/auth/login/model/schema';
import { Button } from '@/shared/ui/button';
import { FormMessage } from '@/shared/ui/form-message';
import { Input } from '@/shared/ui/input';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit(async () => undefined)}>
      <FormMessage>Mutation wiring is intentionally left blank. This is only the starting skeleton.</FormMessage>
      <Input autoComplete="email" label="Email" placeholder="name@example.com" {...register('email')} error={errors.email?.message} />
      <Input
        autoComplete="current-password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <div className="flex items-center justify-between gap-4">
        <Link className="text-sm font-medium text-app-foreground" to="/forgot-password">
          Forgot password?
        </Link>
        <Button className="min-w-32" disabled={isSubmitting} type="submit">
          Sign in
        </Button>
      </div>
    </form>
  );
};

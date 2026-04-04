import { Link } from 'react-router-dom';

import { useLoginForm } from '@/features/auth/login/model/use-login-form';
import { Button } from '@/shared/ui/button';
import { FormMessage } from '@/shared/ui/form-message';
import { Input } from '@/shared/ui/input';

export const LoginForm = () => {
  const {
    form: {
      formState: { errors, isSubmitting },
      register,
    },
    handleFormSubmit,
    successMessage,
  } = useLoginForm();

  return (
    <form className="w-full max-w-[400px]" onSubmit={handleFormSubmit}>
      {errors.root?.message ? (
        <div className="mb-4">
          <FormMessage tone="error">{errors.root.message}</FormMessage>
        </div>
      ) : null}
      {successMessage ? (
        <div className="mb-4">
          <FormMessage tone="success">{successMessage}</FormMessage>
        </div>
      ) : null}

      <div className="space-y-4">
        <Input
          autoComplete="email"
          hideLabel
          placeholder="Введите e-mail"
          variant="underline"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          autoComplete="current-password"
          hideLabel
          placeholder="Введите пароль"
          type="password"
          variant="underline"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <Button
        className="mt-6 h-12 w-full rounded-[6px] bg-[#31A0F0] px-4 text-[14px] font-medium leading-none text-white hover:bg-[#2797e7]"
        disabled={isSubmitting}
        type="submit"
      >
        Войти
      </Button>

      <div className="pt-5 text-center">
        <Link className="text-[14px] font-medium leading-none text-[#31A0F0]" to="/forgot-password">
          Забыли пароль?
        </Link>
      </div>
    </form>
  );
};

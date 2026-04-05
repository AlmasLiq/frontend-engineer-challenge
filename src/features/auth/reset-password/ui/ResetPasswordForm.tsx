import { Link } from 'react-router-dom';

import { useResetPasswordForm } from '@/features/auth/reset-password/model/use-reset-password-form';
import { Button } from '@/shared/ui/button';
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
    <form className="w-full max-w-[400px]" onSubmit={handleFormSubmit}>
      <div className="space-y-6">
        <Input
          autoComplete="new-password"
          className="text-[14px] leading-none"
          hideLabel
          label="Новый пароль"
          placeholder="Введите пароль"
          type="password"
          variant="underline"
          {...register('newPassword')}
          error={errors.newPassword?.message}
        />

        <Input
          autoComplete="new-password"
          className="text-[14px] leading-none"
          hideLabel
          label="Повторите пароль"
          placeholder="Повторите пароль"
          type="password"
          variant="underline"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button
        className="mt-6 h-12 w-full rounded-[6px] bg-[#31A0F0] px-4 text-[14px] font-medium leading-none text-white hover:bg-[#2797e7]"
        disabled={isSubmitting}
        type="submit"
      >
        Изменить пароль
      </Button>

      {successMessage ? (
        <p
          aria-live="polite"
          className="pt-4 text-center text-[12px] leading-[1.4] text-[#31A0F0]"
          role="status"
        >
          {successMessage}
        </p>
      ) : null}

      {successMessage ? (
        <div className="pt-5 text-center">
          <Link className="text-[14px] font-medium leading-none text-[#31A0F0]" to="/login">
            Назад в авторизацию
          </Link>
        </div>
      ) : null}
    </form>
  );
};

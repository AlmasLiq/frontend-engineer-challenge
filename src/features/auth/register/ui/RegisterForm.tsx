import { Link } from 'react-router-dom';

import { useRegisterForm } from '@/features/auth/register/model/use-register-form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export const RegisterForm = () => {
  const {
    form: {
      formState: { errors, isSubmitting },
      register,
    },
    handleFormSubmit,
  } = useRegisterForm();

  return (
    <form className="w-full max-w-[400px]" onSubmit={handleFormSubmit}>
      <div className="space-y-6">
        <Input
          autoComplete="email"
          className="text-[14px] leading-none"
          hideLabel
          placeholder="Введите e-mail"
          variant="underline"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="mt-6 space-y-6">
        <Input
          autoComplete="new-password"
          className="text-[14px] leading-none"
          hideLabel
          placeholder="Введите пароль"
          type="password"
          variant="underline"
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          autoComplete="new-password"
          className="text-[14px] leading-none"
          hideLabel
          placeholder="Повторите пароль"
          type="password"
          variant="underline"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button
        className="mt-5 h-12 w-full rounded-[6px] bg-[#31A0F0] px-4 text-[14px] font-medium leading-none text-white hover:bg-[#2797e7]"
        disabled={isSubmitting}
        type="submit"
      >
        Зарегистрироваться
      </Button>

      <p className="mx-auto mt-5 max-w-[320px] text-center text-[12px] font-normal leading-[1.4] text-[#c2c6cf]">
        Зарегистрировавшись пользователь принимает условия{' '}
        <Link className="font-normal underline" to="#">
          договора оферты
        </Link>{' '}
        и{' '}
        <Link className="font-normal underline" to="#">
          политики конфиденциальности
        </Link>
      </p>
    </form>
  );
};

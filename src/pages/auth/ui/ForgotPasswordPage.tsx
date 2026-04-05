import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForgotPasswordForm } from '@/features/auth/forgot-password/model/use-forgot-password-form';
import { ForgotPasswordForm } from '@/features/auth/forgot-password/ui/ForgotPasswordForm';

const BackArrowIcon = () => (
  <svg
    aria-hidden="true"
    className="h-6 w-6 text-[#2e2f33]"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const forgotPasswordForm = useForgotPasswordForm();

  useEffect(() => {
    const successState = forgotPasswordForm.successState;

    if (!successState?.token) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const searchParams = new URLSearchParams({
        email: successState.email,
        token: successState.token,
      });

      void navigate(`/reset-password?${searchParams.toString()}`, { replace: true });
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [forgotPasswordForm.successState, navigate]);

  if (forgotPasswordForm.successState) {
    return (
      <div className="flex w-full max-w-[400px] flex-col">
        <div className="space-y-4">
          <h2 className="text-[32px] font-medium leading-[1.2] tracking-[0] text-[#2e2f33]">
            Проверьте свою почту
          </h2>
          <p className="max-w-[340px] text-[14px] leading-[1.4] text-[#9da3b3]">
            Мы отправили на почту письмо с ссылкой для восстановления пароля
          </p>
        </div>

        <div className="pt-8">
          <Link
            className="inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-[#DDEEFE] px-4 text-[14px] font-medium leading-none text-[#31A0F0] transition hover:bg-[#d5e9fd]"
            to="/login"
          >
            Назад в авторизацию
          </Link>
          {forgotPasswordForm.successState.token ? (
            <p className="pt-4 text-center text-[12px] leading-[1.4] text-[#9da3b3]">
              Перенаправляем на форму смены пароля...
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[400px] flex-col">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link aria-label="Назад в авторизацию" to="/login">
            <BackArrowIcon />
          </Link>
          <h2 className="text-[32px] font-medium leading-[1.2] tracking-[0] text-[#2e2f33]">
            Восстановление пароля
          </h2>
        </div>
        <p className="text-[14px] leading-[1.4] text-[#9da3b3]">
          Укажите адрес почты на который был зарегистрирован аккаунт
        </p>
      </div>

      <div className="pt-8">
        <ForgotPasswordForm
          form={forgotPasswordForm.form}
          handleFormSubmit={forgotPasswordForm.handleFormSubmit}
        />
      </div>
    </div>
  );
};

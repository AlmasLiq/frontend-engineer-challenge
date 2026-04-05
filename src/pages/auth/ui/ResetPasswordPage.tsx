import { ResetPasswordForm } from '@/features/auth/reset-password/ui/ResetPasswordForm';

export const ResetPasswordPage = () => (
  <div className="flex w-full max-w-[400px] flex-col">
    <div className="space-y-4">
      <h2 className="text-[32px] font-medium leading-[1.2] tracking-[0] text-[#2e2f33]">
        Задайте пароль
      </h2>
      <p className="text-[14px] leading-[1.4] text-[#9da3b3]">
        Напишите новый пароль, который будете использовать для входа
      </p>
    </div>

    <div className="pt-8">
      <ResetPasswordForm />
    </div>
  </div>
);

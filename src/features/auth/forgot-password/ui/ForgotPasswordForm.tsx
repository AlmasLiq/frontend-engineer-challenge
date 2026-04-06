import type { UseForgotPasswordFormResult } from '@/features/auth/forgot-password/model/use-forgot-password-form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type ForgotPasswordFormProps = Pick<UseForgotPasswordFormResult, 'form' | 'handleFormSubmit'>;

export const ForgotPasswordForm = ({
  form: {
    formState: { errors, isSubmitting },
    register,
  },
  handleFormSubmit,
}: ForgotPasswordFormProps) => (
  <form className="w-full max-w-[400px]" onSubmit={handleFormSubmit}>
    <div className="mb-6">
      <Input
        autoComplete="email"
        className="text-[14px] leading-none"
        hideLabel
        label="E-mail"
        placeholder="Введите e-mail"
        variant="underline"
        {...register('email')}
        error={errors.email?.message}
      />
    </div>

    <Button
      className="h-12 w-full rounded-[6px] bg-[#DDEEFE] px-4 text-[14px] font-medium leading-none text-[#31A0F0] hover:bg-[#d5e9fd] disabled:opacity-100"
      disabled={isSubmitting}
      type="submit"
    >
      Восстановить пароль
    </Button>
  </form>
);

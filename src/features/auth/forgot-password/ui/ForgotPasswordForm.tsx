import { useForgotPasswordForm } from '@/features/auth/forgot-password/model/use-forgot-password-form';
import { Button } from '@/shared/ui/button';
import { FormMessage } from '@/shared/ui/form-message';
import { Input } from '@/shared/ui/input';

export const ForgotPasswordForm = () => {
  const {
    form: {
      formState: { errors, isSubmitting },
      register,
    },
    handleFormSubmit,
    successState,
  } = useForgotPasswordForm();

  return (
    <form className="space-y-5" onSubmit={handleFormSubmit}>
      {errors.root?.message ? <FormMessage tone="error">{errors.root.message}</FormMessage> : null}
      {successState ? (
        <FormMessage tone="success">
          <span>{successState.message}</span>
          {successState.token ? (
            <span className="mt-2 block break-all font-medium">Токен: {successState.token}</span>
          ) : null}
        </FormMessage>
      ) : null}

      <Input
        autoComplete="email"
        label="Email"
        placeholder="name@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <Button className="w-full" disabled={isSubmitting} type="submit">
        Request reset
      </Button>
    </form>
  );
};

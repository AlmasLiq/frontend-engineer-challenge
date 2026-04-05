import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Минимум 8 символов'),
    confirmPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Пароли не совпадают.',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const resetPasswordFormDefaultValues: ResetPasswordFormValues = {
  newPassword: '',
  confirmPassword: '',
};

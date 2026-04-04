import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Введите корректный e-mail'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordFormDefaultValues: ForgotPasswordFormValues = {
  email: '',
};

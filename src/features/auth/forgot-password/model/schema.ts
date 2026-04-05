import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Недопустимый адрес почты'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordFormDefaultValues: ForgotPasswordFormValues = {
  email: '',
};

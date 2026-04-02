import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    email: z.string().email('Enter a valid email'),
    token: z.string().min(1, 'Token is required'),
    newPassword: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

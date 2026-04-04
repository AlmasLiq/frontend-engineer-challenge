import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Введите корректный e-mail'),
  password: z.string().min(1, 'Введите пароль'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginFormDefaultValues: LoginFormValues = {
  email: '',
  password: '',
};

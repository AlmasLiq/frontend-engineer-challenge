import { z } from 'zod';

const emailSchema = z.string().email();

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerFormDefaultValues: RegisterFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

type ValidateRegisterFormOptions = {
  isEmailTaken?: boolean;
};

export const validateRegisterForm = (
  values: RegisterFormValues,
  options?: ValidateRegisterFormOptions,
): RegisterFormErrors => {
  if (options?.isEmailTaken) {
    return {
      email: 'Данный адрес почты занят.',
    };
  }

  if (!emailSchema.safeParse(values.email).success) {
    return {
      email: 'Недопустимый адрес почты',
    };
  }

  if (values.password !== values.confirmPassword) {
    return {
      password: 'Пароли не совпадают.',
      confirmPassword: 'Пароли не совпадают.',
    };
  }

  if (values.password.length < 8) {
    return {
      password: 'Минимум 8 символов.',
      confirmPassword: 'Минимум 8 символов.',
    };
  }

  return {};
};

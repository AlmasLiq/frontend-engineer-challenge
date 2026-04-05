export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegistrationData = LoginCredentials & {
  confirmPassword: string;
};

export type ForgotPasswordData = {
  email: string;
};

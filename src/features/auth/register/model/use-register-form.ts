import { useForm, type UseFormReturn } from 'react-hook-form';
import type { FormEvent } from 'react';

import {
  registerFormDefaultValues,
  type RegisterFormErrors,
  type RegisterFormValues,
  validateRegisterForm,
} from '@/features/auth/register/model/schema';

type UseRegisterFormResult = {
  form: UseFormReturn<RegisterFormValues>;
  handleFormSubmit: (event?: FormEvent<HTMLFormElement>) => void;
};

const applyRegisterErrors = (
  form: UseFormReturn<RegisterFormValues>,
  errors: RegisterFormErrors,
) => {
  let hasErrors = false;

  for (const [field, message] of Object.entries(errors) as [
    keyof RegisterFormValues,
    string | undefined,
  ][]) {
    if (!message) {
      continue;
    }

    hasErrors = true;
    form.setError(field, {
      message,
      type: 'manual',
    });
  }

  return hasErrors;
};

export const useRegisterForm = (): UseRegisterFormResult => {
  const form = useForm<RegisterFormValues>({
    defaultValues: registerFormDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();

    const validationErrors = validateRegisterForm(values, {
      isEmailTaken: false,
    });

    if (applyRegisterErrors(form, validationErrors)) {
      return;
    }

    // API integration will be added here when the register mutation is wired.
  });

  const handleFormSubmit: UseRegisterFormResult['handleFormSubmit'] = (event) => {
    void submit(event);
  };

  return {
    form,
    handleFormSubmit,
  };
};

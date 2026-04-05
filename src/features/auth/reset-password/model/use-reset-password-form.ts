import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { applyAuthApiErrors } from '@/features/auth/model/apply-auth-api-errors';
import { mapAuthApiError } from '@/features/auth/model/map-auth-api-error';
import {
  resetPasswordFormDefaultValues,
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/features/auth/reset-password/model/schema';
import {
  ResetPasswordDocument,
  type ResetPasswordMutationVariables,
} from '@/shared/api/__generated__/graphql';
import { executeGraphql } from '@/shared/api/client';

type UseResetPasswordFormResult = {
  form: ReturnType<typeof useForm<ResetPasswordFormValues>>;
  handleFormSubmit: (event?: FormEvent<HTMLFormElement>) => void;
  successMessage: string | null;
};

export const useResetPasswordForm = (): UseResetPasswordFormResult => {
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: resetPasswordFormDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (variables: ResetPasswordMutationVariables) =>
      executeGraphql(ResetPasswordDocument, variables),
    onSuccess: () => {
      setSuccessMessage('Пароль успешно изменен.');
    },
  });

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();
    setSuccessMessage(null);

    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      form.setError('newPassword', {
        type: 'manual',
        message: 'Ссылка для восстановления недействительна.',
      });
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        email,
        newPassword: values.newPassword,
        token,
      });
    } catch (error) {
      applyAuthApiErrors(form, mapAuthApiError('resetPassword', error));
    }
  });

  const handleFormSubmit: UseResetPasswordFormResult['handleFormSubmit'] = (event) => {
    void submit(event);
  };

  return {
    form,
    handleFormSubmit,
    successMessage,
  };
};

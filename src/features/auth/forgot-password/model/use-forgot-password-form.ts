import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { applyAuthApiErrors } from '@/features/auth/model/apply-auth-api-errors';
import { mapAuthApiError } from '@/features/auth/model/map-auth-api-error';
import {
  forgotPasswordFormDefaultValues,
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/forgot-password/model/schema';
import {
  RequestPasswordResetDocument,
  type RequestPasswordResetMutationVariables,
} from '@/shared/api/__generated__/graphql';
import { executeGraphql } from '@/shared/api/client';

type ForgotPasswordSuccessState = {
  message: string;
  token: string | null;
};

type UseForgotPasswordFormResult = {
  form: ReturnType<typeof useForm<ForgotPasswordFormValues>>;
  handleFormSubmit: (event?: FormEvent<HTMLFormElement>) => void;
  successState: ForgotPasswordSuccessState | null;
};

export const useForgotPasswordForm = (): UseForgotPasswordFormResult => {
  const [successState, setSuccessState] = useState<ForgotPasswordSuccessState | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: forgotPasswordFormDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (variables: RequestPasswordResetMutationVariables) =>
      executeGraphql(RequestPasswordResetDocument, variables),
    onSuccess: (data) => {
      setSuccessState({
        message: 'Если адрес существует, токен для сброса уже подготовлен.',
        token: data.requestPasswordReset.token ?? null,
      });
    },
  });

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();
    setSuccessState(null);

    try {
      await forgotPasswordMutation.mutateAsync(values);
    } catch (error) {
      applyAuthApiErrors(form, mapAuthApiError('forgotPassword', error));
    }
  });

  const handleFormSubmit: UseForgotPasswordFormResult['handleFormSubmit'] = (event) => {
    void submit(event);
  };

  return {
    form,
    handleFormSubmit,
    successState,
  };
};

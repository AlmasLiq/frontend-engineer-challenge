import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { setAuthSession } from '@/entities/session/model/session';
import { viewerQueryKeys } from '@/entities/viewer/model/query-keys';
import type { Viewer } from '@/entities/viewer/model/types';
import { loginFormDefaultValues, loginSchema, type LoginFormValues } from '@/features/auth/login/model/schema';
import { applyAuthApiErrors } from '@/features/auth/model/apply-auth-api-errors';
import { mapAuthApiError } from '@/features/auth/model/map-auth-api-error';
import {
  LoginDocument,
  type LoginMutation,
  type LoginMutationVariables,
} from '@/shared/api/__generated__/graphql';
import { executeGraphql } from '@/shared/api/client';

type UseLoginFormResult = {
  form: ReturnType<typeof useForm<LoginFormValues>>;
  handleFormSubmit: (event?: FormEvent<HTMLFormElement>) => void;
  successMessage: string | null;
};

const mapViewer = (payload: LoginMutation['login']['user']): Viewer => ({
  email: payload.email,
  id: payload.id,
  status: payload.status,
});

export const useLoginForm = (): UseLoginFormResult => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<LoginFormValues>({
    defaultValues: loginFormDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (variables: LoginMutationVariables) => executeGraphql(LoginDocument, variables),
    onSuccess: (data) => {
      setAuthSession({
        accessToken: data.login.accessToken,
        refreshToken: data.login.refreshToken,
        user: {
          email: data.login.user.email,
          id: data.login.user.id,
          status: data.login.user.status,
        },
      });

      queryClient.setQueryData(viewerQueryKeys.me, mapViewer(data.login.user));
      setSuccessMessage(`Вы вошли в систему как ${data.login.user.email}.`);
      void navigate('/app', { replace: true });
    },
  });

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();
    setSuccessMessage(null);

    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      applyAuthApiErrors(form, mapAuthApiError('login', error));
    }
  });

  const handleFormSubmit: UseLoginFormResult['handleFormSubmit'] = (event) => {
    void submit(event);
  };

  return {
    form,
    handleFormSubmit,
    successMessage,
  };
};

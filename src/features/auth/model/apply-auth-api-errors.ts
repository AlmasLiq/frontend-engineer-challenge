import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import type { AuthApiErrorEntry } from '@/features/auth/model/map-auth-api-error';

export const applyAuthApiErrors = <TFieldValues extends FieldValues>(
  form: Pick<UseFormReturn<TFieldValues>, 'setError'>,
  errors: AuthApiErrorEntry[],
) => {
  for (const error of errors) {
    form.setError(error.field as Path<TFieldValues>, {
      message: error.message,
      type: 'server',
    });
  }
};

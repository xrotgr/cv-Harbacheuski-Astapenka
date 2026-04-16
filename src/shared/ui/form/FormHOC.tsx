'use client';

import { Stack, type SxProps, type Theme } from '@mui/material';
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
} from 'react-hook-form';

interface FormHOCProps<TValues extends FieldValues> {
  children: React.ReactNode;
  defaultValues?: DefaultValues<TValues>;
  onSubmit: (values: TValues) => void | Promise<void>;
  formStyle?: SxProps<Theme>;
  resolver?: Resolver<TValues>;
}

export const FormHOC = <TValues extends FieldValues>({
  children,
  defaultValues,
  onSubmit,
  formStyle,
  resolver,
}: FormHOCProps<TValues>) => {
  const methods = useForm<TValues>({
    defaultValues,
    resolver,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <Stack component="form" spacing={2} sx={formStyle} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </Stack>
    </FormProvider>
  );
};

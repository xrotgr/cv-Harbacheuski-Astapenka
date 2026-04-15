'use client';

import { TextField, type TextFieldProps } from '@mui/material';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

type FormTextFieldProps<TValues extends FieldValues> = {
  name: Path<TValues>;
} & Omit<TextFieldProps, 'name'>;

export const FormTextField = <TValues extends FieldValues>({
  name,
  ...textFieldProps
}: FormTextFieldProps<TValues>) => {
  const { control } = useFormContext<TValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ''}
          error={textFieldProps.error ?? Boolean(fieldState.error)}
          helperText={textFieldProps.helperText ?? fieldState.error?.message}
          fullWidth
        />
      )}
    />
  );
};

'use client';

import { TextField, MenuItem, TextFieldProps } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface Option {
  label: string;
  value: string | number;
}

type FormSelectProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'select'> & {
  name: Path<T>;
  control?: Control<T>;
  options: Option[];
};

export function FormSelect<T extends FieldValues>({
  name,
  control,
  options,
  ...props
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          select
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

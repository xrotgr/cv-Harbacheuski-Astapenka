'use client';

import { Button, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface SubmitButtonProps {
  children: ReactNode;
  sx?: SxProps;
}

export const SubmitButton = ({ children, sx }: SubmitButtonProps) => {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      disabled={!isDirty || isSubmitting}
      sx={sx}
    >
      {children}
    </Button>
  );
};

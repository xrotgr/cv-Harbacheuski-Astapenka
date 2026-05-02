import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface SubmitButtonProps {
  children: ReactNode;
}

export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      disabled={!isDirty || isSubmitting}
      sx={{ px: 10, borderRadius: 5 }}
    >
      {children}
    </Button>
  );
};

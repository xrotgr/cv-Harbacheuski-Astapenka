'use client';

import { Typography } from '@mui/material';

interface ForgotPasswordActionProps {
  label: string;
  sx?: Record<string, unknown>;
}

export const ForgotPasswordAction = ({ label, sx }: ForgotPasswordActionProps) => {
  const handleClick = () => {
    // TODO: connect reset-password flow
  };

  return (
    <Typography component="button" type="button" onClick={handleClick} sx={sx}>
      {label}
    </Typography>
  );
};

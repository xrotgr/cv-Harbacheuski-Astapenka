import { Box, Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { ProfileFormValues } from '../../module';

import { styles } from './ProfileSubmitButton.styles';

interface ProfileSubmitButtonProps {
  canEdit: boolean;
  label: string;
}

export const ProfileSubmitButton = ({ canEdit, label }: ProfileSubmitButtonProps) => {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext<ProfileFormValues>();

  if (!canEdit) return null;

  return (
    <Box sx={styles.submitWrapper}>
      <Button
        type="submit"
        variant="contained"
        sx={styles.submitButton}
        disabled={!isDirty || isSubmitting}
      >
        {label}
      </Button>
    </Box>
  );
};

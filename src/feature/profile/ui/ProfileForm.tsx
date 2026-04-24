'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';

import { FormHOC } from '@/shared/ui';

import { ProfileFormValues, ProfileSchema } from '../module/schema';

import { AvatarBox } from './AvatarBox/AvatarBox';
import { styles } from './ProfileForm.styles';

export const ProfileForm = () => {
  const defaultValues: ProfileFormValues = {
    firstName: '',
    lastName: '',
    department: '',
    position: '',
    avatarUrl: '',
  };

  const onSubmit = () => {
    //TODO: submit logic
  };

  return (
    <Box sx={styles.formWrapper}>
      <FormHOC<ProfileFormValues>
        defaultValues={defaultValues}
        resolver={zodResolver(ProfileSchema)}
        onSubmit={onSubmit}
        formStyle={styles.formStyle}
      >
        <AvatarBox email={'ast@gmail.com'} />
        <Button type="submit" variant="contained" sx={styles.submitButton}>
          UPDATE
        </Button>
      </FormHOC>
    </Box>
  );
};

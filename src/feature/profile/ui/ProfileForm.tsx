'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import type { User } from 'cv-graphql';
import { useTranslations } from 'next-intl';

import { FormHOC, FormSelect, FormTextField } from '@/shared/ui';

import { ProfileFormValues, ProfileSchema } from '../module/schema';

import { AvatarBox } from './AvatarBox/AvatarBox';
import { styles } from './ProfileForm.styles';

interface ProfileFormProps {
  user: User;
  canEdit: boolean;
  departments: string[];
  positions: string[];
}

export const ProfileForm = ({ user, canEdit, departments, positions }: ProfileFormProps) => {
  const t = useTranslations('common');

  const defaultValues: ProfileFormValues = {
    firstName: user.profile.first_name || '',
    lastName: user.profile.last_name || '',
    department: user.department_name || '',
    position: user.position_name || '',
    avatarUrl: user.profile.avatar || '',
  };

  const formatted = new Date(Number(user.created_at)).toDateString();

  const onSubmit = (data: ProfileFormValues) => {
    //TODO: submit logic
    console.log(data);
  };

  return (
    <Box sx={styles.formWrapper}>
      <FormHOC<ProfileFormValues>
        defaultValues={defaultValues}
        resolver={zodResolver(ProfileSchema)}
        onSubmit={onSubmit}
        formStyle={styles.formStyle}
      >
        <AvatarBox user={user} canEdit={canEdit} />
        <Box sx={styles.profileInformation}>
          <Typography>{user.profile.full_name}</Typography>
          <Typography>{user.email}</Typography>
          <Typography variant="body2" color="text.secondary">
            {`A member since ${formatted}`}
          </Typography>
        </Box>

        <Box sx={styles.formTextFieldBox}>
          <FormTextField<ProfileFormValues>
            name="firstName"
            label="First Name"
            disabled={!canEdit}
          />
          <FormTextField<ProfileFormValues> name="lastName" label="Last Name" disabled={!canEdit} />
          <FormSelect
            name="department"
            label="Department"
            options={departments.map((item) => ({
              label: item,
              value: item,
            }))}
            disabled={!canEdit}
          />

          <FormSelect
            name="position"
            label="Position"
            options={positions.map((item) => ({
              label: item,
              value: item,
            }))}
            disabled={!canEdit}
          />
        </Box>
        {canEdit && (
          <Box sx={styles.submitWrapper}>
            <Button type="submit" variant="contained" sx={styles.submitButton}>
              {t('update')}
            </Button>
          </Box>
        )}
      </FormHOC>
    </Box>
  );
};

'use client';

import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import type { User } from 'cv-graphql';
import { useTranslations } from 'next-intl';

import { FormHOC, FormSelect, FormTextField } from '@/shared/ui';

import { UPDATE_PROFILE, UPDATE_USER } from '../api';
import { ProfileFormValues, ProfileSchema } from '../module/schema';

import { AvatarBox } from './AvatarBox/AvatarBox';
import { styles } from './ProfileForm.styles';
import { ProfileSubmitButton } from './ProfileSubmitButton/ProfileSubmitButton';

interface ProfileFormProps {
  user: User;
  canEdit: boolean;
  departments: { id: string; name: string }[];
  positions: { id: string; name: string }[];
}

export const ProfileForm = ({ user, canEdit, departments, positions }: ProfileFormProps) => {
  const t = useTranslations('common');
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateUser] = useMutation(UPDATE_USER);

  const defaultDepartmentId =
    departments.find((department) => department.name === user.department_name)?.id ?? '';
  const defaultPositionId =
    positions.find((position) => position.name === user.position_name)?.id ?? '';

  const defaultValues: ProfileFormValues = {
    firstName: user.profile.first_name || '',
    lastName: user.profile.last_name || '',
    department: defaultDepartmentId,
    position: defaultPositionId,
    avatarUrl: user.profile.avatar || '',
  };

  const formatted = new Date(Number(user.created_at)).toDateString();

  const onSubmit = async (data: ProfileFormValues) => {
    await Promise.all([
      updateProfile({
        variables: {
          profile: {
            userId: user.id,
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      }),
      updateUser({
        variables: {
          user: {
            userId: user.id,
            departmentId: data.department || null,
            positionId: data.position || null,
          },
        },
      }),
    ]);
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
              label: item.name,
              value: item.id,
            }))}
            disabled={!canEdit}
          />

          <FormSelect
            name="position"
            label="Position"
            options={positions.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            disabled={!canEdit}
          />
        </Box>
        <ProfileSubmitButton canEdit={canEdit} label={t('update')} />
      </FormHOC>
    </Box>
  );
};

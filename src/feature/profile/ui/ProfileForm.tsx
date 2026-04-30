'use client';

import { useMutation, useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, CircularProgress, Typography } from '@mui/material';
import type { User } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { FormHOC, FormSelect, FormTextField } from '@/shared/ui';

import { GET_PROFILE, GET_PROFILE_OPTIONS, UPDATE_PROFILE_AND_USER } from '../api';
import { ProfileFormValues, ProfileSchema } from '../module/schema';

import { AvatarBox } from './AvatarBox/AvatarBox';
import { styles } from './ProfileForm.styles';
import { ProfileSubmitButton } from './ProfileSubmitButton';

interface ProfileFormProps {
  userId: string;
  canEdit: boolean;
}

type NamedItem = {
  id: string;
  name: string;
};

type ProfileFormData = {
  user: User;
};

type ProfileOptionsData = {
  departments: NamedItem[];
  positions: NamedItem[];
};

export const ProfileForm = ({ userId, canEdit }: ProfileFormProps) => {
  const t = useTranslations('common');
  const {
    data: profileData,
    loading: loadingProfile,
    error: profileError,
  } = useQuery<ProfileFormData>(GET_PROFILE, {
    variables: { userId },
  });
  const {
    data: optionsData,
    loading: loadingOptions,
    error: optionsError,
  } = useQuery<ProfileOptionsData>(GET_PROFILE_OPTIONS);

  const [updateProfileAndUser] = useMutation(UPDATE_PROFILE_AND_USER);

  const user = profileData?.user;
  const departments = useMemo(() => optionsData?.departments ?? [], [optionsData]);

  const positions = useMemo(() => optionsData?.positions ?? [], [optionsData]);

  const defaultDepartmentId = useMemo(
    () => departments.find((department) => department.name === user?.department_name)?.id ?? '',
    [departments, user?.department_name]
  );
  const defaultPositionId = useMemo(
    () => positions.find((position) => position.name === user?.position_name)?.id ?? '',
    [positions, user?.position_name]
  );

  const defaultValues: ProfileFormValues = {
    firstName: user?.profile.first_name || '',
    lastName: user?.profile.last_name || '',
    department: defaultDepartmentId,
    position: defaultPositionId,
    avatarUrl: user?.profile.avatar || '',
  };

  if (loadingProfile || loadingOptions)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 240,
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (profileError || optionsError || !user) {
    return <div>Failed to load profile</div>;
  }

  const formatted = new Date(Number(user.created_at)).toDateString();

  const onSubmit = async (data: ProfileFormValues) => {
    await updateProfileAndUser({
      variables: {
        profile: {
          userId: user.id,
          first_name: data.firstName,
          last_name: data.lastName,
        },
        user: {
          userId: user.id,
          departmentId: data.department || null,
          positionId: data.position || null,
        },
      },
      refetchQueries: [{ query: GET_PROFILE, variables: { userId } }],
      awaitRefetchQueries: true,
    });
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

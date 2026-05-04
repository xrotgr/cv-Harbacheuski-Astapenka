'use client';

import { useQuery } from '@apollo/client/react';
import PersonIcon from '@mui/icons-material/Person';
import type { User } from 'cv-graphql';

import { GET_PROFILE } from '@/feature/profile';
import { AppBreadcrumbs } from '@/shared/ui';

interface ProfileBreadcrumbsData {
  user: User;
}

interface ProfileBreadcrumbsProps {
  id: string;
}

export const ProfileBreadcrumbs = ({ id }: ProfileBreadcrumbsProps) => {
  const { data } = useQuery<ProfileBreadcrumbsData>(GET_PROFILE, {
    variables: { userId: id },
  });

  const userLabel = data?.user.profile.full_name || data?.user.email || id;

  return (
    <AppBreadcrumbs
      items={[
        { label: 'Employees', href: '/users' },
        {
          label: userLabel,
          icon: <PersonIcon sx={{ fontSize: 18, color: 'error.main' }} />,
        },
      ]}
    />
  );
};

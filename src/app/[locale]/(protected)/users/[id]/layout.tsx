import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import { User } from 'cv-graphql';

import { query } from '@/app/ApolloClient';
import { GET_PROFILE } from '@/feature/profile/api';
import { AppBreadcrumbs } from '@/shared/ui';
import { EmployeeTabs } from '@/widgets/EmployeeTabs';

interface EmployeeTabsProps {
  children: React.ReactNode;
  params: {
    id: string;
    locale: string;
  };
}

export default async function EmployeeLayout({ children, params }: EmployeeTabsProps) {
  const { id } = await params;
  const { data } = await query<{ user: User }>({
    query: GET_PROFILE,
    variables: { userId: id },
  });

  return (
    <Box sx={{ padding: '0 24px 0 24px' }}>
      <AppBreadcrumbs
        items={[
          { label: 'Employees', href: '/users' },
          {
            label: data?.user.profile.full_name || data?.user.email || id,
            icon: <PersonIcon sx={{ fontSize: 18, color: 'error.main' }} />,
          },
        ]}
      />
      <EmployeeTabs id={id} />
      {children}
    </Box>
  );
}

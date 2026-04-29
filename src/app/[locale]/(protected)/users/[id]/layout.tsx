import { Box } from '@mui/material';

import { ProfileBreadcrumbs } from '@/feature/profile';
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

  return (
    <Box sx={{ padding: '0 24px 0 24px' }}>
      <ProfileBreadcrumbs id={id} />
      <EmployeeTabs id={id} />
      {children}
    </Box>
  );
}

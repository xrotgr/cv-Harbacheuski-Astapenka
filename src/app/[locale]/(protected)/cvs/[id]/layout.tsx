import { Box } from '@mui/material';

import { cvTabsConfig } from '@/entities/Cvs/model/cvTabsConfig';
import { AppTabs } from '@/shared/ui/tabs/AppTabs';

export default async function TabbedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const tabs = cvTabsConfig(id);
  return (
    <>
      <AppTabs tabs={tabs} />
      <Box>{children}</Box>
    </>
  );
}

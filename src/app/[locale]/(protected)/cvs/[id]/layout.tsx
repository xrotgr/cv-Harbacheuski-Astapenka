import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';

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
  const t = await getTranslations('CvTabs');
  const tabs = cvTabsConfig(id, t);
  return (
    <>
      <AppTabs tabs={tabs} />
      <Box>{children}</Box>
    </>
  );
}

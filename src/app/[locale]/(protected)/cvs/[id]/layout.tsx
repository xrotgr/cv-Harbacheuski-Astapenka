'use client';
import { useQuery, useSuspenseQuery } from '@apollo/client/react';
import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { GET_CV } from '@/entities/Cvs/api/getCv';
import { cvTabsConfig } from '@/entities/Cvs/model/cvTabsConfig';
import { AppBreadcrumbs } from '@/shared/ui';
import { AppTabs } from '@/shared/ui/tabs/AppTabs';

export default function TabbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const params = useParams();
  const id = String(params.id ?? '');

  const t = useTranslations('CvTabs');
  const tabs = cvTabsConfig(id, t);

  const { data } = useSuspenseQuery(GET_CV, { variables: { cvId: id } });
  const cvName = data.cv.name;

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: 'CVs', href: '/cvs' },
          {
            label: cvName,
          },
        ]}
      />
      <AppTabs tabs={tabs} />
      <Box>{children}</Box>
    </>
  );
}

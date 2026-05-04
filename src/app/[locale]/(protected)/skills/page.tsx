import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { authOptions } from '@/auth';
import { UserSkillsSection } from '@/feature/skills/ui';
import { AppBreadcrumbs } from '@/shared/ui';

export default async function SkillsPage() {
  const t = await getTranslations('Skills');
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppBreadcrumbs items={[{ label: t('pageTitle') }]} />
      <Box sx={{ width: { xs: '100%', sm: '900px' } }}>
        <UserSkillsSection userId={userId} />
      </Box>
    </Box>
  );
}

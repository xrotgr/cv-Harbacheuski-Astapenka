import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { query } from '@/app/ApolloClient';
import { authOptions } from '@/auth';
import { GET_USER_PROFILE_SKILLS } from '@/feature/skills/api/documents';
import { SkillsProfileActions } from '@/feature/skills/ui';
import { AppBreadcrumbs } from '@/shared/ui';

type ProfileSkill = {
  name: string;
  categoryId: string;
  mastery: string;
};

type GetUserSkillsResponse = {
  user: {
    id: string;
    profile: {
      skills: ProfileSkill[];
    };
  } | null;
};

export default async function SkillsPage() {
  const t = await getTranslations('Skills');
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? '';

  const { data } = await query<GetUserSkillsResponse>({
    query: GET_USER_PROFILE_SKILLS,
    variables: { userId },
  });
  const skills = data?.user?.profile?.skills ?? [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppBreadcrumbs items={[{ label: t('pageTitle') }]} />
      <Box sx={{ width: { xs: '100%', sm: '900px' } }}>
        <div>
          {skills.length > 0
            ? skills.map((skill) => (
                <div key={`${skill.name}-${skill.categoryId}`}>
                  {skill.name} ({skill.mastery})
                </div>
              ))
            : t('noSkillsFound')}
        </div>
        <SkillsProfileActions userId={userId} />
      </Box>
    </Box>
  );
}

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { RegisterForm } from '@/feature/auth';
import { authPagesStyles } from '@/shared/styles';
import { ClientLink } from '@/shared/ui';

export default function SignupPage() {
  const t = useTranslations('auth');

  return (
    <Box sx={authPagesStyles.wrapper}>
      <Box sx={authPagesStyles.contentBox}>
        <Typography variant="h4" sx={authPagesStyles.pageHeader}>
          {t('registerNow')}
        </Typography>

        <Typography sx={authPagesStyles.helloText}>{t('registerSubtitle')}</Typography>

        <RegisterForm />

        <ClientLink
          label={t('haveAccount')}
          href="/auth/login"
          sx={authPagesStyles.forgotPassword}
        />
      </Box>
    </Box>
  );
}

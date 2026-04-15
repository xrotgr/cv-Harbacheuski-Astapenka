import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { LoginForm } from '@/feature/auth/ui/LoginForm/LoginForm';
import { authPagesStyles } from '@/shared/styles';
import { ClientLink } from '@/shared/ui';

export default function LoginPage() {
  const t = useTranslations('auth');

  return (
    <Box sx={authPagesStyles.wrapper}>
      <Box sx={authPagesStyles.contentBox}>
        <Typography variant="h4" sx={authPagesStyles.pageHeader}>
          {t('welcomeBack')}
        </Typography>

        <Typography sx={authPagesStyles.helloText}>{t('loginSubtitle')}</Typography>

        <LoginForm />

        <ClientLink
          label={t('forgotPassword').toUpperCase()}
          href="/forgot-password"
          sx={authPagesStyles.forgotPassword}
        />
      </Box>
    </Box>
  );
}

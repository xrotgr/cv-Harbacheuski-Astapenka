import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { RegisterForm } from '@/feature/auth';

import { ClientLink } from '../../shared/ui/ClientLink';

import { styles } from './SignupPage.styles';

export function SignupPage() {
  const t = useTranslations('auth');

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contentBox}>
        <Typography variant="h4" sx={styles.pageHeader}>
          {t('registerNow')}
        </Typography>

        <Typography sx={styles.helloText}>{t('registerSubtitle')}</Typography>

        <RegisterForm />

        <ClientLink label={t('haveAccount')} href="/auth/login" sx={styles.forgotPassword} />
      </Box>
    </Box>
  );
}

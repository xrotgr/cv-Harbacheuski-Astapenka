import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { LoginForm } from '@/feature/auth/ui/LoginForm/LoginForm';

import { styles } from './LoginPage.styles';
import { ForgotPasswordAction } from './ui/ForgotPasswordAction';

export function LoginPage() {
  const t = useTranslations('auth');

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contentBox}>
        <Typography variant="h4" sx={styles.pageHeader}>
          {t('welcomeBack')}
        </Typography>

        <Typography sx={styles.helloText}>{t('loginSubtitle')}</Typography>

        <LoginForm />

        <ForgotPasswordAction label={t('forgotPassword')} sx={styles.forgotPassword} />
      </Box>
    </Box>
  );
}

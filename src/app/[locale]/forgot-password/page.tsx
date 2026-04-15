import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { ForgotForm } from '@/feature/auth';
import { authPagesStyles } from '@/shared/styles';
import { ClientLink } from '@/shared/ui';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');
  const c = useTranslations('common');

  return (
    <Box sx={authPagesStyles.wrapper}>
      <Box sx={authPagesStyles.contentBox}>
        <Typography variant="h4" sx={authPagesStyles.pageHeader}>
          {t('forgotPassword')}
        </Typography>

        <Typography sx={authPagesStyles.helloText}>{t('loginSubtitle')}</Typography>

        <ForgotForm />

        <ClientLink label={c('cancel')} href="/auth/login" sx={authPagesStyles.forgotPassword} />
      </Box>
    </Box>
  );
}

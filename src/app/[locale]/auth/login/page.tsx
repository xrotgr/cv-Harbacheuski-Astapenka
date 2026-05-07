import { useTranslations } from 'next-intl';

import { AuthForm } from '@/feature/auth';
import { AuthPageWrapper } from '@/shared/ui';

export default function LoginPage() {
  const t = useTranslations('auth');

  return (
    <AuthPageWrapper
      header={t('welcomeBack')}
      subtitle={t('loginSubtitle')}
      linkName={t('forgotPassword').toUpperCase()}
      linkPath={'/forgot-password'}
    >
      <AuthForm formType={'login'} />
    </AuthPageWrapper>
  );
}

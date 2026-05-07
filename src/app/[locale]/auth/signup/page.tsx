import { useTranslations } from 'next-intl';

import { AuthForm } from '@/feature/auth';
import { AuthPageWrapper } from '@/shared/ui';

export default function SignupPage() {
  const t = useTranslations('auth');

  return (
    <AuthPageWrapper
      header={t('registerNow')}
      subtitle={t('registerSubtitle')}
      linkName={t('haveAccount')}
      linkPath={'/auth/login'}
    >
      <AuthForm formType={'register'} />
    </AuthPageWrapper>
  );
}

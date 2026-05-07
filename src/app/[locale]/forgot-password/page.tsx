import { useTranslations } from 'next-intl';

import { ForgotForm } from '@/feature/auth';
import { AuthPageWrapper } from '@/shared/ui';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');
  const c = useTranslations('common');

  return (
    <AuthPageWrapper
      header={t('forgotPassword')}
      subtitle={t('forgotSubtitle')}
      linkName={c('cancel')}
      linkPath={'/auth/login'}
    >
      <ForgotForm />
    </AuthPageWrapper>
  );
}

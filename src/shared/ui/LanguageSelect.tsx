'use client';

import { type SelectChangeEvent } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { CustomSelect } from '@/shared/ui';
import { LOCALE_LABELS } from '@/widgets/AuthSettings';

export const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations('auth');

  const localeOptions = useMemo(
    () => routing.locales.map((item) => ({ value: item, text: LOCALE_LABELS[item as Locale] })),
    []
  );

  const handleLocaleChange = (event: SelectChangeEvent<Locale>) => {
    const nextLocale = event.target.value as Locale;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <CustomSelect
      label={t('languageLabel')}
      value={locale}
      options={localeOptions}
      onChange={handleLocaleChange}
    />
  );
};

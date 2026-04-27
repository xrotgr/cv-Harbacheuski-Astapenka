'use client';
import { SelectChangeEvent } from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { CustomSelect } from '@/shared/ui/CustomSelect';

type ColorMode = 'light' | 'dark' | 'system';

export const ThemeSelect = () => {
  const t = useTranslations('Settings');
  const { mode, setMode } = useColorScheme();

  const options: Array<{ value: ColorMode; text: string }> = useMemo(
    () => [
      { value: 'light', text: t('light') },
      { value: 'dark', text: t('dark') },
      { value: 'system', text: t('deviceSettings') },
    ],
    [t]
  );

  if (!mode) {
    return null;
  }

  const handleChange = (e: SelectChangeEvent<ColorMode>) => {
    setMode(e.target.value);
  };

  return (
    <CustomSelect label={t('appearance')} value={mode} options={options} onChange={handleChange} />
  );
};

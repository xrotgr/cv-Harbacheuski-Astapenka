'use client';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Menu, MenuItem, type SelectChangeEvent } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { ThemeSelect } from '@/feature/theme/ui/ThemeSelect';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { CustomSelect } from '@/shared/ui/CustomSelect';

import { LOCALE_LABELS } from '../modal/constants';

import { styles } from './AuthSettingsMenu.styles';

export const AuthSettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations('auth');

  const isOpen = Boolean(anchorEl);
  const localeOptions = useMemo(
    () => routing.locales.map((item) => ({ value: item, text: LOCALE_LABELS[item as Locale] })),
    []
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleChange = (event: SelectChangeEvent<Locale>) => {
    const nextLocale = event.target.value as Locale;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={styles.iconButton} aria-label={t('openSettings')}>
        <SettingsIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem disableRipple sx={styles.menuItem}>
          <Box sx={styles.menuItemBox}>
            <CustomSelect
              label={t('languageLabel')}
              value={locale}
              options={localeOptions}
              onChange={handleLocaleChange}
            />
            <ThemeSelect />
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

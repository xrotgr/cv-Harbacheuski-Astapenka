'use client';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ThemeSelect } from '@/feature/theme/ui/ThemeSelect';
import { LanguageSelect } from '@/shared/ui';

import { styles } from './AuthSettingsMenu.styles';

export const AuthSettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const t = useTranslations('auth');

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <LanguageSelect />
            <ThemeSelect />
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

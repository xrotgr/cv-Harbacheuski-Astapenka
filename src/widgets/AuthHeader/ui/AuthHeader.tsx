'use client';

import { AppBar, Toolbar, Box, Link } from '@mui/material';
import { useTranslations } from 'next-intl';

import { Link as I18nLink, usePathname } from '@/i18n/navigation';

import { styles } from './AuthHeader.styles';

export const Header = () => {
  const t = useTranslations('auth');
  const pathname = usePathname();
  const navItems = [
    { label: t('login'), href: '/auth/login' },
    { label: t('signup'), href: '/auth/signup' },
  ];

  return (
    <AppBar position="static" color="inherit" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                component={I18nLink}
                sx={{
                  ...styles.navItem,
                  ...(isActive ? styles.activeNavItem : {}),
                }}
                href={item.href}
                underline="none"
              >
                {item.label}
              </Link>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

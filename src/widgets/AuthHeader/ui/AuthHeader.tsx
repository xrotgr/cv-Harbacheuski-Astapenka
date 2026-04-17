'use client';

import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
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
        <Tabs value={pathname}>
          {navItems.map((item) => (
            <Tab
              key={item.href}
              label={item.label}
              value={item.href}
              component={I18nLink}
              href={item.href}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

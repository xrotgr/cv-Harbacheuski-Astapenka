'use client';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, List } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { UserMenu } from '@/feature/user-menu/ui/UserMenu';

import { useNavigation } from '../model';

import { styles } from './Sidebar.styles';
import { SidebarItem } from './SidebarItem/SidebarItem';

export const Sidebar = () => {
  const t = useTranslations('sidebar');
  const { selectedPath, items } = useNavigation();
  const [open, setOpen] = useState(true);

  return (
    <Box component="aside" sx={styles.wrapper(open)}>
      <List sx={styles.list}>
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            {...item}
            label={t(item.labelKey)}
            open={open}
            selected={selectedPath === item.path}
          />
        ))}
      </List>

      <Box sx={styles.footer}>
        <UserMenu open={open} />

        <IconButton onClick={() => setOpen((prev) => !prev)} sx={styles.toggleButton}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </Box>
  );
};

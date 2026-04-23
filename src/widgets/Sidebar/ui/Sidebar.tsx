'use client';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Avatar, Box, IconButton, List, Typography } from '@mui/material';
import { useState } from 'react';

import { useNavigation } from '../model';

import { styles } from './Sidebar.styles';
import { SidebarItem } from './SidebarItem/SidebarItem';

export const Sidebar = () => {
  const { selectedPath, items } = useNavigation();
  const [open, setOpen] = useState(true);

  return (
    <Box component="aside" sx={styles.wrapper(open)}>
      <List sx={styles.list}>
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            {...item}
            open={open}
            selected={selectedPath === item.path}
          />
        ))}
      </List>

      <Box sx={styles.footer}>
        <Box sx={styles.footerUser}>
          <Avatar sx={styles.footerAvatar}>R</Avatar>
          {open && (
            <Typography variant="body2" sx={styles.avatarTypography}>
              Rostislav@tlaben
            </Typography>
          )}
        </Box>

        <IconButton onClick={() => setOpen((prev) => !prev)} sx={styles.toggleButton}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </Box>
  );
};

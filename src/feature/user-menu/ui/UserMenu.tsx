'use client';

import { useQuery } from '@apollo/client/react';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { GET_PROFILE } from '@/feature/profile';
import { Link } from '@/i18n/navigation';
import { useUser } from '@/UserProvider/UserContext';

import { styles } from './UserMenu.styles';

interface UserMenuProps {
  open: boolean;
}

interface UserMenuProfileData {
  user: {
    profile: {
      full_name: string | null;
      avatar: string | null;
    };
  };
}

export const UserMenu = ({ open }: UserMenuProps) => {
  const t = useTranslations('sidebar');
  const user = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const profileHref = `/users/${user.id}/profile`;
  const { data } = useQuery<UserMenuProfileData>(GET_PROFILE, {
    variables: { userId: user.id },
    skip: !user.id,
  });
  const fullName = data?.user?.profile?.full_name?.trim();
  const avatarUrl = data?.user?.profile?.avatar;
  const userLabel = fullName || user.email;
  const avatarFallback = (userLabel?.[0] ?? 'U').toUpperCase();

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  const handleLogout = async () => {
    closeMenu();
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <>
      <Box sx={styles.footerUser} onClick={openMenu}>
        <Avatar src={avatarUrl || undefined} sx={styles.footerAvatar}>
          {avatarFallback}
        </Avatar>
        {open && (
          <Typography variant="body2" sx={styles.avatarTypography}>
            {userLabel}
          </Typography>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        slotProps={{ paper: { sx: styles.menuPaper } }}
      >
        <MenuItem
          component={Link}
          href={profileHref}
          prefetch
          onClick={closeMenu}
          sx={styles.menuItem}
        >
          <ListItemIcon>
            <PersonOutlineRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('profile')} />
        </MenuItem>
        <MenuItem
          component={Link}
          href="/settings"
          prefetch
          onClick={closeMenu}
          sx={styles.menuItem}
        >
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('settings')} />
        </MenuItem>
        <Divider sx={styles.logoutDivider} />
        <MenuItem onClick={handleLogout} sx={styles.menuItem}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('logout')} />
        </MenuItem>
      </Menu>
    </>
  );
};

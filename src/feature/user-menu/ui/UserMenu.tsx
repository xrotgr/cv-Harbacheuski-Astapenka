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
import { useState } from 'react';

import { Link } from '@/i18n/navigation';

import { styles } from './UserMenu.styles';

interface UserMenuProps {
  email: string;
  userId: string;
  open: boolean;
}

export const UserMenu = ({ email, userId, open }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const profileHref = `/users/${userId}/profile`;

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
        <Avatar sx={styles.footerAvatar}>{(email?.[0] ?? 'U').toUpperCase()}</Avatar>
        {open && (
          <Typography variant="body2" sx={styles.avatarTypography}>
            {email}
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
          <ListItemText primary="Profile" />
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
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider sx={styles.logoutDivider} />
        <MenuItem onClick={handleLogout} sx={styles.menuItem}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

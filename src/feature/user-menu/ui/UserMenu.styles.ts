export const styles = {
  footerUser: {
    display: 'flex',
    flexDirection: { xs: 'row', sm: 'row' },
    alignItems: 'center',
    justifyContent: { xs: 'center', md: 'flex-start' },
    mb: { xs: 0.5, md: 1 },
    cursor: 'pointer',
    borderRadius: 1,
    px: 1,
    py: 0.75,
    width: '100%',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
  footerAvatar: {
    mr: 1,
    bgcolor: 'primary.main',
  },
  avatarTypography: {
    display: { xs: 'none', sm: 'block' },
    fontSize: '16px',
  },
  menuPaper: {
    minWidth: 220,
    borderRadius: 2,
    boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
    border: '1px solid #e5e5e5',
    mt: 1,
  },
  menuItem: {
    py: 1.2,
    px: 1.5,
    gap: 1.25,
    color: '#2f2f2f',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  logoutDivider: {
    my: 0.5,
  },
};

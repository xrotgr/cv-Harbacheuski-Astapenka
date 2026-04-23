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
      backgroundColor: 'action.hover',
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
    boxShadow: (theme: { shadows: string[] }) => theme.shadows[8],
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    mt: 1,
  },
  menuItem: {
    py: 1.2,
    px: 1.5,
    gap: 1.25,
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  logoutDivider: {
    my: 0.5,
  },
};

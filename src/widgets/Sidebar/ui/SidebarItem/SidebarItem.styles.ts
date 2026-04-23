export const styles = {
  item: (mobile: boolean, selected: boolean) => ({
    m: 0,
    py: { xs: '8px', md: '16px' },
    px: mobile ? 0.5 : 2,
    borderRadius: { xs: '200px', md: '0 200px 200px 0' },
    minHeight: mobile ? 56 : 44,
    minWidth: { xs: 56, sm: 'auto', md: '100%' },
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'start',
    '& .MuiListItemIcon-root': {
      minWidth: mobile ? 'auto' : 36,
      color: 'inherit',
    },
    '& .MuiListItemText-root': {
      m: 0,
    },
    '& .MuiListItemText-primary': {
      lineHeight: mobile ? '14px' : '20px',
      whiteSpace: 'nowrap',
    },
    '&.Mui-selected': {
      backgroundColor: 'action.hover',
    },
    '&:hover': {
      backgroundColor: mobile ? 'action.hover' : selected ? 'primary.dark' : 'action.hover',
    },
  }),
  icon: {
    display: 'flex',
    justifyContent: 'center',
  },
};

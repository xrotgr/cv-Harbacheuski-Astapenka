export const styles = {
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'inherit',
    backgroundImage: 'none',
    color: 'inherit',
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 58,
    px: 2,
  },

  nav: {
    display: 'flex',
    gap: 20,
    height: '100%',
    alignItems: 'center',
  },

  navItem: {
    color: 'text.primary',
    fontSize: 14,
    fontWeight: 500,
    padding: {
      md: '10px 40px',
      sm: '7px 30px',
      xs: '5px 10px',
    },
    cursor: 'pointer',
    position: 'relative',
    textTransform: 'uppercase',
    pb: '14px',
    transition: 'color .2s ease',

    '&:hover': {
      color: '#ea2f2f',
    },
  },

  activeNavItem: {
    color: '#ea2f2f',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#ea2f2f',
    },
  },
};

export const styles = {
  wrapper: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'text.primary',
  },
  contentBox: {
    width: {
      xs: '900%',
      sm: '80%',
      md: '40%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeader: {
    mb: 1,
    fontSize: 42,
    textAlign: 'center',
  },
  helloText: {
    mb: 4,
    fontSize: 14,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#777',
    fontSize: 12,
    fontWeight: 750,
    mt: 2.5,
    width: '100%',
    textAlign: 'center',
    border: 0,
    background: 'transparent',
    p: 0,
    cursor: 'pointer',
    '&:focus': {
      transform: 'scale(1.1)',
    },
  },
};

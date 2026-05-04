export const styles = {
  container: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    mt: 4,
    width: '100%',
  },
  addButton: {
    color: 'grey.500',
    fontWeight: 500,
    letterSpacing: '0.08em',
    '&:hover': {
      color: 'grey.300',
      backgroundColor: 'transparent',
    },
  },
  removeButton: {
    color: 'primary.main',
    fontWeight: 500,
    letterSpacing: '0.08em',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};

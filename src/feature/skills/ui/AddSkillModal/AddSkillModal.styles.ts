export const styles = {
  dialogTitle: {
    fontSize: '20px',
    fontWeight: 400,
    pt: '10px',
    px: '50px',
    mb: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 7,
    right: 20,
  },
  dialogContent: {
    width: { xs: '80vw', sm: '600px' },
    px: 3,
    pb: 3,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  menuPaper: {
    maxHeight: 360,
  },
  categoryHeader: {
    color: 'error.main',
  },
  actions: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'flex-end',
    gap: 2,
  },
  actionButton: {
    minWidth: { xs: '100%', sm: '220px' },
    borderRadius: 40,
    py: 1,
  },
};

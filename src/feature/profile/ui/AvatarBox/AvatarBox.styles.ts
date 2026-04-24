export const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { sx: '32px', md: '64px' },
    mb: 2,
  },
  avatarWrapper: {
    position: 'relative',
    mb: 2,
  },
  avatar: {
    width: '120px',
    height: '120px',
  },
  uploadButton: {
    fontWeight: 500,
    fontSize: '20px',
    color: 'text.primary',
  },
  uploadIcon: {
    width: '35px',
    height: '35px',
  },
  uploadSubtitle: {
    fontWeight: 400,
    fontSize: '16px',
    color: 'text.secondary',
  },
  controlledBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  removeButton: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
};

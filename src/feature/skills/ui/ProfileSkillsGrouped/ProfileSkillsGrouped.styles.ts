export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    py: 1,
  },

  section: {
    mt: 4,
    '&:first-of-type': {
      mt: 0,
    },
  },

  sectionTitle: {
    color: 'text.primary',
    fontWeight: 400,
    fontSize: 16,
    mb: 2.5,
  },

  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, minmax(0, 1fr))',
      md: 'repeat(3, minmax(0, 1fr))',
    },
    columnGap: { xs: 2, sm: 3, md: 4 },
    rowGap: 2.5,
    alignItems: 'center',
  },

  skillCell: {
    minWidth: 0,
    width: '100%',
  },

  skillRow: {
    position: 'relative',
    minWidth: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    pl: 0,
    transition: 'padding-left 0.15s ease',
  },

  skillRowRemoval: {
    pl: 4,
  },

  skillSelectCheckbox: {
    position: 'absolute',
    left: -4,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'none',
    p: 0.25,
    zIndex: 1,
  },

  skillSelectCheckboxVisible: {
    display: 'inline-flex',
  },

  emptyState: {
    color: 'text.secondary',
    fontSize: 15,
    py: 2,
  },

  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    py: 6,
  },
} as const;

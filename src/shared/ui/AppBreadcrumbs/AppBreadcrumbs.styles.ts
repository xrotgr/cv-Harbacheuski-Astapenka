import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    color: 'text.secondary',
    width: '100%',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },

  text: {
    color: 'text.secondary',
    fontWeight: 400,
  },

  secondText: {
    color: 'error.main',
    fontWeight: 500,
  },

  icon: {
    fontSize: 16,
  },
};

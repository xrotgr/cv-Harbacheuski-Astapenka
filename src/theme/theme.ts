'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'rgb(198, 48, 49)',
        },
        background: {
          default: 'rgb(245, 245, 247)',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: 'rgb(198, 48, 49)',
        },
        background: {
          default: 'rgb(53, 53, 53)',
        },
      },
    },
  },
});

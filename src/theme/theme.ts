'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'rgb(198, 48, 49)',
        },
        text: {
          primary: 'rgb(38, 38, 38)',
          secondary: 'rgb(120, 120, 120)',
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
        text: {
          primary: 'rgb(238, 238, 238)',
          secondary: 'rgb(180, 180, 180)',
        },
        background: {
          default: 'rgb(53, 53, 53)',
        },
      },
    },
  },
});

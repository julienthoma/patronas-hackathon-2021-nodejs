import { ThemeOptions } from '@material-ui/core';
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const themeOptions: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: blue[600],
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          paddingTop: '64px',
          paddingBottom: '26px',
          background: '#2d3436',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: '#646464',
        },
        '*::-webkit-scrollbar-track-piece': {
          backgroundColor: '#000',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#666',
          borderRadius: '3px',
        },
        '*::-webkit-scrollbar-corner': {
          backgroundColor: '#646464',
        },
        '*::-webkit-resizer': {
          backgroundColor: '#666',
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
};

export const theme = unstable_createMuiStrictModeTheme(themeOptions);

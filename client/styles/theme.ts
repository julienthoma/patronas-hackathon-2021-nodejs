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
          background: '#2d3436',
          backgroundImage: 'url("assets/img/stats-background.png")',
          backgroundSize: 'cover',
          fontFamily: 'Barlow'
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
        '#weapon': {
          fill: 'rgba(255,186,0,0.6)',
          stroke: '#FFBA00',
        }
      },
    },
  },
};

export const theme = unstable_createMuiStrictModeTheme(themeOptions);

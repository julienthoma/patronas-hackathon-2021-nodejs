import { ThemeProvider } from '@material-ui/styles';
import { theme } from './styles/theme';
import { CssBaseline } from '@material-ui/core';
import React, { ReactNode } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store/store';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isToday);

interface Props {
  children: ReactNode | ReactNode[];
}

export const Providers = ({ children }: Props): JSX.Element => {
  return (
    <React.StrictMode>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <CssBaseline>
              <BrowserRouter>{children}</BrowserRouter>
            </CssBaseline>
          </HelmetProvider>
        </ThemeProvider>
      </StoreProvider>
    </React.StrictMode>
  );
};

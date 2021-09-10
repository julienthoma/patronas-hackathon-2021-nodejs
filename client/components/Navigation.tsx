import { AppBar, Box, Toolbar, Typography, useTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { LibraryBooks, Translate } from '@material-ui/icons';
import { AppRoute } from '../types/routes';
import { NavigationLink } from './NavigationLink';

export const Navigation = (): JSX.Element => {
  const theme = useTheme();
  return (
    <AppBar style={{ background: theme.palette.type === 'light' ? grey[100] : grey[800] }}>
      <Toolbar>
        <Box mr={5}>
          <Typography variant="h2" />
        </Box>

        <NavigationLink to={AppRoute.StartPage} icon={<Translate />} title="Exporters">
          Home
        </NavigationLink>
        <NavigationLink to={AppRoute.ExamplePage} icon={<LibraryBooks />} title="Export Runs">
          Example
        </NavigationLink>
      </Toolbar>
    </AppBar>
  );
};

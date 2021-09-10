import { Box, Button, SvgIconProps, useTheme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  icon?: ReactElement<SvgIconProps>;
  title?: string;
  children: React.ReactNode;
}

export const NavigationLink = ({ to, icon, title, children }: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Box mx={1}>
      <Button
        title={title}
        component={NavLink}
        variant="text"
        exact
        to={to}
        startIcon={icon}
        activeStyle={{ background: theme.palette.primary.dark }}
      >
        {children}
      </Button>
    </Box>
  );
};

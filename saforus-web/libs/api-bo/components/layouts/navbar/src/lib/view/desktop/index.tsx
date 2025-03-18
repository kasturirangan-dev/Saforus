import { Box } from '@mui/material';
import React from 'react';

export interface TabItem {
  name: string;
  path: string;
}

export interface DesktopNavbarActionsProps {
  children?: React.ReactNode;
}

export const DesktopNavbarActions = (props: DesktopNavbarActionsProps) => {
  const { children } = props;

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 'auto',
        gap: '10px',
      }}
    >
      {children}
    </Box>
  );
};

export default React.memo(DesktopNavbarActions);

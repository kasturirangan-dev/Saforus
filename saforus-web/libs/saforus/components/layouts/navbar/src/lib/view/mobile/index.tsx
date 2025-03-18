import { Box } from '@mui/material';
import React from 'react';
import NavbarActions from './actions';

const MobileToolbar = () => {
  return (
    <Box sx={{ justifyContent: 'flex-end', display: { xs: 'flex', md: 'none' } }}>
      <NavbarActions />
    </Box>
  );
};

export default React.memo(MobileToolbar);

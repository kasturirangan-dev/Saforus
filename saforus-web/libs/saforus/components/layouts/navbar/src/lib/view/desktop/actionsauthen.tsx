import React from 'react';
import Box from '@mui/material/Box';

import Avatar, { CustomAvatarProps } from '@web-workspace/shared/components/widgets/avatar';

const NavbarActionsWithAuth = (props: CustomAvatarProps) => {
  return (
    <Box sx={{
      display: { xs: 'none', md: 'flex' },
      alignItems: 'center',
      marginLeft: '1.5rem',
    }}>
      <Avatar {...props} />
    </Box>
  );
};

export default React.memo(NavbarActionsWithAuth);

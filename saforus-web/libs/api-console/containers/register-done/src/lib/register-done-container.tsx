import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';
import RegisterDoneComponent from '@web-workspace/api-console/components/register-done';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--base-black)',
}));

export interface RegisterDoneContainerProps {
  email?: string;
}

const RegisterDoneContainer = (props: RegisterDoneContainerProps) => {
  return (
    <StyledBox>
      <NavbarContainer logo={'light'} />
      <Grid
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'auto',
          position: 'relative',
        }}
        display="flex"
        flexDirection="row"
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RegisterDoneComponent {...props} />
        </Box>
      </Grid>
    </StyledBox>
  );
};

export default React.memo(RegisterDoneContainer);

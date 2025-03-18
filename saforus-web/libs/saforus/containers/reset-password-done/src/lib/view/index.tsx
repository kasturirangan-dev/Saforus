import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/saforus/components/layouts/navbar';
import ResetPasswordDoneComponent from '@web-workspace/saforus/components/reset-password-done';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--base-black)',
}));

const ResetPasswordDoneView = () => {
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
          <ResetPasswordDoneComponent />
        </Box>
      </Grid>
    </StyledBox>
  );
};

export default React.memo(ResetPasswordDoneView);

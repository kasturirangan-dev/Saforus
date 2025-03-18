import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/saforus/components/layouts/navbar';
import NewPasswordForm from '@web-workspace/saforus/components/reset-account-password';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--base-black)',
}));

export interface ResetPasswordViewProps {
  token?: string;
  email?: string;
}

const NewPasswordView = (props: ResetPasswordViewProps) => {
  return (
    <StyledBox>
      <NavbarContainer logo={'light'} />
      <Grid
        sx={{
          position: 'relative',
          justifyContent: 'center',
          display: 'flex',
          flexGrow: 1,
          overflow: 'auto',
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
            display: 'flex',
            overflowY: 'scroll',
          }}
        >
          <NewPasswordForm {...props} />
        </Box>
      </Grid>
    </StyledBox>
  );
};

export default React.memo(NewPasswordView);

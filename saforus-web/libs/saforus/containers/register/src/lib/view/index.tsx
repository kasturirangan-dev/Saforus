import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import NavbarContainer, {
  NavbarActions,
} from '@web-workspace/saforus/components/layouts/navbar';
import { RegisterForm } from '@web-workspace/saforus/components/register/form';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--base-black)',
}));

const RegisterView = () => {
  return (
    <StyledBox>
      <NavbarContainer logo={'light'}>
        <NavbarActions />
      </NavbarContainer>
      <Grid
        sx={{
          position: 'relative',
          justifyContent: 'center',
          display: 'flex',
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RegisterForm />
        </Box>
      </Grid>
    </StyledBox>
  );
};

export default React.memo(RegisterView);

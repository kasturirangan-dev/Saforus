import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import NavbarContainer, {
  NavbarActions,
} from '@web-workspace/saforus/components/layouts/navbar';
import { ResetPasswordForm } from '@web-workspace/saforus/components/resetpassword/form';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--base-black)',
}));

const ResetPasswordView = () => {
  return (
    <StyledBox>
      <NavbarContainer logo={'light'}>
        <NavbarActions />
      </NavbarContainer>

      <Box display="flex" width="100%" height="100%">
        <ResetPasswordForm />
      </Box>
    </StyledBox>
  );
};

export default React.memo(ResetPasswordView);

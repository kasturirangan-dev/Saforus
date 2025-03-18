import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';
import ResetPasswordDoneComponent from '@web-workspace/api-console/components/reset-password-done';
import { Footer } from '@web-workspace/api-console/common/views';

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
      <ResetPasswordDoneComponent />
      <Footer />
    </StyledBox>
  );
};

export default React.memo(ResetPasswordDoneView);

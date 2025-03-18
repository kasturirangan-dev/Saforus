import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';
import VerifyEmailComponent from '@web-workspace/api-console/components/verify-email';
import { ContainerVerifyEmailProps } from '../interface';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--base-black)',
}));

const ContainerVerifyEmailView = (props: ContainerVerifyEmailProps) => {
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
          <VerifyEmailComponent {...props} />
        </Box>
      </Grid>
    </StyledBox>
  );
};

export default React.memo(ContainerVerifyEmailView);

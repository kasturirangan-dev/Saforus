import { Box, Grid, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';
import RegisterCompletedComponent from '@web-workspace/api-console/components/register-completed';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

export function RegisterCompletedContainer() {
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
          <RegisterCompletedComponent />
        </Box>
      </Grid>
    </StyledBox>
  );
}

export default RegisterCompletedContainer;

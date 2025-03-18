import { Box, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';
import ApiConsleResetPasswordContainer from '@web-workspace/api-console/containers/reset-password';
import { Footer } from '@web-workspace/api-console/common/views';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

export function ApiConsleResetPasswordPage() {
  return (
    <StyledBox>
      <NavbarContainer logo={'light'} />
      <ApiConsleResetPasswordContainer />
      <Footer />
    </StyledBox>
  );
}

export default ApiConsleResetPasswordPage;

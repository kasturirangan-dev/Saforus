import { Box, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';
import ApiConsleLoginContainer from '@web-workspace/api-console/containers/login';
import { Footer } from '@web-workspace/api-console/common/views';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

export function ApiConsoleLoginPage() {
  return (
    <StyledBox>
      <NavbarContainer logo={'light'} />
      <ApiConsleLoginContainer />
      <Footer />
    </StyledBox>
  );
}

export default ApiConsoleLoginPage;

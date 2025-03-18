import { Box, styled } from '@mui/material';
import NavbarContainer from '@web-workspace/api-bo/components/layouts/navbar';
import CsApiBoLoginContainer from '@web-workspace/api-bo/containers/login';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

export function CsApiBoLoginPage() {
  return (
    <StyledBox>
      <NavbarContainer logo={'light'} />
      <CsApiBoLoginContainer />
    </StyledBox>
  );
}

export default CsApiBoLoginPage;

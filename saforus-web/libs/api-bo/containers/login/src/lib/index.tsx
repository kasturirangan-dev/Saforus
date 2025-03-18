import React from 'react';
import { Box, styled } from '@mui/material';
import LoginForm from '@web-workspace/api-bo/components/login/form';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  backgroundColor: 'var(--base-white)',
}));

const CsApiBoLoginContainer = () => {
  return (
    <StyledBox>
      <LoginForm />
    </StyledBox>
  );
};

export default React.memo(CsApiBoLoginContainer);

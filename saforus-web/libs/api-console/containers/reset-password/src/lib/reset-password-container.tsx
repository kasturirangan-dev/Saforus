import React from 'react';
import { Box, styled } from '@mui/material';
import ResetPasswordForm from '@web-workspace/api-console/components/reset-password/form';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  backgroundColor: 'var(--base-white)',
}));

const ApiConsleResetPasswordContainer = () => {
  return (
    <StyledBox>
      <ResetPasswordForm />
    </StyledBox>
  );
};

export default React.memo(ApiConsleResetPasswordContainer);
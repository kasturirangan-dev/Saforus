import React from 'react';
import { Box, styled } from '@mui/material';
import NewPasswordForm from '@web-workspace/api-console/components/reset-account-password';
import NavbarContainer from '@web-workspace/api-console/components/layouts/navbar';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '80vh',
  width: '100%',
  backgroundColor: 'var(--base-white)',
  flexDirection: 'column',
}));

export interface ResetPasswordViewProps {
  token?: string;
  email?: string;
}

const NewPasswordView = (props: ResetPasswordViewProps) => {
  return (
    <>
      <NavbarContainer logo={'light'} />
      <StyledBox>
        <NewPasswordForm {...props} />
      </StyledBox>
    </>
  );
};

export default React.memo(NewPasswordView);

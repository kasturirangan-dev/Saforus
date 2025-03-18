import React, { useState } from 'react';
import { Box } from '@mui/material';
import ResetPasswordFormView from './view/reset-password';
import SentEmailContainer from './sent-reset/index';
import { useResetPasswordData } from './data';

export function ResetPasswordForm() {
  const [isResetPasswordInitiated, setIsResetPasswordInitiated] =
    useState(false);
  const [resetUserAccountInfo, setResetUserAccountInfo] = useState(null);

  const handleSuccess = (response: any) => {
    setIsResetPasswordInitiated(true);
  };

  const { handleSubmit, onSubmit, register, errors, isLoading } =
    useResetPasswordData(handleSuccess);

  const onClickSubmit = (data: any) => {
    setResetUserAccountInfo(data?.email);
    setIsResetPasswordInitiated(false); // Reset the state
    onSubmit(data);
  };

  return (
    <Box margin="auto">
      {isResetPasswordInitiated ? (
        <SentEmailContainer userEmail={resetUserAccountInfo} />
      ) : (
        <ResetPasswordFormView
          handleSubmit={handleSubmit}
          onSubmit={onClickSubmit}
          register={register}
          errors={errors}
          loading={isLoading}
        />
      )}
    </Box>
  );
}

export default React.memo(ResetPasswordForm);

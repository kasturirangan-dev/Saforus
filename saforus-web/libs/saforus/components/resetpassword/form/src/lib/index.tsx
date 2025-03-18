import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { Box } from '@mui/material';

import ResetPasswordFormView from './view';
import { useResetPasswordData } from './data';

import SentEmailContainer from './sent-reset/index';

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const [isResetPasswordInitiated, setIsResetPasswordInitiated] =
    useState(false);
  const [isResetPasswordFailed, setIsResetPasswordFailed] = useState(false);
  const [isResetPasswordBlocked, setIsResetPasswordBlocked] = useState(false);
  const [resetUserAccountInfo, setResetUserAccountInfo] = useState(null);

  const { handleSubmit, onSubmit, register, errors, loading } =
    useResetPasswordData();

  const onClickSubmit = async (data: any) => {
    setResetUserAccountInfo(data);
    const res = await onSubmit(data);
    if (res?.isSuccess === false) {
      switch (res?.data?.status) {
        case 400:
        case 404:
          setIsResetPasswordFailed(true);
          break;
        case 406:
          setIsResetPasswordBlocked(true);
          break;
        default:
          showToast.error(`${t(res.data.messageKey)}`, {
            delay: 0,
          });
          break;
      }
    } else {
      setIsResetPasswordInitiated(true);
    }
  };

  return (
    <Box margin="auto">
      {isResetPasswordInitiated ? (
        <SentEmailContainer
          userInfo={resetUserAccountInfo}
          failed={isResetPasswordFailed}
          blocked={isResetPasswordBlocked}
        />
      ) : (
        <ResetPasswordFormView
          handleSubmit={handleSubmit}
          onSubmit={onClickSubmit}
          register={register}
          errors={errors}
          loading={loading}
        />
      )}
    </Box>
  );
}

export default React.memo(ResetPasswordForm);

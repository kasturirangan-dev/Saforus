import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useAccountActivateData } from './data';
import { ComponentVerifyEmailProps, IActivationRequest } from './interface';
import VerifyEmailView from './view/verify-email';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useTranslation } from 'react-i18next';
import { useResendEmailData } from './data/reactive-email';
import React, { useEffect } from 'react';
import ActivationExpired from './view/activation-expired';
import { Backdrop, Box, CircularProgress } from '@mui/material';

export function VerifyEmailComponent(props: ComponentVerifyEmailProps) {
  const { token, email } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showResend, setShowResend] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const { onSubmit, loading } = useAccountActivateData();
  const {
    handleSubmit,
    errors,
    register,
    onSubmit: onSubmitEmail,
    loading: loadingResend,
    resultResendEmail,
  } = useResendEmailData();

  useEffect(() => {
    if (resultResendEmail?.isSuccess === true) {
      setCompleted(true);
      setShowResend(false);
    } else {
      if (resultResendEmail?.data?.messageKey) {
        showToast.error(`${t(resultResendEmail.data.messageKey)}`, {
          delay: 0,
        });
      }
    }
  }, [resultResendEmail]);

  const onClose = () => {
    navigate(ROUTES.LOGIN.path, { replace: true });
  };

  const onClickSubmit = async () => {
    if (completed) {
      onClose();
      return;
    }

    const reqData: IActivationRequest = {
      jwt: token ?? '',
      targetUserName: email ?? '',
    };

    const res = await onSubmit(reqData);
    if (res.isSuccess === true) {
      navigate(ROUTES.REGISTER_COMPLETED.path);
    } else {
      if (
        res.data.status === 401 ||
        res.data.status === 401019 ||
        res.data.status === 401024
      ) {
        setShowResend(true);
      } else {
        if (res?.data?.messageKey) {
          showToast.error(`${t(res.data.messageKey)}`, {
            delay: 0,
          });
        }
      }
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Backdrop
        open={loading || loadingResend}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {showResend && (
        <ActivationExpired
          handleSubmit={handleSubmit}
          onSubmit={onSubmitEmail}
          loading={loadingResend}
          register={register}
          onClose={onClose}
          errors={errors}
        />
      )}
      {showResend === false && (
        <VerifyEmailView
          onSubmit={onClickSubmit}
          loading={loading}
          email={email}
          completed={completed}
        />
      )}
    </Box>
  );
}

export default VerifyEmailComponent;

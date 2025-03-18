import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { useAccountActivateData } from './data';
import { ComponentVerifyEmailProps, IActivationRequest } from './interface';
import VerifyEmailView from './view/verify-email';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
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
  const { onSubmit, loading, isTokenExpired } = useAccountActivateData(
    token || ''
  );
  const {
    resendVerificationEmail,
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
    navigate(API_ROUTES.LOGIN.path, { replace: true });
  };

  const onClickSubmit = async () => {
    const reqData: IActivationRequest = {
      jwt: token ?? '',
    };

    const res = await onSubmit(reqData);
    if (res.isSuccess === true) {
      navigate(API_ROUTES.REGISTER_COMPLETED.path);
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
      {showResend ||
        (isTokenExpired && (
          <ActivationExpired
            resend={resendVerificationEmail}
            loading={loadingResend}
            onClose={onClose}
            email={email}
          />
        ))}
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

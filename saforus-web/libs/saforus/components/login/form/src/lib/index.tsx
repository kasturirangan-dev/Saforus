import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { showToast } from '@web-workspace/saforus/common/utils';
import LoginFormView from './view';
import { useLoginData } from './data';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);

  const { handleSubmit, onSubmit, register, setValue, errors, loading } =
    useLoginData();
  const [countWrongPass, setCountWrongPass] = React.useState(0);

  useEffect(() => {
    if (paramsAsObject?.email) {
      setValue('email', paramsAsObject?.email);
    }
  }, [paramsAsObject?.email]);

  const onClickSubmit = async (data: any) => {
    let reqData = data;
    const invitationToken = paramsAsObject?.token ?? null;
    const aws_token = paramsAsObject?.aws_token ?? null;
    if (invitationToken) {
      reqData = { ...data, teamInvitationToken: invitationToken };
    }
    if (aws_token) {
      reqData = { ...reqData, awsToken: aws_token };
    }

    const res = await onSubmit(reqData);
    showToast.dismiss();
    if (res?.isSuccess === false) {
      // FIXME: 405 is not a good way to check wrong password
      if (res.data.status === 401005) {
        const count = countWrongPass + 1;
        setCountWrongPass(count);
        if (countWrongPass >= 4) {
          // navigate(ROUTES.RESET.path, { replace: true });
          showToast.error(`${t('api.login.401014')}`, {
            delay: 0,
          });
        } else {
          showToast.error(`${t('api.login.401005')}`, {
            delay: 0,
          });
        }
      } else if (res.data.status === 403 || res.data.status === 401014) {
        // navigate(ROUTES.RESET.path, { replace: true });
        setCountWrongPass(5);
        showToast.error(`${t('api.login.401014')}`, {
          delay: 0,
        });
      } else if (res.data.status === 500 || res.data.status === 501002) {
        showToast.error(`${t('api.login.501002')}`, {
          delay: 0,
        });
      } else {
        setCountWrongPass(0);
        showToast.error(`${t(res.data.messageKey)}`, {
          delay: 0,
        });
      }
    }
  };

  return (
    <LoginFormView
      handleSubmit={handleSubmit}
      onSubmit={onClickSubmit}
      register={register}
      errors={errors}
      loading={loading}
      disabled={countWrongPass >= 5}
    />
  );
}

export default React.memo(LoginForm);

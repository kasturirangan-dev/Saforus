import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/shared/components/widgets/toast';

import { useRegisterData } from './data';
import RegisterFormView from './view';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useSnapshot } from 'valtio';

export function RegisterForm() {
  const location = useLocation();
  const { googleName, googleEmail, googleToken } = location.state || {};

  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openDialog } = useSnapshot(DialogStore);
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    loading,
    setValue,
    getValues,
    watch,
    control,
    clearErrors,
  } = useRegisterData();

  const onClickSubmit = async (data: any) => {
    const res = await onSubmit(data);
    if (res.isSuccess === true && res?.data?.code !== 'CSA1102') {
      navigate(ROUTES.REGISTER_DONE.path, { state: { email: data.email } });
      // Add tracking event after successfully register
      logEventAnalytics(TrackingEvent.User_Logged);
    } else {
      // showToast.dismiss();
      // if (res?.data?.code === 'CSA1102') {
      //   showToast.error(`${t('api.signup.CSA1102')}`, {
      //     delay: 0,
      //   });
      // } else if (res?.data?.messageKey) {
      //   showToast.error(`${t(res.data.messageKey)}`, {
      //     delay: 0,
      //   });
      // } else {
      //   showToast.error(`${t('api.unknown-error')}`, {
      //     delay: 0,
      //   });
      // }
      openDialog({
        name: DialogType.RegisterError,
      });
    }
  };

  return (
    <RegisterFormView
      handleSubmit={handleSubmit}
      onSubmit={onClickSubmit}
      register={register}
      watch={watch}
      errors={errors}
      loading={loading}
      setValue={setValue}
      getValues={getValues}
      control={control}
      clearErrors={clearErrors}
    />
  );
}

export default RegisterForm;

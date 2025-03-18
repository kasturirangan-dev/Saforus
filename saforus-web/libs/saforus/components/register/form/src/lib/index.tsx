import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

import { useRegisterData } from './data';
import RegisterFormView from './view';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';

export function RegisterForm() {
  const location = useLocation();
  const { googleName, googleEmail, googleToken } = location.state || {};

  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);

  const [disabledCompany, setDisabledCompany] = useState(false);
  const [disabledCountry, setDisabledCountry] = useState(false);
  const [disabledEmail, setDisabledEmail] = useState(false);
  const [country, setCountry] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    loading,
    countries,
    setValue,
    getValues,
    watch,
    control
  } = useRegisterData();

  useEffect(() => {
    if (paramsAsObject?.token) {
      setValue('teamInvitationToken', paramsAsObject?.token);
    }
    if (paramsAsObject?.aws_token) {
      setValue('awsToken', paramsAsObject?.aws_token);
    }
    if (googleToken) {
      setValue('token', googleToken);
    }
    if (googleEmail) {
      setValue('email', googleEmail);
      setDisabledEmail(true);
      if (googleName) {
        setValue('name', googleName);
      }
    } else if (paramsAsObject?.email) {
      setValue('email', paramsAsObject?.email);
      setDisabledEmail(true);
      if (paramsAsObject?.fullname) {
        if (getValues('name') === '') {
          setValue('name', paramsAsObject?.fullname);
        }
      } else {
        setValue('name', 'Master');
      }
    } else {
      setDisabledEmail(false);
    }

    if (paramsAsObject?.company) {
      setValue('company', paramsAsObject?.company);
      setDisabledCompany(true);
    } else {
      setDisabledCompany(false);
    }
  }, [paramsAsObject, googleEmail, googleName, googleToken, setValue, getValues]);

  // useEffect(() => {
  //   if (paramsAsObject?.countryCode) {
  //     setValue('countryCode', paramsAsObject?.country);

  //     const countryItem = countries.find(
  //       (e) => e?.countryCode === paramsAsObject?.countryCode
  //     );

  //     if (countryItem) {
  //       setValue('shortName', countryItem?.shortName || '');
  //       setValue('country', countryItem?.country || '');
  //       setCountry(countryItem);
  //     }

  //     setDisabledCountry(true);
  //   } else {
  //     setDisabledCountry(false);
  //   }
  // }, [paramsAsObject?.countryCode, countries]);

  const onClickSubmit = async (data: any) => {
    const res = await onSubmit(data);
    if (res.isSuccess === true) {
      navigate(ROUTES.REGISTER_DONE.path, { state: { email: data.email } });
      // Add tracking event after successfully register
      logEventAnalytics(TrackingEvent.User_Logged);
    } else {
      showToast.dismiss();
      if (res?.data?.messageKey) {
        showToast.error(`${t(res.data.messageKey)}`, {
          delay: 0,
        });
      } else {
        showToast.error(`${t('api.unknown-error')}`, {
          delay: 0,
        });
      }
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
      countries={countries}
      country={country}
      disabledCompany={disabledCompany}
      disabledCountry={disabledCountry}
      disabledEmail={disabledEmail}
      setValue={setValue}
      getValues={getValues}
      control={control}
    />
  );
}

export default RegisterForm;

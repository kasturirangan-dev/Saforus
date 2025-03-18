import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Register, registerValidationSchema } from './utils';
import useUserRegisterServiceApi from './api';
import { IUserInfoRequest } from './interface';
import { getLocalTimeZone } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';

export function useRegisterData() {
  const [loading, setLoading] = useState(false);
  const { postRegister } = useUserRegisterServiceApi();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    watch,
    clearErrors,
  } = useForm<Register>({
    defaultValues: {
      accountName: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      phone: '',
      hasSubscribedEmailUpdate: false,
    },
    resolver: yupResolver(registerValidationSchema),
    mode: 'onBlur',
  });
  const onSubmit = async (data: Register) => {
    setLoading(true);
    const languageCode = i18next.language;
    const { localTz } = getLocalTimeZone();
    const reqdata: IUserInfoRequest = {
      accountName: data.accountName,
      email: data.email,
      password: data.password,
      companyName: data.companyName,
      phone: data.phone,
      zoneId: localTz,
      lang: languageCode,
      receiveMarketingEmail: data.hasSubscribedEmailUpdate || false,
    };
    const response = await postRegister(reqdata).then((data) => {
      return data;
    });
    setLoading(false);
    return response;
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    watch,
    loading,
    setValue,
    getValues,
    control,
    clearErrors,
  };
}

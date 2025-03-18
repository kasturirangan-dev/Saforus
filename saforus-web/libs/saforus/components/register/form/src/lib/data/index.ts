import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Register, registerValidationSchema } from './utils';
import useUserRegisterServiceApi, { fetchCountry } from './api';
import { Country, IUserInfoRequest } from './interface';
import { useQuery } from 'react-query';
import i18next from 'i18next';
import { getLocalTimeZone } from '@web-workspace/shared/helpers/dates';

export function useRegisterData() {
  const [loading, setLoading] = React.useState(false);
  const [countries, setCountries] = useState([]);
  const { postRegister } = useUserRegisterServiceApi();
  const { isLoading, isError, data, error } = useQuery<
    unknown,
    Error,
    any
  >({
    queryKey: ['COUNTRIES'],
    queryFn: async () => {
      return fetchCountry();
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const newData = data.map((el: Country) => {
        return {
          ...el,
          countryCode: `${el.countryCode}`,
          label: `${el.country} (${el.shortName})`,
          value: el.countryCode
        }
      })
      setCountries(newData);
    }
    if (isError) {
      setCountries([]);
    }
  }, [isLoading, data, isError]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    watch,
  } = useForm<Register>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      // country: '',
      // countryCode: '0',
      // shortName: '',
      mobileNumber: '',
      isMore14: false,
      agreementCondition: false,
      hasSubscribedEmailUpdate: false,
      languageCode: 'ko',
      teamInvitationToken: undefined,
      awsToken: undefined,
      token: undefined, //Google Token
    },
    resolver: yupResolver(registerValidationSchema),
    mode: 'onBlur'
  });
  const onSubmit = async (data: Register) => {
    setLoading(true);
    const languageCode = i18next.language;
    const { localTz } = getLocalTimeZone();
    const reqdata: IUserInfoRequest = {
      fullName: data.name,
      email: data.email,
      password: data.password,
      company: data.company,
      // countryCode: data.countryCode || 82,
      // countryName: data.country || 'KR',
      // countryShortName: data.shortName || 'KR',
      mobileNumber: data.mobileNumber,
      languageCode: languageCode ?? 'ko',
      teamInvitationToken: data.teamInvitationToken ?? null,
      awsToken: data.awsToken ?? null,
      hasSubscribedEmailUpdate: data.hasSubscribedEmailUpdate ?? false,
      token: data.token ?? null, //Google Token
      timeZone: localTz,
      timeZoneName: `(GMT${localTz})`,
    };
    const response = await postRegister(
      reqdata,
      data.token ? true : false
    ).then((data) => {
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
    countries,
    setValue,
    getValues,
    control
  };
}

import { IUserDetailResponse } from './interface';
import { getUserDetail, updateUserInfo } from './api';
import { useMutation, useQuery } from 'react-query';
import { useSnapshot } from 'valtio';
import MyAccountStore from './store';
import { fetchCountry } from '@web-workspace/saforus/components/register/form';
import { Country } from './interface';
import { pick } from 'lodash-es';
import AuthStore, { User } from '@web-workspace/shared/hooks/use-auth';

export function useMyAccountData() {
  const { userInfo, updateProfile } = useSnapshot(AuthStore);
  const { id: userId } = userInfo || {};
  const updateAuthUser = (data: any) => {
    const updateData = {
      fullName: data.fullName,
      company: data.companyName,
      timeZone: data.timeZone,
      timeZoneName: data.timeZoneName,
      countryCode: data.countryCode,
      country: data.countryName,
      shortName: data.countryShortName,
      languageCode: data.languageCode,
      mobileNumber: data.mobileNumber,
    } as Partial<User>;
    updateProfile(updateData);
  };
  const {
    setLoginInformation,
    setCountry,
    loginInformation,
    setName,
    setMobile,
    setCompanyName,
    setCompanyUrl,
    setCountryInfo,
    setSubscribedEmail,
    setSubscribeDate,
    setLanguageInfo,
    setTimeZoneInfo,
  } = useSnapshot(MyAccountStore);
  const dataUpdate = pick(loginInformation, [
    'fullName',
    'mobileNumber',
    'hasSubscribedEmailUpdate',
    'timeZone',
    'timeZoneName',
    'languageCode',
    'countryCode',
    'countryShortName',
    'countryName',
    'companyId',
    'companyName',
    'companyUrl',
  ]);
  const { mutate: onUserInfoUpdate } = useMutation(updateUserInfo, {
    onSuccess: (response, request) => {
      if (
        response &&
        response.resultCode >= 200 &&
        response.resultCode <= 299
      ) {
        updateAuthUser(request?.data);
      }
    },
  });
  const { isLoading: isMyAccountLoading } = useQuery<
    unknown,
    Error,
    IUserDetailResponse
  >({
    queryKey: ['MY_ACCOUNT'],
    enabled: !!userId,
    queryFn: async () => {
      return getUserDetail(userId);
    },
    refetchOnWindowFocus: false,
    onSuccess: (response: IUserDetailResponse) => {
      setLoginInformation(response.data);
    },
  });

  const { isLoading } = useQuery<unknown, Error, any>({
    queryKey: ['COUNTRIES'],
    queryFn: async () => {
      return fetchCountry();
    },
    onSuccess: (response: Country[]) => {
      setCountry(
        response.map((el) => {
          return {
            ...el,
            value: el.countryCode,
            label: el.country,
          };
        })
      );
    },
  });

  const onInfoChange = (key: string, value: any) => {
    const updatedData = { ...dataUpdate };

    switch (key) {
      case 'fullName':
        setName(value);
        updatedData.fullName = value;
        break;
      case 'mobileNumber':
        setMobile(value);
        updatedData.mobileNumber = value;
        break;
      case 'companyName':
        setCompanyName(value);
        updatedData.companyName = value;
        break;
      case 'companyUrl':
        setCompanyUrl(value);
        updatedData.companyUrl = value;
        break;
      case 'country':
        setCountryInfo(value);
        updatedData.countryCode = value?.countryCode;
        updatedData.countryShortName = value?.shortName;
        updatedData.countryName = value?.label;
        break;
      case 'hasSubscribedEmailUpdate':
        setSubscribedEmail(value);
        setSubscribeDate(new Date().toISOString());
        updatedData.hasSubscribedEmailUpdate = value;
        break;
      case 'language':
        setLanguageInfo(value.value);
        updatedData.languageCode = value?.value;
        break;
      case 'timeZone':
        setTimeZoneInfo(value);
        updatedData.timeZone = value?.value;
        updatedData.timeZoneName = value?.label;
        break;
    }

    onUserInfoUpdate({
      userId,
      data: updatedData,
    });
  };

  return {
    isMyAccountLoading,
    onInfoChange,
  };
}

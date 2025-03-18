import { apiPost } from '@web-workspace/shared/api/http-client';
import { UserNewPasswordApi } from './interface';

let userNewPasswordServiceApi: UserNewPasswordApi;

const URLS = {
  PUT_NEW_PASSWORD: '/api/saforus-cs-api-auth/ext/v1/accounts/change-password',
};

const useUserNewPasswordServiceApi = () => {
  if (userNewPasswordServiceApi) {
    return userNewPasswordServiceApi;
  }

  const postNewPassword = async (userInfo: any) => {
    const res = await apiPost({
      url: URLS.PUT_NEW_PASSWORD,
      data: userInfo,
    });
    if (res.isSuccess) {
      return res.data;
    } else {
      throw res.data;
    }
  };

  userNewPasswordServiceApi = {
    postNewPassword,
  };

  return userNewPasswordServiceApi;
};

export default useUserNewPasswordServiceApi;

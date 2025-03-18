import { apiPost } from '@web-workspace/shared/api/http-client';
import { UserNewPasswordApi } from '../interface';

let userNewPasswordServiceApi: UserNewPasswordApi;

const URLS = {
  PUT_NEW_PASSWORD: '/api/saforus-cs-api-auth/ext/v1/accounts/reset-password',
};

const useUserNewPasswordServiceApi = () => {
  if (userNewPasswordServiceApi) {
    return userNewPasswordServiceApi;
  }

  const putNewPassword = async (userInfo: any) => {
    try {
      const res = await apiPost({
        url: `${URLS.PUT_NEW_PASSWORD}`,
        data: { newPassword: userInfo.newPassword },
        headers: {
          Authorization: `Bearer ${userInfo.jwt}`,
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  };

  userNewPasswordServiceApi = {
    putNewPassword,
  };

  return userNewPasswordServiceApi;
};

export default useUserNewPasswordServiceApi;

import { apiPost } from '@web-workspace/shared/api/http-client';
import { UserResetPasswordApi } from '../interface';

let userResetPasswordServiceApi: UserResetPasswordApi;

const URLS = {
  GET_RESET_PASSWORD:
    '/api/saforus-cs-api-auth/ext/v1/accounts/trigger-password-reset',
};

const useUserResetPasswordServiceApi = () => {
  if (userResetPasswordServiceApi) {
    return userResetPasswordServiceApi;
  }

  const getResetPassword = async (email: string) => {
    const res = await apiPost({
      url: URLS.GET_RESET_PASSWORD,
      data: email,
    });
    if (res.isSuccess) {
      return res.data;
    } else {
      throw res.data;
    }
  };

  userResetPasswordServiceApi = {
    getResetPassword,
  };

  return userResetPasswordServiceApi;
};

export default useUserResetPasswordServiceApi;

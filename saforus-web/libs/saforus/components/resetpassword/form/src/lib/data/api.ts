import { apiGet } from '@web-workspace/shared/api/http-client';
import { UserResetPasswordApi } from '../interface';
import { ResetPassword } from './utils';

let userResetPasswordServiceApi: UserResetPasswordApi;

const URLS = {
  GET_RESET_PASSWORD: '/api/v1/saforus-web-be/papi/user/password',
};

const useUserResetPasswordServiceApi = () => {
  if (userResetPasswordServiceApi) {
    return userResetPasswordServiceApi;
  }

  const getResetPassword = async (userInfo: ResetPassword) => {
    try {
      const res = await apiGet({
        url: `${URLS.GET_RESET_PASSWORD}/${userInfo.email}`
      });
      if (!res.isSuccess) {
        switch (res.data.status) {
          case 401017:
            res.data.messageKey = 'api.reset-password.401017';
            break;
          case 401008:
            res.data.messageKey = 'api.activation.401008';
            break;
          case 401010:
            res.data.messageKey = 'api.reset-password.401010';
            break;
          case 401012:
            res.data.messageKey = 'api.activation.401012';
            break;
          case 401013:
            res.data.messageKey = 'api.activation.401013';
            break;
          case 501002:
            res.data.messageKey = 'api.activation.501002';
            break;
          case 400:
            res.data.messageKey = 'api.reset-password.400';
            break;
          case 404:
          case 401006:
            res.data.messageKey = 'api.reset-password.404';
            break;
          case 406:
            res.data.messageKey = 'api.reset-password.406';
            break;
          case 423:
            res.data.messageKey = 'api.reset-password.423';
            break;
          default:
            res.data.messageKey = 'api.unknown-error';
            break;
        }
      }

      return res;
    } catch (err) {
      return err;
    }
  };

  userResetPasswordServiceApi = {
    getResetPassword,
  };

  return userResetPasswordServiceApi;
};

export default useUserResetPasswordServiceApi;

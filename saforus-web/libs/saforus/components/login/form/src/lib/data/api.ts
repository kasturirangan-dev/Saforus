import { apiPost } from '@web-workspace/shared/api/http-client';
import { ILoginInfoRequest, ILoginInfoRequestGoogle, UserLoginApi } from '../interface';

let userLoginServiceApi: UserLoginApi;

const URLS = {
  POST_LOGIN: '/api/v1/saforus-web-be/papi/user/account',
  POST_GOOGLE_LOGIN: '/api/v1/saforus-web-be/papi/user/google-login',
};

const useUserLoginServiceApi = () => {
  if (userLoginServiceApi) {
    return userLoginServiceApi;
  }

  const postLogin = async (
    userInfo: ILoginInfoRequest | ILoginInfoRequestGoogle,
    isGoogleLogin: boolean
  ) => {
      let data;
      if (isGoogleLogin) {
        const googleUserInfo = userInfo as ILoginInfoRequestGoogle;
        data = { token: googleUserInfo.googleToken };
      } else {
        const normalUserInfo = userInfo as ILoginInfoRequest;
        data = normalUserInfo;
      }
    try {
      const res = await apiPost({
        url: isGoogleLogin ? URLS.POST_GOOGLE_LOGIN : URLS.POST_LOGIN,
        data: data,
        stopRetry: true,
      });
      if (!res.isSuccess) {
        switch (res.data.status) {
          case 401000:
            res.data.messageKey = 'api.login.401000';
            break;
          case 401014:
            res.data.messageKey = 'api.login.401014';
            break;
          case 401008:
            res.data.messageKey = 'api.login.401008';
            break;
          case 401010:
            res.data.messageKey = 'api.login.401010';
            break;
          case 401012:
            res.data.messageKey = 'api.login.401012';
            break;
          case 401013:
            res.data.messageKey = 'api.login.401013';
            break;
          case 501002:
            res.data.messageKey = 'api.login.501002';
            break;
          case 400:
            res.data.messageKey = 'api.login.400';
            break;
          case 401:
          case 401005:
            res.data.messageKey = 'api.login.401005';
            break;
          case 406:
            res.data.messageKey = 'api.login.406';
            break;
          case 423:
            res.data.messageKey = 'api.login.423';
            break;
          case 404:
            res.data.messageKey = 'api.login.404';
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

  userLoginServiceApi = { postLogin };
  return userLoginServiceApi;
};

export default useUserLoginServiceApi;

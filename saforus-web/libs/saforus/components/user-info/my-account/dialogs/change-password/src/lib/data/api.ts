import { apiPut } from '@web-workspace/shared/api/http-client';
import { UserNewPasswordApi } from './interface';

let userNewPasswordServiceApi: UserNewPasswordApi;

const URLS = {
  PUT_NEW_PASSWORD: '/api/v1/saforus-web-be/papi/user/password',
};

const useUserNewPasswordServiceApi = () => {
  if (userNewPasswordServiceApi) {
    return userNewPasswordServiceApi;
  }

  const putNewPassword = async (userInfo: any, email?: string) => {
    try {
      const res = await apiPut({
        url: `${URLS.PUT_NEW_PASSWORD}/${email}`,
        data: userInfo,
      });
      if (!res.isSuccess) {
        switch (res.data.status) {
          case 401000:
            res.data.messageKey = 'api.new-password.401000';
            break;
          case 401012:
            res.data.messageKey = 'api.new-password.401012';
            break;
          case 401013:
            res.data.messageKey = 'api.new-password.401013';
            break;
          case 401016:
            res.data.messageKey = 'api.new-password.401016';
            break;
          case 401018:
            res.data.messageKey = 'api.new-password.401018';
            break;
          case 401019:
            res.data.messageKey = 'api.new-password.401019';
            break;
          case 401020:
            res.data.messageKey = 'api.new-password.401020';
            break;
          case 401021:
            res.data.messageKey = 'api.new-password.401021';
            break;
          case 401022:
            res.data.messageKey = 'api.new-password.401022';
            break;
          case 401023:
            res.data.messageKey = 'api.new-password.401023';
            break;
          case 401024:
            res.data.messageKey = 'api.new-password.401024';
            break;
          case 401008:
            res.data.messageKey = 'api.new-password.401008';
            break;
          case 501002:
            res.data.messageKey = 'api.new-password.501002';
            break;
          case 400:
            res.data.messageKey = 'api.new-password.400';
            break;
          case 401:
            res.data.messageKey = 'api.new-password.401';
            break;
          case 401010:
            res.data.messageKey = 'api.activate.401';
            break;
          case 404:
          case 401006:
            res.data.messageKey = 'api.new-password.404';
            break;
          case 406:
            res.data.messageKey = 'api.new-password.406';
            break;
          case 423:
            res.data.messageKey = 'api.new-password.423';
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

  userNewPasswordServiceApi = {
    putNewPassword,
  };

  return userNewPasswordServiceApi;
};

export default useUserNewPasswordServiceApi;

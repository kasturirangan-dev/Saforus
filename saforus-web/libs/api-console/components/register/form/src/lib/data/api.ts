import { apiPost } from '@web-workspace/shared/api/http-client';
import { IUserInfoRequest, UserRegisterApi } from './interface';

let userRegisterServiceApi: UserRegisterApi;

const URLS = {
  POST_REGISTER: '/api/saforus-cs-api-auth/ext/v1/accounts/register',
};

const useUserRegisterServiceApi = () => {
  if (userRegisterServiceApi) {
    return userRegisterServiceApi;
  }

  const postRegister = async (userInfo: IUserInfoRequest) => {
    try {
      const url = URLS.POST_REGISTER;
      const res = await apiPost({ url, data: userInfo });
      if (!res.isSuccess) {
        switch (res.data.status) {
          case 400:
            res.data.messageKey = 'api.signup.400';
            break;
          case 401000:
            res.data.messageKey = 'api.signup.401000';
            break;
          case 403:
            res.data.messageKey = 'api.signup.403';
            break;
          case 401004:
            res.data.messageKey = 'api.signup.401004';
            break;
          case 501002:
            res.data.messageKey = 'api.signup.501002';
            break;
          case 'CSA1102':
            throw new Error('CSA1102 error occurred: Entity already exists');
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

  userRegisterServiceApi = {
    postRegister,
  };

  return userRegisterServiceApi;
};

export default useUserRegisterServiceApi;

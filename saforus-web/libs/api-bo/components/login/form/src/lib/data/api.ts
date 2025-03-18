import { apiPost } from '@web-workspace/shared/api/http-client';
import { ILoginInfoRequest, UserLoginApi } from '../interface';

let userLoginServiceApi: UserLoginApi;

const URLS = {
  POST_LOGIN: '/api/saforus-cs-api-adm/ext/v1/accounts/login',
};

const useUserLoginServiceApi = () => {
  if (userLoginServiceApi) {
    return userLoginServiceApi;
  }

  const postLogin = async (userInfo: ILoginInfoRequest) => {
    const res = await apiPost({
      url: URLS.POST_LOGIN,
      data: userInfo,
      stopRetry: true,
      showToast: true,
    });
    if (res.isSuccess) {
      return res.data;
    } else {
      throw res.data;
    }
  };

  userLoginServiceApi = { postLogin };
  return userLoginServiceApi;
};

export default useUserLoginServiceApi;

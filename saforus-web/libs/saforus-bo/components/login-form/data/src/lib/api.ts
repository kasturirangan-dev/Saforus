import { apiPost } from '@web-workspace/shared/api/http-client';
import { ILoginInfoRequest } from './interface';

const URLS = {
  POST_LOGIN: '/api/v1/cs-bo-web-be/papi/user/account',
};

export async function login(userInfo: ILoginInfoRequest): Promise<any> {
  const res = await apiPost({ url: URLS.POST_LOGIN, data: userInfo });
  // because the response is formated before return by apiPost this
  // is why i add throw in to make useMutation work correctly
  if (res.isSuccess) {
    return res.data;
  } else {
    throw res.data;
  }
}

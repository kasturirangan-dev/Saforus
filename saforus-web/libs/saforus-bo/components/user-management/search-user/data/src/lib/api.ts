import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import {
  UpdateUserInformationRequest,
  UserInformationResponse,
  UserPlanDetail,
} from './interface';
import { apiDelete, apiGet, apiPut } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';

export const USER_MANAGEMENT_QUERY_KEY = {
  USER_DETAIL: 'user-detail',
  USER_LIST: 'user-list',
};

const api = getEnvVar('VITE_API_URL');

const GET_USER_LIST = '/api/v1/cs-bo-web-be/bo/users';
const SUBSCRIPTION_DETAIL = '/api/v1/mp-sp/subscriptions/plans/teams/';

export async function getUserDetail(
  userId: number
): Promise<UserInformationResponse> {
  const response = await apiGet({
    url: `${api}/api/v1/cs-bo-web-be/user/${userId}`
  });
  return response.data;
}

export async function deleteUser(
  userId: string | number
): Promise<any> {
  const response = await apiDelete({
    url: `${api}/api/v1/cs-bo-web-be/user/${userId}`,
  });
  return response.data;
}


export async function updateUserInfo({
  userId,
  data,
}: {
  userId: string | number;
  data: Partial<UpdateUserInformationRequest>;
}): Promise<any> {
  const response = await apiPut({
    url: `${api}/api/v1/cs-bo-web-be/user/${userId}`,
    data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data
  }
}

export async function getSubscriptionDetail(
  teamId: number | string
): Promise<UserPlanDetail> {
  const apiUrl = `${SUBSCRIPTION_DETAIL}${teamId}`;
  const response = await apiGet({ url: apiUrl, showToast: true });
  return response.data;
}

export async function putResetPassword(email: string, userInfo: any): Promise<any> {
  try {
    const res = await apiPut({
      url: `${api}/api/v1/cs-bo-web-be/papi/user/password/${email}`,
      data: userInfo,
      showToast: false,
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
}
export async function getUserList(
  data: any
): Promise<any> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${GET_USER_LIST}?${searchParams}`,
  });
  return response.data;
}


import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
} from '@web-workspace/shared/api/http-client';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { IUpdateUserInfoRequest, IUserDetailResponse } from './interface';

export const QUERY_KEY = 'MyAccountData';
const api = getEnvVar('VITE_API_URL');

const URLs = {
  getUserDetail: (userId: string) =>
    `${api}/api/v1/saforus-web-be/user/${userId}`,
  updateUser: (userId: string | number) =>
    `${api}/api/v1/saforus-web-be/user/${userId}`,
  updateUserAvatar: (userId: string | number) =>
    `${api}/api/v1/saforus-web-be/user/${userId}/photos`,
  deleteUserAvatar: (userId: string | number) =>
    `${api}/api/v1/saforus-web-be/user/${userId}/photos`,
};
export async function getUserDetail(
  userId: string
): Promise<IUserDetailResponse> {
  const response = await apiGet({
    url: URLs.getUserDetail(userId),
  });
  return response.data;
}

export async function updateUserInfo({
  userId,
  data,
}: {
  userId: string | number;
  data: IUpdateUserInfoRequest;
}): Promise<any> {
  const response = await apiPut({
    url: URLs.updateUser(userId),
    data,
  });
  return response.data;
}

export async function updateUserAvatar({
  userId,
  file,
}: {
  userId: string | number;
  file: any;
}): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiPost({
    url: URLs.updateUserAvatar(userId),
    data: formData,
    timeout: 10 * 60 * 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  }
  throw response.data;
}

export async function deleteUserAvatar({
  userId,
}: {
  userId: string | number;
}): Promise<any> {
  const response = await apiDelete({
    url: URLs.deleteUserAvatar(userId),
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  }
  throw response.data;
}

import { apiDelete, apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import { RequestAdminUser } from './interface';
import queryString from 'query-string';
import BoAuthStore from "@web-workspace/shared/hooks/use-bo-auth";

export const QUERY_ADMIN_KEY = {
  VIEW_ADMIN_USER_LIST: 'VIEW_ADMIN_USER_LIST'
};

const GET_ADMIN_USERS = '/api/v1/cs-bo-web-be/watermarking/users';
const DELETE_ADMIN_USERS = '/api/v1/cs-bo-web-be/watermarking/users';
const ADD_ADMIN_USER = '/api/v1/cs-bo-web-be/add_user';
const UPDATE_ADMIN_USER = '/api/v1/cs-bo-web-be/update_user';

export async function fetchAdminUser(
  data: Partial<RequestAdminUser>
): Promise<any> {
  const userId = BoAuthStore.userInfo?.id;
  if (!userId) return null;
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${GET_ADMIN_USERS}?${searchParams}`,
  });
  return response.data;
}

export async function deleteAdminUsers({ memberIds }: {
  memberIds: string[],
}): Promise<boolean> {
  if (memberIds.length === 0) return false;

  let memberExt = memberIds.join('&userId=');
  memberExt = `?userId=${memberExt}`;

  const response = await apiDelete({
    url: `${DELETE_ADMIN_USERS}${memberExt}`,
    showToast: true,
  });
  return response.data;
}

export async function addAdminUser({ userInfo }: {
  userInfo: any,
}): Promise<boolean> {

  const response = await apiPost({
    url: ADD_ADMIN_USER,
    data: userInfo,
    showToast: true,
  });
  return response.data;
}

export async function updateAdminUser({ userInfo }: {
  userInfo: any,
}): Promise<boolean> {

  const response = await apiPost({
    url: UPDATE_ADMIN_USER,
    data: userInfo,
    showToast: true,
  });
  return response.data;
}


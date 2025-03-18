import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { ApiResponseData } from '@web-workspace/api-bo/common/model';

export const QUERY_KEY = {
  ADMIN_DASHBOARD: 'USER_MANAGEMENT',
};

const usermanagementEndpoint = '/api/saforus-cs-api-auth/ext/v1/admin/accounts';

export async function fetchUsers(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${usermanagementEndpoint}?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function CreateUser(data: any): Promise<ApiResponseData> {  
  const response = await apiPost({
    url: usermanagementEndpoint,
    data: data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function EditUser(
  id: string,
  data: any
): Promise<ApiResponseData> {
  const response = await apiPatch({
    url: `${usermanagementEndpoint}/${id}`,
    data: data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deleteUser(id: string): Promise<ApiResponseData> {
  const response = await apiDelete({
    url: `${usermanagementEndpoint}/${id}`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

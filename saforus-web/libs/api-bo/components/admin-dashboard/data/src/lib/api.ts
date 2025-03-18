import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { ApiResponseData } from '@web-workspace/api-bo/common/model';

export const QUERY_KEY = {
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD',
};

const adminEndPoint = '/api/saforus-cs-api-adm/ext/v1/admin/accounts';

export async function fetchUsers(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${adminEndPoint}?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function CreateUser(data: any): Promise<ApiResponseData> {  
  const response = await apiPost({
    url: adminEndPoint,
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
    url: `${adminEndPoint}/${id}`,
    data: data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function DeleteUser(id: string): Promise<ApiResponseData> {
  const response = await apiDelete({
    url: `${adminEndPoint}/${id}`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

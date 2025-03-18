import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { ApiResponseData } from '@web-workspace/api-console/common/model';

export const QUERY_KEY = {
  API_KEY: 'API_KEY',
};

const apiKeyEndpoint = '/api/saforus-cs-api-auth/ext/v1/api-keys';

export async function fetchApiKey(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${apiKeyEndpoint}?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function CreateApiKey(data: any): Promise<ApiResponseData> {
  const response = await apiPost({
    url: apiKeyEndpoint,
    data: data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function EditApiKey(
  id: string,
  data: any
): Promise<ApiResponseData> {
  const response = await apiPatch({
    url: `${apiKeyEndpoint}/${id}`,
    data: data,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function DeleteApiKey(id: string): Promise<ApiResponseData> {
  const response = await apiDelete({
    url: `${apiKeyEndpoint}/${id}`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

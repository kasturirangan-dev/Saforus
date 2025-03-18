import { ApiResponseData } from '@web-workspace/api-bo/common/model';
import { apiGet } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import getUserInfo from "@web-workspace/shared/hooks/use-csapi-bo-auth"

export const QUERY_KEY = {
  API_KEY: 'API_KEY',
  USER_INFO: 'USER_INFO',
  USAGE_SUMMARY: 'USAGE_SUMMARY',
  USAGE_BY_DATE: 'USAGE_BY_DATE',
  SERVICE_USAGE: 'SERVICE_USAGE',
};

const analyticsEndpoint = '/api/saforus-cs-api-stat/ext/v1/admin/analytics';
const accountsEndpoint = '/api/saforus-cs-api-auth/ext/v1/admin/accounts';
const {userInfo} = getUserInfo;

export async function getUsageSumary(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);

  const response = await apiGet({
    url: `${analyticsEndpoint}/usage-summary?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}


export async function fetchApiKey(data: any): Promise<ApiResponseData> {
  const userId = data?.userId || userInfo?.id;
  const response = await apiGet({
    url: `${accountsEndpoint}/${userId}/api-keys`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
export async function fetchUserId(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${accountsEndpoint}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function getUsageBydate(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${analyticsEndpoint}/usage-by-date?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function getServiceUsage(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${analyticsEndpoint}/file-processed-status?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

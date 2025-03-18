import { apiGet } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import {
  ForensicWatermarkingUsageResponse,
  UsageResponse,
  UserTrendResponse,
} from './interface';
import { ResponseSearchAndList } from '@web-workspace/saforus-bo/components/user-management/search-user/data';

export const QUERY_KEY = {
  DASHBOARD_DATA: 'DASHBOARD_DATA',
  USAGE_SUMMARY: 'USAGE_SUMMARY',
  USER_LIST: 'USER_LIST',
  USER_TREND: 'USER_TREND',
};

const analyticsEndpoint = '/api/v1/cs-bo-web-be/dashboard';
const GET_USER_LIST = '/api/v1/cs-bo-web-be/bo/users';

export async function getDashboardData(
  data: any
): Promise<ForensicWatermarkingUsageResponse> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${analyticsEndpoint}/data?${searchParams}`,
  });
  //TODO: pass table error
  return response.data;
}

export async function getUsageSummary(data: any): Promise<UsageResponse> {
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

export async function getUserList(data: any): Promise<ResponseSearchAndList> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${GET_USER_LIST}?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function getUserTrend(data: any): Promise<UserTrendResponse> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${analyticsEndpoint}/user-count?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

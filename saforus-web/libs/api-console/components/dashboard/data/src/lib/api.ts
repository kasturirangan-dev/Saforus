import { ApiResponseData } from '@web-workspace/api-console/common/model';
import { apiGet } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';

export const QUERY_KEY = {
  API_KEY: 'API_KEY',
  API_REQUEST_COUNT: 'API_REQUEST_COUNT',
  USAGE_SUMMARY: 'USAGE_SUMMARY',
  USAGE_BY_DATE: 'USAGE_BY_DATE',

  WATERMARKING_SERVICE_USAGE: 'WATERMARKING_SERVICE_USAGE',
  DETECTION_SERVICE_USAGE: 'DETECTION_SERVICE_USAGE',
  API_SERVICE_USAGE: 'API_SERVICE_USAGE',
  USAGE_OVERVIEW: 'USAGE_OVERVIEW',
  KEY_USAGE_SUMMARY: 'KEY_USAGE_SUMMARY',
};

const analyticsEndpoint = 'api/saforus-cs-api-stat/ext/v2/analytics';

// Current plan (billing cycle)
export async function getApiReqCount(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${analyticsEndpoint}/count-api-request?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
export async function getUsageOverview(data: any): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${analyticsEndpoint}/usage-overview?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

// Usage overview
export async function getUsageSummary(data: any): Promise<ApiResponseData> {
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
export async function getUsageByDate(data: any): Promise<ApiResponseData> {
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

// Service Usage
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

// API Key Usage
export async function getAPIKeysUsageSummary(
  data: any
): Promise<ApiResponseData> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${analyticsEndpoint}/api-keys/usage-summary?${searchParams}`,
  });

  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

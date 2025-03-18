import { useQuery } from 'react-query';
import { DateFormat, formatDate } from '@web-workspace/shared/helpers/dates';

import {
  QUERY_KEY,
  getUsageSumary,
  getUsageBydate,
  getServiceUsage,
  fetchApiKey,
  fetchUserId,
} from './api';
import { ApiDashboardStore } from './store';
import { useSnapshot } from 'valtio';
import { useState } from 'react';
import CsApiBoAuthStore from '@web-workspace/shared/hooks/use-csapi-bo-auth';
import { ApiKeyDetails, UserIdDetails } from './interface';

export const useApiDashboardData = () => {
  const {
    apiKeys,
    userIds,
    searchQuery,
    setUsageSummary,
    setFileUsages,
    setServiceUsageData,
    setApiKeys,
    setUserIds,
  } = useSnapshot(ApiDashboardStore);

  const { timeZone } = useSnapshot(CsApiBoAuthStore);

  // Fetch user id keys list with pageNo and pageSize
  const [userIdPageNo, setUserIdPageNO] = useState(0);
  const userIdPageSize = 50;
  const { data } = useQuery(
    [QUERY_KEY.USER_INFO, userIdPageNo],
    () => {
      const reqData = { page: userIdPageNo, pageSize: userIdPageSize }; // Fixed variable
      return fetchUserId(reqData); 
    },
    {
      onSuccess: (response) => {
        const resData = response?.data?.records;
        // Update list
        const records =
          resData?.map((e: UserIdDetails) => ({
            label: `${e.accountName} (${e.email})`,
            value: e.id,
          })) || [];
  
        if (userIdPageNo === 0) setUserIds(records);
        else setUserIds([...userIds, ...records]); 
  
        // Update pageNo to get full user id keys
        const total = resData?.total || 0;
        const maxPage = Math.ceil(total / userIdPageSize) - 1;
        if (userIdPageNo < maxPage) {
          setUserIdPageNO(userIdPageNo + 1);
        }
      },
    }
  );

  const [apiKeyPageNo, setApiKeyPage] = useState(0);
  const apiKeyPageSize = 50;
  useQuery(
    [QUERY_KEY.API_KEY, apiKeyPageNo, searchQuery.userId],
    () => {
      const reqData = {
        page: apiKeyPageNo,
        pageSize: apiKeyPageSize,
        userId: searchQuery.userId,
      };
      return fetchApiKey(reqData);
    },
    {
      onSuccess: (response) => {
        const resData = response?.data;
        const records =
          resData?.map((e: ApiKeyDetails) => ({
            label: `${e.name} (${e.token})`,
            value: e.token,
          })) || [];
        if (apiKeyPageNo === 0) {
          setApiKeys(records);
        } else {
          setApiKeys([...userIds, ...records]);
        }
        const total = resData?.total || 0;
        const maxPage = Math.ceil(total / userIdPageSize) - 1;
        if (apiKeyPageNo < maxPage) {
          setApiKeyPage(apiKeyPageNo + 1);
        }
      },
    }
  );

  const { isLoading: loadingSummary } = useQuery(
    [QUERY_KEY.USAGE_SUMMARY, ...Object.values(searchQuery)],
    () => {
      // Formate the date to yyyy-MM-dd in user's timezone
      const reqData = {
        startDate: formatDate(searchQuery.startDate, DateFormat.ISO, timeZone),
        endDate: formatDate(searchQuery.endDate, DateFormat.ISO, timeZone),
        apiKey: searchQuery.apiKey,
        accountId: searchQuery.userId,
      };
      return getUsageSumary(reqData);
    },
    {
      onSuccess: (response) => {
        setUsageSummary(response?.data || {});
      },
    }
  );

  const { isLoading: loadingUsageByDate } = useQuery(
    [QUERY_KEY.USAGE_BY_DATE, ...Object.values(searchQuery)],
    () => {
      // Formate the date to yyyy-MM-dd in user's timezone
      const reqData = {
        startDate: formatDate(searchQuery.startDate, DateFormat.ISO, timeZone),
        endDate: formatDate(searchQuery.endDate, DateFormat.ISO, timeZone),
        apiKey: searchQuery.apiKey,
        accountId: searchQuery.userId,
      };
      return getUsageBydate(reqData);
    },
    {
      onSuccess: (response) => {
        setFileUsages(response?.data || {});
      },
    }
  );

  const { isLoading: loadingServiceUsage } = useQuery(
    [QUERY_KEY.SERVICE_USAGE, ...Object.values(searchQuery)],
    () => {
      // Formate the date to yyyy-MM-dd in user's timezone
      const reqData = {
        startDate: formatDate(searchQuery.startDate, DateFormat.ISO, timeZone),
        endDate: formatDate(searchQuery.endDate, DateFormat.ISO, timeZone),
        apiKey: searchQuery.apiKey,
        accountId: searchQuery.userId,
      };
      return getServiceUsage(reqData);
    },
    {
      onSuccess: (response) => {
        setServiceUsageData(response?.data || {});
      },
    }
  );

  return {
    loadingSummary,
    loadingUsageByDate,
    loadingServiceUsage,
  };
};

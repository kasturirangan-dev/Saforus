import { useQuery } from 'react-query';
import { DateFormat, formatDate } from '@web-workspace/shared/helpers/dates';

import {
  QUERY_KEY,
  getUsageSummary,
  getServiceUsage,
  getAPIKeysUsageSummary,
  getApiReqCount,
  getUsageOverview,
  getUsageByDate,
} from './api';
import { ApiDashboardStore } from './store';
import { useSnapshot } from 'valtio';
import { fetchApiKey } from '@web-workspace/api-console/components/api-key/data';
import { ApiKeyData } from '@web-workspace/api-console/components/api-key/data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { ChanelType } from '@web-workspace/api-console/common/model';
import { UsageQuery } from './interface';

export const useApiDashboardData = () => {
  const {
    searchQuery,
    setApiKeys,
    setApiRequestCount,
    setUsageOverview,
    setUsageSummary,
    setFileUsages,
    setWatermarkingUsage,
    setDetectionUsage,
    setKeyUsageSummary,
  } = useSnapshot(ApiDashboardStore);

  const { timeZone, userInfo } = useSnapshot(CsApiAuthStore);

  // Fetch API keys
  const { isLoading: loadingApiKeys } = useQuery(
    [QUERY_KEY.API_KEY],
    () => {
      const reqData = {
        page: 0,
        pageSize: 30, // The maximum number of API keys is 10, so a page size of 30 is sufficient.
      };
      return fetchApiKey(reqData);
    },
    {
      onSuccess: (response) => {
        const resData = response?.data as ApiKeyData;
        // Update list
        const records =
          resData?.records?.map((e) => ({
            label: `${e.name} (${e.token})`,
            value: e.token,
          })) || [];
        setApiKeys(records);
      },
    }
  );

  // Current plan (billing cycle)
  const { isLoading: loadingApiReqCount } = useQuery(
    [QUERY_KEY.API_REQUEST_COUNT],
    () => {
      // Formate the date in UTC
      const reqData = {
        accountId: userInfo?.id,
        startDateTime: formatDate(
          userInfo?.subscription?.billingStartDate,
          DateFormat.ISO_DATETIME,
          'UTC'
        ),
        endDateTime: formatDate(
          userInfo?.subscription?.nextPayDate,
          DateFormat.ISO_DATETIME,
          'UTC'
        ),
      };
      return getApiReqCount(reqData);
    },
    {
      onSuccess: (response) => {
        setApiRequestCount(response?.data || {});
      },
    }
  );
  const { isLoading: loadingUsageOverview } = useQuery(
    [QUERY_KEY.USAGE_OVERVIEW],
    () => {
      // Formate the date in UTC
      const reqData = {
        accountId: userInfo?.id,
        startDateTime: formatDate(
          userInfo?.subscription?.billingStartDate,
          DateFormat.ISO_DATETIME,
          'UTC'
        ),
        endDateTime: formatDate(
          userInfo?.subscription?.nextPayDate,
          DateFormat.ISO_DATETIME,
          'UTC'
        ),
      };
      return getUsageOverview(reqData);
    },
    {
      onSuccess: (response) => {
        setUsageOverview(response?.data || {});
      },
    }
  );

  const getReqData = (searchQuery: UsageQuery) => {
    // Formate the date to yyyy-MM-dd in user's timezone
    // Remove the ALL values from the query
    return {
      accountId: userInfo?.id,
      startDate: formatDate(searchQuery.startDate, DateFormat.ISO, timeZone),
      endDate: formatDate(searchQuery.endDate, DateFormat.ISO, timeZone),
      apiKey: searchQuery.apiKey !== 'ALL' ? searchQuery.apiKey : undefined,
      channels: [searchQuery.usageType],
    };
  };

  // Usage overview data
  const { isLoading: loadingSummary } = useQuery(
    [QUERY_KEY.USAGE_SUMMARY, ...Object.values(searchQuery)],
    () => {
      const reqData = getReqData(searchQuery);
      return getUsageSummary(reqData);
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
      const reqData = getReqData(searchQuery);
      return getUsageByDate(reqData);
    },
    {
      onSuccess: (response) => {
        setFileUsages(response?.data || {});
      },
    }
  );

  // Service Usage Data
  const { isLoading: loadingWatermarkingUsage } = useQuery(
    [QUERY_KEY.WATERMARKING_SERVICE_USAGE, ...Object.values(searchQuery)],
    () => {
      const reqData = {
        ...getReqData(searchQuery),
        features: ['WATERMARKING']
      }     
       return getServiceUsage(reqData);
    },
    {
      onSuccess: (response) => {
        setWatermarkingUsage(response?.data || {});
      },
    }
  );
  const { isLoading: loadingDetectionUsage } = useQuery(
    [QUERY_KEY.DETECTION_SERVICE_USAGE, ...Object.values(searchQuery)],
    () => {
      const reqData = {
        ...getReqData(searchQuery),
        features: ['DETECTION']
      }
          return getServiceUsage(reqData);
    },
    {
      onSuccess: (response) => {
        setDetectionUsage(response?.data || {});
      },
    }
  );
  const { isLoading: loadingKeyUsageSummary } = useQuery(
    [QUERY_KEY.KEY_USAGE_SUMMARY, ...Object.values(searchQuery)],
    () => {
      // Formate the date to yyyy-MM-dd in user's timezone
      const reqData = {
        accountId: userInfo?.id,
        startDate: formatDate(searchQuery.startDate, DateFormat.ISO, timeZone),
        endDate: formatDate(searchQuery.endDate, DateFormat.ISO, timeZone),
      };
      return getAPIKeysUsageSummary(reqData);
    },
    {
      onSuccess: (response) => {
        setKeyUsageSummary(response?.data || {});
      },
      enabled: searchQuery?.usageType === ChanelType.API,
    }
  );

  return {
    loadingCurrentCycle: loadingApiReqCount || loadingUsageOverview,
    loadingOverview: loadingSummary || loadingUsageByDate,
    loadingServiceUsage: loadingWatermarkingUsage || loadingDetectionUsage,
    loadingKeyUsageSummary,
  };
};

import { proxy } from 'valtio';
import {
  UsageQuery,
  UsageSummary,
  FileUsages,
  ApiRequestCount,
  UsageOverview,
  ServiceUsage,
  ApiUsage,
} from './interface';
import { devtools } from 'valtio/utils';
import { sub } from 'date-fns';
import { ChanelType, TOption } from '@web-workspace/api-console/common/model';

export interface ApiDashboardState {
  // filter data
  searchQuery: UsageQuery;
  apiKeys: TOption[];
  setSearchQuery: (query: Partial<UsageQuery>) => void;
  setApiKeys(data: TOption[]): void;

  // Current plan (billing cycle)
  apiRequestCount: ApiRequestCount;
  usageOverview: UsageOverview;
  setApiRequestCount(data: ApiRequestCount): void;
  setUsageOverview(data: UsageOverview): void;

  // Usage overview data
  usageSummary: UsageSummary;
  fileUsages: FileUsages;
  setUsageSummary(data: UsageSummary): void;
  setFileUsages(data: FileUsages): void;

  // Service usage data
  watermarkingUsage: ServiceUsage;
  detectionUsage: ServiceUsage;
  keyUsageSummary: ApiUsage[];
  setWatermarkingUsage(data: ServiceUsage): void;
  setDetectionUsage(data: ServiceUsage): void;
  setKeyUsageSummary(data: ApiUsage[]): void;
}

function createApiDashboardStore() {
  const currentDate = new Date();

  const store: ApiDashboardState = {
    searchQuery: {
      startDate: sub(currentDate, { days: 89 }),
      endDate: currentDate,
      apiKey: 'ALL',
      usageType: ChanelType.WEB,
    },
    apiKeys: [],

    // Usage overview data
    apiRequestCount: {
      wtrApiRequestCount: 0,
      pdApiRequestCount: 0,
    },
    usageOverview: {
      apiRequestCount: 0,
      webRequestCount: 0,
      storageUsageInByte: 0,
    },
    usageSummary: {
      total: 0,
      watermarking: 0,
      detection: 0,
      avgProcessingTimeInMillisecond: 0,
    },
    fileUsages: {
      total: 0,
      usages: [],
    },

    // Service usage data
    watermarkingUsage: {
      total: 0,
      data: {},
    },
    detectionUsage: {
      total: 0,
      data: {},
    },
    keyUsageSummary: [],

    setSearchQuery: (query) => {
      let apiKey = query.apiKey ?? ApiDashboardStore.searchQuery.apiKey;
      if (query?.usageType === ChanelType.WEB) {
        apiKey = 'ALL';
      }

      ApiDashboardStore.searchQuery = {
        ...ApiDashboardStore.searchQuery,
        ...query,
        apiKey,
      };
    },
    setApiKeys(data) {
      ApiDashboardStore.apiKeys = data;
    },
    setApiRequestCount(data) {
      ApiDashboardStore.apiRequestCount = data;
    },
    setUsageOverview(data) {
      ApiDashboardStore.usageOverview = data;
    },
    setUsageSummary(data) {
      ApiDashboardStore.usageSummary = data;
    },
    setFileUsages(data) {
      ApiDashboardStore.fileUsages = data;
    },
    setWatermarkingUsage(data) {
      ApiDashboardStore.watermarkingUsage = data;
    },
    setDetectionUsage(data) {
      ApiDashboardStore.detectionUsage = data;
    },
    setKeyUsageSummary(data) {
      ApiDashboardStore.keyUsageSummary = data;
    },
  };
  return store;
}

export const ApiDashboardStore = proxy<ApiDashboardState>(
  createApiDashboardStore()
);

devtools(ApiDashboardStore, { name: 'CS_API_DASHBOARD_STORE' });

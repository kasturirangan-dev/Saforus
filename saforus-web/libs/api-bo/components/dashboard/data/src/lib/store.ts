import { proxy } from 'valtio';
import {
  usageQuery,
  UsageSummary,
  ServiceUsageData,
  FileUsages,
} from './interface';
import { devtools } from 'valtio/utils';
import { sub } from 'date-fns';
import { TOption } from '@web-workspace/api-bo/common/model';

export interface ApiDashboardState {
  searchQuery: usageQuery;
  apiKeys: TOption[];
  usageSummary: UsageSummary;
  fileUsages: FileUsages;
  userIds: TOption[];
  serviceUsageData: ServiceUsageData;
  setSearchQuery: (query: Partial<usageQuery>) => void;
  setApiKeys(data: TOption[]): void;
  setUsageSummary(data: UsageSummary): void;
  setFileUsages(data: FileUsages): void;
  setServiceUsageData(data: ServiceUsageData): void;
  setUserIds(data: TOption[]): void;
}

function createApiDashboardStore() {
  const currentDate = new Date();

  

  const store: ApiDashboardState = {
    searchQuery: {
      startDate: sub(currentDate, { days: 29 }),
      endDate: currentDate,
      apiKey: null,
      userId: null,
    },
    apiKeys: [],
    usageSummary: {
      total: 0,
      watermarking: 0,
      detection: 0,
      download: 0,
      failed: 0,
      avgProcessingTimeInMillisecond: 0,
      watermarkUsedCapacityInFile: 0,
      detectionUsedCapacityInFile: 0,
    },
    fileUsages: {
      total: 0,
      usages: [],
    },
    serviceUsageData: {
      watermarking: {},
      detection: {},
    },

    setSearchQuery: (query) => {
      ApiDashboardStore.searchQuery = {
        ...ApiDashboardStore.searchQuery,
        ...query,
      };
    },
    setApiKeys(data) {
      ApiDashboardStore.apiKeys = data;
    },

    setUsageSummary(data) {
      ApiDashboardStore.usageSummary = data;
    },
    setFileUsages(data) {
      ApiDashboardStore.fileUsages = data;
    },
    setServiceUsageData(data) {
      ApiDashboardStore.serviceUsageData = data;
    },
    setUserIds(data) {
      ApiDashboardStore.userIds = data;
    },
  };
  return store;
}

export const ApiDashboardStore = proxy<ApiDashboardState>(
  createApiDashboardStore()
);

devtools(ApiDashboardStore, { name: 'BO_DASHBOARD_STORE' });

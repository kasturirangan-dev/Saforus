import { ChanelType } from '@web-workspace/api-console/common/model';

export interface UsageQuery {
  startDate: Date;
  endDate: Date;
  apiKey: string;
  usageType: ChanelType;
}

export interface UsageOverview {
  apiRequestCount: number;
  webRequestCount: number;
  storageUsageInByte: number;
}

export interface ApiRequestCount {
  wtrApiRequestCount: number;
  pdApiRequestCount: number;
}

export interface UsageSummary {
  total: number;
  watermarking: number;
  detection: number;
  avgProcessingTimeInMillisecond: number;
}

export interface FileUsages {
  total: number;
  usages: UsageBydate[];
}
export interface UsageBydate {
  count: number;
  date: Date | string;
}

// Service Usage
export interface ServiceUsage {
  total: number;
  data: {
    image?: MediaUsage;
    video?: MediaUsage;
    audio?: MediaUsage;
    document?: MediaUsage;
  };
}

export interface MediaUsage {
  total: number;
  data: MediaDetails;
}

interface MediaDetails {
  inProgress?: number;
  completed?: number;
  detected?: number;
  undetected?: number;
  failed?: number;
}

export interface ApiUsage {
  id: string;
  accountId: string;
  name: string;
  status: string;
  token: string;
  expiredAt: Date | string;
  lastUsedAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

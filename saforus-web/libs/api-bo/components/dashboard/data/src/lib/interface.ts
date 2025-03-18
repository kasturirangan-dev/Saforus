import { Interface } from "readline";

export interface usageQuery {
  startDate?: Date;
  endDate?: Date;
  apiKey?: string | null;
  userId?: string | null ;
}

// Usage Summary
export interface UsageSummary {
  total: number;
  watermarking: number;
  detection: number;
  download: number;
  failed: number;
  avgProcessingTimeInMillisecond: number;
  apiRequestCount: number;
  storageUsageInByte: number;
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
export interface ServiceUsageData {
  watermarking: ServiceUsage;
  detection: ServiceUsage;
}

export interface ServiceUsage {
  image?: MediaUsage;
  video?: MediaUsage;
  audio?: MediaUsage;
  document?: MediaUsage;
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

export interface ApiKeyDetails {
  id: string;
  accountId: string;
  name: string;
  status: string;
  token: string;
  expiredAt: Date | string;
  neverExpire: boolean;
  note?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ApiKeyData {
  page: number;
  pageSize: number;
  records: ApiKeyDetails[];
  total: number;
}

export interface UserIdDetails {
  id: string;
  parentId?: string;
  email: string;
  accountName: string;
  phone?: string;
  status: string;
  lastLoginAt?: string;
  joinedAt?: string;
  billingExpiredAt: string;
  lastLoginIp?: string;
  description?: string;
  zoneId: string;
  subscriptionTier: "FREE" | "PROFESSIONAL" | "BASIC";
  moreInfo: MoreInfo;
  companyName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface MoreInfo {
  webhookEndpoint?: string;
  webhookSecret?: string;
}

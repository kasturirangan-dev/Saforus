import { BaseResponseData } from '@web-workspace/saforus-bo/common/model';

export interface DateData {
  startDate: Date;
  endDate: Date;
}

export interface ForensicWatermarkingUsageResponse extends BaseResponseData {
  data: any;
}

export interface UsageResponse extends BaseResponseData {
  data: UsageData;
}

export interface UsageData {
  noticeCount: NoticeUsage;
  pdInfo: PiracyUsage;
  wtrInfo: WtrUsage;
  userCount: UserData;
}

export interface NoticeUsage {
  hidden: number;
  published: number;
}

export interface WtrUsage {
  totalSize: number;
  wtrOrderCount: {
    completed: number;
    inProgress: number;
    failed: number;
  };
}
export interface PiracyUsage {
  totalSize: number;
  pdOrderCount: {
    detected: number;
    undetected: number;
    inProgress: number;
    failed: number;
  };
}

export interface UserData {
  active: number;
  locked: number;
  pendingActivation: number;
  suspended: number;
}

export interface UserTrendResponse extends BaseResponseData {
  data: UserTrendData;
}

export interface UserTrendData {
  increasePercentage: number;
  userCounts: UserCount[];
}

interface UserCount {
  newUserCount: number;
  totalUserCount: number;
  statDate: Date | string;
  month: string;
}

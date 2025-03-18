import { SubscriptionDetail } from '@web-workspace/api-console/common/model';

export interface ProfileInfomation {
  id: string;
  email: string;
  accountName: string;
  phone: string;
  status: string;
  lastLoginAt: string;
  lastLoginIp: string;
  companyName: string;
  zoneId: string;
  avatarUrl?: string;
  avatarPreview?: string;
  subscription?: SubscriptionDetail;
  moreInfo: object;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  updatedBy: string;
}

export const LIMIT_ENTER_CURRENT_PASSWORD = 5;

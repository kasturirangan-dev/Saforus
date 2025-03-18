export interface SearchQuery {
  page: number;
  size: number;
}

export interface UserDetails {
  avatarUrl: string ;
  id: string;
  email: string;
  accountName: string;
  phone: string;
  status: string; // Make this a union type
  description: string;
  zoneId: string;
  companyName: string;
  moreInfo: MoreInfo; // Use the MoreInfo interface instead of Record
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  lastLoginAt: string;
  lastLoginIp: string;
  billingExpiredAt: string; // Add missing field
  subscriptionTier: string // Add missing field
}

export interface MoreInfo {
  webhookEndpoint: string;
  webhookSecret: string;
}

export interface UserData {
  page: number;
  size: number;
  records: UserDetails[];
  total: number;
}

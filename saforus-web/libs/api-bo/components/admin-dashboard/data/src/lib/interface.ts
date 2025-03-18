export interface SearchQuery {
  page: number;
  size: number;
}

export interface UserDetails {
  id: string;
  email: string;
  accountName: string;
  companyName: string;
  phone: string;
  status: string;
  description: string;
  zoneId: string;
  avatarUrl: string;
  moreInfo: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  joinedAt: string;
  lastLoginAt: string;
  lastLoginIp: string;
  parentId: string;
  roles: string;
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


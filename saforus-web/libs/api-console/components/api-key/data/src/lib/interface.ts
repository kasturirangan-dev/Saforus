export interface SearchQuery {
  page: number;
  pageSize: number;
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

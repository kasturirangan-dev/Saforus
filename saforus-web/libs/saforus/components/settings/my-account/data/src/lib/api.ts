import { UserInfo } from './interface';
import { apiGet } from '@web-workspace/shared/api/http-client';

export const QUERY_KEY = {
  ACCOUNT_INFO: 'user-info',
};

export async function fetchSites(): Promise<UserInfo[]> {
  const response = await apiGet({ url: '/api/v1/saforus-web-be/getUserInfo' });
  return response.data;
}

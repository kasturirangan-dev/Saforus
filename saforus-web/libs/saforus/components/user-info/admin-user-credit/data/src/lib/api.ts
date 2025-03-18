import { apiGet } from '@web-workspace/shared/api/http-client';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { RequestUserCredit, ResponseUserCredit, ResponseUserCreditList } from './interface';
import queryString from 'query-string';

export const QUERY_CREDIT_KEY = {
  VIEW_USER_CREDIT_LIST: 'VIEW_USER_CREDIT_LIST'
};

const GET_USER_CREDITS = '/api/v1/saforus-web-be/watermarking/users';

export async function fetchUserCredit(
  data: Partial<RequestUserCredit>
): Promise<any> {
  const userId = AuthStore.userInfo?.id;
  if (!userId) return null;
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${GET_USER_CREDITS}?${searchParams}`,
  });
  return response.data;
}


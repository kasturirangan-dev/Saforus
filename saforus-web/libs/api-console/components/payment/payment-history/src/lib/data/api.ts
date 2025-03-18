import { apiGet } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { PaymentHistoryResponse, ViewPaymentQuery } from './interface';

export const QUERY_KEY = {
  PAYMENT_HISTORY: 'PAYMENT_HISTORY',
};

const subscriptionsEndpoint = '/api/saforus-payment/ext/v1/subscriptions';

export async function getPaymentHistory(
  subscriptionId: string,
  data: ViewPaymentQuery
): Promise<PaymentHistoryResponse> {
  const searchParams = queryString.stringify(data);
  const response = await apiGet({
    url: `${subscriptionsEndpoint}/${subscriptionId}/payments?${searchParams}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from '@web-workspace/shared/api/http-client';
import { PaymentCardsResponse } from './interface';
import { ApiResponseData } from '@web-workspace/api-console/common/model';

export const QUERY_KEY = {
  PAYMENT_CARD: 'PAYMENT_CARD',
};

const subscriptionsEndpoint = '/api/saforus-payment/ext/v1/subscriptions';

export async function getPaymentCards(
  subscriptionId: string
): Promise<PaymentCardsResponse> {
  const response = await apiGet({
    url: `${subscriptionsEndpoint}/${subscriptionId}/cards`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function addCard(
  subscriptionId: string,
  data: any
): Promise<ApiResponseData> {
  const response = await apiPost({
    url: `${subscriptionsEndpoint}/${subscriptionId}/cards`,
    data: data,
    showToast: true,
  });

  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function markDefault(
  subscriptionId: string,
  cardId: string
): Promise<ApiResponseData> {
  const response = await apiPatch({
    url: `${subscriptionsEndpoint}/${subscriptionId}/cards/${cardId}/mark-as-default`,
    showToast: true,
  });

  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function deleteCard(
  subscriptionId: string,
  cardId: string
): Promise<ApiResponseData> {
  const response = await apiDelete({
    url: `${subscriptionsEndpoint}/${subscriptionId}/cards/${cardId}`,
    showToast: true,
  });

  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

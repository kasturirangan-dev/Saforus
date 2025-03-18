import { apiGet, apiPost } from '@web-workspace/shared/api/http-client';
import { PlansResponse, SubscriptionResponse } from './interface';
import { ApiResponseData } from '@web-workspace/api-console/common/model';

export const QUERY_KEY = {
  SERVICE_PLAN: 'SERVICE_PLAN',
  SUBSCRIPTION: 'SUBSCRIPTION',
};

const servicePlanEndpoint = '/api/saforus-payment/ext/v1/plans';
const subscriptionsEndpoint = '/api/saforus-payment/ext/v1/subscriptions';

export async function getServicePlans(): Promise<PlansResponse> {
  const productCode = 'SAFORUS';
  const response = await apiGet({
    url: servicePlanEndpoint,
    headers: {
      'X-MARKANY-PRODUCT-CODE': productCode,
    },
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function getSubscription(
  id: string
): Promise<SubscriptionResponse> {
  const response = await apiGet({
    url: `${subscriptionsEndpoint}/${id}`,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function upgradePlan(
  subscriptionId: string,
  data: any
): Promise<SubscriptionResponse> {
  const response = await apiPost({
    url: `${subscriptionsEndpoint}/${subscriptionId}/upgrade`,
    data: data,
    showToast: true,
  });

  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function cancelPlan(
  subscriptionId: string
): Promise<ApiResponseData> {
  const response = await apiPost({
    url: `${subscriptionsEndpoint}/${subscriptionId}/cancel`,
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

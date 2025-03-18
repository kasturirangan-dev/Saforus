import { apiGet, apiPut } from '@web-workspace/shared/api/http-client';
import {
  ServicePlanResponse,
  SubscriptionArgs,
  SubscriptionResponse,
  UpdateSubscriptionArgs,
} from './interface';

export const BILLING_QUERY_KEY = {
  SUBSCRIPTIONS_PLAN: 'subscriptions-plan',
  SUBSCRIPTIONS: 'subscriptions',
};

const GET_SUBSCRIPTIONS_PLAN = '/api/v1/mp-sp/subscriptions/plans';
const GET_SUBSCRIPTION = '/api/v1/mp-sp/subscriptions/plans';
const UNSUBSCRIBE_PLAN = '/api/v1/mp-sp/subscriptions/payment-accounts';

export async function getSubscriptionsPlan(
  params = ''
): Promise<ServicePlanResponse> {
  const response = await apiGet({ url: `${GET_SUBSCRIPTIONS_PLAN}${params}` });
  return response.data;
}

export async function subscribePlan({
  planId,
  teamId,
}: SubscriptionArgs): Promise<SubscriptionResponse> {
  const apiUrl = `${GET_SUBSCRIPTION}/${planId}/teams/${teamId}`;
  const response = await apiGet({ url: apiUrl });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function updateSubscription({
  oldPlanId,
  newPlanId,
  teamId,
}: UpdateSubscriptionArgs): Promise<SubscriptionResponse> {
  const apiUrl = `${GET_SUBSCRIPTION}/teams/${teamId}`;
  const response = await apiPut({
    url: apiUrl,
    data: {
      oldPlanId,
      newPlanId,
      prorationDate: 0,
    },
    showToast: true,
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

export async function unsubscribePlan({
  teamId,
}: {
  teamId: number | null;
}): Promise<{
  data: {
    link: string;
  };
}> {
  const apiUrl = `${UNSUBSCRIBE_PLAN}/${teamId}?paymentServiceProvider=STRIPE`;
  const response = await apiGet({ url: apiUrl });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}

import {
  RequestInvoices,
  ResponseBilling,
  ResponseInvoices,
  StripeCallResponse,
  SubscriptionDetailResponse,
  UpdateBillingBody,
} from './type';
import { apiGet, apiPatch } from '@web-workspace/shared/api/http-client';
import queryString from 'query-string';
import { Promise } from 'cypress/types/cy-bluebird';

export const QUERY_KEYS_BILLING_DETAIL = {
  GET_BILLING: 'BILLING_DETAIL.GET_BILLINGS',
  GET_INVOICES: 'BILLING_DETAIL.GET_INVOICES',
  GET_SUBSCRIPTION: 'BILLING_DETAIL.GET_SUBSCRIPTIONS',
};

const URLS = {
  updateAddress: (billingId: string | number) =>
    `/api/v1/mp-sp/billings/${billingId}`,
  getBillingAddress: `/api/v1/mp-sp/billings`,
  getInvoices: `/api/v1/mp-sp/invoices`,
  getSubscription: (userSubscriptionId: string | number) =>
    `/api/v1/mp-sp/subscriptions/${userSubscriptionId}`,
};

const useBillingDetailApis = () => ({
  updateAddress: async (
    billingId: number | string,
    req: UpdateBillingBody
  ): Promise<StripeCallResponse> => {
    const response = await apiPatch({
      url: URLS.updateAddress(billingId),
      data: req,
    });
    if (response.isSuccess) {
      return response.data;
    }
    throw response.data;
  },

  getBillingAddress: async (req: RequestInvoices): Promise<ResponseBilling> => {
    const response = await apiGet({
      url: `${URLS.getBillingAddress}?${queryString.stringify(req)}`,
    });
    if (response.isSuccess) {
      return response.data;
    }
    throw response.data;
  },

  getInvoices: async (req: RequestInvoices): Promise<ResponseInvoices> => {
    const response = await apiGet({
      url: `${URLS.getInvoices}?${queryString.stringify(req)}`,
    });
    if (response.isSuccess) {
      return response.data.data;
    }
    throw response.data;
  },

  getSubscriptionPlan: async (
    userSubscriptionId: string | number
  ): Promise<SubscriptionDetailResponse> => {
    const response = await apiGet({
      url: URLS.getSubscription(userSubscriptionId),
    });
    if (response.isSuccess) {
      return response.data;
    }
    throw response.data;
  },
});

export default useBillingDetailApis;

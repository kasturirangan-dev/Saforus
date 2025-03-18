import { useQuery } from 'react-query';
import useBillingDetailApis, { QUERY_KEYS_BILLING_DETAIL } from './api';
import { useSnapshot } from 'valtio';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import BillingDetailStore, { BillingDetailStoreActions } from './store';
import { useState } from 'react';
import { fetchCountry } from '@web-workspace/saforus/components/register/form';
import { Country } from './type';

const useBillingDetailData = () => {
  const { userInfo } = useSnapshot(AuthStore);
  const { paymentHistories } = useSnapshot(BillingDetailStore);

  const { getBillingAddress, getInvoices, getSubscriptionPlan } =
    useBillingDetailApis();
  const {
    setBillingAddress,
    setSubscriptionDetail,
    setPaymentHistories,
    setCountry,
  } = BillingDetailStoreActions;
  const { userSubscriptionId = 0 } =
    userInfo?.subscriptionPlanDetailList?.[0] || {};

  const { isLoading } = useQuery<unknown, Error, any>({
    queryKey: ['COUNTRIES'],
    queryFn: async () => {
      return fetchCountry();
    },
    onSuccess: (response: Country[]) => {
      setCountry(
        response.map((el) => {
          return {
            ...el,
            value: el.shortName,
            label: el.country,
          };
        })
      );
    },
  });

  const { isLoading: isLoadSubscription } = useQuery(
    QUERY_KEYS_BILLING_DETAIL.GET_SUBSCRIPTION,
    () => getSubscriptionPlan(userSubscriptionId),
    {
      onSuccess(response) {
        setSubscriptionDetail(response.data);
      },
      enabled: !!userSubscriptionId,
    }
  );

  const { isLoading: isLoadBilling } = useQuery(
    QUERY_KEYS_BILLING_DETAIL.GET_BILLING,
    () => {
      const reqBody = {
        userSubscriptionId,
        limit: 100,
      };
      return getBillingAddress(reqBody);
    },
    {
      onSuccess(response) {
        const { data = {} } = response;
        setBillingAddress(data.elementList[0]);
      },
      enabled: !!userSubscriptionId,
    }
  );

  const [getInvoiceActions, setGetInvoiceActions] = useState<'next' | 'prev'>(
    'next'
  );
  const { isLoading: isLoadInvoices } = useQuery(
    [QUERY_KEYS_BILLING_DETAIL.GET_INVOICES, getInvoiceActions],
    () => {
      const { startCursor, endCursor } = paymentHistories || {};
      const params = {
        userSubscriptionId,
        limit: 100,
        ...(getInvoiceActions === 'next' ? { startCursor } : { endCursor }),
      };
      return getInvoices(params);
    },
    {
      onSuccess(data) {
        setPaymentHistories(data);
      },
    }
  );

  return {
    isLoadSubscription,
    isLoadBilling,
    isLoadInvoices,
    setGetInvoiceActions,
  };
};
export default useBillingDetailData;

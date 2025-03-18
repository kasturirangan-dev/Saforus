import { useQuery } from 'react-query';
import { QUERY_KEY, getPaymentHistory } from './api';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useSnapshot } from 'valtio';
import { useEffect, useState } from 'react';
import { PaymentDetail, ViewPaymentQuery } from './interface';

export const usePaymentData = () => {
  const { userInfo } = useSnapshot(CsApiAuthStore);
  const subscriptionId = userInfo?.subscription?.id || '';

  const [total, setTotal] = useState(0);
  const [paymentList, setPaymentList] = useState<PaymentDetail[]>([]);
  const [paginationModel, setPaginationModel] = useState<ViewPaymentQuery>({
    page: 0,
    pageSize: 10,
  });
  // Fetch payment card data
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEY.PAYMENT_HISTORY, ...Object.values(paginationModel)],
    queryFn: () => getPaymentHistory(subscriptionId, paginationModel),
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setTotal(data?.data?.total || 0);
      const records = data?.data?.records || [];
      const paymentList = records.map((record: PaymentDetail) => ({
        id: record.orderId,
        ...record,
      }));
      setPaymentList(paymentList);
    }
    if (isError) {
      setTotal(0);
      setPaymentList([]);
    }
  }, [isLoading, data, isError]);

  const downLoadInvoice = (order: PaymentDetail) => {
    window.open(order.receipt?.url, '_blank');
  };

  return {
    paymentList,
    total,
    paginationModel,
    setPaginationModel,
    loading: isFetching,
    downLoadInvoice,
  };
};

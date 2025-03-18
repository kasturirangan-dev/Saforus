import { useQuery } from 'react-query';
import { QUERY_KEY, getPiracyOrderDetail } from './api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IPiracyDetailResponse,
  PiracyOrderStatus,
} from '@web-workspace/api-console/components/piracy-detection/data';

export function useCurrentOrderData() {
  const { orderId } = useParams();
  const [refetchInterval, setRefetchInterval] = useState(0);

  const { isLoading, data: currentOrder } = useQuery<
    unknown,
    Error,
    IPiracyDetailResponse
  >({
    queryKey: [QUERY_KEY.ORDER_DETAIL, orderId],
    queryFn: async () => {
      if (!orderId) {
        return;
      }
      return getPiracyOrderDetail(orderId);
    },
    onSuccess: (response) => {
      const { data } = response;
      const { orderFiles } = data;
      if (orderFiles?.length > 0) {
        const status = data.status;
        const esCompletedTime = new Date(
          orderFiles[0].moreInfo?.estimatedCompletionTime
        );
        const now = new Date();
        if (status === PiracyOrderStatus.AWAITING_PROCESS) {
          //Refetch the details in progress order every second
          setRefetchInterval(
            esCompletedTime && esCompletedTime > now ? 1000 : 3000
          );
        } else {
          setRefetchInterval(0);
        }
      }
    },
    refetchInterval: refetchInterval,
  });

  return {
    currentOrder: currentOrder?.data,
    isLoading,
  };
}
